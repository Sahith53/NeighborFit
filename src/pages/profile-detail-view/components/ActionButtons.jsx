import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';


const ActionButtons = ({ profileId, onConnect, onPass, onReport }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isConnecting, setIsConnecting] = useState(false);
  const [showReportOptions, setShowReportOptions] = useState(false);
  const navigate = useNavigate();

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
      connect: 'Connect',
      pass: 'Pass',
      report: 'Report',
      connecting: 'Connecting...',
      reportOptions: {
        inappropriate: 'Inappropriate content',
        fake: 'Fake profile',
        spam: 'Spam or scam',
        harassment: 'Harassment',
        other: 'Other'
      },
      cancel: 'Cancel'
    },
    es: {
      connect: 'Conectar',
      pass: 'Pasar',
      report: 'Reportar',
      connecting: 'Conectando...',
      reportOptions: {
        inappropriate: 'Contenido inapropiado',
        fake: 'Perfil falso',
        spam: 'Spam o estafa',
        harassment: 'Acoso',
        other: 'Otro'
      },
      cancel: 'Cancelar'
    },
    fr: {
      connect: 'Se connecter',
      pass: 'Passer',
      report: 'Signaler',
      connecting: 'Connexion...',
      reportOptions: {
        inappropriate: 'Contenu inapproprié',
        fake: 'Faux profil',
        spam: 'Spam ou arnaque',
        harassment: 'Harcèlement',
        other: 'Autre'
      },
      cancel: 'Annuler'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await onConnect(profileId);
      // Navigate back to discovery after successful connection
      setTimeout(() => {
        navigate('/neighborhood-discovery');
      }, 1000);
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handlePass = () => {
    onPass(profileId);
    navigate('/neighborhood-discovery');
  };

  const handleReport = (reason) => {
    onReport(profileId, reason);
    setShowReportOptions(false);
    navigate('/neighborhood-discovery');
  };

  if (showReportOptions) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 md:relative md:border-0 md:p-0 md:bg-transparent">
        <div className="max-w-md mx-auto space-y-2">
          <h4 className="font-medium text-text-primary mb-3">
            {t.report}
          </h4>
          {Object.entries(t.reportOptions).map(([key, label]) => (
            <Button
              key={key}
              variant="outline"
              onClick={() => handleReport(key)}
              className="w-full justify-start"
            >
              {label}
            </Button>
          ))}
          <Button
            variant="ghost"
            onClick={() => setShowReportOptions(false)}
            className="w-full"
          >
            {t.cancel}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 md:relative md:border-0 md:p-0 md:bg-transparent">
      <div className="flex space-x-3 max-w-md mx-auto">
        {/* Pass Button */}
        <Button
          variant="outline"
          onClick={handlePass}
          className="flex-1 md:flex-none md:px-6"
          iconName="X"
          iconPosition="left"
        >
          {t.pass}
        </Button>

        {/* Connect Button */}
        <Button
          variant="primary"
          onClick={handleConnect}
          disabled={isConnecting}
          loading={isConnecting}
          className="flex-1 md:flex-none md:px-8"
          iconName={isConnecting ? undefined : "UserPlus"}
          iconPosition="left"
        >
          {isConnecting ? t.connecting : t.connect}
        </Button>

        {/* Report Button */}
        <Button
          variant="ghost"
          onClick={() => setShowReportOptions(true)}
          className="p-3 md:px-4"
          iconName="Flag"
        >
          <span className="sr-only">{t.report}</span>
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;