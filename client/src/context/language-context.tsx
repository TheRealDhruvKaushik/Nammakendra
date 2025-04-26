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
    
    // How It Works Section
    'how.title': 'How It Works',
    'how.subtitle': 'Simple steps to get the legal help you need',
    'how.step1.title': 'Choose a Service',
    'how.step1.description': 'Select either NammaSahayak for questions or NammaVidhana for document assistance.',
    'how.step2.title': 'Provide Information',
    'how.step2.description': 'Ask your question or upload your document that needs explanation.',
    'how.step3.title': 'Get Simple Answers',
    'how.step3.description': 'Receive easy-to-understand explanations and guidance for your legal needs.',
    
    // Testimonials Section
    'testimonials.title': 'What Our Users Say',
    'testimonials.subtitle': 'Real experiences from people we\'ve helped',
    'testimonials.1.name': 'Ramesh K.',
    'testimonials.1.title': 'Retired Teacher',
    'testimonials.1.content': 'NammaSahayak helped me understand my pension rights in simple language. The chatbot explained everything step by step, and I didn\'t feel overwhelmed by legal jargon.',
    'testimonials.2.name': 'Lakshmi M.',
    'testimonials.2.title': 'Homemaker',
    'testimonials.2.content': 'The document scanner was so helpful when I received a complex property notice. It highlighted important dates and explained what actions I needed to take in simple language.',
    'testimonials.3.name': 'Venkat R.',
    'testimonials.3.title': 'Senior Citizen',
    'testimonials.3.content': 'My grandson suggested I try this service when I was confused about healthcare benefits. The large text option and simple explanations made it easy for me to navigate and get answers.',
    
    // CTA Section
    'cta.title': 'Ready to Get Started?',
    'cta.subtitle': 'Access the legal help you need in language you can understand.',
    'cta.chatButton': 'Chat with NammaSahayak',
    'cta.uploadButton': 'Upload a Document',
    
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
    
    // About Us Page
    'about.title': 'ನಮ್ಮ ಬಗ್ಗೆ',
    'about.nammaKendra': 'ನಮ್ಮಕೇಂದ್ರದ ಬಗ್ಗೆ',
    'about.mission': 'ನಮ್ಮ ಉದ್ದೇಶ',
    'about.mission.text1': 'ನಮ್ಮಕೇಂದ್ರ ಸರಳವಾದರೂ ಶಕ್ತಿಯುತವಾದ ಉದ್ದೇಶದೊಂದಿಗೆ ಸ್ಥಾಪಿಸಲಾಗಿದೆ: ಕಾನೂನು ಮಾಹಿತಿಯನ್ನು ಎಲ್ಲರಿಗೂ ಲಭ್ಯವಾಗುವಂತೆ ಮಾಡುವುದು, ವಿಶೇಷವಾಗಿ ಹಿರಿಯ ಮತ್ತು ಅನುಕೂಲವಿಲ್ಲದ ನಾಗರಿಕರಿಗೆ ಸಂಕೀರ್ಣ ಕಾನೂನು ದಾಖಲೆಗಳು ಮತ್ತು ಪ್ರಕ್ರಿಯೆಗಳನ್ನು ನ್ಯಾವಿಗೇಟ್ ಮಾಡಲು ಸಾಧಾರಣವಾಗಿ ಕಷ್ಟಪಡುತ್ತಿದ್ದಾರೆ.',
    'about.mission.text2': 'ನಮ್ಮ ಧ್ಯೇಯವಾಕ್ಯ "ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಸರ್ಕಾರ" ಕಾನೂನು ಸಹಾಯ ಮತ್ತು ಸರ್ಕಾರೀ ಸೇವೆಗಳನ್ನು ನಾಗರಿಕರಿಗೆ ನೇರವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಮತ್ತು ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳಲು ಸುಲಭವಾದ ರೀತಿಯಲ್ಲಿ ತರುವ ನಮ್ಮ ಬದ್ಧತೆಯನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತದೆ.',
    'about.services': 'ನಮ್ಮ ಸೇವೆಗಳು',
    'about.sahayak.title': 'ನಮ್ಮಸಹಾಯಕ (ನಮ್ಮ ಸಹಾಯಕ)',
    'about.sahayak.description': 'ಕಾನೂನು ಹಕ್ಕುಗಳು, ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ಕಾರ್ಯವಿಧಾನಗಳ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳಿಗೆ ಸರಳ, ದೈನಂದಿನ ಭಾಷೆಯಲ್ಲಿ ಉತ್ತರಿಸಬಲ್ಲ AI-ಪವರ್ಡ್ ಸಹಾಯಕ.',
    'about.vidhana.title': 'ನಮ್ಮವಿಧಾನ (ನಮ್ಮ ವ್ಯವಸ್ಥೆ)',
    'about.vidhana.description': 'ಸಂಕೀರ್ಣ ಕಾನೂನು ದಾಖಲೆಗಳನ್ನು ಪ್ರಮುಖ ಅಂಶಗಳೊಂದಿಗೆ ಸ್ಪಷ್ಟ, ಅರ್ಥಮಾಡಿಕೊಳ್ಳಬಹುದಾದ ಭಾಷೆಯಲ್ಲಿ ವಿಭಜಿಸುವ ದಾಖಲೆ ಸರಳೀಕರಣ ಉಪಕರಣ.',
    'about.team': 'ನಮ್ಮ ತಂಡ',
    'about.team.text1': 'ನಮ್ಮಕೇಂದ್ರವನ್ನು ಕಾನೂನು ಮಾಹಿತಿಯನ್ನು ಪ್ರಜಾಪ್ರಭುತ್ವಗೊಳಿಸುವ ಸಾಮಾನ್ಯ ಗುರಿಯನ್ನು ಹಂಚಿಕೊಳ್ಳುವ ಕಾನೂನು ತಜ್ಞರು, ತಂತ್ರಜ್ಞಾನಿಗಳು ಮತ್ತು ಸಾಮಾಜಿಕ ವಕೀಲರ ತಂಡವು ಸ್ಥಾಪಿಸಿದೆ. ನಮ್ಮ ವೈವಿಧ್ಯಮಯ ತಂಡವು ಕಾನೂನು, ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ, ಬಳಕೆದಾರ ಅನುಭವ ವಿನ್ಯಾಸ ಮತ್ತು ಸಮುದಾಯ ಔಟ್‌ರೀಚ್‌ನಲ್ಲಿ ಪರಿಣಿತಿಯನ್ನು ಒಟ್ಟುಗೂಡಿಸುತ್ತದೆ.',
    'about.team.text2': 'ನಮ್ಮ ಸೇವೆಗಳು ಸಂಬಂಧಪಟ್ಟವೆ, ನಿಖರವಾಗಿವೆ ಮತ್ತು ಅವುಗಳನ್ನು ಅತ್ಯಂತ ಅಗತ್ಯವಿರುವವರಿಗೆ ನಿಜವಾಗಿಯೂ ಪ್ರಯೋಜನಕಾರಿಯಾಗಿವೆ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು ನಾವು ಸರ್ಕಾರಿ ಇಲಾಖೆಗಳು, ಕಾನೂನು ನೆರವು ಸಂಸ್ಥೆಗಳು ಮತ್ತು ಸಮುದಾಯ ಗುಂಪುಗಳೊಂದಿಗೆ ಸಕ್ರಿಯವಾಗಿ ಸಹಕರಿಸುತ್ತೇವೆ.',
    'about.commitment': 'ನಮ್ಮ ಬದ್ಧತೆ',
    'about.commitment.text1': 'ನಾವು ತಂತ್ರಜ್ಞಾನ, ಸರಳ ಭಾಷೆ ಮತ್ತು ಸಮಾವೇಶಿ ವಿನ್ಯಾಸದ ಮೂಲಕ ಕಾನೂನು ಮಾಹಿತಿಗೆ ಅಡ್ಡಿಗಳನ್ನು ತೆಗೆದುಹಾಕಲು ಬದ್ಧರಾಗಿದ್ದೇವೆ. ನಿಮ್ಮ ಹಕ್ಕುಗಳು ಮತ್ತು ಕಡ್ಡಾಯಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು ಸಂಪೂರ್ಣ ಪೌರತ್ವಕ್ಕೆ ಮೂಲಭೂತವಾಗಿದೆ ಎಂದು ನಾವು ನಂಬುತ್ತೇವೆ, ಮತ್ತು ಶಿಕ್ಷಣ, ಹಿನ್ನೆಲೆ ಅಥವಾ ತಾಂತ್ರಿಕ ಪ್ರವೀಣತೆಯನ್ನು ಲೆಕ್ಕಿಸದೆ ಎಲ್ಲರಿಗೂ ಇದನ್ನು ಸಾಧ್ಯವಾಗಿಸಲು ನಾವು ಪ್ರಯತ್ನಿಸುತ್ತೇವೆ.',
    'about.commitment.text2': 'ನಮ್ಮಕೇಂದ್ರವು ನಿರಂತರ ಸುಧಾರಣೆ, ಸಮುದಾಯದ ಅಗತ್ಯತೆಗಳಿಗೆ ಪ್ರತಿಕ್ರಿಯಿಸುವುದು ಮತ್ತು ವಿವಿಧ ಪ್ರದೇಶಗಳು ಮತ್ತು ಭಾಷೆಗಳಲ್ಲಿ ಹೆಚ್ಚಿನ ನಾಗರಿಕರನ್ನು ತಲುಪಲು ನಮ್ಮ ಸೇವೆಗಳನ್ನು ವಿಸ್ತರಿಸುವುದಕ್ಕೆ ಸಮರ್ಪಿತವಾಗಿದೆ.',
    
    // Contact Page
    'contact.title': 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
    'contact.subtitle': 'ಪ್ರಶ್ನೆಗಳಿದ್ದರೆ ಅಥವಾ ಸಹಾಯ ಬೇಕಾದರೆ? ನಾವು ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದ್ದೇವೆ. ಕೆಳಗಿನ ಫಾರ್ಮ್ ಅನ್ನು ಭರ್ತಿ ಮಾಡಿ ಅಥವಾ ಪರ್ಯಾಯ ಸಂಪರ್ಕ ವಿಧಾನಗಳನ್ನು ಬಳಸಿ.',
    'contact.phone': 'ಫೋನ್',
    'contact.phone.availability': 'ಸೋಮವಾರದಿಂದ ಶುಕ್ರವಾರದವರೆಗೆ, ಬೆಳಿಗ್ಗೆ 9 ರಿಂದ ಸಂಜೆ 5 ರವರೆಗೆ ಲಭ್ಯವಿದೆ',
    'contact.email': 'ಇಮೇಲ್',
    'contact.email.response': 'ನಾವು 24 ಗಂಟೆಗಳೊಳಗೆ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತೇವೆ',
    'contact.address': 'ವಿಳಾಸ',
    'contact.form.name': 'ಹೆಸರು',
    'contact.form.email': 'ಇಮೇಲ್ ವಿಳಾಸ',
    'contact.form.phone': 'ಫೋನ್ ಸಂಖ್ಯೆ (ಐಚ್ಛಿಕ)',
    'contact.form.subject': 'ವಿಷಯ',
    'contact.form.message': 'ಸಂದೇಶ',
    'contact.form.submit': 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
    'contact.form.success': 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ!',
    'contact.form.error': 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಕಳುಹಿಸುವಾಗ ದೋಷ ಸಂಭವಿಸಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
    'contact.form.nameRequired': 'ಹೆಸರು ಅಗತ್ಯವಿದೆ',
    'contact.form.emailRequired': 'ಇಮೇಲ್ ಅಗತ್ಯವಿದೆ',
    'contact.form.emailInvalid': 'ಮಾನ್ಯವಾದ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ಒದಗಿಸಿ',
    'contact.form.subjectRequired': 'ವಿಷಯ ಅಗತ್ಯವಿದೆ',
    'contact.form.messageRequired': 'ಸಂದೇಶ ಅಗತ್ಯವಿದೆ',
    'contact.form.messageTooShort': 'ಸಂದೇಶವು ಕನಿಷ್ಠ 10 ಅಕ್ಷರಗಳನ್ನು ಹೊಂದಿರಬೇಕು',
    
    // NammaSahayak Page
    'sahayak.title': 'ನಮ್ಮ ಸಹಾಯಕ',
    'sahayak.subtitle': 'ಕಾನೂನು ಪ್ರಶ್ನೆಗಳಿಗೆ ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಉತ್ತರಗಳನ್ನು ಪಡೆಯಿರಿ',
    'sahayak.description': 'ನಮ್ಮ ಸಹಾಯಕವು ಕಾನೂನು ಹಕ್ಕುಗಳು, ಕಾರ್ಯವಿಧಾನಗಳು ಮತ್ತು ನಿಮ್ಮ ಕಾನೂನು ಪ್ರಶ್ನೆಗಳಿಗೆ ಸಂಬಂಧಿಸಿದ ಮಾಹಿತಿಯನ್ನು ನೀಡುವ AI-ಆಧಾರಿತ ಚಾಟ್‌ಬಾಟ್ ಆಗಿದೆ. ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ನಿಮ್ಮ ಮೈಕ್ರೋಫೋನ್ ಬಳಸಿ ಮಾತನಾಡಿ.',
    'sahayak.features.title': 'ಈ ಸೇವೆಯ ವೈಶಿಷ್ಟ್ಯಗಳು',
    'sahayak.feature1.title': 'ಸರಳವಾದ ವಿವರಣೆಗಳು',
    'sahayak.feature1.description': 'ಕಾನೂನು ಪರಿಭಾಷೆಯನ್ನು ನೀವು ಸುಲಭವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಬಹುದಾದ ಭಾಷೆಗೆ ಅನುವಾದಿಸುತ್ತೇವೆ.',
    'sahayak.feature2.title': 'ಧ್ವನಿ ಒಳಹೊಕ್ಕುವಿಕೆ',
    'sahayak.feature2.description': 'ಟೈಪ್ ಮಾಡಲು ಅಲ್ಲಿ ಬೇಡಿರಿ - ಕೇವಲ ಮಾತನಾಡಿ ಮತ್ತು ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ.',
    'sahayak.feature3.title': '24/7 ಲಭ್ಯತೆ',
    'sahayak.feature3.description': 'ನಿಮ್ಮ ಕಾನೂನು ಪ್ರಶ್ನೆಗಳಿಗೆ ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ಸಹಾಯವನ್ನು ಪಡೆಯಿರಿ.',
    'sahayak.commonTopics': 'ಸಾಮಾನ್ಯ ವಿಷಯಗಳು',
    'sahayak.topic1': 'ಆಸ್ತಿ ಹಕ್ಕುಗಳು ಮತ್ತು ವಿವಾದಗಳು',
    'sahayak.topic2': 'ಪಿಂಚಣಿ ಮತ್ತು ಸಾಮಾಜಿಕ ಭದ್ರತೆಯ ಪ್ರಯೋಜನಗಳು',
    'sahayak.topic3': 'ಕುಟುಂಬ ಕಾನೂನು ಮತ್ತು ಉತ್ತರಾಧಿಕಾರ',
    'sahayak.topic4': 'ಗ್ರಾಹಕ ಹಕ್ಕುಗಳು',
    'sahayak.tip': 'ಸಲಹೆ: ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಸಾಧ್ಯವಾದಷ್ಟು ನಿರ್ದಿಷ್ಟವಾಗಿ ಕೇಳಲು ಪ್ರಯತ್ನಿಸಿ ಇದರಿಂದ ನಾವು ನಿಮಗೆ ಹೆಚ್ಚು ಸಹಾಯಕವಾದ ಉತ್ತರವನ್ನು ನೀಡಬಹುದು.',
    
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
    
    // How It Works Section
    'how.title': 'ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
    'how.subtitle': 'ನಿಮಗೆ ಅಗತ್ಯವಾದ ಕಾನೂನು ಸಹಾಯವನ್ನು ಪಡೆಯಲು ಸರಳ ಹಂತಗಳು',
    'how.step1.title': 'ಸೇವೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ',
    'how.step1.description': 'ಪ್ರಶ್ನೆಗಳಿಗೆ ನಮ್ಮ ಸಹಾಯಕ ಅಥವಾ ದಾಖಲೆ ಸಹಾಯಕ್ಕೆ ನಮ್ಮ ವಿಧಾನವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.',
    'how.step2.title': 'ಮಾಹಿತಿ ಒದಗಿಸಿ',
    'how.step2.description': 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ ಅಥವಾ ವಿವರಣೆಯ ಅಗತ್ಯವಿರುವ ನಿಮ್ಮ ದಾಖಲೆಯನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ.',
    'how.step3.title': 'ಸರಳ ಉತ್ತರಗಳನ್ನು ಪಡೆಯಿರಿ',
    'how.step3.description': 'ನಿಮ್ಮ ಕಾನೂನು ಅಗತ್ಯತೆಗಳಿಗೆ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸುಲಭವಾದ ವಿವರಣೆಗಳು ಮತ್ತು ಮಾರ್ಗದರ್ಶನವನ್ನು ಪಡೆಯಿರಿ.',
    
    // Testimonials Section
    'testimonials.title': 'ನಮ್ಮ ಬಳಕೆದಾರರು ಏನು ಹೇಳುತ್ತಾರೆ',
    'testimonials.subtitle': 'ನಾವು ಸಹಾಯ ಮಾಡಿದ ಜನರ ನಿಜವಾದ ಅನುಭವಗಳು',
    'testimonials.1.name': 'ರಮೇಶ್ ಕೆ.',
    'testimonials.1.title': 'ನಿವೃತ್ತ ಶಿಕ್ಷಕ',
    'testimonials.1.content': 'ನಮ್ಮಸಹಾಯಕ ನನಗೆ ನನ್ನ ಪಿಂಚಣಿ ಹಕ್ಕುಗಳನ್ನು ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡಿತು. ಚಾಟ್‌ಬಾಟ್ ಪ್ರತಿಯೊಂದನ್ನೂ ಹಂತ ಹಂತವಾಗಿ ವಿವರಿಸಿತು ಮತ್ತು ನಾನು ಕಾನೂನು ಪರಿಭಾಷೆಯಿಂದ ಅಭಿಭೂತನಾಗಿರಲಿಲ್ಲ.',
    'testimonials.2.name': 'ಲಕ್ಷ್ಮಿ ಎಂ.',
    'testimonials.2.title': 'ಗೃಹಿಣಿ',
    'testimonials.2.content': 'ನಾನು ಸಂಕೀರ್ಣ ಆಸ್ತಿ ಸೂಚನೆಯನ್ನು ಸ್ವೀಕರಿಸಿದಾಗ ಡಾಕ್ಯುಮೆಂಟ್ ಸ್ಕ್ಯಾನರ್ ತುಂಬಾ ಸಹಾಯಕವಾಗಿತ್ತು. ಇದು ಮುಖ್ಯ ದಿನಾಂಕಗಳನ್ನು ಹೈಲೈಟ್ ಮಾಡಿತು ಮತ್ತು ನಾನು ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಯಾವ ಕ್ರಮಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಬೇಕೆಂದು ವಿವರಿಸಿತು.',
    'testimonials.3.name': 'ವೆಂಕಟ್ ಆರ್.',
    'testimonials.3.title': 'ಹಿರಿಯ ನಾಗರಿಕ',
    'testimonials.3.content': 'ನಾನು ಆರೋಗ್ಯ ರಕ್ಷಣೆ ಪ್ರಯೋಜನಗಳ ಬಗ್ಗೆ ಗೊಂದಲದಲ್ಲಿದ್ದಾಗ ನನ್ನ ಮೊಮ್ಮಗ ಈ ಸೇವೆಯನ್ನು ಪ್ರಯತ್ನಿಸಲು ಸೂಚಿಸಿದನು. ದೊಡ್ಡ ಪಠ್ಯ ಆಯ್ಕೆ ಮತ್ತು ಸರಳ ವಿವರಣೆಗಳು ನನಗೆ ನ್ಯಾವಿಗೇಟ್ ಮಾಡಲು ಮತ್ತು ಉತ್ತರಗಳನ್ನು ಪಡೆಯಲು ಸುಲಭವಾಯಿತು.',
    
    // CTA Section
    'cta.title': 'ಪ್ರಾರಂಭಿಸಲು ಸಿದ್ಧವಾಗಿದ್ದೀರಾ?',
    'cta.subtitle': 'ನಿಮಗೆ ಅರ್ಥವಾಗುವ ಭಾಷೆಯಲ್ಲಿ ನಿಮಗೆ ಬೇಕಾದ ಕಾನೂನು ಸಹಾಯವನ್ನು ಪಡೆಯಿರಿ.',
    'cta.chatButton': 'ನಮ್ಮ ಸಹಾಯಕನೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ',
    'cta.uploadButton': 'ಡಾಕ್ಯುಮೆಂಟ್ ಅಪ್ಲೋಡ್ ಮಾಡಿ',
    
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
    // NammaVidhana Page
    'vidhana.title': 'ನಮ್ಮ ವಿಧಾನ ಡಾಕ್ಯುಮೆಂಟ್ ಸರಳೀಕರಣ',
    'vidhana.description': 'ಕಾನೂನು ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ಅವುಗಳನ್ನು ಸರಳ, ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸುಲಭವಾದ ಭಾಷೆಯಲ್ಲಿ ವಿವರಿಸಿ. ನಮ್ಮ AI ಜಟಿಲ ಕಾನೂನು ಜಾರ್ಗಾನ್ ಅನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    'vidhana.service': 'ಡಾಕ್ಯುಮೆಂಟ್ ಸರಳೀಕರಣ ಸೇವೆ',
    'vidhana.serviceDesc': 'ನಮ್ಮ ಸಾಧನವು ಕಾನೂನು ದಾಖಲೆಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತದೆ ಮತ್ತು ಅವುಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸುಲಭವಾದ ಸರಳ ಭಾಷೆಗೆ ಅನುವಾದಿಸುತ್ತದೆ. ನೀವು ಪಡೆಯುವಿರಿ:',
    'vidhana.feature1': 'ಸಂಪೂರ್ಣ ದಾಖಲೆಯ ಸರಳೀಕೃತ ಸಾರಾಂಶ',
    'vidhana.feature2': 'ಪ್ರಮುಖ ಅಂಶಗಳು ಮತ್ತು ಮಹತ್ವದ ಮಾಹಿತಿಯನ್ನು ಹೈಲೈಟ್ ಮಾಡಲಾಗಿದೆ',
    'vidhana.feature3': 'ಬಳಸಿದ ಕಾನೂನು ಪದಗಳ ಸ್ಪಷ್ಟ ವಿವರಣೆ',
    'vidhana.feature4': 'ಮುಖ್ಯ ದಿನಾಂಕಗಳು, ಗಡುವುಗಳು ಮತ್ತು ಅಗತ್ಯವಿರುವ ಕ್ರಮಗಳು',
    'vidhana.benefit': 'ಈ ಸೇವೆಯು ಮೂಲಭೂತ ವಿವರಣೆಗಳಿಗಾಗಿ ದುಬಾರಿ ವಕೀಲರನ್ನು ನೇಮಿಸಿಕೊಳ್ಳದೆ ಕಾನೂನು ದಾಖಲೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    'vidhana.documentTypes': 'ನೀವು ಅಪ್ಲೋಡ್ ಮಾಡಬಹುದಾದ ದಾಖಲೆಗಳು',
    'vidhana.docType1': 'ನ್ಯಾಯಾಲಯದ ನೋಟೀಸುಗಳು ಮತ್ತು ಆದೇಶಗಳು',
    'vidhana.docType2': 'ಕಾನೂನು ಒಪ್ಪಂದಗಳು ಮತ್ತು ಒಪ್ಪಂದಗಳು',
    'vidhana.docType3': 'ಸರ್ಕಾರದ ನೋಟೀಸುಗಳು',
    'vidhana.docType4': 'ಆಸ್ತಿ ದಾಖಲೆಗಳು',
    
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