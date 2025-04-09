// Translations for the website
// This file contains key-value pairs for translations in different languages

export type Languages = "english" | "kannada" | "hindi" | "tamil";

// Translation dictionaries for each language
export const translations: Record<Languages, Record<string, string>> = {
  english: {
    // General
    "home": "Home",
    "about": "About Us",
    "services": "Services",
    "contact": "Contact",
    "legal_help": "Legal Help Made Simple",
    "access_legal": "Access, understand, and navigate legal information with ease.",
    "get_started": "Get Started",
    "learn_more": "Learn More",
    "nammakendra": "NammaKendra",
    "motto": "Nimma Maneyalli Sarkara",
    "motto_meaning": "Your trusted partner for legal guidance and support.",
    "our_mission": "We make legal information accessible to everyone, especially elderly and underprivileged citizens.",
    
    // Services section
    "our_services": "Our Services",
    "services_desc": "We provide accessible legal tools that help you understand your rights and navigate complex legal procedures.",
    "namma_sahayak": "NammaSahayak",
    "namma_vidhana": "NammaVidhana",
    "sahayak_desc": "Our AI-powered chatbot that answers your legal questions in simple language and helps guide you through common legal processes.",
    "vidhana_desc": "Upload legal documents to scan, simplify, and explain them in everyday language you can understand.",
    "feature_24_7": "24/7 answers to legal questions",
    "feature_explanations": "Simple explanations of complex terms",
    "feature_guidance": "Step-by-step guidance for procedures",
    "feature_analyze": "Scan and analyze legal documents",
    "feature_summaries": "Get simplified summaries",
    "feature_highlight": "Highlight important sections and deadlines",
    "chat_with_sahayak": "Chat with NammaSahayak",
    "upload_document": "Upload Document",
    
    // How it works section
    "how_it_works": "How It Works",
    "steps_desc": "Simple steps to get the legal help you need",
    "step1_title": "Choose a Service",
    "step1_desc": "Select either NammaSahayak for questions or NammaVidhana for document assistance.",
    "step2_title": "Provide Information",
    "step2_desc": "Ask your question or upload your document that needs explanation.",
    "step3_title": "Get Simple Answers",
    "step3_desc": "Receive easy-to-understand explanations and guidance for your legal needs.",
    
    // Testimonials
    "testimonials": "What Our Users Say",
    "testimonials_desc": "Real experiences from people we've helped",
    
    // CTA Section
    "ready_to_start": "Ready to Get Started?",
    "access_help": "Access the legal help you need in language you can understand.",
    
    // Footer
    "quick_links": "Quick Links",
    "our_services_footer": "Our Services",
    "contact_us": "Contact Us",
    "all_rights": "All rights reserved.",
    "privacy_policy": "Privacy Policy",
    "terms_of_service": "Terms of Service",
    "accessibility": "Accessibility"
  },
  
  kannada: {
    // General
    "home": "ಮುಖಪುಟ",
    "about": "ನಮ್ಮ ಬಗ್ಗೆ",
    "services": "ಸೇವೆಗಳು",
    "contact": "ಸಂಪರ್ಕಿಸಿ",
    "legal_help": "ಕಾನೂನು ನೆರವು ಸುಲಭಗೊಳಿಸಿದೆ",
    "access_legal": "ಕಾನೂನು ಮಾಹಿತಿಯನ್ನು ಸುಲಭವಾಗಿ ಪ್ರವೇಶಿಸಿ, ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ, ಮತ್ತು ನ್ಯಾವಿಗೇಟ್ ಮಾಡಿ.",
    "get_started": "ಪ್ರಾರಂಭಿಸಿ",
    "learn_more": "ಹೆಚ್ಚು ತಿಳಿಯಿರಿ",
    "nammakendra": "ನಮ್ಮಕೇಂದ್ರ",
    "motto": "ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಸರ್ಕಾರ",
    "motto_meaning": "ಕಾನೂನು ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಬೆಂಬಲಕ್ಕಾಗಿ ನಿಮ್ಮ ವಿಶ್ವಾಸಾರ್ಹ ಪಾಲುದಾರ.",
    "our_mission": "ನಾವು ಕಾನೂನು ಮಾಹಿತಿಯನ್ನು ಎಲ್ಲರಿಗೂ, ವಿಶೇಷವಾಗಿ ವಯಸ್ಕ ಮತ್ತು ಅನುಕೂಲವಿಲ್ಲದ ನಾಗರಿಕರಿಗೆ ಲಭ್ಯವಾಗುವಂತೆ ಮಾಡುತ್ತೇವೆ.",
    
    // Services section
    "our_services": "ನಮ್ಮ ಸೇವೆಗಳು",
    "services_desc": "ನಿಮ್ಮ ಹಕ್ಕುಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಮತ್ತು ಸಂಕೀರ್ಣ ಕಾನೂನು ಪ್ರಕ್ರಿಯೆಗಳನ್ನು ನ್ಯಾವಿಗೇಟ್ ಮಾಡಲು ಸಹಾಯ ಮಾಡುವ ಲಭ್ಯವಾಗುವ ಕಾನೂನು ಪರಿಕರಗಳನ್ನು ನಾವು ಒದಗಿಸುತ್ತೇವೆ.",
    "namma_sahayak": "ನಮ್ಮ ಸಹಾಯಕ",
    "namma_vidhana": "ನಮ್ಮ ವಿಧಾನ",
    "sahayak_desc": "ನಿಮ್ಮ ಕಾನೂನು ಪ್ರಶ್ನೆಗಳಿಗೆ ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಉತ್ತರಿಸುವ ಮತ್ತು ಸಾಮಾನ್ಯ ಕಾನೂನು ಪ್ರಕ್ರಿಯೆಗಳ ಮೂಲಕ ನಿಮಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡಲು ಸಹಾಯ ಮಾಡುವ ನಮ್ಮ AI-ಪವರ್ಡ್ ಚಾಟ್‌ಬಾಟ್.",
    "vidhana_desc": "ಪ್ರತಿದಿನದ ಭಾಷೆಯನ್ನು ನೀವು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಬಹುದಾದ ಕಾನೂನು ದಾಖಲೆಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಲು, ಸರಳೀಕರಿಸಲು ಮತ್ತು ವಿವರಿಸಲು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    "feature_24_7": "ಕಾನೂನು ಪ್ರಶ್ನೆಗಳಿಗೆ 24/7 ಉತ್ತರಗಳು",
    "feature_explanations": "ಸಂಕೀರ್ಣ ಪದಗಳ ಸರಳ ವಿವರಣೆಗಳು",
    "feature_guidance": "ಕಾರ್ಯವಿಧಾನಗಳಿಗೆ ಹಂತ-ಹಂತದ ಮಾರ್ಗದರ್ಶನ",
    "feature_analyze": "ಕಾನೂನು ದಾಖಲೆಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಮತ್ತು ವಿಶ್ಲೇಷಿಸಿ",
    "feature_summaries": "ಸರಳೀಕರಿಸಿದ ಸಾರಾಂಶಗಳನ್ನು ಪಡೆಯಿರಿ",
    "feature_highlight": "ಪ್ರಮುಖ ವಿಭಾಗಗಳು ಮತ್ತು ಗಡುವುಗಳನ್ನು ಹೈಲೈಟ್ ಮಾಡಿ",
    "chat_with_sahayak": "ನಮ್ಮ ಸಹಾಯಕದೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ",
    "upload_document": "ಡಾಕ್ಯುಮೆಂಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    
    // How it works section
    "how_it_works": "ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ",
    "steps_desc": "ನಿಮಗೆ ಬೇಕಾದ ಕಾನೂನು ನೆರವು ಪಡೆಯಲು ಸರಳ ಹಂತಗಳು",
    "step1_title": "ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    "step1_desc": "ಪ್ರಶ್ನೆಗಳಿಗೆ ನಮ್ಮ ಸಹಾಯಕ ಅಥವಾ ಡಾಕ್ಯುಮೆಂಟ್ ಸಹಾಯಕ್ಕಾಗಿ ನಮ್ಮ ವಿಧಾನವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    "step2_title": "ಮಾಹಿತಿ ಒದಗಿಸಿ",
    "step2_desc": "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ ಅಥವಾ ವಿವರಣೆ ಅಗತ್ಯವಿರುವ ನಿಮ್ಮ ಡಾಕ್ಯುಮೆಂಟ್ ಅನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    "step3_title": "ಸರಳ ಉತ್ತರಗಳನ್ನು ಪಡೆಯಿರಿ",
    "step3_desc": "ನಿಮ್ಮ ಕಾನೂನು ಅಗತ್ಯಗಳಿಗೆ ಸುಲಭವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಬಹುದಾದ ವಿವರಣೆಗಳು ಮತ್ತು ಮಾರ್ಗದರ್ಶನವನ್ನು ಪಡೆಯಿರಿ.",
    
    // Testimonials
    "testimonials": "ನಮ್ಮ ಬಳಕೆದಾರರು ಏನು ಹೇಳುತ್ತಾರೆ",
    "testimonials_desc": "ನಾವು ಸಹಾಯ ಮಾಡಿದ ಜನರಿಂದ ನಿಜವಾದ ಅನುಭವಗಳು",
    
    // CTA Section
    "ready_to_start": "ಪ್ರಾರಂಭಿಸಲು ಸಿದ್ಧರಾಗಿದ್ದೀರಾ?",
    "access_help": "ನಿಮಗೆ ಅರ್ಥವಾಗುವ ಭಾಷೆಯಲ್ಲಿ ನಿಮಗೆ ಅಗತ್ಯವಿರುವ ಕಾನೂನು ನೆರವನ್ನು ಪಡೆಯಿರಿ.",
    
    // Footer
    "quick_links": "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು",
    "our_services_footer": "ನಮ್ಮ ಸೇವೆಗಳು",
    "contact_us": "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
    "all_rights": "ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
    "privacy_policy": "ಗೌಪ್ಯತಾ ನೀತಿ",
    "terms_of_service": "ಸೇವೆಯ ನಿಯಮಗಳು",
    "accessibility": "ಪ್ರವೇಶಾವಕಾಶ"
  },
  
  hindi: {
    // General
    "home": "होम",
    "about": "हमारे बारे में",
    "services": "सेवाएं",
    "contact": "संपर्क करें",
    "legal_help": "कानूनी मदद सरल बनाई गई",
    "access_legal": "कानूनी जानकारी को आसानी से एक्सेस करें, समझें और नेविगेट करें।",
    "get_started": "शुरू करें",
    "learn_more": "और जानें",
    "nammakendra": "नम्मकेंद्र",
    "motto": "निम्मा मनेयल्ली सरकारा",
    "motto_meaning": "कानूनी मार्गदर्शन और समर्थन के लिए आपका विश्वसनीय साथी।",
    "our_mission": "हम कानूनी जानकारी को हर किसी के लिए सुलभ बनाते हैं, विशेष रूप से बुजुर्ग और वंचित नागरिकों के लिए।",
    
    // Services section
    "our_services": "हमारी सेवाएं",
    "services_desc": "हम सुलभ कानूनी उपकरण प्रदान करते हैं जो आपको अपने अधिकारों को समझने और जटिल कानूनी प्रक्रियाओं को नेविगेट करने में मदद करते हैं।",
    "namma_sahayak": "नम्मा सहायक",
    "namma_vidhana": "नम्मा विधान",
    "sahayak_desc": "हमारा AI-संचालित चैटबॉट जो आपके कानूनी सवालों का सरल भाषा में जवाब देता है और आपको सामान्य कानूनी प्रक्रियाओं के माध्यम से मार्गदर्शन करने में मदद करता है।",
    "vidhana_desc": "कानूनी दस्तावेजों को स्कैन करने, सरल बनाने और उन्हें रोजमर्रा की भाषा में समझाने के लिए अपलोड करें।",
    "feature_24_7": "कानूनी सवालों के लिए 24/7 जवाब",
    "feature_explanations": "जटिल शब्दों के सरल स्पष्टीकरण",
    "feature_guidance": "प्रक्रियाओं के लिए चरण-दर-चरण मार्गदर्शन",
    "feature_analyze": "कानूनी दस्तावेजों को स्कैन करें और विश्लेषण करें",
    "feature_summaries": "सरलीकृत सारांश प्राप्त करें",
    "feature_highlight": "महत्वपूर्ण अनुभागों और समय सीमाओं को हाइलाइट करें",
    "chat_with_sahayak": "नम्मा सहायक से चैट करें",
    "upload_document": "दस्तावेज़ अपलोड करें",
    
    // How it works section
    "how_it_works": "यह कैसे काम करता है",
    "steps_desc": "आपको जिस कानूनी सहायता की आवश्यकता है उसे प्राप्त करने के सरल चरण",
    "step1_title": "सेवा चुनें",
    "step1_desc": "प्रश्नों के लिए नम्मा सहायक या दस्तावेज़ सहायता के लिए नम्मा विधान का चयन करें।",
    "step2_title": "जानकारी प्रदान करें",
    "step2_desc": "अपना प्रश्न पूछें या अपना दस्तावेज़ अपलोड करें जिसे स्पष्टीकरण की आवश्यकता है।",
    "step3_title": "सरल उत्तर प्राप्त करें",
    "step3_desc": "अपनी कानूनी आवश्यकताओं के लिए आसानी से समझने योग्य स्पष्टीकरण और मार्गदर्शन प्राप्त करें।",
    
    // Testimonials
    "testimonials": "हमारे उपयोगकर्ता क्या कहते हैं",
    "testimonials_desc": "हमने जिन लोगों की मदद की है उनके वास्तविक अनुभव",
    
    // CTA Section
    "ready_to_start": "शुरू करने के लिए तैयार हैं?",
    "access_help": "आप जिस भाषा को समझ सकते हैं उसमें आपको आवश्यक कानूनी सहायता प्राप्त करें।",
    
    // Footer
    "quick_links": "त्वरित लिंक",
    "our_services_footer": "हमारी सेवाएं",
    "contact_us": "हमसे संपर्क करें",
    "all_rights": "सर्वाधिकार सुरक्षित।",
    "privacy_policy": "गोपनीयता नीति",
    "terms_of_service": "सेवा की शर्तें",
    "accessibility": "पहुंच"
  },
  
  tamil: {
    // General
    "home": "முகப்பு",
    "about": "எங்களைப் பற்றி",
    "services": "சேவைகள்",
    "contact": "தொடர்பு கொள்ள",
    "legal_help": "சட்ட உதவி எளிதாக்கப்பட்டது",
    "access_legal": "சட்டத் தகவல்களை எளிதாக அணுகவும், புரிந்துகொள்ளவும், வழிசெலுத்தவும்.",
    "get_started": "தொடங்குங்கள்",
    "learn_more": "மேலும் அறிக",
    "nammakendra": "நம்மகேந்திரா",
    "motto": "நிம்மா மனேயல்லி சர்க்கரா",
    "motto_meaning": "சட்ட வழிகாட்டுதல் மற்றும் ஆதரவுக்கு உங்களின் நம்பகமான கூட்டாளி.",
    "our_mission": "நாங்கள் சட்டத் தகவல்களை அனைவருக்கும், குறிப்பாக முதியவர்கள் மற்றும் வசதி குறைந்த குடிமக்களுக்கும் அணுகக்கூடியதாக்குகிறோம்.",
    
    // Services section
    "our_services": "எங்கள் சேவைகள்",
    "services_desc": "உங்கள் உரிமைகளைப் புரிந்துகொள்ளவும், சிக்கலான சட்ட நடைமுறைகளை வழிநடத்தவும் உதவும் அணுகக்கூடிய சட்டக் கருவிகளை நாங்கள் வழங்குகிறோம்.",
    "namma_sahayak": "நம்மா சஹாயக்",
    "namma_vidhana": "நம்மா விதானா",
    "sahayak_desc": "எங்களின் AI-சக்திவாய்ந்த சாட்போட் உங்கள் சட்டக் கேள்விகளுக்கு எளிய மொழியில் பதிலளிக்கிறது மற்றும் பொதுவான சட்ட செயல்முறைகளில் உங்களுக்கு வழிகாட்ட உதவுகிறது.",
    "vidhana_desc": "சட்ட ஆவணங்களை ஸ்கேன் செய்ய, எளிமைப்படுத்த மற்றும் அன்றாட மொழியில் விளக்க பதிவேற்றவும்.",
    "feature_24_7": "சட்டக் கேள்விகளுக்கு 24/7 பதில்கள்",
    "feature_explanations": "சிக்கலான சொற்களின் எளிய விளக்கங்கள்",
    "feature_guidance": "நடைமுறைகளுக்கான படிப்படியான வழிகாட்டுதல்",
    "feature_analyze": "சட்ட ஆவணங்களை ஸ்கேன் செய்து பகுப்பாய்வு செய்யுங்கள்",
    "feature_summaries": "எளிமைப்படுத்தப்பட்ட சுருக்கங்களைப் பெறுங்கள்",
    "feature_highlight": "முக்கியமான பிரிவுகள் மற்றும் காலக்கெடுக்களை முன்னிலைப்படுத்துங்கள்",
    "chat_with_sahayak": "நம்மா சஹாயக்குடன் அரட்டை",
    "upload_document": "ஆவணத்தைப் பதிவேற்றுக",
    
    // How it works section
    "how_it_works": "இது எப்படி செயல்படுகிறது",
    "steps_desc": "உங்களுக்குத் தேவையான சட்ட உதவியைப் பெற எளிய படிகள்",
    "step1_title": "சேவையைத் தேர்ந்தெடுக்கவும்",
    "step1_desc": "கேள்விகளுக்கு நம்மா சஹாயக் அல்லது ஆவண உதவிக்கு நம்மா விதானாவைத் தேர்ந்தெடுக்கவும்.",
    "step2_title": "தகவலை வழங்கவும்",
    "step2_desc": "உங்கள் கேள்வியைக் கேளுங்கள் அல்லது விளக்கம் தேவைப்படும் உங்கள் ஆவணத்தைப் பதிவேற்றவும்.",
    "step3_title": "எளிய பதில்களைப் பெறுங்கள்",
    "step3_desc": "உங்கள் சட்டத் தேவைகளுக்கான எளிதில் புரிந்துகொள்ளக்கூடிய விளக்கங்களையும் வழிகாட்டுதல்களையும் பெறுங்கள்.",
    
    // Testimonials
    "testimonials": "எங்கள் பயனர்கள் என்ன சொல்கிறார்கள்",
    "testimonials_desc": "நாங்கள் உதவிய மக்களின் உண்மையான அனுபவங்கள்",
    
    // CTA Section
    "ready_to_start": "தொடங்கத் தயாரா?",
    "access_help": "நீங்கள் புரிந்துகொள்ளக்கூடிய மொழியில் உங்களுக்குத் தேவையான சட்ட உதவியை அணுகவும்.",
    
    // Footer
    "quick_links": "விரைவு இணைப்புகள்",
    "our_services_footer": "எங்கள் சேவைகள்",
    "contact_us": "எங்களை தொடர்பு கொள்ள",
    "all_rights": "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    "privacy_policy": "தனியுரிமைக் கொள்கை",
    "terms_of_service": "சேவை விதிமுறைகள்",
    "accessibility": "அணுகல்"
  }
};

// Helper function to get translation
export function getTranslation(key: string, language: Languages = "english"): string {
  // Return the translation if it exists, otherwise return the key itself as fallback
  return translations[language][key] || key;
}