import { useAccessibility } from "@/context/accessibility-context";
import { getTranslation, Languages } from "@/lib/translations";
import { useState, useEffect } from "react";

// Hook to use translations in components
export function useTranslation() {
  const { language } = useAccessibility();
  const [currentLanguage, setCurrentLanguage] = useState<Languages>(language as Languages);
  
  // Update current language when context language changes
  useEffect(() => {
    setCurrentLanguage(language as Languages);
    console.log("Translation hook: Language updated to", language);
  }, [language]);
  
  // Also listen for language change event from App.tsx
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      console.log("Translation hook: Received language change event", event.detail);
      setCurrentLanguage(event.detail as Languages);
    };
    
    document.addEventListener('languageChange', handleLanguageChange as EventListener);
    
    return () => {
      document.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);
  
  // Function to translate a key
  const t = (key: string): string => {
    return getTranslation(key, currentLanguage);
  };
  
  return { t, language: currentLanguage };
}