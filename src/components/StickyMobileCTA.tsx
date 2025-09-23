import React from 'react';
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

interface StickyMobileCTAProps {
  isVisible: boolean;
  onClick: () => void;
}

const StickyMobileCTA = ({ isVisible, onClick }: StickyMobileCTAProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg md:hidden">
      <Button 
        onClick={onClick}
        className="w-full py-4 text-lg font-bold bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white shadow-lg transform hover:scale-[1.02] transition-all duration-200"
      >
        <Rocket className="w-5 h-5 mr-2" />
        🚀 CREAR MI SITIO GRATIS
      </Button>
      <p className="text-center text-xs text-gray-600 mt-2">
        ✅ Propuesta 100% gratuita • ⚡ Resultados en 4 horas
      </p>
    </div>
  );
};

export default StickyMobileCTA;