import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';


const SocialRegistration = ({ onSocialRegister }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const translations = {
    en: {
      continueWith: 'Continue with',
      google: 'Google',
      facebook: 'Facebook',
      orDivider: 'or'
    },
    es: {
      continueWith: 'Continuar con',
      google: 'Google',
      facebook: 'Facebook',
      orDivider: 'o'
    },
    fr: {
      continueWith: 'Continuer avec',
      google: 'Google',
      facebook: 'Facebook',
      orDivider: 'ou'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const handleGoogleRegister = () => {
    onSocialRegister('google');
  };

  const handleFacebookRegister = () => {
    onSocialRegister('facebook');
  };

  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={handleGoogleRegister}
        className="w-full justify-center"
        iconName="Chrome"
        iconPosition="left"
        iconSize={20}
      >
        {t.continueWith} {t.google}
      </Button>

      <Button
        variant="outline"
        onClick={handleFacebookRegister}
        className="w-full justify-center"
        iconName="Facebook"
        iconPosition="left"
        iconSize={20}
      >
        {t.continueWith} {t.facebook}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-text-secondary">
            {t.orDivider}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialRegistration;