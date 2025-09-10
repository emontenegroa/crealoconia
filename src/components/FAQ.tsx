import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const FAQ = () => {
  return <div className="max-w-4xl mx-auto mt-20">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
        Preguntas frecuentes
      </h2>
      
      <Accordion type="single" collapsible className="space-y-3">
        <AccordionItem value="item-1" className="bg-white border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 text-left font-semibold text-gray-900 hover:no-underline">¿Realmente es gratis?</AccordionTrigger>
          <AccordionContent className="px-4 pb-3 text-gray-700">
            <p>Creamos tu web sin compromiso. Solo pagas $197.000 CLP si decides publicarla.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="bg-white border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 text-left font-semibold text-gray-900 hover:no-underline">¿Cuánto tiempo toma?</AccordionTrigger>
          <AccordionContent className="px-4 pb-3 text-gray-700">
            <p>Tu web estará lista en máximo 4 horas después de completar el formulario.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="bg-white border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 text-left font-semibold text-gray-900 hover:no-underline">¿Es personalizada o una plantilla?</AccordionTrigger>
          <AccordionContent className="px-4 pb-3 text-gray-700">
            <p>100% personalizada para tu negocio. No usamos plantillas genéricas.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="bg-white border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 text-left font-semibold text-gray-900 hover:no-underline">¿Necesito conocimientos técnicos?</AccordionTrigger>
          <AccordionContent className="px-4 pb-3 text-gray-700">
            <p>Cero conocimientos técnicos. Solo completar el formulario.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="text-center mt-6">
        <button className="text-blue-600 hover:text-blue-700 text-sm">
          Ver más preguntas →
        </button>
      </div>
    </div>;
};
export default FAQ;