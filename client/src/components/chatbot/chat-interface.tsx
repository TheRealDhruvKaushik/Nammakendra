import { useState, useEffect, useRef } from "react";
import { SendHorizontal, Loader2, Mic, MicOff, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import VoiceChatMode from "./voice-chat-mode";
import { useLanguage } from "@/context/language-context";

// TypeScript definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  error: any;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
}

// Add these to the Window interface
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  pageType?: 'sahayak' | 'sarkara';
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ pageType = 'sahayak' }) => {
  const { t, language } = useLanguage();
  const [title] = useState(pageType === 'sahayak' ? t('chat.title') : t('chat.sarkara.title'));
  const [subtitle] = useState(pageType === 'sahayak' ? t('chat.subtitle') : t('chat.sarkara.subtitle'));
  const [placeholder] = useState(pageType === 'sahayak' ? t('chat.placeholder') : t('chat.sarkara.placeholder'));

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: pageType === 'sahayak' ? t('chat.welcome') : t('chat.sarkara.welcome'),
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceModeActive, setIsVoiceModeActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Reference for speech recognition
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Update welcome message when language changes
  useEffect(() => {
    
    setMessages(messages => {
      const updatedMessages = [...messages];
      // Find and update the welcome message
      const welcomeIndex = updatedMessages.findIndex(msg => msg.id === "welcome");
      if (welcomeIndex !== -1) {
        updatedMessages[welcomeIndex] = {
          ...updatedMessages[welcomeIndex],
          content: pageType === 'sahayak' ? t('chat.welcome') : t('chat.sarkara.welcome')

      
        };
      }
      return updatedMessages;
    });
  }, [language, t, pageType]);
  
  // Helper function to get the correct language code for speech recognition
  const getSpeechRecognitionLanguage = (lang: string): string => {
    switch (lang) {
      case 'kannada':
        return 'kn-IN'; // Kannada (India)
      case 'english':
      default:
        return 'en-US'; // English (US)
    }
  };
  
  // Initialize and update speech recognition when language changes
  useEffect(() => {
    // Use window scope to check for browser support
    if (typeof window !== 'undefined' && 
        (window.SpeechRecognition !== undefined || window.webkitSpeechRecognition !== undefined)) {
      // Use the appropriate implementation
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      // Create a new instance or reuse existing
      if (!recognitionRef.current) {
        recognitionRef.current = new SpeechRecognitionAPI();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
      }
      
      // Update language based on the current selection
      recognitionRef.current.lang = getSpeechRecognitionLanguage(language);
      console.log(`Speech recognition language set to: ${recognitionRef.current.lang}`);
      
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        console.log("Speech recognition result received", event);
        try {
          const transcript = Array.from(event.results)
            .map((result: SpeechRecognitionResult) => result[0])
            .map((result: SpeechRecognitionAlternative) => result.transcript)
            .join('');
          
          console.log("Transcript: ", transcript);  
          setInput(transcript);
        } catch (error) {
          console.error("Error processing speech recognition result:", error);
        }
      };
      
      recognitionRef.current.onerror = (event: SpeechRecognitionEvent) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast({
          title: t('chat.speechError'),
          description: t('chat.speechError'),
          variant: "destructive"
        });
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      toast({
        title: t('chat.speechNotSupported'),
        description: t('chat.speechNotSupported'),
        variant: "destructive"
      });
    }
    
    return () => {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.abort();
        setIsListening(false);
      }
    };
  }, [language, toast, t, isListening]);
  
  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: t('chat.speechNotSupported'),
        description: t('chat.speechNotSupported'),
        variant: "destructive"
      });
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        // Make sure the language is set correctly before starting
        recognitionRef.current.lang = getSpeechRecognitionLanguage(language);
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Speech recognition error:', error);
        toast({
          title: t('chat.speechError'),
          description: t('chat.speechError'),
          variant: "destructive"
        });
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e?: React.FormEvent | undefined, voiceMessage?: string) => {
    if (e) e.preventDefault();
    
    // Use either the voice message or the input field value
    const messageText = voiceMessage || input;
    
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    if (!voiceMessage) setInput(""); // Only clear input if not from voice mode
    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/chat", { 
        message: messageText,
        language: language, // Send the current language to the backend
        pageType: pageType // Send pageType to differentiate between sahayak and sarkara
      });
      
      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Return the response for voice mode
      return data.message;
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: t('chat.error'),
        description: t('chat.error'),
        variant: "destructive"
      });
      return t('chat.error');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Toggle voice chat mode
  const toggleVoiceMode = () => {
    if (isListening) {
      // Stop the web speech API if it's active
      recognitionRef.current?.stop();
      setIsListening(false);
    }
    
    setIsVoiceModeActive(prev => !prev);
  };

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh] rounded-lg border">
      <div className="bg-primary text-white p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm text-white/80">{subtitle}</p>
        </div>
        {/* Voice Chat Mode Toggle Button */}
        <Button
          onClick={toggleVoiceMode}
          variant="outline"
          className="bg-white/20 text-white hover:bg-white/30 border-white/30"
          title={isVoiceModeActive ? "End voice chat" : "Start voice chat"}
        >
          <Phone className="h-5 w-5 mr-2" />
          {isVoiceModeActive ? 
            (language === 'kannada' ? 'ಧ್ವನಿ ಮೋಡ್ ಆಫ್' : 'End Call') : 
            (language === 'kannada' ? 'ಧ್ವನಿ ಮೋಡ್' : 'Voice Mode')}
        </Button>
      </div>
      
      {isVoiceModeActive ? (
        /* Voice Chat Mode UI */
        <VoiceChatMode
          language={language}
          onSendMessage={handleSendMessage}
          onToggleVoiceMode={toggleVoiceMode}
          isActive={isVoiceModeActive}
        />
      ) : (
        /* Regular Chat UI */
        <>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 ${
                  message.role === "user" ? "flex justify-end" : "flex justify-start"
                }`}
              >
                <Card className={`max-w-[80%] ${
                  message.role === "user" ? "bg-primary text-white" : "bg-white"
                }`}>
                  <CardContent className="p-3">
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <div className={`text-xs mt-1 ${
                      message.role === "user" ? "text-white/70" : "text-gray-400"
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <Separator />
          
          <form onSubmit={handleSendMessage} className="p-4 bg-white rounded-b-lg">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                placeholder={placeholder}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 min-h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-black ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isLoading}
              />
              <Button 
                type="button" 
                variant="ghost"
                onClick={toggleListening}
                className={`px-3 transition-colors duration-300 ${
                  !isListening 
                    ? "bg-red-100 text-red-600 hover:bg-red-500 hover:text-white" 
                    : "bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white"
                }`}
                disabled={isLoading}
                title={!isListening ? t('chat.startRecording') : t('chat.stopRecording')}
              >
                {!isListening ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
                <span className="sr-only">{!isListening ? t('chat.startRecording') : t('chat.stopRecording')}</span>
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                title={t('chat.send')}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <SendHorizontal className="h-4 w-4" />
                )}
                <span className="sr-only">{t('chat.send')}</span>
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatInterface;
