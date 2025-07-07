import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  const handleCalendlyClick = () => {
    // TODO: Integrate with Calendly
    console.log('Opening Calendly...');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/10">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="border-primary/20 shadow-xl">
          <CardContent className="p-12 text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-8">
              Agenda una mentoría
            </h2>
            
            <p className="font-body text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              ¿Listo para transformar tu presencia digital? Conversemos sobre tu proyecto 
              y cómo podemos ayudarte a alcanzar tus objetivos.
            </p>
            
            <Button 
              onClick={handleCalendlyClick}
              size="lg" 
              className="font-accent font-semibold text-lg px-8 py-6"
            >
              Quiero hablar con Esteban
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;