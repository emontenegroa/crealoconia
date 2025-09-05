
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LucideIcon, Maximize2, Minimize2 } from 'lucide-react';
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

  const handleChange = (newValue: string) => {
    onChange(name, newValue);
  };

  const handleAIEnhanced = (enhancedText: string) => {
    onChange(name, enhancedText);
  };

  const getSuggestions = () => {
    switch (name) {
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
      default:
        return [];
    }
  };

  return (
    <div className="space-y-3 group">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <Label className="text-gray-900 text-base sm:text-lg font-medium flex items-center gap-3 flex-1 min-w-0">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:text-blue-700 transition-colors flex-shrink-0" />
          <span className="break-words">{label}</span>
        </Label>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          {type === 'textarea' && (
            <Button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              variant="outline"
              size="sm"
              className="bg-white border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-all duration-200"
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
            <AIEnhanceButton
              currentText={value}
              fieldType={name}
              context={context}
              onEnhanced={handleAIEnhanced}
              sessionId={sessionId}
              onUsageUpdate={onAIUsageUpdate}
            />
          )}
        </div>
      </div>
      
      {type === 'input' && (
        <Input
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-blue-500 transition-all duration-300 py-3 text-base sm:text-lg"
        />
      )}
      
      {type === 'textarea' && (
        <Textarea
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          rows={isExpanded ? 8 : 4}
          className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-blue-500 transition-all duration-300 text-base sm:text-lg resize-none"
        />
      )}
      
      {type === 'select' && (
        <Select value={value} onValueChange={handleChange}>
          <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900 focus:bg-white focus:border-blue-500 transition-all duration-300 py-3 text-base sm:text-lg">
            <SelectValue placeholder="Selecciona tu estilo" className="text-gray-500" />
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
      
      {/* Validación inteligente */}
      <SmartValidation 
        value={value} 
        fieldType={name} 
        suggestions={showAIEnhance ? getSuggestions() : []}
      />
    </div>
  );
};

export default FormField;
