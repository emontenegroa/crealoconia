import { z } from 'zod';

// Schema de validación para el formulario inicial
export const initialFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Email inválido" })
    .max(255, { message: "Email debe tener menos de 255 caracteres" })
    .refine((email) => {
      // Validación adicional contra patrones maliciosos
      const dangerousPatterns = /<script|javascript:|onerror=|onclick=/i;
      return !dangerousPatterns.test(email);
    }, { message: "Formato de email no permitido" }),
  
  nombre: z
    .string()
    .trim()
    .min(2, { message: "Nombre debe tener al menos 2 caracteres" })
    .max(100, { message: "Nombre debe tener menos de 100 caracteres" })
    .refine((name) => {
      // Solo letras, espacios, guiones y apóstrofes
      return /^[a-zA-ZÀ-ÿ\s'-]+$/.test(name);
    }, { message: "Nombre contiene caracteres no permitidos" }),
  
  marca: z
    .string()
    .trim()
    .min(2, { message: "Marca debe tener al menos 2 caracteres" })
    .max(100, { message: "Marca debe tener menos de 100 caracteres" })
    .refine((brand) => {
      // Prevenir HTML/JavaScript injection
      const dangerousPatterns = /<[^>]*>|javascript:|onerror=|onclick=/i;
      return !dangerousPatterns.test(brand);
    }, { message: "Formato de marca no permitido" }),
  
  estilo: z
    .string()
    .trim()
    .min(1, { message: "Estilo es requerido" })
    .refine((style) => {
      // Solo permitir valores específicos
      const allowedStyles = ['Profesional', 'Cercano', 'Inspirador', 'Técnico', 'Creativo'];
      return allowedStyles.includes(style);
    }, { message: "Estilo no válido" })
});

// Schema de validación para el quiz (Landing2)
export const quizFormSchema = z.object({
  servicios: z
    .string()
    .trim()
    .min(10, { message: "Servicios debe tener al menos 10 caracteres" })
    .max(2000, { message: "Servicios debe tener menos de 2000 caracteres" })
    .refine((text) => {
      // Prevenir inyección de scripts
      const dangerousPatterns = /<script|javascript:|onerror=|onclick=|<iframe/i;
      return !dangerousPatterns.test(text);
    }, { message: "Texto contiene contenido no permitido" }),
  
  clientePerfil: z
    .string()
    .trim()
    .min(10, { message: "Perfil del cliente debe tener al menos 10 caracteres" })
    .max(2000, { message: "Perfil del cliente debe tener menos de 2000 caracteres" })
    .refine((text) => {
      const dangerousPatterns = /<script|javascript:|onerror=|onclick=|<iframe/i;
      return !dangerousPatterns.test(text);
    }, { message: "Texto contiene contenido no permitido" }),
  
  problemaPrincipal: z
    .string()
    .trim()
    .min(10, { message: "Problema principal debe tener al menos 10 caracteres" })
    .max(2000, { message: "Problema principal debe tener menos de 2000 caracteres" })
    .refine((text) => {
      const dangerousPatterns = /<script|javascript:|onerror=|onclick=|<iframe/i;
      return !dangerousPatterns.test(text);
    }, { message: "Texto contiene contenido no permitido" }),
  
  propuestaMetodo: z
    .string()
    .trim()
    .min(10, { message: "Propuesta o método debe tener al menos 10 caracteres" })
    .max(2000, { message: "Propuesta o método debe tener menos de 2000 caracteres" })
    .refine((text) => {
      const dangerousPatterns = /<script|javascript:|onerror=|onclick=|<iframe/i;
      return !dangerousPatterns.test(text);
    }, { message: "Texto contiene contenido no permitido" }),
  
  resultados: z
    .string()
    .trim()
    .min(10, { message: "Resultados debe tener al menos 10 caracteres" })
    .max(2000, { message: "Resultados debe tener menos de 2000 caracteres" })
    .refine((text) => {
      const dangerousPatterns = /<script|javascript:|onerror=|onclick=|<iframe/i;
      return !dangerousPatterns.test(text);
    }, { message: "Texto contiene contenido no permitido" })
});

// Función para sanitizar texto (eliminar caracteres peligrosos)
export const sanitizeText = (text: string): string => {
  if (!text) return '';
  
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Eliminar scripts
    .replace(/javascript:/gi, '') // Eliminar javascript:
    .replace(/onerror=/gi, '') // Eliminar onerror
    .replace(/onclick=/gi, '') // Eliminar onclick
    .replace(/<iframe/gi, ''); // Eliminar iframes
};

// Función para sanitizar al enviar (con trim)
export const sanitizeTextForSubmit = (text: string): string => {
  if (!text) return '';
  
  return sanitizeText(text).trim();
};

// Tipos para TypeScript
export type InitialFormData = z.infer<typeof initialFormSchema>;
export type QuizFormData = z.infer<typeof quizFormSchema>;
