import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestionHelpCardProps {
  checklist?: string[];
  helper: string;
  isVisible: boolean;
}

const QuestionHelpCard: React.FC<QuestionHelpCardProps> = ({ 
  checklist = [], 
  helper, 
  isVisible 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible) return null;

  return (
    <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm">
        {/* Helper principal */}
        <div className="flex items-start gap-3 mb-3">
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-200 leading-relaxed">{helper}</p>
        </div>

        {/* Botón para expandir checklist */}
        {checklist.length > 0 && (
          <div className="border-t border-blue-500/20 pt-3">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-between w-full text-left hover:bg-blue-500/10 rounded-md px-2 py-2 transition-colors"
            >
              <span className="text-sm font-medium text-blue-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Qué incluir en tu respuesta ({checklist.length} puntos)
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-blue-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-blue-400" />
              )}
            </button>

            {/* Checklist desplegable */}
            {isExpanded && (
              <div className="mt-3 space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                {checklist.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-2 text-sm text-slate-300 bg-slate-800/40 rounded-md p-2.5 hover:bg-slate-800/60 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-blue-400">{index + 1}</span>
                    </div>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionHelpCard;
