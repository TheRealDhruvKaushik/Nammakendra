import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'english' | 'kannada';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string; // Translation function
}

const defaultContextValue: LanguageContextType = {
  language: 'english',
  setLanguage: () => {},
  t: (key: string) => key,
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

// Translations dictionary
const translations: Record<Language, Record<string, string>> = {
  english: {
    // Navigation
    'nav.home': 'Home',
    'nav.sahayak': 'Namma Sahayak',
    'nav.vidhana': 'Namma Vidhana',
    'nav.contact': 'Contact',
    'nav.slogan': 'Legal Assistance Simplified',
    
    // Chat interface
    'chat.title': 'NammaSahayak Chat',
    'chat.subtitle': 'Ask me any legal questions you have',
    'chat.placeholder': 'Type your legal question...',
    'chat.send': 'Send message',
    'chat.startRecording': 'Start recording',
    'chat.stopRecording': 'Stop recording',
    'chat.welcome': 'Hello! I\'m NammaSahayak, your legal assistant. How can I help you today?',
    'chat.error': 'Failed to get a response. Please try again.',
    'chat.speechError': 'Failed to recognize speech. Please try again.',
    'chat.speechNotSupported': 'Your browser doesn\'t support speech recognition.',
    
    // Document upload
    'document.title': 'Upload Legal Document',
    'document.description': 'Upload your legal document to get a simplified explanation. We support PDF, DOCX, and TXT files up to 10MB.',
    'document.drag': 'Drag and drop your document here',
    'document.browse': 'or click to browse files (PDF, DOCX, TXT up to 10MB)',
    'document.browseButton': 'Browse Files',
    'document.remove': 'Remove',
    'document.analyze': 'Analyze Document',
    'document.processing': 'Processing...',
    'document.howItWorks': 'How It Works',
    'document.step1': 'Upload your legal document (court order, contract, etc.)',
    'document.step2': 'Our AI will analyze the document',
    'document.step3': 'Get a simplified explanation with highlighted key points',
    'document.step4': 'See deadlines, requirements, and actions needed',
    
    // Page titles
    'page.vidhana.title': 'NammaVidhana Document Simplifier',
    'page.vidhana.description': 'Upload legal documents and get them explained in simple, easy-to-understand language. Our AI helps you make sense of complex legal jargon.',
    'page.vidhana.service': 'Document Simplification Service',
    'page.vidhana.serviceDesc': 'Our tool analyzes legal documents and translates them into plain language that\'s easy to understand. You\'ll get:',
    'page.vidhana.feature1': 'A simplified summary of the entire document',
    'page.vidhana.feature2': 'Highlighted key points and important information',
    'page.vidhana.feature3': 'Clear explanation of legal terms used',
    'page.vidhana.feature4': 'Important dates, deadlines, and required actions',
    'page.vidhana.benefit': 'This service helps you understand legal documents without needing to hire an expensive lawyer for basic explanations.',
    'page.vidhana.documentTypes': 'Documents You Can Upload',
    'page.vidhana.docType1': 'Court Notices and Orders',
    'page.vidhana.docType2': 'Legal Contracts and Agreements',
    'page.vidhana.docType3': 'Government Notices',
    'page.vidhana.docType4': 'Property Documents',
    
    // Language selector
    'language.english': 'English',
    'language.kannada': 'ಕನ್ನಡ',
  },
  
  kannada: {
    // Navigation
    'nav.home': 'ಮುಖಪುಟ',
    'nav.sahayak': 'ನಮ್ಮ ಸಹಾಯಕ',
    'nav.vidhana': 'ನಮ್ಮ ವಿಧಾನ',
    'nav.contact': 'ಸಂಪರ್ಕ',
    'nav.slogan': 'ಕಾನೂನು ಸಹಾಯ ಸರಳೀಕರಿಸಲಾಗಿದೆ',
    
    // Chat interface
    'chat.title': 'ನಮ್ಮ ಸಹಾಯಕ ಚಾಟ್',
    'chat.subtitle': 'ನಿಮಗಿರುವ ಯಾವುದೇ ಕಾನೂನು ಪ್ರಶ್ನೆಗಳನ್ನು ನನ್ನನ್ನು ಕೇಳಿ',
    'chat.placeholder': 'ನಿಮ್ಮ ಕಾನೂನು ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ...',
    'chat.send': 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
    'chat.startRecording': 'ರೆಕಾರ್ಡಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ',
    'chat.stopRecording': 'ರೆಕಾರ್ಡಿಂಗ್ ನಿಲ್ಲಿಸಿ',
    'chat.welcome': 'ನಮಸ್ಕಾರ! ನಾನು ನಮ್ಮ ಸಹಾಯಕ, ನಿಮ್ಮ ಕಾನೂನು ಸಹಾಯಕ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
    'chat.error': 'ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಪಡೆಯಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
    'chat.speechError': 'ಮಾತನ್ನು ಗುರುತಿಸಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
    'chat.speechNotSupported': 'ನಿಮ್ಮ ಬ್ರೌಸರ್ ಮಾತನ್ನು ಗುರುತಿಸುವಿಕೆಯನ್ನು ಬೆಂಬಲಿಸುವುದಿಲ್ಲ.',
    
    // Document upload
    'document.title': 'ಕಾನೂನು ದಾಖಲೆಯನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ',
    'document.description': 'ಸರಳೀಕೃತ ವಿವರಣೆಯನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ಕಾನೂನು ದಾಖಲೆಯನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ. ನಾವು PDF, DOCX, ಮತ್ತು TXT ಫೈಲ್‌ಗಳನ್ನು 10MB ವರೆಗೆ ಬೆಂಬಲಿಸುತ್ತೇವೆ.',
    'document.drag': 'ನಿಮ್ಮ ಡಾಕ್ಯುಮೆಂಟ್ ಅನ್ನು ಇಲ್ಲಿ ಎಳೆದು ಬಿಡಿ',
    'document.browse': 'ಅಥವಾ ಫೈಲ್‌ಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ (PDF, DOCX, TXT 10MB ವರೆಗೆ)',
    'document.browseButton': 'ಫೈಲ್‌ಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ',
    'document.remove': 'ತೆಗೆದುಹಾಕಿ',
    'document.analyze': 'ಡಾಕ್ಯುಮೆಂಟ್ ವಿಶ್ಲೇಷಿಸಿ',
    'document.processing': 'ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...',
    'document.howItWorks': 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
    'document.step1': 'ನಿಮ್ಮ ಕಾನೂನು ದಾಖಲೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ (ನ್ಯಾಯಾಲಯದ ಆದೇಶ, ಒಪ್ಪಂದ, ಇತ್ಯಾದಿ)',
    'document.step2': 'ನಮ್ಮ AI ದಾಖಲೆಯನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತದೆ',
    'document.step3': 'ಪ್ರಮುಖ ಅಂಶಗಳೊಂದಿಗೆ ಸರಳೀಕೃತ ವಿವರಣೆಯನ್ನು ಪಡೆಯಿರಿ',
    'document.step4': 'ಗಡುವುಗಳು, ಅಗತ್ಯತೆಗಳು ಮತ್ತು ಅಗತ್ಯವಿರುವ ಕ್ರಮಗಳನ್ನು ನೋಡಿ',
    
    // Page titles
    'page.vidhana.title': 'ನಮ್ಮ ವಿಧಾನ ಡಾಕ್ಯುಮೆಂಟ್ ಸಿಂಪ್ಲಿಫೈಯರ್',
    'page.vidhana.description': 'ಕಾನೂನು ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ಅವುಗಳನ್ನು ಸರಳ, ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸುಲಭವಾದ ಭಾಷೆಯಲ್ಲಿ ವಿವರಿಸಿ. ನಮ್ಮ AI ಜಟಿಲ ಕಾನೂನು ಜಾರ್ಗಾನ್ ಅನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    'page.vidhana.service': 'ಡಾಕ್ಯುಮೆಂಟ್ ಸಿಂಪ್ಲಿಫಿಕೇಶನ್ ಸೇವೆ',
    'page.vidhana.serviceDesc': 'ನಮ್ಮ ಸಾಧನವು ಕಾನೂನು ದಾಖಲೆಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತದೆ ಮತ್ತು ಅವುಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸುಲಭವಾದ ಸರಳ ಭಾಷೆಗೆ ಅನುವಾದಿಸುತ್ತದೆ. ನೀವು ಪಡೆಯುವಿರಿ:',
    'page.vidhana.feature1': 'ಸಂಪೂರ್ಣ ದಾಖಲೆಯ ಸರಳೀಕೃತ ಸಾರಾಂಶ',
    'page.vidhana.feature2': 'ಪ್ರಮುಖ ಅಂಶಗಳು ಮತ್ತು ಮಹತ್ವದ ಮಾಹಿತಿಯನ್ನು ಹೈಲೈಟ್ ಮಾಡಲಾಗಿದೆ',
    'page.vidhana.feature3': 'ಬಳಸಿದ ಕಾನೂನು ಪದಗಳ ಸ್ಪಷ್ಟ ವಿವರಣೆ',
    'page.vidhana.feature4': 'ಮುಖ್ಯ ದಿನಾಂಕಗಳು, ಗಡುವುಗಳು ಮತ್ತು ಅಗತ್ಯವಿರುವ ಕ್ರಮಗಳು',
    'page.vidhana.benefit': 'ಈ ಸೇವೆಯು ಮೂಲಭೂತ ವಿವರಣೆಗಳಿಗಾಗಿ ದುಬಾರಿ ವಕೀಲರನ್ನು ನೇಮಿಸಿಕೊಳ್ಳದೆ ಕಾನೂನು ದಾಖಲೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    'page.vidhana.documentTypes': 'ನೀವು ಅಪ್ಲೋಡ್ ಮಾಡಬಹುದಾದ ದಾಖಲೆಗಳು',
    'page.vidhana.docType1': 'ನ್ಯಾಯಾಲಯದ ನೋಟೀಸುಗಳು ಮತ್ತು ಆದೇಶಗಳು',
    'page.vidhana.docType2': 'ಕಾನೂನು ಒಪ್ಪಂದಗಳು ಮತ್ತು ಒಪ್ಪಂದಗಳು',
    'page.vidhana.docType3': 'ಸರ್ಕಾರದ ನೋಟೀಸುಗಳು',
    'page.vidhana.docType4': 'ಆಸ್ತಿ ದಾಖಲೆಗಳು',
    
    // Language selector
    'language.english': 'English',
    'language.kannada': 'ಕನ್ನಡ',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('english');
  
  // Load language preference from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'english' || savedLanguage === 'kannada')) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    
    // Dispatch a custom event so other components can react to language changes
    const event = new CustomEvent('languageChange', { detail: { language } });
    window.dispatchEvent(event);
  }, [language]);
  
  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t
  };
  
  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);