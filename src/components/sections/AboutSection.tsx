import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ScrollAnimation from '@/components/ScrollAnimation';

const AboutSection = () => {
  return (
    <section className="py-20 bg-muted/20" id="quien-soy">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollAnimation>
            <div className="space-y-6">
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">
                👋 Quien soy
              </div>
              
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                Esteban Montenegro
              </h2>
              
              <div className="text-xl text-muted-foreground space-y-4 leading-relaxed">
                <p>
                  <strong className="text-foreground">Mentor en tecnología con 20+ años de experiencia</strong> 
                  ayudando a profesionales como tú a crear presencia digital que realmente genere resultados.
                </p>
                
                <p>
                  He trabajado con centenares de mentores, coaches, abogados y consultores que llegaron 
                  frustrados después de múltiples intentos fallidos con agencias y plataformas complicadas.
                </p>
                
                <p>
                  Mi especialidad es usar <strong className="text-primary">inteligencia artificial</strong> para 
                  traducir tu expertise en webs profesionales que venden mientras duermes.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">150+</div>
                  <div className="text-muted-foreground">Webs creadas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">20+</div>
                  <div className="text-muted-foreground">Años de experiencia</div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={300}>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop&crop=face"
                  alt="Esteban Montenegro - Mentor en tecnología"
                  className="rounded-2xl w-full shadow-2xl"
                />
              </div>
              
              {/* Floating testimonial */}
              <Card className="absolute -bottom-6 -left-6 bg-card border border-accent/20 shadow-xl max-w-sm">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    "Esteban no solo crea webs, crea herramientas de ventas que funcionan 24/7"
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold">CM</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Carlos M.</div>
                      <div className="text-xs text-muted-foreground">Abogado</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;