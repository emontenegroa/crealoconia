import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface MathCaptchaProps {
  onVerify: (isValid: boolean) => void;
}

const MathCaptcha: React.FC<MathCaptchaProps> = ({ onVerify }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isValid, setIsValid] = useState(false);

  // Generar números aleatorios
  useEffect(() => {
    generateNumbers();
  }, []);

  const generateNumbers = () => {
    const n1 = Math.floor(Math.random() * 10) + 1; // 1-10
    const n2 = Math.floor(Math.random() * 10) + 1; // 1-10
    setNum1(n1);
    setNum2(n2);
    setUserAnswer('');
    setIsValid(false);
    onVerify(false);
  };

  const handleAnswerChange = (value: string) => {
    setUserAnswer(value);
    const correctAnswer = num1 + num2;
    const isCorrect = parseInt(value) === correctAnswer;
    setIsValid(isCorrect);
    onVerify(isCorrect);
  };

  return (
    <div className="space-y-3 p-4 bg-muted border border-border rounded-lg">
      <Label className="text-sm font-medium text-foreground">
        🔒 Verificación de seguridad
      </Label>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-lg font-mono bg-background px-3 py-2 rounded border border-border">
          <span className="font-bold text-primary">{num1}</span>
          <span className="text-muted-foreground">+</span>
          <span className="font-bold text-primary">{num2}</span>
          <span className="text-muted-foreground">=</span>
        </div>
        
        <Input
          type="number"
          value={userAnswer}
          onChange={(e) => handleAnswerChange(e.target.value)}
          placeholder="?"
          className={`w-20 text-center font-mono ${
            userAnswer && isValid 
              ? 'border-green-500 bg-green-50' 
              : userAnswer && !isValid 
              ? 'border-red-500 bg-red-50' 
              : ''
          }`}
        />
        
        {userAnswer && isValid && (
          <span className="text-green-600 text-sm">✓ Correcto</span>
        )}
        
        {userAnswer && !isValid && (
          <span className="text-red-600 text-sm">✗ Incorrecto</span>
        )}
      </div>
      
      <button
        type="button"
        onClick={generateNumbers}
        className="text-xs text-primary hover:text-primary/80 underline"
      >
        Generar nueva operación
      </button>
    </div>
  );
};

export default MathCaptcha;