
import React, { useState, useEffect } from 'react';

const TypewriterText = () => {
  const phrases = [
    "Bienvenidos a mi página web oficial",
    "Somos una empresa líder en el mercado", 
    "Ofrecemos los mejores servicios del rubro",
    "Contamos con años de experiencia",
    "Nuestro equipo está altamente capacitado"
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
    <div className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
      <strong className="text-gray-900">¿Cansado de escribir lo mismo que todos?</strong>
      <br />
      <div className="mt-4 mb-4 min-h-[1.5em] flex items-center justify-center">
        <span className="text-blue-600 font-medium italic">
          "{currentText}"
          <span className="animate-pulse text-blue-400">|</span>
        </span>
      </div>
      <span className="text-gray-900 font-semibold">
        Creamos tu sitio web único en minutos.
        <br />
        Sin plantillas. Sin textos genéricos.
      </span>
    </div>
  );
};

export default TypewriterText;
