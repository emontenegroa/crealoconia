import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Zap, Gift } from "lucide-react";

const QuienSoy = () => {
  return <div className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hola, soy Esteban Montenegro 👋
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Soy el humano detras de creealoconia. llevo mas de 20 años trabajando con tecnologia y me he especializado en Inteligencia artificial
          </p>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-4">
            Ayudo a las personas a entender y encontrar soluciones con ayuda de herramientas tecnologicas, siendo una de mis pasiones la intelogencia artificial.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenido principal */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-lg text-foreground leading-relaxed">
                He visto cómo muchas personas se frustran al intentar crear su página web. 
                Se pierden en palabras tecnicas tecnicismos que no entienden, gastan tiempo y plata sin tener los resultados que esperaban.
              </p>
              
              <p className="text-lg text-foreground leading-relaxed">
                Por eso creé <span className="font-semibold text-primary">CrealoconIA.com</span> - un sistema que combina 
                mi experiencia en tecnología con inteligencia artificial para entregar páginas web profesionales en tiempo récord.
              </p>
              
              <p className="text-lg text-foreground leading-relaxed">
                Mi misión es simple: que lo que tú haces y sabes <span className="font-semibold text-primary mx-[10px]">se vea genial</span> 
                y conecte con tus clientes ideales, sin que te tengas que partir la cabeza pensando como hacerlo.
              </p>
            </div>

            {/* Especialidades */}
            <div className="bg-muted/50 p-6 rounded-xl">
              <h3 className="font-semibold text-foreground mb-3">¿Qué tipo de páginas creo?</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Páginas de marca personal
                  </h4>
                  <p className="text-sm text-muted-foreground ml-4">
                    Mostrando tu experiencia, quien eres y lo que haces, tus programas, sesiones, cursos, talleres, mentorías, descargas de recursos, muestra de catálogos
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Páginas de embudo
                  </h4>
                  <p className="text-sm text-muted-foreground ml-4">
                    Landing pages, páginas de aterrizaje, página de agradecimientos (con confeti y todo🎉), página de captura de email (se puede integrar con brevo)
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Páginas informativas
                  </h4>
                  <p className="text-sm text-muted-foreground ml-4">
                    Mostrando tu empresa, servicios, horarios, agendas. Clínicas, estudios jurídicos, barberías, centros deportivos, transporte, veterinarias, peluquerías, centros de estética, agrícolas y todo lo que te puedas imaginar
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Métricas y credibilidad */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-card border border-border">
                <CardContent className="p-6 text-center">
                  <Award className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">24h</div>
                  <div className="text-sm text-muted-foreground">Tiempo promedio de entrega</div>
                </CardContent>
              </Card>
              
              <Card className="bg-card border border-border">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">50+</div>
                  <div className="text-sm text-muted-foreground">Páginas web creadas</div>
                </CardContent>
              </Card>
              
              <Card className="bg-card border border-border">
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">100%</div>
                  <div className="text-sm text-muted-foreground">Con inteligencia artificial</div>
                </CardContent>
              </Card>
              
              <Card className="bg-card border border-border">
                <CardContent className="p-6 text-center">
                  <Gift className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">SuperPrompt</div>
                  <div className="text-sm text-muted-foreground">Para Marketing en redes sociales</div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-lg p-6">
              <h4 className="font-semibold text-primary mb-3">Mi enfoque único:</h4>
              <ul className="space-y-2 text-foreground text-sm">
                <li>✅ Los textos de tu página web ya vienen generados con estrategia de marketing para la venta (así configuré la inteligencia artificial para ti).</li>
                <li>✅ Es rápido y fácil (para que no lo abandones a la mitad)</li>
                <li>✅ No estás solo con la IA, incluye un acompañamiento personalizado conmigo en el proceso.</li>
              </ul>
            </div>
          </div>
            </div>
          </div>
    </div>;
};
export default QuienSoy;