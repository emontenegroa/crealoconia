import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle } from "lucide-react";
import { FormData } from '@/hooks/useFormHandler';

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
      {/* Minimal geometric pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>
      
      {/* Subtle accent gradient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-12 lg:py-20">
        {/* Header badge */}
        <div className="flex items-center justify-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-secondary border border-border rounded-full">
            <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
              CrealoconIA
            </span>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Headline - H1 único y claro */}
          <div className="space-y-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] tracking-tight text-foreground">
              CrealoconIA ayuda a emprendedores y profesionales a crear su presencia digital completa usando inteligencia artificial
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Sitio web, contenido y mentoría personalizada, sin conocimientos técnicos y en pocos días.
            </p>
          </div>

          {/* Application Form */}
          <div className="max-w-xl mx-auto">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="marca"
                  value={formData.marca}
                  onChange={e => onInputChange('marca', e.target.value)}
                  placeholder="Tu negocio o marca"
                  className="h-14 text-base bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl"
                  aria-label="Nombre de tu negocio o marca"
                />
                
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={e => onInputChange('email', e.target.value)}
                  placeholder="tu@email.com"
                  className="h-14 text-base bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl"
                  aria-label="Tu correo electrónico"
                />
              </div>

              <Button
                type="submit"
                className="h-14 px-10 text-base font-semibold bg-foreground hover:bg-foreground/90 text-background border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto"
                disabled={!isValid}
              >
                Quiero crear mi sitio con IA
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
              
              <p className="text-sm text-muted-foreground">
                Sin compromiso · Ve tu sitio antes de pagar
              </p>
            </form>
          </div>

          {/* Value propositions */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-border">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Sin conocimientos técnicos</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Sitio web listo en días</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Mentoría 1:1 incluida</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center text-muted-foreground">
          <span className="text-xs uppercase tracking-widest mb-4">Descubre más</span>
          <div className="w-px h-12 bg-gradient-to-b from-border to-transparent"></div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
