
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface FormData {
  marca: string;
  quien_eres: string;
  problemas: string;
  preguntas_frecuentes: string;
  estilo: string;
  producto: string;
  email: string;
  whatsapp: string;
  website: string;
  instagram: string;
}

interface AIUsage {
  [fieldName: string]: number;
}

export const useFormPersistence = () => {
  const [sessionId] = useState(() => crypto.randomUUID());
  const [aiUsage, setAiUsage] = useState<AIUsage>({});
  const [attemptCount, setAttemptCount] = useState(1);

  // Verificar el uso de IA para un campo específico
  const getAIUsageCount = async (fieldName: string): Promise<number> => {
    try {
      const { data, error } = await supabase
        .from('ai_usage_tracking')
        .select('usage_count')
        .eq('session_id', sessionId)
        .eq('field_name', fieldName)
        .maybeSingle();

      if (error) {
        console.error('Error fetching AI usage:', error);
        return 0;
      }

      return data?.usage_count || 0;
    } catch (error) {
      console.error('Error in getAIUsageCount:', error);
      return 0;
    }
  };

  // Incrementar uso de IA para un campo
  const incrementAIUsage = async (fieldName: string): Promise<boolean> => {
    try {
      const currentUsage = await getAIUsageCount(fieldName);
      
      if (currentUsage >= 2) {
        toast({
          title: "Límite alcanzado",
          description: "Ya has usado la mejora con IA 2 veces en este campo.",
          variant: "destructive",
        });
        return false;
      }

      const { error } = await supabase
        .from('ai_usage_tracking')
        .upsert({
          session_id: sessionId,
          field_name: fieldName,
          usage_count: currentUsage + 1,
        }, {
          onConflict: 'session_id,field_name'
        });

      if (error) {
        console.error('Error updating AI usage:', error);
        return false;
      }

      setAiUsage(prev => ({
        ...prev,
        [fieldName]: currentUsage + 1
      }));

      return true;
    } catch (error) {
      console.error('Error in incrementAIUsage:', error);
      return false;
    }
  };

  // Cargar progreso previo por email
  const loadPreviousProgress = async (email: string): Promise<FormData | null> => {
    try {
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .eq('email', email)
        .eq('completed', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error loading previous progress:', error);
        return null;
      }

      if (data) {
        setAttemptCount(data.attempt_number);
        return data.form_data as unknown as FormData;
      }

      return null;
    } catch (error) {
      console.error('Error in loadPreviousProgress:', error);
      return null;
    }
  };

  // Verificar límite de intentos por email
  const checkAttemptLimit = async (email: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('form_submissions')
        .select('id')
        .eq('email', email)
        .eq('completed', true);

      if (error) {
        console.error('Error checking attempt limit:', error);
        return true; // En caso de error, permitir el intento
      }

      return (data?.length || 0) < 3;
    } catch (error) {
      console.error('Error in checkAttemptLimit:', error);
      return true;
    }
  };

  // Guardar progreso automáticamente - Cambio aquí para evitar el error de ON CONFLICT
  const saveProgress = async (formData: FormData): Promise<void> => {
    if (!formData.email) return;

    try {
      // Primero intentamos obtener el registro existente
      const { data: existingData, error: selectError } = await supabase
        .from('form_submissions')
        .select('id')
        .eq('email', formData.email)
        .eq('completed', false)
        .maybeSingle();

      if (selectError) {
        console.error('Error checking existing progress:', selectError);
        return;
      }

      if (existingData) {
        // Si existe, actualizamos
        const { error: updateError } = await supabase
          .from('form_submissions')
          .update({
            form_data: formData as any,
            attempt_number: attemptCount,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingData.id);

        if (updateError) {
          console.error('Error updating progress:', updateError);
        }
      } else {
        // Si no existe, insertamos
        const { error: insertError } = await supabase
          .from('form_submissions')
          .insert({
            email: formData.email,
            form_data: formData as any,
            attempt_number: attemptCount,
            completed: false,
          });

        if (insertError) {
          console.error('Error inserting progress:', insertError);
        }
      }
    } catch (error) {
      console.error('Error in saveProgress:', error);
    }
  };

  // Marcar como completado
  const markAsCompleted = async (formData: FormData): Promise<void> => {
    if (!formData.email) return;

    try {
      const { error } = await supabase
        .from('form_submissions')
        .insert({
          email: formData.email,
          form_data: formData as any,
          attempt_number: attemptCount,
          completed: true,
        });

      if (error) {
        console.error('Error marking as completed:', error);
      }
    } catch (error) {
      console.error('Error in markAsCompleted:', error);
    }
  };

  return {
    sessionId,
    aiUsage,
    attemptCount,
    getAIUsageCount,
    incrementAIUsage,
    loadPreviousProgress,
    checkAttemptLimit,
    saveProgress,
    markAsCompleted,
  };
};
