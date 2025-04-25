import React from 'react';
import { Button } from '@/components/ui/button';
import { Language, useLanguage } from '@/context/language-context';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={language === 'english' ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleLanguageChange('english')}
        className="px-3 py-1 text-sm transition-colors duration-300"
      >
        {t('language.english')}
      </Button>
      <Button
        variant={language === 'kannada' ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleLanguageChange('kannada')}
        className="px-3 py-1 text-sm transition-colors duration-300"
      >
        {t('language.kannada')}
      </Button>
    </div>
  );
};

export default LanguageSelector;