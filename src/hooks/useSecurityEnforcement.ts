
import { useState, useCallback } from 'react';
import { toast } from "@/hooks/use-toast";
import { 
  checkAdvancedRateLimit, 
  validateFormSecurity, 
  logSecurityEvent,
  SecurityValidationResult 
} from '@/utils/securityValidation';

export const useSecurityEnforcement = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockReason, setBlockReason] = useState<string>('');

  const enforceRateLimit = useCallback((identifier: string, action: 'email_submission' | 'form_completion' | 'ai_enhancement') => {
    const result = checkAdvancedRateLimit(identifier, action);
    
    if (!result.allowed) {
      setIsBlocked(true);
      setBlockReason(result.reason || 'Rate limit exceeded');
      
      toast({
        title: "Límite de intentos alcanzado",
        description: result.reason,
        variant: "destructive",
      });

      logSecurityEvent({
        type: 'rate_limit_exceeded',
        email: identifier,
        eventData: { action, retryAfter: result.retryAfter }
      });

      return false;
    }

    return true;
  }, []);

  const validateAndSanitizeForm = useCallback(async (formData: any, email: string): Promise<{
    isValid: boolean;
    sanitizedData?: any;
    errors?: string[];
  }> => {
    try {
      const validation = await validateFormSecurity(formData, email);
      
      if (!validation.isValid) {
        if (validation.riskLevel === 'critical' || validation.riskLevel === 'high') {
          await logSecurityEvent({
            type: 'security_violation_detected',
            email,
            eventData: { 
              riskLevel: validation.riskLevel,
              errors: validation.errors,
              formFields: Object.keys(formData)
            }
          });

          toast({
            title: "Contenido no permitido detectado",
            description: "Se ha detectado contenido potencialmente malicioso en el formulario.",
            variant: "destructive",
          });
        }

        return {
          isValid: false,
          errors: validation.errors
        };
      }

      // Sanitizar datos si pasan la validación
      const sanitizedData = Object.entries(formData).reduce((acc, [key, value]) => {
        if (typeof value === 'string') {
          acc[key] = value.trim().substring(0, key === 'email' ? 254 : 2000);
        } else {
          acc[key] = value;
        }
        return acc;
      }, {} as any);

      return {
        isValid: true,
        sanitizedData
      };

    } catch (error) {
      console.error('Error in security validation:', error);
      
      await logSecurityEvent({
        type: 'validation_error',
        email,
        eventData: { error: error instanceof Error ? error.message : 'Unknown error' }
      });

      return {
        isValid: false,
        errors: ['Error de validación interno']
      };
    }
  }, []);

  const logFormInteraction = useCallback(async (
    action: string, 
    email: string, 
    additionalData?: Record<string, any>
  ) => {
    await logSecurityEvent({
      type: `form_${action}`,
      email,
      eventData: additionalData
    });
  }, []);

  const resetBlock = useCallback(() => {
    setIsBlocked(false);
    setBlockReason('');
  }, []);

  return {
    isBlocked,
    blockReason,
    enforceRateLimit,
    validateAndSanitizeForm,
    logFormInteraction,
    resetBlock
  };
};
