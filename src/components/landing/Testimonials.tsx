const items = [
  {
    name: 'Valentina M.',
    role: 'Psicóloga clínica',
    city: 'Santiago',
    initials: 'VM',
    quote: 'Antes nadie me encontraba en Google. Al mes de tener mi página, agendé 4 pacientes nuevos que llegaron solos.',
  },
  {
    name: 'Cristóbal R.',
    role: 'Abogado civil',
    city: 'Viña del Mar',
    initials: 'CR',
    quote: 'Mandar mi sitio en vez de un PDF cambió todo. Cierro consultas más caras y los clientes llegan ya convencidos.',
  },
  {
    name: 'Daniela P.',
    role: 'Consultora de RRHH',
    city: 'Concepción',
    initials: 'DP',
    quote: 'En 48 horas tenía algo que mostrar. Lo más sorprendente: yo no toqué nada técnico. Solo respondí preguntas.',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="border-t border-border/60 bg-card/40">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <p className="reveal text-sm uppercase tracking-[0.18em] text-muted-foreground mb-6">
          Resultados reales
        </p>
        <h2 className="reveal font-display font-bold text-3xl sm:text-5xl max-w-3xl mb-16">
          Profesionales como tú que dejaron de ser invisibles.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <figure
              key={it.name}
              className="reveal bg-background border border-border rounded-md p-7 flex flex-col h-full hover:border-primary/40 transition-colors"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <blockquote className="text-foreground/90 text-lg leading-relaxed flex-1">
                “{it.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 pt-6 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-sm">
                  {it.initials}
                </div>
                <div>
                  <p className="font-medium text-sm">{it.name}</p>
                  <p className="text-xs text-muted-foreground">{it.role} · {it.city}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}