/**
 * Voice service for interactions with Google Cloud speech APIs
 * Handles speech recognition and text-to-speech features
 */

import axios from 'axios';
import { Language } from '@/context/language-context';

// AudioContext for recording and processing audio
let audioContext: AudioContext | null = null;
let mediaRecorder: MediaRecorder | null = null;
let audioChunks: Blob[] = [];

/**
 * Checks if voice mode is available
 * @returns Promise resolving to a boolean indicating if voice APIs are configured
 */
export async function checkVoiceAvailability(): Promise<boolean> {
  try {
    const response = await axios.get('/api/voice/status');
    return response.data.configured === true;
  } catch (error) {
    console.error('Error checking voice availability:', error);
    return false;
  }
}

/**
 * Checks if the browser supports required audio APIs
 * @returns Boolean indicating if browser supports required audio features
 */
export function isBrowserSupported(): boolean {
  return !!(
    navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia &&
    window.AudioContext &&
    window.MediaRecorder
  );
}

/**
 * Starts recording audio from the microphone
 * @returns Promise that resolves when recording starts
 */
export async function startRecording(): Promise<void> {
  if (!isBrowserSupported()) {
    throw new Error('Your browser does not support audio recording');
  }

  try {
    // Reset previous recording session
    stopRecording();
    audioChunks = [];
    
    // Get microphone access
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    // Create new audio context if needed
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    // Create new media recorder
    mediaRecorder = new MediaRecorder(stream);
    
    // Set up event handlers
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };
    
    // Start recording
    mediaRecorder.start();
  } catch (error) {
    console.error('Error starting audio recording:', error);
    throw new Error('Failed to access microphone');
  }
}

/**
 * Stops recording and returns the recorded audio as a Blob
 * @returns Promise resolving to the recorded audio Blob
 */
export function stopRecording(): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (!mediaRecorder) {
      reject(new Error('No active recording'));
      return;
    }
    
    mediaRecorder.onstop = () => {
      // Create a single Blob from all recorded chunks
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      
      // Clean up
      if (mediaRecorder && mediaRecorder.stream) {
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
      
      resolve(audioBlob);
    };
    
    mediaRecorder.stop();
  });
}

/**
 * Converts speech to text using Google Cloud Speech-to-Text
 * @param audioBlob - The recorded audio
 * @param language - The user's selected language
 * @returns Promise resolving to the recognized text
 */
export async function speechToText(audioBlob: Blob, language: Language): Promise<string> {
  try {
    // Create form data for API request
    const formData = new FormData();
    formData.append('audio', audioBlob);
    
    // Make API request
    const response = await axios.post(`/api/voice/recognize?language=${language}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.text || '';
  } catch (error) {
    console.error('Error in speech recognition:', error);
    throw new Error('Failed to recognize speech');
  }
}

/**
 * Converts text to speech using Google Cloud Text-to-Speech with browser fallback
 * @param text - The text to convert to speech
 * @param language - The user's selected language
 * @returns Promise resolving to an Audio element with the synthesized speech
 */
export async function textToSpeech(text: string, language: Language): Promise<HTMLAudioElement> {
  try {
    // Make API request
    const response = await axios.post('/api/voice/synthesize', {
      text,
      language,
    });
    
    // Check if we should use browser TTS fallback
    if (response.data.useBrowserTTS) {
      console.log('Using browser-based text-to-speech as fallback');
      return useBrowserTextToSpeech(text, language);
    }
    
    // Create audio element from base64 audio data
    const audio = new Audio();
    audio.src = `data:audio/mp3;base64,${response.data.audio}`;
    
    return audio;
  } catch (error) {
    console.error('Error in text-to-speech:', error);
    // Fallback to browser TTS on any error
    return useBrowserTextToSpeech(text, language);
  }
}

/**
 * Browser-based text-to-speech using Web Speech API
 * @param text - The text to speak
 * @param language - The language code
 * @returns Promise resolving to a dummy audio element (Web Speech API speaks directly)
 */
function useBrowserTextToSpeech(text: string, language: Language): Promise<HTMLAudioElement> {
  return new Promise((resolve, reject) => {
    try {
      // Check if Web Speech API is available
      const SpeechSynthesisUtterance = (window as any).SpeechSynthesisUtterance || (window as any).webkitSpeechSynthesisUtterance;
      
      if (!SpeechSynthesisUtterance || !window.speechSynthesis) {
        throw new Error('Web Speech API not supported');
      }
      
      // Create a dummy audio element to serve as the interface
      const audio = new Audio();
      
      // Create utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'kannada' ? 'kn-IN' : 'en-IN';
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1;
      
      // Wire up utterance events to audio element's events
      utterance.onend = () => {
        // Call the audio element's onended handler if it exists
        if (audio.onended) {
          audio.onended();
        }
      };
      
      utterance.onerror = (e: any) => {
        // Call the audio element's onerror handler if it exists
        if (audio.onerror) {
          audio.onerror();
        }
      };
      
      // Speak the text immediately
      window.speechSynthesis.cancel(); // Cancel any previous speech
      window.speechSynthesis.speak(utterance);
      
      // Resolve immediately with the audio element
      // The audio element's onended will be called when utterance finishes
      resolve(audio);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Play audio with promise interface
 * @param audio - HTML Audio element to play
 * @returns Promise that resolves when audio finishes playing
 */
export function playAudio(audio: HTMLAudioElement): Promise<void> {
  return new Promise((resolve, reject) => {
    // Always set up event handlers to work with both Google TTS and browser TTS
    audio.onended = () => resolve();
    audio.onerror = (e) => {
      console.error('Audio playback error:', e);
      reject(e);
    };
    
    // Check if audio has a valid src (Google Cloud TTS case)
    if (!audio.src) {
      // Browser TTS: speech is already playing via Web Speech API
      // Just wait for the utterance.onend to call audio.onended()
      return;
    }
    
    // Google Cloud TTS: play the actual audio file
    audio.play().catch((err) => {
      console.error('Failed to play audio:', err);
      reject(err);
    });
  });
}