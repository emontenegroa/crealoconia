
import React from 'react';
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
  const { showFullForm, showResults } = useStepNavigation();
  
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
        
        <HowItWorksToggle />
        
        <ImportantNotice />
        
        {isGenerating ? (
          <LoadingSpinner />
        ) : showResults ? (
          <StrategicContentDisplay
            formData={formData}
            onReset={resetForm}
          />
        ) : !showFullForm ? (
          <InitialForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleFirstStep}
            isValid={isFirstStepValid}
            onLoadExample={loadExampleData}
            onMathCaptchaChange={handleMathCaptchaChange}
          />
        ) : (
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
        )}

        <TestimonialsSection />

        <FAQ />
      </div>
      
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
