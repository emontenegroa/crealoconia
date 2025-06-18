
import React from 'react';
import ResultsDisplay from '@/components/ResultsDisplay';

const ResultadosPrueba = () => {
  // Datos de ejemplo para mostrar la página de resultados
  const datosEjemplo = {
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

  const handleReset = () => {
    window.location.href = '/';
  };

  return (
    <ResultsDisplay 
      formData={datosEjemplo} 
      onReset={handleReset} 
    />
  );
};

export default ResultadosPrueba;
