import React, { forwardRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface RecaptchaProps {
  onChange: (token: string | null) => void;
  onExpired?: () => void;
  onError?: () => void;
  size?: 'compact' | 'normal' | 'invisible';
  theme?: 'light' | 'dark';
  sitekey: string;
}

const Recaptcha = forwardRef<ReCAPTCHA, RecaptchaProps>(
  ({ onChange, onExpired, onError, size = 'normal', theme = 'light', sitekey }, ref) => {
    return (
      <div className="flex justify-center my-4">
        <ReCAPTCHA
          ref={ref}
          sitekey={sitekey}
          onChange={onChange}
          onExpired={onExpired}
          onErrored={onError}
          size={size}
          theme={theme}
        />
      </div>
    );
  }
);

Recaptcha.displayName = 'Recaptcha';

export { Recaptcha };