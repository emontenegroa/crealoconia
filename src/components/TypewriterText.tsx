import React, { useState, useEffect } from 'react';
const TypewriterText = () => {
  const phrases = ["crear tu web", "conseguir clientes", "vender servicios", "generar contenido"];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }
      if (isDeleting) {
        setCurrentText(currentPhrase.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentPhraseIndex(prevIndex => prevIndex === phrases.length - 1 ? 0 : prevIndex + 1);
        }
      } else {
        setCurrentText(currentPhrase.substring(0, currentText.length + 1));
        if (currentText === currentPhrase) {
          setIsPaused(true);
        }
      }
    }, isDeleting ? 50 : isPaused ? 2000 : 100);
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentPhraseIndex, phrases]);
  return <span className="text-blue-600 font-bold inline-block min-w-[280px] sm:min-w-[320px] h-[2.4em] sm:h-[1.2em] leading-tight align-top text-center">
      {currentText}
      <span className="animate-pulse text-blue-400">|</span>
    </span>;
};
export default TypewriterText;