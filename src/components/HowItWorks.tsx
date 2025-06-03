
import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from 'lucide-react';

const HowItWorks = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-2xl mx-auto mb-20">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left p-6 hover:bg-gray-50 rounded-lg transition-colors group">
          <h2 className="text-2xl font-semibold text-gray-900">
            ¿Cómo funciona?
          </h2>
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        
        <CollapsibleContent className="px-6 pb-6">
          <div className="space-y-8 pt-4">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Completas el formulario</h3>
                <p className="text-gray-600">
                  10 preguntas sobre tu negocio, servicios y estilo. Nos cuentas qué haces y cómo te quieres ver online.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Recibes tu Kit IA</h3>
                <p className="text-gray-600">
                  Al instante en tu email: prompts personalizados para generar contenido ilimitado y textos para tu web.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Nosotros creamos tu web</h3>
                <p className="text-gray-600">
                  En 24-48 horas tienes tu sitio web funcionando, optimizado y listo para recibir clientes.
                </p>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default HowItWorks;
