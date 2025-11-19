import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AIEnhanceButton from '@/components/AIEnhanceButton';
import { quizFormSchema, sanitizeText, sanitizeTextForSubmit } from '@/utils/formValidation';

const Landing2 = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const nombre = searchParams.get('nombre');
  
  const [formData, setFormData] = useState({
    servicios: '',
    clientePerfil: '',
    problemaPrincipal: '',
    propuestaMetodo: '',
    resultados: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [aiUsage, setAiUsage] = useState<Record<string, number>>({});

  const handleAIUsageUpdate = (fieldName: string, count: number) => {
    setAiUsage(prev => ({ ...prev, [fieldName]: count }));
  };

  useEffect(() => {
    // Scroll al inicio cuando se carga la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (!email || !nombre) {
      toast({
        title: "Error",
        description: "Por favor completa primero el formulario inicial.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [email, nombre, navigate, toast]);

  const questions = [
    {
      name: 'servicios',
      label: '¿Qué servicios ofreces?',
      placeholder: 'Ej: Sesiones de coaching, diseño gráfico, asesorías legales, etc.'
    },
    {
      name: 'clientePerfil',
      label: '¿A quién ayudas específicamente? (perfil del cliente)',
      placeholder: 'Ej: Mujeres emprendedoras, pequeños negocios, profesionales en transición, etc.'
    },
    {
      name: 'problemaPrincipal',
      label: '¿Qué problema o necesidad principal resuelves?',
      placeholder: 'Ej: Falta de presencia online, miedo a hablar en público, desorganización administrativa, etc.'
    },
    {
      name: 'propuestaMetodo',
      label: '¿Cuál es tu propuesta o método para resolverlo?',
      placeholder: 'Ej: Metodología única, enfoque holístico, paso a paso, etc.'
    },
    {
      name: 'resultados',
      label: '¿Qué resultados obtienen tus clientes después de trabajar contigo?',
      placeholder: 'Ej: Más confianza, mejor comunicación, aumento de ventas, claridad de propósito, etc.'
    }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Sanitizar datos antes de validar
    const sanitizedData = {
      servicios: sanitizeTextForSubmit(formData.servicios),
      clientePerfil: sanitizeTextForSubmit(formData.clientePerfil),
      problemaPrincipal: sanitizeTextForSubmit(formData.problemaPrincipal),
      propuestaMetodo: sanitizeTextForSubmit(formData.propuestaMetodo),
      resultados: sanitizeTextForSubmit(formData.resultados)
    };
    
    // Validar con zod schema
    const result = quizFormSchema.safeParse(sanitizedData);
    
    if (!result.success) {
      result.error.errors.forEach(error => {
        const fieldName = error.path[0] as string;
        newErrors[fieldName] = error.message;
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name: string, value: string) => {
    // Sanitizar solo caracteres peligrosos, sin trim
    const sanitizedValue = sanitizeText(value);
    setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const calculateProgress = () => {
    // Paso 2 de 3: empieza en 60% (paso 1 completado) y termina en 100%
    const completed = Object.values(formData).filter(value => value.trim().length >= 10).length;
    const quizProgress = (completed / questions.length) * 40; // 40% del rango total
    return 60 + quizProgress; // Base de 60% + hasta 40% = máximo 100%
  };

  const isFormComplete = () => {
    return Object.values(formData).every(value => value.trim().length >= 10);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Completa todas las preguntas",
        description: "Cada respuesta debe tener al menos 10 caracteres",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const completeData = {
        ...userData,
        ...formData,
        completedAt: new Date().toISOString()
      };
      localStorage.setItem('userData', JSON.stringify(completeData));
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "¡Perfecto!",
        description: "Tu asistente está siendo generado...",
      });
      
      navigate(`/gracias?email=${encodeURIComponent(email || '')}`);
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

  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-300 text-sm md:text-base">Paso 2 de 3</p>
            <p className="text-slate-300 text-sm md:text-base">{Math.round(progress)}% completado</p>
          </div>
          <Progress value={progress} className="h-2" />
          {nombre && (
            <p className="text-slate-300 mt-4 text-base md:text-lg">
              Hola, <span className="font-semibold text-white">{nombre}</span>, casi estamos
            </p>
          )}
        </div>

        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Tu asistente de contenido está a 5 minutos de distancia
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto">
            Completa estas 5 preguntas para que la IA entienda tu negocio y diseñe tu mensaje de marca listo para atraer clientes.
          </p>
        </div>

        <Card className="bg-blue-500/10 border-blue-500/30 backdrop-blur p-6 md:p-8 mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Por qué es importante</h2>
          <p className="text-slate-300 mb-4">
            Mientras más claras sean tus respuestas, más preciso será el asistente que recibirás. Este asistente te ayudará a:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300">Crear publicaciones para redes sociales</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300">Escribir guiones para videos</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300">Diseñar mensajes persuasivos para atraer clientes</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300">Construir una comunicación clara y profesional</span>
            </li>
          </ul>
        </Card>

        <p className="text-center text-slate-300 italic mb-8 md:mb-12 text-sm md:text-base">
          Tómate un momento y respóndelas con calma. Este paso es clave para crear tu identidad y mensaje.
        </p>

        <Card className="bg-slate-800/80 border-slate-700 backdrop-blur p-6 md:p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {questions.map((question, index) => (
              <div key={question.name} className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor={question.name} className="text-white text-base md:text-lg font-bold block">
                    {index + 1}. {question.label}
                  </Label>
                  <AIEnhanceButton
                    currentText={formData[question.name as keyof typeof formData]}
                    fieldType={question.name}
                    context={{
                      marca: nombre || '',
                      estilo: 'Profesional'
                    }}
                    onEnhanced={(enhancedText) => handleInputChange(question.name, enhancedText)}
                    sessionId={sessionId}
                    onUsageUpdate={handleAIUsageUpdate}
                  />
                </div>
                <Textarea
                  id={question.name}
                  placeholder={question.placeholder}
                  value={formData[question.name as keyof typeof formData]}
                  onChange={(e) => handleInputChange(question.name, e.target.value)}
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400 min-h-[120px] text-base"
                  disabled={isSubmitting}
                  maxLength={2000}
                  showCounter={true}
                />
                {errors[question.name] && (
                  <p className="text-red-400 text-sm">{errors[question.name]}</p>
                )}
              </div>
            ))}

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full sm:w-auto border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
                disabled={isSubmitting}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver atrás
              </Button>
              
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-6 rounded-full text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                disabled={isSubmitting || !isFormComplete()}
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Generando tu asistente personalizado...
                  </>
                ) : (
                  "Generar mi Asistente con IA"
                )}
              </Button>
            </div>
          </form>
        </Card>

        <footer className="text-center text-slate-400 text-sm space-y-2 pt-8 border-t border-slate-700">
          <div className="flex justify-center gap-4 mb-2">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Contacto</a>
          </div>
          <p>contacto@crealoconia.com</p>
        </footer>
      </div>
    </div>
  );
};

export default Landing2;
