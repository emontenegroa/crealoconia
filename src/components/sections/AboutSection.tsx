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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollAnimation delay={200}>
            <div className="space-y-8">
              <h2 className="font-heading text-4xl md:text-6xl font-bold text-primary">
                ¿Cómo te ayudo?
              </h2>
              <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p className="font-body">Trabajo contigo y con lo que realmente necesitas.</p>
                <p className="font-body">Te acompaño en todo el proceso: desde crear tu página web o landing, hasta mentorías estratégicas, optimización de procesos, ventas y presentación. Todo lo necesario para que tengas una presencia digital clara, profesional y alineada con tus objetivos.</p>
                <p className="font-body font-semibold text-primary">
                  No trabajo con plantillas. Trabajo contigo y con lo que realmente necesitas.
                </p>
              </div>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation delay={400}>
            <div className="relative">
              {/* Interactive Visual */}
              <Card className="p-8 glass-effect border-accent/30 hover:border-accent/50 transition-all duration-500 group">
                <CardContent className="p-0">
                  <div className="grid grid-cols-3 gap-4">
                    {[...Array(9)].map((_, i) => <div key={i} className={`h-20 rounded-xl flex items-center justify-center transition-all duration-700 hover:scale-110 cursor-pointer ${i % 3 === 0 ? 'bg-accent/20 hover:bg-accent/40' : i % 3 === 1 ? 'bg-primary/20 hover:bg-primary/40' : 'bg-muted hover:bg-muted/80'}`} style={{
                    animationDelay: `${i * 100}ms`
                  }}>
                        <div className={`w-3 h-3 rounded-full ${i % 3 === 0 ? 'bg-accent' : i % 3 === 1 ? 'bg-primary' : 'bg-muted-foreground'} group-hover:scale-150 transition-transform duration-300`} />
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>;
};
export default AboutSection;