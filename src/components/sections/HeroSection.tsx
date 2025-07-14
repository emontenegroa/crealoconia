import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-muted/5 pt-16">
      {/* Minimal background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Tu web profesional que vende.
              <span className="block text-primary mt-2">
                Lista en 7 días.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              <span className="font-bold text-foreground">IA + Estrategia + Acompañamiento humano.</span><br />
              Convierte tu expertise en una presencia digital que atrae clientes ideales automáticamente.
            </p>

            {/* Hook de urgencia */}
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full border border-accent/20 mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <span className="font-semibold text-sm">Solo trabajo con 8 proyectos por mes</span>
            </div>

            {/* Prueba social rápida */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-sm text-muted-foreground py-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">150+</div>
                <div>Proyectos exitosos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">7 días</div>
                <div>Promedio de entrega</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24h</div>
                <div>Respuesta garantizada</div>
              </div>
            </div>

            {/* CTA principal optimizado */}
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="text-xl px-12 py-6 font-bold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-2xl"
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              >
                🚀 Quiero mi sistema que vende ahora
              </Button>
              <p className="text-sm text-muted-foreground">
                ✅ Llamada estratégica gratuita • ✅ Propuesta personalizada en 24h
              </p>
            </div>

            {/* Beneficio diferenciador */}
            <div className="bg-card border border-border rounded-lg p-6 mt-8">
              <p className="text-foreground font-medium">
                "No necesitas ser el más barato. Necesitas ser el más claro sobre cómo resuelves el problema de tu cliente."
              </p>
              <p className="text-sm text-muted-foreground mt-2">— Mi filosofía para cada proyecto</p>
            </div>
          </div>

          {/* Right Content - Screenshot */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl border-2 border-border/50">
              <img 
                src="/lovable-uploads/ffa165bd-f493-4686-8a82-2121f3df0eae.png" 
                alt="Vista previa de herramienta para crear contenido automatizado"
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              />
              {/* Overlay para dar profundidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Elementos decorativos */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;