import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange, currentLanguage }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const translations = {
    en: {
      filters: 'Filters',
      distance: 'Distance',
      ageRange: 'Age Range',
      interests: 'Interests',
      availability: 'Availability',
      lifestyle: 'Lifestyle',
      clearAll: 'Clear All',
      applyFilters: 'Apply Filters',
      km: 'km',
      miles: 'miles',
      from: 'from',
      to: 'to',
      years: 'years',
      anytime: 'Anytime',
      mornings: 'Mornings',
      afternoons: 'Afternoons',
      evenings: 'Evenings',
      weekends: 'Weekends',
      fitness: 'Fitness',
      outdoors: 'Outdoors',
      arts: 'Arts & Culture',
      food: 'Food & Dining',
      family: 'Family Activities',
      professional: 'Professional',
      social: 'Social Events',
      hobbies: 'Hobbies',
      active: 'Active Lifestyle',
      relaxed: 'Relaxed Lifestyle',
      social_lifestyle: 'Social Lifestyle',
      family_oriented: 'Family Oriented',
      career_focused: 'Career Focused',
      health_conscious: 'Health Conscious'
    },
    es: {
      filters: 'Filtros',
      distance: 'Distancia',
      ageRange: 'Rango de Edad',
      interests: 'Intereses',
      availability: 'Disponibilidad',
      lifestyle: 'Estilo de Vida',
      clearAll: 'Limpiar Todo',
      applyFilters: 'Aplicar Filtros',
      km: 'km',
      miles: 'millas',
      from: 'desde',
      to: 'hasta',
      years: 'años',
      anytime: 'Cualquier momento',
      mornings: 'Mañanas',
      afternoons: 'Tardes',
      evenings: 'Noches',
      weekends: 'Fines de semana',
      fitness: 'Fitness',
      outdoors: 'Aire libre',
      arts: 'Arte y Cultura',
      food: 'Comida y Cena',
      family: 'Actividades Familiares',
      professional: 'Profesional',
      social: 'Eventos Sociales',
      hobbies: 'Pasatiempos',
      active: 'Estilo Activo',
      relaxed: 'Estilo Relajado',
      social_lifestyle: 'Estilo Social',
      family_oriented: 'Orientado a la Familia',
      career_focused: 'Enfocado en la Carrera',
      health_conscious: 'Consciente de la Salud'
    },
    fr: {
      filters: 'Filtres',
      distance: 'Distance',
      ageRange: 'Tranche d\'âge',
      interests: 'Intérêts',
      availability: 'Disponibilité',
      lifestyle: 'Style de vie',
      clearAll: 'Tout effacer',
      applyFilters: 'Appliquer les filtres',
      km: 'km',
      miles: 'miles',
      from: 'de',
      to: 'à',
      years: 'ans',
      anytime: 'N\'importe quand',
      mornings: 'Matins',
      afternoons: 'Après-midis',
      evenings: 'Soirées',
      weekends: 'Week-ends',
      fitness: 'Fitness',
      outdoors: 'Plein air',
      arts: 'Arts et Culture',
      food: 'Nourriture et Restauration',
      family: 'Activités Familiales',
      professional: 'Professionnel',
      social: 'Événements Sociaux',
      hobbies: 'Loisirs',
      active: 'Style Actif',
      relaxed: 'Style Détendu',
      social_lifestyle: 'Style Social',
      family_oriented: 'Orienté Famille',
      career_focused: 'Axé sur la Carrière',
      health_conscious: 'Soucieux de la Santé'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const interestOptions = [
    { key: 'fitness', label: t.fitness },
    { key: 'outdoors', label: t.outdoors },
    { key: 'arts', label: t.arts },
    { key: 'food', label: t.food },
    { key: 'family', label: t.family },
    { key: 'professional', label: t.professional },
    { key: 'social', label: t.social },
    { key: 'hobbies', label: t.hobbies }
  ];

  const availabilityOptions = [
    { key: 'anytime', label: t.anytime },
    { key: 'mornings', label: t.mornings },
    { key: 'afternoons', label: t.afternoons },
    { key: 'evenings', label: t.evenings },
    { key: 'weekends', label: t.weekends }
  ];

  const lifestyleOptions = [
    { key: 'active', label: t.active },
    { key: 'relaxed', label: t.relaxed },
    { key: 'social_lifestyle', label: t.social_lifestyle },
    { key: 'family_oriented', label: t.family_oriented },
    { key: 'career_focused', label: t.career_focused },
    { key: 'health_conscious', label: t.health_conscious }
  ];

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (category, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleMultiSelectChange = (category, option) => {
    setLocalFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(option)
        ? prev[category].filter(item => item !== option)
        : [...prev[category], option]
    }));
  };

  const handleClearAll = () => {
    const clearedFilters = {
      distance: 5,
      ageMin: 18,
      ageMax: 65,
      interests: [],
      availability: [],
      lifestyle: []
    };
    setLocalFilters(clearedFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* Filter Panel */}
      <div className={`
        fixed bottom-0 left-0 right-0 bg-surface rounded-t-2xl z-50 max-h-[80vh] overflow-y-auto
        md:static md:w-80 md:bg-surface md:rounded-xl md:shadow-elevation-3 md:max-h-none
        transform transition-transform duration-300
        ${isOpen ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            {t.filters}
          </h3>
          <Button
            variant="ghost"
            onClick={onClose}
            className="p-2 md:hidden"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Distance */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.distance}: {localFilters.distance} {t.km}
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={localFilters.distance}
              onChange={(e) => handleFilterChange('distance', parseInt(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-text-secondary mt-1">
              <span>1 {t.km}</span>
              <span>50 {t.km}</span>
            </div>
          </div>

          {/* Age Range */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.ageRange}
            </label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                value={localFilters.ageMin}
                onChange={(e) => handleFilterChange('ageMin', parseInt(e.target.value))}
                className="w-20"
                min="18"
                max="100"
              />
              <span className="text-text-secondary">{t.to}</span>
              <Input
                type="number"
                value={localFilters.ageMax}
                onChange={(e) => handleFilterChange('ageMax', parseInt(e.target.value))}
                className="w-20"
                min="18"
                max="100"
              />
              <span className="text-text-secondary text-sm">{t.years}</span>
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.interests}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {interestOptions.map((option) => (
                <label
                  key={option.key}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={localFilters.interests.includes(option.key)}
                    onChange={() => handleMultiSelectChange('interests', option.key)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-primary">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.availability}
            </label>
            <div className="space-y-2">
              {availabilityOptions.map((option) => (
                <label
                  key={option.key}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={localFilters.availability.includes(option.key)}
                    onChange={() => handleMultiSelectChange('availability', option.key)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-primary">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Lifestyle */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.lifestyle}
            </label>
            <div className="space-y-2">
              {lifestyleOptions.map((option) => (
                <label
                  key={option.key}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={localFilters.lifestyle.includes(option.key)}
                    onChange={() => handleMultiSelectChange('lifestyle', option.key)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-primary">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border bg-muted">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="flex-1"
            >
              {t.clearAll}
            </Button>
            <Button
              variant="primary"
              onClick={handleApplyFilters}
              className="flex-1"
            >
              {t.applyFilters}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;