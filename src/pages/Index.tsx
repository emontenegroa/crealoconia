
import React, { useRef, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import LoadingSpinner from '@/components/LoadingSpinner';
import HeroSection from '@/components/HeroSection';
import ImportantNotice from '@/components/ImportantNotice';
import ProgressDialog from '@/components/ProgressDialog';
import InitialForm from '@/components/InitialForm';
import MainForm from '@/components/MainForm';
import HowItWorksToggle from '@/components/HowItWorksToggle';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQ from '@/components/FAQ';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { MetaTracker } from '@/components/MetaTracker';
import StrategicContentDisplay from '@/components/StrategicContentDisplay';
import { useFormHandler } from '@/hooks/useFormHandler';
import { useStepNavigation } from '@/hooks/useStepNavigation';

// Importar la prueba de email en desarrollo
if (import.meta.env.DEV) {
  import('@/utils/emailTest');
}

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const { showFullForm, showResults, currentURLStep } = useStepNavigation();
  
  const {
    formData,
    setFormData,
    isGenerating,
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
    handleFirstStep,
    loadPreviousData,
    startFresh,
    loadExampleData,
    handleSubmit,
    resetForm,
    isFirstStepValid,
    isFormValid,
    onGenerateWebsite,
    handleMathCaptchaChange
  } = useFormHandler();

  const handleBackToInitial = () => {
    // No resetear los datos, solo volver al paso inicial
    resetForm();
  };

  // Scroll al formulario cuando cambien los pasos
  useEffect(() => {
    if (showFullForm && formRef.current && currentURLStep >= 2) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }, 100);
    }
  }, [showFullForm, currentURLStep]);

  return (
    <div className="min-h-screen bg-white light">
      <MetaTracker />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <ProgressDialog
          show={showProgressDialog}
          attemptCount={attemptCount}
          onLoadPrevious={loadPreviousData}
          onStartFresh={startFresh}
        />

        <HeroSection onLoadExample={loadExampleData} />
        
        {isGenerating ? (
          <LoadingSpinner />
        ) : showResults ? (
          <StrategicContentDisplay
            formData={formData}
            onReset={resetForm}
          />
        ) : !showFullForm ? (
          <>
            <InitialForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleFirstStep}
              isValid={isFirstStepValid}
              onLoadExample={loadExampleData}
              onMathCaptchaChange={handleMathCaptchaChange}
            />
            
            {/* Cómo funciona - versión compacta */}
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Cómo funciona</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4">
                  <div className="text-3xl mb-3">📝</div>
                  <h3 className="font-bold mb-2">Completas el formulario</h3>
                  <p className="text-sm text-gray-600">2 datos iniciales + detalles de tu negocio</p>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-3">⚡</div>
                  <h3 className="font-bold mb-2">Generamos tu web</h3>
                  <p className="text-sm text-gray-600">Lista en 4 horas, 100% personalizada</p>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-3">🚀</div>
                  <h3 className="font-bold mb-2">Tú decides</h3>
                  <p className="text-sm text-gray-600">Te gusta? La publicas. No te gusta? No pagas nada</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div ref={formRef}>
            <MainForm
            formData={formData}
            setFormData={setFormData}
            onInputChange={handleInputChange}
            onAIUsageUpdate={handleAIUsageUpdate}
            sessionId={sessionId}
            noWebsite={noWebsite}
            setNoWebsite={setNoWebsite}
            noInstagram={noInstagram}
            setNoInstagram={setNoInstagram}
            onSubmit={handleSubmit}
            isFormValid={isFormValid}
            onGenerateWebsite={onGenerateWebsite}
            onBackToInitial={handleBackToInitial}
            />
          </div>
        )}

        <TestimonialsSection />

        <FAQ />

        <ImportantNotice />
      </div>
      
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
