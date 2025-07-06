import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const TabNavigation = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const location = useLocation();
  const navigate = useNavigate();

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
      discover: 'Discover',
      activities: 'Activities',
      profile: 'Profile'
    },
    es: {
      discover: 'Descubrir',
      activities: 'Actividades',
      profile: 'Perfil'
    },
    fr: {
      discover: 'Découvrir',
      activities: 'Activités',
      profile: 'Profil'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const navigationItems = [
    {
      label: t.discover,
      path: '/neighborhood-discovery',
      icon: 'Users',
      badge: null
    },
    {
      label: t.activities,
      path: '/activity-suggestions',
      icon: 'Calendar',
      badge: null
    },
    {
      label: t.profile,
      path: '/profile-setup',
      icon: 'User',
      badge: null
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === '/neighborhood-discovery') {
      return location.pathname === '/neighborhood-discovery' || location.pathname === '/profile-detail-view';
    }
    return location.pathname === path;
  };

  const isAuthPage = ['/user-registration', '/user-login'].includes(location.pathname);

  if (isAuthPage) {
    return null;
  }

  return (
    <>
      {/* Mobile Tab Navigation - Bottom */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border md:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-smooth min-w-0 flex-1 ${
                isActive(item.path)
                  ? 'bg-primary/10 text-primary' :'text-text-secondary hover:text-primary hover:bg-muted'
              }`}
            >
              <div className="relative">
                <Icon 
                  name={item.icon} 
                  size={20} 
                  color={isActive(item.path) ? 'var(--color-primary)' : 'currentColor'} 
                />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-caption mt-1 truncate">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop Tab Navigation - Top */}
      <nav className="hidden md:block fixed top-16 left-0 right-0 z-40 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-smooth ${
                  isActive(item.path)
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-primary hover:border-border'
                }`}
              >
                <div className="relative">
                  <Icon 
                    name={item.icon} 
                    size={18} 
                    color={isActive(item.path) ? 'var(--color-primary)' : 'currentColor'} 
                  />
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="font-body font-medium">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default TabNavigation;