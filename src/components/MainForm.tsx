
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import FormFields from '@/components/FormFields';
import FormStepWizard from '@/components/FormStepWizard';
import { FormData } from '@/hooks/useFormHandler';
import { AlertTriangle } from "lucide-react";

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
  onGenerateWebsite
}: MainFormProps) => {
  const handleConfirmedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  const stepLabels = ["Información Básica", "Perfil Personal", "Finalizar"];
  const stepFields = [
    ['marca', 'email', 'whatsapp', 'website', 'instagram'],
    ['quien_eres', 'problemas', 'preguntas_frecuentes', 'estilo'],
    ['producto']
  ];

  return (
    <Card className="max-w-4xl mx-auto bg-white border-gray-200 shadow-lg">
      <CardHeader className="text-center pb-6 bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-2xl text-gray-900 mb-3">
          Responde estas preguntas para generar tu sitio web
        </CardTitle>
        
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                <span className="font-bold text-blue-800">Contenido Personalizado</span>
              </div>
              <p className="text-blue-700 text-sm">📧 Email inmediato con tu super prompt para ChatGPT</p>
            </div>
            <div className="bg-white border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                <span className="font-bold text-purple-800">Sitio Web Completo</span>
              </div>
              <p className="text-purple-700 text-sm">🌐 Segundo email con tu sitio web funcionando</p>
            </div>
          </div>
          <div className="bg-emerald-100 border border-emerald-300 rounded-lg p-3 mt-4 text-center">
            <p className="text-emerald-800 font-bold">
              ⏱️ Tiempo total: menos de 10 minutos
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 bg-white">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
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

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                className="w-full py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                disabled={!isFormValid}
              >
                <Brain className="w-5 h-5 mr-2" />
                GENERAR MI SITIO WEB
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2 text-blue-800">
                  <AlertTriangle className="w-5 h-5" />
                  ¿Generar sitio web?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-left space-y-3">
                  <p className="font-medium text-gray-800">
                    Vas a generar tu sitio web para <strong>{formData.marca}</strong>
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                    <p className="text-blue-800 mb-2">📧 <strong>Recibirás 2 emails en:</strong></p>
                    <p className="text-blue-700 font-medium">{formData.email}</p>
                  </div>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>✅ Email #1: Super Prompt (inmediato)</p>
                    <p>✅ Email #2: Tu sitio web (en minutos)</p>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmedSubmit} className="bg-blue-600 hover:bg-blue-700">
                  Sí, generar sitio
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="text-center">
            <p className="text-gray-600 text-sm">
              🔐 100% seguro y sin spam
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MainForm;
