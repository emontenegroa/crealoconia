import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Zap, Sparkles, ShieldCheck, Star, User, Mail, MessageSquare, Rocket, CreditCard, CheckCircle, Settings, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PortfolioSection from "@/components/PortfolioSection";
import { useFormPersistence } from "@/hooks/useFormPersistence";

const Landing1 = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { saveProgress } = useFormPersistence();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre || formData.nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }
    if (!formData.telefono || formData.telefono.replace(/\D/g, '').length < 9) {
      newErrors.telefono = 'El teléfono debe tener al menos 9 dígitos';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Completa los campos correctamente",
        description: "Revisa los errores en el formulario",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      localStorage.setItem('userData', JSON.stringify(formData));
      const backendData = {
        marca: formData.nombre,
        email: formData.email,
        whatsapp: formData.telefono,
        quien_eres: '',
        problemas: '',
        preguntas_frecuentes: '',
        estilo: '',
        producto: '',
        website: '',
        instagram: ''
      };
      await saveProgress(backendData as any);
      console.log('✅ Datos iniciales guardados en backend');
      await new Promise(resolve => setTimeout(resolve, 500));
      toast({
        title: "¡Perfecto!",
        description: "Continuemos con las siguientes preguntas"
      });
      navigate('/quiz');
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

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const features = [
    {
      icon: Rocket,
      title: "Lanzamiento Rápido",
      description: "Olvídate de procesos de meses. Tu web profesional lista y optimizada en horas."
    },
    {
      icon: Sparkles,
      title: "Diseño IA + Humano",
      description: "Algoritmos que estructuran, expertos que refinan. El equilibrio perfecto."
    },
    {
      icon: CreditCard,
      title: "Pago Único",
      description: "Sin suscripciones mensuales ocultas. Pagas por tu activo digital una sola vez."
    }
  ];

  const benefitsSection = [
    {
      icon: Settings,
      title: "Adiós Parálisis Técnica",
      description: "Eliminamos la barrera técnica compleja para que solo te ocupes de cerrar tratos con tu cliente."
    },
    {
      icon: Sparkles,
      title: "Mensaje que Vende",
      description: "Copywriting persuasivo potenciado por IA que convierte visitantes curiosos en leads calificados."
    },
    {
      icon: Bot,
      title: "Asistente IA Propio",
      description: "Tu sistema trabaja 24/7 agendando llamadas y respondiendo dudas básicas por ti."
    }
  ];

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
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#servicios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Servicios</a>
              <a href="#casos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Casos de Éxito</a>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground hidden sm:inline-flex">
                Login
              </Button>
              <Button className="bg-foreground text-background hover:bg-foreground/90 text-sm px-5">
                Contacto
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="relative z-10 container mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium text-primary tracking-wide uppercase">
                  Nueva Tecnología 2025
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground">
                  ¿Eres Coach o Consultor?
                  <br />
                  <span className="text-foreground">Lanza tu Web Profesional en </span>
                  <span className="text-gradient-primary">4 Horas</span>
                  <span className="text-foreground">,</span>
                  <br />
                  <span className="text-foreground">No en 4 Meses.</span>
                </h1>
                
                <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                  Utilizamos inteligencia artificial para capturar tu esencia y construir una presencia digital de alto impacto sin complicaciones técnicas.
                </p>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">+150</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Profesionales activos</p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">(4.9/5)</span>
                  </div>
                </div>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-full">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">Velocidad IA</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-full">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">Calidad Premium</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-full">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">Garantizado</span>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:pl-8">
              <div className="animated-border-wrapper">
                <div className="bg-card rounded-[calc(1rem-2px)] p-8 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">Reserva tu lugar ahora</h2>
                    <p className="text-muted-foreground">
                      Completa el formulario y descubre el poder de Crealoconia.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Nombre Completo
                      </Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          value={formData.nombre}
                          onChange={e => handleInputChange('nombre', e.target.value)}
                          placeholder="Ej. Ana García"
                          className="h-14 pl-12 text-base bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl"
                          disabled={isSubmitting}
                        />
                      </div>
                      {errors.nombre && <p className="text-destructive text-sm">{errors.nombre}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Correo Electrónico
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={e => handleInputChange('email', e.target.value)}
                          placeholder="tu@correo.com"
                          className="h-14 pl-12 text-base bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl"
                          disabled={isSubmitting}
                        />
                      </div>
                      {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        WhatsApp
                      </Label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="tel"
                          value={formData.telefono}
                          onChange={e => handleInputChange('telefono', e.target.value)}
                          placeholder="+52 55 1234 5678"
                          className="h-14 pl-12 text-base bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl"
                          disabled={isSubmitting}
                        />
                      </div>
                      {errors.telefono && <p className="text-destructive text-sm">{errors.telefono}</p>}
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-14 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Procesando..." : "EMPEZAR AHORA"}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    
                    <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
                      <Star className="w-4 h-4 text-primary" />
                      Solo 5 plazas disponibles este mes
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 via-primary/2 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-primary/3 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      </header>

      {/* Feature Cards */}
      <section className="py-20 bg-background" id="servicios">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card p-8 bg-card border border-border rounded-2xl"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* De la Idea a la Realidad Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              De la Idea a la Realidad
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              La tecnología de <span className="text-primary font-semibold">Crealoconia</span> supera la barrera técnica para que te enfoques en escalar tu negocio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefitsSection.map((benefit, index) => (
              <div key={index} className="p-8 bg-card border border-border rounded-2xl">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="casos">
        <PortfolioSection />
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Crealoconia</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2025 Crealoconia.com. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing1;
