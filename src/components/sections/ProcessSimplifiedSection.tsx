import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollAnimation from '@/components/ScrollAnimation';

const ProcessSimplifiedSection = () => {
  return (
    <section className="py-20 bg-muted/20" id="proceso">
      <div className="container mx-auto px-4 max-w-6xl">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full font-semibold mb-4">
              🎯 Cómo trabajo
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              De tu idea a web que vende<br />
              <span className="text-accent">en solo 4 pasos</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Sin tecnicismos. Sin complicaciones. Solo resultados.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <ScrollAnimation delay={200}>
            <Card className="text-center bg-card border-2 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-bold text-lg mb-3">📞 Llamamos</h3>
                <p className="text-muted-foreground text-sm">
                  30 min para entender tu negocio, tu mensaje y tus objetivos.
                </p>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation delay={400}>
            <Card className="text-center bg-card border-2 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-bold text-lg mb-3">🤖 IA crea</h3>
                <p className="text-muted-foreground text-sm">
                  En 24h tienes tu web completa: diseño, contenido y estructura.
                </p>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation delay={600}>
            <Card className="text-center bg-card border-2 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-bold text-lg mb-3">✨ Afinamos</h3>
                <p className="text-muted-foreground text-sm">
                  Ajustamos colores, textos e imágenes hasta que sea perfecta.
                </p>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation delay={800}>
            <Card className="text-center bg-card border-2 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="font-bold text-lg mb-3">🚀 Lanzamos</h3>
                <p className="text-muted-foreground text-sm">
                  Tu web está lista para generar clientes 24/7.
                </p>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>

        {/* Diferenciadores */}
        <ScrollAnimation delay={1000}>
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
              ¿Por qué es diferente trabajar conmigo?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                  🎯
                </div>
                <h4 className="font-bold mb-2">Estrategia, no solo diseño</h4>
                <p className="text-muted-foreground text-sm">
                  Cada elemento está pensado para convertir visitantes en clientes.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                  🤝
                </div>
                <h4 className="font-bold mb-2">Acompañamiento real</h4>
                <p className="text-muted-foreground text-sm">
                  No te entrego y desaparezco. Te acompaño hasta que funcione.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                  ⚡
                </div>
                <h4 className="font-bold mb-2">Rapidez con calidad</h4>
                <p className="text-muted-foreground text-sm">
                  IA + 20 años de experiencia = resultados en tiempo récord.
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={1200}>
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="text-lg px-10 py-6 font-bold bg-gradient-to-r from-primary to-accent hover:opacity-90"
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            >
              🎯 Empezar mi proyecto ahora
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ProcessSimplifiedSection;