import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import CleanTypewriter from './CleanTypewriter';

interface MinimalHeroSectionProps {
  onLoadExample: () => void;
  onScrollToForm: () => void;
}

const MinimalHeroSection = ({ onLoadExample, onScrollToForm }: MinimalHeroSectionProps) => {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Clean Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/d5a1d369-f067-4b34-8454-e4ea330bfa99.png" 
              alt="Crealoconia" 
              className="w-8 h-8 object-contain" 
            />
            <span className="text-xl font-semibold">Crealoconia</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onLoadExample}
              className="text-muted-foreground hover:text-foreground"
            >
              Ver ejemplo
            </Button>
            <Button
              onClick={onScrollToForm}
              className="btn-primary px-4 py-2"
            >
              Comenzar
            </Button>
          </div>
        </div>
      </header>

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            ✓ Resultado en minutos
          </div>
          
          {/* Main Headline */}
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="block text-foreground">Crea tu web</span>
              <span className="block text-accent">profesional</span>
              <span className="block text-foreground">en minutos</span>
            </h1>
          </div>
          
          {/* Typewriter */}
          <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CleanTypewriter />
          </div>
          
          {/* Subtitle */}
          <div className="max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-6">
              Estás haciendo algo valioso. Es hora de mostrarlo con{' '}
              <span className="text-foreground font-semibold">claridad y presencia profesional.</span>
            </p>
            <p className="text-lg text-muted-foreground">
              Tu web no puede seguir siendo un pendiente.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button
              onClick={onScrollToForm}
              size="lg"
              className="btn-primary text-lg px-8 py-4 h-auto group"
            >
              Crear mi web gratis
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={onLoadExample}
              className="btn-outline text-lg px-8 py-4 h-auto"
            >
              Ver cómo funciona
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                1,247+ webs creadas
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                100% gratis
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Sin compromiso
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalHeroSection;