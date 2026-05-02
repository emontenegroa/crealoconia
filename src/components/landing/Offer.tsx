import { ArrowRight, Check } from 'lucide-react';

const features = [
  'Página profesional personalizada a tu práctica',
  'Apareces en Google (SEO básico incluido)',
  'Formulario de contacto + WhatsApp directo',
  'Diseño impecable en celular y desktop',
  'Lista para mostrar en 48 horas',
  'Sin contratos, sin letra chica, sin sorpresas',
];

export default function Offer({ onCta }: { onCta: () => void }) {
  return (
    <section id="oferta" className="border-t border-border/60">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <p className="reveal text-sm uppercase tracking-[0.18em] text-muted-foreground mb-6">
              Qué te llevas
            </p>
            <h2 className="reveal font-display font-bold text-3xl sm:text-5xl leading-[1.05] mb-8">
              Todo lo que necesitas para verte como el profesional que ya eres.
            </h2>
            <p className="reveal text-lg text-muted-foreground leading-relaxed">
              Una sola entrega, un solo pago, listo para funcionar. Pensado para
              que dejes de postergar tu presencia digital de una vez.
            </p>
          </div>

          <div className="reveal bg-card border border-border rounded-md p-8 sm:p-10">
            <ul className="space-y-4 mb-10">
              {features.map((f) => (
                <li key={f} className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-muted-foreground line-through text-lg">$590.000</span>
              <span className="font-display font-bold text-4xl sm:text-5xl text-primary tabular-nums">
                $390.000
              </span>
              <span className="text-sm text-muted-foreground">CLP · pago único</span>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              ⚠ Solo <span className="text-foreground font-medium">5 lugares</span> disponibles esta semana.
            </p>

            <button
              onClick={onCta}
              className="group w-full inline-flex items-center justify-center h-14 px-6 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all"
            >
              Reservar mi lugar
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}