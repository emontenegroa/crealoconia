import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Zap, Sparkles, ShieldCheck, Star, User, Mail, MessageSquare, Rocket, CreditCard, CheckCircle, Settings, Bot, Image, PenTool, Target, Megaphone, ThumbsUp, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PortfolioSection from "@/components/PortfolioSection";
import { useFormPersistence } from "@/hooks/useFormPersistence";
import RotatingText from "@/components/RotatingText";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SeoHead from "@/components/SeoHead";
import { useScrollReveal, useScrollRevealGroup } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import MetricasDestacadas from "@/components/MetricasDestacadas";
import ComoTrabajamos from "@/components/ComoTrabajamos";
import { Reveal } from "@/components/motion/Reveal";
import HeroStage, {
  WordReveal,
  heroContainer,
  heroItem,
  springPill,
  formPanel,
} from "@/components/motion/HeroStage";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

const audienceTypes = [
"¿Eres Coach o Consultor?",
"¿Eres Terapeuta o Psicólogo?",
"¿Eres Freelancer o Diseñador?",
"¿Eres Nutricionista o Entrenador?",
"¿Eres Abogado o Doctor?",
"¿Tienes un Servicio para Empresas?",
"¿Tienes un Negocio Local?",
"¿Eres Profesional Independiente?"];

