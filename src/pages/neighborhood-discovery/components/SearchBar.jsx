import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, currentLanguage, initialQuery = '' }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const translations = {
    en: {
      searchPlaceholder: 'Search by interests, activities, or lifestyle...',
      recentSearches: 'Recent Searches',
      popularSearches: 'Popular Searches',
      clearSearch: 'Clear Search',
      noSuggestions: 'No suggestions found'
    },
    es: {
      searchPlaceholder: 'Buscar por intereses, actividades o estilo de vida...',
      recentSearches: 'Búsquedas Recientes',
      popularSearches: 'Búsquedas Populares',
      clearSearch: 'Limpiar Búsqueda',
      noSuggestions: 'No se encontraron sugerencias'
    },
    fr: {
      searchPlaceholder: 'Rechercher par intérêts, activités ou style de vie...',
      recentSearches: 'Recherches Récentes',
      popularSearches: 'Recherches Populaires',
      clearSearch: 'Effacer la Recherche',
      noSuggestions: 'Aucune suggestion trouvée'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  // Mock search suggestions
  const mockSuggestions = {
    en: [
      'Fitness enthusiasts',
      'Dog owners',
      'Coffee lovers',
      'Hiking partners',
      'Book clubs',
      'Cooking enthusiasts',
      'Photography',
      'Yoga practitioners',
      'Running partners',
      'Art lovers',
      'Music enthusiasts',
      'Gardening'
    ],
    es: [
      'Entusiastas del fitness',
      'Dueños de perros',
      'Amantes del café',
      'Compañeros de senderismo',
      'Clubes de lectura',
      'Entusiastas de la cocina',
      'Fotografía',
      'Practicantes de yoga',
      'Compañeros de running',
      'Amantes del arte',
      'Entusiastas de la música',
      'Jardinería'
    ],
    fr: [
      'Passionnés de fitness',
      'Propriétaires de chiens',
      'Amateurs de café',
      'Partenaires de randonnée',
      'Clubs de lecture',
      'Passionnés de cuisine',
      'Photographie',
      'Pratiquants de yoga',
      'Partenaires de course',
      'Amateurs d\'art',
      'Passionnés de musique',
      'Jardinage'
    ]
  };

  const recentSearches = [
    'Fitness enthusiasts',
    'Dog owners',
    'Coffee lovers'
  ];

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = mockSuggestions[currentLanguage]?.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];
      setSuggestions(filtered.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, currentLanguage]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setShowSuggestions(false);
      // Save to recent searches (in real app, this would be localStorage)
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch('');
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    if (searchQuery.length === 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative">
          <Icon
            name="Search"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
          <Input
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={t.searchPlaceholder}
            className="pl-10 pr-10 py-3 w-full"
          />
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              onClick={handleClearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
              title={t.clearSearch}
            >
              <Icon name="X" size={16} />
            </Button>
          )}
        </div>
      </form>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl shadow-elevation-4 z-50 max-h-80 overflow-y-auto">
          {searchQuery.length === 0 ? (
            // Show recent and popular searches when no query
            <div className="p-4">
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-text-secondary mb-2">
                    {t.recentSearches}
                  </h4>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(search)}
                        className="flex items-center w-full px-3 py-2 text-left hover:bg-muted rounded-lg transition-smooth"
                      >
                        <Icon name="Clock" size={16} className="mr-3 text-text-secondary" />
                        <span className="text-text-primary">{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h4 className="text-sm font-medium text-text-secondary mb-2">
                  {t.popularSearches}
                </h4>
                <div className="space-y-1">
                  {mockSuggestions[currentLanguage]?.slice(0, 5).map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="flex items-center w-full px-3 py-2 text-left hover:bg-muted rounded-lg transition-smooth"
                    >
                      <Icon name="TrendingUp" size={16} className="mr-3 text-text-secondary" />
                      <span className="text-text-primary">{search}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Show filtered suggestions
            <div className="p-2">
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex items-center w-full px-3 py-2 text-left hover:bg-muted rounded-lg transition-smooth"
                  >
                    <Icon name="Search" size={16} className="mr-3 text-text-secondary" />
                    <span className="text-text-primary">{suggestion}</span>
                  </button>
                ))
              ) : (
                <div className="px-3 py-4 text-center text-text-secondary">
                  {t.noSuggestions}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;