
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
  // Campos adicionales del quiz (Landing2)
  servicios?: string;
  clientePerfil?: string;
  problemaPrincipal?: string;
  propuestaMetodo?: string;
  resultados?: string;
}

interface AIUsage {
  [fieldName: string]: number;
}

export const useFormPersistence = () => {
  const [sessionId] = useState(() => crypto.randomUUID());
  const [aiUsage, setAiUsage] = useState<AIUsage>({});
  const [attemptCount, setAttemptCount] = useState(1);

  // Debug: track session initialization only once
  useEffect(() => {
    console.log('🔄 useFormPersistence initialized with sessionId:', sessionId);
  }, [sessionId]);

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

  // Cargar progreso previo por email - solo trae el último INCOMPLETO
  const loadPreviousProgress = async (email: string): Promise<FormData | null> => {
    try {
      // Validate email format before querying
      if (!isValidEmail(email)) {
        console.error('Invalid email format');
        return null;
      }

      console.log('🔍 Buscando registros incompletos para:', email);

      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .eq('email', email)
        .eq('completed', false) // Solo registros incompletos
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error loading previous progress:', error);
        return null;
      }

      if (data) {
        console.log('✅ Registro incompleto encontrado, precargando datos...');
        setAttemptCount(data.attempt_number);
        return data.form_data as unknown as FormData;
      }

      console.log('ℹ️ No se encontró ningún registro incompleto. Se creará uno nuevo.');
      return null;
    } catch (error) {
      console.error('Error in loadPreviousProgress:', error);
      return null;
    }
  };

  // Verificar límite de intentos por email
  const checkAttemptLimit = async (email: string): Promise<boolean> => {
    try {
      console.log('Checking attempt limit for email:', email);
      
      // Validate email format
      if (!isValidEmail(email)) {
        console.error('Invalid email format');
        return false;
      }

      // Admin email sin límites para pruebas
      if (email === 'soyesteban.m@gmail.com') {
        console.log('Admin email detected, no limits applied');
        return true;
      }

      const { data, error } = await supabase
        .from('form_submissions')
        .select('id')
        .eq('email', email)
        .eq('completed', true);

      if (error) {
        console.error('Error checking attempt limit:', error);
        return true; // En caso de error, permitir el intento
      }

      const currentAttempts = data?.length || 0;
      console.log(`Email ${email} has ${currentAttempts} completed attempts. Limit is 10.`);

      // Límite de 10 para emails regulares
      return currentAttempts < 10;
    } catch (error) {
      console.error('Error in checkAttemptLimit:', error);
      return true;
    }
  };

  // Guardar progreso automáticamente
  const saveProgress = async (formData: FormData): Promise<void> => {
    if (!formData.email || !isValidEmail(formData.email)) return;

    try {
      // Sanitize form data before saving
      const sanitizedData = sanitizeFormData(formData);

      // Usar la función upsert para evitar duplicados
      const { error } = await supabase.rpc('upsert_form_submission', {
        p_email: sanitizedData.email,
        p_form_data: sanitizedData as any,
        p_attempt_number: attemptCount,
        p_completed: false
      });

      if (error) {
        console.error('Error saving form submission:', error);
      }
    } catch (error) {
      console.error('Error in saveProgress:', error);
    }
  };

  // Marcar como completado - SIEMPRE crea un nuevo registro
  const markAsCompleted = async (formData: FormData): Promise<void> => {
    if (!formData.email || !isValidEmail(formData.email)) return;

    try {
      const sanitizedData = sanitizeFormData(formData);

      console.log('📝 Creando nuevo registro completado para:', sanitizedData.email);

      // Siempre insertar un nuevo registro para trazabilidad
      // La fecha created_at se establece automáticamente en la base de datos con now()
      const { error } = await supabase
        .from('form_submissions')
        .insert({
          email: sanitizedData.email,
          form_data: sanitizedData as any,
          attempt_number: attemptCount,
          completed: true,
          // No especificamos created_at aquí, se usa el default de la DB (now())
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error marking as completed:', error);
        throw error;
      }

      console.log('✅ Registro completado creado exitosamente con fecha actual');

      // Después de crear el registro completado, eliminar el registro incompleto si existe
      const { error: deleteError } = await supabase
        .from('form_submissions')
        .delete()
        .eq('email', sanitizedData.email)
        .eq('completed', false);

      if (deleteError) {
        console.warn('Error al eliminar registro incompleto:', deleteError);
      } else {
        console.log('🗑️ Registro incompleto eliminado');
      }

    } catch (error) {
      console.error('Error in markAsCompleted:', error);
      throw error;
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

// Helper function to validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Helper function to sanitize form data
const sanitizeFormData = (formData: FormData): FormData => {
  const sanitized = { ...formData };
  
  // Trim whitespace and limit lengths
  Object.keys(sanitized).forEach(key => {
    if (typeof sanitized[key as keyof FormData] === 'string') {
      const value = sanitized[key as keyof FormData] as string;
      sanitized[key as keyof FormData] = value.trim().substring(0, getMaxLength(key)) as any;
    }
  });

  return sanitized;
};

// Define maximum lengths for different fields
const getMaxLength = (fieldName: string): number => {
  switch (fieldName) {
    case 'email':
      return 254;
    case 'marca':
      return 100;
    case 'whatsapp':
      return 20;
    case 'website':
    case 'instagram':
      return 100;
    case 'quien_eres':
    case 'problemas':
    case 'preguntas_frecuentes':
    case 'producto':
      return 2000;
    case 'estilo':
      return 50;
    default:
      return 500;
  }
};
