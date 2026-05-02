const truths = [
  'Tus pacientes potenciales te buscan en Google y no encuentran nada — o peor, encuentran a tu competencia.',
  'Tienes una página desactualizada hace años que te da vergüenza compartir.',
  'Sabes que necesitas resolverlo, pero no tienes tiempo ni ganas de aprender herramientas.',
  'Ya invertiste antes en algo que no funcionó y no quieres tropezar de nuevo.',
];

export default function Mirror() {
  return (
    <section id="espejo" className="border-t border-border/60">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <p className="reveal text-sm uppercase tracking-[0.18em] text-muted-foreground mb-6">
          ¿Te suena esto?
        </p>
        <h2 className="reveal font-display font-bold text-3xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-4xl">
          Eres bueno en lo tuyo. Pero online, prácticamente no existes.
        </h2>

        <ul className="mt-14 grid gap-px bg-border/60 border border-border/60 rounded-md overflow-hidden">
          {truths.map((t, i) => (
            <li
              key={i}
              className="reveal bg-card p-6 sm:p-8 flex gap-5 items-start"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="font-display text-primary text-xl font-bold tabular-nums shrink-0 mt-1">
                0{i + 1}
              </span>
              <p className="text-lg sm:text-xl text-foreground/90 leading-snug">{t}</p>
            </li>
          ))}
        </ul>

        <p className="reveal mt-12 font-display text-2xl sm:text-3xl font-bold">
          Nosotros lo resolvemos en <span className="text-primary">48 horas</span>.
        </p>
      </div>
    </section>
  );
}