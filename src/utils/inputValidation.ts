
// Input validation utilities for security with enhanced protection

import { 
  validateEmailSecurity, 
  validateTextContentSecurity, 
  sanitizeInput,
  checkAdvancedRateLimit
} from './securityValidation';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'El email es requerido' };
  }
  
  const securityValidation = validateEmailSecurity(email.trim());
  
  if (!securityValidation.isValid) {
    return { 
      isValid: false, 
      error: securityValidation.errors[0] || 'Email inválido'
    };
  }
  
  return { isValid: true };
};

export const validateText = (
  text: string, 
  fieldName: string, 
  maxLength: number = 2000, 
  required: boolean = true
): ValidationResult => {
  if (required && (!text || text.trim() === '')) {
    return { isValid: false, error: `${fieldName} es requerido` };
  }
  
  if (!text) return { isValid: true };
  
  // Sanitizar primero para remover espacios extras que podrían causar exceso de longitud
  const sanitizedText = sanitizeInput(text);
  
  // Verificar longitud después de sanitizar
  if (sanitizedText.length > maxLength) {
    return { 
      isValid: false, 
      error: `${fieldName} debe tener máximo ${maxLength} caracteres. Actualmente tiene ${sanitizedText.length}.`
    };
  }
  
  const securityValidation = validateTextContentSecurity(sanitizedText, fieldName, maxLength);
  
  if (!securityValidation.isValid) {
    return { 
      isValid: false, 
      error: securityValidation.errors[0] || `${fieldName} contiene contenido no válido`
    };
  }
  
  return { isValid: true };
};

export const validateWhatsApp = (whatsapp: string): ValidationResult => {
  if (!whatsapp || whatsapp.trim() === '') {
    return { isValid: false, error: 'El WhatsApp es requerido' };
  }
  
  const sanitized = sanitizeInput(whatsapp);
  const cleanedPhone = sanitized.replace(/\D/g, '');
  
  if (cleanedPhone.length < 8 || cleanedPhone.length > 15) {
    return { isValid: false, error: 'Número de WhatsApp inválido' };
  }
  
  return { isValid: true };
};

export const validateUrl = (url: string, fieldName: string, required: boolean = false): ValidationResult => {
  if (!required && (!url || url.trim() === '')) {
    return { isValid: true };
  }
  
  if (required && (!url || url.trim() === '')) {
    return { isValid: false, error: `${fieldName} es requerido` };
  }
  
  const securityValidation = validateTextContentSecurity(url, fieldName, 2000);
  if (!securityValidation.isValid) {
    return { 
      isValid: false, 
      error: `${fieldName} contiene contenido no válido`
    };
  }
  
  const trimmedUrl = sanitizeInput(url);
  
  if (trimmedUrl.length > 2000) {
    return { isValid: false, error: `${fieldName} es demasiado largo` };
  }
  
  // Basic URL validation
  try {
    // Add protocol if missing
    const urlToTest = trimmedUrl.startsWith('http') ? trimmedUrl : `https://${trimmedUrl}`;
    new URL(urlToTest);
    return { isValid: true };
  } catch {
    return { isValid: false, error: `${fieldName} no es una URL válida` };
  }
};

// Enhanced sanitization
export { sanitizeInput };

// Enhanced rate limiting
export const checkRateLimit = (
  identifier: string, 
  maxAttempts: number = 5, 
  windowMs: number = 300000
): boolean => {
  // Use the advanced rate limiting system
  const result = checkAdvancedRateLimit(identifier, 'email_submission');
  return result.allowed;
};
