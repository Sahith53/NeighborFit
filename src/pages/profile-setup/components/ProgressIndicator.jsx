import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentLanguage, currentStep, totalSteps, completedSections }) => {
  const translations = {
    en: {
      progress: 'Profile Setup Progress',
      step: 'Step',
      of: 'of',
      completed: 'Completed',
      current: 'Current',
      pending: 'Pending'
    },
    es: {
      progress: 'Progreso de Configuración del Perfil',
      step: 'Paso',
      of: 'de',
      completed: 'Completado',
      current: 'Actual',
      pending: 'Pendiente'
    },
    fr: {
      progress: 'Progression de Configuration du Profil',
      step: 'Étape',
      of: 'de',
      completed: 'Terminé',
      current: 'Actuel',
      pending: 'En Attente'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const steps = [
    { key: 'photo', label: 'Photo' },
    { key: 'personal', label: 'Personal' },
    { key: 'lifestyle', label: 'Lifestyle' },
    { key: 'interests', label: 'Interests' },
    { key: 'availability', label: 'Availability' },
    { key: 'privacy', label: 'Privacy' }
  ];

  const progressPercentage = (completedSections.length / totalSteps) * 100;

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'pending';
  };

  const getStepIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'current':
        return 'Circle';
      default:
        return 'Circle';
    }
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed':
        return 'var(--color-success)';
      case 'current':
        return 'var(--color-primary)';
      default:
        return 'var(--color-text-secondary)';
    }
  };

  return (
    <div className="bg-surface rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          {t.progress}
        </h3>
        <span className="text-sm text-text-secondary">
          {t.step} {currentStep + 1} {t.of} {totalSteps}
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-layout"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-text-secondary mt-2">
          <span>0%</span>
          <span className="font-medium text-primary">{Math.round(progressPercentage)}%</span>
          <span>100%</span>
        </div>
      </div>
      
      {/* Step Indicators */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          return (
            <div
              key={step.key}
              className={`flex items-center space-x-3 p-2 rounded-lg transition-smooth ${
                status === 'current' ? 'bg-primary/5' : ''
              }`}
            >
              <Icon
                name={getStepIcon(status)}
                size={20}
                color={getStepColor(status)}
              />
              <span
                className={`font-medium ${
                  status === 'completed'
                    ? 'text-success'
                    : status === 'current' ?'text-primary' :'text-text-secondary'
                }`}
              >
                {step.label}
              </span>
              {status === 'completed' && (
                <span className="text-xs text-success bg-success/10 px-2 py-1 rounded-full">
                  {t.completed}
                </span>
              )}
              {status === 'current' && (
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {t.current}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;