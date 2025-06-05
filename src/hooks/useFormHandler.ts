
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
    console.log('Campo ' + fieldName + ' ha usado IA ' + count + ' veces');
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
      
      // Simular proceso de carga
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Enviando emails y generando contenido...');
      
      // Enviar email al admin
      await emailHandling.sendEmailToAdmin(formData);
      
      // Generar contenido estratégico y enviar email de confirmación
      const result = await emailHandling.sendConfirmationEmail(formData);
      
      if (result.strategicContent) {
        setStrategicContent(result.strategicContent);
      }
      
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
      console.error('Error:', error);
      setIsGenerating(false);
      toast({
        title: "Error al procesar",
        description: "Hubo un problema: " + (error instanceof Error ? error.message : 'Error desconocido'),
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
