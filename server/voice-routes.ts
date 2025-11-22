import { Router, Request, Response } from 'express';
import { speechToText, textToSpeechAudio, isGoogleCloudConfigured, testGoogleCloudTTS } from './google-voice-service';
import multer from 'multer';
import { Language } from '../client/src/context/language-context';

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit to 5MB
  },
});

// Create router
const voiceRouter = Router();

// Check if Google APIs are configured
voiceRouter.get('/api/voice/status', async (req: Request, res: Response) => {
  const configured = isGoogleCloudConfigured();
  let working = false;
  let error = null;

  if (configured) {
    try {
      working = await testGoogleCloudTTS();
    } catch (e: any) {
      error = e.message;
    }
  }

  res.json({
    configured,
    working,
    error
  });
});

// Speech-to-Text endpoint
voiceRouter.post('/api/voice/recognize', upload.single('audio'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    // Get language from query parameter (default to English)
    const language = (req.query.language || 'english') as Language;
    
    // Convert speech to text
    const text = await speechToText(req.file.buffer, language);
    
    res.json({ text });
  } catch (error: any) {
    console.error('Error in speech recognition endpoint:', error);
    res.status(500).json({ error: error.message || 'Failed to recognize speech' });
  }
});

// Text-to-Speech endpoint
voiceRouter.post('/api/voice/synthesize', async (req: Request, res: Response) => {
  try {
    const { text, language = 'english' } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'No text provided' });
    }
    
    try {
      // Try Google Cloud TTS first
      const audioBase64 = await textToSpeechAudio(text, language as Language);
      res.json({ audio: audioBase64, useBrowserTTS: false });
    } catch (googleError: any) {
      console.log('Google Cloud TTS failed, using browser fallback:', googleError.message);
      // If Google Cloud fails, use browser-based TTS as fallback
      res.json({ 
        useBrowserTTS: true, 
        text: text,
        language: language,
        message: 'Using browser text-to-speech'
      });
    }
  } catch (error: any) {
    console.error('Error in text-to-speech endpoint:', error);
    // Always try to use browser fallback on any error
    res.json({ 
      useBrowserTTS: true, 
      text: req.body.text,
      language: req.body.language || 'english'
    });
  }
});

export default voiceRouter;