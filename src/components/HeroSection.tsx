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
  const scrollToForm = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(() => {
      const inputs = document.querySelectorAll('input[name="marca"], input[name="email"]');
      inputs.forEach(input => {
        input.classList.add('ring-4', 'ring-blue-400', 'ring-offset-2');
        setTimeout(() => {
          input.classList.remove('ring-4', 'ring-blue-400', 'ring-offset-2');
        }, 2000);
      });
    }, 500);
  };
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
              
              <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
                Si eres coach, terapeuta o profesional, tu web es tu carta de presentación. Consíguela lista sin complicaciones técnicas y enfocada en conseguir clientes. Tus potenciales clientes buscan una web clara, profesional y que comunique tu valor para ellos, si no, simplemente pasan al siguiente.
                <span className="block mt-2 text-sm text-slate-400">*No aplica para E-commerce</span>
              </p>
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

      {/* Sección de inversión */}
      <div className="relative z-10 container mx-auto px-4 py-16 mt-8">
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Lo que incluye tu <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">inversión</span>
            </h2>
          </div>

          {/* Items de la inversión */}
          <div className="space-y-8 mb-12">
            {/* Item 1 */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Asistente IA Personalizado para tu Marca <span className="text-emerald-400">(incluido sin costo)</span>
                  </h3>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    Completa un breve formulario y recibirás un asistente hecho a tu medida: creará contenido, guiones de video, textos para redes, ideas de storytelling y la base estratégica para tu sitio web.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Sitio Web Profesional + Hosting por 2 años
                  </h3>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    Una web clara, estratégica y diseñada para convertir: tu propuesta de valor ordenada, tu mensaje alineado y una experiencia que genere confianza inmediata.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Mentoría 1 a 1 con Esteban Montenegro
                  </h3>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    Trabajamos juntos tu propuesta de valor, revisamos tu comunicación, ajustamos textos, fotos y estructura. Así tu web no solo se ve profesional, sino que atrae a los clientes correctos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Precio y CTA */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 text-center backdrop-blur-sm">
            <div className="mb-6">
              <div className="text-lg text-slate-300 mb-2">Inversión total:</div>
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">$197.000 CLP</div>
              <div className="text-slate-400 text-sm">(pago único — incluye sitio web, mentoría y hosting por 24 meses)
*No Aplica para E-commerce   </div>
            </div>
            <Button onClick={scrollToForm} className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <Sparkles className="w-5 h-5 mr-2" />
              Empezar ahora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
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