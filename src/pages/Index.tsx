
import React from 'react';
import { toast } from "@/hooks/use-toast";
import StrategicContentDisplay from '@/components/StrategicContentDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import HeroSection from '@/components/HeroSection';
import ImportantNotice from '@/components/ImportantNotice';
import MainForm from '@/components/MainForm';
import HowItWorksToggle from '@/components/HowItWorksToggle';
import FAQ from '@/components/FAQ';
import { useFormHandler } from '@/hooks/useFormHandler';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Index = () => {
  const {
    formData,
    setFormData,
    isGenerating,
    showResults,
    strategicContent,
    noWebsite,
    setNoWebsite,
    noInstagram,
    setNoInstagram,
    handleInputChange,
    handleAIUsageUpdate,
    loadExampleData,
    handleSubmit,
    resetForm,
    isFormValid
  } = useFormHandler();

  if (showResults) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="mb-6">
            <Button 
              onClick={resetForm}
              variant="outline"
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Generar otro Kit IA
            </Button>
          </div>
          
          <StrategicContentDisplay 
            content={strategicContent} 
            marca={formData.marca}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
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
            sessionId="session-1"
            noWebsite={noWebsite}
            setNoWebsite={setNoWebsite}
            noInstagram={noInstagram}
            setNoInstagram={setNoInstagram}
            onSubmit={handleSubmit}
            isFormValid={isFormValid}
            onGenerateWebsite={() => {}}
            onLoadExample={loadExampleData}
          />
        )}

        <FAQ />
      </div>
    </div>
  );
};

export default Index;
