
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const WhatsAppFloat = () => {
  const { t } = useLanguage();
  const phoneNumber = '56962791772';
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(t('whatsappMessage'))}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={24} />
      <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {t('whatsappTooltip')}
      </span>
    </button>
  );
};

export default WhatsAppFloat;
