
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
          color: 'text-emerald-600',
          bgColor: 'bg-emerald-50',
          message: '¡Excelente! Tu respuesta es muy completa.',
          borderColor: 'border-emerald-200'
        };
      case 'valid':
        return {
          icon: CheckCircle2,
          color: 'text-emerald-600',
          bgColor: 'bg-emerald-50',
          message: 'Perfecto ✓',
          borderColor: 'border-emerald-200'
        };
      case 'medium':
        return {
          icon: Lightbulb,
          color: 'text-amber-600',
          bgColor: 'bg-amber-50',
          message: 'Bien, pero puedes agregar más detalles para mejores resultados.',
          borderColor: 'border-amber-200'
        };
      case 'short':
        return {
          icon: AlertCircle,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          message: 'Muy corto. Agrega más información para mejores resultados.',
          borderColor: 'border-orange-200'
        };
      case 'invalid':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          message: 'Formato inválido. Verifica la información.',
          borderColor: 'border-red-200'
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
              <p className="text-xs text-blue-600 mb-1">💡 Sugerencias:</p>
              <ul className="text-xs text-gray-600 space-y-1">
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
