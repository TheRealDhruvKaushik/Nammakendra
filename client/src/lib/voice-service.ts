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
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }
  
  return !!(
    navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === 'function' &&
    (window.AudioContext || (window as any).webkitAudioContext) &&
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
    if (!mediaRecorder || mediaRecorder.state === 'inactive') {
      // If no recording is active, return an empty audio blob
      console.log('No active recording to stop');
      resolve(new Blob([], { type: 'audio/wav' }));
      return;
    }
    
    // Handle the stop event
    mediaRecorder.onstop = () => {
      try {
        // Create a single Blob from all recorded chunks
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        
        // Clean up
        if (mediaRecorder && mediaRecorder.stream) {
          mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
        
        // Reset for next recording
        audioChunks = [];
        
        resolve(audioBlob);
      } catch (err) {
        console.error('Error creating audio blob:', err);
        reject(new Error('Failed to process recorded audio'));
      }
    };
    
    // Stop recording
    try {
      mediaRecorder.stop();
    } catch (err) {
      console.error('Error stopping MediaRecorder:', err);
      
      // Cleanup anyway and resolve with empty blob
      if (mediaRecorder && mediaRecorder.stream) {
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
      audioChunks = [];
      
      resolve(new Blob([], { type: 'audio/wav' }));
    }
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
 * Converts text to speech using Google Cloud Text-to-Speech
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
    
    // Create audio element from base64 audio data
    const audio = new Audio();
    audio.src = `data:audio/mp3;base64,${response.data.audio}`;
    
    return audio;
  } catch (error) {
    console.error('Error in text-to-speech:', error);
    throw new Error('Failed to generate speech');
  }
}

/**
 * Play audio with promise interface
 * @param audio - HTML Audio element to play
 * @returns Promise that resolves when audio finishes playing
 */
export function playAudio(audio: HTMLAudioElement): Promise<void> {
  return new Promise((resolve, reject) => {
    audio.onended = () => resolve();
    audio.onerror = (e) => reject(e);
    audio.play().catch(reject);
  });
}