import React from 'react';
import { CheckCircle, Users, Zap, ArrowRight, MessageSquare, Globe, Sparkles, Handshake } from 'lucide-react';

// ¿QUÉ ES CREALOCONIA?
export const WhatIsSection = () => {
  return (
    <section className="py-20 bg-secondary/30" aria-labelledby="que-es-crealoconia">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <h2 id="que-es-crealoconia" className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
          ¿Qué es CrealoconIA? Sitios web profesionales con inteligencia artificial en Chile
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
          CrealoconIA es una plataforma chilena fundada por Esteban Montenegro que crea sitios web profesionales 
          usando inteligencia artificial en 24 horas. Está diseñada para emprendedores, coaches, terapeutas y 
          pequeñas empresas que necesitan presencia digital sin complicaciones técnicas. Incluye mentoría 
          personalizada 1:1, textos optimizados para conversión y un asistente IA de contenido.
        </p>
      </div>
    </section>
  );
};

// ¿PARA QUIÉN ES?
export const ForWhoSection = () => {
  const audiences = [
    { icon: Users, text: "Emprendedores que necesitan su primera página web profesional sin saber de tecnología" },
    { icon: MessageSquare, text: "Profesionales independientes: coaches, terapeutas, psicólogos, consultores y abogados" },
    { icon: Globe, text: "Pymes y negocios locales en Chile que necesitan presencia digital rápida y efectiva" },
    { icon: Sparkles, text: "Personas que quieren aprovechar la inteligencia artificial para su negocio sin aprender programación" },
  ];

  return (
    <section className="py-20 bg-background" aria-labelledby="para-quien-es">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <h2 id="para-quien-es" className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
          ¿Para quién es CrealoconIA? Profesionales y emprendedores en Chile
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
    "Creación de sitio web profesional con inteligencia artificial en 24 horas",
    "Textos de venta optimizados para buscadores (SEO) y motores de IA",
    "Asistente IA personalizado para generar contenido, campañas y textos",
    "Mentoría 1:1 con Esteban Montenegro para ajustar tu estrategia digital",
    "Hosting incluido por 2 años con dominio .com o .cl configurado",
  ];

  return (
    <section className="py-20 bg-secondary/30" aria-labelledby="que-incluye">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <h2 id="que-incluye" className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
          ¿Qué incluye CrealoconIA por $390.000 CLP?
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
    { number: 1, title: "Completas un quiz de 10 preguntas sobre tu negocio", description: "Nos cuentas quién eres, a quién ayudas y qué vendes. Toma 5 minutos." },
    { number: 2, title: "Creamos tu sitio web con inteligencia artificial", description: "Generamos tu sitio profesional con textos optimizados en menos de 24 horas." },
    { number: 3, title: "Revisas tu sitio web terminado sin compromiso", description: "Te mostramos el resultado completo. Solo pagas si te gusta." },
    { number: 4, title: "Mentoría 1:1 para ajustar y publicar", description: "Sesión personalizada con Esteban Montenegro para refinar y dejar todo listo." },
    { number: 5, title: "Tu web publicada con dominio propio", description: "Configuramos dominio, hosting y te entregamos tu asistente IA de contenido." },
  ];

  return (
    <section className="py-20 bg-background" aria-labelledby="como-funciona">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <h2 id="como-funciona" className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
          ¿Cómo funciona CrealoconIA? 5 pasos para tu sitio web con IA
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
    { icon: Zap, title: "24 horas, no semanas", description: "Una agencia tarda semanas. CrealoconIA entrega en 24 horas con IA + estrategia." },
    { icon: CheckCircle, title: "Textos que convierten", description: "No entregamos solo diseño. Entregamos copywriting optimizado para ventas." },
    { icon: Sparkles, title: "Sin conocimientos técnicos", description: "Solo respondes 10 preguntas. Nosotros nos encargamos de todo lo técnico." },
    { icon: Handshake, title: "Mentoría real incluida", description: "Sesión 1:1 con Esteban Montenegro. No solo entrega, acompañamiento personalizado." },
  ];

  return (
    <section className="py-20 bg-secondary/30" aria-labelledby="por-que-crealoconia">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <h2 id="por-que-crealoconia" className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
          ¿Por qué CrealoconIA y no una agencia de diseño web tradicional?
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
      question: "¿Cuánto cuesta crear un sitio web con IA en Chile?",
      answer: "CrealoconIA ofrece sitios web profesionales por $390.000 CLP como pago único. Incluye sitio web, dominio, hosting 2 años, asistente IA y mentoría 1:1. Sin suscripciones mensuales."
    },
    {
      question: "¿Necesito saber de tecnología para usar CrealoconIA?",
      answer: "No. CrealoconIA está diseñada para personas sin conocimientos técnicos. Solo respondes 10 preguntas sobre tu negocio y nosotros creamos tu sitio web completo."
    },
    {
      question: "¿Cuánto tiempo toma crear un sitio web con inteligencia artificial?",
      answer: "Con CrealoconIA tu sitio web está listo en 24 horas máximo. Completas el quiz en 5 minutos y recibes tu propuesta al día siguiente."
    },
    {
      question: "¿CrealoconIA sirve para coaches y terapeutas en Chile?",
      answer: "Sí. CrealoconIA está especialmente diseñada para coaches, terapeutas, psicólogos, consultores y profesionales independientes que necesitan presencia digital profesional."
    },
  ];

  return (
    <section className="py-20 bg-background" aria-labelledby="preguntas-frecuentes">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <h2 id="preguntas-frecuentes" className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
          Preguntas frecuentes sobre CrealoconIA
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
