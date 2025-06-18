
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResultsDisplay from '@/components/ResultsDisplay';

const ResultadosPrueba = () => {
  const navigate = useNavigate();
  
  // Obtener los datos del formulario desde sessionStorage
  const getFormDataFromStorage = () => {
    try {
      const storedData = sessionStorage.getItem('formResults');
      if (storedData) {
        return JSON.parse(storedData);
      }
    } catch (error) {
      console.error('Error al obtener datos del storage:', error);
    }
    
    // Datos de ejemplo solo si no hay datos reales
    return {
      marca: 'FlexiTime Academy',
      email: 'sofia@flexitime.com',
      whatsapp: '34612345678',
      website: 'www.flexitimeacademy.com',
      instagram: 'flexitime_academy',
      quien_eres: 'Soy Sofía Hernández, consultora en productividad y gestión del tiempo con 8 años de experiencia ayudando a profesionales y emprendedores a maximizar su eficiencia. Me especializo en crear sistemas personalizados que permiten a mis clientes recuperar 2-3 horas diarias mientras mantienen el equilibrio vida-trabajo.',
      problemas: 'Trabajo con ejecutivos, emprendedores y freelancers que sienten que no tienen control sobre su tiempo. Están constantemente ocupados pero no avanzan en lo realmente importante. Sufren de procrastinación crónica, sobrecarga mental, dificultad para priorizar y agotamiento constante.',
      preguntas_frecuentes: 'Me preguntan constantemente cómo es posible trabajar menos horas y ser más productivo, si realmente se puede eliminar la procrastinación, cómo mantener la motivación a largo plazo, y qué hacer cuando todo parece urgente.',
      estilo: 'Profesional',
      producto: 'Mi programa "FlexiTime Method", un sistema de 10 semanas que combina técnicas de gestión del tiempo, neurohábitos y automatización digital. Incluye 6 sesiones de coaching 1:1, acceso a mi plataforma digital con templates y herramientas.',
      generatedPrompts: {
        superPrompt: 'Tu Super Prompt personalizado ha sido generado con éxito',
        lovablePrompt: 'Tu prompt para Lovable ha sido generado'
      }
    };
  };

  const formData = getFormDataFromStorage();

  const handleReset = () => {
    // Limpiar datos del storage
    sessionStorage.removeItem('formResults');
    navigate('/');
  };

  useEffect(() => {
    // Si llegamos aquí sin datos reales, mostrar un mensaje
    const hasRealData = sessionStorage.getItem('formResults');
    if (!hasRealData) {
      console.log('Mostrando datos de ejemplo - no se encontraron datos reales del formulario');
    }
  }, []);

  return (
    <ResultsDisplay 
      formData={formData} 
      onReset={handleReset} 
    />
  );
};

export default ResultadosPrueba;
