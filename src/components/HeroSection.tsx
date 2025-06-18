import React from 'react';
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, Star } from "lucide-react";
import { useLanguage } from '@/hooks/useLanguage';

interface HeroSectionProps {
  onLoadExample: () => void;
}

const HeroSection = ({ onLoadExample }: HeroSectionProps) => {
  const { t } = useLanguage();

  const scrollToForm = () => {
    const formElement = document.querySelector('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="text-center mb-16">
      {/* Decorative Stars */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-purple-500 to-blue-500 opacity-10">
        <div className="absolute top-4 left-4">
          <Sparkles className="w-6 h-6 text-purple-300 animate-pulse" />
        </div>
        <div className="absolute top-8 right-4">
          <Star className="w-5 h-5 text-blue-300 animate-pulse" />
        </div>
        <div className="absolute bottom-4 left-1/4">
          <Star className="w-4 h-4 text-purple-200 animate-pulse" />
        </div>
        <div className="absolute bottom-8 right-1/4">
          <Sparkles className="w-7 h-7 text-blue-200 animate-pulse" />
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
            {t('heroTitle')}
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-gray-700 mb-8 leading-relaxed font-medium">
            {t('heroSubtitle')}
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-800 mb-12 leading-relaxed font-medium max-w-3xl mx-auto">
            {t('heroDescription')}
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8 mb-8 max-w-3xl mx-auto">
          <p className="text-lg md:text-xl text-red-700 mb-4 font-semibold">
            {t('heroWarning')}
          </p>
          <p className="text-lg md:text-xl text-green-700 font-bold">
            {t('heroSolution')}
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={scrollToForm}
            size="lg" 
            className="text-xl px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
          >
            <Brain className="w-6 h-6 mr-3" />
            {t('heroCTA')}
          </Button>
          
          <Button variant="link" className="text-blue-500 hover:text-blue-700 font-medium" onClick={onLoadExample}>
            Ver ejemplo real →
          </Button>

          <div className="flex items-center justify-center space-x-4 opacity-70">
            <span className="text-gray-500 text-sm">
              ✅ 100% gratis y sin registro
            </span>
            <span className="text-gray-500 text-sm">
              🚀 Resultados en minutos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
