import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CompatibilityScore = ({ score, reasons }) => {
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
      compatibility: 'Compatibility Score',
      match: 'Match',
      reasons: 'Why you match',
      sharedInterests: 'Shared Interests',
      similarSchedule: 'Similar Schedule',
      familyStatus: 'Family Status',
      fitnessLevel: 'Fitness Level',
      socialPreferences: 'Social Preferences'
    },
    es: {
      compatibility: 'Puntuación de Compatibilidad',
      match: 'Coincidencia',
      reasons: 'Por qué coinciden',
      sharedInterests: 'Intereses Compartidos',
      similarSchedule: 'Horario Similar',
      familyStatus: 'Estado Familiar',
      fitnessLevel: 'Nivel de Fitness',
      socialPreferences: 'Preferencias Sociales'
    },
    fr: {
      compatibility: 'Score de Compatibilité',
      match: 'Correspondance',
      reasons: 'Pourquoi vous correspondez',
      sharedInterests: 'Intérêts Partagés',
      similarSchedule: 'Horaire Similaire',
      familyStatus: 'Statut Familial',
      fitnessLevel: 'Niveau de Fitness',
      socialPreferences: 'Préférences Sociales'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBackground = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const getReasonIcon = (type) => {
    switch (type) {
      case 'interests':
        return 'Heart';
      case 'schedule':
        return 'Clock';
      case 'family':
        return 'Users';
      case 'fitness':
        return 'Zap';
      case 'social':
        return 'MessageCircle';
      default:
        return 'Check';
    }
  };

  const getReasonLabel = (type) => {
    switch (type) {
      case 'interests':
        return t.sharedInterests;
      case 'schedule':
        return t.similarSchedule;
      case 'family':
        return t.familyStatus;
      case 'fitness':
        return t.fitnessLevel;
      case 'social':
        return t.socialPreferences;
      default:
        return type;
    }
  };

  return (
    <div className="bg-surface p-6 rounded-lg border border-border">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        {t.compatibility}
      </h3>

      {/* Score Display */}
      <div className="flex items-center justify-center mb-6">
        <div className={`relative w-24 h-24 rounded-full ${getScoreBackground(score)} flex items-center justify-center`}>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
              {score}%
            </div>
            <div className="text-xs text-text-secondary">
              {t.match}
            </div>
          </div>
        </div>
      </div>

      {/* Reasons */}
      <div>
        <h4 className="text-sm font-medium text-text-secondary mb-3">
          {t.reasons}
        </h4>
        <div className="space-y-3">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon 
                  name={getReasonIcon(reason.type)} 
                  size={16} 
                  className="text-primary" 
                />
              </div>
              <div className="flex-1">
                <h5 className="font-medium text-text-primary">
                  {getReasonLabel(reason.type)}
                </h5>
                <p className="text-sm text-text-secondary">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompatibilityScore;