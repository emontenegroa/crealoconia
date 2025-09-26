
import { supabase } from "@/integrations/supabase/client";

export const testEmailSystem = async () => {
  try {
    console.log('🧪 Iniciando prueba completa del sistema de email con nueva API...');
    
    // Prueba 1: Email de prueba básico
    console.log('📧 Enviando email de prueba con Brevo API v3...');
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

    console.log('✅ Email de prueba enviado exitosamente:', testData);

    // Prueba 2: Email de confirmación con datos completos
    console.log('📧 Enviando email de confirmación de ejemplo...');
    const exampleFormData = {
      marca: 'Kit IA Test Business',
      email: 'esteban.montenegro@gmail.com',
      whatsapp: '56945487423',
      website: 'www.kitia-test.com',
      instagram: 'kitiatest',
      quien_eres: 'Soy un emprendedor que está probando el Kit IA para revolucionar mi estrategia de contenido digital',
      problemas: 'Ayudo a emprendedores a crear contenido viral y estrategias de marketing digital efectivas usando IA',
      preguntas_frecuentes: '¿Cómo puedo crear contenido que realmente conecte con mi audiencia y genere ventas?',
      estilo: 'Profesional pero cercano',
      producto: 'Curso completo de Marketing Digital con IA + Consultoría personalizada + Community exclusiva',
      generatedPrompts: {
        superPrompt: `Eres un experto en marketing digital y creación de contenido para "Kit IA Test Business". Tu tarea es crear contenido viral, estrategias de venta y material educativo que posicione a esta marca como referente en el sector.

INFORMACIÓN DE LA MARCA:
- Nombre: Kit IA Test Business
- Público: Emprendedores digitales
- Solución: Ayudo a emprendedores a crear contenido viral y estrategias de marketing digital efectivas usando IA
- Pregunta clave: ¿Cómo puedo crear contenido que realmente conecte con mi audiencia y genere ventas?
- Producto: Curso completo de Marketing Digital con IA + Consultoría personalizada + Community exclusiva
- Estilo: Profesional pero cercano

INSTRUCCIONES DE CREACIÓN:
1. Usa siempre un tono profesional pero cercano
2. Incluye datos, estadísticas y casos de éxito cuando sea relevante
3. Crea contenido que eduque, inspire y vendan de forma sutil
4. Adapta el mensaje según la plataforma (Instagram, LinkedIn, Facebook, etc.)
5. Incluye llamadas a la acción claras y específicas

¿Qué tipo de contenido necesitas que genere?`
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

    console.log('✅ Email de confirmación enviado exitosamente:', confirmData);

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

    console.log('✅ Email administrativo enviado exitosamente:', adminData);

    console.log('🎉 TODAS LAS PRUEBAS COMPLETADAS EXITOSAMENTE');
    console.log('📊 Resumen de la prueba:');
    console.log('  - API: Brevo v3 funcionando');
    console.log('  - Templates: Todos los tipos funcionando');
    console.log('  - Edge Function: Operativa');
    console.log('  - Emails enviados: 3/3 exitosos');

    return { 
      success: true, 
      data: {
        testEmail: testData,
        confirmationEmail: confirmData,
        adminEmail: adminData
      },
      summary: {
        totalEmails: 3,
        successfulEmails: 3,
        api: 'Brevo v3',
        status: 'Fully Operational'
      }
    };
    
  } catch (error) {
    console.error('💥 Error general en testEmailSystem:', error);
    return { success: false, error, step: 'general' };
  }
};

// Función para validar la configuración actualizada
export const validateEmailConfig = async () => {
  try {
    console.log('🔍 Validando configuración actualizada del sistema de email...');
    
    // Verificar que la edge function existe y funciona con la nueva API
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
          message: 'BREVO_API_KEY no está configurada correctamente'
        };
      }
      return {
        valid: false,
        issue: 'api-error',
        message: error.message
      };
    }

    console.log('✅ Configuración validada exitosamente');
    return {
      valid: true,
      message: 'Sistema de email completamente funcional con Brevo API v3',
      details: {
        api: 'Brevo v3',
        edgeFunction: 'Active',
        apiKey: 'Configured',
        templates: '3 types available'
      }
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

// Ejecutar prueba automática en desarrollo solo en localhost o si se solicita explícitamente
if (import.meta.env.DEV) {
  try {
    const params = new URLSearchParams(window.location.search);
    const shouldRun = window.location.hostname === 'localhost' || params.has('runEmailTest');
    if (!shouldRun) {
      console.log('ℹ️ emailTest: no se ejecuta automáticamente en preview. Usa ?runEmailTest=1 o ejecuta en localhost.');
    } else {
      console.log('🚀 Iniciando validación automática del sistema de email actualizado...');
      // Validar configuración primero
      setTimeout(async () => {
        const validation = await validateEmailConfig();
        console.log('📋 Resultado de validación:', validation);
        
        if (validation.valid) {
          console.log('🎯 Ejecutando prueba completa del sistema...');
          const testResult = await testEmailSystem();
          if (testResult.success) {
            console.log('🎉 SISTEMA DE EMAIL COMPLETAMENTE FUNCIONAL');
            console.log('📊 Resultados completos:', testResult);
            console.log('📧 Revisa tu bandeja de entrada para los emails de prueba');
          } else {
            console.warn('⚠️ Problema en la prueba de email:', testResult);
          }
        } else {
          console.warn('⚠️ Problema en la configuración:', validation);
        }
      }, 3000);
    }
  } catch (err) {
    console.warn('emailTest: no se pudo evaluar entorno de pruebas:', err);
  }
}
