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
      <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl">
        <div className="space-y-8">
          {/* Hook inicial */}
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full border border-destructive/20 mb-4">
            <span className="w-2 h-2 bg-destructive rounded-full animate-pulse"></span>
            <span className="font-semibold text-sm">Tu web actual no está vendiendo como debería</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            Tu web profesional que vende.
            <span className="block text-primary mt-2">
              Lista en 7 días.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            <span className="font-bold text-foreground">No creo webs bonitas, creo sistemas que generan clientes.</span><br />
            Con IA estratégica + acompañamiento personalizado, tu expertise se convierte en una máquina de ventas 24/7.
          </p>

          {/* Prueba social rápida */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground py-6">
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
          <div className="bg-card border border-border rounded-lg p-6 max-w-2xl mx-auto mt-8">
            <p className="text-foreground font-medium">
              "No necesitas ser el más barato. Necesitas ser el más claro sobre cómo resuelves el problema de tu cliente."
            </p>
            <p className="text-sm text-muted-foreground mt-2">— Mi filosofía para cada proyecto</p>
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