
import React, { useRef, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import LoadingSpinnerEnhanced from '@/components/LoadingSpinnerEnhanced';
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
import PortfolioSection from '@/components/PortfolioSection';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import QuienSoy from '@/components/QuienSoy';
import ProblemaSolucion from '@/components/ProblemaSolucion';
import Metodologia from '@/components/Metodologia';
import TestimonialEspecial from '@/components/TestimonialEspecial';
import { MetaTracker } from '@/components/MetaTracker';
import StrategicContentDisplay from '@/components/StrategicContentDisplay';
import WelcomeScreen from '@/components/WelcomeScreen';
import BonusSection from '@/components/BonusSection';

import { useFormHandler } from '@/hooks/useFormHandler';
import { useStepNavigation } from '@/hooks/useStepNavigation';

// Importar la prueba de email en desarrollo
if (import.meta.env.DEV) {
  const params = new URLSearchParams(window.location.search);
  if (params.has('runEmailTest')) {
    import('@/utils/emailTest');
  }
}

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const { showWelcome, showFullForm, showResults, currentURLStep, goToInitialForm } = useStepNavigation();
  
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
    <div className="min-h-screen bg-background">
      <MetaTracker />
      
      <ProgressDialog
        show={showProgressDialog}
        attemptCount={attemptCount}
        onLoadPrevious={loadPreviousData}
        onStartFresh={startFresh}
      />

      {!showFullForm && !showResults && !isGenerating ? (
        <>
          <HeroSection 
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleFirstStep}
            isValid={isFirstStepValid}
          />
          
          <div className="space-y-0">
            <QuienSoy />
            <ProblemaSolucion />
            <Metodologia />
            <ImprovedTestimonials />
            <TestimonialEspecial />
            <TransparentPricing />
            <BonusSection />
            <ImprovedFAQ />
          </div>
        </>
      ) : isGenerating ? (
        <LoadingSpinnerEnhanced marca={formData.marca} />
      ) : showFullForm ? (
        <div ref={formRef} className="container mx-auto px-4 py-12 max-w-4xl">
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
      ) : (
        // Fallback para evitar pantalla negra - mostrar loading
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p>Procesando...</p>
          </div>
        </div>
      )}
      
      <WhatsAppFloat />
      
      {/* Remover StickyMobileCTA para móvil según solicitud del usuario */}
    </div>
  );
};

export default Index;
