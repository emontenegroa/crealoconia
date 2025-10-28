import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Mail, ArrowRight, Sparkles, Zap, Trophy } from "lucide-react";
import { FormData } from '@/hooks/useFormHandler';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
interface HeroSectionProps {
  formData: FormData;
  onInputChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isValid: boolean;
}
const HeroSection = ({
  formData,
  onInputChange,
  onSubmit,
  isValid
}: HeroSectionProps) => {
  const portfolioImages = [{
    src: "/ejemplos/totalsport-mobile.png",
    title: "Total Sport",
    delay: "0s"
  }, {
    src: "/ejemplos/tenispro-mobile.png",
    title: "HP Tenispro",
    delay: "0.5s"
  }, {
    src: "/ejemplos/agrocert-mobile.png",
    title: "AgroCert",
    delay: "1s"
  }, {
    src: "/ejemplos/hampi-mobile.png",
    title: "Hampi Paatcha",
    delay: "1.5s"
  }, {
    src: "/ejemplos/hector-mobile.png",
    title: "Héctor Tennis",
    delay: "2s"
  }, {
    src: "/ejemplos/traslados-mobile.png",
    title: "M&S Traslados",
    delay: "2.5s"
  }, {
    src: "/ejemplos/mamasmentoras-mobile.png",
    title: "Mamás Mentoras",
    delay: "3s"
  }, {
    src: "/ejemplos/circulos-mobile.png",
    title: "Círculos de Vida",
    delay: "3.5s"
  }];
  return <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Patrón de fondo personalizado */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }}></div>
      </div>
      
      {/* Gradientes sutiles personalizados */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Header minimalista */}
        <div className="flex items-center mb-12">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">Crealoconia</span>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[75vh]">
          {/* Columna izquierda - Contenido (8 columnas) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                CrealoconIA.com
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                Integra <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">Inteligencia Artificial</span> a tu negocio para multiplicar tu tiempo, tus resultados y mejorar tus ventas.
              </h1>
              
              <p className="text-lg text-slate-300 max-w-lg leading-relaxed">El Sistema CrealoconIA reúne todo lo que necesitas para crear, relanzar o mejorar tu presencia online: una web profesional generada con IA, un asistente personalizado de contenido y estrategia, y una mentoría 1:1 para ajustar tu marca y optimizar tu proceso digital.
La IA con tu propia información estratégica para crear de forma clara  y alineadas a tu negocio.</p>
            </div>

            {/* Formulario profesional */}
            <form onSubmit={onSubmit} className="space-y-4 max-w-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Input name="marca" value={formData.marca} onChange={e => onInputChange('marca', e.target.value)} placeholder="Tu negocio o marca personal" className="h-14 text-base bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:bg-white/15 transition-all duration-300 backdrop-blur-sm rounded-xl" />
                </div>
                
                <div className="relative">
                  <Input name="email" type="email" value={formData.email} onChange={e => onInputChange('email', e.target.value)} placeholder="tu@email.com" className="h-14 text-base bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:bg-white/15 transition-all duration-300 backdrop-blur-sm rounded-xl" />
                </div>
              </div>

              <Button type="submit" className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] w-full md:w-auto" disabled={!isValid}>
                <Sparkles className="w-5 h-5 mr-2" />
                Empezar ahora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <div className="flex items-center space-x-6 text-sm">
                
                <div className="flex items-center text-blue-400">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  Entrega en 24 horas
                </div>
              </div>
            </form>
          </div>

          {/* Columna derecha - Carrusel mobile con iPhone 17 Pro (5 columnas) */}
          <div className="lg:col-span-5 relative lg:block hidden">
            <div className="relative h-full flex items-center justify-center overflow-hidden">
              {/* Contenedor para las imágenes que pasan por detrás */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[700px] h-[700px]">
                  {/* Carrusel de imágenes que se extienden más allá del celular */}
                  <Carousel plugins={[Autoplay({
                  delay: 2000
                })]} opts={{
                  align: "center",
                  loop: true
                }} className="w-full h-full">
                    <CarouselContent className="h-full -ml-4">
                      {portfolioImages.map((image, index) => <CarouselItem key={index} className="h-full pl-4 basis-full">
                          <div className="relative w-full h-full flex items-center justify-center">
                            {/* Imagen extendida que va por detrás con transición suave */}
                            <div className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out">
                              <img src={image.src} alt={image.title} className="w-[500px] h-[800px] object-cover object-top rounded-3xl shadow-2xl transition-transform duration-700 ease-in-out hover:scale-105" style={{
                            filter: 'blur(1px) brightness(0.8)',
                            transform: 'scale(1.1)'
                          }} />
                            </div>
                          </div>
                        </CarouselItem>)}
                    </CarouselContent>
                  </Carousel>
                </div>
              </div>

              {/* iPhone 17 Pro fijo por encima - Más largo */}
              <div className="relative z-30 w-96 h-[750px]">
                {/* Marco del iPhone 17 Pro con proporciones más largas */}
                <div className="relative w-full h-full bg-gradient-to-b from-slate-800 to-slate-900 rounded-[4rem] p-2 shadow-2xl">
                  {/* Borde interno del iPhone */}
                  <div className="w-full h-full bg-black rounded-[3.7rem] p-2">
                    {/* Pantalla del iPhone */}
                    <div className="w-full h-full rounded-[3.5rem] overflow-hidden relative bg-black">
                      {/* Dynamic Island */}
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-36 h-9 bg-black rounded-full z-50 border-2 border-slate-700"></div>
                      
                      {/* Carrusel sincronizado dentro del iPhone con transiciones */}
                      <Carousel plugins={[Autoplay({
                      delay: 2000
                    })]} opts={{
                      align: "center",
                      loop: true
                    }} className="w-full h-full">
                        <CarouselContent className="h-full">
                          {portfolioImages.map((image, index) => <CarouselItem key={index} className="h-full">
                              <div className="h-full relative">
                                <img src={image.src} alt={image.title} className="w-full h-full object-cover object-top transition-all duration-700 ease-in-out scale-100 hover:scale-105" style={{
                              minHeight: '100%',
                              objectPosition: 'top center'
                            }} />
                                {/* Gradiente sutil para el Dynamic Island */}
                                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/30 to-transparent z-40"></div>
                              </div>
                            </CarouselItem>)}
                        </CarouselContent>
                        
                        {/* Flechas de navegación personalizadas */}
                        <CarouselPrevious className="absolute left-6 top-1/2 transform -translate-y-1/2 z-50 bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-sm transition-all duration-300 w-12 h-12" />
                        <CarouselNext className="absolute right-6 top-1/2 transform -translate-y-1/2 z-50 bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-sm transition-all duration-300 w-12 h-12" />
                      </Carousel>
                      
                      {/* Indicador home del iPhone */}
                      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-36 h-1.5 bg-white/60 rounded-full z-50"></div>
                    </div>
                  </div>
                  
                  {/* Botones laterales del iPhone con tamaño proporcionado */}
                  <div className="absolute right-0 top-28 w-1.5 h-20 bg-slate-700 rounded-l-lg"></div>
                  <div className="absolute right-0 top-52 w-1.5 h-10 bg-slate-700 rounded-l-lg"></div>
                  <div className="absolute right-0 top-68 w-1.5 h-10 bg-slate-700 rounded-l-lg"></div>
                  
                  {/* Botón de encendido */}
                  <div className="absolute left-0 top-44 w-1.5 h-16 bg-slate-700 rounded-r-lg"></div>
                </div>
                
                {/* Título flotante dinámico con animación */}
                <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3 z-50 transition-all duration-300 hover:bg-white/15">
                  <span className="text-white text-lg font-medium">crealoconIA.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Nueva sección de métricas */}
      <div className="relative z-10 container mx-auto px-4 py-16 mt-8">
        <div className="max-w-6xl mx-auto">
          {/* Título y subtítulo */}
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Lo que antes tomaba semanas, <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ahora toma horas.</span>
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Crealoconia transforma tu proceso digital en resultados reales y medibles.
              Ahorra tiempo, simplifica tu camino y aprende a usar la IA como aliada.
            </p>
          </div>

          {/* Grid de métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Métrica 1 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 animate-fade-in hover:scale-105 hover:shadow-xl">
              <div className="text-4xl mb-3">🕓</div>
              <div className="text-2xl font-bold text-white mb-2">48 horas</div>
              <div className="text-sm text-blue-400 font-semibold mb-3">−96% de tiempo</div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Antes un sitio tomaba 3–4 semanas. Con Crealoconia, lo tienes en 2 horas.
              </p>
            </div>

            {/* Métrica 2 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 animate-fade-in hover:scale-105 hover:shadow-xl" style={{
            animationDelay: '0.1s'
          }}>
              <div className="text-4xl mb-3">⚙️</div>
              <div className="text-2xl font-bold text-white mb-2">20 tareas</div>
              <div className="text-sm text-purple-400 font-semibold mb-3">+90% eficiencia</div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Desde textos y reels hasta correos y páginas, todo listo desde tu asistente IA.
              </p>
            </div>

            {/* Métrica 3 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 animate-fade-in hover:scale-105 hover:shadow-xl" style={{
            animationDelay: '0.2s'
          }}>
              
              <div className="text-2xl font-bold text-white mb-2">4.8 / 5</div>
              <div className="text-sm text-emerald-400 font-semibold mb-3">Aprendizaje acelerado</div>
              <p className="text-sm text-slate-400 leading-relaxed">
                En una sola mentoría comprendes lo que antes tardaba un mes en entender.
              </p>
            </div>

            {/* Métrica 4 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 animate-fade-in hover:scale-105 hover:shadow-xl" style={{
            animationDelay: '0.3s'
          }}>
              <div className="text-4xl mb-3">🌐</div>
              <div className="text-2xl font-bold text-white mb-2">24 horas</div>
              
              <p className="text-sm text-slate-400 leading-relaxed">
                100% personalizada a tu estilo, colores y propuesta de valor.
              </p>
            </div>
          </div>

          {/* Texto complementario */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 text-center backdrop-blur-sm">
            <p className="text-lg text-slate-200 leading-relaxed max-w-4xl mx-auto mb-6">
              "Con el Sistema Crealoconia integras Inteligencia Artificial, estrategia y acompañamiento humano.
              En solo un día obtienes tu web, tu asistente personalizado y la claridad digital que antes tardabas semanas en alcanzar."
            </p>
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Activar mi sistema ahora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-slate-400 mt-3">Tu web y asistente listos en 24h</p>
          </div>
        </div>
      </div>

      {/* Indicador de scroll personalizado */}
      <div className="relative z-10 pb-8">
        <div className="flex justify-center text-slate-400 text-sm flex-col items-center space-y-3">
          <span className="font-medium">Descubre más</span>
          <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center relative">
            <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>;
};
export default HeroSection;