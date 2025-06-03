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
    isFormValid
  } = useFormHandler();

  if (showResults) {
    return <ResultsDisplay formData={formData} onReset={resetForm} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <ProgressDialog
          show={showProgressDialog}
          attemptCount={attemptCount}
          onLoadPrevious={loadPreviousData}
          onStartFresh={startFresh}
        />

        <HeroSection onLoadExample={loadExampleData} />
        
        <div className="max-w-4xl mx-auto mb-8">
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
          />
        )}

        <FinalCTASection />
      </div>
    </div>
  );
};

export default Index;
