
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain } from "lucide-react";
import FormFields from '@/components/FormFields';
import FormStepWizard from '@/components/FormStepWizard';
import { FormData } from '@/hooks/useFormHandler';

interface MainFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onInputChange: (name: string, value: string) => void;
  onAIUsageUpdate: (fieldName: string, count: number) => void;
  sessionId: string;
  noWebsite: boolean;
  setNoWebsite: (value: boolean) => void;
  noInstagram: boolean;
  setNoInstagram: (value: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  isFormValid: boolean;
  onGenerateWebsite: () => void;
  onLoadExample: () => void;
}

const MainForm = ({
  formData,
  setFormData,
  onInputChange,
  onAIUsageUpdate,
  sessionId,
  noWebsite,
  setNoWebsite,
  noInstagram,
  setNoInstagram,
  onSubmit,
  isFormValid,
  onGenerateWebsite,
  onLoadExample
}: MainFormProps) => {
  const stepLabels = ["Información Básica", "Perfil Personal", "Finalizar"];
  const stepFields = [['marca', 'email', 'whatsapp', 'website', 'instagram'], ['quien_eres', 'problemas', 'preguntas_frecuentes', 'estilo'], ['producto']];
  
  return (
    <Card className="max-w-4xl mx-auto bg-white border-gray-200 shadow-xl" id="main-form">
      <CardHeader className="text-center pb-8 bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-2xl text-gray-900 flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-blue-600" />
          Responde estas 10 preguntas para generar tu contenido personalizado
        </CardTitle>
        <p className="text-gray-700 mt-4 text-lg leading-relaxed">
          Cada respuesta nos permite construir los textos y estructura de tu sitio profesional.
        </p>
        <div className="mt-6 space-y-2 text-gray-700">
          <p className="flex items-center justify-center gap-2">
            ⏱️ <strong>Tiempo: 3-5 minutos</strong>
          </p>
          <p className="flex items-center justify-center gap-2">
            📧 <strong>Recibirás todo por correo al completar.</strong>
          </p>
          
          <p className="flex items-center justify-center gap-2 text-emerald-700">
            💾 <strong>Tu progreso se guarda automáticamente.</strong>
          </p>
        </div>
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 font-medium">
            🔎 <strong>Tip:</strong> cuanto más claro seas, mejor será el resultado.
          </p>
        </div>

        {/* Botón de prueba */}
        <div className="mt-6">
          <Button 
            type="button" 
            onClick={onLoadExample}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Ver ejemplo de respuestas
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-8 bg-white">
        <form onSubmit={onSubmit} className="space-y-8">
          <FormFields 
            formData={formData} 
            onInputChange={onInputChange} 
            onAIUsageUpdate={onAIUsageUpdate} 
            sessionId={sessionId} 
            noWebsite={noWebsite} 
            noInstagram={noInstagram} 
            setNoWebsite={setNoWebsite} 
            setNoInstagram={setNoInstagram} 
            setFormData={setFormData} 
          />

          <FormStepWizard 
            showWizard={false} 
            currentStep={0} 
            setCurrentStep={() => {}} 
            stepFields={stepFields} 
            stepLabels={stepLabels} 
            formData={formData} 
            noWebsite={noWebsite} 
            noInstagram={noInstagram} 
            onGenerateWebsite={onGenerateWebsite} 
          />

          <Button 
            type="submit" 
            className="w-full py-4 sm:py-6 text-sm sm:text-base lg:text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300" 
            disabled={!isFormValid}
          >
            <Brain className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
            <span className="text-xs sm:text-sm lg:text-base leading-tight">GENERAR HAZLO CON IA AHORA</span>
          </Button>

          <div className="text-center space-y-2">
            <p className="text-gray-600 text-sm">
              🔐 <strong>100% seguro.</strong> Solo recibirás tu contenido personalizado.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MainForm;
