
// Input validation utilities for security

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'El email es requerido' };
  }
  
  const trimmedEmail = email.trim();
  
  if (trimmedEmail.length > 254) {
    return { isValid: false, error: 'El email es demasiado largo' };
  }
  
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, error: 'Formato de email inválido' };
  }
  
  return { isValid: true };
};

export const validateText = (text: string, fieldName: string, maxLength: number = 2000, required: boolean = true): ValidationResult => {
  if (required && (!text || text.trim() === '')) {
    return { isValid: false, error: `${fieldName} es requerido` };
  }
  
  const trimmedText = text.trim();
  
  if (trimmedText.length > maxLength) {
    return { isValid: false, error: `${fieldName} no puede tener más de ${maxLength} caracteres` };
  }
  
  // Basic XSS prevention - check for script tags
  if (/<script|javascript:|data:/i.test(trimmedText)) {
    return { isValid: false, error: `${fieldName} contiene contenido no permitido` };
  }
  
  return { isValid: true };
};

export const validateWhatsApp = (whatsapp: string): ValidationResult => {
  if (!whatsapp || whatsapp.trim() === '') {
    return { isValid: false, error: 'El WhatsApp es requerido' };
  }
  
  const cleanedPhone = whatsapp.replace(/\D/g, '');
  
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
  
  const trimmedUrl = url.trim();
  
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

export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:/gi, '') // Remove data: protocol
    .substring(0, 2000); // Limit length
};

// Rate limiting helper (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export const checkRateLimit = (identifier: string, maxAttempts: number = 5, windowMs: number = 300000): boolean => {
  const now = Date.now();
  const existing = rateLimitMap.get(identifier);
  
  if (!existing || now > existing.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (existing.count >= maxAttempts) {
    return false;
  }
  
  existing.count++;
  return true;
};
