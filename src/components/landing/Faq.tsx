import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { q: '¿Y si no sé nada de tecnología?', a: 'No necesitas saber nada. Tú respondes preguntas simples sobre tu práctica y nosotros nos encargamos del 100% técnico: diseño, textos, dominio y publicación.' },
  { q: '¿Cuánto tiempo me va a tomar?', a: '10 minutos para contarnos sobre ti. Nada más. El resto lo hacemos nosotros y te entregamos tu sitio listo en 48 horas.' },
  { q: '¿Y si no me gusta cómo quedó?', a: 'Te hacemos los cambios que necesites hasta que estés feliz. Si aun así no te convence, no pagas. Cero riesgo.' },
  { q: '¿Funciona para mi tipo de práctica?', a: 'Sí. Lo hemos hecho para psicólogos, abogados, coaches, consultores, nutricionistas, terapeutas y profesionales independientes de todo tipo.' },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-t border-border/60 bg-card/40">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <p className="reveal text-sm uppercase tracking-[0.18em] text-muted-foreground mb-6">
          Preguntas honestas
        </p>
        <h2 className="reveal font-display font-bold text-3xl sm:text-5xl mb-12">
          Lo que probablemente estás pensando.
        </h2>

        <div className="border-t border-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="reveal border-b border-border">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left py-6 flex items-center justify-between gap-6 group"
                >
                  <span className="font-display text-lg sm:text-xl font-medium group-hover:text-primary transition-colors">
                    {f.q}
                  </span>
                  {isOpen ? (
                    <Minus className="w-5 h-5 text-primary shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-muted-foreground shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <p className="text-muted-foreground leading-relaxed pb-6 pr-10 max-w-3xl">
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}