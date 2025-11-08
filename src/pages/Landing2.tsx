import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FormWizard from "@/components/FormWizard";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Landing2 = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    servicios: '',
    clientePerfil: '',
    problemaPrincipal: '',
    propuestaMetodo: '',
    resultados: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('form_submissions')
        .insert([{
          email: 'pending@email.com',
          form_data: {
            servicios: formData.servicios,
            clientePerfil: formData.clientePerfil,
            problemaPrincipal: formData.problemaPrincipal,
            propuestaMetodo: formData.propuestaMetodo,
            resultados: formData.resultados,
            landing_type: 'landing2_5questions'
          }
        }]);

      if (error) throw error;

      toast({
        title: "¡Excelente!",
        description: "Tu asistente está siendo generado",
      });

      // Redirect to landing 3
      window.location.href = '/landing3';
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Hubo un problema. Intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
              <label className="text-base font-medium text-foreground">{currentQuestion.label}</label>
              <textarea
                value={formData[currentQuestion.name as keyof typeof formData]}
                onChange={(e) => handleInputChange(currentQuestion.name, e.target.value)}
                placeholder={currentQuestion.placeholder}
                className="w-full min-h-[150px] px-4 py-3 rounded-md border border-border bg-background text-foreground resize-y"
                required
              />
            </div>

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
