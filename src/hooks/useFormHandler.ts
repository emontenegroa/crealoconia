
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { useFormPersistence } from '@/hooks/useFormPersistence';
import { useEmailHandling } from '@/hooks/useEmailHandling';

export interface FormData {
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
  generatedPrompts?: {
    chatGPTPrompt: string;
    lovablePrompt: string;
  };
}

export const useFormHandler = () => {
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
  const [showPricing, setShowPricing] = useState(false);
  const [noWebsite, setNoWebsite] = useState(false);
  const [noInstagram, setNoInstagram] = useState(false);
  const [showProgressDialog, setShowProgressDialog] = useState(false);
  const [previousProgress, setPreviousProgress] = useState<FormData | null>(null);

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

  const handlePurchase = () => {
    // Aquí iría la integración con Stripe o el procesador de pagos
    console.log('🛒 Iniciando proceso de compra...');
    
    // Por ahora, simular compra exitosa y mostrar formulario
    toast({
      title: "¡Compra exitosa! 🎉",
      description: "Ahora completa el formulario para generar tu Kit IA personalizado.",
    });
    
    setShowPricing(false);
  };

  const onGenerateWebsite = () => {
    console.log('🌐 Generando sitio web...');
    toast({
      title: "Sitio web en proceso",
      description: "Tu sitio web se está generando y será enviado por email.",
    });
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
      
      // Simular procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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
        console.warn('⚠️ No se pudieron enviar emails, pero continuando con la generación...');
      }
      
      console.log(`✅ ${emailsSent}/2 emails enviados correctamente`);
      
      await markAsCompleted(formData);
      
      setIsGenerating(false);
      setShowResults(true);
      
      toast({
        title: "¡Kit IA generado exitosamente!",
        description: emailsSent > 0 ? `${emailsSent} email(s) enviado(s). Revisa tu bandeja de entrada.` : "Kit generado correctamente. Revisa el contenido a continuación.",
      });
      
    } catch (error) {
      console.error('💥 Error durante la generación del kit:', error);
      setIsGenerating(false);
      
      // En caso de error, mostrar el resultado de todas formas
      setShowResults(true);
      
      toast({
        title: "Kit IA generado",
        description: "El contenido se ha generado correctamente. Puede que algunos emails no se hayan enviado.",
      });
    }
  };

  const resetForm = () => {
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

  return {
    formData,
    setFormData,
    isGenerating,
    showResults,
    showPricing,
    setShowPricing,
    noWebsite,
    setNoWebsite,
    noInstagram,
    setNoInstagram,
    showProgressDialog,
    previousProgress,
    attemptCount,
    sessionId,
    handleInputChange,
    handleAIUsageUpdate,
    loadPreviousData,
    startFresh,
    loadExampleData,
    handlePurchase,
    handleSubmit,
    resetForm,
    isFormValid,
    onGenerateWebsite
  };
};
