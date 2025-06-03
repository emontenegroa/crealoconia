
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
    <Card className="max-w-4xl mx-auto bg-gradient-to-br from-purple-900 to-blue-900 border-purple-700 shadow-2xl">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-2xl text-white flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-yellow-300" />
          Completa estos 10 campos para recibir tu Kit IA personalizado
        </CardTitle>
        <p className="text-purple-200 mt-4">
          ⏱️ <strong>Tiempo estimado: 3-5 minutos</strong> | 📧 <strong>Lo recibirás al instante en tu email</strong>
          <br />
          <span className="text-yellow-200 font-medium">🧠 ¡Nuevo! Usa IA para mejorar tus respuestas (2 veces por campo)</span>
          <br />
          <span className="text-green-200 text-sm">💾 Tu progreso se guarda automáticamente</span>
        </p>
      </CardHeader>
      <CardContent className="p-8">
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

          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-300/30 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-green-300" />
              <h3 className="text-white text-lg font-semibold">⚡ ¡Ya casi terminas!</h3>
            </div>
            <p className="text-center text-green-100">
              Tu Kit IA se generará al instante y llegará a tu email en menos de 30 segundos.
              <br />
              <strong>¡No olvides revisar tu carpeta de spam!</strong>
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            disabled={!isFormValid}
          >
            <Brain className="w-6 h-6 mr-3" />
            🚀 GENERAR MI KIT IA GRATIS AHORA
          </Button>

          <div className="text-center space-y-2">
            <p className="text-purple-200 text-sm">
              🔐 <strong>100% seguro y sin spam.</strong> Solo recibirás tu Kit IA.
            </p>
            <p className="text-yellow-200 text-sm font-medium">
              ⏰ Esta oferta gratuita puede terminar en cualquier momento.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MainForm;
