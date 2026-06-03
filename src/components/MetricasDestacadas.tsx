// MetricasDestacadas.tsx
// Banda de metricas con numeros que cuentan al entrar en pantalla,
// estilo creme.digital ("200+", "$25M+"). Adaptado a CrealoconIA.
// Usa tus tokens de color (text-primary, text-foreground, bg-card).

import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";

interface Metrica {
  valor: number;
  sufijo?: string;
  prefijo?: string;
  label: string;
}

const metricas: Metrica[] = [
  { valor: 50, sufijo: "+", label: "Sitios y apps entregados" },
  { valor: 12, sufijo: "+", label: "Negocios con web IA activa" },
  { valor: 4, sufijo: "h", label: "Tiempo de lanzamiento" },
  { valor: 100, sufijo: "%", label: "Construido con IA + humano" },
];

function MetricaItem({ m, index }: { m: Metrica; index: number }) {
  const { ref, value } = useCountUp(m.valor);
  return (
    <motion.div
      className="text-center"
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.7 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 280, damping: 16, delay: index * 0.08 },
        },
      }}
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
        {m.prefijo}
        <span ref={ref as React.RefObject<HTMLSpanElement>}>{value}</span>
        {m.sufijo}
      </div>
      {/* Barra teal que se dibuja debajo del número */}
      <motion.span
        aria-hidden
        className="mx-auto mt-3 block h-[3px] origin-left rounded-full bg-primary"
        initial={{ scaleX: 0, width: "60px" }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 + index * 0.08 }}
      />
      <p className="mt-3 text-sm md:text-base text-muted-foreground">{m.label}</p>
    </motion.div>
  );
}

export default function MetricasDestacadas() {
  return (
    <section className="py-16 md:py-20 bg-card/50 border-y border-border/50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {metricas.map((m, i) => (
            <MetricaItem key={i} m={m} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
