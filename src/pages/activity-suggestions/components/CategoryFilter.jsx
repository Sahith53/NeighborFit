import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryFilter = ({ selectedCategories, onCategoryChange, currentLanguage }) => {
  const translations = {
    en: {
      all: 'All',
      fitness: 'Fitness',
      social: 'Social',
      family: 'Family',
      professional: 'Professional',
      hobbies: 'Hobbies',
      outdoor: 'Outdoor',
      indoor: 'Indoor',
      food: 'Food & Dining',
      arts: 'Arts & Culture',
      sports: 'Sports',
      education: 'Education'
    },
    es: {
      all: 'Todos',
      fitness: 'Fitness',
      social: 'Social',
      family: 'Familia',
      professional: 'Profesional',
      hobbies: 'Pasatiempos',
      outdoor: 'Exterior',
      indoor: 'Interior',
      food: 'Comida',
      arts: 'Arte y Cultura',
      sports: 'Deportes',
      education: 'Educación'
    },
    fr: {
      all: 'Tous',
      fitness: 'Fitness',
      social: 'Social',
      family: 'Famille',
      professional: 'Professionnel',
      hobbies: 'Loisirs',
      outdoor: 'Extérieur',
      indoor: 'Intérieur',
      food: 'Nourriture',
      arts: 'Arts et Culture',
      sports: 'Sports',
      education: 'Éducation'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const categories = [
    { id: 'all', label: t.all, icon: 'Grid3X3' },
    { id: 'fitness', label: t.fitness, icon: 'Dumbbell' },
    { id: 'social', label: t.social, icon: 'Users' },
    { id: 'family', label: t.family, icon: 'Baby' },
    { id: 'professional', label: t.professional, icon: 'Briefcase' },
    { id: 'hobbies', label: t.hobbies, icon: 'Palette' },
    { id: 'outdoor', label: t.outdoor, icon: 'TreePine' },
    { id: 'indoor', label: t.indoor, icon: 'Home' },
    { id: 'food', label: t.food, icon: 'UtensilsCrossed' },
    { id: 'arts', label: t.arts, icon: 'Music' },
    { id: 'sports', label: t.sports, icon: 'Trophy' },
    { id: 'education', label: t.education, icon: 'GraduationCap' }
  ];

  const handleCategoryClick = (categoryId) => {
    if (categoryId === 'all') {
      onCategoryChange([]);
    } else {
      const newCategories = selectedCategories.includes(categoryId)
        ? selectedCategories.filter(id => id !== categoryId)
        : [...selectedCategories, categoryId];
      onCategoryChange(newCategories);
    }
  };

  const isSelected = (categoryId) => {
    if (categoryId === 'all') {
      return selectedCategories.length === 0;
    }
    return selectedCategories.includes(categoryId);
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Mobile: Horizontal scroll */}
        <div className="flex space-x-3 overflow-x-auto pb-2 md:hidden scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={isSelected(category.id) ? 'primary' : 'outline'}
              onClick={() => handleCategoryClick(category.id)}
              className="flex-shrink-0 px-4 py-2"
            >
              <Icon name={category.icon} size={16} />
              <span className="ml-2 whitespace-nowrap">{category.label}</span>
            </Button>
          ))}
        </div>

        {/* Desktop: Wrapped grid */}
        <div className="hidden md:flex flex-wrap gap-3">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={isSelected(category.id) ? 'primary' : 'outline'}
              onClick={() => handleCategoryClick(category.id)}
              className="px-4 py-2"
            >
              <Icon name={category.icon} size={16} />
              <span className="ml-2">{category.label}</span>
            </Button>
          ))}
        </div>

        {/* Selected categories count */}
        {selectedCategories.length > 0 && (
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-text-secondary">
              {selectedCategories.length} categories selected
            </span>
            <Button
              variant="ghost"
              onClick={() => onCategoryChange([])}
              className="text-sm px-2 py-1"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;