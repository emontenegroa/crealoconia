import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Brain, Loader2, Sparkles, Zap } from "lucide-react";
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
  const [enhanceMode, setEnhanceMode] = useState<'improve' | 'expand' | 'optimize'>('improve');

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

  const getEnhancementPrompt = () => {
    const baseContext = `
Marca: ${context.marca || 'Sin especificar'}
Estilo de comunicación: ${context.estilo || 'Sin especificar'}
Campo: ${fieldType}
Modo: ${enhanceMode}
`;

    switch (fieldType) {
      case 'quien_eres':
        return `${baseContext}
Como experto en marketing personal y branding, mejora este texto sobre "quién eres":
"${currentText}"

INSTRUCCIONES ESPECÍFICAS:
- Hazlo más magnético y diferenciador
- Incluye elementos de autoridad y credibilidad
- Menciona el resultado específico que generas
- Usa un tono ${context.estilo?.toLowerCase() || 'profesional'}
- Que suene auténtico, no promocional
- Máximo 150 palabras

ESTRUCTURA SUGERIDA:
[Credencial/Experiencia] + [Pasión/Misión] + [A quién ayudas específicamente] + [Resultado que generas]`;

      case 'problemas':
        return `${baseContext}
Como especialista en copywriting y psicología del consumidor, mejora este texto sobre problemas que resuelves:
"${currentText}"

INSTRUCCIONES ESPECÍFICAS:
- Usa el principio "Antes-Durante-Después"
- Incluye emociones específicas que viven tus clientes
- Menciona tu metodología única
- Tono ${context.estilo?.toLowerCase() || 'empático'} pero profesional
- Que genere conexión emocional inmediata
- Máximo 150 palabras

ESTRUCTURA SUGERIDA:
[Situación problemática específica] + [Emociones que genera] + [Tu enfoque único] + [Transformación que logras]`;

      case 'preguntas_frecuentes':
        return `${baseContext}
Como experto en objeción handling y ventas consultivas, mejora este texto sobre preguntas frecuentes:
"${currentText}"

INSTRUCCIONES ESPECÍFICAS:
- Convierte las preguntas en ventajas de tu servicio
- Incluye social proof sutil
- Tono ${context.estilo?.toLowerCase() || 'cercano'} y tranquilizador
- Que genere confianza y reduzca fricción
- Máximo 150 palabras

ESTRUCTURA SUGERIDA:
[Preocupación común] + [Tu experiencia con eso] + [Cómo lo resuelves] + [Resultado/tranquilidad]`;

      case 'producto':
        return `${baseContext}
Como especialista en marketing de productos y copy de ventas, mejora este texto sobre tu producto/servicio:
"${currentText}"

INSTRUCCIONES ESPECÍFICAS:
- Enfócate en beneficios emocionales, no características
- Incluye especificidad en tiempos y resultados
- Menciona qué incluye exactamente
- Tono ${context.estilo?.toLowerCase() || 'convincente'} pero no agresivo
- Que genere deseo de acción inmediata
- Máximo 200 palabras

ESTRUCTURA SUGERIDA:
[Nombre del producto] + [Para quién es específicamente] + [Qué incluye] + [Resultado específico] + [Tiempo/garantía]`;

      default:
        return `${baseContext}
Mejora este texto para que sea más claro, persuasivo y profesional:
"${currentText}"

Mantén el tono ${context.estilo?.toLowerCase() || 'profesional'} y hazlo más impactante.`;
    }
  };

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
      console.log(`🧠 Mejorando texto con IA (modo: ${enhanceMode})...`);
      
      const newUsageCount = usageCount + 1;
      
      const { data: existingRecord } = await supabase
        .from('ai_usage_tracking')
        .select('id, usage_count')
        .eq('session_id', sessionId)
        .eq('field_name', fieldType)
        .maybeSingle();

      let updateResult;
      if (existingRecord) {
        updateResult = await supabase
          .from('ai_usage_tracking')
          .update({ usage_count: newUsageCount, updated_at: new Date().toISOString() })
          .eq('id', existingRecord.id);
      } else {
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

      const { data, error } = await supabase.functions.invoke('enhance-with-ai', {
        body: {
          userText: currentText,
          fieldType: fieldType,
          context: context,
          customPrompt: getEnhancementPrompt(),
          enhanceMode: enhanceMode,
          sessionId: sessionId
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
          title: "¡Texto optimizado! ✨",
          description: `Modo ${enhanceMode}. ${remainingUses - 1 === 0 ? 'Última mejora usada' : `Te quedan ${remainingUses - 1} mejoras`} para este campo.`,
        });

        const modes: ('improve' | 'expand' | 'optimize')[] = ['improve', 'expand', 'optimize'];
        const currentIndex = modes.indexOf(enhanceMode);
        setEnhanceMode(modes[(currentIndex + 1) % modes.length]);
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

  const getModeIcon = () => {
    switch (enhanceMode) {
      case 'improve': return <Sparkles className="w-3 h-3" />;
      case 'expand': return <Zap className="w-3 h-3" />;
      case 'optimize': return <Brain className="w-3 h-3" />;
    }
  };

  const getModeLabel = () => {
    switch (enhanceMode) {
      case 'improve': return 'Mejorar';
      case 'expand': return 'Expandir';
      case 'optimize': return 'Optimizar';
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 sm:mt-0">
      {canUseAI && !isEnhancing && usageCount > 0 && (
        <div className="text-xs text-blue-300 whitespace-nowrap hidden sm:block">
          Próximo: {getModeLabel()}
        </div>
      )}
      
      <Button
        type="button"
        onClick={handleEnhance}
        disabled={disabled || isEnhancing || !currentText.trim() || !canUseAI}
        variant="outline"
        size="sm"
        className={`
          ${isEnhancing 
            ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-[length:200%_100%] animate-gradient border-purple-400 text-white shadow-lg shadow-purple-500/50 scale-105' 
            : 'bg-blue-600 hover:bg-blue-700 border-blue-400 text-white'
          }
          font-medium shadow-lg hover:shadow-xl
          transition-all duration-300
          flex items-center gap-1.5 sm:gap-2
          text-xs sm:text-sm
          px-2 sm:px-3 py-1.5 sm:py-2
          min-w-0 flex-shrink-0 whitespace-nowrap
          ${!canUseAI ? 'opacity-50 cursor-not-allowed' : ''}
          ${canUseAI && !isEnhancing ? 'hover:scale-105' : ''}
          relative overflow-hidden
        `}
      >
        {isEnhancing && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        )}
        {isEnhancing ? (
          <>
            <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin flex-shrink-0 relative z-10" />
            <span className="hidden sm:inline relative z-10 animate-pulse">Optimizando...</span>
            <span className="sm:hidden relative z-10 animate-pulse">...</span>
          </>
        ) : (
          <>
            <Brain className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="hidden lg:inline">
              {canUseAI ? `IA te ayuda a escribir (${remainingUses})` : 'Límite alcanzado'}
            </span>
            <span className="lg:hidden">
              {canUseAI ? `IA ayuda (${remainingUses})` : 'Sin usos'}
            </span>
          </>
        )}
      </Button>
    </div>
  );
};

export default AIEnhanceButton;
