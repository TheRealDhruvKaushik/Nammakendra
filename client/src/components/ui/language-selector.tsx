import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Language, useLanguage } from '@/context/language-context';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
  };

  return (
    <div className="flex items-center pl-2">
      <Select value={language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[130px] h-9 text-sm text-gray-800 border-gray-200 hover:bg-gray-100 transition-colors duration-200">
          <div className="flex items-center">
            <Globe size={16} className="mr-2 text-gray-600" />
            <SelectValue placeholder={t(`language.${language}`)} />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="english" className="cursor-pointer text-gray-800">
            {t('language.english')}
          </SelectItem>
          <SelectItem value="kannada" className="cursor-pointer text-gray-800">
            {t('language.kannada')}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;