import { ExternalLink } from 'lucide-react';

const clientes = [
{
  nombre: "Dr. Cristóbal Castillo",
  url: "https://encuadrados.crealoconia.com",
  descripcion: "Psiquiatra Infanto-Juvenil. Bienestar emocional y neurodesarrollo para niños y adolescentes.",
  imagen: "/clientes/encuadrados.png",
  categoria: "Salud"
},
{
  nombre: "Hampi Paatcha",
  url: "https://hampi.cl",
  descripcion: "Bruja moderna que fusiona ciencia con espiritualidad. Transformación personal y gestión de la ansiedad.",
  imagen: "/clientes/hampi.png",
  categoria: "Bienestar"
},
{
  nombre: "Aruna Escuela",
  url: "https://arunaescuela.com",
  descripcion: "Cursos online para volver al cuerpo, sanar desde la raíz y despertar tu energía creadora.",
  imagen: "/clientes/aruna.png",
  categoria: "Educación"
},
{
  nombre: "La Polilla Azucarada",
  url: "https://lapolillaazucarada.cl",
  descripcion: "Repostería artesanal y talleres creativos de galletas decoradas con conexión emocional.",
  imagen: "/clientes/polilla.png",
  categoria: "Gastronomía"
},
{
  nombre: "Marketéate Lab",
  url: "https://marketeatelab.com",
  descripcion: "Agencia de marketing 360. Estrategia, automatización y escalamiento para marcas.",
  imagen: "/clientes/marketeate.png",
  categoria: "Marketing"
},
{
  nombre: "Aura Solar en Atacama",
  url: "https://aurasolarenatacama.cl",
  descripcion: "Experiencias terapéuticas en la naturaleza. Psicología, espiritualidad y sanación entre el desierto y el mar.",
  imagen: "/clientes/aurasolar.png",
  categoria: "Bienestar"
},
{
  nombre: "Cote Díaz Prohens",
  url: "https://cotediazprohens.com",
  descripcion: "Acompañamiento terapéutico consciente. Un viaje de 3 meses hacia la claridad y la transformación profunda.",
  imagen: "/clientes/cotediaz.png",
  categoria: "Terapia"
},
{
  nombre: "Zenteno & Zenteno Abogados",
  url: "https://zentenoabogados.crealoconia.com",
  descripcion: "Asesoría jurídica laboral y civil con enfoque en comunicaciones para sindicatos y organizaciones.",
  imagen: "/clientes/zenteno.png",
  categoria: "Legal"
},
{
  nombre: "RED7 Producciones",
  url: "https://red7producciones.cl",
  descripcion: "Productora de eventos. Transforman visiones en experiencias inolvidables desde 2008.",
  imagen: "/clientes/red7.png",
  categoria: "Eventos"
},
{
  nombre: "Escala Humana",
  url: "https://soyescalahumana.cl",
  descripcion: "Acompañamiento y experiencias para reconectar con lo esencial. Coach ontológica y permacultora.",
  imagen: "/clientes/escalahumana.png",
  categoria: "Coaching"
},
{
  nombre: "Geraldine Hyde",
  url: "https://geraldinehyde.cl",
  descripcion: "Abogada especialista en compliance educativo. 25 años transformando el cumplimiento legal en cultura de prevención.",
  imagen: "/clientes/geraldine.png",
  categoria: "Legal"
},
{
  nombre: "Soynutri Meraki",
  url: "https://soynutrimeraki.cl",
  descripcion: "Nutricionista y esteticista. Tratamientos personalizados que elevan autoestima y devuelven luminosidad.",
  imagen: "/clientes/nutrimeraki.png",
  categoria: "Salud"
},
{
  nombre: "Ángela Villena",
  url: "https://angelavillena.com",
  descripcion: "Mentoría ejecutiva. Acompañamiento estratégico para líderes con 27+ años de experiencia corporativa.",
  imagen: "/clientes/angelavillena.png",
  categoria: "Coaching"
}];


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
          {clientes.map((cliente) =>
          <a
            key={cliente.url}
            href={cliente.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-[0_0_30px_-10px_hsl(160_84%_45%/0.25)] transition-all duration-300">

              {/* Screenshot thumbnail */}
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={cliente.imagen}
                  alt={`Sitio web de ${cliente.nombre}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {cliente.nombre}
                  </h2>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                </div>
                <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary mb-3">
                  {cliente.categoria}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cliente.descripcion}
                </p>
                <span className="block mt-3 text-xs text-primary/60 font-mono break-all">
                  {cliente.url.replace(/^https?:\/\//, "")}
                </span>
              </div>
            </a>
          )}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-2">
            ¿Quieres tu sitio web profesional creado con IA?
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium">

            🚀 Comienza gratis aquí
          </a>
        </div>
      </div>
    </main>);

};

export default Clientes;