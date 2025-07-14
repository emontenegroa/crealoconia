import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Check } from 'lucide-react';

const BeforeAfterSection = () => {
  const comparison = [
    {
      before: "6 meses intentando solo",
      after: "Web lista en 7 días"
    },
    {
      before: "Plantillas genéricas",
      after: "Contenido personalizado con IA"
    },
    {
      before: "No sabes qué escribir",
      after: "Mensaje claro y estratégico"
    },
    {
      before: "Cero visitantes",
      after: "Clientes potenciales llegando"
    },
    {
      before: "Te sientes perdido",
      after: "Acompañamiento paso a paso"
    }
  ];

  return (
    <section className="py-20 bg-muted/10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            El antes y después de trabajar conmigo
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            La diferencia entre seguir intentando solo vs. tener el acompañamiento correcto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Antes */}
          <Card className="border-destructive/20 bg-gradient-to-br from-destructive/5 to-destructive/10">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-destructive flex items-center justify-center gap-2">
                <X className="w-6 h-6" />
                Sin Crealoconia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {comparison.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <X className="w-5 h-5 text-destructive flex-shrink-0" />
                  <span className="text-muted-foreground">{item.before}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Después */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/10">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
                <Check className="w-6 h-6" />
                Con Crealoconia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {comparison.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{item.after}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-xl text-foreground font-medium">
            <span className="text-primary font-bold">No es magia.</span> Es el sistema correcto aplicado con experiencia.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;