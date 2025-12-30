import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Zap, Briefcase } from "lucide-react";

const QuienSoy = () => {
  return (
    <section className="py-24 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                Sobre el fundador
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Hola, soy Esteban Montenegro
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Llevo más de 20 años trabajando con tecnología y me he especializado 
                en Inteligencia Artificial aplicada a negocios.
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-foreground leading-relaxed">
                He visto cómo muchas personas se frustran al intentar crear su página web. 
                Se pierden en tecnicismos, gastan tiempo y dinero sin obtener los resultados esperados.
              </p>
              
              <p className="text-foreground leading-relaxed">
                Por eso creé <span className="font-semibold text-primary">CrealoconIA.com</span> — un sistema 
                que combina experiencia estratégica con inteligencia artificial para entregar 
                resultados profesionales en tiempo récord.
              </p>
            </div>

            {/* What we build */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="font-semibold text-foreground mb-6">Sistemas que construimos:</h3>
              
              <div className="space-y-4">
                {[
                  { title: "Páginas de marca personal", desc: "Tu experiencia, programas, sesiones y servicios presentados con estrategia." },
                  { title: "Páginas de embudo", desc: "Landing pages, páginas de captura y agradecimiento optimizadas para conversión." },
                  { title: "Páginas corporativas", desc: "Clínicas, estudios, centros deportivos, servicios profesionales." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium text-foreground">{item.title}</span>
                      <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Metrics */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <Award className="w-8 h-8" />, value: "24h", label: "Tiempo de entrega" },
                { icon: <Users className="w-8 h-8" />, value: "50+", label: "Proyectos completados" },
                { icon: <Zap className="w-8 h-8" />, value: "100%", label: "Potenciado con IA" },
                { icon: <Briefcase className="w-8 h-8" />, value: "1:1", label: "Mentoría incluida" }
              ].map((metric, i) => (
                <Card key={i} className="bg-card border border-border hover:border-primary/30 transition-colors">
                  <CardContent className="p-8 text-center">
                    <div className="text-primary mb-4 flex justify-center">{metric.icon}</div>
                    <div className="text-3xl font-bold text-foreground mb-1">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-primary/5 border border-primary/20">
              <CardContent className="p-8">
                <h4 className="font-semibold text-foreground mb-6">Enfoque diferencial:</h4>
                <ul className="space-y-4">
                  {[
                    "Textos generados con estrategia de marketing integrada",
                    "Proceso rápido y guiado (sin abandonos)",
                    "Acompañamiento personalizado incluido"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuienSoy;
