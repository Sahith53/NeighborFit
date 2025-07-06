import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';

const WelcomeSection = () => {
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
      welcomeBack: 'Welcome Back!',
      subtitle: 'Connect with your neighbors and build meaningful relationships in your community.',
      communityStats: 'Join thousands of neighbors already connecting',
      activeUsers: '10,000+ Active Users',
      neighborhoods: '500+ Neighborhoods',
      connections: '25,000+ Connections Made'
    },
    es: {
      welcomeBack: '¡Bienvenido de Vuelta!',
      subtitle: 'Conéctate con tus vecinos y construye relaciones significativas en tu comunidad.',
      communityStats: 'Únete a miles de vecinos que ya se están conectando',
      activeUsers: '10,000+ Usuarios Activos',
      neighborhoods: '500+ Vecindarios',
      connections: '25,000+ Conexiones Realizadas'
    },
    fr: {
      welcomeBack: 'Bon Retour!',
      subtitle: 'Connectez-vous avec vos voisins et construisez des relations significatives dans votre communauté.',
      communityStats: 'Rejoignez des milliers de voisins qui se connectent déjà',
      activeUsers: '10,000+ Utilisateurs Actifs',
      neighborhoods: '500+ Quartiers',
      connections: '25,000+ Connexions Créées'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const communityHighlights = [
    {
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
      alt: 'Neighbors having coffee together'
    },
    {
      image: 'https://images.pixabay.com/photo-2016/11/29/13/14/attractive-1869761_640.jpg?auto=compress&cs=tinysrgb&w=400',
      alt: 'Community garden activity'
    },
    {
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80',
      alt: 'Neighborhood fitness group'
    }
  ];

  const stats = [
    { label: t.activeUsers, value: '10K+' },
    { label: t.neighborhoods, value: '500+' },
    { label: t.connections, value: '25K+' }
  ];

  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-center lg:px-8 lg:py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-4">
            {t.welcomeBack}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {communityHighlights.map((highlight, index) => (
            <div key={index} className="aspect-square rounded-lg overflow-hidden">
              <Image
                src={highlight.image}
                alt={highlight.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="bg-muted rounded-lg p-6">
          <p className="text-sm font-medium text-text-primary mb-4 text-center">
            {t.communityStats}
          </p>
          <div className="space-y-3">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">{stat.label}</span>
                <span className="text-sm font-semibold text-primary">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;