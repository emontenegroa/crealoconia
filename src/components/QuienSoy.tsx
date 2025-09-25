import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Zap, Heart } from "lucide-react";
const QuienSoy = () => {
  return <div className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hola, soy Esteban Montenegro 👋
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mentor en tecnología especializado en ayudar a profesionales y emprendedores 
            a crear su presencia digital con inteligencia artificial
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenido principal */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-lg text-foreground leading-relaxed">
                He visto cómo muchos profesionales talentosos se frustran al intentar crear su página web. 
                Se pierden en tecnicismos, gastan tiempo y dinero sin resultados, o terminan con sitios que no reflejan su experiencia.
              </p>
              
              <p className="text-lg text-foreground leading-relaxed">
                Por eso creé <span className="font-semibold text-primary">CrealoconIA.com</span> - un sistema que combina 
                mi experiencia en tecnología con inteligencia artificial para entregar páginas web profesionales en tiempo récord.
              </p>
              
              <p className="text-lg text-foreground leading-relaxed">
                Mi misión es simple: que lo que tú haces y sabes <span className="font-semibold text-primary mx-[10px]">se vea genial</span> 
                y conecte con tus clientes ideales.
              </p>
            </div>

            {/* Especialidades */}
            <div className="bg-muted/50 p-6 rounded-xl">
              <h3 className="font-semibold text-foreground mb-3">¿A quién ayudo específicamente?</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Coaches y mentores que necesitan posicionarse como autoridad
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Abogados y consultores que buscan generar más leads
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Profesionales construyendo su marca personal
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Emprendedores listos a invertir en su presencia digital
                </li>
              </ul>
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
                  <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">4.9/5</div>
                  <div className="text-sm text-muted-foreground">Satisfacción cliente</div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-lg p-6">
              <h4 className="font-semibold text-primary mb-3">Mi enfoque único:</h4>
              <ul className="space-y-2 text-foreground text-sm">
                <li>✅ No tecnicismos innecesarios</li>
                <li>✅ Diseño enfocado en conversión</li>
                <li>✅ Textos que conectan emocionalmente</li>
                <li>✅ Entrega rápida y sin frustraciones</li>
                <li>✅ Acompañamiento personalizado</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default QuienSoy;