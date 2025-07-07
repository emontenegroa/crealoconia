import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ScrollAnimation from '@/components/ScrollAnimation';

const AboutSection = () => {
  const features = [
    {
      emoji: "🎯",
      title: "¿Qué hacemos?",
      items: [
        "Sitios web profesionales que representan tu esencia",
        "Landing pages que convierten visitas en acciones", 
        "MVPs y POCs para validar ideas o postular a fondos como CORFO",
        "Digitalización completa de servicios o marcas personales",
        "Mentoría estratégica para ordenar ideas, planificar lanzamientos o crear un modelo de negocio claro"
      ]
    },
    {
      emoji: "🧠",
      title: "¿A quién está dirigido?",
      items: [
        "Emprendedores y profesionales que ofrecen servicios (coaches, terapeutas, abogados, consultores)",
        "Empresas o pymes que quieren dejar de improvisar su digitalización",
        "Personas que ayudan a otras personas… y que también necesitan ayuda digital experta"
      ]
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-muted/20 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-primary mb-8">
              ¿Qué es Crealoconia?
            </h2>
            <div className="max-w-4xl mx-auto space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              <p className="font-body text-xl md:text-2xl">
                Crealoconia es una agencia digital asistida por inteligencia artificial, liderada por Esteban Montenegro, que transforma tus conocimientos y servicios en productos digitales funcionales, profesionales y potentes.
              </p>
              <p className="font-body">
                No necesitas saber de tecnología, diseño, copywriting ni sistemas técnicos.<br />
                Solo necesitas tener claro qué haces y qué ofreces. Nosotros nos encargamos de que se vea genial.
              </p>
              <p className="font-body">
                Con una metodología propia, usamos IA, estrategia y experiencia real para ayudarte a posicionarte, vender, postular, optimizar y crecer.
              </p>
            </div>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {features.map((feature, index) => (
            <ScrollAnimation key={index} delay={index * 200}>
              <Card className="glass-effect border-accent/20 hover:border-accent/40 transition-all duration-500 group h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl">{feature.emoji}</div>
                    <h3 className="font-heading text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                      {feature.title}
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3 text-muted-foreground">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                        <span className="font-body leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation delay={400}>
          <Card className="glass-effect border-accent/30 hover:border-accent/50 transition-all duration-500 group">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="text-4xl mb-6">🔍</div>
              <h3 className="font-heading text-3xl font-bold text-primary mb-6 group-hover:text-accent transition-colors duration-300">
                ¿Por qué Crealoconia?
              </h3>
              <div className="space-y-4 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                <p className="font-body font-semibold">
                  Porque no usamos plantillas ni fórmulas genéricas.
                </p>
                <p className="font-body">
                  Creamos contigo. Pensamos contigo. Ejecutamos contigo.
                </p>
                <p className="font-body text-primary font-semibold text-xl md:text-2xl">
                  Este no es solo un servicio web:<br />
                  Es una experiencia de claridad digital, con inteligencia artificial y acompañamiento humano experto.
                </p>
              </div>
            </CardContent>
          </Card>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default AboutSection;