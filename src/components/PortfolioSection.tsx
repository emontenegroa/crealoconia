import { useScrollReveal, useScrollRevealGroup } from "@/hooks/useScrollReveal";

const PortfolioSection = () => {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollRevealGroup<HTMLDivElement>(0.08);
  const ejemplos = [{
    id: 1,
    titulo: "Esteban Montenegro",
    descripcion: "Consultor en transformación digital",
    categoria: "Marca Personal",
    imagen: "/ejemplos/emontenegroa.png"
  }, {
    id: 2,
    titulo: "Despliega",
    descripcion: "Consultoría en liderazgo organizacional",
    categoria: "Consultoría",
    imagen: "/ejemplos/despliega.png"
  }, {
    id: 3,
    titulo: "Total Sport",
    descripcion: "Empresa de eventos deportivos y wellness",
    categoria: "Empresa",
    imagen: "/ejemplos/totalsport.png"
  }, {
    id: 4,
    titulo: "Doralisa",
    descripcion: "Empresa de transporte de carga pesada",
    categoria: "Transporte",
    imagen: "/ejemplos/doralisa.png"
  }, {
    id: 5,
    titulo: "Mamás Mentoras",
    descripcion: "Centro de recursos para mentoría",
    categoria: "Comunidad",
    imagen: "/ejemplos/mamasmentorasscren.png"
  }, {
    id: 6,
    titulo: "Gatitos Barbería",
    descripcion: "Servicios de barbería profesional",
    categoria: "Servicios",
    imagen: "/ejemplos/gatitos-2.png"
  }, {
    id: 7,
    titulo: "BriUL",
    descripcion: "Marca personal con IA integrada",
    categoria: "Alianza",
    imagen: "/ejemplos/briul.png"
  }, {
    id: 8,
    titulo: "Escala Humana",
    descripcion: "Terapia y acompañamiento personal",
    categoria: "Marca Personal",
    imagen: "/ejemplos/escala-humana.png"
  }, {
    id: 9,
    titulo: "RVA",
    descripcion: "Servicio técnico certificado",
    categoria: "Servicio Técnico",
    imagen: "/ejemplos/rva.png"
  }];
  return <section className="py-16 bg-background border-t border-border/10">
      <div className="container mx-auto px-4">
        <div ref={headerRef} className="reveal text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Sitios Web Creados con <span className="text-primary">CrealoconIA.com</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estos son algunos ejemplos reales de sitios web que hemos creado para diferentes tipos de negocios y marcas personales
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ejemplos.map(ejemplo => <div key={ejemplo.id} className="reveal group cursor-pointer">
              <div className="hover-lift bg-card rounded-lg overflow-hidden shadow-sm border border-border/50">
                <div className="img-zoom aspect-video">
                  <img src={ejemplo.imagen} alt={`Sitio web de ${ejemplo.titulo}`} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {ejemplo.categoria}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {ejemplo.titulo}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {ejemplo.descripcion}
                  </p>
                </div>
              </div>
            </div>)}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            ¿Listo para crear tu sitio web profesional?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Entrega en 4 horas
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              100% profesional
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Con IA integrada
            </div>
          </div>
          <a
            href="/clientes"
            className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Ver todos los proyectos →
          </a>
        </div>
      </div>
    </section>;
};
export default PortfolioSection;