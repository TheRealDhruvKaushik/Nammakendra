import { Router, Request, Response } from 'express';
import { speechToText, textToSpeechAudio, isGoogleCloudConfigured } from './google-voice-service';
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
voiceRouter.get('/api/voice/status', (req: Request, res: Response) => {
  res.json({
    configured: isGoogleCloudConfigured()
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
  } catch (error) {
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
    
    // Convert text to speech
    const audioBase64 = await textToSpeechAudio(text, language as Language);
    
    res.json({ audio: audioBase64 });
  } catch (error) {
    console.error('Error in text-to-speech endpoint:', error);
    res.status(500).json({ error: error.message || 'Failed to synthesize speech' });
  }
});

export default voiceRouter;