import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ImprovedFAQ = () => {
  return (
    <div className="max-w-4xl mx-auto mt-20 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        🤔 Preguntas Frecuentes
      </h2>
      
      {/* Precios y Tiempos */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-blue-800 mb-4">💰 Precios y Tiempos</h3>
        <Accordion type="single" collapsible className="space-y-2">
          <AccordionItem value="price-1" className="bg-white border border-gray-200 rounded-lg">
            <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">
              ¿Realmente es gratis?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-700">
              <p><strong>Sí, completamente gratis.</strong> Recibes tu super prompt y una propuesta funcional sin pagar nada.</p>
              <p className="mt-2">Solo pagas $197.000 CLP si decides publicar el sitio en tu dominio personalizado.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price-2" className="bg-white border border-gray-200 rounded-lg">
            <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">
              ¿Cuánto tiempo toma?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-700">
              <p><strong>Super prompt:</strong> Email inmediato</p>
              <p><strong>Sitio web:</strong> Máximo 4 horas</p>
              <p className="mt-2">Trabajamos de lunes a viernes, 9:00 a 18:00 hrs.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price-3" className="bg-white border border-gray-200 rounded-lg">
            <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">
              ¿Qué incluye el precio de $197.000 CLP?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-700">
              <p>✅ Publicación en tu dominio personalizado</p>
              <p>✅ Sesión de personalización (1 hora)</p>
              <p>✅ Configuración técnica completa</p>
              <p>✅ 30 días de soporte incluido</p>
              <p className="mt-2 text-red-600"><strong>No incluye:</strong> Dominio (~$15-25k/año) ni hosting (~$8-15k/mes)</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Personalización y Calidad */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-emerald-800 mb-4">🎨 Personalización y Calidad</h3>
        <Accordion type="single" collapsible className="space-y-2">
          <AccordionItem value="quality-1" className="bg-white border border-gray-200 rounded-lg">
            <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">
              ¿Mi sitio será único o usan plantillas?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-700">
              <p><strong>100% único y personalizado</strong> basado en tus respuestas del formulario.</p>
              <p className="mt-2">Cada sitio se crea desde cero con tu marca, colores, contenido y estructura específica.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="quality-2" className="bg-white border border-gray-200 rounded-lg">
            <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">
              ¿Puedo hacer cambios después?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-700">
              <p><strong>Paquete de 3 cambios:</strong> $20.000 CLP</p>
              <p>Incluye: textos, colores, imágenes, secciones adicionales</p>
              <p className="mt-2">30 días de soporte gratuito para errores técnicos incluido.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="quality-3" className="bg-white border border-gray-200 rounded-lg">
            <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">
              ¿Qué pasa si no me gusta el resultado?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-700">
              <p><strong>Garantía 100%:</strong> Si no te encanta tu sitio, te devolvemos tu dinero o lo ajustamos sin costo.</p>
              <p className="mt-2">Nuestro objetivo es tu completa satisfacción.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Soporte Técnico */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-purple-800 mb-4">🛠️ Soporte Técnico</h3>
        <Accordion type="single" collapsible className="space-y-2">
          <AccordionItem value="tech-1" className="bg-white border border-gray-200 rounded-lg">
            <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">
              ¿Qué pasa si no sé usar ChatGPT?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-700">
              <p>Te enviamos <strong>instrucciones paso a paso súper simples</strong>, incluso si nunca has usado ChatGPT.</p>
              <p className="mt-2">Soporte directo vía email para resolver cualquier duda.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="tech-2" className="bg-white border border-gray-200 rounded-lg">
            <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">
              ¿Cómo manejan mis datos personales?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-700">
              <p>Tus datos están protegidos con encriptación SSL.</p>
              <p>Solo los usamos para crear tu sitio y enviarte las entregas.</p>
              <p className="mt-2"><strong>No enviamos spam</strong> y puedes darte de baja cuando quieras.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="tech-3" className="bg-white border border-gray-200 rounded-lg">
            <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">
              ¿Funciona en móviles?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-700">
              <p><strong>Sí, 100% responsivo.</strong> Tu sitio se verá perfecto en computador, tablet y móvil.</p>
              <p className="mt-2">Optimizado para velocidad y experiencia de usuario.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ImprovedFAQ;