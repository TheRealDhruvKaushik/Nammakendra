import { useAccessibility } from "@/context/accessibility-context";
import { getTranslation, Languages } from "@/lib/translations";
import { useState, useEffect, useCallback } from "react";

// Hook to use translations in components
export function useTranslation() {
  const { language } = useAccessibility();
  const [currentLanguage, setCurrentLanguage] = useState<Languages>(language as Languages);
  
  // Update current language when context language changes
  useEffect(() => {
    setCurrentLanguage(language as Languages);
    console.log("Translation hook: Language updated to", language);
    
    // Force immediate re-render of all translated text on language change
    const translatedElements = document.querySelectorAll('[data-i18n-key]');
    translatedElements.forEach(element => {
      const key = element.getAttribute('data-i18n-key');
      if (key) {
        element.textContent = getTranslation(key, language as Languages);
      }
    });
  }, [language]);
  
  // Also listen for language change event from elsewhere in the app
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      console.log("Translation hook: Received language change event", event.detail);
      setCurrentLanguage(event.detail as Languages);
    };
    
    document.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      document.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);
  
  // Memoized translate function
  const t = useCallback((key: string): string => {
    const translation = getTranslation(key, currentLanguage);
    return translation;
  }, [currentLanguage]);
  
  return { t, language: currentLanguage };
}