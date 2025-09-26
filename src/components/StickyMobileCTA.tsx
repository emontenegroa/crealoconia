import React from 'react';
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
interface StickyMobileCTAProps {
  isVisible: boolean;
  onClick: () => void;
}
const StickyMobileCTA = ({
  isVisible,
  onClick
}: StickyMobileCTAProps) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-lg border-t border-white/20 backdrop-blur-sm z-40 md:hidden">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex flex-col">
          <span className="text-white font-semibold text-sm">
            ¿Listo para tu sitio web?
          </span>
          <span className="text-blue-100 text-xs">
            Completa el formulario ahora
          </span>
        </div>
        <Button
          onClick={onClick}
          className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-2 rounded-xl shadow-lg"
        >
          <Rocket className="w-4 h-4 mr-2" />
          Empezar
        </Button>
      </div>
    </div>
  );
};
export default StickyMobileCTA;