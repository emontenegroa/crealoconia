
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, ExternalLink, Smartphone, Monitor, Code, Sparkles } from 'lucide-react';

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
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  const generateMockupContent = () => {
    return {
      hero: {
        title: formData.marca || "Tu Marca Personal",
        subtitle: formData.quien_eres?.split('.')[0] || "Transformando vidas a través de...",
        cta: `Contactar por WhatsApp`
      },
      about: {
        title: "¿Quién soy?",
        content: formData.quien_eres?.substring(0, 200) + "..." || "Información sobre ti..."
      },
      problems: {
        title: "¿Te identificas con esto?",
        content: formData.problemas?.substring(0, 150) + "..." || "Problemas que resuelves..."
      },
      faq: {
        title: "Preguntas Frecuentes",
        content: formData.preguntas_frecuentes?.substring(0, 100) + "..." || "Respuestas a dudas comunes..."
      },
      product: {
        title: "Mi Propuesta para Ti",
        content: formData.producto?.substring(0, 150) + "..." || "Tu producto o servicio principal..."
      }
    };
  };

  const mockup = generateMockupContent();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-blue-400 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Preview de tu Sitio Web
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl h-[90vh] bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-purple-400" />
            Preview: {formData.marca || "Tu Sitio Web"}
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
                  variant={viewMode === 'desktop' ? 'default' : 'outline'}
                  onClick={() => setViewMode('desktop')}
                  className="flex-1"
                >
                  <Monitor className="w-4 h-4 mr-1" />
                  Desktop
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'mobile' ? 'default' : 'outline'}
                  onClick={() => setViewMode('mobile')}
                  className="flex-1"
                >
                  <Smartphone className="w-4 h-4 mr-1" />
                  Mobile
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3">Características</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Responsive Design
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  WhatsApp Integration
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Contact Forms
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Social Media Links
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  SEO Optimized
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
                Se abrirá en nueva pestaña
              </p>
            </div>
          </div>

          {/* Preview del sitio */}
          <div className="flex-1 bg-white rounded-lg overflow-hidden">
            <div className={`${viewMode === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'} h-full overflow-y-auto`}>
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                <nav className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl font-bold">{mockup.hero.title}</h1>
                  <div className="hidden md:flex gap-4 text-sm">
                    <a href="#" className="hover:underline">Inicio</a>
                    <a href="#" className="hover:underline">Sobre mí</a>
                    <a href="#" className="hover:underline">Servicios</a>
                    <a href="#" className="hover:underline">Contacto</a>
                  </div>
                </nav>
                
                <div className="text-center max-w-2xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">{mockup.hero.title}</h2>
                  <p className="text-xl mb-8 opacity-90">{mockup.hero.subtitle}</p>
                  <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3">
                    {mockup.hero.cta}
                  </Button>
                </div>
              </div>

              {/* Secciones */}
              <div className="p-6 space-y-12">
                {/* Sobre mí */}
                <section>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{mockup.about.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{mockup.about.content}</p>
                </section>

                {/* Problemas */}
                <section className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{mockup.problems.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{mockup.problems.content}</p>
                </section>

                {/* FAQ */}
                <section>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{mockup.faq.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{mockup.faq.content}</p>
                </section>

                {/* Producto */}
                <section className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{mockup.product.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{mockup.product.content}</p>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Más información
                  </Button>
                </section>
              </div>

              {/* Footer */}
              <footer className="bg-gray-800 text-white p-6 text-center">
                <p>© 2024 {mockup.hero.title}. Todos los derechos reservados.</p>
                {formData.instagram && (
                  <p className="mt-2 text-sm text-gray-400">
                    Sígueme en Instagram: @{formData.instagram}
                  </p>
                )}
              </footer>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WebsitePreview;
