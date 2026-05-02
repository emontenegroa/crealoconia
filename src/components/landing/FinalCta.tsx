import { ArrowRight } from 'lucide-react';

export default function FinalCta({ onCta }: { onCta: () => void }) {
  return (
    <section className="border-t border-border/60">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-28 lg:py-40 text-left">
        <h2 className="reveal font-display font-bold text-4xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight max-w-4xl">
          Cada día sin página profesional es un cliente que fue a otro lado.
        </h2>
        <p className="reveal mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl">
          Ponle fin a eso hoy. En 48 horas ya tienes tu presencia online lista para Google y para clientes.
        </p>

        <button
          onClick={onCta}
          className="reveal group mt-12 inline-flex items-center justify-center h-16 px-9 rounded-md bg-primary text-primary-foreground font-medium text-lg hover:opacity-90 transition-all"
        >
          Quiero empezar ahora
          <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="reveal mt-6 text-sm text-muted-foreground">
          Sin contratos · Sin pagos ocultos · Garantía de satisfacción
        </p>
      </div>
    </section>
  );
}