import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ScrollAnimation from '@/components/ScrollAnimation';

const EnhancedFAQSection = () => {
  const faqs = [
    {
      question: "¿Cómo puede la inteligencia artificial ayudarme específicamente con mi negocio?",
      answer: "La IA analiza tu sector, competencia y audiencia para crear contenido personalizado que conecte con tus clientes ideales. No es contenido genérico: entiende tu metodología, tus servicios y cómo comunicar tu valor único. Además, optimiza automáticamente para conversión, usando las mejores prácticas de copywriting y psicología de ventas aplicadas a tu nicho específico."
    },
    {
      question: "¿De qué forma específica puedes mejorar lo que ya estoy haciendo?",
      answer: "Analizo tu situación actual y identifico gaps en tu presencia digital. Si ya tienes web, evalúo qué está funcionando y qué no. Si tienes redes pero no web, creamos coherencia entre ambas. Si estás empezando, construimos desde cero con estrategia. El objetivo es potenciar lo que ya funciona y resolver lo que te está limitando, siempre manteniendo tu esencia pero amplificando tu alcance."
    },
    {
      question: "¿Es muy difícil hacer una página web? ¿Necesito conocimientos técnicos?",
      answer: "Con mi metodología, absolutamente NO. Te saco completamente de lo técnico. Solo necesitas conocer tu negocio y responder preguntas sobre lo que haces. Yo manejo hosting, diseño, programación, optimización, conectar dominios... todo. Tu trabajo es enfocarte en tu expertise mientras yo me encargo de que se vea y funcione profesionalmente."
    },
    {
      question: "¿Puedes capacitarme con herramientas para mejorar mis procesos?",
      answer: "Sí, ofrezco mentorías personalizadas donde te enseño a usar IA en tu día a día: automatizar respuestas a clientes, crear contenido para redes, optimizar procesos internos, generar propuestas comerciales, etc. Te doy las herramientas y templates específicos para tu sector, no teoría general. Al final, eres más eficiente y profesional en todo lo que haces."
    },
    {
      question: "¿Das charlas vía Zoom para ayudarme a vender una solución mediante un MVP?",
      answer: "Exacto. Si tienes una idea de producto o servicio y necesitas validarla, creo contigo un MVP (Producto Mínimo Viable) que puedas mostrar a potenciales clientes o inversores. Incluye la presentación en Zoom donde explicamos juntos la propuesta, demostración funcionanal y estrategia de implementación. Es perfecto para conseguir financiamiento o pre-ventas antes de desarrollar la solución completa."
    },
    {
      question: "¿Qué pasa si no me gusta el resultado inicial?",
      answer: "El proceso incluye revisiones hasta que quedes 100% satisfecho. La IA genera una base sólida, pero siempre la refinamos juntos. Podemos ajustar colores, textos, imágenes, estructura... lo que necesites. No termino el proyecto hasta que sientas que la web te representa perfectamente y cumple tus objetivos comerciales."
    },
    {
      question: "¿Cuánto tiempo toma tener mi web funcionando?",
      answer: "El proceso completo toma entre 48-72 horas. En la primera sesión (2-3 horas) definimos estrategia y la IA genera tu web. Luego tenemos 24-48 horas de refinamiento según tus comentarios. Una vez aprobada, conectamos tu dominio y queda funcionando. Mucho más rápido que métodos tradicionales que toman semanas o meses."
    },
    {
      question: "¿Qué incluye exactamente el servicio?",
      answer: "Incluye: diagnóstico estratégico, creación de super prompt personalizado, generación completa de la web con IA, sesión de personalización contigo, optimización para móviles, formularios funcionales, conexión con tu dominio, capacitación para que puedas hacer cambios básicos, y soporte post-lanzamiento por 30 días. Todo lo necesario para que tengas una web profesional que genere resultados."
    }
  ];

  return (
    <section className="py-20 bg-background" id="faq">
      <div className="container mx-auto px-4 max-w-4xl">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Preguntas frecuentes
            </h2>
            <p className="text-xl text-muted-foreground">
              Estas son las dudas más comunes que tienen profesionales como tú
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={200}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg bg-card"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-heading font-semibold text-lg hover:no-underline hover:bg-muted/50 rounded-t-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default EnhancedFAQSection;