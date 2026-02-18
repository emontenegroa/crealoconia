import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Sparkles, CheckCircle2, Maximize2, Minimize2, Lightbulb } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AIEnhanceButton from '@/components/AIEnhanceButton';
import QuestionHelpCard from '@/components/QuestionHelpCard';
import VoiceRecorder from '@/components/VoiceRecorder';
import { quizFormSchema, sanitizeText, sanitizeTextForSubmit } from '@/utils/formValidation';
import { useFormPersistence } from '@/hooks/useFormPersistence';
import { usePromptGeneration } from '@/hooks/usePromptGeneration';
import { useEmailHandling } from '@/hooks/useEmailHandling';

const Landing2 = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Obtener email y nombre de localStorage en lugar de URL
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const email = userData.email;
  const nombre = userData.nombre;
  
  // Integrar persistencia de formulario
  const { saveProgress, loadPreviousProgress, markAsCompleted } = useFormPersistence();
  const { generateSuperPrompt } = usePromptGeneration();
  const { sendEmailToAdmin, sendConfirmationEmail } = useEmailHandling();
  
  const [formData, setFormData] = useState({
    instagram: '',
    tieneInstagram: false,
    website: '',
    tieneWebsite: false,
    servicios: '',
    clientePerfil: '',
    problemaPrincipal: '',
    propuestaMetodo: '',
    resultados: '',
    estiloComunicacion: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [aiUsage, setAiUsage] = useState<Record<string, number>>({});
  const [progressRestored, setProgressRestored] = useState(false);
  const [expandedFields, setExpandedFields] = useState<Record<string, boolean>>({});
  const [showAITooltip, setShowAITooltip] = useState(true);

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

    // Mostrar tooltip de ayuda de IA al cargar
    const aiTooltipShown = localStorage.getItem('aiTooltipShown');
    if (!aiTooltipShown) {
      setTimeout(() => {
        toast({
          title: "💡 Tip: La IA puede ayudarte",
          description: "Escribe tus respuestas naturalmente y usa el botón 'IA te ayuda' para mejorar tu texto. Tienes 2 usos por pregunta.",
          duration: 8000,
        });
        localStorage.setItem('aiTooltipShown', 'true');
      }, 2000);
    }
  }, [email, nombre, navigate, toast]);

  // Cargar progreso previo del quiz si existe
  useEffect(() => {
    const restoreProgress = async () => {
      if (!email || progressRestored) return;
      
      try {
        console.log('🔍 Buscando progreso previo del quiz para:', email);
        const previousData = await loadPreviousProgress(email);
        
        if (previousData) {
          // Verificar si hay datos del quiz guardados
          const hasQuizData = 
            previousData.servicios || 
            previousData.clientePerfil || 
            previousData.problemaPrincipal || 
            previousData.propuestaMetodo || 
            previousData.resultados ||
            previousData.instagram ||
            previousData.website;
          
          if (hasQuizData) {
            console.log('✅ Progreso del quiz encontrado, restaurando...');
            setFormData({
              instagram: previousData.instagram || '',
              tieneInstagram: !!previousData.instagram,
              website: previousData.website || '',
              tieneWebsite: !!previousData.website,
              servicios: previousData.servicios || '',
              clientePerfil: previousData.clientePerfil || '',
              problemaPrincipal: previousData.problemaPrincipal || '',
              propuestaMetodo: previousData.propuestaMetodo || '',
              resultados: previousData.resultados || '',
              estiloComunicacion: previousData.estiloComunicacion || ''
            });
            setProgressRestored(true);
            
            toast({
              title: "Progreso restaurado",
              description: "Hemos recuperado tus respuestas anteriores del quiz.",
              duration: 5000,
            });
          }
        }
      } catch (error) {
        console.error('Error al cargar progreso previo:', error);
      }
    };
    
    restoreProgress();
  }, [email, progressRestored, loadPreviousProgress, toast]);

  // Auto-guardar progreso cada 30 segundos en el backend
  useEffect(() => {
    if (!email) return;
    
    const interval = setInterval(() => {
      const textFields = [
        formData.servicios,
        formData.clientePerfil,
        formData.problemaPrincipal,
        formData.propuestaMetodo
      ];
      const hasData = textFields.some(value => value.trim() !== '');
      if (hasData || formData.instagram || formData.website || formData.estiloComunicacion) {
        // Recuperar WhatsApp de localStorage para incluirlo en el auto-save
        const initialData = JSON.parse(localStorage.getItem('userData') || '{}');
        
        const completeFormData = {
          marca: nombre || '',
          email: email,
          quien_eres: formData.servicios || '',
          problemas: formData.problemaPrincipal || '',
          preguntas_frecuentes: formData.clientePerfil || '',
          estilo: formData.estiloComunicacion || 'Profesional',
          producto: formData.propuestaMetodo || '',
          whatsapp: initialData.telefono || '', // ✅ Incluir WhatsApp desde localStorage
          website: formData.website || '',
          instagram: formData.instagram || ''
        };
        saveProgress(completeFormData as any);
        console.log('💾 Progreso guardado automáticamente en backend');
      }
    }, 30000); // 30 segundos

    return () => clearInterval(interval);
  }, [formData, email, nombre, saveProgress]);

  const questions = [
    {
      name: 'servicios',
      label: '¿Quién eres y qué te apasiona de tu trabajo? ¿A quién ayudas? (Sé específico)',
      placeholder: 'Ej: Soy Carolina, coach de vida certificada con 8 años de experiencia. Me apasiona acompañar a mujeres emprendedoras de 30-45 años que buscan reconectar con su propósito...',
      helper: 'Describe quién eres, qué te apasiona y a quién ayudas específicamente.',
      checklist: [
        'Tu profesión o especialidad',
        'Qué te apasiona genuinamente de tu trabajo',
        'Perfil exacto de tu cliente ideal (edad, situación, necesidades)',
        'Qué transformación o resultado buscas crear'
      ]
    },
    {
      name: 'problemaPrincipal',
      label: '¿Qué problema específico vives día a día con tus clientes y cómo los ayudas a solucionarlo?',
      placeholder: 'Ej: Mis clientas llegan sintiéndose bloqueadas emocionalmente, con miedo al fracaso y síndrome del impostor. Yo las ayudo con un proceso de autoconocimiento profundo usando técnicas de PNL...',
      helper: 'Describe el problema real que resuelves y tu método o enfoque para solucionarlo.',
      checklist: [
        'El problema emocional o práctico que enfrentan',
        'Cómo ese problema afecta su vida diaria',
        'Tu método o proceso específico para ayudarlos',
        'Qué hace diferente tu enfoque'
      ]
    },
    {
      name: 'clientePerfil',
      label: '¿Qué te preguntan siempre tus clientes o qué disfrutas explicar una y otra vez?',
      placeholder: 'Ej: Me preguntan constantemente si es posible cambiar de vida después de los 40 años cuando ya tienes responsabilidades. Me encanta mostrarles que siempre es posible...',
      helper: 'Estas preguntas frecuentes revelan las dudas y miedos de tu audiencia.',
      checklist: [
        'Preguntas sobre viabilidad ("¿Es posible que yo...?")',
        'Dudas sobre el proceso ("¿Cómo funciona?")',
        'Preguntas sobre tiempo/inversión ("¿Cuánto toma?")',
        'Objeciones comunes ("¿Y si no me resulta?")'
      ]
    },
    {
      name: 'propuestaMetodo',
      label: '¿Cuál es tu producto o servicio principal que quieres vender más? (Describe beneficios específicos)',
      placeholder: 'Ej: Mi programa \'Renace\', un proceso de coaching de 8 semanas que incluye sesiones individuales, workbook personalizado y comunidad privada. Está diseñado para mujeres que quieren cambios profundos en 90 días...',
      helper: 'Describe tu oferta estrella con todos los detalles que la hacen valiosa.',
      checklist: [
        'Nombre del producto/servicio',
        'Qué incluye específicamente (componentes, entregas)',
        'Duración, formato y modalidad',
        'Beneficios concretos y resultado esperado',
        'Qué lo hace único o especial'
      ]
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
      estiloComunicacion: formData.estiloComunicacion
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
    const textFields = [
      formData.servicios,
      formData.clientePerfil,
      formData.problemaPrincipal,
      formData.propuestaMetodo
    ];
    
    // Campos obligatorios adicionales
    const requiredCount = 4 + (formData.estiloComunicacion ? 1 : 0);
    
    // Campos opcionales: solo cuentan si tieneInstagram o tieneWebsite está marcado
    if (formData.tieneInstagram) textFields.push(formData.instagram);
    if (formData.tieneWebsite) textFields.push(formData.website);
    
    const totalRequired = requiredCount + (formData.tieneInstagram ? 1 : 0) + (formData.tieneWebsite ? 1 : 0);
    const completed = textFields.filter(value => typeof value === 'string' && value.trim().length >= 10).length + (formData.estiloComunicacion ? 1 : 0);
    const quizProgress = (completed / totalRequired) * 40; // 40% del rango total
    return 60 + quizProgress; // Base de 60% + hasta 40% = máximo 100%
  };

  const isFormComplete = () => {
    // Validar campos obligatorios
    const requiredFields = [
      formData.servicios,
      formData.clientePerfil,
      formData.problemaPrincipal,
      formData.propuestaMetodo
    ];
    
    const requiredComplete = requiredFields.every(value => 
      typeof value === 'string' && value.trim().length >= 10
    );
    
    // Validar campo select obligatorio
    if (!formData.estiloComunicacion) return false;
    
    // Validar campos condicionales
    if (formData.tieneInstagram && formData.instagram.trim().length < 3) return false;
    if (formData.tieneWebsite && formData.website.trim().length < 10) return false;
    
    return requiredComplete;
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
      // Recuperar datos iniciales de Landing1
      const initialData = JSON.parse(localStorage.getItem('userData') || '{}');
      
      // Construir datos completos incluyendo el WhatsApp de Landing1
      const completeFormData = {
        marca: nombre || '',
        email: email || '',
        quien_eres: formData.servicios || '',
        problemas: formData.problemaPrincipal || '',
        preguntas_frecuentes: formData.clientePerfil || '',
        estilo: formData.estiloComunicacion || 'Profesional',
        producto: formData.propuestaMetodo || '',
        whatsapp: initialData.telefono || '', // 🔥 CRÍTICO: WhatsApp viene de Landing1
        website: formData.website || '',
        instagram: formData.instagram || ''
      };
      
      // Generar prompts
      console.log('🤖 Generando prompts...');
      const prompts = await generateSuperPrompt(completeFormData as any);
      console.log('✅ Prompts generados:', {
        hasSuperPrompt: !!prompts?.superPrompt,
        hasLovablePrompt: !!prompts?.lovablePrompt,
        superPromptLength: prompts?.superPrompt?.length || 0,
        lovablePromptLength: prompts?.lovablePrompt?.length || 0
      });
      
      // Agregar prompts a los datos completos
      const dataWithPrompts = {
        ...completeFormData,
        generatedPrompts: prompts
      };
      
      console.log('💾 Guardando en backend con prompts incluidos...');
      console.log('📊 Datos a guardar:', {
        email: dataWithPrompts.email,
        marca: dataWithPrompts.marca,
        whatsapp: dataWithPrompts.whatsapp,
        website: dataWithPrompts.website,
        instagram: dataWithPrompts.instagram,
        hasSuperPrompt: !!dataWithPrompts.generatedPrompts?.superPrompt,
        hasLovablePrompt: !!dataWithPrompts.generatedPrompts?.lovablePrompt
      });
      
      // Marcar como completado en backend (incluye AMBOS prompts)
      await markAsCompleted(dataWithPrompts as any);
      console.log('✅ Registro completado guardado en backend con AMBOS prompts');
      
      // Guardar en localStorage para Landing3
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const completeData = {
        ...userData,
        ...formData,
        whatsapp: initialData.telefono || '',
        generatedPrompts: prompts,
        completedAt: new Date().toISOString()
      };
      localStorage.setItem('userData', JSON.stringify(completeData));
      
      // Enviar emails (incluye Super Prompt en email de confirmación)
      console.log('📧 Enviando emails...');
      console.log('📧 Email admin con datos:', {
        email: dataWithPrompts.email,
        marca: dataWithPrompts.marca,
        whatsapp: dataWithPrompts.whatsapp
      });
      console.log('📧 Email confirmación incluye Super Prompt:', !!dataWithPrompts.generatedPrompts?.superPrompt);
      
      await Promise.all([
        sendEmailToAdmin(dataWithPrompts as any),
        sendConfirmationEmail(dataWithPrompts as any)
      ]);
      console.log('✅ Emails enviados exitosamente');
      
      toast({
        title: "¡Perfecto!",
        description: "Revisa tu correo para ver tus prompts personalizados",
      });
      
      navigate('/gracias');
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
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="relative z-20 border-b border-border/50">
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">Crealoconia.com</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <p className="text-muted-foreground text-sm md:text-base">Paso 2 de 3</p>
            <p className="text-muted-foreground text-sm md:text-base">{Math.round(progress)}% completado</p>
          </div>
          <Progress value={progress} className="h-2" />
          {nombre && (
            <p className="text-muted-foreground mt-4 text-base md:text-lg">
              Hola, <span className="font-semibold text-foreground">{nombre}</span>, casi estamos
            </p>
          )}
        </div>

        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            Tu asistente de contenido está a 5 minutos
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            Responde con tus propias palabras. La IA te ayudará a perfeccionar cada respuesta.
          </p>
          
          {/* Tooltip de ayuda de IA */}
          {showAITooltip && (
            <div className="max-w-2xl mx-auto bg-primary/10 border border-primary/20 rounded-lg p-4 backdrop-blur-sm animate-in fade-in slide-in-from-top-3 duration-500">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-foreground font-semibold text-sm mb-1">
                    💡 Escribe natural, mejora con IA
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Completa cada pregunta con tus palabras. Luego usa el botón <span className="font-semibold text-primary">"IA te ayuda"</span> para optimizar tu texto profesionalmente. Tienes 2 mejoras por pregunta.
                  </p>
                </div>
                <button
                  onClick={() => setShowAITooltip(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="animated-border-wrapper mb-8 md:mb-12">
          <div className="bg-card rounded-[calc(1rem-2px)] p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
              ✨ Lo que recibirás al completar este formulario
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-start gap-2 bg-secondary rounded-lg p-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">Construimos el ejemplo de tu sitio web profesional con IA</span>
              </div>
              <div className="flex items-start gap-2 bg-secondary rounded-lg p-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">Te lo mostramos antes de que decidas comprar</span>
              </div>
              <div className="flex items-start gap-2 bg-secondary rounded-lg p-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">Si te gusta, lo publicas. Si no, no pagas nada</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-8 md:mb-12">
          <p className="text-muted-foreground italic text-sm md:text-base max-w-2xl mx-auto">
            💬 Escribe con tus palabras, la IA te ayudará a pulir cada respuesta
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* CAMPOS DE INSTAGRAM Y WEBSITE AL INICIO */}
            <div className="space-y-6 pb-6 border-b border-border">
              <h3 className="text-foreground text-lg font-bold">Información de contacto y redes</h3>
              
              {/* Instagram */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="tieneInstagram"
                    checked={formData.tieneInstagram}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      tieneInstagram: e.target.checked,
                      instagram: e.target.checked ? prev.instagram : ''
                    }))}
                    className="w-4 h-4 accent-primary"
                  />
                  <Label htmlFor="tieneInstagram" className="text-foreground text-base cursor-pointer">
                    Tengo Instagram
                  </Label>
                </div>
                {formData.tieneInstagram && (
                  <div>
                    <Label htmlFor="instagram" className="text-muted-foreground text-sm mb-2 block">
                      Usuario de Instagram (sin @)
                    </Label>
                    <input
                      type="text"
                      id="instagram"
                      placeholder="tuusuario"
                      value={formData.instagram}
                      onChange={(e) => handleInputChange('instagram', e.target.value)}
                      className="w-full bg-secondary border border-border text-foreground placeholder:text-muted-foreground px-4 py-2 rounded-md focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      disabled={isSubmitting}
                    />
                  </div>
                )}
              </div>

              {/* Website */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="tieneWebsite"
                    checked={formData.tieneWebsite}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      tieneWebsite: e.target.checked,
                      website: e.target.checked ? prev.website : ''
                    }))}
                    className="w-4 h-4 accent-primary"
                  />
                  <Label htmlFor="tieneWebsite" className="text-foreground text-base cursor-pointer">
                    Tengo sitio web
                  </Label>
                </div>
                {formData.tieneWebsite && (
                  <div>
                    <Label htmlFor="website" className="text-muted-foreground text-sm mb-2 block">
                      URL de tu sitio web
                    </Label>
                    <input
                      type="url"
                      id="website"
                      placeholder="https://tusitio.com"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full bg-secondary border border-border text-foreground placeholder:text-muted-foreground px-4 py-2 rounded-md focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      disabled={isSubmitting}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* PREGUNTAS DEL QUIZ (Preguntas 6-9) */}
            {questions.map((question, index) => {
              const fieldValue = formData[question.name as keyof typeof formData];
              const stringValue = typeof fieldValue === 'string' ? fieldValue : '';
              
              const handleVoiceTranscription = (transcribedText: string) => {
                const newValue = stringValue ? `${stringValue} ${transcribedText}` : transcribedText;
                handleInputChange(question.name, newValue);
              };
              
              return (
                <div key={question.name} className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <Label htmlFor={question.name} className="text-foreground text-base md:text-lg font-bold block">
                      {index + 6}. {question.label}
                    </Label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setExpandedFields(prev => ({ ...prev, [question.name]: !prev[question.name] }))}
                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                        title={expandedFields[question.name] ? "Contraer" : "Expandir"}
                      >
                        {expandedFields[question.name] ? (
                          <Minimize2 className="w-4 h-4" />
                        ) : (
                          <Maximize2 className="w-4 h-4" />
                        )}
                      </button>
                      <AIEnhanceButton
                        currentText={stringValue}
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
                  </div>
                  
                  {/* Prominent Voice Recorder - above textarea */}
                  <div className="mt-2 mb-3">
                    <VoiceRecorder 
                      onTranscription={handleVoiceTranscription}
                      prominent={true}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <Textarea
                    id={question.name}
                    placeholder={question.placeholder}
                    value={stringValue}
                    onChange={(e) => handleInputChange(question.name, e.target.value)}
                    onFocus={() => setFocusedField(question.name)}
                    onBlur={() => setFocusedField(null)}
                    className={`bg-secondary border-border text-foreground placeholder:text-muted-foreground text-base transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                      expandedFields[question.name] ? 'min-h-[300px]' : 'min-h-[120px]'
                    }`}
                    disabled={isSubmitting}
                    maxLength={2000}
                    showCounter={true}
                  />
                  <QuestionHelpCard 
                    checklist={question.checklist}
                    helper={question.helper}
                    isVisible={focusedField === question.name}
                  />
                  {errors[question.name] && (
                    <p className="text-destructive text-sm mt-2">{errors[question.name]}</p>
                  )}
                </div>
              );
            })}

            {/* Pregunta 10: Estilo de comunicación */}
            <div className="space-y-4">
              <Label htmlFor="estiloComunicacion" className="text-foreground text-base md:text-lg font-bold block">
                10. ¿Cómo te gusta comunicarte en redes sociales?
              </Label>
              <Select 
                value={formData.estiloComunicacion || ''} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, estiloComunicacion: value }))}
                onOpenChange={(open) => setFocusedField(open ? 'estiloComunicacion' : null)}
              >
                <SelectTrigger className="bg-secondary border-border text-foreground">
                  <SelectValue placeholder="Selecciona tu estilo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="profesional">Profesional y corporativo</SelectItem>
                  <SelectItem value="cercano">Cercano y conversacional</SelectItem>
                  <SelectItem value="inspiracional">Inspiracional y motivador</SelectItem>
                  <SelectItem value="educativo">Educativo e informativo</SelectItem>
                  <SelectItem value="directo">Directo al grano</SelectItem>
                  <SelectItem value="creativo">Creativo y original</SelectItem>
                </SelectContent>
              </Select>
              {focusedField === 'estiloComunicacion' && (
                <p className="text-sm text-primary/90 mt-2 animate-in fade-in slide-in-from-top-1 duration-200 flex items-start gap-2">
                  <span className="text-base">💡</span>
                  <span>Elige el tono que mejor refleje tu personalidad y la forma en que te conectas con tu audiencia.</span>
                </p>
              )}
            </div>

            {!isFormComplete() && (
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6">
                <p className="text-primary text-sm text-center">
                  💡 Completa todas las preguntas (cada respuesta con al menos 10 caracteres) y selecciona tu estilo de comunicación para continuar
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full sm:w-auto border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                disabled={isSubmitting}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver atrás
              </Button>
              
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-full text-base md:text-lg transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting || !isFormComplete()}
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Creando tu sitio web...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Ver cómo quedaría mi sitio web
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        <footer className="text-center text-muted-foreground text-sm space-y-2 pt-8 border-t border-border">
          <div className="flex justify-center gap-4 mb-2">
            <a href="#" className="hover:text-foreground transition-colors">Privacidad</a>
            <span>|</span>
            <a href="#" className="hover:text-foreground transition-colors">Términos</a>
            <span>|</span>
            <a href="#" className="hover:text-foreground transition-colors">Contacto</a>
          </div>
          <p>contacto@crealoconia.com</p>
        </footer>
      </div>
    </div>
  );
};

export default Landing2;
