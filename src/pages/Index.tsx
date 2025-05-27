import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Brain, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import ResultsDisplay from '@/components/ResultsDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import HeroSection from '@/components/HeroSection';
import FeatureCards from '@/components/FeatureCards';
import ImportantNotice from '@/components/ImportantNotice';
import ProgressDialog from '@/components/ProgressDialog';
import FormFields from '@/components/FormFields';
import FormWizard from '@/components/FormWizard';
import SocialProof from '@/components/SocialProof';
import WebsitePreview from '@/components/WebsitePreview';
import { toast } from "@/hooks/use-toast";
import { useFormPersistence } from '@/hooks/useFormPersistence';
import { useEmailHandling } from '@/hooks/useEmailHandling';

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

const Index = () => {
  const [formData, setFormData] = useState<FormData>({
    marca: '',
    quien_eres: '',
    problemas: '',
    preguntas_frecuentes: '',
    estilo: '',
    producto: '',
    email: '',
    whatsapp: '',
    website: '',
    instagram: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [noWebsite, setNoWebsite] = useState(false);
  const [noInstagram, setNoInstagram] = useState(false);
  const [showProgressDialog, setShowProgressDialog] = useState(false);
  const [previousProgress, setPreviousProgress] = useState<FormData | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showWizard, setShowWizard] = useState(false);

  const stepLabels = [
    "Información Básica",
    "Perfil Personal", 
    "Finalizar"
  ];

  const stepFields = [
    ['marca', 'email', 'whatsapp', 'website', 'instagram'], // Paso 1: Info básica
    ['quien_eres', 'problemas', 'preguntas_frecuentes', 'estilo'], // Paso 2: Perfil
    ['producto'] // Paso 3: Producto y finalizar
  ];

  const {
    sessionId,
    attemptCount,
    loadPreviousProgress,
    checkAttemptLimit,
    saveProgress,
    markAsCompleted,
  } = useFormPersistence();

  const { sendEmailToAdmin, sendConfirmationEmail } = useEmailHandling();

  // Verificar progreso previo cuando se ingresa el email
  useEffect(() => {
    const checkPreviousProgress = async () => {
      if (formData.email && formData.email.includes('@') && !showProgressDialog) {
        const progress = await loadPreviousProgress(formData.email);
        if (progress && Object.values(progress).some(value => value.trim() !== '')) {
          setPreviousProgress(progress);
          setShowProgressDialog(true);
        }
      }
    };

    const timeoutId = setTimeout(checkPreviousProgress, 1000);
    return () => clearTimeout(timeoutId);
  }, [formData.email]);

  // Guardar progreso automáticamente cada 30 segundos
  useEffect(() => {
    if (formData.email && Object.values(formData).some(value => value.trim() !== '')) {
      const interval = setInterval(() => {
        saveProgress(formData);
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [formData]);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAIUsageUpdate = (fieldName: string, count: number) => {
    console.log(`Campo ${fieldName} ha usado IA ${count} veces`);
  };

  const loadPreviousData = () => {
    if (previousProgress) {
      setFormData(previousProgress);
      setNoWebsite(!previousProgress.website);
      setNoInstagram(!previousProgress.instagram);
      setShowProgressDialog(false);
      toast({
        title: "Progreso cargado",
        description: "Hemos restaurado tu progreso anterior. Puedes continuar donde lo dejaste.",
      });
    }
  };

  const startFresh = () => {
    setShowProgressDialog(false);
    toast({
      title: "Nuevo formulario",
      description: "Comenzando un formulario nuevo desde cero.",
    });
  };

  const loadExampleData = () => {
    setFormData({
      marca: 'Luz Interior Coaching',
      email: 'carolina@luzinteriorcoaching.com',
      whatsapp: '56945487423',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const canProceed = await checkAttemptLimit(formData.email);
    if (!canProceed) {
      toast({
        title: "Límite alcanzado",
        description: "Has completado el formulario 3 veces con este email. Usa otro email si necesitas generar más kits.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      console.log('🔄 Iniciando proceso de generación de Kit IA...');
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      console.log('📤 Enviando emails de notificación...');
      
      const [adminResult, confirmationResult] = await Promise.allSettled([
        sendEmailToAdmin(formData),
        sendConfirmationEmail(formData)
      ]);
      
      console.log('📧 Resultado email admin:', adminResult);
      console.log('📧 Resultado email confirmación:', confirmationResult);
      
      const emailsSent = [adminResult, confirmationResult].filter(
        result => result.status === 'fulfilled'
      ).length;
      
      if (emailsSent === 0) {
        throw new Error('No se pudo enviar ningún email');
      }
      
      console.log(`✅ ${emailsSent}/2 emails enviados correctamente`);
      
      await markAsCompleted(formData);
      
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

  const isFormValid = formData.marca.trim() !== '' && 
                     formData.quien_eres.trim() !== '' && 
                     formData.problemas.trim() !== '' && 
                     formData.preguntas_frecuentes.trim() !== '' && 
                     formData.estilo !== '' && 
                     formData.producto.trim() !== '' &&
                     formData.email.trim() !== '' &&
                     formData.whatsapp.trim() !== '' &&
                     (noWebsite || formData.website.trim() !== '') &&
                     (noInstagram || formData.instagram.trim() !== '');

  const handleNextStep = () => {
    if (currentStep < stepFields.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isCurrentStepComplete = () => {
    const currentFields = stepFields[currentStep];
    return currentFields.every(field => {
      if (field === 'website' && noWebsite) return true;
      if (field === 'instagram' && noInstagram) return true;
      return formData[field as keyof FormData].trim() !== '';
    });
  };

  const handleGenerateWebsite = () => {
    // Generar código para Lovable
    const lovablePrompt = `
Crea una página web profesional para ${formData.marca} con las siguientes características:

INFORMACIÓN DEL NEGOCIO:
- Marca: ${formData.marca}
- Descripción: ${formData.quien_eres}
- Problemas que resuelve: ${formData.problemas}
- FAQ: ${formData.preguntas_frecuentes}
- Estilo de comunicación: ${formData.estilo}
- Producto principal: ${formData.producto}

CONTACTO:
- WhatsApp: ${formData.whatsapp}
- Instagram: ${formData.instagram}
- Website actual: ${formData.website}

CARACTERÍSTICAS REQUERIDAS:
- Diseño responsive y moderno
- Sección hero con llamada a la acción
- Sección "Sobre mí" con la descripción personal
- Sección de problemas/soluciones
- FAQ con preguntas frecuentes
- Sección del producto/servicio principal
- Botón de WhatsApp flotante
- Enlaces a redes sociales
- Formulario de contacto
- Colores que reflejen el estilo ${formData.estilo}
- Optimización SEO básica

Usa React, TypeScript, Tailwind CSS y componentes modernos.
`;

    // Copiar al clipboard y abrir Lovable
    navigator.clipboard.writeText(lovablePrompt);
    window.open('https://lovable.dev', '_blank');
    
    toast({
      title: "¡Prompt copiado! 📋",
      description: "Se abrió Lovable.dev. Pega el prompt en el chat para generar tu sitio web.",
    });
  };

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
        whatsapp: '',
        website: '',
        instagram: ''
      });
      setNoWebsite(false);
      setNoInstagram(false);
      setCurrentStep(0);
      setShowWizard(false);
    }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <ProgressDialog
          show={showProgressDialog}
          attemptCount={attemptCount}
          onLoadPrevious={loadPreviousData}
          onStartFresh={startFresh}
        />

        <HeroSection onLoadExample={loadExampleData} />
        
        {/* Social Proof */}
        <div className="max-w-4xl mx-auto mb-8">
          <SocialProof />
        </div>

        <FeatureCards />
        <ImportantNotice />

        {/* Main Form */}
        <Card className="max-w-4xl mx-auto bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl text-white flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              Completa estos 10 campos para recibir tu Kit IA personalizado
            </CardTitle>
            <p className="text-purple-200 mt-4">
              ⏱️ <strong>Tiempo estimado: 3-5 minutos</strong> | 📧 <strong>Lo recibirás al instante en tu email</strong>
              <br />
              <span className="text-yellow-200 font-medium">🧠 ¡Nuevo! Usa IA para mejorar tus respuestas (2 veces por campo)</span>
              <br />
              <span className="text-green-200 text-sm">💾 Tu progreso se guarda automáticamente</span>
            </p>
          </CardHeader>
          <CardContent className="p-8">
            {isGenerating ? (
              <LoadingSpinner />
            ) : (
              <>
                {/* Wizard de progreso */}
                {showWizard && (
                  <FormWizard 
                    currentStep={currentStep}
                    totalSteps={stepFields.length}
                    stepLabels={stepLabels}
                  />
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <FormFields
                    formData={formData}
                    onInputChange={handleInputChange}
                    onAIUsageUpdate={handleAIUsageUpdate}
                    sessionId={sessionId}
                    noWebsite={noWebsite}
                    noInstagram={noInstagram}
                    setNoWebsite={setNoWebsite}
                    setNoInstagram={setNoInstagram}
                    setFormData={setFormData}
                  />

                  {/* Navegación del wizard */}
                  {showWizard && (
                    <div className="flex justify-between items-center py-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevStep}
                        disabled={currentStep === 0}
                        className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Anterior
                      </Button>

                      {currentStep < stepFields.length - 1 ? (
                        <Button
                          type="button"
                          onClick={handleNextStep}
                          disabled={!isCurrentStepComplete()}
                          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                        >
                          Siguiente
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <div className="flex gap-3">
                          <WebsitePreview 
                            formData={formData}
                            onGenerateWebsite={handleGenerateWebsite}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-300/30 rounded-xl p-6 mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Clock className="w-6 h-6 text-green-300" />
                      <h3 className="text-white text-lg font-semibold">⚡ ¡Ya casi terminas!</h3>
                    </div>
                    <p className="text-center text-green-100">
                      Tu Kit IA se generará al instante y llegará a tu email en menos de 30 segundos.
                      <br />
                      <strong>¡No olvides revisar tu carpeta de spam!</strong>
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    disabled={!isFormValid}
                  >
                    <Brain className="w-6 h-6 mr-3" />
                    🚀 GENERAR MI KIT IA GRATIS AHORA
                  </Button>

                  <div className="text-center space-y-2">
                    <p className="text-purple-200 text-sm">
                      🔐 <strong>100% seguro y sin spam.</strong> Solo recibirás tu Kit IA.
                    </p>
                    <p className="text-yellow-200 text-sm font-medium">
                      ⏰ Esta oferta gratuita puede terminar en cualquier momento.
                    </p>
                  </div>
                </form>
              </>
            )}
          </CardContent>
        </Card>

        {/* Final CTA Section */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 backdrop-blur-lg rounded-xl p-8">
            <h3 className="text-white text-2xl font-bold mb-4">
              ¿Por qué te doy esto gratis?
            </h3>
            <p className="text-purple-100 text-lg leading-relaxed mb-6">
              Porque sé que cuando veas la calidad del contenido que genero, 
              querrás trabajar conmigo en proyectos más grandes. 
              <br />
              <strong className="text-yellow-200">Esta es mi forma de mostrarte el poder de la IA aplicada correctamente.</strong>
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-purple-200">
              <span>✅ Sin tarjeta de crédito</span>
              <span>✅ Sin suscripciones</span>
              <span>✅ Sin letra pequeña</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
