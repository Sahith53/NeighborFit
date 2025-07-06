import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActivityCard = ({ activity, onRSVP, onViewDetails, currentLanguage }) => {
  const [rsvpStatus, setRsvpStatus] = useState(activity.userRsvpStatus || null);
  const [attendeeCount, setAttendeeCount] = useState(activity.attendeeCount);

  const translations = {
    en: {
      going: 'Going',
      interested: 'Interested',
      maybe: 'Maybe',
      attendees: 'attendees',
      away: 'away',
      difficulty: 'Difficulty',
      viewDetails: 'View Details',
      rsvp: 'RSVP',
      outdoor: 'Outdoor',
      indoor: 'Indoor'
    },
    es: {
      going: 'Voy',
      interested: 'Interesado',
      maybe: 'Tal vez',
      attendees: 'asistentes',
      away: 'de distancia',
      difficulty: 'Dificultad',
      viewDetails: 'Ver Detalles',
      rsvp: 'Confirmar',
      outdoor: 'Exterior',
      indoor: 'Interior'
    },
    fr: {
      going: 'J\'y vais',
      interested: 'Intéressé',
      maybe: 'Peut-être',
      attendees: 'participants',
      away: 'de distance',
      difficulty: 'Difficulté',
      viewDetails: 'Voir Détails',
      rsvp: 'Répondre',
      outdoor: 'Extérieur',
      indoor: 'Intérieur'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const handleRSVP = (status) => {
    const previousStatus = rsvpStatus;
    setRsvpStatus(status === rsvpStatus ? null : status);
    
    // Update attendee count
    if (previousStatus === 'going' && status !== 'going') {
      setAttendeeCount(prev => prev - 1);
    } else if (previousStatus !== 'going' && status === 'going') {
      setAttendeeCount(prev => prev + 1);
    }
    
    onRSVP(activity.id, status === rsvpStatus ? null : status);
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'easy': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'hard': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  };

  return (
    <div className="bg-surface rounded-xl border border-border shadow-elevation-2 overflow-hidden transition-smooth hover:shadow-elevation-3">
      {/* Activity Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={activity.image}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
            {t.difficulty}: {activity.difficulty}
          </span>
          {activity.isOutdoor && (
            <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
              {activity.isOutdoor ? t.outdoor : t.indoor}
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs font-medium">
          {activity.distance} {t.away}
        </div>
      </div>

      {/* Activity Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-semibold text-lg text-text-primary line-clamp-2">
            {activity.title}
          </h3>
          <div className="flex items-center text-text-secondary ml-2">
            <Icon name="MapPin" size={14} />
            <span className="text-sm ml-1">{activity.location}</span>
          </div>
        </div>

        <div className="flex items-center text-text-secondary mb-3">
          <Icon name="Calendar" size={16} />
          <span className="text-sm ml-2">{formatDate(activity.date)}</span>
        </div>

        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {activity.description}
        </p>

        {/* Attendees and Mutual Connections */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {activity.attendeeAvatars.slice(0, 3).map((avatar, index) => (
                <div key={index} className="w-6 h-6 rounded-full border-2 border-surface overflow-hidden">
                  <Image
                    src={avatar}
                    alt="Attendee"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <span className="text-sm text-text-secondary ml-2">
              {attendeeCount} {t.attendees}
            </span>
          </div>
          
          {activity.mutualConnections > 0 && (
            <div className="flex items-center text-primary">
              <Icon name="Users" size={14} />
              <span className="text-sm ml-1">{activity.mutualConnections} mutual</span>
            </div>
          )}
        </div>

        {/* RSVP Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant={rsvpStatus === 'going' ? 'success' : 'outline'}
              onClick={() => handleRSVP('going')}
              className="px-3 py-1 text-sm"
            >
              <Icon name="Check" size={14} />
              <span className="ml-1">{t.going}</span>
            </Button>
            <Button
              variant={rsvpStatus === 'interested' ? 'primary' : 'outline'}
              onClick={() => handleRSVP('interested')}
              className="px-3 py-1 text-sm"
            >
              <Icon name="Heart" size={14} />
              <span className="ml-1">{t.interested}</span>
            </Button>
            <Button
              variant={rsvpStatus === 'maybe' ? 'warning' : 'outline'}
              onClick={() => handleRSVP('maybe')}
              className="px-3 py-1 text-sm"
            >
              <Icon name="HelpCircle" size={14} />
              <span className="ml-1">{t.maybe}</span>
            </Button>
          </div>
          
          <Button
            variant="ghost"
            onClick={() => onViewDetails(activity)}
            className="p-2"
          >
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;