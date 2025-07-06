import React from 'react';

import Button from '../../../components/ui/Button';

const ViewToggle = ({ currentView, onViewChange, currentLanguage }) => {
  const translations = {
    en: {
      gridView: 'Grid View',
      mapView: 'Map View',
      listView: 'List View'
    },
    es: {
      gridView: 'Vista de Cuadrícula',
      mapView: 'Vista de Mapa',
      listView: 'Vista de Lista'
    },
    fr: {
      gridView: 'Vue Grille',
      mapView: 'Vue Carte',
      listView: 'Vue Liste'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const viewOptions = [
    {
      key: 'grid',
      label: t.gridView,
      icon: 'Grid3X3'
    },
    {
      key: 'map',
      label: t.mapView,
      icon: 'Map'
    }
  ];

  return (
    <div className="flex items-center bg-muted rounded-lg p-1">
      {viewOptions.map((option) => (
        <Button
          key={option.key}
          variant={currentView === option.key ? 'primary' : 'ghost'}
          onClick={() => onViewChange(option.key)}
          className={`
            px-3 py-2 text-sm font-medium transition-smooth
            ${currentView === option.key 
              ? 'bg-primary text-primary-foreground shadow-elevation-1' 
              : 'text-text-secondary hover:text-text-primary'
            }
          `}
          iconName={option.icon}
          iconSize={16}
        >
          <span className="hidden sm:inline ml-2">{option.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default ViewToggle;