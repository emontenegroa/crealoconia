import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollAnimation from '@/components/ScrollAnimation';

const ProblemSolutionSection = () => {
  return (
    <section className="py-20 bg-muted/50" id="problema-solucion">
      <div className="container mx-auto px-4 max-w-7xl">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              ¿Te sientes identificado con esto?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              La mayoría de mis clientes llegan después de varios intentos frustantes
            </p>
          </div>
        </ScrollAnimation>

        {/* Problemas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <ScrollAnimation delay={200}>
            <Card className="border border-destructive/20 bg-destructive/5">
              <CardContent className="p-6">
                <div className="text-destructive font-semibold mb-3">😤 Frustración</div>
                <h3 className="font-heading font-semibold text-lg mb-3">
                  "Ya intenté varias veces crear mi web"
                </h3>
                <p className="text-muted-foreground">
                  Has probado con agencias costosas, plataformas complicadas o templates que no te representan. 
                  Cada intento te ha dejado más frustrado.
                </p>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation delay={400}>
            <Card className="border border-destructive/20 bg-destructive/5">
              <CardContent className="p-6">
                <div className="text-destructive font-semibold mb-3">⏰ Falta de tiempo</div>
                <h3 className="font-heading font-semibold text-lg mb-3">
                  "No tengo tiempo para esto"
                </h3>
                <p className="text-muted-foreground">
                  Entre tu negocio y clientes, dedicar semanas a aprender diseño web 
                  no es una opción. Necesitas algo que funcione YA.
                </p>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation delay={600}>
            <Card className="border border-destructive/20 bg-destructive/5">
              <CardContent className="p-6">
                <div className="text-destructive font-semibold mb-3">🤔 Confusión</div>
                <h3 className="font-heading font-semibold text-lg mb-3">
                  "No sé por dónde empezar"
                </h3>
                <p className="text-muted-foreground">
                  Hosting, diseño, contenido, SEO... hay demasiadas decisiones técnicas 
                  que no entiendes y que te paralizan.
                </p>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>

        {/* Solución */}
        <ScrollAnimation delay={800}>
          <div className="text-center mb-12">
            <div className="inline-block bg-accent/10 text-accent px-6 py-2 rounded-full font-semibold mb-6">
              ✨ LA SOLUCIÓN
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Te saco de todo lo técnico
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Solo necesitas responder preguntas sobre <strong>tu negocio</strong>. 
              La inteligencia artificial se encarga del resto: diseño, contenido, optimización y funcionalidad.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ScrollAnimation delay={1000}>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    Respondes sobre tu negocio
                  </h3>
                  <p className="text-muted-foreground">
                    Qué haces, a quién ayudas, qué problemas resuelves. Sin tecnicismos.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    IA genera tu web completa
                  </h3>
                  <p className="text-muted-foreground">
                    Diseño profesional, contenido persuasivo y estructura optimizada para conversión.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    Personalizamos juntos
                  </h3>
                  <p className="text-muted-foreground">
                    Ajustamos colores, textos e imágenes hasta que refleje perfectamente tu marca.
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={1200}>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                alt="Proceso de creación con IA - Mockup"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </ScrollAnimation>
        </div>

        <ScrollAnimation delay={1400}>
          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold">
              Quiero mi web profesional ahora 🚀
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;