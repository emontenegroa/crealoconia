import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ImprovedFAQ = () => {
  return (
    <div className="max-w-4xl mx-auto mt-20 px-4">
      <h2 className="text-3xl font-bold text-center text-foreground mb-12">
        Preguntas Frecuentes sobre CrealoconIA 🤔
      </h2>
      
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="que-es" className="bg-card border border-border rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:no-underline">
            ¿Qué es CrealoconIA y cómo funciona?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-muted-foreground">
            <p><strong>CrealoconIA es una plataforma que crea sitios web profesionales usando inteligencia artificial en 24 horas.</strong> Completas un formulario de 10 preguntas sobre tu negocio, tu audiencia y tus servicios. Con esa información, nuestro sistema genera tu sitio web completo con textos optimizados para conversión.</p>
            <p className="mt-2">Por ejemplo, si eres coach de vida, generamos una web con tu propuesta de valor, testimonios, servicios y un llamado a la acción claro — todo listo para publicar.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="precio" className="bg-card border border-border rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:no-underline">
            ¿Cuánto cuesta crear un sitio web con CrealoconIA en Chile?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-muted-foreground">
            <p><strong>El precio es de $390.000 CLP como pago único, sin suscripciones mensuales.</strong> Esto incluye tu sitio web profesional publicado, dominio .com o .cl, hosting por 2 años completos, asistente IA personalizado y mentoría 1:1 con Esteban Montenegro.</p>
            <p className="mt-2">Comparado con una agencia tradicional que cobra entre $800.000 y $2.000.000 CLP y tarda semanas, CrealoconIA entrega en 24 horas a una fracción del costo.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tecnologia" className="bg-card border border-border rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:no-underline">
            ¿Necesito saber de tecnología o inteligencia artificial?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-muted-foreground">
            <p><strong>No necesitas ningún conocimiento técnico.</strong> Solo respondes 10 preguntas sobre tu negocio de forma natural, como si conversaras con alguien. Nosotros nos encargamos de todo: diseño, textos, configuración técnica y publicación.</p>
            <p className="mt-2">Incluso puedes dictar tus respuestas por voz si prefieres no escribir. Nuestros clientes van desde coaches hasta abogados, y ninguno tenía experiencia técnica previa.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tiempo" className="bg-card border border-border rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:no-underline">
            ¿Cuánto tiempo toma tener mi sitio web listo?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-muted-foreground">
            <p><strong>En 24 horas máximo tienes tu propuesta de sitio web completa para revisar.</strong> Si decides publicar, la configuración final con dominio propio y hosting toma unas horas adicionales, que coordinamos durante la mentoría.</p>
            <p className="mt-2">Por ejemplo, una nutricionista completó el quiz un lunes a las 10am y el martes a mediodía ya estaba revisando su sitio terminado con nosotros.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="para-quien" className="bg-card border border-border rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:no-underline">
            ¿Para qué tipo de profesionales o negocios sirve CrealoconIA?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-muted-foreground">
            <p><strong>CrealoconIA está diseñada para emprendedores, profesionales independientes y pymes de servicios.</strong> Funciona especialmente bien para coaches, terapeutas, psicólogos, abogados, consultores, nutricionistas, freelancers y negocios locales.</p>
            <p className="mt-2">Ya hemos creado sitios para coaches ontológicas, abogadas de compliance, productoras de eventos, escuelas online y hasta una repostería artesanal. Si vendes un servicio, CrealoconIA funciona para ti.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="dominio" className="bg-card border border-border rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:no-underline">
            ¿Es necesario comprar un dominio para alojar la página?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-muted-foreground">
            <p><strong>No es obligatorio que lo compres tú.</strong> El dominio lo puedes comprar directamente o nosotros nos encargamos de la compra y configuración completa.</p>
            <p className="mt-2">Te recomendamos proveedores confiables y económicos como NIC Chile para .cl o Namecheap para .com, para que tengas las mejores opciones según tu marca.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="whatsapp" className="bg-card border border-border rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:no-underline">
            ¿Se puede vincular mi sitio web con WhatsApp?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-muted-foreground">
            <p><strong>Sí, configuramos botones de WhatsApp integrados en tu sitio web.</strong> Tus clientes pueden contactarte directamente desde cualquier parte de tu página con un solo clic, enviando un mensaje predefinido a tu número de WhatsApp.</p>
            <p className="mt-2">Esto es clave para profesionales de servicios: cuando alguien visita tu web y quiere saber más, el contacto es inmediato.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="garantia" className="bg-card border border-border rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:no-underline">
            ¿Qué pasa si no me gusta el resultado del sitio web?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-muted-foreground">
            <p><strong>La propuesta inicial es 100% gratuita — primero ves tu sitio terminado y solo pagas si te gusta.</strong> Es un modelo sin riesgo: si no te convence el resultado, no pagas absolutamente nada.</p>
            <p className="mt-2">Si decides publicar y quieres ajustes, los resolvemos durante la mentoría 1:1 hasta que tu sitio quede perfecto para ti y tu negocio.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="modificaciones" className="bg-card border border-border rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:no-underline">
            ¿Se puede modificar la estructura y textos después de publicar?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-muted-foreground">
            <p><strong>Sí, incluimos una mentoría personalizada 1:1 para realizar modificaciones.</strong> Durante la sesión con Esteban ajustamos textos, estructura, imágenes y cualquier detalle que necesites cambiar.</p>
            <p className="mt-2">También ofrecemos paquetes de cambios adicionales cuando necesites actualizar tu contenido en el futuro.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="agencia" className="bg-card border border-border rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:no-underline">
            ¿Por qué CrealoconIA y no una agencia de diseño web tradicional?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-muted-foreground">
            <p><strong>CrealoconIA combina inteligencia artificial con estrategia de marketing, algo que las agencias tradicionales no hacen.</strong> No solo entregamos un sitio bonito: entregamos textos que convierten, estructura optimizada para ventas, y mentoría personalizada.</p>
            <p className="mt-2">Una agencia tradicional cobra entre $800.000 y $2.000.000 CLP, tarda semanas y te entrega un sitio sin estrategia de conversión. Con CrealoconIA tienes todo en 24 horas por $390.000 CLP.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ia-porque" className="bg-card border border-border rounded-lg">
          <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:no-underline">
            ¿Por qué usan inteligencia artificial para crear sitios web?
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 text-muted-foreground">
            <p><strong>La IA nos permite crear sitios web profesionales en tiempo récord, con textos optimizados y estructura inteligente.</strong> Combinamos la velocidad de la tecnología con más de 20 años de experiencia de Esteban Montenegro en tecnología y marketing.</p>
            <p className="mt-2">El resultado: un sitio que no solo se ve profesional, sino que está diseñado para convertir visitantes en clientes.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ImprovedFAQ;
