export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm text-muted-foreground">
        <div>
          <p className="font-display font-bold text-foreground text-base">crealoconia<span className="text-primary">.</span></p>
          <p className="mt-1">© {new Date().getFullYear()} Crealoconia · Hecho en Chile</p>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <a href="/privacidad" className="hover:text-foreground transition-colors">Privacidad</a>
          <a href="mailto:esteban@crealoconia.com" className="hover:text-foreground transition-colors">esteban@crealoconia.com</a>
          <a href="https://instagram.com/crealocon.ia" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
}