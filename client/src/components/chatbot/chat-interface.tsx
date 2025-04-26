import { useState, useEffect, useRef } from "react";
import { SendHorizontal, Loader2, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
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

const ChatInterface = () => {
  const { t, language } = useLanguage();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: t('chat.welcome'),
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
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
          content: t('chat.welcome')
        };
      }
      return updatedMessages;
    });
  }, [language, t]);
  
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

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/chat", { 
        message: input,
        language: language // Send the current language to the backend
      });
      
      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: t('chat.error'),
        description: t('chat.error'),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh] rounded-lg border">
      <div className="bg-primary text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-bold">{t('chat.title')}</h2>
        <p className="text-sm text-white/80">{t('chat.subtitle')}</p>
      </div>
      
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
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('chat.placeholder')}
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
    </div>
  );
};

export default ChatInterface;
