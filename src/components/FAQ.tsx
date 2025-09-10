import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const FAQ = () => {
  return <div className="max-w-4xl mx-auto mt-20">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        🤔 Preguntas frecuentes
      </h2>
      
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="item-1" className="bg-white border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">¿Realmente es gratis? </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-gray-700">
            <p className="mb-3">
              Lo que hacemos es seleccionar algunos proyectos y crearles una propuesta 100% funcional de su sitio web, lista para revisar y evaluar sin compromiso.
            </p>
            <p className="mb-3">
              👉 Si el sitio te convence y quieres publicarlo, avanzamos con una sesión de modificación y actualización para dejarlo afinado a tus necesidades.
            </p>
            <p>
              Esa sesión, junto con la publicación de tu sitio en un dominio propio .com o .cl, tiene un valor de $197.000 CLP.
              <br />
              <span className="text-sm text-gray-600">(El valor no incluye el costo del dominio, ya que depende de la extensión y proveedor que elijas).</span>
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="bg-white border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">
            ¿Qué pasa si no sé usar ChatGPT?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-gray-700">
            <p className="mb-3">
              Te envío <strong>instrucciones paso a paso súper simples</strong> para usar tu Super Prompt IA, 
              incluso si nunca has usado ChatGPT antes.
            </p>
            <p>
              Además, tienes soporte directo via email para resolver cualquier duda.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="bg-white border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">
            ¿Mi sitio web será único o usarán una plantilla?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-gray-700">
            <p className="mb-3">
              <strong>Tu sitio web es 100% único y personalizado</strong> basado en tus respuestas del formulario.
            </p>
            <p>
              No uso plantillas genéricas. Cada sitio se genera específicamente para tu negocio, 
              tu audiencia y tus objetivos de venta.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="bg-white border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">
            ¿Cuánto tiempo tengo que esperar para recibir todo?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-gray-700">
            <ul className="space-y-2">
              <li><strong>Super Prompt IA para ChatGPT:</strong> Inmediato en tu email</li>
              <li><strong>Sitio web funcionando:</strong> Máximo 4 horas</li>
              <li><strong>Soporte y ajustes:</strong> Disponible desde el primer día</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="bg-white border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">
            ¿Funcionará para mi tipo de negocio específico?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-gray-700">
            <p className="mb-3">
              <strong>Sí, funciona para cualquier negocio de servicios profesionales:</strong> 
              coaches, consultores, terapeutas, freelancers, agencias, productos digitales, etc.
            </p>
            <p>
              El sistema se personaliza 100% según tu nicho, audiencia y modelo de negocio.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6" className="bg-white border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">
            ¿Qué pasa si no me gusta el resultado?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-gray-700">
            <p className="mb-3">
              <strong>Simple: lo arreglamos hasta que quedes 100% satisfecho.</strong>
            </p>
            <p>
              Mi compromiso es entregarte herramientas que realmente funcionen para tu negocio. 
              Si algo no está perfecto, trabajamos juntos para mejorarlo.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7" className="bg-white border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">
            ¿Necesito conocimientos técnicos?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-gray-700">
            <p className="mb-3">
              <strong>Cero conocimientos técnicos necesarios.</strong>
            </p>
            <p>
              Solo necesitas saber copiar y pegar en ChatGPT. Todo lo demás está automatizado 
              y viene con instrucciones súper simples.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8" className="bg-white border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">
            ¿Qué pasa si quiero modificar mi sitio después?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-gray-700">
            <p className="mb-3">
              Sabemos que en el tiempo vas a querer actualizar textos o imágenes. Para eso ofrecemos un servicio personalizado: nos indicas qué se debe modificar y nosotros lo hacemos por ti.
            </p>
            <p className="mb-3">
              Además, te damos recomendaciones estratégicas sobre cómo presentar la información para que tu sitio siempre luzca profesional y efectivo.
            </p>
            <p className="mb-3">
              <strong>Este servicio funciona mediante paquetes de cambios:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 mb-3">
              <li>Compras un paquete de 3 cambios por $20.000 CLP.</li>
              <li>Puedes usarlos cuando quieras, sin límite de tiempo, siempre que tu sitio esté activo.</li>
            </ul>
            <p>
              Así tienes la tranquilidad de mantener tu web actualizada y optimizada sin complicarte con lo técnico.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>;
};
export default FAQ;