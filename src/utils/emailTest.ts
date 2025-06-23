
import { supabase } from "@/integrations/supabase/client";

export const testEmailSystem = async () => {
  try {
    console.log('🧪 Iniciando prueba completa del sistema de email...');
    
    // Prueba 1: Email de prueba básico
    console.log('📧 Enviando email de prueba...');
    const { data: testData, error: testError } = await supabase.functions.invoke('send-email', {
      body: {
        type: 'test',
        email: 'esteban.montenegro@gmail.com'
      }
    });

    if (testError) {
      console.error('❌ Error en email de prueba:', testError);
      return { success: false, error: testError, step: 'test-email' };
    }

    console.log('✅ Email de prueba enviado:', testData);

    // Prueba 2: Email de confirmación con datos de ejemplo
    console.log('📧 Enviando email de confirmación de ejemplo...');
    const exampleFormData = {
      marca: 'Test Business',
      email: 'esteban.montenegro@gmail.com',
      whatsapp: '56945487423',
      website: 'www.testbusiness.com',
      instagram: 'testbusiness',
      quien_eres: 'Soy un emprendedor de prueba',
      problemas: 'Resuelvo problemas de prueba',
      preguntas_frecuentes: 'Me preguntan sobre pruebas',
      estilo: 'Profesional',
      producto: 'Mi producto de prueba',
      generatedPrompts: {
        superPrompt: 'Este es un super prompt de prueba generado para validar el sistema de emails.'
      }
    };

    const { data: confirmData, error: confirmError } = await supabase.functions.invoke('send-email', {
      body: {
        type: 'confirmation',
        email: exampleFormData.email,
        data: exampleFormData
      }
    });

    if (confirmError) {
      console.error('❌ Error en email de confirmación:', confirmError);
      return { success: false, error: confirmError, step: 'confirmation-email' };
    }

    console.log('✅ Email de confirmación enviado:', confirmData);

    // Prueba 3: Email administrativo
    console.log('📧 Enviando email administrativo de ejemplo...');
    const { data: adminData, error: adminError } = await supabase.functions.invoke('send-email', {
      body: {
        type: 'admin',
        email: 'esteban.montenegro@gmail.com',
        data: exampleFormData
      }
    });

    if (adminError) {
      console.error('❌ Error en email administrativo:', adminError);
      return { success: false, error: adminError, step: 'admin-email' };
    }

    console.log('✅ Email administrativo enviado:', adminData);

    return { 
      success: true, 
      data: {
        testEmail: testData,
        confirmationEmail: confirmData,
        adminEmail: adminData
      }
    };
    
  } catch (error) {
    console.error('💥 Error general en testEmailSystem:', error);
    return { success: false, error, step: 'general' };
  }
};

// Función para validar la configuración
export const validateEmailConfig = async () => {
  try {
    console.log('🔍 Validando configuración del sistema de email...');
    
    // Verificar que la edge function existe
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        type: 'test',
        email: 'test@example.com'
      }
    });

    if (error) {
      console.error('❌ Error en la configuración:', error);
      if (error.message?.includes('not found')) {
        return {
          valid: false,
          issue: 'edge-function-not-found',
          message: 'La edge function send-email no está disponible'
        };
      }
      if (error.message?.includes('BREVO_API_KEY')) {
        return {
          valid: false,
          issue: 'missing-api-key',
          message: 'BREVO_API_KEY no está configurada'
        };
      }
      return {
        valid: false,
        issue: 'unknown',
        message: error.message
      };
    }

    return {
      valid: true,
      message: 'Configuración válida'
    };

  } catch (error) {
    console.error('💥 Error en validateEmailConfig:', error);
    return {
      valid: false,
      issue: 'connection-error',
      message: 'Error de conexión con Supabase'
    };
  }
};

// Ejecutar validación automática en desarrollo
if (import.meta.env.DEV) {
  console.log('🚀 Iniciando validación automática del sistema de email...');
  
  // Validar configuración primero
  setTimeout(async () => {
    const validation = await validateEmailConfig();
    console.log('📋 Resultado de validación:', validation);
    
    if (validation.valid) {
      // Si la configuración es válida, hacer prueba completa
      const testResult = await testEmailSystem();
      if (testResult.success) {
        console.log('🎉 Sistema de email funcionando correctamente');
        console.log('📊 Resultados:', testResult.data);
      } else {
        console.warn('⚠️ Problema en la prueba de email:', testResult);
      }
    } else {
      console.warn('⚠️ Problema en la configuración:', validation);
    }
  }, 2000);
}
