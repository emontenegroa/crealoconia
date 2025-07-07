import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary">
              ¿Qué es Crealoconia?
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Crealoconia no es una agencia común. Es una experiencia de digitalización 
              inteligente y acompañada. Usamos inteligencia artificial para transformar 
              tu mensaje en productos digitales reales, funcionales y profesionales.
            </p>
          </div>
          
          <div className="relative">
            {/* Abstract Network Visual */}
            <Card className="p-8 bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
              <CardContent className="p-0">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-20 bg-accent/20 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-accent rounded-full" />
                  </div>
                  <div className="h-20 bg-primary/20 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                  </div>
                  <div className="h-20 bg-accent/20 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-accent rounded-full" />
                  </div>
                  <div className="h-20 bg-primary/20 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                  </div>
                  <div className="h-20 bg-accent/30 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-accent rounded-full" />
                  </div>
                  <div className="h-20 bg-primary/20 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;