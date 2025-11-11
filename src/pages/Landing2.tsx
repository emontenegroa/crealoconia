import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FormWizard from "@/components/FormWizard";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AIEnhanceButton from "@/components/AIEnhanceButton";

const Landing2 = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    servicios: '',
    clientePerfil: '',
    problemaPrincipal: '',
    propuestaMetodo: '',
    resultados: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [aiUsageTracking, setAiUsageTracking] = useState<Record<string, number>>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    if (!email) {
      toast({
        title: "Error",
        description: "No se encontró tu email. Por favor completa el formulario inicial.",
        variant: "destructive"
      });
      navigate('/landing1');
    }
  }, [email, navigate, toast]);

  const stepLabels = [
    'Servicios',
    'Cliente Ideal',
    'Problema',
    'Solución',
    'Resultados'
  ];

  const questions = [
    {
      name: 'servicios',
      label: '¿Qué servicios ofreces?',
      placeholder: 'Describe los servicios que ofreces...'
    },
    {
      name: 'clientePerfil',
      label: '¿A quién ayudas específicamente? (perfil del cliente)',
      placeholder: 'Describe a tu cliente ideal...'
    },
    {
      name: 'problemaPrincipal',
      label: '¿Qué problema o necesidad principal resuelves?',
      placeholder: 'Describe el problema que resuelves...'
    },
    {
      name: 'propuestaMetodo',
      label: '¿Cuál es tu propuesta o método para resolverlo?',
      placeholder: 'Describe tu metodología o enfoque...'
    },
    {
      name: 'resultados',
      label: '¿Qué resultados obtienen tus clientes después de trabajar contigo?',
      placeholder: 'Describe los resultados que logran tus clientes...'
    }
  ];

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isCurrentStepComplete = () => {
    const currentQuestion = questions[currentStep];
    const value = formData[currentQuestion.name as keyof typeof formData];
    return value.trim() !== '';
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isCurrentStepComplete()) {
      toast({
        title: "Campo requerido",
        description: "Por favor completa la pregunta actual",
        variant: "destructive"
      });
      return;
    }

    if (!acceptedTerms) {
      toast({
        title: "Términos y condiciones",
        description: "Debes aceptar los términos y condiciones para continuar",
        variant: "destructive"
      });
      return;
    }

    if (!email) return;

    setIsSubmitting(true);
    try {
      console.log('🚀 Intentando guardar formulario para:', email);
      console.log('📝 Datos del formulario:', formData);

      // Primero buscar si existe un registro incompleto
      const { data: existingSubmission, error: fetchError } = await supabase
        .from('form_submissions')
        .select('*')
        .eq('email', email)
        .eq('completed', false)
        .maybeSingle();

      if (fetchError) {
        console.error('❌ Error buscando registro:', fetchError);
        throw fetchError;
      }

      console.log('🔍 Registro encontrado:', existingSubmission);

      if (existingSubmission) {
        // Actualizar registro existente
        const { data: updateData, error: updateError } = await supabase
          .from('form_submissions')
          .update({
            form_data: {
              ...(existingSubmission.form_data as Record<string, any> || {}),
              servicios: formData.servicios,
              clientePerfil: formData.clientePerfil,
              problemaPrincipal: formData.problemaPrincipal,
              propuestaMetodo: formData.propuestaMetodo,
              resultados: formData.resultados,
              landing_type: 'landing2_5questions'
            },
            completed: true,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingSubmission.id)
          .select();

        if (updateError) {
          console.error('❌ Error actualizando:', updateError);
          throw updateError;
        }

        console.log('✅ Registro actualizado exitosamente:', updateData);
      } else {
        // Si no existe registro incompleto, crear uno nuevo
        console.log('⚠️ No se encontró registro incompleto, creando uno nuevo');
        const { data: insertData, error: insertError } = await supabase
          .from('form_submissions')
          .insert({
            email: email,
            form_data: {
              servicios: formData.servicios,
              clientePerfil: formData.clientePerfil,
              problemaPrincipal: formData.problemaPrincipal,
              propuestaMetodo: formData.propuestaMetodo,
              resultados: formData.resultados,
              landing_type: 'landing2_5questions'
            },
            completed: true
          })
          .select();

        if (insertError) {
          console.error('❌ Error insertando:', insertError);
          throw insertError;
        }

        console.log('✅ Registro creado exitosamente:', insertData);
      }

      toast({
        title: "¡Excelente!",
        description: "Tu asistente está siendo generado",
      });

      // Redirect to landing 3
      navigate('/landing3');
    } catch (error) {
      console.error('❌ Error general:', error);
      toast({
        title: "Error",
        description: "Hubo un problema. Intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleAIEnhanced = (fieldName: string, enhancedText: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: enhancedText }));
  };

  const handleAIUsageUpdate = (fieldName: string, count: number) => {
    setAiUsageTracking(prev => ({ ...prev, [fieldName]: count }));
  };

  const currentQuestion = questions[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-background">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Tu Asistente de Contenido Está a 5 Minutos de Distancia
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Completa estas 5 preguntas para que la IA entienda tu negocio y diseñe tu mensaje de marca 
            listo para atraer clientes.
          </p>
        </div>

        {/* Por qué es importante */}
        <Card className="mb-8 p-6 bg-card/80 backdrop-blur">
          <h2 className="text-xl font-bold text-foreground mb-3">Por qué es importante</h2>
          <p className="text-foreground/80 mb-4">
            Mientras más claras sean tus respuestas, más preciso será el asistente que recibirás. 
            Este asistente te ayudará a:
          </p>
          <ul className="space-y-2 text-foreground/80">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              Crear publicaciones para redes sociales
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              Escribir guiones para videos
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              Diseñar mensajes persuasivos para atraer clientes
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              Construir una comunicación clara y profesional
            </li>
          </ul>
        </Card>

        {/* Indicación previa */}
        <div className="text-center mb-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-foreground font-medium">
            Tómate un momento y respóndelas con calma. Este paso es clave para crear tu identidad y mensaje.
          </p>
        </div>

        {/* Wizard */}
        <FormWizard
          currentStep={currentStep}
          totalSteps={questions.length}
          stepLabels={stepLabels}
        />

        {/* Formulario */}
        <Card className="p-8 bg-card/90 backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <label className="text-base font-medium text-foreground flex-1">{currentQuestion.label}</label>
                <AIEnhanceButton
                  currentText={formData[currentQuestion.name as keyof typeof formData]}
                  fieldType={currentQuestion.name}
                  context={{
                    marca: email || '',
                    estilo: 'profesional'
                  }}
                  onEnhanced={(enhancedText) => handleAIEnhanced(currentQuestion.name, enhancedText)}
                  sessionId={sessionId}
                  onUsageUpdate={handleAIUsageUpdate}
                />
              </div>
              <textarea
                value={formData[currentQuestion.name as keyof typeof formData]}
                onChange={(e) => handleInputChange(currentQuestion.name, e.target.value)}
                placeholder={currentQuestion.placeholder}
                className="w-full min-h-[150px] px-4 py-3 rounded-md border border-border bg-background text-foreground resize-y"
                required
              />
            </div>

            {/* Términos y condiciones - solo en el último paso */}
            {currentStep === questions.length - 1 && (
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <label htmlFor="terms" className="text-sm text-foreground/80">
                    Acepto los{' '}
                    <a
                      href="/Terminos_y_Condiciones_CrealoconIA.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      términos y condiciones
                    </a>{' '}
                    del servicio de CrealoconIA.com
                  </label>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="bg-card border-border text-foreground hover:bg-card/80"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>

              {currentStep < questions.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isCurrentStepComplete()}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Siguiente
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!isCurrentStepComplete() || isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isSubmitting ? 'Generando...' : 'Generar mi Asistente con IA'}
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Landing2;
