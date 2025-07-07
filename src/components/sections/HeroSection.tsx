import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-accent/5 overflow-hidden">
      {/* Background Glass Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl">
        <div className="animate-fade-in">
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-primary mb-6 leading-tight">
            Solo necesitas saber lo que haces y ofreces.{' '}
            <span className="text-accent">Nosotros nos encargamos</span>{' '}
            de que se vea genial.
          </h1>
          
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            Agencia digital asistida por IA. Creamos páginas web, landing pages y productos digitales 
            a partir de tu conocimiento. Sin caos técnico. Sin plantillas. Con estrategia.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 py-6 font-accent font-semibold">
              Quiero mi presencia digital
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 font-accent font-semibold">
              Ver cómo funciona
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-accent/20 rounded-full" />
      <div className="absolute bottom-20 right-10 w-32 h-32 border border-primary/20 rounded-full" />
      <div className="absolute top-1/2 left-20 w-2 h-2 bg-accent rounded-full" />
      <div className="absolute top-1/3 right-32 w-3 h-3 bg-primary rounded-full" />
    </section>
  );
};

export default HeroSection;