// ComoTrabajamos.tsx — Sticky scroll storytelling + cinta de proyectos.
// El efecto "wow" estilo creme.digital, con tus imagenes reales.
import StickyStory, { type Step } from "@/components/motion/StickyStory";
import Marquee from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";

const pasos: Step[] = [
  {
    eyebrow: "Paso 1 — Capturamos tu esencia",
    title: "Nos cuentas tu negocio",
    body: "Un quiz de 5 minutos y nuestra IA entiende tu marca, tu público y tu propuesta de valor. Sin reuniones eternas.",
    image: "/ejemplos/emontenegroa.png",
  },
  {
    eyebrow: "Paso 2 — Construimos con IA",
    title: "Tu sitio cobra vida en horas",
    body: "Combinamos IA y diseño humano para armar una web profesional, con copy que vende y estructura que convierte.",
    image: "/ejemplos/despliega.png",
  },
  {
    eyebrow: "Paso 3 — Lo ves antes de pagar",
    title: "Primero te encanta, después decides",
    body: "Te mostramos el sitio terminado y funcionando. Si te gusta, es tuyo. Si no, no pagas nada.",
    image: "/ejemplos/totalsport.png",
  },
  {
    eyebrow: "Paso 4 — Escalas con tu equipo IA",
    title: "Marketing automático incluido",
    body: "Te llevas un asistente de IA configurado para generar contenido, campañas y textos de venta para tu negocio.",
    image: "/ejemplos/escala-humana.png",
  },
];

const proyectos = [
  "/ejemplos/despliega.png",
  "/ejemplos/totalsport.png",
  "/ejemplos/doralisa.png",
  "/ejemplos/gatitos-2.png",
  "/ejemplos/escala-humana.png",
  "/ejemplos/rva.png",
  "/ejemplos/briul.png",
  "/ejemplos/emontenegroa.png",
];

export default function ComoTrabajamos() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <Reveal className="text-center mb-20">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Cómo trabajamos
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            De la idea al sitio en 4 pasos
          </h2>
        </Reveal>

        <StickyStory steps={pasos} />
      </div>

      {/* Cinta infinita de proyectos reales — dos filas en direcciones opuestas */}
      <div className="mt-24">
        <Reveal className="text-center mb-10">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Más de 50 proyectos entregados
          </p>
        </Reveal>
        <div className="space-y-6">
          <Marquee duration={45}>
            {proyectos.map((src, i) => (
              <ProyectoCard key={`a-${i}`} src={src} />
            ))}
          </Marquee>
          <Marquee duration={55} reverse>
            {[...proyectos].reverse().map((src, i) => (
              <ProyectoCard key={`b-${i}`} src={src} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

function ProyectoCard({ src }: { src: string }) {
  return (
    <div className="group relative h-44 w-72 shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_25px_60px_-20px_hsl(var(--primary)/0.55)]">
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
    </div>
  );
}
