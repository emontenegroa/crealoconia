import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollAnimation from '@/components/ScrollAnimation';

const ContactSection = () => {
  const handleCalendlyClick = () => {
    // TODO: Integrate with Calendly
    console.log('Opening Calendly...');
  };

  return (
    <section className="py-32 bg-gradient-to-br from-accent/10 to-primary/10 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 border border-accent/40 rounded-full animate-float" />
        <div className="absolute top-20 right-20 w-48 h-48 border border-primary/40 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-10 right-1/3 w-36 h-36 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <ScrollAnimation>
          <Card className="glass-effect border-accent/40 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105">
            <CardContent className="p-12 lg:p-20 text-center">
              <div className="space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full text-purple-600 dark:text-purple-400 font-medium mb-6">
                  📅 Agenda Tu Sesión
                </div>
                
                <h2 className="font-heading text-4xl md:text-6xl font-bold text-primary">
                  ¿Quieres dejar de complicarte{' '}
                  <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    y avanzar con claridad?
                  </span>
                </h2>
                
                <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  Agenda una sesión personalizada para revisar tu caso, resolver dudas 
                  y construir juntos tu presencia digital.
                </p>
                
                <div className="pt-4">
                  <Button 
                    onClick={handleCalendlyClick}
                    size="lg" 
                    className="font-accent font-semibold text-xl px-12 py-8 animate-pulse-glow hover:scale-110 transition-all duration-500 shadow-2xl"
                  >
                    Agendar sesión con Esteban
                  </Button>
                </div>
                
                <div className="pt-8 border-t border-accent/20">
                  <p className="font-body text-muted-foreground text-sm">
                    💡 Sin compromisos • 🚀 Resultados reales • ✨ Estrategia personalizada
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollAnimation>
        
        {/* Footer */}
        <ScrollAnimation delay={300}>
          <footer className="mt-20 text-center space-y-6">
            <div className="flex justify-center items-center space-x-8 text-muted-foreground">
              <a href="#" className="hover:text-accent transition-colors duration-300">Inicio</a>
              <a href="#servicios" className="hover:text-accent transition-colors duration-300">Servicios</a>
              <a href="#lead-magnet" className="hover:text-accent transition-colors duration-300">Lead Magnet</a>
              <a href="#contacto" className="hover:text-accent transition-colors duration-300">Agendar</a>
            </div>
            <div className="space-y-2">
              <p className="font-accent font-semibold text-primary">
                Crealoconia – Tecnología que te representa
              </p>
              <p className="text-muted-foreground text-sm">
                contacto@crealoconia.com • LinkedIn • Instagram
              </p>
            </div>
          </footer>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ContactSection;