// Feature cards con stagger reveal al hacer scroll
interface Feature { icon: LucideIcon; title: string; description: string; }
const FeatureCardsAnimadas = ({ features }: { features: Feature[] }) => {
  return (
    <section className="py-20 bg-background" id="servicios">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.92 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={{ y: -10, transition: { duration: 0.25 } }}
              className="feature-card group p-8 bg-card border border-border rounded-2xl transition-colors hover:border-primary/50 hover:shadow-[0_25px_60px_-20px_hsl(var(--primary)/0.45)]"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Seccion "De la Idea a la Realidad" con header reveal y cards en stagger
const SeccionBeneficios = ({ benefits }: { benefits: Feature[] }) => {
  const headerRef = useScrollReveal<HTMLDivElement>();
  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-6 lg:px-12">
        <div ref={headerRef} className="reveal text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            De la Idea a la Realidad
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            La tecnología de <span className="text-primary font-semibold">Crealoconia</span> supera la barrera técnica para que te enfoques en escalar tu negocio.
          </p>
        </div>
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.92, filter: "blur(8px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={{ y: -10, transition: { duration: 0.25 } }}
              className="p-8 bg-card border border-border rounded-2xl transition-colors hover:border-primary/50 hover:shadow-[0_25px_60px_-20px_hsl(var(--primary)/0.45)]"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Landing1 = () => {
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const {
    saveProgress
  } = useFormPersistence();
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
      await new Promise((resolve) => setTimeout(resolve, 500));
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
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = {
          ...prev
        };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  const features = [{
    icon: Rocket,
    title: "Lanzamiento Rápido",
    description: "Olvídate de procesos de meses. Tu web profesional lista y optimizada en horas."
  }, {
    icon: Sparkles,
    title: "Diseño IA + Humano",
    description: "Algoritmos que estructuran, expertos que refinan. El equilibrio perfecto."
  }, {
    icon: CreditCard,
    title: "Pago Único",
    description: "Sin suscripciones mensuales ocultas. Pagas por tu activo digital una sola vez."
  }];
  const benefitsSection = [{
    icon: Settings,
    title: "Adiós Parálisis Técnica",
    description: "Eliminamos la barrera técnica compleja para que solo te ocupes de cerrar tratos con tu cliente."
  }, {
    icon: Sparkles,
    title: "Mensaje que Vende",
    description: "Copywriting persuasivo potenciado por IA que convierte visitantes curiosos en leads calificados."
  }, {
    icon: Bot,
    title: "Asistente IA Propio",
    description: "Recibes un Asistente IA configurado con la información de tu negocio, listo para generar contenido, campañas y textos de venta. Valor: $150.000. Incluido sin costo extra."
  }];

  const aiToolsIncluded = [{
    icon: Image,
    title: "IA Generadora de Imágenes",
    description: "Crea imágenes profesionales para anuncios y redes sociales sin contratar diseñador.",
    highlight: "Alta conversión"
  }, {
    icon: PenTool,
    title: "IA Copywriter",
    description: "Textos persuasivos que venden: anuncios, emails, posts y páginas de venta.",
    highlight: "Textos que convierten"
  }, {
    icon: Target,
    title: "IA Estratega de Campañas",
    description: "Diseña campañas publicitarias optimizadas con segmentación y retargeting incluido.",
    highlight: "Facebook & Instagram Ads"
  }, {
    icon: Megaphone,
    title: "IA de Contenido Viral",
    description: "Genera posts, reels, stories y contenido optimizado para cada plataforma.",
    highlight: "Redes sociales"
  }];
  return <div className="min-h-screen bg-background">
      <SeoHead
        title="Crea tu Sitio Web con IA en Chile | CrealoconIA"
        description="CrealoconIA crea tu sitio web profesional con inteligencia artificial en 24 horas. Para emprendedores, coaches y pymes en Chile. Mentoría 1:1 incluida."
        path="/"
      />
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
              <a href="/clientes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Ver clientes</a>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground hidden sm:inline-flex">
                Login
              </Button>
              <Button 
                className="bg-foreground text-background hover:bg-foreground/90 text-sm px-5"
                onClick={() => window.open('https://wa.me/56945487423?text=HeY%20como%20es%20eso%20de%20que%20creas%20paginas%20web%20en%204%20horas%3F', '_blank')}
              >
                Hablemos
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Fondo animado: mesh respira + blobs siguen al mouse */}
        <HeroStage />
        {/* Bloque prueba social antes del formulario */}
        <div className="bg-primary/5 border-b border-primary/10 py-3">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Únete a los +12 negocios</span> que ya tienen su sitio con IA —{" "}
              <a href="/clientes" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
                Ver proyectos reales →
              </a>
            </p>
          </div>
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <motion.div
              className="space-y-8"
              variants={heroContainer}
              initial="hidden"
              animate="show"
            >
              {/* Badge */}
              <motion.div
                variants={springPill}
                className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full"
              >
                <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium text-primary tracking-wide uppercase">NUEVA TECNOLOGÍA 2026</span>
              </motion.div>

              {/* Main Headline */}
              <motion.div variants={heroItem} className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground">
                  <RotatingText texts={audienceTypes} interval={3000} />
                  <br />
                  <WordReveal as="span" text="Lanza tu Web Profesional en" delay={0.2} className="text-foreground" />
                  <span className="text-foreground">&nbsp;</span>
                  <WordReveal as="span" text="4 Horas," delay={0.55} className="text-gradient-primary" />
                  <br />
                  <WordReveal as="span" text="No en 4 Meses." delay={0.8} className="text-foreground" />
                </h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
                  className="text-lg text-muted-foreground max-w-lg leading-relaxed"
                >
                  Utilizamos inteligencia artificial para capturar tu esencia y construir una presencia digital de alto impacto sin complicaciones técnicas.
                </motion.p>
              </motion.div>

              {/* Social Proof */}
              <motion.div variants={heroItem} className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => <div key={i} className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>)}
                  <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">+150</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Profesionales activos</p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
                    <span className="text-sm text-muted-foreground ml-1">(4.9/5)</span>
                  </div>
                </div>
              </motion.div>

              {/* Feature Pills */}
              <motion.div
                className="flex flex-wrap gap-3"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
              >
                <motion.div variants={springPill} className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-full">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">Velocidad IA</span>
                </motion.div>
                <motion.div variants={springPill} className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-full">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">Calidad Premium</span>
                </motion.div>
                <motion.div variants={springPill} className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-full">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">Garantizado</span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              className="lg:pl-8"
              variants={formPanel}
              initial="hidden"
              animate="show"
            >
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
                        Nombre o Empresa
                      </Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input value={formData.nombre} onChange={(e) => handleInputChange('nombre', e.target.value)} placeholder="Ej. Ana García o Mi Empresa" className="h-14 pl-12 text-base bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl" disabled={isSubmitting} />
                      </div>
                      {errors.nombre && <p className="text-destructive text-sm">{errors.nombre}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Correo Electrónico
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="tu@correo.com" className="h-14 pl-12 text-base bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl" disabled={isSubmitting} />
                      </div>
                      {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        WhatsApp
                      </Label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input type="tel" value={formData.telefono} onChange={(e) => handleInputChange('telefono', e.target.value)} placeholder="+56 9 1234 5678" className="h-14 pl-12 text-base bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl" disabled={isSubmitting} />
                      </div>
                      {errors.telefono && <p className="text-destructive text-sm">{errors.telefono}</p>}
                    </div>

                    <Button type="submit" className="w-full h-14 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300" disabled={isSubmitting}>
                      {isSubmitting ? "Procesando..." : "Ver cómo quedaría mi sitio web"}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    
                    <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
                      <Star className="w-4 h-4 text-primary" />
                      Agenda tu llamada de diagnóstico gratuita — sin compromiso
                    </p>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </header>

      {/* Feature Cards */}
      <FeatureCardsAnimadas features={features} />

      {/* Banda de metricas con count-up estilo creme.digital */}
      <MetricasDestacadas />

      {/* De la Idea a la Realidad Section */}
      <SeccionBeneficios benefits={benefitsSection} />

      {/* Herramientas IA Incluidas */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <Bot className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">INCLUIDO CON TU WEB</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Tu Equipo de Marketing IA
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No solo recibes una web. Recibes un <span className="text-primary font-semibold">sistema completo de marketing</span> con 4 asistentes de IA trabajando para tu negocio.
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
          >
            {aiToolsIncluded.map((tool, index) =>
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 60, scale: 0.9 },
              show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
            }}
            whileHover={{ y: -8 }}
            className="animated-border-wrapper group"
          >
                <div className="bg-card rounded-[calc(1rem-2px)] p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <tool.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {tool.highlight}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </motion.div>
          )}
          </motion.div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Todo esto viene <span className="text-foreground font-semibold">incluido sin costo extra</span> con tu web profesional
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Sin suscripciones</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Uso ilimitado</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Tuyo para siempre</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Precio */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-card border border-primary/30 rounded-2xl p-8 md:p-12 shadow-lg shadow-primary/10">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">Inversión única</span>
              <div className="text-5xl md:text-6xl font-bold text-foreground mb-4">$390.000 <span className="text-2xl text-muted-foreground font-normal">CLP</span></div>
              <p className="text-muted-foreground text-lg mb-6">
                Incluye sitio web profesional + Asistente IA personalizado para tu negocio + dominio + hosting 2 años. Sin costos ocultos. Sin suscripciones.
              </p>
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                <p className="text-primary font-semibold">
                  ✅ Primero ves tu sitio terminado. Solo pagas si te encanta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modelo Sin Riesgo */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-[1.5rem] p-[3px] bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
              <div className="bg-card rounded-[calc(1.5rem-3px)] p-8 md:p-12">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
                    <ThumbsUp className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Modelo Sin Riesgo
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Primero <span className="text-primary font-semibold">ves tu sitio web terminado</span>. 
                    Si te gusta, lo compras. Si no te gusta, <span className="text-foreground font-semibold">no pagas nada</span>.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-10">
                  <div className="text-center p-6 bg-secondary/50 rounded-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-primary">1</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Completas el Quiz</h3>
                    <p className="text-sm text-muted-foreground">Nos cuentas sobre tu negocio en 5 minutos</p>
                  </div>
                  <div className="text-center p-6 bg-secondary/50 rounded-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Ves tu Web</h3>
                    <p className="text-sm text-muted-foreground">Te mostramos tu sitio completamente funcional</p>
                  </div>
                  <div className="text-center p-6 bg-secondary/50 rounded-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <ThumbsUp className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Tú Decides</h3>
                    <p className="text-sm text-muted-foreground">Solo pagas si te encanta el resultado</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-6">
                    <ShieldCheck className="w-4 h-4 inline mr-2 text-primary" />
                    Sin compromisos. Sin letra pequeña. Sin presiones.
                  </p>
                  <Button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-primary/25">

                    Ver cómo quedaría mi sitio web
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como trabajamos: sticky scroll + cinta de proyectos */}
      <ComoTrabajamos />

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
      <WhatsAppFloat />
    </div>;
};
export default Landing1;