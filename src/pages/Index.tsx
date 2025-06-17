
import React from 'react';
import { toast } from "@/hooks/use-toast";
import StrategicContentDisplay from '@/components/StrategicContentDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import HeroSection from '@/components/HeroSection';
import ImportantNotice from '@/components/ImportantNotice';
import ProgressDialog from '@/components/ProgressDialog';
import MainForm from '@/components/MainForm';
import HowItWorksToggle from '@/components/HowItWorksToggle';
import FAQ from '@/components/FAQ';
import AdminTestButton from '@/components/AdminTestButton';
import { useFormHandler } from '@/hooks/useFormHandler';

const Index = () => {
  const {
    formData,
    setFormData,
    isGenerating,
    showResults,
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
    loadPreviousData,
    startFresh,
    loadExampleData,
    handleSubmit,
    resetForm,
    isFormValid,
    onGenerateWebsite
  } = useFormHandler();

  if (showResults) {
    return <StrategicContentDisplay formData={formData} onReset={resetForm} />;
  }

  return (
    <div className="min-h-screen bg-white">
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
            onLoadExample={loadExampleData}
          />
        )}

        <FAQ />
      </div>
      
      {/* Botón de admin para revisar formularios abandonados */}
      <AdminTestButton />
    </div>
  );
};

export default Index;
