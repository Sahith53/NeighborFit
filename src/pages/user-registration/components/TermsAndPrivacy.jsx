import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TermsAndPrivacy = ({ onAccept, isRequired = true }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

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
      termsTitle: 'Terms & Privacy',
      termsDescription: 'Please review and accept our terms of service and privacy policy to continue.',
      acceptTerms: 'I accept the Terms of Service',
      acceptPrivacy: 'I accept the Privacy Policy',
      viewTerms: 'View Terms',
      viewPrivacy: 'View Privacy Policy',
      continue: 'Continue',
      keyPoints: 'Key Points:',
      termsPoints: [
        'You must be 18+ to use NeighborFit',
        'Respectful behavior is required at all times',
        'False information or fake profiles are prohibited',
        'You can delete your account at any time'
      ],
      privacyPoints: [
        'Your personal data is encrypted and secure',
        'Location data is used only for matching',
        'We never sell your information to third parties',
        'You control what information is visible to others'
      ]
    },
    es: {
      termsTitle: 'Términos y Privacidad',
      termsDescription: 'Por favor revisa y acepta nuestros términos de servicio y política de privacidad para continuar.',
      acceptTerms: 'Acepto los Términos de Servicio',
      acceptPrivacy: 'Acepto la Política de Privacidad',
      viewTerms: 'Ver Términos',
      viewPrivacy: 'Ver Política de Privacidad',
      continue: 'Continuar',
      keyPoints: 'Puntos Clave:',
      termsPoints: [
        'Debes tener 18+ años para usar NeighborFit',
        'Se requiere comportamiento respetuoso en todo momento',
        'Información falsa o perfiles falsos están prohibidos',
        'Puedes eliminar tu cuenta en cualquier momento'
      ],
      privacyPoints: [
        'Tus datos personales están encriptados y seguros',
        'Los datos de ubicación se usan solo para coincidencias',
        'Nunca vendemos tu información a terceros',
        'Controlas qué información es visible para otros'
      ]
    },
    fr: {
      termsTitle: 'Conditions et Confidentialité',
      termsDescription: 'Veuillez examiner et accepter nos conditions de service et notre politique de confidentialité pour continuer.',
      acceptTerms: 'J\'accepte les Conditions de Service',
      acceptPrivacy: 'J\'accepte la Politique de Confidentialité',
      viewTerms: 'Voir les Conditions',
      viewPrivacy: 'Voir la Politique de Confidentialité',
      continue: 'Continuer',
      keyPoints: 'Points Clés:',
      termsPoints: [
        'Vous devez avoir 18+ ans pour utiliser NeighborFit',
        'Un comportement respectueux est requis en tout temps',
        'Les fausses informations ou faux profils sont interdits',
        'Vous pouvez supprimer votre compte à tout moment'
      ],
      privacyPoints: [
        'Vos données personnelles sont cryptées et sécurisées',
        'Les données de localisation ne sont utilisées que pour les correspondances',
        'Nous ne vendons jamais vos informations à des tiers',
        'Vous contrôlez quelles informations sont visibles aux autres'
      ]
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const handleTermsChange = (e) => {
    setAcceptedTerms(e.target.checked);
  };

  const handlePrivacyChange = (e) => {
    setAcceptedPrivacy(e.target.checked);
  };

  const handleContinue = () => {
    if (acceptedTerms && acceptedPrivacy) {
      onAccept({
        termsAccepted: true,
        privacyAccepted: true,
        timestamp: new Date().toISOString()
      });
    }
  };

  const canContinue = acceptedTerms && acceptedPrivacy;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="FileText" size={32} color="var(--color-primary)" />
        </div>
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          {t.termsTitle}
        </h2>
        <p className="text-text-secondary">
          {t.termsDescription}
        </p>
      </div>

      <div className="space-y-6">
        {/* Terms of Service */}
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-text-primary">Terms of Service</h3>
            <Button variant="ghost" className="text-sm">
              {t.viewTerms}
            </Button>
          </div>
          
          <div className="space-y-2 mb-4">
            <p className="text-sm font-medium text-text-primary">{t.keyPoints}</p>
            <ul className="space-y-1">
              {t.termsPoints.map((point, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Icon name="Dot" size={16} color="var(--color-text-secondary)" className="mt-1" />
                  <span className="text-sm text-text-secondary">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={handleTermsChange}
              className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
            />
            <span className="text-sm text-text-primary">{t.acceptTerms}</span>
          </label>
        </div>

        {/* Privacy Policy */}
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-text-primary">Privacy Policy</h3>
            <Button variant="ghost" className="text-sm">
              {t.viewPrivacy}
            </Button>
          </div>
          
          <div className="space-y-2 mb-4">
            <p className="text-sm font-medium text-text-primary">{t.keyPoints}</p>
            <ul className="space-y-1">
              {t.privacyPoints.map((point, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Icon name="Dot" size={16} color="var(--color-text-secondary)" className="mt-1" />
                  <span className="text-sm text-text-secondary">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedPrivacy}
              onChange={handlePrivacyChange}
              className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
            />
            <span className="text-sm text-text-primary">{t.acceptPrivacy}</span>
          </label>
        </div>
      </div>

      <Button
        variant="primary"
        onClick={handleContinue}
        disabled={!canContinue}
        className="w-full"
      >
        {t.continue}
      </Button>
    </div>
  );
};

export default TermsAndPrivacy;