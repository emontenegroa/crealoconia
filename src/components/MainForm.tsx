
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
          <Sparkles className="w-8 h-8 text-blue-600" />
          Responde estas 10 preguntas para generar tu Kit IA personalizado
        </CardTitle>
        <p className="text-gray-700 mt-4 text-lg leading-relaxed">
          Cada respuesta nos permite construir los textos, estructura y contenido de tu sitio profesional basado en tu negocio.
        </p>
        <div className="mt-6 space-y-2 text-gray-700">
          <p className="flex items-center justify-center gap-2">
            ⏱️ <strong>Tiempo estimado: 3-5 minutos</strong>
          </p>
          <p className="flex items-center justify-center gap-2">
            📧 <strong>Recibirás tu contenido inicial por correo apenas completes el formulario.</strong>
          </p>
          <p className="flex items-center justify-center gap-2 text-blue-700">
            🧠 <strong>Nuevo: Puedes usar IA para optimizar tus respuestas hasta 2 veces por pregunta.</strong>
          </p>
          <p className="flex items-center justify-center gap-2 text-emerald-700">
            💾 <strong>Tu progreso se guarda automáticamente mientras avanzas.</strong>
          </p>
        </div>
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 font-medium">
            🔎 <strong>Recuerda:</strong> cuanto más claro seas en tus respuestas, mejor será el resultado que generemos para ti.
          </p>
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

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-emerald-600" />
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
            className="w-full py-6 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            disabled={!isFormValid}
          >
            <Brain className="w-6 h-6 mr-3" />
            🚀 GENERAR MI KIT IA AHORA
          </Button>

          <div className="text-center space-y-2">
            <p className="text-gray-600 text-sm">
              🔐 <strong>100% seguro y sin spam.</strong> Solo recibirás tu Kit IA.
            </p>
            <p className="text-blue-700 text-sm font-medium">
              ⏰ Esta oferta puede terminar en cualquier momento.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MainForm;
