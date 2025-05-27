
import React, { useState, useEffect } from 'react';
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
  sessionId: string;
  onUsageUpdate: (fieldName: string, count: number) => void;
}

const AIEnhanceButton: React.FC<AIEnhanceButtonProps> = ({
  currentText,
  fieldType,
  context,
  onEnhanced,
  disabled = false,
  sessionId,
  onUsageUpdate
}) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [usageCount, setUsageCount] = useState(0);

  useEffect(() => {
    const fetchUsageCount = async () => {
      try {
        const { data, error } = await supabase
          .from('ai_usage_tracking')
          .select('usage_count')
          .eq('session_id', sessionId)
          .eq('field_name', fieldType)
          .maybeSingle();

        if (!error && data) {
          setUsageCount(data.usage_count);
        }
      } catch (error) {
        console.error('Error fetching usage count:', error);
      }
    };

    fetchUsageCount();
  }, [sessionId, fieldType]);

  const canUseAI = usageCount < 2;
  const remainingUses = 2 - usageCount;

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

    if (!canUseAI) {
      toast({
        title: "Límite alcanzado",
        description: "Ya has usado la mejora con IA 2 veces en este campo.",
        variant: "destructive",
      });
      return;
    }

    setIsEnhancing(true);

    try {
      console.log('🧠 Enviando texto a IA para mejorar...');
      
      // Primero intentamos actualizar el conteo en la base de datos
      const newUsageCount = usageCount + 1;
      
      // Verificar si ya existe un registro
      const { data: existingRecord } = await supabase
        .from('ai_usage_tracking')
        .select('id, usage_count')
        .eq('session_id', sessionId)
        .eq('field_name', fieldType)
        .maybeSingle();

      let updateResult;
      if (existingRecord) {
        // Actualizar registro existente
        updateResult = await supabase
          .from('ai_usage_tracking')
          .update({ usage_count: newUsageCount, updated_at: new Date().toISOString() })
          .eq('id', existingRecord.id);
      } else {
        // Crear nuevo registro
        updateResult = await supabase
          .from('ai_usage_tracking')
          .insert({
            session_id: sessionId,
            field_name: fieldType,
            usage_count: newUsageCount,
          });
      }

      if (updateResult.error) {
        console.error('Error updating usage count:', updateResult.error);
        throw new Error('Error al actualizar el conteo de uso');
      }

      // Llamar a la función de IA
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
        setUsageCount(newUsageCount);
        onUsageUpdate(fieldType, newUsageCount);
        
        toast({
          title: "¡Texto mejorado! ✨",
          description: `${remainingUses - 1 === 0 ? 'Última mejora usada' : `Te quedan ${remainingUses - 1} mejoras`} para este campo.`,
        });
      } else {
        throw new Error('No se recibió texto mejorado de la IA');
      }
    } catch (error) {
      console.error('Error enhancing text:', error);
      toast({
        title: "Error al mejorar texto",
        description: error instanceof Error ? error.message : "Hubo un problema con la IA. Por favor intenta de nuevo.",
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
      disabled={disabled || isEnhancing || !currentText.trim() || !canUseAI}
      variant="outline"
      size="sm"
      className={`
        bg-gradient-to-r from-purple-600 to-pink-600 
        hover:from-purple-700 hover:to-pink-700
        border-purple-400 text-white font-medium
        shadow-lg hover:shadow-xl
        transition-all duration-200
        flex items-center gap-2
        ${!canUseAI ? 'opacity-50 cursor-not-allowed' : ''}
        ${canUseAI && !isEnhancing ? 'hover:scale-105' : ''}
      `}
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
          {canUseAI ? `Mejorar con IA (${remainingUses})` : 'Límite alcanzado'}
        </>
      )}
    </Button>
  );
};

export default AIEnhanceButton;
