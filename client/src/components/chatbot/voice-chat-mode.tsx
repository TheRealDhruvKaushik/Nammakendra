import React, { useState, useEffect, useRef } from 'react';
import { Language } from '@/context/language-context';
import { 
  checkVoiceAvailability, 
  isBrowserSupported, 
  startRecording, 
  stopRecording, 
  speechToText, 
  textToSpeech,
  playAudio
} from '@/lib/voice-service';
import { Phone, PhoneOff, Mic, MicOff } from 'lucide-react';

// Define props for the voice chat component
interface VoiceChatModeProps {
  language: Language;
  onSendMessage: (e?: React.FormEvent, message?: string) => Promise<string>; // Returns AI response
  onToggleVoiceMode: () => void;
  isActive: boolean;
  sessionId?: string; // To track the conversation session
}

/**
 * Voice Chat Mode Component
 * 
 * Provides a voice-based conversation interface with Indian accent support
 * for both English and Kannada languages.
 */
const VoiceChatMode: React.FC<VoiceChatModeProps> = ({
  language,
  onSendMessage,
  onToggleVoiceMode,
  isActive
}) => {
  // State for the voice interaction flow
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [messages, setMessages] = useState<{
    role: 'user' | 'assistant';
    content: string;
  }[]>([]);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  // Reference to maintain active state
  const isActiveRef = useRef(isActive);
  
  // Effect to check voice API availability and initialize voice mode
  useEffect(() => {
    isActiveRef.current = isActive;
    if (!isActive) return;
    
    const checkAvailability = async () => {
      try {
        // First check browser support
        const browserSupported = isBrowserSupported();
        if (!browserSupported) {
          setError('Your browser doesn\'t support voice features. Please try using Chrome, Edge, or Safari.');
          setIsAvailable(false);
          return;
        }
        
        // Then check Google Cloud API availability
        console.log('Checking Google Cloud voice services availability...');
        const apiAvailable = await checkVoiceAvailability();
        setIsAvailable(apiAvailable);
        
        if (!apiAvailable) {
          setError('Google Cloud voice services are not configured. Please check your API keys.');
        } else {
          setError(null);
          console.log('Voice services are available!');
          
          // Add initial greeting message when voice mode is activated
          const greeting = language === 'kannada' 
            ? 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಸಹಾಯಕ. ನಿಮಗೆ ಏನು ಬೇಕು ಎಂದು ಹೇಳಿ.'
            : 'Hello! I am your assistant. How can I help you today?';
          
          setMessages([{ role: 'assistant', content: greeting }]);
          
          // Speak the greeting using Google Cloud TTS
          console.log('Speaking initial greeting...');
          await speakAssistantMessage(greeting);
        }
      } catch (err) {
        console.error('Error checking voice availability:', err);
        setError('Failed to initialize voice mode. Please try again.');
        setIsAvailable(false);
      }
    };
    
    // Run voice availability check
    checkAvailability();
    
    // Cleanup function when component unmounts or isActive changes
    return () => {
      // Stop any ongoing recordings when component unmounts
      try {
        stopRecording().catch(err => console.error('Error stopping recording during cleanup:', err));
      } catch (e) {
        console.log('No active recording to stop');
      }
    };
  }, [isActive, language]);
  
  // Function to handle speaking the assistant's messages
  const speakAssistantMessage = async (text: string) => {
    if (!isActiveRef.current) return;
    
    try {
      setIsSpeaking(true);
      setStatus('Speaking...');
      
      // Use Google Cloud Text-to-Speech to convert response to audio
      console.log('Converting text to speech via Google Cloud:', text.substring(0, 50) + '...');
      const audio = await textToSpeech(text, language);
      
      // Play the audio response
      console.log('Playing audio response');
      await playAudio(audio);
      
      // Only continue if still in voice mode
      if (isActiveRef.current) {
        setStatus('Listening...');
        // After speaking, automatically start listening for user response
        await startListening();
      }
    } catch (err) {
      console.error('Error in text-to-speech:', err);
      setError('Failed to speak response. Please check your network connection.');
    } finally {
      setIsSpeaking(false);
    }
  };
  
  // Function to start listening for user input
  const startListening = async () => {
    if (!isActiveRef.current || isRecording) return;
    
    try {
      setIsRecording(true);
      setStatus('Listening...');
      setError(null);
      
      // Start recording audio using MediaRecorder
      console.log('Starting audio recording...');
      await startRecording();
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Failed to access microphone. Please check your permissions.');
      setIsRecording(false);
    }
  };
  
  // Function to stop listening and process user input
  const stopListening = async () => {
    if (!isActiveRef.current || !isRecording) return;
    
    try {
      setStatus('Processing...');
      
      // Stop recording and get audio
      console.log('Stopping recording and getting audio blob...');
      const audioBlob = await stopRecording();
      
      // Convert speech to text using Google Cloud Speech-to-Text
      console.log('Converting speech to text via Google Cloud...');
      const text = await speechToText(audioBlob, language);
      
      if (!text || text.trim() === '') {
        // If no text was recognized, start listening again
        setStatus('No speech detected. Please try again.');
        setTimeout(() => {
          if (isActiveRef.current) startListening();
        }, 2000);
        return;
      }
      
      console.log('Speech recognized:', text);
      
      // Add user message to conversation
      const userMessage = { role: 'user' as const, content: text };
      setMessages(prev => [...prev, userMessage]);
      
      // Get response from AI through the chat interface
      setStatus('Getting response from AI...');
      const response = await onSendMessage(undefined, text);
      
      // Add assistant message to conversation
      const assistantMessage = { role: 'assistant' as const, content: response };
      setMessages(prev => [...prev, assistantMessage]);
      
      // Speak the response using Google Cloud Text-to-Speech
      console.log('Speaking response...');
      await speakAssistantMessage(response);
    } catch (err) {
      console.error('Error processing voice:', err);
      setError('Failed to process voice input. Please try again.');
      
      // Try to restart listening after error
      setTimeout(() => {
        if (isActiveRef.current && !isRecording) {
          startListening();
        }
      }, 3000);
    } finally {
      setIsRecording(false);
    }
  };
  
  // Enable/disable recording
  const toggleRecording = async () => {
    if (isRecording) {
      await stopListening();
    } else {
      await startListening();
    }
  };
  
  // JSX markup for the voice chat component
  return (
    <div className="voice-chat-mode">
      {/* Voice Chat Status */}
      <div className="flex items-center justify-between py-4 border-b border-primary/20 mb-4">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-gray-400'} mr-2`}></div>
          <h3 className="text-lg font-medium">
            {language === 'kannada' ? 'ಧ್ವನಿ ಮೋಡ್' : 'Voice Mode'}
            {isAvailable && (
              <span className="text-xs ml-2 text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {language === 'kannada' ? 'Google ಧ್ವನಿ ಸೇವೆಗಳು' : 'Google Voice Services'}
              </span>
            )}
          </h3>
        </div>
        
        <button
          onClick={onToggleVoiceMode}
          className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
          aria-label="End voice chat"
          title="End voice chat"
        >
          <PhoneOff size={20} />
        </button>
      </div>
      
      {/* Error messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Status indicator with more prominent visual feedback */}
      {status && (
        <div className="text-sm text-gray-700 mb-4 flex items-center justify-center p-2 bg-gray-50 rounded-lg">
          <div className={`w-3 h-3 rounded-full ${
            isRecording 
              ? 'bg-red-500 animate-pulse'
              : isSpeaking 
                ? 'bg-blue-500 animate-pulse'
                : 'bg-gray-400'
          } mr-2`}></div>
          <span className="font-medium">{status}</span>
        </div>
      )}
      
      {/* Conversation display */}
      <div className="conversation-container h-[calc(100vh-350px)] overflow-y-auto mb-4 rounded border border-gray-200">
        <div className="p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-primary/10 ml-auto max-w-[80%]'
                  : 'bg-gray-100 mr-auto max-w-[80%]'
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
      </div>
      
      {/* Recording controls with better visual feedback */}
      <div className="flex flex-col items-center py-4">
        {isAvailable ? (
          <>
            <button
              onClick={toggleRecording}
              disabled={isSpeaking}
              className={`p-6 rounded-full shadow-lg ${
                isRecording
                  ? 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                  : 'bg-primary text-white hover:bg-primary/90'
              } disabled:opacity-50 transition-colors`}
              aria-label={isRecording ? 'Stop recording' : 'Start recording'}
              title={isRecording ? 'Stop recording' : 'Start recording'}
            >
              {isRecording ? <MicOff size={28} /> : <Mic size={28} />}
            </button>
            <p className="mt-2 text-sm text-gray-500">
              {isRecording 
                ? (language === 'kannada' ? 'ನಿಲ್ಲಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Click to stop recording')
                : (language === 'kannada' ? 'ಪ್ರಾರಂಭಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Click to start recording')}
            </p>
          </>
        ) : (
          <div className="text-center p-4 bg-gray-50 rounded-lg text-gray-500 w-full">
            {language === 'kannada' 
              ? 'ಧ್ವನಿ ಸೇವೆಗಳು ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ನಂತರ ಪ್ರಯತ್ನಿಸಿ.' 
              : 'Voice services are not available. Please try again later.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceChatMode;