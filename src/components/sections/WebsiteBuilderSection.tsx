import React from 'react';
import { Button } from '@/components/ui/button';
import ScrollAnimation from '@/components/ScrollAnimation';

const WebsiteBuilderSection = () => {
  return (
    <section className="py-32 bg-muted/10">
      <div className="container mx-auto px-4 max-w-7xl">
        <ScrollAnimation>
          <div className="mb-20">
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Resultados únicos.
            </h2>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left Column - Accordion */}
          <div className="space-y-8">
            <ScrollAnimation delay={200}>
              <div className="space-y-6">
                {/* First Accordion Item */}
                <div className="border-b border-border pb-6">
                  <div className="flex items-center justify-between cursor-pointer group">
                    <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      Web personalizada y única
                    </h3>
                    <div className="w-6 h-6 border border-muted-foreground rounded-full flex items-center justify-center">
                      <div className="w-3 h-0.5 bg-muted-foreground"></div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Creamos tu sitio web desde cero basándonos en tus respuestas únicas. 
                      No usamos plantillas genéricas. Cada web refleja tu personalidad, 
                      valores y forma de trabajar.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Con tecnología moderna y diseño responsive, tu sitio funciona 
                      perfecto en todos los dispositivos. Y gracias a la IA, el contenido 
                      conecta directamente con tu audiencia ideal.
                    </p>
                  </div>
                </div>

                {/* Second Accordion Item */}
                <div className="border-b border-border pb-6">
                  <div className="flex items-center justify-between cursor-pointer group">
                    <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      Contenido y estrategia
                    </h3>
                    <div className="w-6 h-6 border border-muted-foreground rounded-full flex items-center justify-center">
                      <div className="w-3 h-0.5 bg-muted-foreground"></div>
                      <div className="w-0.5 h-3 bg-muted-foreground absolute"></div>
                    </div>
                  </div>
                </div>

                {/* Third Accordion Item */}
                <div className="border-b border-border pb-6">
                  <div className="flex items-center justify-between cursor-pointer group">
                    <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      Mentoría y optimización
                    </h3>
                    <div className="w-6 h-6 border border-muted-foreground rounded-full flex items-center justify-center">
                      <div className="w-3 h-0.5 bg-muted-foreground"></div>
                      <div className="w-0.5 h-3 bg-muted-foreground absolute"></div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Right Column - Device Mockups */}
          <ScrollAnimation delay={400}>
            <div className="relative">
              {/* MacBook */}
              <div className="relative z-10">
                <div className="bg-muted/30 rounded-t-3xl p-2">
                  <div className="bg-card rounded-t-2xl shadow-2xl border overflow-hidden">
                    {/* MacBook Screen */}
                    <div className="bg-gradient-to-br from-background via-muted/30 to-accent/5 p-6 min-h-[400px]">
                      {/* Browser Bar */}
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-3 h-3 bg-destructive rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="ml-4 bg-muted/50 rounded-lg px-4 py-1 text-xs text-muted-foreground">
                          tunegocio.com
                        </div>
                      </div>
                      
                      {/* Website Preview */}
                      <div className="space-y-6">
                        <div className="text-center space-y-4">
                          <div className="h-8 bg-primary/20 rounded w-3/4 mx-auto"></div>
                          <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-accent/10 rounded-lg p-4 space-y-2">
                            <div className="h-3 bg-accent/30 rounded w-full"></div>
                            <div className="h-2 bg-muted rounded w-3/4"></div>
                          </div>
                          <div className="bg-primary/10 rounded-lg p-4 space-y-2">
                            <div className="h-3 bg-primary/30 rounded w-full"></div>
                            <div className="h-2 bg-muted rounded w-2/3"></div>
                          </div>
                          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                            <div className="h-3 bg-muted rounded w-full"></div>
                            <div className="h-2 bg-muted rounded w-4/5"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* MacBook Base */}
                <div className="bg-muted/40 h-4 rounded-b-3xl"></div>
              </div>

              {/* iPhone Positioned on the side */}
              <div className="absolute -bottom-8 -left-20 z-20">
                <div className="w-48 h-96 bg-card rounded-3xl shadow-2xl border-4 border-muted/20 overflow-hidden">
                  {/* iPhone Screen */}
                  <div className="absolute inset-2 bg-background rounded-3xl overflow-hidden">
                    {/* Status Bar */}
                    <div className="h-8 bg-foreground/5 flex items-center justify-between px-6 text-xs font-medium text-foreground">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 bg-foreground/60 rounded-sm"></div>
                        <div className="w-4 h-2 bg-foreground/60 rounded-sm"></div>
                        <div className="w-6 h-2 bg-foreground/80 rounded-sm"></div>
                      </div>
                    </div>
                    
                    {/* Mobile Website */}
                    <div className="p-4 space-y-4">
                      <div className="text-center space-y-2">
                        <div className="h-4 bg-primary/20 rounded w-full"></div>
                        <div className="h-2 bg-muted rounded w-2/3 mx-auto"></div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-accent/10 rounded-lg p-3">
                          <div className="h-2 bg-accent/30 rounded w-full mb-2"></div>
                          <div className="h-2 bg-muted rounded w-3/4"></div>
                        </div>
                        <div className="bg-primary/10 rounded-lg p-3">
                          <div className="h-2 bg-primary/30 rounded w-full mb-2"></div>
                          <div className="h-2 bg-muted rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-foreground/30 rounded-full"></div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        {/* CTA Section */}
        <ScrollAnimation delay={600}>
          <div className="mt-32 text-center">
            <Button 
              size="lg" 
              className="text-lg px-10 py-6 font-accent font-semibold animate-pulse-glow hover:scale-105 transition-all duration-300"
            >
              Crear mi sitio web único 🚀
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default WebsiteBuilderSection;