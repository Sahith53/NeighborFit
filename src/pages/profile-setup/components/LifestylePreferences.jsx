import React from 'react';
import Icon from '../../../components/AppIcon';

const LifestylePreferences = ({ currentLanguage, formData, onFormChange }) => {
  const translations = {
    en: {
      lifestylePrefs: 'Lifestyle Preferences',
      fitnessLevel: 'Fitness Level',
      socialPrefs: 'Social Preferences',
      familyStatus: 'Family Status',
      workSchedule: 'Work Schedule',
      petOwner: 'Pet Owner',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      athlete: 'Athlete',
      introvert: 'Introvert',
      ambivert: 'Ambivert',
      extrovert: 'Extrovert',
      single: 'Single',
      couple: 'Couple',
      family: 'Family with Kids',
      empty: 'Empty Nester',
      traditional: 'Traditional (9-5)',
      flexible: 'Flexible Hours',
      remote: 'Remote Work',
      shift: 'Shift Work',
      yes: 'Yes',
      no: 'No'
    },
    es: {
      lifestylePrefs: 'Preferencias de Estilo de Vida',
      fitnessLevel: 'Nivel de Fitness',
      socialPrefs: 'Preferencias Sociales',
      familyStatus: 'Estado Familiar',
      workSchedule: 'Horario de Trabajo',
      petOwner: 'Dueño de Mascota',
      beginner: 'Principiante',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
      athlete: 'Atleta',
      introvert: 'Introvertido',
      ambivert: 'Ambivertido',
      extrovert: 'Extrovertido',
      single: 'Soltero',
      couple: 'Pareja',
      family: 'Familia con Niños',
      empty: 'Nido Vacío',
      traditional: 'Tradicional (9-5)',
      flexible: 'Horarios Flexibles',
      remote: 'Trabajo Remoto',
      shift: 'Trabajo por Turnos',
      yes: 'Sí',
      no: 'No'
    },
    fr: {
      lifestylePrefs: 'Préférences de Style de Vie',
      fitnessLevel: 'Niveau de Fitness',
      socialPrefs: 'Préférences Sociales',
      familyStatus: 'Statut Familial',
      workSchedule: 'Horaire de Travail',
      petOwner: 'Propriétaire d\'Animal',
      beginner: 'Débutant',
      intermediate: 'Intermédiaire',
      advanced: 'Avancé',
      athlete: 'Athlète',
      introvert: 'Introverti',
      ambivert: 'Ambivert',
      extrovert: 'Extraverti',
      single: 'Célibataire',
      couple: 'Couple',
      family: 'Famille avec Enfants',
      empty: 'Nid Vide',
      traditional: 'Traditionnel (9-5)',
      flexible: 'Horaires Flexibles',
      remote: 'Travail à Distance',
      shift: 'Travail par Équipes',
      yes: 'Oui',
      no: 'Non'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const lifestyleCategories = [
    {
      key: 'fitnessLevel',
      title: t.fitnessLevel,
      icon: 'Dumbbell',
      options: [
        { value: 'beginner', label: t.beginner },
        { value: 'intermediate', label: t.intermediate },
        { value: 'advanced', label: t.advanced },
        { value: 'athlete', label: t.athlete }
      ]
    },
    {
      key: 'socialPreference',
      title: t.socialPrefs,
      icon: 'Users',
      options: [
        { value: 'introvert', label: t.introvert },
        { value: 'ambivert', label: t.ambivert },
        { value: 'extrovert', label: t.extrovert }
      ]
    },
    {
      key: 'familyStatus',
      title: t.familyStatus,
      icon: 'Home',
      options: [
        { value: 'single', label: t.single },
        { value: 'couple', label: t.couple },
        { value: 'family', label: t.family },
        { value: 'empty', label: t.empty }
      ]
    },
    {
      key: 'workSchedule',
      title: t.workSchedule,
      icon: 'Clock',
      options: [
        { value: 'traditional', label: t.traditional },
        { value: 'flexible', label: t.flexible },
        { value: 'remote', label: t.remote },
        { value: 'shift', label: t.shift }
      ]
    },
    {
      key: 'petOwner',
      title: t.petOwner,
      icon: 'Heart',
      options: [
        { value: 'yes', label: t.yes },
        { value: 'no', label: t.no }
      ]
    }
  ];

  const handleSelectionChange = (category, value) => {
    onFormChange({
      ...formData,
      [category]: value
    });
  };

  return (
    <div className="bg-surface rounded-xl p-6 border border-border">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">
        {t.lifestylePrefs}
      </h3>
      
      <div className="space-y-6">
        {lifestyleCategories.map((category) => (
          <div key={category.key} className="space-y-3">
            <div className="flex items-center space-x-2">
              <Icon name={category.icon} size={20} color="var(--color-primary)" />
              <h4 className="font-medium text-text-primary">{category.title}</h4>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {category.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelectionChange(category.key, option.value)}
                  className={`p-3 rounded-lg border transition-smooth text-sm font-medium ${
                    formData[category.key] === option.value
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-muted text-text-secondary border-border hover:border-primary hover:bg-primary/5'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LifestylePreferences;