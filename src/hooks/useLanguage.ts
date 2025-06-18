
import { useState, useEffect } from 'react';

export type Language = 'es' | 'en';

const translations = {
  es: {
    // Hero Section
    heroTitle: 'Kit IA Gratuito',
    heroSubtitle: 'Crea tu sitio web profesional y contenido para redes con inteligencia artificial',
    heroDescription: 'Estás haciendo algo valioso. Es hora de mostrarlo con claridad, confianza y presencia profesional. Tu web no puede seguir siendo un pendiente.',
    heroWarning: '⚠️ Si solo publicas en redes sociales, dependes de algoritmos que pueden cambiar de un día para otro.',
    heroSolution: '✅ Con tu propio sitio web profesional, TÚ controlas cómo te encuentran tus clientes.',
    heroCTA: '🧠 Quiero mi Kit IA gratuito',
    
    // Form
    formTitle: 'Responde estas preguntas para generar tu sitio web',
    generateWebsite: 'GENERAR MI SITIO WEB',
    
    // Form Fields
    brandLabel: '1. ¿Cómo se llama tu emprendimiento o marca personal?',
    brandPlaceholder: 'Ej: Luz Interior Coaching, Panadería Las 3 Hermanas, Soy Nombre Apellido',
    emailLabel: '2. Correo electrónico (donde recibirás tu Kit IA)',
    emailPlaceholder: 'Ej: info@tumarca.com',
    whatsappLabel: '3. WhatsApp (para agregar botón de contacto en tu web)',
    whatsappPlaceholder: 'Ej: 56945487423 (solo números, sin +)',
    websiteLabel: '4. Página web actual (si tienes)',
    websitePlaceholder: 'Ej: www.tumarca.com',
    noWebsite: 'No tengo página web (se creará automáticamente)',
    instagramLabel: '5. Instagram (nombre de usuario, sin @)',
    instagramPlaceholder: 'Ej: tumarca',
    noInstagram: 'No tengo Instagram',
    whoAreYouLabel: '6. ¿Quién eres y qué te apasiona de tu trabajo? ¿A quién ayudas? (Sé específico)',
    whoAreYouPlaceholder: 'Ej: Soy Carolina, coach de vida certificada con 8 años de experiencia. Me apasiona acompañar a mujeres emprendedoras de 30-45 años que buscan reconectar con su propósito...',
    problemLabel: '7. ¿Qué problema específico vives día a día con tus clientes y cómo los ayudas a solucionarlo?',
    problemPlaceholder: 'Ej: Mis clientas llegan sintiéndose bloqueadas emocionalmente, con miedo al fracaso y síndrome del impostor. Yo las ayudo con un proceso de autoconocimiento profundo usando técnicas de PNL...',
    faqLabel: '8. ¿Qué te preguntan siempre tus clientes o qué disfrutas explicar una y otra vez?',
    faqPlaceholder: 'Ej: Me preguntan constantemente si es posible cambiar de vida después de los 40 años cuando ya tienes responsabilidades. Me encanta mostrarles que siempre es posible...',
    styleLabel: '9. ¿Cómo te gusta comunicarte en redes sociales?',
    productLabel: '10. ¿Cuál es tu producto o servicio principal que quieres vender más? (Describe beneficios específicos)',
    productPlaceholder: 'Ej: Mi programa "Renace", un proceso de coaching de 8 semanas que incluye sesiones individuales, workbook personalizado y comunidad privada. Está diseñado para mujeres que quieren cambios profundos en 90 días...',
    
    // Communication styles
    styles: {
      'Cercano': 'Cercano',
      'Profesional': 'Profesional',
      'Inspirador': 'Inspirador',
      'Con humor': 'Con humor',
      'Técnico': 'Técnico'
    },
    
    // WhatsApp
    whatsappMessage: 'Hola! Me interesa saber más sobre crear mi sitio web profesional 🚀',
    whatsappTooltip: '¿Necesitas ayuda?',
    
    // Security message
    securityMessage: '🔐 100% seguro y sin spam'
  },
  en: {
    // Hero Section
    heroTitle: 'Free AI Kit',
    heroSubtitle: 'Create your professional website and social media content with artificial intelligence',
    heroDescription: 'You\'re doing something valuable. It\'s time to show it with clarity, confidence, and professional presence. Your website can\'t keep being a pending task.',
    heroWarning: '⚠️ If you only post on social media, you depend on algorithms that can change overnight.',
    heroSolution: '✅ With your own professional website, YOU control how your clients find you.',
    heroCTA: '🧠 I want my free AI Kit',
    
    // Form
    formTitle: 'Answer these questions to generate your website',
    generateWebsite: 'GENERATE MY WEBSITE',
    
    // Form Fields
    brandLabel: '1. What\'s the name of your business or personal brand?',
    brandPlaceholder: 'Ex: Inner Light Coaching, Three Sisters Bakery, I\'m First Last',
    emailLabel: '2. Email address (where you\'ll receive your AI Kit)',
    emailPlaceholder: 'Ex: info@yourbrand.com',
    whatsappLabel: '3. WhatsApp (to add contact button on your website)',
    whatsappPlaceholder: 'Ex: 56945487423 (numbers only, no +)',
    websiteLabel: '4. Current website (if you have one)',
    websitePlaceholder: 'Ex: www.yourbrand.com',
    noWebsite: 'I don\'t have a website (will be created automatically)',
    instagramLabel: '5. Instagram (username, without @)',
    instagramPlaceholder: 'Ex: yourbrand',
    noInstagram: 'I don\'t have Instagram',
    whoAreYouLabel: '6. Who are you and what are you passionate about in your work? Who do you help? (Be specific)',
    whoAreYouPlaceholder: 'Ex: I\'m Carolina, a certified life coach with 8 years of experience. I\'m passionate about accompanying female entrepreneurs aged 30-45 who seek to reconnect with their purpose...',
    problemLabel: '7. What specific problem do you experience daily with your clients and how do you help them solve it?',
    problemPlaceholder: 'Ex: My clients come feeling emotionally blocked, with fear of failure and impostor syndrome. I help them with a deep self-knowledge process using NLP techniques...',
    faqLabel: '8. What do your clients always ask you or what do you enjoy explaining over and over?',
    faqPlaceholder: 'Ex: They constantly ask me if it\'s possible to change your life after 40 when you already have responsibilities. I love showing them that it\'s always possible...',
    styleLabel: '9. How do you like to communicate on social media?',
    productLabel: '10. What\'s your main product or service that you want to sell more? (Describe specific benefits)',
    productPlaceholder: 'Ex: My "Reborn" program, an 8-week coaching process that includes individual sessions, personalized workbook and private community. It\'s designed for women who want deep changes in 90 days...',
    
    // Communication styles
    styles: {
      'Cercano': 'Friendly',
      'Profesional': 'Professional',
      'Inspirador': 'Inspiring',
      'Con humor': 'Humorous',
      'Técnico': 'Technical'
    },
    
    // WhatsApp
    whatsappMessage: 'Hello! I\'m interested in learning more about creating my professional website 🚀',
    whatsappTooltip: 'Need help?',
    
    // Security message
    securityMessage: '🔐 100% secure and no spam'
  }
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: keyof typeof translations.es): string => {
    return translations[language][key] || key;
  };

  return {
    language,
    changeLanguage,
    t,
    translations: translations[language]
  };
};
