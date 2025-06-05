
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="max-w-3xl mx-auto mt-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
        Preguntas frecuentes
      </h2>
      
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="item-1" className="border border-emerald-200 rounded-lg px-6 bg-emerald-50/50">
          <AccordionTrigger className="text-left hover:no-underline text-emerald-800 font-semibold">
            ¿Qué incluye exactamente Hazlo con IA?
          </AccordionTrigger>
          <AccordionContent className="text-gray-800 font-medium">
            <div className="space-y-3">
              <p>Hazlo con IA genera para ti:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Los textos base estructurados para tu sitio web profesional.</li>
                <li>Un prompt personalizado para seguir generando contenido en ChatGPT adaptado a tu negocio.</li>
                <li>15 días de contenido inicial para tus redes (posts, reels y stories).</li>
                <li>Y, en base a tus respuestas, generamos la primera versión estructurada de tu sitio web para revisión.</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border border-teal-200 rounded-lg px-6 bg-teal-50/50">
          <AccordionTrigger className="text-left hover:no-underline text-teal-800 font-semibold">
            ¿Cuánto tiempo toma tener mi sitio web listo?
          </AccordionTrigger>
          <AccordionContent className="text-gray-800 font-medium">
            <div className="space-y-3">
              <p>Recibes Hazlo con IA de forma automática apenas completas el formulario.</p>
              <p>Luego, procesamos tus respuestas con inteligencia artificial para construir la primera versión de tu sitio web profesional.</p>
              <p>En la mayoría de los casos el sitio está listo en minutos, aunque en períodos de alta demanda puede demorar hasta un máximo de 4 horas.</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border border-cyan-200 rounded-lg px-6 bg-cyan-50/50">
          <AccordionTrigger className="text-left hover:no-underline text-cyan-800 font-semibold">
            ¿Necesito conocimientos técnicos?
          </AccordionTrigger>
          <AccordionContent className="text-gray-800 font-medium">
            <div className="space-y-3">
              <p>No.</p>
              <p>El sistema está diseñado para que no tengas que manejar ninguna parte técnica.</p>
              <p>Solo completas el formulario con información de tu negocio.</p>
              <p>Nosotros estructuramos, generamos el contenido y construimos la web por ti.</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border border-emerald-200 rounded-lg px-6 bg-emerald-50/50">
          <AccordionTrigger className="text-left hover:no-underline text-emerald-800 font-semibold">
            ¿Puedo hacer cambios después?
          </AccordionTrigger>
          <AccordionContent className="text-gray-800 font-medium">
            <div className="space-y-3">
              <p>Sí.</p>
              <p>Cuando recibas la primera versión de tu sitio web, podrás agendar una reunión personalizada para realizar ajustes finales de:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Textos</li>
                <li>Imágenes</li>
                <li>Secciones adicionales</li>
                <li>Configuración de dominio y detalles de publicación.</li>
              </ul>
              <p>El objetivo es entregarte un sitio completamente ajustado a tu negocio antes de publicarlo.</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="border border-teal-200 rounded-lg px-6 bg-teal-50/50">
          <AccordionTrigger className="text-left hover:no-underline text-teal-800 font-semibold">
            ¿Qué pasa si no tengo Instagram o sitio web actual?
          </AccordionTrigger>
          <AccordionContent className="text-gray-800 font-medium">
            <div className="space-y-3">
              <p>Ningún problema.</p>
              <p>Este sistema está pensado justamente para emprendedores, profesionales y negocios que están comenzando o quieren profesionalizar su presencia digital desde cero.</p>
              <p>Toda la estructura se genera en base a la información que completes en el formulario.</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6" className="border border-cyan-200 rounded-lg px-6 bg-cyan-50/50">
          <AccordionTrigger className="text-left hover:no-underline text-cyan-800 font-semibold">
            ¿Realmente es gratis?
          </AccordionTrigger>
          <AccordionContent className="text-gray-800 font-medium">
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-emerald-700">✅ Sí, Hazlo con IA es totalmente gratuito para generar:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Los textos base de tu sitio.</li>
                  <li>El prompt personalizado para ChatGPT.</li>
                  <li>Los 15 días de contenido inicial para tus redes.</li>
                </ul>
              </div>
              
              <div className="pt-3 border-t border-gray-200">
                <p className="font-semibold text-blue-700">🎯 ¿Y el sitio web?</p>
                <div className="mt-2 space-y-2">
                  <p>Generamos la primera versión estructurada de tu sitio web profesional en base a tus respuestas.</p>
                  <p>Esta etapa no tiene costo y podrás revisarla sin ningún compromiso de compra.</p>
                  <p className="font-medium">👉 Si luego decides avanzar para personalizar, ajustar los detalles finales, configurar tu dominio y dejar el sitio completamente publicado y operativo, aplicamos un pago único por el servicio de publicación profesional.</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
