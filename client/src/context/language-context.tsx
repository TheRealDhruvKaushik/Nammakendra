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
    
    // Hero Section
    'hero.title': 'Legal Help Made Simple',
    'hero.subtitle': 'Access legal information in a way you can understand',
    'hero.getStarted': 'Get Started',
    'hero.learnMore': 'Learn More',
    'hero.name': 'NammaKendra',
    'hero.tagline': 'Legal Assistance Simplified - Your resource for legal knowledge',
    'hero.mission': 'Our mission is to make legal knowledge accessible to all through AI-powered tools and easy-to-understand content.',
    
    // Services Section
    'services.title': 'Our Services',
    'services.subtitle': 'We provide tools to help you navigate complex legal matters with ease and confidence.',
    'services.sahayak.title': 'Namma Sahayak',
    'services.sahayak.description': 'Our AI-powered chatbot that answers your legal questions in simple language and helps guide you through common legal procedures.',
    'services.sahayak.feature1': '✔️24/7 answers to legal questions',
    'services.sahayak.feature2': '✔️Simple explanations of complex terms',
    'services.sahayak.feature3': '✔️Step-by-step guidance for procedures',
    'services.sahayak.button': 'Chat with Sahayak',
    'services.vidhana.title': 'Namma Vidhana',
    'services.vidhana.description': 'Upload legal documents to scan, simplify, and explain them in everyday language.',
    'services.vidhana.feature1': '✔️Scan and analyze legal documents',
    'services.vidhana.feature2': '✔️Get simplified summaries',
    'services.vidhana.feature3': '✔️Highlight important sections and deadlines',
    'services.vidhana.button': 'Upload Document',
    
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
    
    // Footer
    'footer.quickLinks': 'Quick Links',
    'footer.services': 'Our Services',
    'footer.contact': 'Contact Us',
    'footer.address': '123 Main Street, Bangalore, Karnataka',
    'footer.phone': '+91 123 456 7890',
    'footer.email': 'info@nammasahayak.org',
    'footer.copyright': 'All rights reserved.',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.accessibility': 'Accessibility',
    'footer.slogan': 'Making legal knowledge accessible to all',
    
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
    
    // Hero Section
    'hero.title': 'ಕಾನೂನು ಸಹಾಯ ಸರಳವಾಗಿಸಲಾಗಿದೆ',
    'hero.subtitle': 'ನಿಮಗೆ ಅರ್ಥವಾಗುವ ರೀತಿಯಲ್ಲಿ ಕಾನೂನು ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಿರಿ',
    'hero.getStarted': 'ಆರಂಭಿಸಿ',
    'hero.learnMore': 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',
    'hero.name': 'ನಮ್ಮಕೇಂದ್ರ',
    'hero.tagline': 'ಕಾನೂನು ಸಹಾಯ ಸರಳೀಕರಿಸಲಾಗಿದೆ - ಕಾನೂನು ಜ್ಞಾನಕ್ಕಾಗಿ ನಿಮ್ಮ ಸಂಪನ್ಮೂಲ',
    'hero.mission': 'ನಮ್ಮ ಗುರಿ ಎಲ್ಲರಿಗೂ ಕಾನೂನು ಜ್ಞಾನವನ್ನು AI-ಆಧಾರಿತ ಉಪಕರಣಗಳು ಮತ್ತು ಸುಲಭವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಬಹುದಾದ ವಿಷಯಗಳ ಮೂಲಕ ಲಭ್ಯವಾಗುವಂತೆ ಮಾಡುವುದು.',
    
    // Services Section
    'services.title': 'ನಮ್ಮ ಸೇವೆಗಳು',
    'services.subtitle': 'ನಾವು ಜಟಿಲ ಕಾನೂನು ವಿಷಯಗಳನ್ನು ಸುಲಭ ಮತ್ತು ವಿಶ್ವಾಸದೊಂದಿಗೆ ನ್ಯಾವಿಗೇಟ್ ಮಾಡಲು ಸಹಾಯ ಮಾಡುವ ಉಪಕರಣಗಳನ್ನು ಒದಗಿಸುತ್ತೇವೆ.',
    'services.sahayak.title': 'ನಮ್ಮ ಸಹಾಯಕ',
    'services.sahayak.description': 'ನಮ್ಮ AI-ಆಧಾರಿತ ಚಾಟ್‌ಬಾಟ್ ನಿಮ್ಮ ಕಾನೂನು ಪ್ರಶ್ನೆಗಳಿಗೆ ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಉತ್ತರಿಸುತ್ತದೆ ಮತ್ತು ಸಾಮಾನ್ಯ ಕಾನೂನು ಕ್ರಮವಿಧಾನಗಳ ಮೂಲಕ ನಿಮಗೆ ಮಾರ್ಗದರ್ಶನ ಮಾಡಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    'services.sahayak.feature1': '✔️ಕಾನೂನು ಪ್ರಶ್ನೆಗಳಿಗೆ 24/7 ಉತ್ತರಗಳು',
    'services.sahayak.feature2': '✔️ಜಟಿಲ ಪದಗಳ ಸರಳ ವಿವರಣೆಗಳು',
    'services.sahayak.feature3': '✔️ಕಾರ್ಯವಿಧಾನಗಳಿಗೆ ಹಂತ-ಹಂತದ ಮಾರ್ಗದರ್ಶನ',
    'services.sahayak.button': 'ಸಹಾಯಕನೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ',
    'services.vidhana.title': 'ನಮ್ಮ ವಿಧಾನ',
    'services.vidhana.description': 'ಕಾನೂನು ದಾಖಲೆಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಲು, ಸರಳೀಕರಿಸಲು ಮತ್ತು ಅವುಗಳನ್ನು ದೈನಂದಿನ ಭಾಷೆಯಲ್ಲಿ ವಿವರಿಸಲು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
    'services.vidhana.feature1': '✔️ಕಾನೂನು ದಾಖಲೆಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಮತ್ತು ವಿಶ್ಲೇಷಿಸಿ',
    'services.vidhana.feature2': '✔️ಸರಳೀಕೃತ ಸಾರಾಂಶಗಳನ್ನು ಪಡೆಯಿರಿ',
    'services.vidhana.feature3': '✔️ಮುಖ್ಯ ವಿಭಾಗಗಳು ಮತ್ತು ಗಡುವುಗಳನ್ನು ಹೈಲೈಟ್ ಮಾಡಿ',
    'services.vidhana.button': 'ಡಾಕ್ಯುಮೆಂಟ್ ಅಪ್ಲೋಡ್ ಮಾಡಿ',
    
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
    
    // Footer
    'footer.quickLinks': 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು',
    'footer.services': 'ನಮ್ಮ ಸೇವೆಗಳು',
    'footer.contact': 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
    'footer.address': '123 ಮುಖ್ಯ ರಸ್ತೆ, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ',
    'footer.phone': '+91 123 456 7890',
    'footer.email': 'info@nammasahayak.org',
    'footer.copyright': 'ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
    'footer.privacyPolicy': 'ಗೌಪ್ಯತಾ ನೀತಿ',
    'footer.terms': 'ಸೇವಾ ನಿಯಮಗಳು',
    'footer.accessibility': 'ಪ್ರವೇಶಿಸುವಿಕೆ',
    'footer.slogan': 'ಕಾನೂನು ಜ್ಞಾನವನ್ನು ಎಲ್ಲರಿಗೂ ಲಭ್ಯವಾಗುವಂತೆ ಮಾಡುವುದು',
    
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