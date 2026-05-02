const steps = [
  { n: '01', t: 'Tú nos cuentas sobre tu práctica', d: 'Un formulario corto, conversacional, en 10 minutos. Sin tecnicismos.' },
  { n: '02', t: 'Nosotros creamos tu página con IA', d: 'En 48 horas la tienes lista para revisar: textos, diseño y SEO básico incluido.' },
  { n: '03', t: 'Tú empiezas a recibir consultas', d: 'Compartes el link y empiezan a llegar pacientes y clientes nuevos. Solos.' },
];

export default function HowItWorks() {
  return (
    <section id="como" className="border-t border-border/60">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <p className="reveal text-sm uppercase tracking-[0.18em] text-muted-foreground mb-6">
          Así de fácil
        </p>
        <h2 className="reveal font-display font-bold text-3xl sm:text-5xl max-w-3xl mb-16">
          Tres pasos. Cero excusas.
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="reveal border-t border-border pt-6"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="font-display text-primary font-bold text-sm tracking-widest mb-4">{s.n}</p>
              <h3 className="font-display text-xl sm:text-2xl font-bold mb-3 leading-tight">{s.t}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}