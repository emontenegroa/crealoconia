
import React from 'react';
import { Button } from "@/components/ui/button";
import { Languages } from 'lucide-react';
import { useLanguage, Language } from '@/hooks/useLanguage';

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage: Language = language === 'es' ? 'en' : 'es';
    changeLanguage(newLanguage);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm border-gray-300 hover:bg-gray-50 shadow-sm"
    >
      <Languages className="w-4 h-4 mr-2" />
      {language === 'es' ? 'EN' : 'ES'}
    </Button>
  );
};

export default LanguageSelector;
