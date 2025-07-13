import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollAnimation from '@/components/ScrollAnimation';

const ValuePropositionSection = () => {
  return (
    <section className="py-20 bg-background" id="valor">
      <div className="container mx-auto px-4 max-w-6xl">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold mb-4">
              ⚡ Tu problema real
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              No necesitas una web bonita.<br />
              <span className="text-primary">Necesitas un sistema que venda.</span>
            </h2>
          </div>
        </ScrollAnimation>

        {/* Problemas específicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <ScrollAnimation delay={200}>
            <Card className="border-l-4 border-l-destructive bg-destructive/5">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3 text-destructive">
                  ❌ Lo que NO funciona:
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Webs "bonitas" que no explican nada</li>
                  <li>• Plantillas genéricas sin personalidad</li>
                  <li>• Contenido que NO conecta con tu cliente</li>
                  <li>• Procesos técnicos que te abruman</li>
                </ul>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation delay={400}>
            <Card className="border-l-4 border-l-accent bg-accent/5">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3 text-accent">
                  ✅ Mi enfoque:
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Estrategia</strong> antes que diseño</li>
                  <li>• <strong>Tu voz</strong> amplificada con IA</li>
                  <li>• <strong>Mensaje claro</strong> que convierte</li>
                  <li>• <strong>Proceso simple</strong> para ti</li>
                </ul>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>

        {/* CTA Social Proof */}
        <ScrollAnimation delay={600}>
          <div className="text-center">
            <div className="bg-muted/50 rounded-2xl p-8 max-w-4xl mx-auto">
              <p className="text-lg text-muted-foreground mb-6">
                <span className="font-bold text-foreground">Más de 150 profesionales</span> ya tienen una web que trabaja mientras duermen.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">90%</div>
                  <div className="text-sm text-muted-foreground">Más consultas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">7 días</div>
                  <div className="text-sm text-muted-foreground">Web lista</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Vendiendo</div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="text-lg px-10 py-6 font-bold bg-primary hover:bg-primary/90"
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              >
                💬 Quiero mi llamada estratégica GRATIS
              </Button>
              <p className="text-sm text-muted-foreground mt-3">
                Sin compromiso • Respuesta en 24h • Propuesta personalizada
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ValuePropositionSection;