import ThemeSwitch from './ThemeSwitch';

export default function Nav({ onCta }: { onCta: () => void }) {
  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/60">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="/" className="font-display font-bold text-lg tracking-tight">
          crealoconia<span className="text-primary">.</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#espejo" className="hover:text-foreground transition-colors">El problema</a>
          <a href="#como" className="hover:text-foreground transition-colors">Cómo funciona</a>
          <a href="#testimonios" className="hover:text-foreground transition-colors">Resultados</a>
          <a href="#oferta" className="hover:text-foreground transition-colors">Qué incluye</a>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <button
            onClick={onCta}
            className="hidden sm:inline-flex items-center h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Quiero mi página
          </button>
        </div>
      </div>
    </nav>
  );
}