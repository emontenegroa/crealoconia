
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FormWizard from '@/components/FormWizard';
import WebsitePreview from '@/components/WebsitePreview';
import { FormData } from '@/hooks/useFormHandler';

interface FormStepWizardProps {
  showWizard: boolean;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  stepFields: string[][];
  stepLabels: string[];
  formData: FormData;
  noWebsite: boolean;
  noInstagram: boolean;
  onGenerateWebsite: () => void;
}

const FormStepWizard = ({
  showWizard,
  currentStep,
  setCurrentStep,
  stepFields,
  stepLabels,
  formData,
  noWebsite,
  noInstagram,
  onGenerateWebsite
}: FormStepWizardProps) => {
  const handleNextStep = () => {
    if (currentStep < stepFields.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isCurrentStepComplete = () => {
    const currentFields = stepFields[currentStep];
    return currentFields.every(field => {
      if (field === 'website' && noWebsite) return true;
      if (field === 'instagram' && noInstagram) return true;
      
      const fieldValue = formData[field as keyof FormData];
      // Handle both string fields and the generatedPrompts object
      if (typeof fieldValue === 'string') {
        return fieldValue.trim() !== '';
      }
      // For non-string fields (like generatedPrompts), consider them as complete
      return true;
    });
  };

  if (!showWizard) return null;

  return (
    <>
      <FormWizard 
        currentStep={currentStep}
        totalSteps={stepFields.length}
        stepLabels={stepLabels}
      />
      
      <div className="flex justify-between items-center py-6">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevStep}
          disabled={currentStep === 0}
          className="bg-white border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-400"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Anterior
        </Button>

        {currentStep < stepFields.length - 1 ? (
          <Button
            type="button"
            onClick={handleNextStep}
            disabled={!isCurrentStepComplete()}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            Siguiente
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <div className="flex gap-3">
            <WebsitePreview 
              formData={formData}
              onGenerateWebsite={onGenerateWebsite}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FormStepWizard;
