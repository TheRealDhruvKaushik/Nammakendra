import speech from '@google-cloud/speech';
import textToSpeech from '@google-cloud/text-to-speech';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get directory name equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define Language type if importing fails
export type Language = 'english' | 'kannada';

// Use the GOOGLE_APPLICATION_CREDENTIALS environment variable directly
// The path is already set in the environment by the system

// Log the credentials path for debugging
console.log(`Using Google credentials from: ${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);

// Create clients
const speechClient = new speech.SpeechClient();
const ttsClient = new textToSpeech.TextToSpeechClient();

/**
 * Convert speech audio buffer to text
 * 
 * @param audioBuffer - The audio buffer containing speech
 * @param language - The language of the audio ('english' or 'kannada')
 * @returns Recognized text
 */
export async function speechToText(audioBuffer: Buffer, language: Language): Promise<string> {
  try {
    // Define language code for Speech-to-Text
    const languageCode = language === 'kannada' ? 'kn-IN' : 'en-IN';

    // Configure the request
    const config = {
      encoding: 'LINEAR16' as const,
      sampleRateHertz: 16000,
      languageCode: languageCode,
      model: 'default',
      audioChannelCount: 1,
      enableAutomaticPunctuation: true,
      alternativeLanguageCodes: ['en-IN', 'kn-IN'] // Support both languages for better recognition
    };

    // Create the request
    const request = {
      config: config,
      audio: {
        content: audioBuffer.toString('base64')
      }
    };

    // Detect speech
    const [response] = await speechClient.recognize(request);
    
    if (!response.results || response.results.length === 0) {
      return '';
    }
    
    const transcription = response.results
      .map(result => {
        if (result.alternatives && result.alternatives.length > 0) {
          return result.alternatives[0].transcript || '';
        }
        return '';
      })
      .join('\n');

    return transcription;
  } catch (error: any) {
    console.error('Error in speechToText:', error);
    throw new Error('Failed to recognize speech: ' + (error.message || 'Unknown error'));
  }
}

/**
 * Convert text to speech audio and return base64 encoded audio
 * 
 * @param text - The text to convert to speech
 * @param language - The language for TTS ('english' or 'kannada')
 * @returns Base64 encoded audio
 */
export async function textToSpeechAudio(text: string, language: Language): Promise<string> {
  try {
    // Define voice parameters based on language
    const voice = {
      languageCode: language === 'kannada' ? 'kn-IN' : 'en-IN',
      name: language === 'kannada' ? 'kn-IN-Standard-A' : 'en-IN-Standard-B', // B is female voice for Indian English
      ssmlGender: 'FEMALE' as const
    };

    // Configure audio parameters
    const audioConfig = {
      audioEncoding: 'MP3' as const,
      pitch: 0,
      speakingRate: 1.0,
      effectsProfileId: ['telephony-class-application']  // Optimize for telephony applications
    };

    // Create the request
    const request = {
      input: { text },
      voice,
      audioConfig
    };

    // Generate speech
    const [response] = await ttsClient.synthesizeSpeech(request);
    if (!response || !response.audioContent) {
      throw new Error('No audio content returned from Google Text-to-Speech API');
    }
    return Buffer.from(response.audioContent).toString('base64');
  } catch (error: any) {
    console.error('Error in textToSpeechAudio:', error);
    throw new Error('Failed to generate speech audio: ' + (error.message || 'Unknown error'));
  }
}

/**
 * Check if Google Cloud API credentials are configured correctly
 * 
 * @returns Boolean indicating whether credentials are properly configured
 */
export function isGoogleCloudConfigured(): boolean {
  return !!process.env.GOOGLE_APPLICATION_CREDENTIALS && !!process.env.GOOGLE_CLOUD_API_KEY;
}

/**
 * Get a list of available voice options for each language
 * 
 * @returns List of available voices
 */
export async function listAvailableVoices() {
  try {
    const [result] = await ttsClient.listVoices({});
    if (!result || !result.voices) {
      return [];
    }
    
    // Filter for Indian voices (both English and Kannada)
    const indianVoices = result.voices.filter(voice => 
      voice.languageCodes && 
      voice.languageCodes.some(code => code === 'en-IN' || code === 'kn-IN')
    );
    
    return indianVoices;
  } catch (error: any) {
    console.error('Error listing voices:', error);
    throw new Error('Failed to list voices: ' + (error.message || 'Unknown error'));
  }
}