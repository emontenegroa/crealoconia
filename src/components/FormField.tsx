
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LucideIcon, Maximize2, Minimize2, ArrowLeft } from 'lucide-react';
import AIEnhanceButton from './AIEnhanceButton';
import SmartValidation from './SmartValidation';

interface FormFieldProps {
  type: 'input' | 'textarea' | 'select';
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  options?: string[];
  icon: LucideIcon;
  showAIEnhance?: boolean;
  context?: {
    marca?: string;
    estilo?: string;
  };
  sessionId?: string;
  onAIUsageUpdate?: (fieldName: string, count: number) => void;
}

// Límites de caracteres por tipo de campo
const getFieldMaxLength = (fieldName: string): number => {
  switch (fieldName) {
    case 'marca':
      return 100;
    case 'email':
      return 254;
    case 'whatsapp':
      return 20;
    case 'website':
    case 'instagram':
      return 100;
    case 'quien_eres':
    case 'problemas':
    case 'preguntas_frecuentes':
    case 'producto':
      return 2000;
    case 'estilo':
      return 50;
    default:
      return 500;
  }
};

const FormField = ({ 
  type, 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  options, 
  icon: Icon,
  showAIEnhance = false,
  context = {},
  sessionId = '',
  onAIUsageUpdate = () => {}
}: FormFieldProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [originalText, setOriginalText] = useState<string>('');
  const [hasUsedAI, setHasUsedAI] = useState(false);

  const handleChange = (newValue: string) => {
    onChange(name, newValue);
  };

  const handleAIEnhanced = (enhancedText: string) => {
    // Guardar el texto original antes de aplicar la mejora
    setOriginalText(value);
    setHasUsedAI(true);
    onChange(name, enhancedText);
  };

  const handleRestoreOriginal = () => {
    if (originalText) {
      onChange(name, originalText);
      setHasUsedAI(false);
      setOriginalText('');
    }
  };

  const getPlaceholder = () => {
    switch (name) {
      case 'quien_eres':
        return "Ej: Soy coach de vida certificada con 8 años ayudando a mujeres emprendedoras de 30-45 años a encontrar balance entre su negocio y vida personal. Mi método 'Renace' combina PNL con meditación...";
      case 'problemas':
        return "Ej: Ayudo a emprendedoras que se sienten agotadas, culpables por no tener tiempo para sus familias, y frustradas por no lograr el éxito que imaginaron. Mis clientas pasan de trabajar 12 horas diarias sin resultados a tener negocios rentables trabajando 6 horas...";
      case 'producto':
        return "Ej: Mi programa 'Renace', un proceso de coaching de 8 semanas que incluye sesiones individuales, workbook personalizado y comunidad privada. Está diseñado para mujeres que quieren cambios profundos en 90 días...";
      case 'preguntas_frecuentes':
        return "Ej: ¿Cuánto tiempo dura el programa? 8 semanas con sesiones semanales. ¿Es online o presencial? 100% online por Zoom. ¿Qué pasa si no veo resultados? Tienes garantía de 30 días...";
      case 'marca':
        return "Ej: Renace Coaching, María Transformación, Alma Libre";
      case 'email':
        return "tu@email.com";
      case 'whatsapp':
        return "+56912345678";
      case 'website':
        return "www.tumarca.com";
      case 'instagram':
        return "@tumarca";
      default:
        return placeholder;
    }
  };

  const getSuggestions = () => {
    switch (name) {
      case 'marca':
        return [
          "Usa un nombre que refleje tu propósito",
          "Evita nombres genéricos o difíciles de recordar",
          "Considera incluir tu nombre si eres marca personal"
        ];
      case 'email':
        return [
          "Usa un email profesional",
          "Evita emails con números aleatorios"
        ];
      case 'whatsapp':
        return [
          "Incluye código de país (ej: +56 para Chile)",
          "Verifica que sea el número donde atiendes clientes"
        ];
      case 'website':
        return [
          "Si no tienes web, déjalo vacío por ahora",
          "Incluye el dominio completo (www.ejemplo.com)"
        ];
      case 'instagram':
        return [
          "Incluye el @ de tu cuenta",
          "Si no tienes Instagram, déjalo vacío"
        ];
      case 'quien_eres':
        return [
          "Menciona años de experiencia específicos",
          "Define claramente a quién ayudas (edad, profesión, situación)",
          "Incluye tu metodología o enfoque único",
          "Agrega logros o resultados específicos"
        ];
      case 'problemas':
        return [
          "Describe emociones específicas que viven tus clientes",
          "Menciona el 'antes y después' de trabajar contigo",
          "Incluye herramientas o técnicas que usas",
          "Agrega casos de éxito o transformaciones"
        ];
      case 'producto':
        return [
          "Especifica duración del programa/servicio",
          "Menciona qué incluye exactamente",
          "Define el resultado específico que obtendrán",
          "Agrega garantías o testimonios"
        ];
      case 'preguntas_frecuentes':
        return [
          "Responde las 3-5 preguntas más comunes",
          "Sé específico con tiempos y costos",
          "Anticipa objeciones comunes"
        ];
      case 'estilo':
        return [
          "Elige el estilo que mejor represente tu marca",
          "Piensa en cómo quieres que te perciban tus clientes"
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-3 group">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <Label className="text-white text-base sm:text-lg font-medium flex items-center gap-3 flex-1 min-w-0">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover:text-blue-300 transition-colors flex-shrink-0" />
          <span className="break-words">{label}</span>
        </Label>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          {type === 'textarea' && (
            <Button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:text-white hover:bg-white/20 transition-all duration-200"
            >
              {isExpanded ? (
                <>
                  <Minimize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline ml-1">Contraer</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline ml-1">Expandir</span>
                </>
              )}
            </Button>
          )}
          
          {showAIEnhance && (type === 'textarea' || type === 'input') && (
            <>
              <AIEnhanceButton
                currentText={value}
                fieldType={name}
                context={context}
                onEnhanced={handleAIEnhanced}
                sessionId={sessionId}
                onUsageUpdate={onAIUsageUpdate}
              />
              
              {hasUsedAI && originalText && (
                <Button
                  type="button"
                  onClick={handleRestoreOriginal}
                  variant="outline"
                  size="sm"
                  className="bg-amber-600/20 border-amber-400/40 text-amber-200 hover:text-white hover:bg-amber-600/40 transition-all duration-200"
                  title="Volver al texto anterior"
                >
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden lg:inline ml-1">Volver al anterior</span>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      
      {type === 'input' && (
        <Input
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={getPlaceholder()}
          maxLength={getFieldMaxLength(name)}
          showCounter={true}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-blue-400 transition-all duration-300 py-3 text-base sm:text-lg"
        />
      )}
      
      {type === 'textarea' && (
        <Textarea
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={getPlaceholder()}
          rows={isExpanded ? 8 : 4}
          maxLength={getFieldMaxLength(name)}
          showCounter={true}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-blue-400 transition-all duration-300 text-base sm:text-lg resize-none"
        />
      )}
      
      {type === 'select' && (
        <Select value={value} onValueChange={handleChange}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white focus:bg-white/20 focus:border-blue-400 transition-all duration-300 py-3 text-base sm:text-lg">
            <SelectValue placeholder="Selecciona tu estilo" className="text-white/70" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-300">
            {options?.map((option) => (
              <SelectItem 
                key={option} 
                value={option}
                className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50 cursor-pointer"
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      
      {/* Validación inteligente - mostrar siempre */}
      <SmartValidation 
        value={value} 
        fieldType={name} 
        suggestions={getSuggestions()}
      />
    </div>
  );
};

export default FormField;
