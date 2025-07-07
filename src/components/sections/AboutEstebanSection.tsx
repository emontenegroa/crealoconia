import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollAnimation from '@/components/ScrollAnimation';

const AboutEstebanSection = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-muted/20 to-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollAnimation className="order-2 lg:order-1">
            <div className="relative group">
              {/* Profile Image Placeholder with enhanced effects */}
              <Card className="glass-effect border-accent/30 hover:border-accent/50 transition-all duration-700 group-hover:scale-105">
                <CardContent className="p-12">
                  <div className="aspect-square bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 rounded-3xl flex items-center justify-center relative overflow-hidden">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 animate-gradient" />
                    
                    {/* Profile placeholder */}
                    <div className="relative z-10 w-40 h-40 bg-gradient-to-br from-primary/50 to-accent/50 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                      <span className="text-5xl font-accent font-bold text-primary-foreground drop-shadow-lg">
                        EM
                      </span>
                    </div>
                    
                    {/* Floating elements */}
                    <div className="absolute top-4 right-4 w-4 h-4 bg-accent/50 rounded-full animate-float" />
                    <div className="absolute bottom-4 left-4 w-3 h-3 bg-primary/50 rounded-full animate-float" style={{ animationDelay: '2s' }} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation delay={300} className="order-1 lg:order-2">
            <div className="space-y-8">
              <h2 className="font-heading text-4xl md:text-6xl font-bold text-primary">
                Sobre Esteban
              </h2>
              <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p className="font-body">
                  Soy Esteban Montenegro, fundador de Crealoconia.
                </p>
                <p className="font-body">
                  Acompaño a personas que ayudan a otras —coaches, consultores, terapeutas, emprendedores— 
                  a mostrarse con claridad en digital.
                </p>
                <p className="font-body font-semibold text-primary">
                  Sin plantillas. Sin enredos. Con estrategia y tecnología real.
                </p>
              </div>
              
              <Button 
                size="lg" 
                variant="outline"
                className="font-accent font-semibold text-lg px-8 py-6 glass-effect hover:scale-105 transition-all duration-300 group"
              >
                <span className="group-hover:mr-2 transition-all duration-300">Conoce mi historia</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default AboutEstebanSection;