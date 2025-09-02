import React, { useRef, useEffect } from 'react';

interface ReCAPTCHAComponentProps {
  siteKey: string;
  onVerify: (token: string | null) => void;
}

declare global {
  interface Window {
    grecaptcha: {
      render: (container: Element | string, parameters: any) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
      execute: (widgetId?: number) => void;
    };
  }
}

const ReCAPTCHAComponent: React.FC<ReCAPTCHAComponentProps> = ({ siteKey, onVerify }) => {
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha && recaptchaRef.current) {
        try {
          widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: siteKey,
            callback: (token: string) => {
              onVerify(token);
            },
            'expired-callback': () => {
              onVerify(null);
            },
            'error-callback': () => {
              onVerify(null);
            }
          });
        } catch (error) {
          console.error('Error renderizando reCAPTCHA:', error);
        }
      }
    };

    // Verificar si reCAPTCHA ya está cargado
    if (window.grecaptcha) {
      loadRecaptcha();
    } else {
      // Esperar a que se cargue
      const checkRecaptcha = setInterval(() => {
        if (window.grecaptcha) {
          clearInterval(checkRecaptcha);
          loadRecaptcha();
        }
      }, 100);

      // Limpiar el intervalo después de 10 segundos
      setTimeout(() => {
        clearInterval(checkRecaptcha);
      }, 10000);

      return () => clearInterval(checkRecaptcha);
    }

    return () => {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch (error) {
          console.error('Error reseteando reCAPTCHA:', error);
        }
      }
    };
  }, [siteKey, onVerify]);

  return <div ref={recaptchaRef} className="flex justify-center"></div>;
};

export default ReCAPTCHAComponent;