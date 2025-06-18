import { useState, useEffect } from 'react';

export type Language = 'es' | 'en';

interface Translations {
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroWarning: string;
  heroSolution: string;
  heroCTA: string;
  loadExampleButton: string;
  
  // Form Labels
  formTitle: string;
  brandLabel: string;
  brandPlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  whatsappLabel: string;
  whatsappPlaceholder: string;
  websiteLabel: string;
  websitePlaceholder: string;
  instagramLabel: string;
  instagramPlaceholder: string;
  whoAreYouLabel: string;
  whoAreYouPlaceholder: string;
  problemLabel: string;
  problemPlaceholder: string;
  faqLabel: string;
  faqPlaceholder: string;
  styleLabel: string;
  productLabel: string;
  productPlaceholder: string;
  
  // Form Options
  noWebsite: string;
  noInstagram: string;
  
  // Styles
  styles: {
    Cercano: string;
    Profesional: string;
    Inspirador: string;
    'Con humor': string;
    Técnico: string;
  };
  
  // Buttons
  generateButton: string;
  generateWebsite: string;
  securityMessage: string;
  
  // WhatsApp
  whatsappMessage: string;
  whatsappTooltip: string;
}

const translations: Record<Language, Translations> = {
  es: {
    heroTitle: "Kit IA de Esteban",
    heroSubtitle: "Tu presencia digital en minutos",
    heroDescription: "Genera automáticamente contenido para redes sociales y tu página web profesional usando inteligencia artificial",
    heroWarning: "¿Cansado de perder tiempo creando contenido y páginas web desde cero?",
    heroSolution: "¡Aquí tienes la solución completa automatizada con IA!",
    heroCTA: "🧠 Obtener mi Kit IA Gratis",
    loadExampleButton: "Ver ejemplo",
    
    formTitle: "Genera tu presencia digital completa",
    brandLabel: "🏷️ Nombre de tu marca o negocio",
    brandPlaceholder: "Ej: FlexiTime Academy",
    emailLabel: "📧 Tu email",
    emailPlaceholder: "Ej: sofia@flexitime.com",
    whatsappLabel: "📱 Tu WhatsApp",
    whatsappPlaceholder: "Ej: +34612345678",
    websiteLabel: "🌐 Tu sitio web actual",
    websitePlaceholder: "Ej: www.flexitimeacademy.com",
    instagramLabel: "📸 Tu Instagram",
    instagramPlaceholder: "Ej: @flexitime_academy",
    whoAreYouLabel: "👤 ¿Quién eres y qué haces?",
    whoAreYouPlaceholder: "Describe tu experiencia, especialidad y cómo ayudas a tus clientes...",
    problemLabel: "🎯 ¿Qué problemas resuelves?",
    problemPlaceholder: "Describe los problemas específicos que enfrentan tus clientes...",
    faqLabel: "❓ ¿Qué te preguntan frecuentemente?",
    faqPlaceholder: "Lista las preguntas más comunes que recibes de tus clientes...",
    styleLabel: "✍️ Estilo de comunicación",
    productLabel: "🚀 Tu producto o servicio",
    productPlaceholder: "Describe tu oferta principal, qué incluye y cómo ayuda...",
    
    noWebsite: "No tengo sitio web",
    noInstagram: "No tengo Instagram",
    
    styles: {
      Cercano: "Cercano",
      Profesional: "Profesional", 
      Inspirador: "Inspirador",
      'Con humor': "Con humor",
      Técnico: "Técnico"
    },
    
    generateButton: "🧠 Generar mi Kit IA",
    generateWebsite: "🧠 Generar mi sitio web",
    securityMessage: "Tus datos están seguros. No compartimos información personal.",
    
    whatsappMessage: "Hola! Me interesa saber más sobre crear mi sitio web profesional 🚀",
    whatsappTooltip: "Contactar por WhatsApp"
  },
  en: {
    heroTitle: "Esteban's AI Kit",
    heroSubtitle: "Your digital presence in minutes",
    heroDescription: "Automatically generate social media content and your professional website using artificial intelligence",
    heroWarning: "Tired of wasting time creating content and websites from scratch?",
    heroSolution: "Here's the complete AI-automated solution!",
    heroCTA: "🧠 Get my Free AI Kit",
    loadExampleButton: "See example",
    
    formTitle: "Generate your complete digital presence",
    brandLabel: "🏷️ Your brand or business name",
    brandPlaceholder: "E.g: FlexiTime Academy",
    emailLabel: "📧 Your email",
    emailPlaceholder: "E.g: sofia@flexitime.com",
    whatsappLabel: "📱 Your WhatsApp",
    whatsappPlaceholder: "E.g: +34612345678",
    websiteLabel: "🌐 Your current website",
    websitePlaceholder: "E.g: www.flexitimeacademy.com",
    instagramLabel: "📸 Your Instagram",
    instagramPlaceholder: "E.g: @flexitime_academy",
    whoAreYouLabel: "👤 Who are you and what do you do?",
    whoAreYouPlaceholder: "Describe your experience, specialty and how you help your clients...",
    problemLabel: "🎯 What problems do you solve?",
    problemPlaceholder: "Describe the specific problems your clients face...",
    faqLabel: "❓ What do they frequently ask you?",
    faqPlaceholder: "List the most common questions you receive from your clients...",
    styleLabel: "✍️ Communication style",
    productLabel: "🚀 Your product or service",
    productPlaceholder: "Describe your main offer, what it includes and how it helps...",
    
    noWebsite: "I don't have a website",
    noInstagram: "I don't have Instagram",
    
    styles: {
      Cercano: "Friendly",
      Profesional: "Professional",
      Inspirador: "Inspiring", 
      'Con humor': "Humorous",
      Técnico: "Technical"
    },
    
    generateButton: "🧠 Generate my AI Kit",
    generateWebsite: "🧠 Generate my website",
    securityMessage: "Your data is secure. We don't share personal information.",
    
    whatsappMessage: "Hi! I'm interested in learning more about creating my professional website 🚀",
    whatsappTooltip: "Contact via WhatsApp"
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

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const t = (key: keyof Translations): string => {
    const value = translations[language][key];
    if (typeof value === 'string') {
      return value;
    }
    return key; // fallback to key if not found
  };

  return {
    language,
    changeLanguage,
    t,
    translations: translations[language]
  };
};
