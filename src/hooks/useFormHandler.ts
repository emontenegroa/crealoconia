import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { useFormPersistence } from '@/hooks/useFormPersistence';
import { useEmailHandling } from '@/hooks/useEmailHandling';
import { usePromptGeneration } from '@/hooks/usePromptGeneration';
import { useSecurityEnforcement } from '@/hooks/useSecurityEnforcement';
import { useMetaConversions } from '@/hooks/useMetaConversions';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validateText, validateWhatsApp, validateUrl } from '@/utils/inputValidation';

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
    superPrompt: string;
    lovablePrompt?: string;
  };
}

export const useFormHandler = () => {
  const navigate = useNavigate();
  
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
  const [showFullForm, setShowFullForm] = useState(false);
  const [mathCaptchaValid, setMathCaptchaValid] = useState(false);

  const {
    sessionId,
    attemptCount,
    loadPreviousProgress,
    checkAttemptLimit,
    saveProgress,
    markAsCompleted,
  } = useFormPersistence();

  const { sendEmailToAdmin, sendConfirmationEmail } = useEmailHandling();
  const { generateSuperPrompt } = usePromptGeneration();
  const { trackPageView, trackLead, trackCompleteRegistration } = useMetaConversions();
  
  // Enhanced security enforcement
  const { 
    isBlocked, 
    blockReason, 
    enforceRateLimit, 
    validateAndSanitizeForm, 
    logFormInteraction 
  } = useSecurityEnforcement();

  // Track page view on component mount
  useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  // Verificar progreso previo cuando se ingresa el email
  useEffect(() => {
    const checkPreviousProgress = async () => {
      if (formData.email && formData.email.includes('@') && !showProgressDialog) {
        const emailValidation = validateEmail(formData.email);
        if (!emailValidation.isValid) return;
        
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
    // Log input interaction for security monitoring
    if (name === 'email' || name === 'marca') {
      logFormInteraction('input_change', formData.email || 'anonymous', { field: name });
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAIUsageUpdate = (fieldName: string, count: number) => {
    console.log(`Campo ${fieldName} ha usado IA ${count} veces`);
    logFormInteraction('ai_usage', formData.email, { field: fieldName, count });
  };

  // Enhanced form validation with security
  const validateForm = (data: FormData): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // Validar email
    const emailValidation = validateEmail(data.email);
    if (!emailValidation.isValid) {
      errors.push(emailValidation.error!);
    }
    
    // Validar campos de texto requeridos
    const textFields = [
      { field: data.marca, name: 'Marca', maxLength: 100 },
      { field: data.quien_eres, name: 'Quién eres', maxLength: 2000 },
      { field: data.problemas, name: 'Problemas', maxLength: 2000 },
      { field: data.preguntas_frecuentes, name: 'Preguntas frecuentes', maxLength: 2000 },
      { field: data.producto, name: 'Producto', maxLength: 2000 }
    ];
    
    textFields.forEach(({ field, name, maxLength }) => {
      const validation = validateText(field, name, maxLength, true);
      if (!validation.isValid) {
        errors.push(validation.error!);
      }
    });
    
    // Validar WhatsApp
    const whatsappValidation = validateWhatsApp(data.whatsapp);
    if (!whatsappValidation.isValid) {
      errors.push(whatsappValidation.error!);
    }
    
    // Validar URLs opcionales
    if (!noWebsite && data.website) {
      const websiteValidation = validateUrl(data.website, 'Website');
      if (!websiteValidation.isValid) {
        errors.push(websiteValidation.error!);
      }
    }
    
    if (!noInstagram && data.instagram) {
      const instagramValidation = validateUrl(data.instagram, 'Instagram');
      if (!instagramValidation.isValid) {
        errors.push(instagramValidation.error!);
      }
    }
    
    // Validar estilo
    if (!data.estilo || data.estilo.trim() === '') {
      errors.push('El estilo es requerido');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  // Enhanced first step with security
  const handleFirstStep = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is blocked
    if (isBlocked) {
      toast({
        title: "Acceso bloqueado",
        description: blockReason,
        variant: "destructive",
      });
      return;
    }

    // Validar captcha matemático
    if (!mathCaptchaValid) {
      toast({
        title: "Verificación requerida",
        description: "Por favor completa la verificación matemática.",
        variant: "destructive",
      });
      return;
    }
    
    // Enhanced rate limiting
    if (!enforceRateLimit(formData.email, 'email_submission')) {
      return;
    }
    
    // Enhanced validation with security
    const securityResult = await validateAndSanitizeForm(
      { marca: formData.marca, email: formData.email }, 
      formData.email
    );
    
    if (!securityResult.isValid) {
      toast({
        title: "Datos inválidos",
        description: securityResult.errors?.[0] || "Error de validación",
        variant: "destructive",
      });
      return;
    }

    // Use sanitized data
    if (securityResult.sanitizedData) {
      setFormData(prev => ({
        ...prev,
        ...securityResult.sanitizedData
      }));
    }

    // Save progress
    await saveProgress(formData);
    await logFormInteraction('first_step_completed', formData.email);
    
    // Navigate to step 2 for better tracking
    navigate('/?step=2', { replace: true });
    
    // Track Lead event with Meta Conversions API with specific URL
    await trackLead(formData.email, {
      marca: formData.marca,
      step: 'first_step_completed',
      step_url: window.location.href
    });
    
    setShowFullForm(true);
    
    toast({
      title: "¡Perfecto!",
      description: "Ahora completa el resto de la información para generar tu Kit IA.",
    });
  };

  const loadPreviousData = () => {
    if (previousProgress) {
      setFormData(previousProgress);
      setNoWebsite(!previousProgress.website);
      setNoInstagram(!previousProgress.instagram);
      setShowProgressDialog(false);
      
      if (previousProgress.marca && previousProgress.email) {
        setShowFullForm(true);
        // Navigate to step 2 if returning to full form
        navigate('/?step=2', { replace: true });
      }
      
      toast({
        title: "Progreso cargado",
        description: "Hemos restaurado tu progreso anterior. Puedes continuar donde lo dejaste.",
      });
    }
  };

  const startFresh = () => {
    setShowProgressDialog(false);
    setShowFullForm(false);
    // Navigate back to step 1 for fresh start
    navigate('/', { replace: true });
    toast({
      title: "Nuevo formulario",
      description: "Comenzando un formulario nuevo desde cero.",
    });
  };

  const loadExampleData = () => {
    setFormData({
      marca: 'FlexiTime Academy',
      email: 'sofia@flexitime.com',
      whatsapp: '34612345678',
      website: 'www.flexitimeacademy.com',
      instagram: 'flexitime_academy',
      quien_eres: 'Soy Sofía Hernández, consultora en productividad y gestión del tiempo con 8 años de experiencia ayudando a profesionales y emprendedores a maximizar su eficiencia. Me especializo en crear sistemas personalizados que permiten a mis clientes recuperar 2-3 horas diarias mientras mantienen el equilibrio vida-trabajo. He desarrollado metodologías propias basadas en neurociencia cognitiva y he formado a más de 800 profesionales en España y Latinoamérica.',
      problemas: 'Trabajo con ejecutivos, emprendedores y freelancers que sienten que no tienen control sobre su tiempo. Están constantemente ocupados pero no avanzan en lo realmente importante. Sufren de procrastinación crónica, sobrecarga mental, dificultad para priorizar y agotamiento constante. Muchos trabajan más de 10 horas diarias pero no ven resultados proporcionales. Les ayudo a diseñar sistemas que les permiten ser más productivos en menos tiempo.',
      preguntas_frecuentes: 'Me preguntan constantemente cómo es posible trabajar menos horas y ser más productivo, si realmente se puede eliminar la procrastinación, cómo mantener la motivación a largo plazo, y qué hacer cuando todo parece urgente. También quieren saber cuánto tiempo toma implementar un sistema de productividad efectivo y cómo adaptar las técnicas a su ritmo de vida específico.',
      estilo: 'Profesional',
      producto: 'Mi programa "FlexiTime Method", un sistema de 10 semanas que combina técnicas de gestión del tiempo, neurohábitos y automatización digital. Incluye 6 sesiones de coaching 1:1, acceso a mi plataforma digital con templates y herramientas, comunidad privada de alumni y seguimiento personalizado durante 3 meses adicionales. Está diseñado para profesionales que quieren resultados medibles y sostenibles en su productividad.'
    });
    setNoWebsite(false);
    setNoInstagram(false);
    setShowFullForm(true);
    logFormInteraction('example_data_loaded', 'sofia@flexitime.com');
  };

  const handlePurchase = () => {
    console.log('🛒 Iniciando proceso de compra...');
    
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

  // Enhanced submit with security
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is blocked
    if (isBlocked) {
      toast({
        title: "Acceso bloqueado",
        description: blockReason,
        variant: "destructive",
      });
      return;
    }
    
    // Enhanced rate limiting for form completion
    if (!enforceRateLimit(formData.email, 'form_completion')) {
      return;
    }
    
    // Enhanced validation with security
    const securityResult = await validateAndSanitizeForm(formData, formData.email);
    
    if (!securityResult.isValid) {
      toast({
        title: "Formulario inválido",
        description: securityResult.errors?.[0] || "Error de validación de seguridad",
        variant: "destructive",
      });
      return;
    }
    
    const canProceed = await checkAttemptLimit(formData.email);
    if (!canProceed) {
      toast({
        title: "Límite alcanzado",
        description: "Has completado el formulario 10 veces con este email. Usa otro email si necesitas generar más kits.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Navigate to step 3 (generating) for better tracking
    navigate('/?step=3', { replace: true });
    try {
      console.log('🔄 Iniciando proceso de generación de Super Prompt...');
      
      // Use sanitized data for generation
      const sanitizedFormData = securityResult.sanitizedData || formData;
      
      const generatedPrompts = await generateSuperPrompt(sanitizedFormData);
      const formDataWithPrompts = {
        ...sanitizedFormData,
        generatedPrompts
      };
      
      console.log('📤 Enviando emails de notificación...');
      
      const [adminResult, confirmationResult] = await Promise.allSettled([
        sendEmailToAdmin(formDataWithPrompts),
        sendConfirmationEmail(formDataWithPrompts)
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
      
      setFormData(formDataWithPrompts);
      
      await markAsCompleted(formDataWithPrompts);
      await logFormInteraction('form_completed', formData.email, { emailsSent });
      
      // Track Complete Registration event with Meta Conversions API with specific URL
      await trackCompleteRegistration(formData.email, {
        marca: sanitizedFormData.marca,
        producto: sanitizedFormData.producto,
        estilo: sanitizedFormData.estilo,
        emailsSent,
        step_url: window.location.href
      });
      
      setIsGenerating(false);
      
      toast({
        title: "¡Super Prompt generado exitosamente!",
        description: emailsSent > 0 ? `${emailsSent} email(s) enviado(s). Revisa tu bandeja de entrada.` : "Prompt generado correctamente. Revisa el contenido a continuación.",
      });
      
      // Navigate to step 4 (results/thanks) for better tracking
      navigate('/?step=4', { replace: true });
      
    } catch (error) {
      console.error('💥 Error durante la generación del prompt:', error);
      setIsGenerating(false);
      
      await logFormInteraction('form_error', formData.email, { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      
      toast({
        title: "Super Prompt generado",
        description: "El contenido se ha generado correctamente. Puede que algunos emails no se hayan enviado.",
      });
      
      navigate('/resultados');
    }
  };

  const resetForm = () => {
    setShowResults(false);
    setShowFullForm(false);
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
    navigate('/');
  };

  // Validación para el primer paso
  const isFirstStepValid = () => {
    const emailValidation = validateEmail(formData.email);
    const marcaValidation = validateText(formData.marca, 'Marca', 100, true);
    return emailValidation.isValid && marcaValidation.isValid && mathCaptchaValid;
  };

  // Función para manejar el cambio del captcha matemático
  const handleMathCaptchaChange = (isValid: boolean) => {
    setMathCaptchaValid(isValid);
  };

  // Validación para el formulario completo
  const isFormValid = () => {
    const validation = validateForm(formData);
    return validation.isValid && 
           (noWebsite || formData.website.trim() !== '') &&
           (noInstagram || formData.instagram.trim() !== '');
  };

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
    showFullForm,
    isBlocked,
    blockReason,
    handleInputChange,
    handleAIUsageUpdate,
    handleFirstStep,
    loadPreviousData,
    startFresh,
    loadExampleData,
    handlePurchase,
    handleSubmit,
    resetForm,
    isFirstStepValid: isFirstStepValid(),
    isFormValid: isFormValid(),
    onGenerateWebsite,
    handleMathCaptchaChange
  };
};
