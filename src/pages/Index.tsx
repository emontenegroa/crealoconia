
import React, { useRef, useEffect, useState } from 'react';
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
import QualificationWizard from '@/components/QualificationWizard';

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
  const { showWelcome, showFullForm, showResults, currentURLStep, goToInitialForm, goToFullForm } = useStepNavigation();
  const [showQualification, setShowQualification] = useState(false);
  const [isQualified, setIsQualified] = useState(false);
  
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

  // Custom first step handler that triggers qualification
  const handleFirstStepWithQualification = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFirstStepValid) {
      setShowQualification(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleQualified = () => {
    setIsQualified(true);
    setShowQualification(false);
    handleFirstStep({ preventDefault: () => {} } as React.FormEvent);
  };

  const handleDisqualified = () => {
    setShowQualification(false);
  };

  const handleBackToInitial = () => {
    resetForm();
    setShowQualification(false);
    setIsQualified(false);
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

      {showQualification ? (
        <div className="min-h-screen bg-background py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Veamos si somos el fit correcto
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Responde 3 preguntas rápidas para personalizar tu experiencia
              </p>
            </div>
            <QualificationWizard 
              onQualified={handleQualified}
              onDisqualified={handleDisqualified}
            />
          </div>
        </div>
      ) : !showFullForm && !showResults && !isGenerating ? (
        <>
          <HeroSection 
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleFirstStepWithQualification}
            isValid={isFirstStepValid}
          />
          
          <div className="space-y-0">
            <Metodologia />
            <QuienSoy />
            <ProblemaSolucion />
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
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center text-foreground">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Procesando...</p>
          </div>
        </div>
      )}
      
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
