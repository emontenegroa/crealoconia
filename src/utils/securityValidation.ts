
import { supabase } from "@/integrations/supabase/client";

// Tipos para validación de seguridad
export interface SecurityValidationResult {
  isValid: boolean;
  errors: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface SecurityEvent {
  type: string;
  email?: string;
  sessionId?: string;
  userAgent?: string;
  eventData?: Record<string, any>;
}

// Patrones de ataques comunes
const ATTACK_PATTERNS = {
  xss: /<script|javascript:|data:|vbscript:|on\w+\s*=/i,
  sqlInjection: /('|(\\|'|''|\\.)|(\bselect\b|\bunion\b|\binsert\b|\bupdate\b|\bdelete\b|\bdrop\b))/i,
  maliciousUrls: /(javascript:|data:|vbscript:|file:|ftp:)/i,
  suspiciousChars: /[<>{}"\'\`\$]/,
  htmlTags: /<[^>]*>/g
};

// Lista negra de dominios maliciosos conocidos
const BLOCKED_DOMAINS = [
  'temp-mail.org',
  '10minutemail.com',
  'guerrillamail.com',
  'mailinator.com'
];

// Validación avanzada de email
export const validateEmailSecurity = (email: string): SecurityValidationResult => {
  const errors: string[] = [];
  let riskLevel: SecurityValidationResult['riskLevel'] = 'low';

  // Validación básica de formato
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) {
    errors.push('Formato de email inválido');
    riskLevel = 'high';
  }

  // Verificar dominio bloqueado
  const domain = email.split('@')[1]?.toLowerCase();
  if (domain && BLOCKED_DOMAINS.includes(domain)) {
    errors.push('Dominio de email no permitido');
    riskLevel = 'high';
  }

  // Detectar patrones de ataque
  if (ATTACK_PATTERNS.xss.test(email) || ATTACK_PATTERNS.sqlInjection.test(email)) {
    errors.push('Email contiene contenido malicioso');
    riskLevel = 'critical';
  }

  // Verificar longitud
  if (email.length > 254) {
    errors.push('Email demasiado largo');
    riskLevel = 'medium';
  }

  return {
    isValid: errors.length === 0,
    errors,
    riskLevel
  };
};

// Validación de contenido de texto
export const validateTextContentSecurity = (
  text: string,
  fieldName: string,
  maxLength: number = 2000
): SecurityValidationResult => {
  const errors: string[] = [];
  let riskLevel: SecurityValidationResult['riskLevel'] = 'low';

  // Verificar longitud
  if (text.length > maxLength) {
    errors.push(`${fieldName} excede el límite de ${maxLength} caracteres`);
    riskLevel = 'medium';
  }

  // Detectar XSS
  if (ATTACK_PATTERNS.xss.test(text)) {
    errors.push(`${fieldName} contiene código malicioso potencial`);
    riskLevel = 'critical';
  }

  // Detectar SQL injection
  if (ATTACK_PATTERNS.sqlInjection.test(text)) {
    errors.push(`${fieldName} contiene patrones de inyección SQL`);
    riskLevel = 'critical';
  }

  // Contar tags HTML
  const htmlMatches = text.match(ATTACK_PATTERNS.htmlTags);
  if (htmlMatches && htmlMatches.length > 3) {
    errors.push(`${fieldName} contiene demasiado contenido HTML`);
    riskLevel = 'high';
  }

  return {
    isValid: errors.length === 0,
    errors,
    riskLevel
  };
};

// Sanitización avanzada
export const sanitizeInput = (input: string, allowHtml: boolean = false): string => {
  if (!input) return '';

  let sanitized = input.trim();

  if (!allowHtml) {
    // Remover todos los tags HTML
    sanitized = sanitized.replace(ATTACK_PATTERNS.htmlTags, '');
  }

  // Escapar caracteres peligrosos
  sanitized = sanitized
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+\s*=/gi, '');

  return sanitized.substring(0, 2000);
};

// Rate limiting avanzado con múltiples ventanas
export interface RateLimitConfig {
  maxAttempts: number;
  windowMinutes: number;
  blockDurationMinutes: number;
}

