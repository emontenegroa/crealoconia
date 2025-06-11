import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Clock, TestTube, AlertTriangle, Zap } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
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
  const {
    sendTestEmail
  } = useEmailHandling();
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);
  const [emailValidated, setEmailValidated] = useState(false);
  const handleTestEmail = async () => {
    if (!formData.email || !formData.email.includes('@')) {
      toast({
        title: "Email requerido",
        description: "Por favor ingresa un email válido en el campo de correo electrónico para hacer la prueba.",
        variant: "destructive"
      });
      return;
    }
    setIsValidatingEmail(true);
    try {
      console.log('🧪 Iniciando test de email...');
      toast({
        title: "Enviando email de prueba...",
        description: "Por favor espera mientras verificamos el sistema de email."
      });
      await sendTestEmail(formData.email);
      setEmailValidated(true);
      toast({
        title: "¡Email de prueba enviado!",
        description: `Revisa tu bandeja de entrada en ${formData.email}. Si no llega en 2-3 minutos, revisa la carpeta de spam.`
      });
    } catch (error) {
      console.error('❌ Error en test de email:', error);
      toast({
        title: "Error en el test de email",
        description: "Hubo un problema al enviar el email de prueba. Revisa la consola para más detalles.",
        variant: "destructive"
      });
    } finally {
      setIsValidatingEmail(false);
    }
  };
  const handleLoadExampleData = () => {
    setFormData({
      marca: 'FlexiTime Academy',
      email: 'esteban.montenegro@gmail.com',
      whatsapp: '56945487423',
      website: 'www.flexitimeacademy.com',
      instagram: 'flexitime_academy',
      quien_eres: 'Soy Sofía Hernández, consultora en productividad y gestión del tiempo con 8 años de experiencia ayudando a profesionales y emprendedores a maximizar su eficiencia. Me especializo en crear sistemas personalizados que permiten a mis clientes recuperar 2-3 horas diarias mientras mantienen el equilibrio vida-trabajo. He desarrollado metodologías propias basadas en neurociencia cognitiva y he formado a más de 800 profesionales en España y Latinoamérica.',
      problemas: 'Trabajo con ejecutivos, emprendedores y freelancers que sienten que no tienen control sobre su tiempo. Están constantemente ocupados pero no avanzan en lo realmente importante. Sufren de procrastinación crónica, sobrecarga mental, dificultad para priorizar y agotamiento constante. Muchos trabajan más de 10 horas diarias pero no ven resultados proporcionales. Les ayudo a diseñar sistemas que les permiten ser más productivos en menos tiempo.',
      preguntas_frecuentes: 'Me preguntan constantemente cómo es posible trabajar menos horas y ser más productivo, si realmente se puede eliminar la procrastinación, cómo mantener la motivación a largo plazo, y qué hacer cuando todo parece urgente. También quieren saber cuánto tiempo toma implementar un sistema de productividad efectivo y cómo adaptar las técnicas a su ritmo de vida específico.',
      estilo: 'Profesional',
      producto: 'Mi programa "FlexiTime Method", un sistema de 10 semanas que combina técnicas de gestión del tiempo, neurohábitos y automatización digital. Incluye 6 sesiones de coaching 1:1, acceso a mi plataforma digital con templates y herramientas, comunidad privada de alumni y seguimiento personalizado durante 3 meses adicionales. Está diseñado para profesionales que quieren resultados medibles y sostenibles en su productividad.'
    });
    setNoWebsite(false);
    setNoInstagram(false);
    toast({
      title: "Datos de ejemplo cargados",
      description: "Se han cargado todos los campos con datos de ejemplo para hacer pruebas."
    });
  };
  const handleConfirmedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };
  const stepLabels = ["Información Básica", "Perfil Personal", "Finalizar"];
  const stepFields = [['marca', 'email', 'whatsapp', 'website', 'instagram'], ['quien_eres', 'problemas', 'preguntas_frecuentes', 'estilo'], ['producto']];
  return <Card className="max-w-4xl mx-auto bg-white border-gray-200 shadow-xl">
      <CardHeader className="text-center pb-8 bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-2xl text-gray-900 flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-blue-600" />
          Responde estas 10 preguntas para generar tu Kit IA personalizado
        </CardTitle>
        <p className="text-gray-700 mt-4 text-lg leading-relaxed">
          Cada respuesta nos permite construir los textos, estructura y contenido de tu sitio profesional basado en tu negocio.
        </p>

        {/* Explicación del proceso de 2 emails */}
        <div className="mt-6 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center justify-center gap-2">
            🚀 <span>¡Tu presencia digital en minutos!</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="bg-white border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                <span className="font-bold text-blue-800">Super Prompt Instantáneo</span>
              </div>
              <p className="text-blue-700 text-sm mb-2">📧 <strong>Email inmediato</strong> con tu contenido personalizado</p>
              <p className="text-blue-700 text-sm">🤖 Copia, pega en ChatGPT y ¡empieza a crear contenido!</p>
            </div>
            <div className="bg-white border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                <span className="font-bold text-purple-800">Sitio Web Automático</span>
              </div>
              <p className="text-purple-700 text-sm mb-2">🌐 <strong>Segundo email</strong> con la URL de tu sitio listo</p>
              <p className="text-purple-700 text-sm">✨ Diseño profesional, textos optimizados, ¡todo hecho!</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-emerald-100 to-blue-100 border border-emerald-300 rounded-lg p-4 mt-4 text-center">
            <p className="text-emerald-800 font-bold text-lg">
              ⚡ <strong>De formulario a sitio web profesional en menos de 10 minutos</strong>
            </p>
            <p className="text-emerald-700 text-sm mt-2">
              Sin programar, sin diseñar, sin complicaciones. Solo responde y recibe todo listo.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-2 text-gray-700">
          <p className="flex items-center justify-center gap-2">
            ⏱️ <strong>Tiempo estimado: de 7 a 14 minutos</strong>
          </p>
          <p className="flex items-center justify-center gap-2">
            💾 <strong>Tu progreso se guarda automáticamente mientras avanzas.</strong>
          </p>
        </div>

        {/* Botón de datos de ejemplo */}
        

        {/* Validación de email */}
        
      </CardHeader>
      <CardContent className="p-8 bg-white">
        <form onSubmit={e => e.preventDefault()} className="space-y-8">
          <FormFields formData={formData} onInputChange={onInputChange} onAIUsageUpdate={onAIUsageUpdate} sessionId={sessionId} noWebsite={noWebsite} noInstagram={noInstagram} setNoWebsite={setNoWebsite} setNoInstagram={setNoInstagram} setFormData={setFormData} />

          <FormStepWizard showWizard={false} currentStep={0} setCurrentStep={() => {}} stepFields={stepFields} stepLabels={stepLabels} formData={formData} noWebsite={noWebsite} noInstagram={noInstagram} onGenerateWebsite={onGenerateWebsite} />

          {/* Botón con confirmación */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" className="w-full py-4 sm:py-6 text-base sm:text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300" disabled={!isFormValid}>
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
                <span className="whitespace-nowrap">GENERAR MI KIT IA AHORA</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2 text-blue-800">
                  <AlertTriangle className="w-5 h-5" />
                  ¿Confirmar generación del Kit IA?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-left space-y-3">
                  <p className="font-medium text-gray-800">
                    Estás a punto de generar tu Kit IA personalizado para <strong>{formData.marca}</strong>
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                    <p className="text-blue-800 mb-2">📧 <strong>Recibirás 2 emails en:</strong></p>
                    <p className="text-blue-700 font-medium">{formData.email}</p>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>✅ Email #1: Tu Super Prompt (inmediato)</p>
                    <p>✅ Email #2: URL de tu sitio web (en minutos)</p>
                  </div>
                  <p className="text-yellow-800 bg-yellow-50 border border-yellow-200 rounded p-2 text-sm">
                    ⚠️ <strong>Importante:</strong> Una vez generado, no podrás modificar las respuestas.
                  </p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmedSubmit} className="bg-blue-600 hover:bg-blue-700">
                  Sí, generar mi Kit IA
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="text-center space-y-2">
            <p className="text-gray-600 text-sm">
              🔐 <strong>100% seguro y sin spam.</strong> Solo recibirás tu Kit IA.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>;
};
export default MainForm;