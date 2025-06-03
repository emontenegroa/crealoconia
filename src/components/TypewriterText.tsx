
import React, { useState, useEffect } from 'react';

const TypewriterText = () => {
  const phrases = [
    "mi nombre es Juan Pablo y vendo cursos online",
    "soy María y ofrezco consultoría en marketing",
    "me llamo Carlos y tengo un negocio de coaching",
    "soy Ana y vendo productos digitales",
    "mi nombre es Luis y ofrezco servicios de diseño",
    "soy Patricia y tengo una tienda de ropa",
    "me llamo Roberto y doy clases particulares"
  ];

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
          setCurrentPhraseIndex((prevIndex) => 
            prevIndex === phrases.length - 1 ? 0 : prevIndex + 1
          );
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

  return (
    <div className="text-xl md:text-2xl text-purple-200 mb-8 max-w-4xl mx-auto leading-relaxed">
      <strong>¿Cansado de buscar plantillas y escribir textos para tu web?</strong>
      <br />
      <div className="mt-4 mb-4 min-h-[2em] flex items-center justify-center">
        <span className="text-yellow-300 font-medium italic">
          "{currentText}"
          <span className="animate-pulse text-yellow-400">|</span>
        </span>
      </div>
      <span className="text-white font-semibold">
        Solo respondes 10 preguntas específicas y nosotros generamos tu sitio web completo.
        <br />
        Sin plantillas genéricas. Sin agencias. Directo al resultado.
      </span>
    </div>
  );
};

export default TypewriterText;
