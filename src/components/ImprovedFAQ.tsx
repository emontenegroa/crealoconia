import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ImprovedFAQ = () => {
  return (
    <div className="max-w-4xl mx-auto mt-20 px-4">
      <h2 className="text-3xl font-bold text-center text-foreground mb-12">
        Dudas Frecuentes sobre CrealoconIA 🤔
      </h2>
      
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="dominio" className="bg-card border border-border rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:no-underline">
            ¿Es necesario comprar un dominio para alojar la página?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-muted-foreground">
            <p>No es obligatorio. El dominio lo puede comprar el cliente directamente o nosotros nos encargamos de la compra y configuración.</p>
            <p className="mt-2">Te recomendamos proveedores confiables y económicos para que tengas las mejores opciones.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="whatsapp" className="bg-card border border-border rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:no-underline">
            ¿Se puede vincular con WhatsApp?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-muted-foreground">
            <p><strong>Sí, absolutamente.</strong> Configuramos botones de WhatsApp integrados para que tus clientes puedan contactarte directamente desde cualquier parte de tu página web de forma inmediata.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="modificaciones" className="bg-card border border-border rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:no-underline">
            ¿Se puede modificar la estructura y textos después?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-muted-foreground">
            <p><strong>Por supuesto.</strong> Incluimos una mentoría personalizada 1 a 1 para realizar modificaciones al sitio que creamos.</p>
            <p className="mt-2">También ofrecemos paquetes de cambios adicionales cuando los necesites.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="engorroso" className="bg-card border border-border rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:no-underline">
            El crear una página web me resultó muy engorroso en el pasado
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-muted-foreground">
            <p><strong>Lo entendemos perfectamente</strong> - es la frustración #1 de nuestros clientes.</p>
            <p className="mt-2">Por eso creamos CrealoconIA: solo respondes 10 preguntas y nosotros nos encargamos de todo lo técnico. Nada de procesos engorrosos ni información que se copia y pega sin dinamismo.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="precio" className="bg-card border border-border rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:no-underline">
            ¿Qué incluye exactamente el precio de $197.000 CLP?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-muted-foreground">
            <p>✅ Página web publicada con tu dominio .com o .cl</p>
            <p>✅ Mentoría personalizada 1 a 1 para mejoras</p>
            <p>✅ Hosting incluido por 2 años completos</p>
            <p>✅ Configuración técnica completa</p>
            <p>✅ Soporte técnico incluido</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tiempo" className="bg-card border border-border rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:no-underline">
            ¿Realmente entregan en 24 horas?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-muted-foreground">
            <p><strong>Sí, creamos la página web con inteligencia artificial en tiempo récord.</strong></p>
            <p className="mt-2">En 24 horas máximo tienes tu propuesta completa para revisar. Si decides publicar, la configuración final toma unas horas adicionales.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="garantia" className="bg-card border border-border rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:no-underline">
            ¿Qué pasa si no me gusta el resultado?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-muted-foreground">
            <p><strong>La propuesta inicial es 100% gratuita</strong>, así que no hay riesgo.</p>
            <p className="mt-2">Si decides publicar y no quedas satisfecho, resolvemos dudas técnicas y de diseño del sitio hasta que esté perfecto para ti.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ia" className="bg-card border border-border rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:no-underline">
            ¿Por qué usan inteligencia artificial?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-muted-foreground">
            <p><strong>La IA nos permite crear páginas web profesionales en tiempo récord</strong>, con textos optimizados, estructura inteligente y diseño moderno.</p>
            <p className="mt-2">Combinamos la velocidad de la tecnología con nuestra experiencia en conversión.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ImprovedFAQ;