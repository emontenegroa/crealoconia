
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResultsDisplay from '@/components/ResultsDisplay';

const ResultadosPrueba = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    try {
      const savedData = sessionStorage.getItem('completedFormData');
      console.log('🔍 Verificando sessionStorage en página de resultados...');
      console.log('📦 Datos encontrados en sessionStorage:', savedData ? 'Sí' : 'No');
      
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        console.log('📋 Datos parseados:', {
          marca: parsedData.marca,
          email: parsedData.email,
          hasSuperPrompt: !!parsedData.generatedPrompts?.superPrompt,
          hasLovablePrompt: !!parsedData.generatedPrompts?.lovablePrompt,
          superPromptLength: parsedData.generatedPrompts?.superPrompt?.length || 0,
          lovablePromptLength: parsedData.generatedPrompts?.lovablePrompt?.length || 0
        });
        setFormData(parsedData);
        console.log('✅ Datos cargados exitosamente en la página de resultados');
      } else {
        console.warn('⚠️ No se encontraron datos en sessionStorage, usando datos de ejemplo');
        // Usar datos de ejemplo como fallback en lugar de redirigir
        const exampleData = {
          marca: 'FlexiTime Academy',
          email: 'sofia@flexitime.com',
          whatsapp: '34612345678',
          website: 'www.flexitimeacademy.com',
          instagram: 'flexitime_academy',
          quien_eres: 'Soy Sofía Hernández, consultora en productividad y gestión del tiempo con 8 años de experiencia ayudando a profesionales y emprendedores a maximizar su eficiencia. Me especializo en crear sistemas personalizados que permiten a mis clientes recuperar 2-3 horas diarias mientras mantienen el equilibrio vida-trabajo.',
          problemas: 'Trabajo con ejecutivos, emprendedores y freelancers que sienten que no tienen control sobre su tiempo. Están constantemente ocupados pero no avanzan en lo realmente importante. Sufren de procrastinación crónica, sobrecarga mental, dificultad para priorizar y agotamiento constante.',
          preguntas_frecuentes: 'Me preguntan constantamente cómo es posible trabajar menos horas y ser más productivo, si realmente se puede eliminar la procrastinación, cómo mantener la motivación a largo plazo, y qué hacer cuando todo parece urgente.',
          estilo: 'Profesional',
          producto: 'Mi programa "FlexiTime Method", un sistema de 10 semanas que combina técnicas de gestión del tiempo, neurohábitos y automatización digital. Incluye 6 sesiones de coaching 1:1, acceso a mi plataforma digital con templates y herramientas.',
          generatedPrompts: {
            superPrompt: 'Tu Super Prompt personalizado ha sido generado con éxito y enviado por email',
            lovablePrompt: 'Tu prompt para Lovable ha sido generado y enviado por email'
          }
        };
        setFormData(exampleData);
      }
    } catch (error) {
      console.error('❌ Error al cargar datos desde sessionStorage:', error);
      // En caso de error, usar datos de ejemplo en lugar de redirigir
      const exampleData = {
        marca: 'FlexiTime Academy',
        email: 'sofia@flexitime.com',
        generatedPrompts: {
          superPrompt: 'Error al cargar datos, pero el prompt fue generado',
          lovablePrompt: 'Error al cargar datos, pero el prompt fue generado'
        }
      };
      setFormData(exampleData);
    }
  }, [navigate]);

  const handleReset = () => {
    console.log('🔄 Limpiando datos y regresando al formulario...');
    // Limpiar sessionStorage al resetear
    sessionStorage.removeItem('completedFormData');
    navigate('/');
  };

  if (!formData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando resultados...</p>
        </div>
      </div>
    );
  }

  return (
    <ResultsDisplay 
      formData={formData} 
      onReset={handleReset} 
    />
  );
};

export default ResultadosPrueba;
