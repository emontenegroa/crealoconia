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
    <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
      {/* Header con logo */}
      <div className="flex items-center justify-center mb-4 md:mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-base md:text-lg">CrealoconIA</span>
        </div>
      </div>

      {/* Indicador de progreso principal */}
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
          {currentStep === 1 ? (
            <>
              <Sparkles className="w-6 h-6 text-purple-400 inline-block animate-pulse mr-2" />
              Generando tu Kit IA...
              <Sparkles className="w-6 h-6 text-purple-400 inline-block animate-pulse ml-2" />
            </>
          ) : (
            `Pregunta ${currentStep + 1} de ${totalSteps}`
          )}
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          {stepLabels[currentStep]}
        </p>
      </div>

      {/* Barra de progreso */}
      <div className="mb-4 md:mb-6">
        <div className="w-full bg-white/10 rounded-full h-2 md:h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 md:h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="text-center">
          <span className="text-xs md:text-sm text-slate-400">
            {Math.round(progressPercentage)}% completado
          </span>
        </div>
      </div>

      {/* Indicadores de pasos - Solo mostrar en pantallas grandes */}
      <div className="hidden sm:flex items-center justify-center space-x-1 md:space-x-2">
        <div className="flex items-center space-x-1 md:space-x-2">
          {Array.from({ length: totalSteps }, (_, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            
            return (
              <div key={index} className="flex items-center">
                <div className={`
                  w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0
                  ${isCompleted 
                    ? 'bg-emerald-500 text-white shadow-lg' 
                    : isCurrent 
                      ? 'bg-blue-500 text-white ring-2 ring-blue-300 shadow-lg' 
                      : 'bg-white/20 text-slate-400'
                  }
                `}>
                  {isCompleted ? (
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                  ) : (
                    <span className="text-xs font-bold">{index + 1}</span>
                  )}
                </div>
                
                {index < totalSteps - 1 && (
                  <div className={`
                    w-3 h-0.5 md:w-6 md:h-1 mx-1 transition-all duration-300 flex-shrink-0
                    ${isCompleted ? 'bg-emerald-500' : 'bg-white/20'}
                  `} />
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Indicador simple para móvil */}
      <div className="sm:hidden text-center">
        <span className="text-slate-400 text-sm">
          Paso {currentStep + 1} de {totalSteps}
        </span>
      </div>
    </div>
  );
};

export default EnhancedFormWizard;