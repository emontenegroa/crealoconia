import { CheckCircle2, Lightbulb } from 'lucide-react';

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
  if (!isVisible) return null;

  return (
    <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
        {/* Mensaje de validación */}
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium text-emerald-300">Perfecto ✓</span>
        </div>

        {/* Sugerencias */}
        {checklist.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-foreground">Sugerencias:</span>
            </div>
            <ul className="space-y-1.5 ml-1">
              {checklist.map((item, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-foreground/60">•</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionHelpCard;
