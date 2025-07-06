import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NeighborCard = ({ neighbor, onLike, onPass, currentLanguage }) => {
  const navigate = useNavigate();

  const translations = {
    en: {
      away: 'away',
      compatibility: 'compatibility',
      interests: 'interests',
      viewProfile: 'View Profile',
      like: 'Like',
      pass: 'Pass',
      online: 'Online',
      lastSeen: 'Last seen',
      hoursAgo: 'hours ago',
      minutesAgo: 'minutes ago',
      justNow: 'Just now'
    },
    es: {
      away: 'de distancia',
      compatibility: 'compatibilidad',
      interests: 'intereses',
      viewProfile: 'Ver Perfil',
      like: 'Me Gusta',
      pass: 'Pasar',
      online: 'En línea',
      lastSeen: 'Visto por última vez',
      hoursAgo: 'horas atrás',
      minutesAgo: 'minutos atrás',
      justNow: 'Ahora mismo'
    },
    fr: {
      away: 'de distance',
      compatibility: 'compatibilité',
      interests: 'intérêts',
      viewProfile: 'Voir le Profil',
      like: 'J\'aime',
      pass: 'Passer',
      online: 'En ligne',
      lastSeen: 'Vu pour la dernière fois',
      hoursAgo: 'heures',
      minutesAgo: 'minutes',
      justNow: 'À l\'instant'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const handleViewProfile = () => {
    navigate('/profile-detail-view', { state: { neighborId: neighbor.id } });
  };

  const getActivityStatus = () => {
    if (neighbor.isOnline) {
      return { text: t.online, color: 'text-success' };
    }
    
    const lastSeenMinutes = neighbor.lastSeenMinutes;
    if (lastSeenMinutes < 5) {
      return { text: t.justNow, color: 'text-success' };
    } else if (lastSeenMinutes < 60) {
      return { text: `${lastSeenMinutes} ${t.minutesAgo}`, color: 'text-warning' };
    } else {
      const hours = Math.floor(lastSeenMinutes / 60);
      return { text: `${hours} ${t.hoursAgo}`, color: 'text-text-secondary' };
    }
  };

  const activityStatus = getActivityStatus();

  return (
    <div className="bg-surface rounded-xl shadow-elevation-2 overflow-hidden transition-smooth hover:shadow-elevation-3 hover:scale-micro-up">
      {/* Profile Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={neighbor.profileImage}
          alt={`${neighbor.name}'s profile`}
          className="w-full h-full object-cover"
        />
        
        {/* Online Status Indicator */}
        <div className="absolute top-3 right-3">
          <div className={`w-3 h-3 rounded-full ${neighbor.isOnline ? 'bg-success' : 'bg-text-secondary'} border-2 border-white`} />
        </div>

        {/* Compatibility Score */}
        <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm font-medium">
          {neighbor.compatibilityScore}% {t.compatibility}
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            {neighbor.name}, {neighbor.age}
          </h3>
          <div className="flex items-center text-text-secondary text-sm">
            <Icon name="MapPin" size={14} className="mr-1" />
            <span>{neighbor.distance} {t.away}</span>
          </div>
        </div>

        {/* Activity Status */}
        <div className={`text-sm mb-3 ${activityStatus.color}`}>
          {activityStatus.text}
        </div>

        {/* Interests */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {neighbor.interests.slice(0, 3).map((interest, index) => (
              <span
                key={index}
                className="bg-muted text-text-secondary px-2 py-1 rounded-full text-xs"
              >
                {interest}
              </span>
            ))}
            {neighbor.interests.length > 3 && (
              <span className="text-text-secondary text-xs px-2 py-1">
                +{neighbor.interests.length - 3} {t.interests}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => onPass(neighbor.id)}
            className="flex-1"
            iconName="X"
            iconSize={16}
          >
            {t.pass}
          </Button>
          <Button
            variant="primary"
            onClick={handleViewProfile}
            className="flex-1"
          >
            {t.viewProfile}
          </Button>
          <Button
            variant="success"
            onClick={() => onLike(neighbor.id)}
            className="px-3"
            iconName="Heart"
            iconSize={16}
          />
        </div>
      </div>
    </div>
  );
};

export default NeighborCard;