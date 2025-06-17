
import { supabase } from "@/integrations/supabase/client";

export const testEmailSystem = async () => {
  try {
    console.log('🧪 Iniciando prueba interna del sistema de email...');
    
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        type: 'test',
        email: 'esteban.montenegro@gmail.com'
      }
    });

    if (error) {
      console.error('❌ Error en la prueba de email:', error);
      return { success: false, error };
    }

    console.log('✅ Prueba de email exitosa:', data);
    return { success: true, data };
    
  } catch (error) {
    console.error('💥 Error en testEmailSystem:', error);
    return { success: false, error };
  }
};

// Ejecutar automáticamente la prueba (solo en desarrollo)
if (import.meta.env.DEV) {
  // Esperar 3 segundos después de cargar la página para hacer la prueba
  setTimeout(() => {
    testEmailSystem().then(result => {
      if (result.success) {
        console.log('🎉 Sistema de email funcionando correctamente');
      } else {
        console.warn('⚠️ Problema detectado en el sistema de email:', result.error);
      }
    });
  }, 3000);
}
