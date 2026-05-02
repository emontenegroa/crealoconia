
import React, { useRef, useEffect, useState } from 'react';
import { toast } from "@/hooks/use-toast";
import LoadingSpinnerEnhanced from '@/components/LoadingSpinnerEnhanced';
import ProgressDialog from '@/components/ProgressDialog';
import MainForm from '@/components/MainForm';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { MetaTracker } from '@/components/MetaTracker';
import QualificationWizard from '@/components/QualificationWizard';

import { useFormHandler } from '@/hooks/useFormHandler';
import { useStepNavigation } from '@/hooks/useStepNavigation';
import { useReveal } from '@/hooks/useReveal';

import Nav from '@/components/landing/Nav';
import Hero from '@/components/landing/Hero';
import Mirror from '@/components/landing/Mirror';
import Transformation from '@/components/landing/Transformation';
import HowItWorks from '@/components/landing/HowItWorks';
import Testimonials from '@/components/landing/Testimonials';
import Offer from '@/components/landing/Offer';
import Faq from '@/components/landing/Faq';
import FinalCta from '@/components/landing/FinalCta';
import Footer from '@/components/landing/Footer';

// Importar la prueba de email en desarrollo
if (import.meta.env.DEV) {
  const params = new URLSearchParams(window.location.search);
  if (params.has('runEmailTest')) {
    import('@/utils/emailTest');
  }
}

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
  useReveal();

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

  // Direct entry into qualification flow (no inline form on hero)
  const startFlow = () => {
    setShowQualification(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <Nav onCta={startFlow} />
          <main>
            <Hero onPrimary={startFlow} />
            <Mirror />
            <Transformation />
            <HowItWorks />
            <Testimonials />
            <Offer onCta={startFlow} />
            <Faq />
            <FinalCta onCta={startFlow} />
          </main>
          <Footer />
          <WhatsAppFloat />
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
      
    </div>
  );
};

export default Index;
