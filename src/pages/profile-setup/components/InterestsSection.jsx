import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const InterestsSection = ({ currentLanguage, formData, onFormChange }) => {
  const [customInterest, setCustomInterest] = useState('');

  const translations = {
    en: {
      interests: 'Interests & Hobbies',
      popularInterests: 'Popular Interests',
      addCustom: 'Add Custom Interest',
      customPlaceholder: 'Enter your interest...',
      add: 'Add',
      selectedInterests: 'Selected Interests'
    },
    es: {
      interests: 'Intereses y Pasatiempos',
      popularInterests: 'Intereses Populares',
      addCustom: 'Agregar Interés Personalizado',
      customPlaceholder: 'Ingresa tu interés...',
      add: 'Agregar',
      selectedInterests: 'Intereses Seleccionados'
    },
    fr: {
      interests: 'Intérêts et Loisirs',
      popularInterests: 'Intérêts Populaires',
      addCustom: 'Ajouter un Intérêt Personnalisé',
      customPlaceholder: 'Entrez votre intérêt...',
      add: 'Ajouter',
      selectedInterests: 'Intérêts Sélectionnés'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const popularInterests = [
    'Fitness', 'Cooking', 'Gardening', 'Reading', 'Photography', 'Music',
    'Hiking', 'Yoga', 'Running', 'Cycling', 'Art', 'Travel', 'Movies',
    'Board Games', 'Dancing', 'Swimming', 'Tennis', 'Golf', 'Meditation',
    'Volunteering', 'Technology', 'Fashion', 'Writing', 'Crafts', 'Pets'
  ];

  const selectedInterests = formData.interests || [];

  const handleInterestToggle = (interest) => {
    const updatedInterests = selectedInterests.includes(interest)
      ? selectedInterests.filter(i => i !== interest)
      : [...selectedInterests, interest];
    
    onFormChange({
      ...formData,
      interests: updatedInterests
    });
  };

  const handleAddCustomInterest = () => {
    if (customInterest.trim() && !selectedInterests.includes(customInterest.trim())) {
      const updatedInterests = [...selectedInterests, customInterest.trim()];
      onFormChange({
        ...formData,
        interests: updatedInterests
      });
      setCustomInterest('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomInterest();
    }
  };

  return (
    <div className="bg-surface rounded-xl p-6 border border-border">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">
        {t.interests}
      </h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-text-primary mb-3">{t.popularInterests}</h4>
          <div className="flex flex-wrap gap-2">
            {popularInterests.map((interest) => (
              <button
                key={interest}
                onClick={() => handleInterestToggle(interest)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-smooth ${
                  selectedInterests.includes(interest)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-text-primary mb-3">{t.addCustom}</h4>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder={t.customPlaceholder}
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              variant="primary"
              onClick={handleAddCustomInterest}
              disabled={!customInterest.trim()}
            >
              {t.add}
            </Button>
          </div>
        </div>
        
        {selectedInterests.length > 0 && (
          <div>
            <h4 className="font-medium text-text-primary mb-3">
              {t.selectedInterests} ({selectedInterests.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedInterests.map((interest) => (
                <div
                  key={interest}
                  className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-2 rounded-full text-sm"
                >
                  <span>{interest}</span>
                  <button
                    onClick={() => handleInterestToggle(interest)}
                    className="hover:bg-primary/20 rounded-full p-1 transition-smooth"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterestsSection;