import React, { useState, useEffect } from 'react';

const CleanTypewriter = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const words = [
    'coaches y terapeutas',
    'consultores digitales', 
    'freelancers creativos',
    'emprendedores',
    'marcas personales'
  ];

  useEffect(() => {
    const currentWord = words[wordIndex];
    const shouldDelete = isDeleting && currentText === currentWord;
    const shouldComplete = !isDeleting && currentText === currentWord;

    if (shouldComplete) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (shouldDelete) {
      setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 500);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentText(currentWord.substring(0, currentIndex + (isDeleting ? -1 : 1)));
      setCurrentIndex(prev => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, wordIndex]);

  return (
    <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
      <span className="text-foreground">para </span>
      <span className="text-accent min-w-[300px] inline-block text-left">
        {currentText}
        <span className="animate-pulse">|</span>
      </span>
    </div>
  );
};

export default CleanTypewriter;