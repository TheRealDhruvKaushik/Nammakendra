import { useState, useEffect } from "react";
import { useAccessibility } from "@/context/accessibility-context";
import { Languages, translations } from "@/lib/translations";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/hooks/use-translation";

const languages = [
  { code: "english" as Languages, label: "English" },
  { code: "kannada" as Languages, label: "ಕನ್ನಡ" },
  { code: "hindi" as Languages, label: "हिंदी" },
  { code: "tamil" as Languages, label: "தமிழ்" }
];

const LanguageSelector = () => {
  const { language, setLanguage } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  
  // Log when language changes
  useEffect(() => {
    console.log("Current language:", language);
  }, [language]);
  
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];
  
  const handleLanguageChange = (code: Languages) => {
    console.log("Changing language to:", code);
    
    // First set the language in context
    setLanguage(code);
    
    // Apply language-specific font size adjustments
    const fontSizeAdjustments = {
      english: 16, // baseline
      kannada: 16,
      hindi: 17,   // slightly larger for Hindi
      tamil: 16
    };
    
    // Apply the appropriate font size based on language
    document.documentElement.style.setProperty('--base-font-size', `${fontSizeAdjustments[code]}px`);
    
    // Apply language-specific CSS classes
    document.body.classList.remove('lang-english', 'lang-kannada', 'lang-hindi', 'lang-tamil');
    document.body.classList.add(`lang-${code}`);
    
    // Set the language attribute for proper language handling
    document.documentElement.setAttribute('lang', code);
    
    // Direct approach: Translate all elements with translation keys
    try {
      // First, handle specific elements with data-i18n-key attributes
      const taggedElements = document.querySelectorAll('[data-i18n-key]');
      taggedElements.forEach(el => {
        const key = el.getAttribute('data-i18n-key');
        if (key && translations[code][key]) {
          el.textContent = translations[code][key];
        }
      });
      
      // Then, try to find all text elements that might need translation
      const allTextElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button, li, label');
      allTextElements.forEach(el => {
        // Skip elements with data-lang-label attribute (used for language selector itself)
        if (el.hasAttribute('data-lang-label')) {
          return;
        }
        
        const text = el.textContent?.trim();
        if (text) {
          // Check if this text exactly matches an English key
          const englishKeys = Object.keys(translations.english);
          for (const key of englishKeys) {
            if (translations.english[key] === text && translations[code][key]) {
              el.textContent = translations[code][key];
              break;
            }
          }
        }
      });
      
      // Additional trick to force update of React components
      window.dispatchEvent(new Event('resize'));
      document.dispatchEvent(new CustomEvent('languageChanged', { detail: code }));
    } catch (err) {
      console.error("Error in direct translation update:", err);
    }
    
    setIsOpen(false);
  };

  return (
    <div className="language-selector relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button 
            aria-label="Change language" 
            className="flex items-center px-3 py-2 min-w-[44px] min-h-[44px] border rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary text-black"
          >
            <span className="globe-icon mr-2 inline-flex">
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'inline-block' }} 
              >
                <path 
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M2 12H22" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span data-lang-label="true">{t('language') || currentLanguage.label}</span>
            <svg 
              className="ml-2" 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M6 9L12 15L18 9" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {languages.map((lang) => (
            <DropdownMenuItem 
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code as Languages)}
              className={lang.code === language ? "bg-primary/10 font-semibold" : ""}
            >
              {lang.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSelector;
