
import React from 'react';
import { toast } from "@/hooks/use-toast";
import ResultsDisplay from '@/components/ResultsDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import HeroSection from '@/components/HeroSection';
import FeatureCards from '@/components/FeatureCards';
import ImportantNotice from '@/components/ImportantNotice';
import ProgressDialog from '@/components/ProgressDialog';
import SocialProof from '@/components/SocialProof';
import MainForm from '@/components/MainForm';
import FinalCTASection from '@/components/FinalCTASection';
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
    return <ResultsDisplay formData={formData} onReset={resetForm} />;
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
        
        <div className="mb-16">
          <SocialProof />
        </div>

        <FeatureCards />
        
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
          />
        )}

        <FinalCTASection />
      </div>
    </div>
  );
};

export default Index;
