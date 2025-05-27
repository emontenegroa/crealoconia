
import React from 'react';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

interface FormWizardProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const FormWizard = ({ currentStep, totalSteps, stepLabels }: FormWizardProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {stepLabels.map((label, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                ${index < currentStep ? 'bg-green-500 text-white' : 
                  index === currentStep ? 'bg-purple-500 text-white animate-pulse' : 
                  'bg-white/20 text-purple-200'}
              `}>
                {index < currentStep ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className={`
                text-xs mt-2 text-center transition-colors duration-300
                ${index <= currentStep ? 'text-white font-medium' : 'text-purple-300'}
              `}>
                {label}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <ArrowRight className={`
                w-4 h-4 mx-4 transition-colors duration-300
                ${index < currentStep ? 'text-green-400' : 'text-purple-400'}
              `} />
            )}
          </div>
        ))}
      </div>
      
      {/* Barra de progreso */}
      <div className="w-full bg-white/20 rounded-full h-2 mb-4">
        <div 
          className="bg-gradient-to-r from-green-400 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentStep) / totalSteps) * 100}%` }}
        />
      </div>
      
      <div className="text-center">
        <span className="text-purple-200 text-sm">
          Paso {currentStep + 1} de {totalSteps} • {Math.round(((currentStep) / totalSteps) * 100)}% completado
        </span>
      </div>
    </div>
  );
};

export default FormWizard;
