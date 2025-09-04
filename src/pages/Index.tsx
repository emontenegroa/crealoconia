
import React from 'react';
import { toast } from "@/hooks/use-toast";
import LoadingSpinner from '@/components/LoadingSpinner';
import HeroSection from '@/components/HeroSection';
import ModernHowItWorks from '@/components/ModernHowItWorks';
import ValueProposition from '@/components/ValueProposition';
import ModernInitialForm from '@/components/ModernInitialForm';
import MainForm from '@/components/MainForm';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQ from '@/components/FAQ';
import ModernThemeToggle from '@/components/ModernThemeToggle';
import { ThemeProvider } from '@/components/ThemeProvider';
import { useFormHandler } from '@/hooks/useFormHandler';

// Importar la prueba de email en desarrollo
if (import.meta.env.DEV) {
  import('@/utils/emailTest');
}

const Index = () => {
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
    showFullForm,
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
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <ModernThemeToggle />
        
        {isGenerating ? (
          <div className="min-h-screen flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : !showFullForm ? (
          <>
            <HeroSection onLoadExample={loadExampleData} />
            <ModernHowItWorks />
            <ValueProposition />
            <ModernInitialForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleFirstStep}
              isValid={isFirstStepValid}
              onLoadExample={loadExampleData}
              onMathCaptchaChange={handleMathCaptchaChange}
            />
            <TestimonialsSection />
            <FAQ />
          </>
        ) : (
          <div className="container mx-auto px-4 py-12 max-w-4xl">
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
      </div>
    </ThemeProvider>
  );
};

export default Index;
