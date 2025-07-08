import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ScrollAnimation from '@/components/ScrollAnimation';

const ProcessMethodologySection = () => {
  return (
    <section className="py-20 bg-background" id="proceso">
      <div className="container mx-auto px-4 max-w-7xl">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Mi metodología única: <span className="text-primary">AI-Powered Web Creation</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Después de 20+ años en tecnología y centenares de proyectos, he perfeccionado un sistema 
              que combina inteligencia artificial con estrategia de negocio para crear webs que realmente venden.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <ScrollAnimation delay={200}>
            <Card className="border border-primary/20 bg-primary/5 relative overflow-hidden">
              <CardContent className="p-6">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4">
                  1
                </div>
                <h3 className="font-heading font-semibold text-lg mb-3">
                  Diagnóstico Estratégico
                </h3>
                <p className="text-muted-foreground mb-4">
                  Analizo tu negocio, competencia y audiencia para entender qué funciona en tu sector.
                </p>
                <div className="text-sm text-primary font-semibold">
                  🎯 Estrategia personalizada
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation delay={400}>
            <Card className="border border-primary/20 bg-primary/5 relative overflow-hidden">
              <CardContent className="p-6">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4">
                  2
                </div>
                <h3 className="font-heading font-semibold text-lg mb-3">
                  Super Prompt IA
                </h3>
                <p className="text-muted-foreground mb-4">
                  Genero un prompt personalizado que entiende tu negocio y crea contenido específico para tu audiencia.
                </p>
                <div className="text-sm text-primary font-semibold">
                  🤖 IA entrenada en tu nicho
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation delay={600}>
            <Card className="border border-primary/20 bg-primary/5 relative overflow-hidden">
              <CardContent className="p-6">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4">
                  3
                </div>
                <h3 className="font-heading font-semibold text-lg mb-3">
                  Generación Automática
                </h3>
                <p className="text-muted-foreground mb-4">
                  La IA crea tu web completa: diseño, copy persuasivo, estructura optimizada y formularios funcionales.
                </p>
                <div className="text-sm text-primary font-semibold">
                  ⚡ Web lista en minutos
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation delay={800}>
            <Card className="border border-primary/20 bg-primary/5 relative overflow-hidden">
              <CardContent className="p-6">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4">
                  4
                </div>
                <h3 className="font-heading font-semibold text-lg mb-3">
                  Optimización & Lanzamiento
                </h3>
                <p className="text-muted-foreground mb-4">
                  Refinamos juntos, conectamos tu dominio y optimizamos para máxima conversión.
                </p>
                <div className="text-sm text-primary font-semibold">
                  🚀 Web funcionando ya
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>

        {/* Diferenciadores */}
        <ScrollAnimation delay={1000}>
          <div className="bg-accent/10 rounded-3xl p-12">
            <h3 className="text-3xl font-heading font-bold text-center mb-8">
              ¿Qué hace diferente mi metodología?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-accent text-accent-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧠</span>
                </div>
                <h4 className="font-heading font-semibold text-lg mb-2">
                  IA Especializada en Ventas
                </h4>
                <p className="text-muted-foreground">
                  No es solo diseño bonito. La IA está entrenada en copywriting, psicología de ventas y conversión.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-accent text-accent-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="font-heading font-semibold text-lg mb-2">
                  Velocidad Sin Sacrificar Calidad
                </h4>
                <p className="text-muted-foreground">
                  Lo que a una agencia le toma semanas, lo hacemos en una sesión de trabajo contigo.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-accent text-accent-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="font-heading font-semibold text-lg mb-2">
                  Enfoque 100% en Resultados
                </h4>
                <p className="text-muted-foreground">
                  Cada elemento está diseñado para convertir visitantes en clientes, no solo para verse bien.
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ProcessMethodologySection;