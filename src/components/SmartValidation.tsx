
import React from 'react';
import { CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';

interface SmartValidationProps {
  value: string;
  fieldType: string;
  suggestions?: string[];
}

const SmartValidation = ({ value, fieldType, suggestions = [] }: SmartValidationProps) => {
  const getValidationStatus = () => {
    if (!value.trim()) return 'empty';
    
    switch (fieldType) {
      case 'email':
        return value.includes('@') && value.includes('.') ? 'valid' : 'invalid';
      case 'whatsapp':
        return value.length >= 8 ? 'valid' : 'invalid';
      case 'textarea':
        if (value.length < 20) return 'short';
        if (value.length < 50) return 'medium';
        return 'excellent';
      case 'marca':
        return value.length >= 3 ? 'valid' : 'short';
      default:
        return value.length > 0 ? 'valid' : 'empty';
    }
  };

  const status = getValidationStatus();

  const getStatusConfig = () => {
    switch (status) {
      case 'excellent':
        return {
          icon: CheckCircle2,
          color: 'text-green-400',
          bgColor: 'bg-green-500/20',
          message: '¡Excelente! Tu respuesta es muy completa.',
          borderColor: 'border-green-400/50'
        };
      case 'valid':
        return {
          icon: CheckCircle2,
          color: 'text-green-400',
          bgColor: 'bg-green-500/20',
          message: 'Perfecto ✓',
          borderColor: 'border-green-400/50'
        };
      case 'medium':
        return {
          icon: Lightbulb,
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-500/20',
          message: 'Bien, pero puedes agregar más detalles para mejores resultados.',
          borderColor: 'border-yellow-400/50'
        };
      case 'short':
        return {
          icon: AlertCircle,
          color: 'text-orange-400',
          bgColor: 'bg-orange-500/20',
          message: 'Muy corto. Agrega más información para mejores resultados.',
          borderColor: 'border-orange-400/50'
        };
      case 'invalid':
        return {
          icon: AlertCircle,
          color: 'text-red-400',
          bgColor: 'bg-red-500/20',
          message: 'Formato inválido. Verifica la información.',
          borderColor: 'border-red-400/50'
        };
      default:
        return null;
    }
  };

  const config = getStatusConfig();
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className={`mt-2 p-3 rounded-lg border ${config.bgColor} ${config.borderColor} transition-all duration-300`}>
      <div className="flex items-start gap-2">
        <Icon className={`w-4 h-4 ${config.color} mt-0.5 flex-shrink-0`} />
        <div className="flex-1">
          <p className={`text-sm ${config.color} font-medium`}>
            {config.message}
          </p>
          {suggestions.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-purple-300 mb-1">💡 Sugerencias:</p>
              <ul className="text-xs text-purple-200 space-y-1">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>• {suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartValidation;
