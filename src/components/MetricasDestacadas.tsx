// MetricasDestacadas.tsx
// Banda de metricas con numeros que cuentan al entrar en pantalla,
// estilo creme.digital ("200+", "$25M+"). Adaptado a CrealoconIA.
// Usa tus tokens de color (text-primary, text-foreground, bg-card).

import { useCountUp } from "@/hooks/useCountUp";
import { useScrollRevealGroup } from "@/hooks/useScrollReveal";

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

function MetricaItem({ m }: { m: Metrica }) {
  const { ref, value } = useCountUp(m.valor);
  return (
    <div className="reveal text-center">
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
        {m.prefijo}
        <span ref={ref as React.RefObject<HTMLSpanElement>}>{value}</span>
        {m.sufijo}
      </div>
      <p className="mt-2 text-sm md:text-base text-muted-foreground">{m.label}</p>
    </div>
  );
}

export default function MetricasDestacadas() {
  const groupRef = useScrollRevealGroup<HTMLDivElement>(0.12);

  return (
    <section className="py-16 md:py-20 bg-card/50 border-y border-border/50">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          ref={groupRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
        >
          {metricas.map((m, i) => (
            <MetricaItem key={i} m={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
