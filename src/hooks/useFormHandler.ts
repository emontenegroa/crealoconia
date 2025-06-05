
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";
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
}

const emptyForm: FormData = {
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
};

export const useFormHandler = () => {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [strategicContent, setStrategicContent] = useState<string>('');
  const [noWebsite, setNoWebsite] = useState(false);
  const [noInstagram, setNoInstagram] = useState(false);

  const emailHandling = useEmailHandling();

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAIUsageUpdate = (fieldName: string, count: number) => {
    console.log(`Campo ${fieldName} ha usado IA ${count} veces`);
  };

  const loadExampleData = () => {
    setFormData({
      marca: 'Luz Interior Coaching',
      email: 'carolina@luzinteriorcoaching.com',
      whatsapp: '56945487423',
      website: 'www.luzinteriorcoaching.com',
      instagram: 'luzinteriorcoaching',
      quien_eres: 'Soy Carolina, coach de vida certificada con 8 años de experiencia.',
      problemas: 'Mis clientas suelen llegar bloqueadas emocionalmente.',
      preguntas_frecuentes: 'Me preguntan si es posible cambiar de vida después de los 35 años.',
      estilo: 'Inspirador',
      producto: 'Mi programa "Renace: Transforma tu Vida en 90 Días".'
    });
    setNoWebsite(false);
    setNoInstagram(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsGenerating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    try {
      console.log('Iniciando proceso de generación...');
      
      // Validar datos del formulario
      if (!formData.marca || !formData.email || !formData.quien_eres) {
        throw new Error('Faltan datos obligatorios en el formulario');
      }
      
      console.log('Datos del formulario validados');
      
      // Generar contenido simplificado - SOLO LOS PROMPTS
      const basicContent = `**PROMPT PARA CHATGPT**

"Eres un experto en marketing digital y creación de contenido para ${formData.marca}.

CONTEXTO DEL NEGOCIO:
- Marca: ${formData.marca}
- Quién es: ${formData.quien_eres}
- Problema que resuelve: ${formData.problemas}
- Producto principal: ${formData.producto}
- Estilo de comunicación: ${formData.estilo}
- Preguntas frecuentes: ${formData.preguntas_frecuentes}
- Instagram: ${formData.instagram || 'No especificado'}
- Website: ${formData.website || 'No especificado'}

INSTRUCCIONES:
Genera contenido educativo, inspirador y de venta. Mantén un tono ${formData.estilo.toLowerCase()}. Incluye llamados a la acción claros. Adapta el contenido para Instagram, Stories, LinkedIn y email marketing. Siempre incluye el contexto del negocio en tus respuestas."

**PROMPT PARA CREAR WEB EN LOVABLE**

"Crea una página web profesional para ${formData.marca}.

INFORMACIÓN DEL NEGOCIO:
- Nombre: ${formData.marca}
- Descripción: ${formData.quien_eres}
- Problema que resuelve: ${formData.problemas}
- Producto/Servicio: ${formData.producto}
- Estilo: ${formData.estilo}
- WhatsApp: ${formData.whatsapp}
- Email: ${formData.email}
- Instagram: ${formData.instagram || 'No especificado'}
- Website actual: ${formData.website || 'Nuevo sitio web'}

INSTRUCCIONES:
Crea una landing page moderna con secciones de hero, sobre nosotros, servicios, testimonios y contacto. Incluye botones de WhatsApp. Usa colores y diseño acorde al estilo ${formData.estilo.toLowerCase()}. Optimiza para conversión."`;

      // Enviar emails
      await emailHandling.sendEmailToAdmin(formData);
      await emailHandling.sendConfirmationEmail(formData, basicContent);
      
      setStrategicContent(basicContent);
      setIsGenerating(false);
      setShowResults(true);
      
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
      
      toast({
        title: "¡Kit IA generado exitosamente!",
        description: "Tu contenido estratégico ha sido enviado por email.",
      });
      
    } catch (error) {
      console.error('Error en handleSubmit:', error);
      setIsGenerating(false);
      toast({
        title: "Error al procesar",
        description: `Hubo un problema: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setShowResults(false);
    setStrategicContent('');
    setFormData(emptyForm);
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
    strategicContent,
    noWebsite,
    setNoWebsite,
    noInstagram,
    setNoInstagram,
    handleInputChange,
    handleAIUsageUpdate,
    loadExampleData,
    handleSubmit,
    resetForm,
    isFormValid
  };
};
