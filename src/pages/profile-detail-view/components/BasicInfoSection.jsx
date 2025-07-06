import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const BasicInfoSection = ({ profile }) => {
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
      age: 'Age',
      distance: 'Distance',
      walkingTime: 'walking',
      drivingTime: 'driving',
      profession: 'Profession',
      familyStatus: 'Family Status',
      joinedDate: 'Joined',
      mutualFriends: 'Mutual Friends',
      mutualGroups: 'Mutual Groups'
    },
    es: {
      age: 'Edad',
      distance: 'Distancia',
      walkingTime: 'caminando',
      drivingTime: 'conduciendo',
      profession: 'Profesión',
      familyStatus: 'Estado Familiar',
      joinedDate: 'Se unió',
      mutualFriends: 'Amigos Mutuos',
      mutualGroups: 'Grupos Mutuos'
    },
    fr: {
      age: 'Âge',
      distance: 'Distance',
      walkingTime: 'à pied',
      drivingTime: 'en voiture',
      profession: 'Profession',
      familyStatus: 'Statut Familial',
      joinedDate: 'Rejoint',
      mutualFriends: 'Amis Communs',
      mutualGroups: 'Groupes Communs'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  return (
    <div className="bg-surface p-6 rounded-lg border border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Basic Details */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={18} className="text-text-secondary" />
            <div>
              <span className="text-sm text-text-secondary">{t.age}</span>
              <p className="font-medium">{profile.age} years old</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Icon name="MapPin" size={18} className="text-text-secondary" />
            <div>
              <span className="text-sm text-text-secondary">{t.distance}</span>
              <p className="font-medium">
                {profile.distance} • {profile.walkingTime} {t.walkingTime} • {profile.drivingTime} {t.drivingTime}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Icon name="Briefcase" size={18} className="text-text-secondary" />
            <div>
              <span className="text-sm text-text-secondary">{t.profession}</span>
              <p className="font-medium">{profile.profession}</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Icon name="Users" size={18} className="text-text-secondary" />
            <div>
              <span className="text-sm text-text-secondary">{t.familyStatus}</span>
              <p className="font-medium">{profile.familyStatus}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={18} className="text-text-secondary" />
            <div>
              <span className="text-sm text-text-secondary">{t.joinedDate}</span>
              <p className="font-medium">{profile.joinedDate}</p>
            </div>
          </div>

          {profile.mutualFriends > 0 && (
            <div className="flex items-center space-x-3">
              <Icon name="UserCheck" size={18} className="text-success" />
              <div>
                <span className="text-sm text-text-secondary">{t.mutualFriends}</span>
                <p className="font-medium text-success">{profile.mutualFriends}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mutual Groups */}
      {profile.mutualGroups && profile.mutualGroups.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-text-secondary mb-2">{t.mutualGroups}</h4>
          <div className="flex flex-wrap gap-2">
            {profile.mutualGroups.map((group, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
              >
                {group}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicInfoSection;