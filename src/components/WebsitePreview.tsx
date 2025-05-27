
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, ExternalLink, Smartphone, Monitor, Code, Sparkles, Zap, Heart, TrendingUp } from 'lucide-react';

interface FormData {
  marca: string;
  quien_eres: string;
  problemas: string;
  preguntas_frecuentes: string;
  estilo: string;
  producto: string;
  email: string;
  whatsapp: string;
  website: string;
  instagram: string;
}

interface WebsitePreviewProps {
  formData: FormData;
  onGenerateWebsite: () => void;
}

const WebsitePreview = ({ formData, onGenerateWebsite }: WebsitePreviewProps) => {
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');

  const generateInstagramOptimizedContent = () => {
    const problems = formData.problemas?.split('.').filter(p => p.trim()).slice(0, 3) || [];
    const benefits = formData.producto?.split('.').filter(p => p.trim()).slice(0, 3) || [];
    
    return {
      hero: {
        hook: `${formData.marca} - Tu transformación empieza aquí`,
        promise: `${formData.quien_eres?.split('.')[0] || 'Especialista'} que te ayuda a conseguir resultados reales`,
        cta: `💬 Quiero empezar ahora`,
        urgency: '✨ Disponible solo hoy'
      },
      problems: problems.length > 0 ? problems : [
        '¿Te sientes perdido sin saber por dónde empezar?',
        '¿Cansado de intentar y no ver resultados?',
        '¿Quieres cambiar pero no sabes cómo?'
      ],
      benefits: benefits.length > 0 ? benefits : [
        'Resultados en menos de 30 días',
        'Método probado y efectivo',
        'Acompañamiento personalizado'
      ]
    };
  };

  const content = generateInstagramOptimizedContent();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-blue-400 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Ver Preview Mobile-First
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl h-[90vh] bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-purple-400" />
            Preview: {formData.marca || "Tu Sitio Web"} - Optimizado para Instagram
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex gap-4 h-full">
          {/* Controles laterales */}
          <div className="w-64 bg-gray-800 rounded-lg p-4 space-y-4">
            <div>
              <h3 className="text-white font-semibold mb-3">Vista</h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={viewMode === 'mobile' ? 'default' : 'outline'}
                  onClick={() => setViewMode('mobile')}
                  className="flex-1"
                >
                  <Smartphone className="w-4 h-4 mr-1" />
                  Mobile
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'desktop' ? 'default' : 'outline'}
                  onClick={() => setViewMode('desktop')}
                  className="flex-1"
                >
                  <Monitor className="w-4 h-4 mr-1" />
                  Desktop
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3">Optimización Instagram</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Hook en 3 segundos
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  CTA visible sin scroll
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Beneficios visuales
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  WhatsApp directo
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Mobile-first design
                </li>
              </ul>
            </div>

            <div>
              <Button 
                onClick={onGenerateWebsite}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                <Code className="w-4 h-4 mr-2" />
                Generar en Lovable
              </Button>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Optimizado para Instagram
              </p>
            </div>
          </div>

          {/* Preview del sitio optimizado para Instagram */}
          <div className="flex-1 bg-white rounded-lg overflow-hidden">
            <div className={`${viewMode === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'} h-full overflow-y-auto`}>
              
              {/* Hero optimizado para Instagram */}
              <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white p-8 min-h-screen flex flex-col justify-center relative overflow-hidden">
                {/* Elementos decorativos */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                
                <div className="relative z-10 text-center">
                  {/* Urgencia */}
                  <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-300/30 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
                    <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
                    <span className="text-sm font-medium">{content.hero.urgency}</span>
                  </div>
                  
                  {/* Hook principal */}
                  <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
                    {content.hero.hook}
                  </h1>
                  
                  {/* Promesa */}
                  <p className="text-xl md:text-2xl mb-8 opacity-90 font-medium">
                    {content.hero.promise}
                  </p>
                  
                  {/* CTA principal */}
                  <Button className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-4 rounded-full shadow-2xl hover:scale-105 transform transition-all duration-200 mb-6">
                    {content.hero.cta}
                  </Button>
                  
                  {/* Trust indicator */}
                  <p className="text-sm opacity-75">
                    ✅ Resultados garantizados en 24 horas
                  </p>
                </div>
              </div>

              {/* Problemas (identificación inmediata) */}
              <section className="p-8 bg-gray-50">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  ¿Te sientes identificado?
                </h2>
                <div className="space-y-4">
                  {content.problems.map((problem, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-500 font-bold">✗</span>
                      </div>
                      <p className="text-gray-700 font-medium">{problem}</p>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full">
                    💬 Quiero cambiar esto ahora
                  </Button>
                </div>
              </section>

              {/* Beneficios visuales */}
              <section className="p-8 bg-gradient-to-r from-blue-50 to-purple-50">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  Esto es lo que vas a conseguir:
                </h2>
                <div className="space-y-4">
                  {content.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-green-500 font-bold">✓</span>
                      </div>
                      <p className="text-gray-700 font-medium">{benefit}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA final */}
              <section className="p-8 bg-gradient-to-r from-green-500 to-blue-500 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">
                  ¿Listo para tu transformación?
                </h2>
                <p className="text-xl mb-6 opacity-90">
                  Da el primer paso hacia el cambio que necesitas
                </p>
                <Button className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transform transition-all duration-200 mb-4">
                  <Heart className="w-5 h-5 mr-2" />
                  Empezar mi transformación
                </Button>
                <p className="text-sm opacity-75">
                  💚 Garantía de satisfacción 100%
                </p>
              </section>

              {/* Footer con WhatsApp */}
              <footer className="bg-gray-900 text-white p-6 text-center">
                <Button className="bg-green-500 hover:bg-green-600 w-full py-3 rounded-full font-bold mb-4">
                  💬 Contactar por WhatsApp
                </Button>
                <p className="text-gray-400 text-sm">
                  © 2024 {formData.marca || "Tu Marca"}. Transformando vidas.
                </p>
              </footer>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WebsitePreview;
