import React from 'react';
import { Button } from '@/components/ui/button';
import ScrollAnimation from '@/components/ScrollAnimation';

// Sección 1: Crear tu página con IA
const CrearWebSection = () => (
  <section className="py-20 bg-muted/20">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Crear tu página con IA
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Transforma tu idea en una web profesional con inteligencia artificial. 
            Sin código, sin complicaciones. En minutos tendrás una presencia digital 
            que impresiona y convierte visitantes en clientes.
          </p>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-full"
          >
            Comenzar ahora
          </Button>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop"
            alt="Crear página web con IA"
            className="rounded-2xl shadow-2xl w-full"
          />
        </div>
      </div>
    </div>
  </section>
);

// Sección 2: Consultoría Empresarial
const ConsultoriaSection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative order-2 lg:order-1">
          <img 
            src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop"
            alt="Consultoría empresarial"
            className="rounded-2xl shadow-2xl w-full"
          />
        </div>
        <div className="space-y-6 order-1 lg:order-2">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Consultoría Empresarial
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            20+ años de experiencia liderando equipos y transformando empresas. 
            Diagnóstico estratégico, implementación digital y ROI medible para 
            llevar tu negocio al siguiente nivel.
          </p>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-full"
          >
            Solicitar consulta
          </Button>
        </div>
      </div>
    </div>
  </section>
);

// Sección 3: IA para Negocios
const IANegociosSection = () => (
  <section className="py-20 bg-muted/20">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            IA para Negocios
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Automatización inteligente de procesos y análisis predictivo. 
            Integración práctica de inteligencia artificial que realmente 
            impacta en la eficiencia y rentabilidad de tu negocio.
          </p>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-full"
          >
            Explorar IA
          </Button>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop"
            alt="IA para negocios"
            className="rounded-2xl shadow-2xl w-full"
          />
        </div>
      </div>
    </div>
  </section>
);

// Componente principal que agrupa todas las secciones
const ServicesSection = () => {
  return (
    <>
      <ScrollAnimation>
        <CrearWebSection />
      </ScrollAnimation>
      <ScrollAnimation delay={200}>
        <ConsultoriaSection />
      </ScrollAnimation>
      <ScrollAnimation delay={400}>
        <IANegociosSection />
      </ScrollAnimation>
      
      {/* Help section */}
      <ScrollAnimation delay={600}>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center bg-muted/30 rounded-3xl p-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                ¿Necesitas ayuda para elegir?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Responde unas preguntas para encontrar la mejor solución para ti.
              </p>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-full"
              >
                Empezar ✨
              </Button>
            </div>
          </div>
        </section>
      </ScrollAnimation>
    </>
  );
};

export default ServicesSection;