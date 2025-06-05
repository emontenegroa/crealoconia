
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
      
      // Generar contenido básico en lugar de usar IA
      const basicContent = `**BLOQUE 1 - DOCUMENTACIÓN DE MARCA**
Nombre de la marca: ${formData.marca}
Quién es: ${formData.quien_eres}
Público objetivo: [Definir basándose en el contexto proporcionado]
Problema que resuelve: ${formData.problemas}
Producto principal: ${formData.producto}
Estilo de comunicación: ${formData.estilo}
Preguntas frecuentes: ${formData.preguntas_frecuentes}

**BLOQUE 2 - IDEAS DE CONTENIDO INICIAL**
Reels (5 ideas específicas para captar atención):
1. Día en la vida de un coach exitoso
2. Antes y después de transformaciones
3. Mitos vs. realidades en coaching
4. Proceso paso a paso de transformación
5. Testimonios reales de clientes

Stories (5 ideas para mostrar proceso y generar empatía):
1. Detrás de escenas de sesiones
2. Reflexiones matutinas
3. Momentos de inspiración diaria
4. Preguntas frecuentes respondidas
5. Tips rápidos de crecimiento

Posts (5 ideas educativas/inspiradoras):
1. Guía paso a paso para superar bloqueos
2. Las 5 creencias limitantes más comunes
3. Cómo identificar tu propósito de vida
4. Ejercicios prácticos de autoconocimiento
5. Hábitos que transforman tu mentalidad

**BLOQUE 3 - ASISTENTE PERSONAL IA**
Prompt para ChatGPT:

"Eres un experto en creación de contenido y marketing digital especializado en ${formData.estilo.toLowerCase()}.

PERFIL DEL NEGOCIO:
- Marca: ${formData.marca}
- Profesional: ${formData.quien_eres}
- Problema: ${formData.problemas}
- Producto: ${formData.producto}
- Estilo: ${formData.estilo}

INSTRUCCIONES:
Genera contenido educativo, inspirador y de venta. Mantén un tono ${formData.estilo.toLowerCase()}. Incluye llamados a la acción. Adapta el contenido para Instagram, Stories, LinkedIn y email marketing."`;

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
