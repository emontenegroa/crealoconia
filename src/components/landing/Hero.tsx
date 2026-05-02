import { ArrowRight } from 'lucide-react';

export default function Hero({ onPrimary }: { onPrimary: () => void }) {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-20 pb-24 lg:pt-32 lg:pb-36">
        <div className="max-w-3xl">
          <p className="reveal text-sm uppercase tracking-[0.18em] text-muted-foreground mb-6">
            Páginas web para profesionales independientes en Chile
          </p>
          <h1 className="reveal font-display font-bold text-[2.5rem] sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
            Mientras lees esto, alguien buscó en Google a un profesional como tú.
            <span className="block text-muted-foreground mt-3">
              No te encontró.
            </span>
          </h1>

          <p className="reveal mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Te entregamos una página profesional, lista para Google y para captar
            clientes <span className="text-foreground font-medium">en menos de 48 horas</span>.
            Sin saber nada de tecnología. Sin agencias. Sin meses de espera.
          </p>

          <div className="reveal mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              onClick={onPrimary}
              className="group inline-flex items-center justify-center h-14 px-7 rounded-md bg-primary text-primary-foreground font-medium text-base hover:opacity-90 transition-all"
            >
              Quiero mi página ahora
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#testimonios"
              className="inline-flex items-center h-14 px-2 text-base text-foreground/80 hover:text-foreground transition-colors"
            >
              Ver ejemplo real <span className="ml-2">→</span>
            </a>
          </div>

          <div className="reveal mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span><span className="text-foreground font-semibold">+200</span> profesionales</span>
            <span className="hidden sm:inline opacity-30">·</span>
            <span>Lista en <span className="text-foreground font-semibold">48 horas</span></span>
            <span className="hidden sm:inline opacity-30">·</span>
            <span>Sin código</span>
            <span className="hidden sm:inline opacity-30">·</span>
            <span>Garantía de satisfacción</span>
          </div>
        </div>
      </div>
    </section>
  );
}