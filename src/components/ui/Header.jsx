import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount, setNotificationCount] = useState(3);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: language }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/neighborhood-discovery?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleNotificationClick = () => {
    setNotificationCount(0);
  };

  const translations = {
    en: {
      search: 'Search neighbors...',
      notifications: 'Notifications',
      profile: 'Profile',
      language: 'Language'
    },
    es: {
      search: 'Buscar vecinos...',
      notifications: 'Notificaciones',
      profile: 'Perfil',
      language: 'Idioma'
    },
    fr: {
      search: 'Rechercher des voisins...',
      notifications: 'Notifications',
      profile: 'Profil',
      language: 'Langue'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const isAuthPage = ['/user-registration', '/user-login'].includes(location.pathname);

  if (isAuthPage) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-primary-foreground"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-heading font-semibold text-primary">
              NeighborFit
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={currentLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="text-sm bg-transparent border border-border rounded-md px-2 py-1 text-text-secondary focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
            </select>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate('/neighborhood-discovery')}
            className="flex items-center space-x-2 transition-smooth hover:opacity-80"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-primary-foreground"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-heading font-semibold text-primary hidden sm:block">
              NeighborFit
            </span>
          </button>
        </div>

        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative hidden md:block">
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.search}
                  className="w-64 px-3 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                  autoFocus
                  onBlur={() => {
                    if (!searchQuery.trim()) {
                      setIsSearchOpen(false);
                    }
                  }}
                />
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="ml-2"
                >
                  <Icon name="X" size={16} />
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                onClick={() => setIsSearchOpen(true)}
                className="p-2"
                title={t.search}
              >
                <Icon name="Search" size={20} />
              </Button>
            )}
          </div>

          {/* Mobile Search */}
          <Button
            variant="ghost"
            onClick={() => navigate('/neighborhood-discovery?focus=search')}
            className="p-2 md:hidden"
            title={t.search}
          >
            <Icon name="Search" size={20} />
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={handleNotificationClick}
              className="p-2 relative"
              title={t.notifications}
            >
              <Icon name="Bell" size={20} />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </Button>
          </div>

          {/* Language Selector */}
          <select
            value={currentLanguage}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="text-sm bg-transparent border border-border rounded-md px-2 py-1 text-text-secondary focus:outline-none focus:ring-2 focus:ring-ring hidden sm:block"
            title={t.language}
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
          </select>

          {/* Profile */}
          <Button
            variant="ghost"
            onClick={() => navigate('/profile-setup')}
            className="p-2"
            title={t.profile}
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;