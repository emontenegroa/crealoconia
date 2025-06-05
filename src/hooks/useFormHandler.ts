
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
      marca: 'Digital Emprendedor',
      email: 'maria@digitalemprendedor.com',
      whatsapp: '56998877665',
      website: 'www.digitalemprendedor.com',
      instagram: 'digitalemprendedor_oficial',
      quien_eres: 'Soy María Elena, consultora en transformación digital con más de 10 años ayudando a pequeñas empresas y emprendedores a digitalizar sus negocios. Me especializo en crear estrategias digitales simples pero efectivas que generen resultados reales. Disfruto enseñando a personas que no son expertas en tecnología cómo pueden aprovechar las herramientas digitales para hacer crecer sus negocios de manera sostenible.',
      problemas: 'Trabajo con emprendedores y pequeños empresarios que se sienten perdidos en el mundo digital. Muchos tienen negocios exitosos offline pero no saben cómo trasladar esa misma efectividad al entorno digital. Sufren de baja visibilidad online, no generan leads de calidad, tienen redes sociales inconsistentes y no logran convertir seguidores en clientes reales. Les ayudo a crear una presencia digital coherente y rentable.',
      preguntas_frecuentes: 'Me preguntan constantemente cuánto tiempo toma ver resultados reales en marketing digital, si realmente vale la pena invertir en redes sociales para negocios B2B, y cómo pueden competir con empresas más grandes que tienen presupuestos enormes para marketing. También quieren saber qué herramientas digitales son realmente necesarias y cuáles son solo modas pasajeras.',
      estilo: 'Profesional',
      producto: 'Mi programa "Digital Start", un proceso de 12 semanas donde transformo completamente la presencia digital de tu negocio. Incluye auditoría digital completa, estrategia personalizada, implementación de herramientas, creación de contenido y seguimiento de resultados. Todo diseñado para emprendedores que quieren resultados concretos sin perder tiempo en teorías complicadas.'
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

  const generatePrompts = (data: FormData) => {
    // Generar público objetivo basado en el problema
    const publicoObjetivo = `Personas que ${data.problemas.toLowerCase()}`;
    
    // Generar beneficios principales
    const beneficios = `✅ Solución personalizada para tu situación específica
✅ Metodología probada con resultados reales  
✅ Acompañamiento ${data.estilo.toLowerCase()} durante todo el proceso
✅ Respuestas claras a tus principales dudas`;

    const chatGPTPrompt = `Eres un experto en marketing digital, marca personal, contenido, ventas y estrategia digital. A continuación recibirás el perfil completo de negocio para generar contenido profesional.

DATOS DEL NEGOCIO:
Marca: ${data.marca}
Profesional: ${data.quien_eres}
Público objetivo: ${publicoObjetivo}
Problema que resuelve: ${data.problemas}
Método de solución: A través de ${data.producto}
Producto principal: ${data.producto}
Beneficios principales: ${beneficios}
Preguntas frecuentes: ${data.preguntas_frecuentes}
Estilo de comunicación: ${data.estilo}${data.instagram ? `\nInstagram: @${data.instagram}` : ''}${data.website ? `\nWeb: ${data.website}` : ''}${data.whatsapp ? `\nWhatsApp: +${data.whatsapp}` : ''}

INSTRUCCIONES DE GENERACIÓN DE CONTENIDO:
Mantén tono ${data.estilo.toLowerCase()}, auténtico y conecta emocionalmente.
Genera contenido educativo, emocional, comercial y de autoridad.
Usa ejemplos, microhistorias y conexiones emocionales.
Menciona "${data.producto}" cuando sea relevante.
Crea contenido adaptable para Instagram, Reels, Stories, LinkedIn, Facebook, Email Marketing.
Incluye llamados a la acción cuando corresponda.
Reformula profesionalmente, no repitas literalmente las respuestas originales.

ÁREAS DE CONTENIDO:
- Contenido para redes sociales
- Marketing directo  
- Estrategia de ventas
- Contenido educativo
- Lanzamientos y promociones

¿En qué área específica te gustaría que te ayude hoy con el contenido de ${data.marca}?`;

    const lovablePrompt = `Crea una página web profesional para ${data.marca} siguiendo esta estructura:

Marca: ${data.marca}
Profesional: ${data.quien_eres}
Público objetivo: ${publicoObjetivo}
Problema principal que resuelve: ${data.problemas}
Método de solución: A través de ${data.producto}
Producto principal: ${data.producto}
Beneficios principales: ${beneficios}
Preguntas frecuentes: ${data.preguntas_frecuentes}
Estilo de comunicación: ${data.estilo}${data.email ? `\nEmail: ${data.email}` : ''}${data.whatsapp ? `\nWhatsApp: +${data.whatsapp}` : ''}${data.website ? `\nWebsite: ${data.website}` : ''}${data.instagram ? `\nInstagram: @${data.instagram}` : ''}

Objetivos del sitio:
- Página profesional que transmita autoridad y confianza
- Orientado a conversión y generación de leads
- Lenguaje claro, profesional, confiable y simple
- Sitio orientado a venta de servicios y sesiones
- Incluir sección de contacto y llamada a la acción prominente
- Optimizado para uso en dispositivos móviles
- Diseño moderno con gradientes y animaciones suaves

Estructura requerida:
1. Header con navegación y CTA destacado
2. Hero section que conecte emocionalmente con el problema
3. Sección "Sobre mí" con autoridad y credibilidad  
4. Servicios/productos con beneficios claros
5. Testimonios (crear 3-4 ejemplos realistas)
6. FAQ basada en las preguntas frecuentes
7. Footer con formulario de contacto

Importante: No uses plantillas genéricas. Construye el copy y estructura basado en la información entregada. Reformula profesionalmente los textos para que suenen naturales y convincentes.`;

    return {
      chatGPTPrompt,
      lovablePrompt
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
      console.log('🔄 Iniciando proceso de generación de Kit IA...');
      
      // Generar los prompts
      const generatedPrompts = generatePrompts(formData);
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
        title: "¡Kit IA generado exitosamente!",
        description: emailsSent > 0 ? `${emailsSent} email(s) enviado(s). Revisa tu bandeja de entrada.` : "Kit generado correctamente. Revisa el contenido a continuación.",
      });
      
    } catch (error) {
      console.error('💥 Error durante la generación del kit:', error);
      setIsGenerating(false);
      
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
