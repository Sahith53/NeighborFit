import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BiometricAuth = ({ onBiometricLogin, isLoading }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [biometricSupported, setBiometricSupported] = useState(false);
  const [biometricType, setBiometricType] = useState('');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  useEffect(() => {
    // Check for biometric support (mock implementation)
    const checkBiometricSupport = () => {
      // Mock biometric detection
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const hasWebAuthn = 'credentials' in navigator && 'create' in navigator.credentials;
      
      if (isMobile && hasWebAuthn) {
        setBiometricSupported(true);
        // Mock detection of biometric type
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        setBiometricType(isIOS ? 'faceId' : 'fingerprint');
      }
    };

    checkBiometricSupport();
  }, []);

  const translations = {
    en: {
      useFaceId: 'Use Face ID',
      useFingerprint: 'Use Fingerprint',
      useBiometric: 'Use Biometric Login',
      biometricError: 'Biometric authentication failed. Please try again.'
    },
    es: {
      useFaceId: 'Usar Face ID',
      useFingerprint: 'Usar Huella Digital',
      useBiometric: 'Usar Inicio Biométrico',
      biometricError: 'La autenticación biométrica falló. Inténtalo de nuevo.'
    },
    fr: {
      useFaceId: 'Utiliser Face ID',
      useFingerprint: 'Utiliser Empreinte',
      useBiometric: 'Utiliser Connexion Biométrique',
      biometricError: 'L\'authentification biométrique a échoué. Veuillez réessayer.'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const handleBiometricAuth = async () => {
    try {
      // Mock biometric authentication
      const mockBiometricAuth = () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Mock success/failure (80% success rate)
            if (Math.random() > 0.2) {
              resolve({ success: true, user: { email: 'user@example.com' } });
            } else {
              reject(new Error('Biometric authentication failed'));
            }
          }, 2000);
        });
      };

      const result = await mockBiometricAuth();
      onBiometricLogin(result);
    } catch (error) {
      alert(t.biometricError);
    }
  };

  const getBiometricIcon = () => {
    switch (biometricType) {
      case 'faceId':
        return 'Scan';
      case 'fingerprint':
        return 'Fingerprint';
      default:
        return 'Shield';
    }
  };

  const getBiometricLabel = () => {
    switch (biometricType) {
      case 'faceId':
        return t.useFaceId;
      case 'fingerprint':
        return t.useFingerprint;
      default:
        return t.useBiometric;
    }
  };

  if (!biometricSupported) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-surface text-text-secondary">or</span>
        </div>
      </div>

      <div className="mt-4">
        <Button
          variant="outline"
          onClick={handleBiometricAuth}
          disabled={isLoading}
          fullWidth
          className="flex items-center justify-center space-x-3 py-3"
        >
          <Icon name={getBiometricIcon()} size={20} />
          <span className="font-medium">{getBiometricLabel()}</span>
        </Button>
      </div>
    </div>
  );
};

export default BiometricAuth;