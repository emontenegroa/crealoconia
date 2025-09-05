import React from 'react';
import { Card } from '@/components/ui/card';

const PortfolioGallery = () => {
  const portfolioItems = [
    {
      id: 1,
      image: '/lovable-uploads/dfb10c60-a9f9-41ee-91f8-d25125a93758.png',
      title: 'AlmaGreen',
      category: 'E-commerce Ecológico'
    },
    {
      id: 2,
      image: '/lovable-uploads/ec3c59e2-cd54-4674-86f1-144a511fe1d3.png',
      title: 'Oráculo',
      category: 'Servicio Espiritual'
    },
    {
      id: 3,
      image: '/lovable-uploads/1d5db9eb-a7d6-4e4b-b181-dab339aa5ed3.png',
      title: 'Aruna',
      category: 'Cursos Online'
    },
    {
      id: 4,
      image: '/lovable-uploads/93c49c8b-d498-4070-a51a-f2d91333891b.png',
      title: 'Hampi Paatcha',
      category: 'Proceso Holístico'
    },
    {
      id: 5,
      image: '/lovable-uploads/f2c15a3e-0d60-4856-b057-86ae23e1df30.png',
      title: 'Expande Tu Mensaje',
      category: 'Coaching Digital'
    }
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            ✨ Sitios reales creados
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ejemplos de webs profesionales
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada uno de estos sitios fue creado con nuestro sistema de IA personalizada,
            adaptándose perfectamente a cada negocio y audiencia.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <Card 
              key={item.id}
              className="portfolio-card group overflow-hidden border-0 bg-card shadow-minimal hover:shadow-elevated transition-all duration-500"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: 'fade-in 0.6s ease-out forwards'
              }}
            >
              <div className="relative overflow-hidden rounded-lg">
                {/* Image Container */}
                <div className="aspect-[4/3] overflow-hidden bg-muted/50">
                  <img
                    src={item.image}
                    alt={`Sitio web de ${item.title}`}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-white/80">{item.category}</p>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Ver proyecto
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.category}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-muted-foreground mb-6">
            ¿Listo para crear la tuya?
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Diseño profesional
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Optimizado para conversión
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              100% personalizado
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioGallery;