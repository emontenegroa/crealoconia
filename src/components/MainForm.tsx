
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Clock, TestTube } from "lucide-react";
import FormFields from '@/components/FormFields';
import FormStepWizard from '@/components/FormStepWizard';
import { FormData } from '@/hooks/useFormHandler';
import { useEmailHandling } from '@/hooks/useEmailHandling';
import { toast } from "@/hooks/use-toast";

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
  const { sendTestEmail } = useEmailHandling();

  const handleTestEmail = async () => {
    if (!formData.email || !formData.email.includes('@')) {
      toast({
        title: "Email requerido",
        description: "Por favor ingresa un email válido en el campo de correo electrónico para hacer la prueba.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('🧪 Iniciando test de email...');
      toast({
        title: "Enviando email de prueba...",
        description: "Por favor espera mientras verificamos el sistema de email.",
      });

      await sendTestEmail(formData.email);
      
      toast({
        title: "¡Email de prueba enviado!",
        description: `Revisa tu bandeja de entrada en ${formData.email}. Si no llega en 2-3 minutos, revisa la carpeta de spam.`,
      });
    } catch (error) {
      console.error('❌ Error en test de email:', error);
      toast({
        title: "Error en el test de email",
        description: "Hubo un problema al enviar el email de prueba. Revisa la consola para más detalles.",
        variant: "destructive",
      });
    }
  };

  const stepLabels = ["Información Básica", "Perfil Personal", "Finalizar"];
  const stepFields = [['marca', 'email', 'whatsapp', 'website', 'instagram'], ['quien_eres', 'problemas', 'preguntas_frecuentes', 'estilo'], ['producto']];

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
          
          <p className="flex items-center justify-center gap-2 text-emerald-700">
            💾 <strong>Tu progreso se guarda automáticamente mientras avanzas.</strong>
          </p>
        </div>
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 font-medium">
            🔎 <strong>Recuerda:</strong> cuanto más claro seas en tus respuestas, mejor será el resultado que generemos para ti.
          </p>
        </div>

        {/* Botón de prueba de email */}
        <div className="mt-6">
          <Button
            type="button"
            onClick={handleTestEmail}
            variant="outline"
            className="border-purple-300 text-purple-700 hover:bg-purple-50"
            disabled={!formData.email || !formData.email.includes('@')}
          >
            <TestTube className="w-4 h-4 mr-2" />
            Probar envío de email
          </Button>
          <p className="text-xs text-gray-600 mt-2">
            Usa este botón para verificar que el sistema de email funciona antes de completar el formulario
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

          <Button 
            type="submit" 
            className="w-full py-4 sm:py-6 text-base sm:text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300" 
            disabled={!isFormValid}
          >
            <Brain className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
            <span className="whitespace-nowrap">GENERAR MI KIT IA AHORA</span>
          </Button>

          <div className="text-center space-y-2">
            <p className="text-gray-600 text-sm">
              🔐 <strong>100% seguro y sin spam.</strong> Solo recibirás tu Kit IA.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MainForm;
