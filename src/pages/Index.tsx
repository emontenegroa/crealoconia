import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Brain, Rocket, Users, MessageSquare, TrendingUp, Zap, Mail, Globe, Instagram } from "lucide-react";
import FormField from '@/components/FormField';
import ResultsDisplay from '@/components/ResultsDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import { toast } from "@/hooks/use-toast";

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
}

const Index = () => {
  const [formData, setFormData] = useState<FormData>({
    marca: '',
    quien_eres: '',
    problemas: '',
    preguntas_frecuentes: '',
    estilo: '',
    producto: '',
    email: '',
    website: '',
    instagram: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [noWebsite, setNoWebsite] = useState(false);
  const [noInstagram, setNoInstagram] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const loadExampleData = () => {
    setFormData({
      marca: 'Luz Interior Coaching',
      email: 'carolina@luzinteriorcoaching.com',
      website: 'www.luzinteriorcoaching.com',
      instagram: 'luzinteriorcoaching',
      quien_eres: 'Soy Carolina, coach de vida certificada con 8 años de experiencia. Me apasiona acompañar a mujeres emprendedoras y profesionales que buscan reconectar con su propósito de vida y desarrollar todo su potencial. Disfruto profundamente crear espacios seguros donde mis clientas pueden explorar sus emociones, desbloquear sus miedos y diseñar la vida que realmente desean vivir.',
      problemas: 'Mis clientas suelen llegar a mí sintiéndose bloqueadas emocionalmente, con una sensación constante de estar viviendo en piloto automático sin conexión con lo que realmente las hace felices. Muchas experimentan el síndrome del impostor, miedo al fracaso y dificultades para tomar decisiones importantes. Yo las ayudo a través de un proceso de autoconocimiento profundo, técnicas de PNL y ejercicios prácticos que les permiten recuperar su claridad mental, confianza y dirección en la vida.',
      preguntas_frecuentes: 'Me preguntan constantemente si realmente es posible cambiar de vida después de los 35 o 40 años, especialmente cuando ya tienen responsabilidades familiares y económicas. También me consultan sobre cómo saber si están tomando la decisión correcta y cómo superar el miedo al juicio de otros. Me encanta explicar que la transformación es posible a cualquier edad y que el momento perfecto no existe, pero el momento presente sí.',
      estilo: 'Inspirador',
      producto: 'Mi programa insignia "Renace: Transforma tu Vida en 90 Días", un proceso de coaching integral que incluye 8 sesiones individuales, un workbook personalizado, meditaciones guiadas y acceso a mi comunidad privada de mujeres en transformación. El programa está diseñado para mujeres que quieren hacer cambios profundos y duraderos en su vida personal y profesional.'
    });
    setNoWebsite(false);
    setNoInstagram(false);
  };

  const sendEmailToAdmin = async (formData: FormData) => {
    const BREVO_API_KEY = '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';
    
    try {
      console.log('🚀 Enviando email a Esteban con datos del formulario...');
      
      const emailData = {
        sender: {
          name: "Kit IA de Esteban",
          email: "esteban.montenegro@gmail.com"
        },
        to: [
          {
            email: "esteban.montenegro@gmail.com",
            name: "Esteban Montenegro"
          }
        ],
        subject: `🚀 Nuevo Kit IA generado para: ${formData.marca}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
            <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <h1 style="color: #7C3AED; text-align: center; margin-bottom: 30px; font-size: 28px;">🧠 Nuevo Kit IA Generado</h1>
              
              <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #374151; margin-top: 0; font-size: 20px;">📊 Información de la Marca</h2>
                <p style="margin: 8px 0;"><strong>Marca:</strong> ${formData.marca}</p>
                <p style="margin: 8px 0;"><strong>Email:</strong> ${formData.email}</p>
                <p style="margin: 8px 0;"><strong>Website:</strong> ${formData.website || 'No proporcionado'}</p>
                <p style="margin: 8px 0;"><strong>Instagram:</strong> ${formData.instagram ? '@' + formData.instagram : 'No proporcionado'}</p>
                <p style="margin: 8px 0;"><strong>Estilo:</strong> ${formData.estilo}</p>
              </div>

              <div style="background: #EFF6FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #1E40AF; margin-top: 0; font-size: 18px;">👤 Quién es</h2>
                <p style="line-height: 1.6;">${formData.quien_eres}</p>
              </div>

              <div style="background: #FEF3C7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #D97706; margin-top: 0; font-size: 18px;">🎯 Problemas que resuelve</h2>
                <p style="line-height: 1.6;">${formData.problemas}</p>
              </div>

              <div style="background: #ECFDF5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #059669; margin-top: 0; font-size: 18px;">❓ Preguntas frecuentes</h2>
                <p style="line-height: 1.6;">${formData.preguntas_frecuentes}</p>
              </div>

              <div style="background: #FDF2F8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #BE185D; margin-top: 0; font-size: 18px;">🚀 Producto principal</h2>
                <p style="line-height: 1.6;">${formData.producto}</p>
              </div>

              <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                <p style="margin: 0; color: #6B7280; font-size: 14px;">
                  Kit IA generado el ${new Date().toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        `
      };

      console.log('📧 Enviando email a admin desde esteban.montenegro@gmail.com...');

      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      });

      console.log('📬 Respuesta del servidor (admin):', response.status, response.statusText);
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('✅ Email enviado exitosamente a Esteban:', responseData);
        return true;
      } else {
        const errorData = await response.text();
        console.error('❌ Error al enviar email a Esteban:', errorData);
        throw new Error(`Error ${response.status}: ${errorData}`);
      }
    } catch (error) {
      console.error('💥 Error en sendEmailToAdmin:', error);
      throw error;
    }
  };

  const sendConfirmationEmail = async (formData: FormData) => {
    const BREVO_API_KEY = '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';
    
    try {
      console.log('📨 Enviando email de confirmación al usuario:', formData.email);
      
      const confirmationEmailData = {
        sender: {
          name: "Kit IA de Esteban",
          email: "esteban.montenegro@gmail.com"
        },
        to: [
          {
            email: formData.email,
            name: formData.marca
          }
        ],
        subject: `✅ Tu Kit IA está listo - ${formData.marca}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
            <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <h1 style="color: #7C3AED; text-align: center; margin-bottom: 30px; font-size: 28px;">🎉 ¡Tu Kit IA está listo!</h1>
              
              <p style="font-size: 18px; color: #374151; margin-bottom: 20px;">Hola <strong>${formData.marca}</strong>,</p>
              
              <p style="font-size: 16px; color: #6B7280; line-height: 1.6; margin-bottom: 25px;">
                ¡Excelente! Hemos generado tu Kit IA personalizado con todo el contenido que necesitas para potenciar tu presencia digital.
              </p>

              <div style="background: #EFF6FF; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h2 style="color: #1E40AF; margin-top: 0; font-size: 20px;">📦 Tu Kit IA incluye:</h2>
                <ul style="color: #374151; line-height: 1.8; padding-left: 20px;">
                  <li>📅 <strong>Plan de contenido para 15 días</strong> - Listo para usar en redes sociales</li>
                  <li>📱 <strong>Contenido específico para redes sociales</strong> - Posts, reels y estrategias</li>
                  <li>🌐 <strong>Prompt para crear tu página web</strong> - Para usar en Lovable</li>
                  <li>🧠 <strong>Prompt personalizado para ChatGPT</strong> - Tu asistente de marketing</li>
                </ul>
              </div>

              <div style="background: #F0FDF4; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #10B981;">
                <p style="margin: 0; color: #065F46; font-size: 16px; line-height: 1.6;">
                  <strong>💡 Próximos pasos:</strong><br>
                  Revisa el contenido generado en la plataforma y comienza a implementar tu estrategia digital. 
                  ¡Tu nueva presencia online está a solo unos clics de distancia!
                </p>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #6B7280; font-size: 14px; margin: 0;">
                  Valor del kit: <strong style="color: #7C3AED;">USD $50</strong> - ¡Completamente gratis para ti!
                </p>
              </div>

              <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; text-align: center; margin-top: 30px;">
                <p style="margin: 0; color: #6B7280; font-size: 14px;">
                  Kit IA creado por <strong>Esteban Montenegro</strong><br>
                  ${new Date().toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        `
      };

      console.log('📧 Enviando email de confirmación desde esteban.montenegro@gmail.com...');

      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(confirmationEmailData)
      });

      console.log('📬 Respuesta del servidor (confirmación):', response.status, response.statusText);
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('✅ Email de confirmación enviado exitosamente:', responseData);
        return true;
      } else {
        const errorData = await response.text();
        console.error('❌ Error al enviar email de confirmación:', errorData);
        throw new Error(`Error ${response.status}: ${errorData}`);
      }
    } catch (error) {
      console.error('💥 Error en sendConfirmationEmail:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      console.log('🔄 Iniciando proceso de generación de Kit IA...');
      
      // Simular proceso de generación
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      console.log('📤 Enviando emails de notificación...');
      
      // Enviar ambos emails en paralelo para mayor velocidad
      const [adminResult, confirmationResult] = await Promise.allSettled([
        sendEmailToAdmin(formData),
        sendConfirmationEmail(formData)
      ]);
      
      console.log('📧 Resultado email admin:', adminResult);
      console.log('📧 Resultado email confirmación:', confirmationResult);
      
      // Verificar que al menos uno se haya enviado correctamente
      const emailsSent = [adminResult, confirmationResult].filter(
        result => result.status === 'fulfilled'
      ).length;
      
      if (emailsSent === 0) {
        throw new Error('No se pudo enviar ningún email');
      }
      
      console.log(`✅ ${emailsSent}/2 emails enviados correctamente`);
      
      setIsGenerating(false);
      setShowResults(true);
      
      toast({
        title: "¡Kit IA generado exitosamente!",
        description: `${emailsSent === 2 ? 'Ambos emails enviados' : 'Al menos un email enviado'}. Revisa las bandejas de entrada.`,
      });
      
    } catch (error) {
      console.error('💥 Error durante la generación del kit:', error);
      setIsGenerating(false);
      toast({
        title: "Error al procesar el formulario",
        description: `Problema detectado: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        variant: "destructive",
      });
    }
  };

  // Updated form validation to consider checkboxes
  const isFormValid = formData.marca.trim() !== '' && 
                     formData.quien_eres.trim() !== '' && 
                     formData.problemas.trim() !== '' && 
                     formData.preguntas_frecuentes.trim() !== '' && 
                     formData.estilo !== '' && 
                     formData.producto.trim() !== '' &&
                     formData.email.trim() !== '' &&
                     (noWebsite || formData.website.trim() !== '') &&
                     (noInstagram || formData.instagram.trim() !== '');

  if (showResults) {
    return <ResultsDisplay formData={formData} onReset={() => {
      setShowResults(false);
      setFormData({
        marca: '',
        quien_eres: '',
        problemas: '',
        preguntas_frecuentes: '',
        estilo: '',
        producto: '',
        email: '',
        website: '',
        instagram: ''
      });
      setNoWebsite(false);
      setNoInstagram(false);
    }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-400 to-blue-400 p-4 rounded-2xl shadow-2xl">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
            Kit IA de Esteban
          </h1>
          <h2 className="text-2xl md:text-3xl text-white mb-6 font-semibold">
            Lanza tu contenido y web con inteligencia artificial — gratis y en minutos
          </h2>
          <p className="text-lg text-purple-100 max-w-4xl mx-auto leading-relaxed mb-6">
            Este kit gratuito está diseñado para emprendedores, coaches, freelancers y marcas personales que quieren tener presencia digital sin enredarse. Responde solo 6 preguntas y genera tu contenido, tu web y tu estrategia en segundos.
          </p>
          
          {/* Value proposition */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-white text-xl font-semibold mb-4 flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-300" />
                ✅ Recibirás:
              </h3>
              <div className="text-purple-100 text-left space-y-2">
                <p>• Un prompt profesional para ChatGPT</p>
                <p>• Un plan de contenido para 15 días</p>
                <p>• Los textos completos para tu web</p>
                <p>• Un prompt para crear tu sitio automáticamente en Lovable</p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-yellow-200 font-medium">
                  🎁 Valor estimado: USD 50 – pero hoy lo recibes gratis como parte de esta comunidad.
                </p>
              </div>
            </div>
          </div>

          <p className="text-purple-300 text-sm">
            Creado por <span className="font-semibold text-purple-200">Esteban Montenegro</span>
          </p>
        </div>

        {/* Important notice */}
        <Card className="max-w-4xl mx-auto mb-8 bg-white/95 border-gray-200 shadow-xl">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Brain className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-800">Tómate tu tiempo para responder</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Entre más detalladas y reflexivas sean tus respuestas, mejor será el kit generado. 
              La calidad de tu contenido depende de la información que compartas.
            </p>
          </CardContent>
        </Card>

        <div className="max-w-4xl mx-auto mb-8 text-center">
          <Button 
            onClick={loadExampleData}
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <Zap className="w-4 h-4 mr-2" />
            Cargar ejemplo para ver resultados
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: MessageSquare, title: "Plan de Contenido", desc: "15 días de contenido para redes sociales listo para usar" },
            { icon: Rocket, title: "Web Automática", desc: "Prompt para crear tu sitio profesional en Lovable" },
            { icon: TrendingUp, title: "Estrategia de Negocio", desc: "Prompt personalizado para ChatGPT y crecimiento" }
          ].map((feature, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-lg hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <feature.icon className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-purple-200 text-sm">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Form */}
        <Card className="max-w-4xl mx-auto bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl text-white flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              Completa estas preguntas para generar tu Kit IA personalizado
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {isGenerating ? (
              <LoadingSpinner />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <FormField
                  type="input"
                  label="1. ¿Cómo se llama tu emprendimiento o marca personal?"
                  placeholder="Ej: Luz Interior Coaching, Panadería Las 3 Hermanas, Soy Nombre Apellido"
                  name="marca"
                  value={formData.marca}
                  onChange={handleInputChange}
                  icon={Users}
                />

                <FormField
                  type="input"
                  label="2. Correo electrónico"
                  placeholder="Ej: info@tumarca.com"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  icon={Mail}
                />

                <div className="space-y-3 group">
                  <FormField
                    type="input"
                    label="3. Página web"
                    placeholder="Ej: www.tumarca.com"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    icon={Globe}
                  />
                  <div className="flex items-center space-x-2 ml-8">
                    <Checkbox 
                      id="no-website" 
                      checked={noWebsite}
                      onCheckedChange={(checked) => {
                        setNoWebsite(checked as boolean);
                        if (checked) {
                          setFormData(prev => ({ ...prev, website: '' }));
                        }
                      }}
                    />
                    <label htmlFor="no-website" className="text-purple-200 text-sm cursor-pointer">
                      No tengo página web
                    </label>
                  </div>
                </div>

                <div className="space-y-3 group">
                  <FormField
                    type="input"
                    label="4. Instagram (nombre de usuario)"
                    placeholder="Ej: tumarca (sin @)"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    icon={Instagram}
                  />
                  <div className="flex items-center space-x-2 ml-8">
                    <Checkbox 
                      id="no-instagram" 
                      checked={noInstagram}
                      onCheckedChange={(checked) => {
                        setNoInstagram(checked as boolean);
                        if (checked) {
                          setFormData(prev => ({ ...prev, instagram: '' }));
                        }
                      }}
                    />
                    <label htmlFor="no-instagram" className="text-purple-200 text-sm cursor-pointer">
                      No tengo Instagram
                    </label>
                  </div>
                </div>

                <FormField
                  type="textarea"
                  label="5. ¿Quién eres y qué disfrutas hacer en tu trabajo? ¿A quién ayudas?"
                  placeholder="Ej: Soy Carolina, coach de vida. Me encanta acompañar a mujeres que buscan reconectar con su propósito."
                  name="quien_eres"
                  value={formData.quien_eres}
                  onChange={handleInputChange}
                  icon={Users}
                />

                <FormField
                  type="textarea"
                  label="6. ¿Qué problema frecuente tiene tu cliente ideal y cómo tú lo solucionas?"
                  placeholder="Ej: Mis clientas suelen sentirse bloqueadas emocionalmente. Yo las ayudo a recuperar claridad con sesiones de coaching."
                  name="problemas"
                  value={formData.problemas}
                  onChange={handleInputChange}
                  icon={MessageSquare}
                />

                <FormField
                  type="textarea"
                  label="7. ¿Qué te preguntan siempre o qué disfrutas explicar una y otra vez?"
                  placeholder="Ej: Me preguntan si realmente es posible cambiar de vida después de los 40. Me encanta mostrar que siempre es posible."
                  name="preguntas_frecuentes"
                  value={formData.preguntas_frecuentes}
                  onChange={handleInputChange}
                  icon={MessageSquare}
                />

                <FormField
                  type="select"
                  label="8. ¿Cómo te gusta comunicarte en redes sociales?"
                  name="estilo"
                  value={formData.estilo}
                  onChange={handleInputChange}
                  options={["Cercano", "Profesional", "Inspirador", "Con humor", "Técnico"]}
                  icon={MessageSquare}
                />

                <FormField
                  type="textarea"
                  label="9. ¿Qué producto o servicio principal quieres vender o promover hoy?"
                  placeholder="Ej: Mi programa 'Renace', un proceso de coaching de 8 semanas para mujeres que quieren recuperar su autoestima."
                  name="producto"
                  value={formData.producto}
                  onChange={handleInputChange}
                  icon={Rocket}
                />

                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  disabled={!isFormValid}
                >
                  <Brain className="w-6 h-6 mr-3" />
                  🧠 Generar mi Kit IA personalizado
                </Button>

                <p className="text-center text-purple-200 text-sm mt-4">
                  🔐 Sin trucos. Sin ventas forzadas. Solo valor real.
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
