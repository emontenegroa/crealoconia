import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AboutEstebanSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            {/* Profile Image Placeholder */}
            <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
              <CardContent className="p-8">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                  <div className="w-32 h-32 bg-primary/30 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-accent font-bold text-primary">EM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary">
              Sobre Esteban
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Soy Esteban Montenegro, fundador de Crealoconia. Acompaño a personas que ayudan a otras 
              —coaches, consultores, terapeutas, emprendedores— a mostrarse con claridad en digital. 
              Sin plantillas. Sin enredos. Con estrategia y tecnología real.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutEstebanSection;