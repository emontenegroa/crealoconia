import React from 'react';
import { CheckCircle, Users, Zap, ArrowRight, MessageSquare, Globe, Sparkles, Handshake } from 'lucide-react';

// ¿QUÉ ES CREALOCONIA?
export const WhatIsSection = () => {
  return (
    <section className="py-20 bg-secondary/30" aria-labelledby="que-es-crealoconia">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <h2 id="que-es-crealoconia" className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
          ¿Qué es CrealoconIA?
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
          CrealoconIA es una plataforma digital que utiliza inteligencia artificial para ayudar a emprendedores, 
          coaches, terapeutas y pequeñas empresas a crear su sitio web profesional, generar contenido y definir 
          su estrategia digital, con acompañamiento personalizado.
        </p>
      </div>
    </section>
  );
};

// ¿PARA QUIÉN ES?
export const ForWhoSection = () => {
  const audiences = [
    { icon: Users, text: "Emprendedores que no saben por dónde empezar" },
    { icon: MessageSquare, text: "Profesionales independientes: coaches, terapeutas, consultores" },
    { icon: Globe, text: "Pymes que necesitan presencia digital rápida" },
    { icon: Sparkles, text: "Personas que quieren usar IA sin aprender tecnología compleja" },
  ];

  return (
    <section className="py-20 bg-background" aria-labelledby="para-quien-es">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <h2 id="para-quien-es" className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
          ¿Para quién es CrealoconIA?
        </h2>
        <ul className="space-y-6">
          {audiences.map((item, index) => (
            <li key={index} className="flex items-start gap-4 p-4 bg-secondary/50 rounded-xl border border-border">
              <item.icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <span className="text-lg text-foreground">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

// ¿QUÉ INCLUYE?
export const WhatIncludesSection = () => {
  const includes = [
    "Creación de sitio web profesional con IA",
    "Estructura de contenidos clara y orientada a conversión",
    "Textos optimizados para buscadores y motores de IA",
    "Mentoría 1:1 para aplicar IA al negocio",
    "Acompañamiento estratégico en decisiones digitales",
  ];

  return (
    <section className="py-20 bg-secondary/30" aria-labelledby="que-incluye">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <h2 id="que-incluye" className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
          ¿Qué incluye CrealoconIA?
        </h2>
        <ul className="space-y-4">
          {includes.map((item, index) => (
            <li key={index} className="flex items-center gap-4 text-lg text-foreground">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

// ¿CÓMO FUNCIONA?
export const HowItWorksSection = () => {
  const steps = [
    { number: 1, title: "Levantamos tu contexto y objetivo", description: "Entendemos tu negocio, audiencia y metas." },
    { number: 2, title: "Definimos estructura y mensaje clave", description: "Creamos la estrategia de contenido." },
    { number: 3, title: "Creamos el sitio web con IA", description: "Generamos tu sitio profesional en tiempo récord." },
    { number: 4, title: "Ajustamos contenido y diseño", description: "Personalizamos hasta que quede perfecto." },
    { number: 5, title: "Te acompañamos con mentoría", description: "Sesión 1:1 para implementar y optimizar." },
  ];

  return (
    <section className="py-20 bg-background" aria-labelledby="como-funciona">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <h2 id="como-funciona" className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
          ¿Cómo funciona CrealoconIA?
        </h2>
        <ol className="space-y-6">
          {steps.map((step) => (
            <li key={step.number} className="flex items-start gap-6 p-6 bg-secondary/50 rounded-xl border border-border">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl flex-shrink-0">
                {step.number}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

// ¿POR QUÉ CREALOCONIA Y NO UNA AGENCIA?
export const WhyNotAgencySection = () => {
  const reasons = [
    { icon: Zap, title: "No es solo diseño", description: "Es estrategia + IA combinadas." },
    { icon: CheckCircle, title: "No entregamos un sitio", description: "Entregamos claridad sobre tu presencia digital." },
    { icon: Sparkles, title: "No necesitas saber tecnología", description: "Nosotros nos encargamos de todo lo técnico." },
    { icon: Handshake, title: "Acompañamiento real", description: "No solo entrega, mentoría personalizada incluida." },
  ];

  return (
    <section className="py-20 bg-secondary/30" aria-labelledby="por-que-crealoconia">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <h2 id="por-que-crealoconia" className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
          ¿Por qué CrealoconIA y no una agencia tradicional?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <div key={index} className="p-6 bg-background rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-3">
                <reason.icon className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">{reason.title}</h3>
              </div>
              <p className="text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// PREGUNTAS FRECUENTES OPTIMIZADAS PARA IA
export const SEOFAQSection = () => {
  const faqs = [
    {
      question: "¿Necesito saber de tecnología o IA?",
      answer: "No. CrealoconIA está pensada para personas sin conocimientos técnicos."
    },
    {
      question: "¿Cuánto tiempo toma tener el sitio listo?",
      answer: "Dependiendo del alcance, el sitio puede estar operativo en pocos días."
    },
    {
      question: "¿CrealoconIA es solo una página web?",
      answer: "No. Incluye sitio web, contenido y mentoría estratégica."
    },
    {
      question: "¿Sirve para cualquier tipo de negocio?",
      answer: "Está pensada principalmente para emprendedores, profesionales y pymes de servicios."
    },
  ];

  return (
    <section className="py-20 bg-background" aria-labelledby="preguntas-frecuentes">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <h2 id="preguntas-frecuentes" className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
          Preguntas Frecuentes
        </h2>
        <dl className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6 bg-secondary/50 rounded-xl border border-border">
              <dt className="text-lg font-semibold text-foreground mb-2">{faq.question}</dt>
              <dd className="text-muted-foreground">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
