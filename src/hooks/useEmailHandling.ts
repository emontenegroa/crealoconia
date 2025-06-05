
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

export const useEmailHandling = () => {
  const sendEmailToAdmin = async (formData: FormData) => {
    console.log('📤 Enviando notificación al administrador...');
    
    const emailBody = `
NUEVA RESPUESTA - HAZLO CON IA
=====================================

INFORMACIÓN DE CONTACTO:
- Marca/Negocio: ${formData.marca}
- Email: ${formData.email}
- WhatsApp: ${formData.whatsapp}
- Website actual: ${formData.website || 'No tiene'}
- Instagram: ${formData.instagram || 'No tiene'}

INFORMACIÓN DEL NEGOCIO:
- Quién es: ${formData.quien_eres}
- Problemas que resuelve: ${formData.problemas}
- Preguntas frecuentes: ${formData.preguntas_frecuentes}
- Estilo de comunicación: ${formData.estilo}
- Producto/Servicio principal: ${formData.producto}

=====================================
Formulario completado el: ${new Date().toLocaleString('es-ES')}
    `;

    // Simular envío de email al admin
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('✅ Notificación enviada al administrador');
    return { success: true };
  };

  const sendConfirmationEmail = async (formData: FormData) => {
    console.log('📧 Enviando email de confirmación al cliente...');
    
    const confirmationEmailBody = `
¡Hola ${formData.marca}!

Tu contenido personalizado ya está siendo generado. 

📧 QUÉ RECIBIRÁS:
✅ Textos base para tu sitio web
✅ 15 días de contenido para redes sociales
✅ Tu asistente IA personalizado para ChatGPT

🌐 SITIO WEB:
Estamos construyendo la primera versión de tu sitio web profesional.
Te avisaremos por email cuando esté listo para revisión.

💬 CONTACTO:
¿Dudas? Escríbenos:
📧 esteban.montenegro@gmail.com
📱 WhatsApp: +56 9 4548 7423

Gracias por confiar en Hazlo con IA.

Saludos,
Esteban Montenegro
Hazlo con IA
    `;

    // Simular envío de email de confirmación
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('✅ Email de confirmación enviado al cliente');
    return { success: true };
  };

  return {
    sendEmailToAdmin,
    sendConfirmationEmail
  };
};
