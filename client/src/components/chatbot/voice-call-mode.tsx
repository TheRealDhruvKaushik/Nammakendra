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
import { PhoneOff, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Define props for the voice call component
interface VoiceCallModeProps {
  language: Language;
  onSendMessage: (message: string) => Promise<string>; // Returns AI response
  onEndCall: () => void;
  logoPath?: string;
}

/**
 * Voice Call Mode Component
 * 
 * Provides a clean, call-like voice interface with the NammaKendra logo,
 * supporting both English and Kannada languages.
 */
const VoiceCallMode: React.FC<VoiceCallModeProps> = ({
  language,
  onSendMessage,
  onEndCall,
  logoPath = '/Nammakendra_logo_crisp.png' // Default logo path
}) => {
  // State for the voice interaction flow
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string>('');
  const [lastResponse, setLastResponse] = useState<string>('');
  const [micEnabled, setMicEnabled] = useState<boolean>(false); // Track if mic is manually enabled
  
  // Reference to track active state and audio element
  const isActiveRef = useRef(true);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize the voice call mode
  useEffect(() => {
    const initializeVoiceCall = async () => {
      // Check browser support
      if (!isBrowserSupported()) {
        setError('Your browser doesn\'t support voice features');
        return;
      }
      
      try {
        // Check API availability
        const apiAvailable = await checkVoiceAvailability();
        if (!apiAvailable) {
          setError('Voice services are not configured');
          return;
        }
        
        // Start with a greeting
        const greeting = language === 'kannada' 
          ? 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಸಹಾಯಕ. ನಿಮಗೆ ಏನು ಬೇಕು ಎಂದು ಹೇಳಿ.'
          : 'Hello! I am your assistant. How can I help you today?';
        
        setLastResponse(greeting);
        
        // Speak the greeting
        await speakText(greeting);
        
        // Start listening automatically
        await startListening();
      } catch (err) {
        console.error('Error initializing voice call:', err);
        setError('Failed to initialize voice call');
      }
    };
    
    initializeVoiceCall();
    
    // Cleanup when component unmounts
    return () => {
      isActiveRef.current = false;
      // Stop any active speech recognition
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.log('Error stopping speech recognition during cleanup', e);
        }
      }
    };
  }, [language]);
  
  // Function to convert text to speech and speak it
  const speakText = async (text: string) => {
    if (!isActiveRef.current) return;
    
    try {
      // Stop recording while AI is speaking to prevent feedback loop
      if (isRecording) {
        pauseListening();
      }
      
      setIsSpeaking(true);
      setStatus('Speaking...');
      
      const audio = await textToSpeech(text, language);
      
      // Store audio reference for potential interruption
      const audioElement = new Audio(`data:audio/mp3;base64,${audio}`);
      currentAudioRef.current = audioElement;
      
      // Listen for user interruption via microphone button
      const playPromise = new Promise<void>((resolve, reject) => {
        audioElement.onended = () => {
          currentAudioRef.current = null;
          resolve();
        };
        audioElement.onerror = (e) => {
          currentAudioRef.current = null;
          reject(e);
        };
        audioElement.play().catch(reject);
      });
      
      // Wait for audio to finish (unless interrupted)
      await playPromise;
      
      // Only continue if still active and not manually stopped
      if (isActiveRef.current) {
        setIsSpeaking(false);
        setStatus('Listening...');
        
        // If mic was manually enabled during speech, don't auto-start listening
        if (!micEnabled) {
          await startListening();
        }
      }
    } catch (err) {
      console.error('Error in text-to-speech:', err);
      setError('Failed to speak. Please try again.');
      setIsSpeaking(false);
      
      // Try to restart listening if there was a speech error
      if (isActiveRef.current && !micEnabled) {
        setTimeout(() => startListening(), 1000);
      }
    }
  };
  
  // Function to stop AI speech for interruption
  const stopAiSpeech = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
      setIsSpeaking(false);
    }
  };
  
  // Reference for browser's speech recognition
  const recognitionRef = useRef<any>(null);
  
  // Function to start listening for user input using browser's built-in speech recognition
  const startListening = async () => {
    if (!isActiveRef.current || isRecording) return;
    
    try {
      // If AI is speaking, stop it for immediate user input
      if (isSpeaking) {
        stopAiSpeech();
      }
      
      setIsRecording(true);
      setMicEnabled(true);
      setStatus('Listening...');
      setError(null);
      
      // Try to use browser's speech recognition first
      if (typeof window !== 'undefined' && 
          (window.SpeechRecognition || window.webkitSpeechRecognition)) {
        
        // Use the appropriate implementation
        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        // Create a new instance
        recognitionRef.current = new SpeechRecognitionAPI();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = false;
        
        // Set language
        recognitionRef.current.lang = language === 'kannada' ? 'kn-IN' : 'en-US';
        
        // Set up result handler
        recognitionRef.current.onresult = (event: any) => {
          try {
            const transcript = Array.from(event.results)
              .map((result: any) => result[0])
              .map((result: any) => result.transcript)
              .join('');
            
            console.log("Voice call transcript:", transcript);
            
            if (transcript && transcript.trim() !== '') {
              // Process the recognized text - this will also stop mic
              handleRecognizedText(transcript);
            }
          } catch (error) {
            console.error("Error processing speech recognition result:", error);
            setError('Failed to process speech');
          }
        };
        
        // Set up error handler
        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error in voice call:', event.error);
          setError('Speech recognition error. Please try again.');
          setIsRecording(false);
          setMicEnabled(false);
        };
        
        // Set up end handler
        recognitionRef.current.onend = () => {
          console.log('Speech recognition ended');
          // Only restart if we're still in recording mode, active, and mic is enabled
          if (isRecording && isActiveRef.current && micEnabled) {
            // Small delay before restarting
            setTimeout(() => {
              if (isRecording && isActiveRef.current && micEnabled && recognitionRef.current) {
                try {
                  recognitionRef.current.start();
                } catch (err) {
                  console.error('Error restarting speech recognition:', err);
                }
              }
            }, 300);
          }
        };
        
        // Start recognition
        recognitionRef.current.start();
        console.log('Browser speech recognition started');
      } else {
        // Fallback to the original recording mechanism
        await startRecording();
      }
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Failed to access microphone');
      setIsRecording(false);
      setMicEnabled(false);
    }
  };
  
  // Function to pause listening without fully stopping
  const pauseListening = () => {
    if (!recognitionRef.current) return;
    
    try {
      recognitionRef.current.stop();
      setIsRecording(false); 
      // Keep micEnabled state as is - this allows us to know if user manually enabled mic
    } catch (err) {
      console.error('Error pausing speech recognition:', err);
    }
  };
  
  // Function to stop listening
  const stopListening = async () => {
    if (!isActiveRef.current || !isRecording) return;
    
    try {
      setStatus('Processing...');
      
      // Stop browser speech recognition if active
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        setIsRecording(false);
        setMicEnabled(false);
        // Don't reset recognitionRef here so we can restart it later
      } else {
        // Use original recording mechanism as fallback
        const audioBlob = await stopRecording();
        const text = await speechToText(audioBlob, language);
        
        if (text && text.trim() !== '') {
          handleRecognizedText(text);
        } else {
          // If no text was recognized, prompt user to try again
          setStatus('No speech detected. Click mic to try again.');
          setIsRecording(false);
          setMicEnabled(false);
        }
      }
    } catch (err) {
      console.error('Error processing voice:', err);
      setError('Failed to process. Click mic to try again.');
      
      // Reset recording state
      setIsRecording(false);
      setMicEnabled(false);
    }
  };
  
  // Common handler for recognized text
  const handleRecognizedText = async (text: string) => {
    // Stop listening while processing
    if (recognitionRef.current) {
      pauseListening();
    }
    
    // Set the transcript
    setTranscript(text);
    setMicEnabled(false);
    
    // Get response from AI
    setStatus('Getting response...');
    try {
      const response = await onSendMessage(text);
      setLastResponse(response);
      
      // Speak the response (speech will auto-end and listen again)
      await speakText(response);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setError('Failed to get response from assistant');
      setIsSpeaking(false);
      
      // Don't auto-restart listening - let user click mic instead
      setStatus('Error occurred. Click mic to continue.');
      setIsRecording(false);
      setMicEnabled(false);
    }
  };
  
  // Toggle recording on/off - handles user manually enabling/disabling mic
  const toggleRecording = async () => {
    // If AI is speaking, interrupt it
    if (isSpeaking) {
      stopAiSpeech();
      await startListening(); // Enable mic immediately
      return;
    }
    
    // Normal toggle behavior
    if (isRecording) {
      await stopListening();
    } else {
      await startListening();
    }
  };
  
  return (
    <div className="voice-call-mode flex flex-col h-full bg-gradient-to-b from-primary/80 to-primary/95 text-white relative">
      {/* Center Logo */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-32 h-32 rounded-full bg-white p-3 mb-6 shadow-lg flex items-center justify-center">
          <img 
            src={logoPath} 
            alt="NammaKendra Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Status Display */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold mb-2">
            {isSpeaking ? 'Assistant Speaking' : isRecording ? 'Listening...' : 'Voice Call'}
          </h2>
          <p className="text-white/80 mb-6">
            {status || (language === 'kannada' ? 'ನಿಮ್ಮ ಮಾತನುನ ಕೇಳುತ್ತಿದ್ದೇನೆ' : 'Waiting for your voice')}
          </p>
        </div>
        
        {/* Speech Transcription */}
        {transcript && (
          <div className="bg-white/10 rounded-lg p-4 mb-4 max-w-md w-full">
            <h3 className="text-sm font-medium text-white/70 mb-1">You said:</h3>
            <p className="text-white">{transcript}</p>
          </div>
        )}
        
        {/* AI Response */}
        {lastResponse && (
          <div className="bg-white/20 rounded-lg p-4 max-w-md w-full">
            <h3 className="text-sm font-medium text-white/70 mb-1">Assistant:</h3>
            <p className="text-white">{lastResponse}</p>
          </div>
        )}
        
        {/* Error Display */}
        {error && (
          <div className="mt-4 bg-red-500/20 text-white border border-red-300 px-4 py-2 rounded-md">
            {error}
          </div>
        )}
      </div>
      
      {/* Call Controls */}
      <div className="p-6 flex justify-center gap-4">
        {/* Mic Toggle Button - Color logic based on state */}
        <Button
          onClick={toggleRecording}
          className={`rounded-full w-16 h-16 flex items-center justify-center 
            ${isRecording 
                ? 'bg-blue-500 hover:bg-blue-600' // Blue when actively listening
                : isSpeaking 
                  ? 'bg-red-300 hover:bg-red-500' // Pale red when AI is speaking
                  : 'bg-red-500 hover:bg-red-600' // Red when idle/muted
            }`}
          disabled={false} // Never disabled - allows user to interrupt AI
          title={
            isRecording
              ? "Stop listening"
              : isSpeaking 
                ? "Interrupt AI and speak" 
                : "Start speaking"
          }
        >
          {isRecording ? <Mic size={24} /> : <MicOff size={24} />}
        </Button>
        
        {/* End Call Button */}
        <Button
          onClick={onEndCall}
          className="rounded-full w-16 h-16 bg-red-500 hover:bg-red-600 flex items-center justify-center"
        >
          <PhoneOff size={24} />
        </Button>
      </div>
    </div>
  );
};

export default VoiceCallMode;