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

// Configure Google Cloud credentials from environment variables
let speechClient: any;
let ttsClient: any;

function initializeClients() {
  try {
    // First try to use the credentials file from attached assets
    const credentialsPath = './attached_assets/angelic-howl-461611-i9-864f5084956d.json';
    
    // Check if the credentials file exists
    if (fs.existsSync(credentialsPath)) {
      console.log(`Using Google Cloud credentials from: ${credentialsPath}`);
      
      // Read and parse the credentials file
      const credentialsData = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
      console.log(`Using Google Cloud credentials for project: ${credentialsData.project_id}`);
      console.log('Google Cloud voice services are enabled');

      // Use credentials object instead of keyFilename for better compatibility
      speechClient = new speech.SpeechClient({ 
        credentials: {
          client_email: credentialsData.client_email,
          private_key: credentialsData.private_key,
        },
        projectId: credentialsData.project_id
      });
      ttsClient = new textToSpeech.TextToSpeechClient({ 
        credentials: {
          client_email: credentialsData.client_email,
          private_key: credentialsData.private_key,
        },
        projectId: credentialsData.project_id
      });
      return;
    }

    // Fallback to environment variables
    if (process.env.GOOGLE_CLOUD_PROJECT_ID && 
        process.env.GOOGLE_CLOUD_PRIVATE_KEY && 
        process.env.GOOGLE_CLOUD_CLIENT_EMAIL) {
      
      const credentials = {
        type: 'service_account',
        project_id: process.env.GOOGLE_CLOUD_PROJECT_ID,
        private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
      };

      console.log(`Using Google Cloud credentials for project: ${process.env.GOOGLE_CLOUD_PROJECT_ID}`);
      console.log('Google Cloud voice services are enabled');

      speechClient = new speech.SpeechClient({ credentials });
      ttsClient = new textToSpeech.TextToSpeechClient({ credentials });
      return;
    }

    // No credentials available
    console.log('Google Cloud voice services are disabled - no credentials provided');
    throw new Error('No Google Cloud credentials available');
  } catch (error) {
    console.error('Error initializing Google Cloud clients:', error);
    throw error;
  }
}

// Initialize clients
try {
  initializeClients();
} catch (error) {
  console.log('Google Cloud voice services are disabled');
}

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
  // Check if credentials file exists
  const credentialsPath = './attached_assets/angelic-howl-461611-i9-864f5084956d.json';
  const hasCredentialsFile = fs.existsSync(credentialsPath);
  
  // Check if environment variable credentials are available
  const hasEnvCredentials = !!(process.env.GOOGLE_CLOUD_PROJECT_ID && 
                              process.env.GOOGLE_CLOUD_PRIVATE_KEY && 
                              process.env.GOOGLE_CLOUD_CLIENT_EMAIL);
  
  return hasCredentialsFile || hasEnvCredentials;
}

/**
 * Test Google Cloud TTS service availability
 * 
 * @returns Promise resolving to boolean indicating if service is working
 */
export async function testGoogleCloudTTS(): Promise<boolean> {
  try {
    const request = {
      input: { text: 'test' },
      voice: { languageCode: 'en-IN', ssmlGender: 'FEMALE' as const },
      audioConfig: { audioEncoding: 'MP3' as const }
    };
    
    await ttsClient.synthesizeSpeech(request);
    return true;
  } catch (error) {
    console.error('Google Cloud TTS test failed:', error);
    return false;
  }
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
    const indianVoices = result.voices.filter((voice: any) => 
      voice.languageCodes && 
      voice.languageCodes.some((code: any) => code === 'en-IN' || code === 'kn-IN')
    );
    
    return indianVoices;
  } catch (error: any) {
    console.error('Error listing voices:', error);
    throw new Error('Failed to list voices: ' + (error.message || 'Unknown error'));
  }
}