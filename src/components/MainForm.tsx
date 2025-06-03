
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Clock } from "lucide-react";
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
  onGenerateWebsite
}: MainFormProps) => {
  const stepLabels = [
    "Información Básica",
    "Perfil Personal", 
    "Finalizar"
  ];

  const stepFields = [
    ['marca', 'email', 'whatsapp', 'website', 'instagram'],
    ['quien_eres', 'problemas', 'preguntas_frecuentes', 'estilo'],
    ['producto']
  ];

  return (
    <Card className="max-w-4xl mx-auto bg-white border-gray-200 shadow-xl">
      <CardHeader className="text-center pb-8 bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-2xl text-gray-900 flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-purple-600" />
          Completa estos 10 campos para recibir tu Kit IA personalizado
        </CardTitle>
        <p className="text-gray-700 mt-4">
          ⏱️ <strong>Tiempo estimado: 3-5 minutos</strong> | 📧 <strong>Lo recibirás al instante en tu email</strong>
          <br />
          <span className="text-purple-700 font-medium">🧠 ¡Nuevo! Usa IA para mejorar tus respuestas (2 veces por campo)</span>
          <br />
          <span className="text-green-700 text-sm">💾 Tu progreso se guarda automáticamente</span>
        </p>
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

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-green-600" />
              <h3 className="text-gray-900 text-lg font-semibold">⚡ ¡Ya casi terminas!</h3>
            </div>
            <p className="text-center text-gray-700">
              Tu Kit IA se generará al instante y llegará a tu email en menos de 30 segundos.
              <br />
              <strong>¡No olvides revisar tu carpeta de spam!</strong>
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full py-6 text-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            disabled={!isFormValid}
          >
            <Brain className="w-6 h-6 mr-3" />
            🚀 GENERAR MI KIT IA GRATIS AHORA
          </Button>

          <div className="text-center space-y-2">
            <p className="text-gray-600 text-sm">
              🔐 <strong>100% seguro y sin spam.</strong> Solo recibirás tu Kit IA.
            </p>
            <p className="text-purple-700 text-sm font-medium">
              ⏰ Esta oferta gratuita puede terminar en cualquier momento.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MainForm;
