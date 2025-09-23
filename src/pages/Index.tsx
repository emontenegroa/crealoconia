
import React, { useRef, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import LoadingSpinner from '@/components/LoadingSpinner';
import HeroSection from '@/components/HeroSection';
import ImportantNotice from '@/components/ImportantNotice';
import ProgressDialog from '@/components/ProgressDialog';
import InitialForm from '@/components/InitialForm';
import MainForm from '@/components/MainForm';
import HowItWorksToggle from '@/components/HowItWorksToggle';
import ImprovedTestimonials from '@/components/ImprovedTestimonials';
import TransparentPricing from '@/components/TransparentPricing';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import ImprovedFAQ from '@/components/ImprovedFAQ';
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
  
  // Scroll al formulario para el CTA pegajoso
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    });
  };
  
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
        
        {!showFullForm && !showResults && !isGenerating && (
          <InitialForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleFirstStep}
            isValid={isFirstStepValid}
            onLoadExample={loadExampleData}
            onMathCaptchaChange={handleMathCaptchaChange}
          />
        )}

        <TransparentPricing />
        
        <HowItWorksToggle />
        
        <ImprovedTestimonials />
        
        <ImportantNotice />
        
        {isGenerating ? (
          <LoadingSpinner />
        ) : showResults ? (
          <StrategicContentDisplay
            formData={formData}
            onReset={resetForm}
          />
        ) : showFullForm ? (
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
        ) : null}

        {/* Testimonials mejorados ya están arriba */}

        <ImprovedFAQ />
      </div>
      
      <WhatsAppFloat />
      
      <StickyMobileCTA 
        isVisible={!showFullForm && !showResults && !isGenerating}
        onClick={scrollToForm}
      />
    </div>
  );
};

export default Index;