const RATE_LIMITS = {
  email_submission: { maxAttempts: 3, windowMinutes: 10, blockDurationMinutes: 30 },
  form_completion: { maxAttempts: 5, windowMinutes: 60, blockDurationMinutes: 60 },
  ai_enhancement: { maxAttempts: 10, windowMinutes: 60, blockDurationMinutes: 30 }
};

const rateLimitStore = new Map<string, { count: number; firstAttempt: number; blocked?: number }>();

export const checkAdvancedRateLimit = (
  identifier: string,
  action: keyof typeof RATE_LIMITS
): { allowed: boolean; reason?: string; retryAfter?: number } => {
  const config = RATE_LIMITS[action];
  const now = Date.now();
  const key = `${action}:${identifier}`;
  
  let record = rateLimitStore.get(key);
  
  // Verificar si está bloqueado
  if (record?.blocked && now < record.blocked) {
    const retryAfter = Math.ceil((record.blocked - now) / 1000 / 60);
    return { 
      allowed: false, 
      reason: `Bloqueado por ${retryAfter} minutos más`,
      retryAfter 
    };
  }

  // Resetear ventana si ha pasado el tiempo
  if (!record || now - record.firstAttempt > config.windowMinutes * 60 * 1000) {
    record = { count: 1, firstAttempt: now };
    rateLimitStore.set(key, record);
    return { allowed: true };
  }

  // Incrementar contador
  record.count++;

  // Verificar límite
  if (record.count > config.maxAttempts) {
    record.blocked = now + (config.blockDurationMinutes * 60 * 1000);
    rateLimitStore.set(key, record);
    
    return { 
      allowed: false, 
      reason: `Demasiados intentos. Bloqueado por ${config.blockDurationMinutes} minutos`,
      retryAfter: config.blockDurationMinutes
    };
  }

  rateLimitStore.set(key, record);
  return { allowed: true };
};

// Logging de seguridad
export const logSecurityEvent = async (event: SecurityEvent): Promise<void> => {
  try {
    await supabase.rpc('log_security_event', {
      event_type: event.type,
      email: event.email || null,
      ip_address: null, // Se puede agregar detección de IP
      user_agent: event.userAgent || navigator?.userAgent || null,
      event_data: event.eventData || {}
    });
  } catch (error) {
    console.warn('Error logging security event:', error);
  }
};

// Detección de comportamiento sospechoso
export const detectSuspiciousActivity = async (email: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('detect_suspicious_activity', {
      check_email: email,
      time_window_minutes: 5
    });

    if (error) {
      console.warn('Error checking suspicious activity:', error);
      return false;
    }

    return data || false;
  } catch (error) {
    console.warn('Error in detectSuspiciousActivity:', error);
    return false;
  }
};

// Validación completa de formulario
export const validateFormSecurity = async (formData: any, email: string): Promise<SecurityValidationResult> => {
  const errors: string[] = [];
  let highestRisk: SecurityValidationResult['riskLevel'] = 'low';

  // Verificar actividad sospechosa
  const isSuspicious = await detectSuspiciousActivity(email);
  if (isSuspicious) {
    errors.push('Actividad sospechosa detectada para este email');
    highestRisk = 'critical';
    
    await logSecurityEvent({
      type: 'suspicious_activity_detected',
      email,
      eventData: { formData: Object.keys(formData) }
    });
  }

  // Validar cada campo
  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string' && value.trim()) {
      if (key === 'email') {
        const emailValidation = validateEmailSecurity(value);
        errors.push(...emailValidation.errors);
        if (emailValidation.riskLevel === 'critical' || emailValidation.riskLevel === 'high') {
          highestRisk = emailValidation.riskLevel;
        }
      } else {
        const textValidation = validateTextContentSecurity(value, key);
        errors.push(...textValidation.errors);
        if (textValidation.riskLevel === 'critical' || textValidation.riskLevel === 'high') {
          highestRisk = textValidation.riskLevel;
        }
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    riskLevel: highestRisk
  };
};
