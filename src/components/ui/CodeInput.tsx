import React, { useState, useRef, useEffect } from 'react';

interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  autoFocus?: boolean;
}

export default function CodeInput({ 
  value, 
  onChange, 
  length = 6, 
  disabled = false,
  autoFocus = false 
}: CodeInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focused, setFocused] = useState(-1);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus, disabled]);

  const handleChange = (index: number, newValue: string) => {
    // Solo permitir dígitos
    if (newValue && !/^\d$/.test(newValue)) return;

    const newCode = value.split('');
    newCode[index] = newValue;
    
    // Rellenar con espacios vacíos si es necesario
    while (newCode.length < length) {
      newCode.push('');
    }
    
    onChange(newCode.join(''));

    // Auto-focus al siguiente campo
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      
      if (value[index]) {
        // Si hay un valor, lo borramos
        handleChange(index, '');
      } else if (index > 0) {
        // Si no hay valor, vamos al anterior y lo borramos
        inputRefs.current[index - 1]?.focus();
        handleChange(index - 1, '');
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(pastedData);
    
    // Focus en el último campo lleno
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex gap-3 justify-center">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => setFocused(index)}
          onBlur={() => setFocused(-1)}
          disabled={disabled}
          className={`
            w-12 h-14 text-center text-lg font-medium rounded-lg border-2 
            transition-all duration-200 outline-none
            ${focused === index 
              ? 'border-gray-900 bg-gray-50 dark:border-gray-100 dark:bg-gray-800' 
              : value[index] 
                ? 'border-gray-400 bg-white dark:border-gray-500 dark:bg-gray-900' 
                : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400 dark:hover:border-gray-500'}
            focus:ring-0 focus:border-gray-900 focus:bg-gray-50 
            dark:focus:border-gray-100 dark:focus:bg-gray-800
            text-gray-900 dark:text-gray-100
          `}
          maxLength={1}
        />
      ))}
    </div>
  );
}