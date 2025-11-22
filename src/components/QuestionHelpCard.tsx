import { Lightbulb } from 'lucide-react';

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
    <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="bg-blue-500/5 border-l-2 border-blue-400/40 rounded px-3 py-2.5">
        <div className="flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1.5 flex-1">
            <p className="text-xs text-slate-300 leading-relaxed">{helper}</p>
            {checklist.length > 0 && (
              <ul className="space-y-1 text-xs text-slate-400">
                {checklist.map((item, index) => (
                  <li key={index} className="flex items-start gap-1.5">
                    <span className="text-blue-400/60 mt-0.5">•</span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionHelpCard;
