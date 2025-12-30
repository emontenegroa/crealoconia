import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Brain, Users, ArrowRight } from "lucide-react";

const Metodologia = () => {
  const scrollToForm = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    setTimeout(() => {
      const inputs = document.querySelectorAll('input[name="marca"], input[name="email"]');
      inputs.forEach(input => {
        const element = input as HTMLElement;
        element.style.animation = 'pulse 1s ease-in-out 2';
        element.style.boxShadow = '0 0 20px hsl(var(--primary) / 0.3)';

        setTimeout(() => {
          element.style.animation = '';
          element.style.boxShadow = '';
        }, 2000);
      });
    }, 800);
  };

  const capas = [
    {
      numero: "01",
      icono: <Globe className="w-10 h-10" />,
      titulo: "Sitios Web Estratégicos",
      subtitulo: "Conversión",
      descripcion: "No es solo diseño bonito. Arquitectura de información, copywriting persuasivo y UX optimizado para convertir visitantes en clientes.",
      beneficios: ["Estructura de alta conversión", "Copywriting estratégico", "Diseño orientado a resultados"]
    },
    {
      numero: "02",
      icono: <Brain className="w-10 h-10" />,
      titulo: "Mensajes Comerciales con IA",
      subtitulo: "Autoridad",
      descripcion: "Inteligencia artificial entrenada con tu marca para generar contenido que posiciona, persuade y vende. Tu voz, amplificada.",
      beneficios: ["Contenido personalizado", "Mensajes de alto impacto", "Posicionamiento de autoridad"]
    },
    {
      numero: "03",
      icono: <Users className="w-10 h-10" />,
      titulo: "Acompañamiento Estratégico",
      subtitulo: "Escalabilidad",
      descripcion: "Mentoría 1:1 para implementar, optimizar y escalar. No te dejamos solo con un sitio web, te acompañamos en el crecimiento.",
      beneficios: ["Mentoría personalizada", "Optimización continua", "Estrategia de crecimiento"]
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Nuestro Sistema
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Las 3 Capas que Transforman
            <br />
            tu Negocio Digital
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un sistema integrado donde cada capa potencia a la siguiente, 
            creando un motor de adquisición de clientes imparable.
          </p>
        </div>

        {/* Capas Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {capas.map((capa, index) => (
            <Card 
              key={index} 
              className="group relative bg-card border border-border hover:border-primary/30 transition-all duration-500 overflow-hidden"
            >
              {/* Accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardContent className="p-8 lg:p-10">
                {/* Number & Icon */}
                <div className="flex items-start justify-between mb-8">
                  <span className="text-6xl font-bold text-border group-hover:text-primary/20 transition-colors duration-500">
                    {capa.numero}
                  </span>
                  <div className="p-4 bg-secondary rounded-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    {capa.icono}
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {capa.subtitulo}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mt-1">
                      {capa.titulo}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {capa.descripcion}
                  </p>
                  
                  {/* Benefits */}
                  <ul className="space-y-2 pt-4 border-t border-border">
                    {capa.beneficios.map((beneficio, i) => (
                      <li key={i} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                        {beneficio}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center p-10 bg-secondary/50 rounded-3xl border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              ¿Listo para instalar tu sistema de crecimiento?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md">
              Agenda una consultoría estratégica y descubre cómo podemos 
              transformar tu presencia digital.
            </p>
            <Button 
              onClick={scrollToForm} 
              size="lg" 
              className="h-14 px-10 bg-foreground hover:bg-foreground/90 text-background rounded-xl font-semibold transition-all duration-300"
            >
              Aplicar ahora
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Metodologia;
