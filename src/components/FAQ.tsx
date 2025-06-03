
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="max-w-3xl mx-auto mt-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
        Preguntas frecuentes
      </h2>
      
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-6">
          <AccordionTrigger className="text-left hover:no-underline">
            ¿Qué incluye exactamente el Kit IA?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            Tu Kit IA incluye prompts personalizados para ChatGPT que generan contenido para redes sociales (15 días), textos completos para tu sitio web, y un segundo prompt para construir automáticamente tu web en Lovable.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-6">
          <AccordionTrigger className="text-left hover:no-underline">
            ¿Cuánto tiempo toma tener mi sitio web listo?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            Recibes el Kit IA inmediatamente después de completar el formulario. Tu sitio web estará listo en 24-48 horas, 95% terminado y funcionando.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-6">
          <AccordionTrigger className="text-left hover:no-underline">
            ¿Necesito conocimientos técnicos?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            No. Nosotros nos encargamos de toda la parte técnica. Solo necesitas completar el formulario con información sobre tu negocio y nosotros hacemos el resto.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-6">
          <AccordionTrigger className="text-left hover:no-underline">
            ¿Puedo hacer cambios después?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            Sí. Una vez que recibas tu sitio web, puedes solicitar una reunión para ajustes finales. El Kit IA también te permite generar contenido nuevo cuando lo necesites.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-6">
          <AccordionTrigger className="text-left hover:no-underline">
            ¿Qué pasa si no tengo Instagram o sitio web actual?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            No hay problema. El formulario está diseñado para emprendedores que están comenzando. Podemos crear todo desde cero basándonos en la información que nos proporciones.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6" className="border border-gray-200 rounded-lg px-6">
          <AccordionTrigger className="text-left hover:no-underline">
            ¿Realmente es gratis?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            Sí, el Kit IA es completamente gratis. Es nuestro lead magnet para demostrar el valor que podemos entregar. No hay costos ocultos para recibir tu Kit IA personalizado.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
