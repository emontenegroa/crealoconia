export default function Transformation() {
  return (
    <section className="border-t border-border/60 bg-card/40">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <p className="reveal text-sm uppercase tracking-[0.18em] text-muted-foreground mb-6">
          Antes / Después
        </p>
        <h2 className="reveal font-display font-bold text-3xl sm:text-5xl max-w-3xl mb-16">
          De invisible a la primera opción de Google.
        </h2>

        <div className="grid md:grid-cols-2 gap-px bg-border/60 border border-border/60 rounded-md overflow-hidden">
          <div className="reveal bg-background p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">Antes</p>
            <ul className="space-y-5 text-foreground/60">
              <li className="line-through decoration-1 decoration-foreground/30">Nadie te encuentra cuando buscan tu profesión</li>
              <li className="line-through decoration-1 decoration-foreground/30">Mandas tu Instagram porque no tienes algo mejor</li>
              <li className="line-through decoration-1 decoration-foreground/30">Pierdes consultas frente a colegas con peor formación</li>
              <li className="line-through decoration-1 decoration-foreground/30">Cobras menos de lo que vales por verte “informal”</li>
            </ul>
          </div>
          <div className="reveal bg-card p-8 sm:p-10" style={{ transitionDelay: '120ms' }}>
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-6">Después</p>
            <ul className="space-y-5">
              <li className="text-foreground"><span className="text-primary mr-2">→</span>Apareces en Google cuando alguien busca tu especialidad</li>
              <li className="text-foreground"><span className="text-primary mr-2">→</span>Compartes un link que transmite seriedad y confianza</li>
              <li className="text-foreground"><span className="text-primary mr-2">→</span>Recibes consultas mientras estás con pacientes o durmiendo</li>
              <li className="text-foreground"><span className="text-primary mr-2">→</span>Cobras lo que vales porque te ves del nivel que eres</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}