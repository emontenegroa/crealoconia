import React from 'react';
import { CheckCircle, Circle, Sparkles } from "lucide-react";

interface EnhancedFormWizardProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const EnhancedFormWizard = ({ currentStep, totalSteps, stepLabels }: EnhancedFormWizardProps) => {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
      {/* Header con logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-lg">Crealoconia</span>
        </div>
      </div>

      {/* Indicador de progreso principal */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pregunta {currentStep + 1} de {totalSteps}
        </h2>
        <p className="text-slate-300">
          {stepLabels[currentStep]}
        </p>
      </div>

      {/* Barra de progreso */}
      <div className="mb-6">
        <div className="w-full bg-white/10 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="text-center">
          <span className="text-sm text-slate-400">
            {Math.round(progressPercentage)}% completado
          </span>
        </div>
      </div>

      {/* Indicadores de pasos */}
      <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-2">
        {Array.from({ length: totalSteps }, (_, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <div key={index} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                ${isCompleted 
                  ? 'bg-emerald-500 text-white' 
                  : isCurrent 
                    ? 'bg-blue-500 text-white ring-2 ring-blue-300' 
                    : 'bg-white/20 text-slate-400'
                }
              `}>
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </div>
              
              {index < totalSteps - 1 && (
                <div className={`
                  w-6 h-1 mx-1 transition-all duration-300
                  ${isCompleted ? 'bg-emerald-500' : 'bg-white/20'}
                `} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EnhancedFormWizard;