import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Globe } from 'lucide-react';
import TypewriterText from './TypewriterText';

interface HeroSectionProps {
  onLoadExample: () => void;
}

const HeroSection = ({ onLoadExample }: HeroSectionProps) => {
  const scrollToForm = () => {
    const formElement = document.querySelector('[data-form-section]');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Floating Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav border-b border-white/10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/d5a1d369-f067-4b34-8454-e4ea330bfa99.png" 
              alt="Crealoconia" 
              className="w-10 h-10 object-contain hover-glow transition-all duration-300" 
            />
            <span className="text-xl font-bold text-gradient">Crealoconia</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Button
              variant="ghost"
              onClick={onLoadExample}
              className="text-foreground/70 hover:text-foreground"
            >
              Ver ejemplo
            </Button>
            <Button
              onClick={scrollToForm}
              className="btn-gradient px-6"
            >
              Comenzar gratis
            </Button>
          </div>
        </div>
      </header>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero animate-gradient opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sparkles className="absolute top-20 left-10 w-6 h-6 text-primary opacity-30 animate-float" style={{ animationDelay: '0s' }} />
        <Zap className="absolute top-40 right-20 w-8 h-8 text-accent opacity-40 animate-float" style={{ animationDelay: '1s' }} />
        <Globe className="absolute bottom-40 left-20 w-7 h-7 text-secondary opacity-35 animate-float" style={{ animationDelay: '2s' }} />
        <Sparkles className="absolute bottom-20 right-10 w-5 h-5 text-coral opacity-30 animate-float" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-8">
              <span className="block text-foreground">Crea tu web</span>
              <span className="block text-gradient">profesional</span>
              <span className="block text-foreground">en minutos para</span>
            </h1>
          </div>
          
          {/* Typewriter Effect */}
          <div className="h-24 flex items-center justify-center mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <TypewriterText />
          </div>
          
          {/* Value Proposition */}
          <div className="max-w-4xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed mb-8">
              <span className="text-gradient font-bold">Estás haciendo algo valioso.</span> Es hora de mostrarlo con{' '}
              <span className="text-gradient-secondary font-bold">claridad, confianza y presencia profesional.</span>
            </p>
            <p className="text-lg md:text-xl text-muted-foreground font-medium">
              Tu web no puede seguir siendo un pendiente.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.9s' }}>
            <Button
              onClick={scrollToForm}
              size="lg"
              className="btn-gradient text-lg px-8 py-4 h-auto animate-pulse-glow group"
            >
              🚀 CREAR MI WEB GRATIS
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={onLoadExample}
              className="btn-glass text-lg px-8 py-4 h-auto"
            >
              Ver cómo funciona
            </Button>
          </div>
          
          {/* Trust Indicator */}
          <div className="mt-12 animate-slide-up" style={{ animationDelay: '1.2s' }}>
            <p className="text-sm text-muted-foreground mb-4">
              🔒 100% seguro y sin spam • ✅ Sin compromiso • 🚀 Resultado en minutos
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                1,247+ webs creadas
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                Respuesta inmediata
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;