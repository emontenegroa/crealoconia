import { ExternalLink } from 'lucide-react';

const clientes = [
  {
    nombre: "Encuadrados",
    url: "https://encuadrados.crealoconia.com",
    descripcion: "Servicio de enmarcado profesional",
  },
  {
    nombre: "Hampi",
    url: "https://hampi.cl",
    descripcion: "Bienestar y salud integral",
  },
  {
    nombre: "Aruna Escuela",
    url: "https://arunaescuela.com",
    descripcion: "Escuela de formación y desarrollo",
  },
  {
    nombre: "La Polilla Azucarada",
    url: "https://lapolillaazucarada.cl",
    descripcion: "Repostería artesanal y creativa",
  },
  {
    nombre: "Marketéate Lab",
    url: "https://marketeatelab.com",
    descripcion: "Agencia de marketing 360",
  },
  {
    nombre: "Aura Solar en Atacama",
    url: "https://aurasolarenatacama.cl",
    descripcion: "Energía solar en el desierto de Atacama",
  },
  {
    nombre: "Cote Díaz Prohens",
    url: "https://cotediazprohens.com",
    descripcion: "Marca personal y consultoría",
  },
  {
    nombre: "Zenteno Abogados",
    url: "https://zentenoabogados.crealoconia.com",
    descripcion: "Estudio jurídico profesional",
  },
  {
    nombre: "Red 7 Producciones",
    url: "https://red7producciones.cl",
    descripcion: "Productora audiovisual",
  },
  {
    nombre: "Escala Humana",
    url: "https://soyescalahumana.cl",
    descripcion: "Terapia y acompañamiento personal",
  },
  {
    nombre: "Geraldine Hyde",
    url: "https://geraldinehyde.cl",
    descripcion: "Marca personal y servicios profesionales",
  },
  {
    nombre: "NutriMeraki",
    url: "https://soynutrimeraki.cl",
    descripcion: "Nutrición con propósito",
  },
  {
    nombre: "Ángela Villena",
    url: "https://angelavillena.com",
    descripcion: "Marca personal y emprendimiento",
  },
];

const Clientes = () => {
  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Sitios Web Creados con{" "}
            <span className="text-gradient-primary">CrealoconIA.com</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada uno de estos proyectos fue construido con inteligencia artificial.
            Resultados reales, para negocios reales.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientes.map((cliente) => (
            <a
              key={cliente.url}
              href={cliente.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-[0_0_30px_-10px_hsl(160_84%_45%/0.25)] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {cliente.nombre}
                </h2>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {cliente.descripcion}
              </p>
              <span className="text-xs text-primary/70 font-mono break-all">
                {cliente.url.replace(/^https?:\/\//, "")}
              </span>
            </a>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-2">
            ¿Quieres tu sitio web profesional creado con IA?
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            🚀 Comienza gratis aquí
          </a>
        </div>
      </div>
    </main>
  );
};

export default Clientes;
