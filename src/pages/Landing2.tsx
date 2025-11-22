import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Sparkles, CheckCircle2, Maximize2, Minimize2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AIEnhanceButton from '@/components/AIEnhanceButton';
import { quizFormSchema, sanitizeText, sanitizeTextForSubmit } from '@/utils/formValidation';
import { useFormPersistence } from '@/hooks/useFormPersistence';
import { usePromptGeneration } from '@/hooks/usePromptGeneration';
import { useEmailHandling } from '@/hooks/useEmailHandling';

const Landing2 = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const nombre = searchParams.get('nombre');
  
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
        const completeFormData = {
          marca: nombre || '',
          email: email,
          quien_eres: formData.servicios || '',
          problemas: formData.problemaPrincipal || '',
          preguntas_frecuentes: formData.clientePerfil || '',
          estilo: formData.estiloComunicacion || 'Profesional',
          producto: formData.propuestaMetodo || '',
          whatsapp: '',
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
      label: '¿Quién eres y qué te apasiona de tu trabajo? ¿A quién ayudas?',
      placeholder: 'Ej: Soy coach de vida y me apasiona ayudar a personas que se sienten estancadas...',
      helper: 'Describe tu rol, tu pasión y el tipo de personas que transformas. Piensa en qué te hace diferente y por qué amas lo que haces.'
    },
    {
      name: 'clientePerfil',
      label: '¿Qué problema específico vives día a día con tus clientes?',
      placeholder: 'Ej: Mis clientes llegan sin claridad sobre sus metas y les cuesta dar el primer paso...',
      helper: 'Explica el desafío principal que tus clientes enfrentan antes de trabajar contigo. Sé específico y emocional.'
    },
    {
      name: 'problemaPrincipal',
      label: '¿Qué te preguntan siempre tus clientes?',
      placeholder: 'Ej: "¿Cómo puedo encontrar mi propósito?" o "¿Por dónde empiezo?"...',
      helper: 'Comparte las 2-3 preguntas más frecuentes que recibes. Estas revelan las inquietudes reales de tu audiencia.'
    },
    {
      name: 'propuestaMetodo',
      label: '¿Cuál es tu producto o servicio principal?',
      placeholder: 'Ej: Ofrezco sesiones de coaching 1:1 personalizadas y un programa grupal de 8 semanas...',
      helper: 'Describe tu oferta principal: qué incluye, cómo funciona y qué resultados promete. Sé claro y conciso.'
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
            Completa estas preguntas para que la IA entienda tu negocio y diseñe tu mensaje de marca listo para atraer clientes.
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
            {/* CAMPOS DE INSTAGRAM Y WEBSITE AL INICIO */}
            <div className="space-y-6 pb-6 border-b border-slate-600">
              <h3 className="text-white text-lg font-bold">Información de contacto y redes</h3>
              
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
                    className="w-4 h-4 accent-purple-600"
                  />
                  <Label htmlFor="tieneInstagram" className="text-white text-base cursor-pointer">
                    Tengo Instagram
                  </Label>
                </div>
                {formData.tieneInstagram && (
                  <div>
                    <Label htmlFor="instagram" className="text-slate-300 text-sm mb-2 block">
                      Usuario de Instagram (sin @)
                    </Label>
                    <input
                      type="text"
                      id="instagram"
                      placeholder="tuusuario"
                      value={formData.instagram}
                      onChange={(e) => handleInputChange('instagram', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 text-white placeholder:text-slate-400 px-4 py-2 rounded-md"
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
                    className="w-4 h-4 accent-purple-600"
                  />
                  <Label htmlFor="tieneWebsite" className="text-white text-base cursor-pointer">
                    Tengo sitio web
                  </Label>
                </div>
                {formData.tieneWebsite && (
                  <div>
                    <Label htmlFor="website" className="text-slate-300 text-sm mb-2 block">
                      URL de tu sitio web
                    </Label>
                    <input
                      type="url"
                      id="website"
                      placeholder="https://tusitio.com"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-600 text-white placeholder:text-slate-400 px-4 py-2 rounded-md"
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
              
              return (
                <div key={question.name} className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <Label htmlFor={question.name} className="text-white text-base md:text-lg font-bold block">
                      {index + 6}. {question.label}
                    </Label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setExpandedFields(prev => ({ ...prev, [question.name]: !prev[question.name] }))}
                        className="text-slate-400 hover:text-white transition-colors p-1"
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
                  <Textarea
                    id={question.name}
                    placeholder={question.placeholder}
                    value={stringValue}
                    onChange={(e) => handleInputChange(question.name, e.target.value)}
                    onFocus={() => setFocusedField(question.name)}
                    onBlur={() => setFocusedField(null)}
                    className={`bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400 text-base transition-all duration-300 ${
                      expandedFields[question.name] ? 'min-h-[300px]' : 'min-h-[120px]'
                    }`}
                    disabled={isSubmitting}
                    maxLength={2000}
                    showCounter={true}
                  />
                  {focusedField === question.name && (
                    <p className="text-sm text-blue-300/90 mt-2 animate-in fade-in slide-in-from-top-1 duration-200 flex items-start gap-2">
                      <span className="text-base">💡</span>
                      <span>{question.helper}</span>
                    </p>
                  )}
                  {errors[question.name] && (
                    <p className="text-red-400 text-sm">{errors[question.name]}</p>
                  )}
                </div>
              );
            })}

            {/* Pregunta 10: Estilo de comunicación */}
            <div className="space-y-4">
              <Label htmlFor="estiloComunicacion" className="text-white text-base md:text-lg font-bold block">
                10. ¿Cómo te gusta comunicarte en redes sociales?
              </Label>
              <Select 
                value={formData.estiloComunicacion || ''} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, estiloComunicacion: value }))}
                onOpenChange={(open) => setFocusedField(open ? 'estiloComunicacion' : null)}
              >
                <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
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
                <p className="text-sm text-blue-300/90 mt-2 animate-in fade-in slide-in-from-top-1 duration-200 flex items-start gap-2">
                  <span className="text-base">💡</span>
                  <span>Elige el tono que mejor refleje tu personalidad y la forma en que te conectas con tu audiencia.</span>
                </p>
              )}
            </div>

            {!isFormComplete() && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
                <p className="text-amber-200 text-sm text-center">
                  💡 Completa todas las preguntas (cada respuesta con al menos 10 caracteres) y selecciona tu estilo de comunicación para continuar
                </p>
              </div>
            )}

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
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-6 rounded-full text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
