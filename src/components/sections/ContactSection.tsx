import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollAnimation from '@/components/ScrollAnimation';
const ContactSection = () => {
  const handleCalendlyClick = () => {
    // TODO: Integrate with Calendly
    console.log('Opening Calendly...');
  };
  return <section className="py-32 bg-gradient-to-br from-accent/10 to-primary/10 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 border border-accent/40 rounded-full animate-float" />
        <div className="absolute top-20 right-20 w-48 h-48 border border-primary/40 rounded-full animate-float" style={{
        animationDelay: '2s'
      }} />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-accent/20 rounded-full animate-float" style={{
        animationDelay: '4s'
      }} />
        <div className="absolute bottom-10 right-1/3 w-36 h-36 bg-primary/20 rounded-full animate-float" style={{
        animationDelay: '1s'
      }} />
      </div>
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <ScrollAnimation>
          <Card className="glass-effect border-accent/40 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105">
            
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
    </section>;
};
export default ContactSection;