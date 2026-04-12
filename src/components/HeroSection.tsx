import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Zap, Sparkles, ShieldCheck, Star, User, Mail, MessageSquare } from "lucide-react";
import { FormData } from '@/hooks/useFormHandler';
import RotatingText from './RotatingText';

const audienceTypes = [
  "¿Eres Coach o Consultor?",
  "¿Eres Terapeuta o Psicólogo?",
  "¿Eres Freelancer o Diseñador?",
  "¿Eres Nutricionista o Entrenador?",
  "¿Eres Abogado o Doctor?",
  "¿Tienes un Servicio para Empresas?",
  "¿Tienes un Negocio Local?",
  "¿Eres Profesional Independiente?"
];

interface HeroSectionProps {
  formData: FormData;
  onInputChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isValid: boolean;
}

const HeroSection = ({
  formData,
  onInputChange,
  onSubmit,
  isValid
}: HeroSectionProps) => {
  return (
    <header className="min-h-screen bg-background relative overflow-hidden">
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
              <a href="#nosotros" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Nosotros</a>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground">
                Login
              </Button>
              <Button 
                className="bg-foreground text-background hover:bg-foreground/90 text-sm px-5"
                onClick={() => window.open('https://wa.me/56945487423?text=HeY%20como%20es%20eso%20de%20que%20creas%20paginas%20web%20en%204%20horas%3F', '_blank')}
              >
                Contacto
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Headlines */}
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
                <RotatingText texts={audienceTypes} interval={3000} />
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

          {/* Right Column - Form Card */}
          <div className="lg:pl-8">
            <div className="animated-border-wrapper">
              <div className="bg-card rounded-[calc(1rem-2px)] p-8 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Reserva tu lugar ahora</h2>
                  <p className="text-muted-foreground">
                    Completa el formulario y descubre el poder de Crealoconia.
                  </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Nombre Completo
                    </Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        name="marca"
                        value={formData.marca}
                        onChange={e => onInputChange('marca', e.target.value)}
                        placeholder="Ej. Ana García"
                        className="h-14 pl-12 text-base bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl"
                        aria-label="Nombre de tu negocio o marca"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Correo Electrónico
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={e => onInputChange('email', e.target.value)}
                        placeholder="tu@correo.com"
                        className="h-14 pl-12 text-base bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl"
                        aria-label="Tu correo electrónico"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      WhatsApp
                    </Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        name="whatsapp"
                        type="tel"
                        value={formData.whatsapp || ''}
                        onChange={e => onInputChange('whatsapp', e.target.value)}
                        placeholder="+52 55 1234 5678"
                        className="h-14 pl-12 text-base bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl"
                        aria-label="Tu número de WhatsApp"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                    disabled={!isValid}
                  >
                    EMPEZAR AHORA
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

      {/* Subtle background gradient */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 via-primary/2 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-primary/3 to-transparent rounded-full blur-3xl pointer-events-none"></div>
    </header>
  );
};

export default HeroSection;
