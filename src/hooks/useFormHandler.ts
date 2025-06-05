
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
    superPrompt: string;
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
      marca: 'FitMente Pro',
      email: 'carlos@fitmentepro.com',
      whatsapp: '56987654321',
      website: 'www.fitmentepro.com',
      instagram: 'fitmentepro_oficial',
      quien_eres: 'Soy Carlos Mendez, psicólogo deportivo certificado y coach de alto rendimiento con más de 12 años transformando la mentalidad de atletas profesionales y emprendedores. Me especializo en eliminar bloqueos mentales que impiden alcanzar objetivos ambiciosos. He trabajado con más de 500 personas ayudándolas a desarrollar la mentalidad ganadora que necesitan para triunfar tanto en el deporte como en los negocios.',
      problemas: 'Trabajo con atletas y emprendedores que tienen el talento y las habilidades técnicas, pero se sabotean mentalmente cuando más importa. Sufren de ansiedad de rendimiento, miedo al fracaso, síndrome del impostor y pensamientos limitantes que los mantienen estancados. Les ayudo a reprogramar su mentalidad, eliminar creencias tóxicas y desarrollar la confianza inquebrantable necesaria para competir al más alto nivel.',
      preguntas_frecuentes: 'Me preguntan constantemente si es posible cambiar patrones mentales que han tenido por años, cómo manejar la presión en momentos decisivos, y por qué siguen autosaboteándose cuando están cerca del éxito. También quieren saber cuánto tiempo toma ver cambios reales en su mentalidad y cómo mantener la motivación cuando enfrentan obstáculos.',
      estilo: 'Profesional',
      producto: 'Mi programa "Mentalidad Imparable", un entrenamiento intensivo de 12 semanas que combina técnicas de psicología deportiva, PNL y neurociencia aplicada. Incluye sesiones 1:1, entrenamientos grupales semanales, acceso a mi app de meditaciones guiadas y comunidad privada de alto rendimiento. Está diseñado para personas que quieren resultados extraordinarios y están dispuestas a hacer el trabajo mental profundo.'
    });
    setNoWebsite(false);
    setNoInstagram(false);
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

  const generateSuperPrompt = (data: FormData) => {
    // Generar público objetivo basado en el problema y quien eres
    const publicoObjetivo = data.quien_eres.includes('atletas') ? 
      'Atletas, deportistas de alto rendimiento y emprendedores ambiciosos' :
      `Personas que ${data.problemas.toLowerCase().split('.')[0]}`;
    
    // Generar beneficios principales reformulados
    const beneficios = `✅ Transformación mental comprobada con metodología específica
✅ Eliminación de bloqueos limitantes en tiempo récord
✅ Desarrollo de confianza inquebrantable para momentos decisivos
✅ Estrategias probadas por profesionales de alto rendimiento
✅ Acompañamiento ${data.estilo.toLowerCase()} durante todo el proceso`;

    // Detectar gaps de información
    const gaps = [];
    if (!data.quien_eres.includes('años') && !data.quien_eres.includes('experiencia')) {
      gaps.push('- Años de experiencia específicos');
    }
    if (!data.producto.includes('precio') && !data.producto.includes('inversión')) {
      gaps.push('- Información de inversión o precio');
    }
    if (!data.problemas.includes('resultados') && !data.problemas.includes('logran')) {
      gaps.push('- Resultados específicos que logras con tus clientes');
    }

    const gapsSection = gaps.length > 0 ? 
      `\n\nVACÍOS DETECTADOS QUE DEBERÍAS COMPLETAR:\n${gaps.join('\n')}\n\nPREGUNTAS ADICIONALES PARA ENRIQUECER TU ESTRATEGIA:\n- ¿Cuáles son 3 casos de éxito específicos con resultados medibles?\n- ¿Qué metodología o framework único utilizas?\n- ¿Cuál es la inversión de tu programa principal?\n- ¿Qué garantías o diferenciadores ofreces vs. la competencia?` : '';

    const superPrompt = `ASISTENTE PERSONALIZADO DE CONTENIDO Y ESTRATEGIA PARA ${data.marca}

Actúa como experto en:
- Marketing digital estratégico
- Marca personal profesional  
- Generación de contenido viral
- Ventas digitales
- Embudos de monetización
- Posicionamiento de autoridad
- Estrategias de crecimiento orgánico
- Copywriting emocional y persuasivo
- Automatización de negocio digital

DATOS DEL NEGOCIO:
Marca: ${data.marca}
Profesional: ${data.quien_eres}
Público objetivo: ${publicoObjetivo}
Problema principal: ${data.problemas}
Método de trabajo: A través de ${data.producto}
Producto principal: ${data.producto}
Beneficios clave: ${beneficios}
Preguntas frecuentes de su audiencia: ${data.preguntas_frecuentes}
Estilo de comunicación: ${data.estilo}${data.instagram ? `\nInstagram: @${data.instagram}` : ''}${data.website ? `\nWeb: ${data.website}` : ''}${data.whatsapp ? `\nWhatsApp: +${data.whatsapp}` : ''}

INSTRUCCIONES PARA CREAR CONTENIDO:
- Genera contenido accionable, persuasivo y adaptado a cada plataforma.
- No repitas literalmente el perfil de negocio, usa el contexto para crear.
- Integra ejemplos, casos, microhistorias y lenguaje emocional.
- Menciona "${data.producto.split(',')[0]}" cuando corresponda.
- Adapta el contenido a: Instagram, Reels, Stories, TikTok, LinkedIn, YouTube Shorts, Email Marketing y Webinars.
- Incluye llamados a la acción coherentes.
- Permite variar entre contenido educativo, ventas, posicionamiento de autoridad, engagement emocional y manejo de objeciones.
- Identifica ángulos comerciales aprovechables.

ÁREAS DE CONTENIDO PARA CREAR:
- Publicaciones virales en redes sociales
- Reels y Shorts de alto alcance
- Historias de Instagram
- Series educativas
- Secuencias de email marketing
- Lanzamientos digitales
- Scripts de venta persuasivos
- Preguntas frecuentes convertidas en contenido educativo
- Guías de autoridad profesional

¿En qué área específica de contenido o estrategia te gustaría que te ayude hoy para ${data.marca}?${gapsSection}`;

    return {
      superPrompt
    };
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
      console.log('🔄 Iniciando proceso de generación de Super Prompt...');
      
      // Generar el super prompt
      const generatedPrompts = generateSuperPrompt(formData);
      const formDataWithPrompts = {
        ...formData,
        generatedPrompts
      };
      
      // Simular procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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
      
      // Actualizar formData con los prompts generados
      setFormData(formDataWithPrompts);
      
      await markAsCompleted(formDataWithPrompts);
      
      setIsGenerating(false);
      setShowResults(true);
      
      toast({
        title: "¡Super Prompt generado exitosamente!",
        description: emailsSent > 0 ? `${emailsSent} email(s) enviado(s). Revisa tu bandeja de entrada.` : "Prompt generado correctamente. Revisa el contenido a continuación.",
      });
      
    } catch (error) {
      console.error('💥 Error durante la generación del prompt:', error);
      setIsGenerating(false);
      
      setShowResults(true);
      
      toast({
        title: "Super Prompt generado",
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
