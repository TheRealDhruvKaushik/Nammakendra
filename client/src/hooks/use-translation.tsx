import { useAccessibility } from "@/context/accessibility-context";
import { getTranslation, Languages } from "@/lib/translations";

// Hook to use translations in components
export function useTranslation() {
  const { language } = useAccessibility();
  
  // Function to translate a key
  const t = (key: string): string => {
    return getTranslation(key, language as Languages);
  };
  
  return { t };
}