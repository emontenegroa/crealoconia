import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ScrollAnimation from '@/components/ScrollAnimation';
const AboutSection = () => {
  return <section className="py-32 bg-gradient-to-br from-muted/20 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Section Header */}
        <ScrollAnimation>
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6">
              ¿Cómo te ayudo?
            </h2>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
          <ScrollAnimation delay={200}>
            <div className="relative order-2 lg:order-1">
              {/* iPhone Mockup */}
              <div className="relative mx-auto w-80 h-[650px] bg-card rounded-[3rem] shadow-2xl border-8 border-muted/20 overflow-hidden">
                {/* Screen */}
                <div className="absolute inset-4 bg-background rounded-[2.5rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="h-8 bg-foreground/5 flex items-center justify-between px-6 text-xs font-medium text-foreground">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-2 bg-foreground/60 rounded-sm"></div>
                      <div className="w-4 h-2 bg-foreground/60 rounded-sm"></div>
                      <div className="w-6 h-2 bg-foreground/80 rounded-sm"></div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex gap-4 mb-6">
                      <div className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">IA</div>
                      <div className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">Web</div>
                      <div className="px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm font-medium">Mentorías</div>
                    </div>
                    
                    {/* Cards */}
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-2xl">
                        <h4 className="font-semibold text-sm text-primary">Desarrollo Web IA</h4>
                        <p className="text-xs text-muted-foreground mt-1">Sitios únicos con tecnología</p>
                      </div>
                      <div className="bg-gradient-to-r from-accent/10 to-primary/10 p-4 rounded-2xl">
                        <h4 className="font-semibold text-sm text-accent">Mentoría Estratégica</h4>
                        <p className="text-xs text-muted-foreground mt-1">Claridad en tu negocio digital</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-2xl">
                        <h4 className="font-semibold text-sm text-foreground">Optimización IA</h4>
                        <p className="text-xs text-muted-foreground mt-1">Procesos automatizados</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-foreground/30 rounded-full"></div>
              </div>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation delay={400}>
            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-6 text-lg md:text-xl leading-relaxed">
                <p className="font-body text-foreground/90">
                  Me he especializado en <span className="text-primary font-semibold">Inteligencia Artificial</span>, y eso me ha dado las herramientas técnicas para potenciar mi experiencia acompañando personas.
                </p>
                <p className="font-body text-muted-foreground">
                  Hoy puedo entender tus desafíos, escucharte con claridad, darte orientación estratégica y ayudarte a transformar tus ideas en <span className="text-accent font-semibold">soluciones digitales reales</span>.
                </p>
                <p className="font-body text-muted-foreground">
                  Te acompaño en todo el proceso: desde crear tu página web o landing, hasta mentorías estratégicas, optimización de procesos, ventas y presentación.
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mt-8">
                  <p className="font-body font-semibold text-primary text-lg">
                    No trabajo con plantillas. Trabajo contigo y con lo que realmente necesitas.
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>;
};
export default AboutSection;