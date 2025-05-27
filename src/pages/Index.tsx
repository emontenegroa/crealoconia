
import React, { useState } from 'react';
import ContactForm from '../components/ContactForm';
import ResultsDisplay from '../components/ResultsDisplay';

interface FormData {
  marca: string;
  quien_eres: string;
  problemas: string;
  preguntas_frecuentes: string;
  estilo: string;
  producto: string;
  email: string;
  website: string;
  instagram: string;
  whatsapp: string;
}

const Index = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      console.log('📧 Enviando email con datos:', data);
      
      // Codificar los datos para la URL
      const encodedData = btoa(JSON.stringify({ 
        formData: data, 
        timestamp: new Date().toISOString() 
      }));
      const kitUrl = `${window.location.origin}/kit/${encodeURIComponent(encodedData)}`;
      
      console.log('🔗 URL del kit generada:', kitUrl);

      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Api-Key': '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'
        },
        body: JSON.stringify({
          sender: { 
            name: "Kit IA", 
            email: "esteban.montenegro@gmail.com" 
          },
          to: [
            { email: data.email, name: data.marca },
            { email: "esteban.montenegro@gmail.com", name: "Esteban Montenegro" }
          ],
          subject: `✅ Tu Kit IA para ${data.marca} está listo`,
          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 0;">
              <!-- Header -->
              <div style="background: rgba(255,255,255,0.1); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">🎉 ¡Tu Kit IA está listo!</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Todo el contenido personalizado para tu marca</p>
              </div>

              <!-- Brand Summary -->
              <div style="background: white; padding: 30px;">
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 25px; border-left: 4px solid #667eea;">
                  <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">📋 Resumen de tu marca</h3>
                  <div style="margin-bottom: 12px;"><strong style="color: #667eea;">Marca:</strong> ${data.marca}</div>
                  <div style="margin-bottom: 12px;"><strong style="color: #667eea;">Estilo:</strong> ${data.estilo}</div>
                  <div style="margin-bottom: 12px;"><strong style="color: #667eea;">Problema que resuelves:</strong> ${data.problemas.substring(0, 100)}...</div>
                  ${data.whatsapp ? `<div style="margin-bottom: 12px;"><strong style="color: #667eea;">WhatsApp:</strong> ${data.whatsapp}</div>` : ''}
                  ${data.instagram ? `<div style="margin-bottom: 12px;"><strong style="color: #667eea;">Instagram:</strong> @${data.instagram}</div>` : ''}
                  ${data.website ? `<div><strong style="color: #667eea;">Website:</strong> ${data.website}</div>` : ''}
                </div>

                <!-- Kit Access Button -->
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${kitUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 30px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                    🚀 Ver mi Kit IA Completo
                  </a>
                </div>

                <!-- Content Preview -->
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 25px 0;">
                  <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">📦 Tu kit incluye:</h3>
                  <div style="margin-bottom: 12px;">✅ <strong>Plan de contenido 15 días</strong> - Contenido estructurado listo para usar</div>
                  <div style="margin-bottom: 12px;">✅ <strong>Posts para redes sociales</strong> - Reels, posts educativos y promocionales</div>
                  <div style="margin-bottom: 12px;">✅ <strong>Prompt para página web</strong> - Genera tu sitio con Lovable.dev</div>
                  <div>✅ <strong>Prompt personalizado ChatGPT</strong> - Tu asistente de marketing 24/7</div>
                </div>

                <!-- Instructions -->
                <div style="background: #e3f2fd; padding: 20px; border-radius: 10px; margin: 25px 0; border-left: 4px solid #2196f3;">
                  <h3 style="color: #1976d2; margin: 0 0 15px 0; font-size: 16px;">📋 Cómo usar tu Kit IA:</h3>
                  <div style="margin-bottom: 10px; color: #333;">1. <strong>Haz clic en el botón de arriba</strong> para acceder a tu kit completo</div>
                  <div style="margin-bottom: 10px; color: #333;">2. <strong>Copia el contenido</strong> que necesites para tus redes sociales</div>
                  <div style="margin-bottom: 10px; color: #333;">3. <strong>Usa el prompt de Lovable</strong> para crear tu página web profesional</div>
                  <div style="color: #333;">4. <strong>Guarda el prompt de ChatGPT</strong> para generar contenido constantemente</div>
                </div>

                <!-- Value -->
                <div style="text-align: center; background: #fff3e0; padding: 20px; border-radius: 10px; margin: 25px 0;">
                  <p style="margin: 0; color: #f57c00; font-weight: bold; font-size: 16px;">💰 Valor: USD 50 • ¡Completamente GRATIS para ti!</p>
                </div>
              </div>

              <!-- Support Section -->
              <div style="background: #263238; padding: 30px; text-align: center;">
                <h3 style="color: white; margin: 0 0 20px 0; font-size: 18px;">¿Necesitas ayuda implementando tu Kit IA?</h3>
                <p style="color: rgba(255,255,255,0.8); margin: 0 0 25px 0;">Estoy aquí para ayudarte a sacar el máximo provecho de tu contenido</p>
                
                <div style="margin: 20px 0;">
                  <a href="mailto:esteban.montenegro@gmail.com" style="display: inline-block; background: #4caf50; color: white; text-decoration: none; padding: 12px 25px; border-radius: 25px; margin: 5px 10px; font-weight: bold;">
                    📧 Enviar Email
                  </a>
                  <a href="https://wa.me/56945487423?text=Hola%20Esteban,%20necesito%20ayuda%20con%20mi%20Kit%20IA%20para%20${encodeURIComponent(data.marca)}" style="display: inline-block; background: #25d366; color: white; text-decoration: none; padding: 12px 25px; border-radius: 25px; margin: 5px 10px; font-weight: bold;">
                    📱 WhatsApp
                  </a>
                </div>
                
                <p style="color: rgba(255,255,255,0.6); margin: 20px 0 0 0; font-size: 14px;">
                  Kit IA diseñado por <strong>Esteban Montenegro</strong>
                </p>
              </div>
            </div>
          `
        })
      });

      if (response.ok) {
        console.log('✅ Email enviado exitosamente');
        setFormData(data);
      } else {
        const errorData = await response.text();
        console.error('❌ Error enviando email:', errorData);
        throw new Error('Error al enviar el email');
      }
    } catch (error) {
      console.error('❌ Error en el proceso:', error);
      alert('Hubo un error al procesar tu solicitud. Por favor intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(null);
  };

  if (formData) {
    return <ResultsDisplay formData={formData} onReset={handleReset} />;
  }

  return <ContactForm onSubmit={handleFormSubmit} isLoading={isLoading} />;
};

export default Index;
