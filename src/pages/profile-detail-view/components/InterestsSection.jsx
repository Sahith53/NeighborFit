import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const InterestsSection = ({ interests }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [expandedCategories, setExpandedCategories] = useState(new Set());

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
      interests: 'Interests & Hobbies',
      showMore: 'Show more',
      showLess: 'Show less',
      shared: 'Shared with you'
    },
    es: {
      interests: 'Intereses y Pasatiempos',
      showMore: 'Mostrar más',
      showLess: 'Mostrar menos',
      shared: 'Compartido contigo'
    },
    fr: {
      interests: 'Intérêts et Loisirs',
      showMore: 'Afficher plus',
      showLess: 'Afficher moins',
      shared: 'Partagé avec vous'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const toggleCategory = (categoryName) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'fitness':
        return 'Zap';
      case 'hobbies':
        return 'Palette';
      case 'food':
        return 'Coffee';
      case 'travel':
        return 'Plane';
      case 'entertainment':
        return 'Film';
      case 'sports':
        return 'Trophy';
      case 'music':
        return 'Music';
      case 'books':
        return 'BookOpen';
      default:
        return 'Star';
    }
  };

  return (
    <div className="bg-surface p-6 rounded-lg border border-border">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        {t.interests}
      </h3>

      <div className="space-y-4">
        {interests.map((category, index) => {
          const isExpanded = expandedCategories.has(category.name);
          const displayItems = isExpanded ? category.items : category.items.slice(0, 3);
          const hasMore = category.items.length > 3;

          return (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon 
                    name={getCategoryIcon(category.name)} 
                    size={16} 
                    className="text-primary" 
                  />
                </div>
                <h4 className="font-medium text-text-primary">
                  {category.name}
                </h4>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {displayItems.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`px-3 py-1 rounded-full text-sm flex items-center space-x-1 ${
                      item.shared
                        ? 'bg-success/10 text-success border border-success/20' :'bg-muted text-text-secondary'
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.shared && (
                      <Icon name="Check" size={12} className="text-success" />
                    )}
                  </div>
                ))}
              </div>

              {hasMore && (
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="text-sm text-primary hover:text-primary/80 transition-smooth flex items-center space-x-1"
                >
                  <span>
                    {isExpanded ? t.showLess : t.showMore}
                  </span>
                  <Icon 
                    name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
                    size={16} 
                  />
                </button>
              )}

              {/* Shared indicator */}
              {category.items.some(item => item.shared) && (
                <div className="mt-2 pt-2 border-t border-border">
                  <div className="flex items-center space-x-1 text-xs text-success">
                    <Icon name="Users" size={12} />
                    <span>{t.shared}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InterestsSection;