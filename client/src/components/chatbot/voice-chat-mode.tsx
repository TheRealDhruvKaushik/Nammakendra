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
  onSendMessage: (message: string) => Promise<string>; // Returns AI response
  onToggleVoiceMode: () => void;
  isActive: boolean;
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
  
  // Effect to check voice API availability
  useEffect(() => {
    isActiveRef.current = isActive;
    if (!isActive) return;
    
    const checkAvailability = async () => {
      try {
        // First check browser support
        const browserSupported = isBrowserSupported();
        if (!browserSupported) {
          setError('Your browser doesn\'t support voice features');
          setIsAvailable(false);
          return;
        }
        
        // Then check API availability
        const apiAvailable = await checkVoiceAvailability();
        setIsAvailable(apiAvailable);
        
        if (!apiAvailable) {
          setError('Voice services are not configured');
        } else {
          setError(null);
          // Add initial greeting message when voice mode is activated
          const greeting = language === 'kannada' 
            ? 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಸಹಾಯಕ. ನಿಮಗೆ ಏನು ಬೇಕು ಎಂದು ಹೇಳಿ.'
            : 'Hello! I am your assistant. How can I help you today?';
          
          setMessages([{ role: 'assistant', content: greeting }]);
          
          // Speak the greeting
          speakAssistantMessage(greeting);
        }
      } catch (err) {
        console.error('Error checking voice availability:', err);
        setError('Failed to initialize voice mode');
        setIsAvailable(false);
      }
    };
    
    checkAvailability();
  }, [isActive, language]);
  
  // Function to handle speaking the assistant's messages
  const speakAssistantMessage = async (text: string) => {
    if (!isActiveRef.current) return;
    
    try {
      setIsSpeaking(true);
      setStatus('Speaking...');
      
      const audio = await textToSpeech(text, language);
      await playAudio(audio);
      
      // Only continue if still in voice mode
      if (isActiveRef.current) {
        setStatus('Listening...');
        await startListening();
      }
    } catch (err) {
      console.error('Error in text-to-speech:', err);
      setError('Failed to speak response');
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
      
      await startRecording();
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Failed to access microphone');
      setIsRecording(false);
    }
  };
  
  // Function to stop listening and process user input
  const stopListening = async () => {
    if (!isActiveRef.current || !isRecording) return;
    
    try {
      setStatus('Processing...');
      
      // Stop recording and get audio
      const audioBlob = await stopRecording();
      
      // Convert speech to text
      const text = await speechToText(audioBlob, language);
      
      if (!text || text.trim() === '') {
        // If no text was recognized, start listening again
        setStatus('No speech detected. Please try again.');
        setTimeout(() => {
          if (isActiveRef.current) startListening();
        }, 2000);
        return;
      }
      
      // Add user message
      const userMessage = { role: 'user' as const, content: text };
      setMessages(prev => [...prev, userMessage]);
      
      // Get response from AI
      setStatus('Getting response...');
      const response = await onSendMessage(text);
      
      // Add assistant message
      const assistantMessage = { role: 'assistant' as const, content: response };
      setMessages(prev => [...prev, assistantMessage]);
      
      // Speak the response
      await speakAssistantMessage(response);
    } catch (err) {
      console.error('Error processing voice:', err);
      setError('Failed to process voice input');
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
          <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'} mr-2`}></div>
          <h3 className="text-lg font-medium">
            {language === 'kannada' ? 'ಧ್ವನಿ ಮೋಡ್' : 'Voice Mode'}
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
      
      {/* Status indicator */}
      {status && (
        <div className="text-sm text-gray-500 mb-4 flex items-center">
          <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : isSpeaking ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'} mr-2`}></div>
          {status}
        </div>
      )}
      
      {/* Conversation display */}
      <div className="conversation-container h-[calc(100vh-300px)] overflow-y-auto mb-4 rounded border border-gray-200">
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
      
      {/* Recording controls */}
      <div className="flex justify-center py-4">
        {isAvailable ? (
          <button
            onClick={toggleRecording}
            disabled={isSpeaking}
            className={`p-4 rounded-full ${
              isRecording
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-primary text-white hover:bg-primary/90'
            } disabled:opacity-50 transition-colors`}
            aria-label={isRecording ? 'Stop recording' : 'Start recording'}
            title={isRecording ? 'Stop recording' : 'Start recording'}
          >
            {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
        ) : (
          <div className="text-center text-gray-500">
            {language === 'kannada' ? 'ಧ್ವನಿ ಲಭ್ಯವಿಲ್ಲ' : 'Voice is not available'}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceChatMode;