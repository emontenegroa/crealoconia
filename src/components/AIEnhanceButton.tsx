
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Brain, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface AIEnhanceButtonProps {
  currentText: string;
  fieldType: string;
  context: {
    marca?: string;
    estilo?: string;
  };
  onEnhanced: (enhancedText: string) => void;
  disabled?: boolean;
}

const AIEnhanceButton: React.FC<AIEnhanceButtonProps> = ({
  currentText,
  fieldType,
  context,
  onEnhanced,
  disabled = false
}) => {
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhance = async () => {
    if (!currentText.trim()) {
      toast({
        title: "Texto requerido",
        description: "Por favor escribe algo primero para que la IA pueda mejorarlo.",
        variant: "destructive",
      });
      return;
    }

    if (currentText.trim().length < 20) {
      toast({
        title: "Texto muy corto",
        description: "Escribe al menos 20 caracteres para obtener una mejora significativa.",
        variant: "destructive",
      });
      return;
    }

    setIsEnhancing(true);

    try {
      console.log('🧠 Enviando texto a IA para mejorar...');
      
      const { data, error } = await supabase.functions.invoke('enhance-with-ai', {
        body: {
          userText: currentText,
          fieldType: fieldType,
          context: context
        }
      });

      if (error) {
        console.error('Error calling enhance-with-ai:', error);
        throw error;
      }

      if (data?.enhancedText) {
        console.log('✅ Texto mejorado recibido');
        onEnhanced(data.enhancedText);
        toast({
          title: "¡Texto mejorado! ✨",
          description: "La IA ha enriquecido tu respuesta. Puedes editarla si quieres ajustar algo.",
        });
      } else {
        throw new Error('No se recibió texto mejorado');
      }
    } catch (error) {
      console.error('Error enhancing text:', error);
      toast({
        title: "Error al mejorar texto",
        description: "Hubo un problema con la IA. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleEnhance}
      disabled={disabled || isEnhancing || !currentText.trim()}
      variant="outline"
      size="sm"
      className="bg-purple-500/20 border-purple-300/50 text-purple-200 hover:bg-purple-500/30 hover:border-purple-300/70 transition-all duration-300 flex items-center gap-2"
    >
      {isEnhancing ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Mejorando...
        </>
      ) : (
        <>
          <Brain className="w-4 h-4" />
          <Sparkles className="w-3 h-3" />
          Mejorar con IA
        </>
      )}
    </Button>
  );
};

export default AIEnhanceButton;
