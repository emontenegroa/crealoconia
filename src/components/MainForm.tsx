import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, ArrowLeft, ArrowRight, Users, Target, Rocket, MessageSquare, Globe, Instagram, Mail, Phone } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import FormFields from '@/components/FormFields';
import EnhancedFormWizard from '@/components/EnhancedFormWizard';
import MotivationalMessage from '@/components/MotivationalMessage';
import FormField from '@/components/FormField';
import { FormData } from '@/hooks/useFormHandler';
import { useStepNavigation } from '@/hooks/useStepNavigation';
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
  onBackToInitial: () => void;
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
  onBackToInitial
}: MainFormProps) => {
  const { currentWizardStep, goToWizardStep } = useStepNavigation();

  // Definir las preguntas en orden optimizado - contacto primero para capturar leads
  const stepFields = [
    ['email', 'whatsapp'], // Datos de contacto PRIMERO para capturar leads
    ['marca', 'producto'], // Información básica del negocio
    ['quien_eres', 'estilo'], // Información personal y estilo
    ['problemas', 'preguntas_frecuentes'], // Problemas que resuelves (campos más largos)
    ['website', 'instagram'] // Presencia digital actual (opcional)
  ];

  const stepLabels = [
    "Información de contacto",
    "Información básica de tu negocio", 
    "Cuéntanos sobre ti y tu estilo",
    "Problemas que resuelves",
    "Presencia digital actual"
  ];

  const handleConfirmedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 MainForm - handleConfirmedSubmit ejecutado');
    console.log('📋 MainForm - FormData actual:', formData);
    console.log('🔍 MainForm - Verificando campos específicos:', {
      marca: formData.marca,
      email: formData.email,
      quien_eres: formData.quien_eres,
      producto: formData.producto,
      estilo: formData.estilo
    });
    console.log('🔄 MainForm - Llamando onSubmit...');
    onSubmit(e);
  };

  const handleNextStep = () => {
    if (currentWizardStep < stepFields.length - 1) {
      goToWizardStep(currentWizardStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentWizardStep > 0) {
      goToWizardStep(currentWizardStep - 1);
    }
  };

  const isCurrentStepComplete = () => {
    const currentFields = stepFields[currentWizardStep];
    return currentFields.every(field => {
      if (field === 'website' && noWebsite) return true;
      if (field === 'instagram' && noInstagram) return true;
      
      const fieldValue = formData[field as keyof FormData];
      if (typeof fieldValue === 'string') {
        return fieldValue.trim() !== '';
      }
      return true;
    });
  };

  const getCurrentStepFields = () => {
    return stepFields[currentWizardStep] || [];
  };

  const renderCurrentStepFields = () => {
    const fields = getCurrentStepFields();
    
    return fields.map(fieldName => {
      // Configuración específica para cada campo
      const fieldConfigs = {
        marca: {
          type: 'input' as const,
          label: '¿Cuál es el nombre de tu negocio o marca personal?',
          placeholder: 'Ej: Consultoría García, Dr. María López, etc.',
          icon: Users,
          options: undefined
        },
        producto: {
          type: 'textarea' as const,
          label: '¿Qué producto o servicio ofreces?',
          placeholder: 'Describe brevemente qué haces o vendes...',
          icon: Target,
          options: undefined
        },
        quien_eres: {
          type: 'textarea' as const,
          label: '¿Quién eres y qué te hace especial?',
          placeholder: 'Cuéntanos sobre tu experiencia, credenciales o lo que te diferencia...',
          icon: Users,
          options: undefined
        },
        estilo: {
          type: 'select' as const,
          label: '¿Qué estilo y personalidad quieres para tu sitio?',
          placeholder: 'Selecciona el estilo que más te represente',
          icon: Rocket,
          options: [
            'Profesional y confiable',
            'Moderno y creativo', 
            'Cálido y cercano',
            'Elegante y sofisticado',
            'Dinámico y energético',
            'Minimalista y limpio',
            'Divertido y colorido',
            'Serio y corporativo'
          ]
        },
        problemas: {
          type: 'textarea' as const,
          label: '¿Qué problemas específicos resuelves para tus clientes?',
          placeholder: 'Describe los principales dolores o necesidades que atiendes...',
          icon: Target,
          options: undefined
        },
        preguntas_frecuentes: {
          type: 'textarea' as const,
          label: '¿Qué preguntas frecuentes te hacen tus clientes?',
          placeholder: 'Lista las dudas más comunes que recibes...',
          icon: MessageSquare,
          options: undefined
        },
        website: {
          type: 'input' as const,
          label: '¿Tienes sitio web actual? (opcional)',
          placeholder: 'https://tu-sitio-actual.com',
          icon: Globe,
          options: undefined
        },
        instagram: {
          type: 'input' as const,
          label: '¿Tienes Instagram? (opcional)',
          placeholder: '@tu_instagram',
          icon: Instagram,
          options: undefined
        },
        email: {
          type: 'input' as const,
          label: '¿Cuál es tu email principal?',
          placeholder: 'tu@email.com',
          icon: Mail,
          options: undefined
        },
        whatsapp: {
          type: 'input' as const,
          label: '¿Cuál es tu WhatsApp?',
          placeholder: '+56912345678',
          icon: Phone,
          options: undefined
        }
      };

      const config = fieldConfigs[fieldName as keyof typeof fieldConfigs];
      if (!config) return null;

      // Manejo especial para campos opcionales
      if (fieldName === 'website') {
        return (
          <div key={fieldName} className="space-y-3">
            <FormField
              type={config.type}
              name={fieldName}
              label={config.label}
              placeholder={config.placeholder}
              value={formData[fieldName as keyof FormData] as string}
              onChange={onInputChange}
              onAIUsageUpdate={onAIUsageUpdate}
              sessionId={sessionId}
              icon={config.icon}
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="no-website"
                checked={noWebsite}
                onChange={(e) => setNoWebsite(e.target.checked)}
                className="w-4 h-4 rounded border-white/50 bg-white/20 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <label htmlFor="no-website" className="text-sm text-white font-medium cursor-pointer">
                No tengo sitio web actual
              </label>
            </div>
          </div>
        );
      }

      if (fieldName === 'instagram') {
        return (
          <div key={fieldName} className="space-y-3">
            <FormField
              type={config.type}
              name={fieldName}
              label={config.label}
              placeholder={config.placeholder}
              value={formData[fieldName as keyof FormData] as string}
              onChange={onInputChange}
              onAIUsageUpdate={onAIUsageUpdate}
              sessionId={sessionId}
              icon={config.icon}
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="no-instagram"
                checked={noInstagram}
                onChange={(e) => setNoInstagram(e.target.checked)}
                className="w-4 h-4 rounded border-white/50 bg-white/20 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <label htmlFor="no-instagram" className="text-sm text-white font-medium cursor-pointer">
                No tengo Instagram
              </label>
            </div>
          </div>
        );
      }

      return (
        <FormField
          key={fieldName}
          type={config.type}
          name={fieldName}
          label={config.label}
          placeholder={config.placeholder}
          value={formData[fieldName as keyof FormData] as string}
          onChange={onInputChange}
          onAIUsageUpdate={onAIUsageUpdate}
          sessionId={sessionId}
          icon={config.icon}
          options={config.options}
          showAIEnhance={fieldName === 'quien_eres' || fieldName === 'problemas' || fieldName === 'preguntas_frecuentes'}
          context={{ marca: formData.marca, estilo: formData.estilo }}
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Wizard de progreso */}
          <EnhancedFormWizard 
            currentStep={currentWizardStep}
            totalSteps={stepFields.length}
            stepLabels={stepLabels}
          />

          {/* Mensaje motivacional */}
          <MotivationalMessage step={currentWizardStep + 1} />

          {/* Formulario */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20">
            <CardContent className="p-8">
              <form onSubmit={e => e.preventDefault()} className="space-y-6">
                {renderCurrentStepFields()}

                {/* Navegación */}
                <div className="flex justify-between items-center pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={currentWizardStep === 0}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Anterior
                  </Button>

                  {currentWizardStep < stepFields.length - 1 ? (
                    <Button
                      type="button"
                      onClick={handleNextStep}
                      disabled={!isCurrentStepComplete()}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      Siguiente
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          type="button" 
                          className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-semibold px-8"
                          disabled={!isCurrentStepComplete()}
                        >
                          <Brain className="w-5 h-5 mr-2" />
                          Crear mi sitio web
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="max-w-md">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex items-center gap-2 text-blue-800">
                            <AlertTriangle className="w-5 h-5" />
                            ¿Listo para crear tu sitio web?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-left space-y-3">
                            <p className="font-medium text-gray-800">
                              Vas a generar tu sitio web para <strong>{formData.marca}</strong>
                            </p>
                            
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                              <p className="text-blue-800 mb-2">📧 <strong>Recibirás en:</strong></p>
                              <p className="text-blue-700 font-medium">{formData.email}</p>
                            </div>
                            <div className="space-y-1 text-sm text-gray-700">
                              <p>✅ Super Prompt (inmediato)</p>
                              <p>✅ Tu sitio web (en minutos)</p>
                            </div>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                           <AlertDialogAction onClick={handleConfirmedSubmit} className="bg-blue-600 hover:bg-blue-700">
                            Sí, crear sitio
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-slate-400 text-sm">
              <a href="mailto:esteban@crealoconia.com" className="hover:text-white transition-colors">
                📧 esteban@crealoconia.com
              </a>
              <a href="https://instagram.com/crealocon.ia" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                📱 @crealocon.ia
              </a>
              <span className="hover:text-white transition-colors cursor-pointer">
                🔒 Política de privacidad
              </span>
            </div>
            <div className="mt-4">
              <p className="text-slate-500 text-xs">
                Creado con ❤️ en <a href="https://crealoconia.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">crealoconia.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainForm;