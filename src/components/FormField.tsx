
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { LucideIcon } from 'lucide-react';
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
        <Label className="text-white text-base sm:text-lg font-medium flex items-center gap-3 flex-1 min-w-0">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300 group-hover:text-purple-200 transition-colors flex-shrink-0" />
          <span className="break-words">{label}</span>
        </Label>
        
        {showAIEnhance && (type === 'textarea' || type === 'input') && (
          <div className="flex-shrink-0">
            <AIEnhanceButton
              currentText={value}
              fieldType={name}
              context={context}
              onEnhanced={handleAIEnhanced}
              sessionId={sessionId}
              onUsageUpdate={onAIUsageUpdate}
            />
          </div>
        )}
      </div>
      
      {type === 'input' && (
        <Input
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="bg-white/20 border-white/30 text-white placeholder:text-purple-200 focus:bg-white/30 focus:border-purple-300 transition-all duration-300 py-3 text-base sm:text-lg"
        />
      )}
      
      {type === 'textarea' && (
        <Textarea
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="bg-white/20 border-white/30 text-white placeholder:text-purple-200 focus:bg-white/30 focus:border-purple-300 transition-all duration-300 text-base sm:text-lg resize-none"
        />
      )}
      
      {type === 'select' && (
        <Select value={value} onValueChange={handleChange}>
          <SelectTrigger className="bg-white/20 border-white/30 text-white focus:bg-white/30 focus:border-purple-300 transition-all duration-300 py-3 text-base sm:text-lg">
            <SelectValue placeholder="Selecciona tu estilo" className="text-purple-200" />
          </SelectTrigger>
          <SelectContent className="bg-purple-900/95 border-purple-500/50 backdrop-blur-lg">
            {options?.map((option) => (
              <SelectItem 
                key={option} 
                value={option}
                className="text-white hover:bg-purple-700/50 focus:bg-purple-700/50 cursor-pointer"
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
