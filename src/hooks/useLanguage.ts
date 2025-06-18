import { useState, useEffect } from 'react';

export type Language = 'es' | 'en';

export interface Translations {
  // Existing translations
  brand: string;
  email: string;
  whatsapp: string;
  website: string;
  instagram: string;
  whoAreYou: string;
  problems: string;
  frequentQuestions: string;
  style: string;
  product: string;
  noWebsite: string;
  noInstagram: string;
  generate: string;
  close: string;
  step1: string;
  step2: string;
  step3: string;
  // New translations to fix errors
  heroWarning: string;
  heroSolution: string;
  heroCTA: string;
  formTitle: string;
  generateWebsite: string;
  securityMessage: string;
}

const translations: Record<Language, Translations> = {
  es: {
    brand: "¿Cómo se llama tu emprendimiento o marca personal?",
    email: "Correo electrónico (donde recibirás tu Kit IA)",
    whatsapp: "WhatsApp (para agregar botón de contacto en tu web)",
    website: "Página web actual (si tienes)",
    instagram: "Instagram (nombre de usuario, sin @)",
    whoAreYou: "¿Quién eres y qué te apasiona de tu trabajo? ¿A quién ayudas? (Sé específico)",
    problems: "¿Qué problema específico vives día a día con tus clientes y cómo los ayudas a solucionarlo?",
    frequentQuestions: "¿Qué te preguntan siempre tus clientes o qué disfrutas explicar una y otra vez?",
    style: "¿Cómo te gusta comunicarte en redes sociales?",
    product: "¿Cuál es tu producto o servicio principal que quieres vender más? (Describe beneficios específicos)",
    noWebsite: "No tengo página web (se creará automáticamente)",
    noInstagram: "No tengo Instagram",
    generate: "GENERAR MI SITIO WEB",
    close: "Cerrar",
    step1: "Información Básica",
    step2: "Perfil Personal", 
    step3: "Finalizar",
    // Keeping existing Spanish texts exactly as they are
    heroWarning: "Tu web no puede seguir siendo un pendiente.",
    heroSolution: "Estás haciendo algo valioso. Es hora de mostrarlo con claridad, confianza y presencia profesional.",
    heroCTA: "GENERAR MI SITIO WEB",
    formTitle: "Responde estas preguntas para generar tu sitio web",
    generateWebsite: "GENERAR MI SITIO WEB",
    securityMessage: "🔐 100% seguro y sin spam"
  },
  en: {
    brand: "What's the name of your business or personal brand?",
    email: "Email address (where you'll receive your AI Kit)",
    whatsapp: "WhatsApp (to add contact button on your website)",
    website: "Current website (if you have one)",
    instagram: "Instagram (username, without @)",
    whoAreYou: "Who are you and what are you passionate about in your work? Who do you help? (Be specific)",
    problems: "What specific problem do you face daily with your clients and how do you help them solve it?",
    frequentQuestions: "What do your clients always ask you or what do you enjoy explaining over and over?",
    style: "How do you like to communicate on social media?",
    product: "What is your main product or service that you want to sell more? (Describe specific benefits)",
    noWebsite: "I don't have a website (will be created automatically)",
    noInstagram: "I don't have Instagram",
    generate: "GENERATE MY WEBSITE",
    close: "Close",
    step1: "Basic Information",
    step2: "Personal Profile",
    step3: "Finalize",
    heroWarning: "Your website can't keep being a pending task.",
    heroSolution: "You're doing something valuable. It's time to show it with clarity, confidence and professional presence.",
    heroCTA: "GENERATE MY WEBSITE",
    formTitle: "Answer these questions to generate your website",
    generateWebsite: "GENERATE MY WEBSITE",
    securityMessage: "🔐 100% secure and spam-free"
  }
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'es';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: keyof Translations): string => {
    return translations[language][key];
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  return {
    language,
    t,
    toggleLanguage,
    setLanguage
  };
};
