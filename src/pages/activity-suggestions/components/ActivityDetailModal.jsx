import React, { useState, useEffect } from 'react';
import ModalOverlay from '../../../components/ui/ModalOverlay';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityDetailModal = ({ isOpen, onClose, activity, onRSVP, onMessage, currentLanguage }) => {
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const [showAllAttendees, setShowAllAttendees] = useState(false);

  const translations = {
    en: {
      activityDetails: 'Activity Details',
      organizer: 'Organizer',
      when: 'When',
      where: 'Where',
      attendees: 'Attendees',
      description: 'Description',
      requirements: 'Requirements',
      cost: 'Cost',
      difficulty: 'Difficulty',
      contact: 'Contact',
      going: 'Going',
      interested: 'Interested',
      maybe: 'Maybe',
      message: 'Message',
      getDirections: 'Get Directions',
      addToCalendar: 'Add to Calendar',
      share: 'Share',
      report: 'Report',
      showAll: 'Show All',
      showLess: 'Show Less',
      free: 'Free',
      outdoor: 'Outdoor',
      indoor: 'Indoor',
      equipmentRequired: 'Equipment Required',
      noEquipment: 'No Equipment Needed',
      mutualConnections: 'mutual connections'
    },
    es: {
      activityDetails: 'Detalles de la Actividad',
      organizer: 'Organizador',
      when: 'Cuándo',
      where: 'Dónde',
      attendees: 'Asistentes',
      description: 'Descripción',
      requirements: 'Requisitos',
      cost: 'Costo',
      difficulty: 'Dificultad',
      contact: 'Contacto',
      going: 'Voy',
      interested: 'Interesado',
      maybe: 'Tal vez',
      message: 'Mensaje',
      getDirections: 'Obtener Direcciones',
      addToCalendar: 'Agregar al Calendario',
      share: 'Compartir',
      report: 'Reportar',
      showAll: 'Mostrar Todos',
      showLess: 'Mostrar Menos',
      free: 'Gratis',
      outdoor: 'Exterior',
      indoor: 'Interior',
      equipmentRequired: 'Equipo Requerido',
      noEquipment: 'No se Necesita Equipo',
      mutualConnections: 'conexiones mutuas'
    },
    fr: {
      activityDetails: 'Détails de l\'Activité',
      organizer: 'Organisateur',
      when: 'Quand',
      where: 'Où',
      attendees: 'Participants',
      description: 'Description',
      requirements: 'Exigences',
      cost: 'Coût',
      difficulty: 'Difficulté',
      contact: 'Contact',
      going: 'J\'y vais',
      interested: 'Intéressé',
      maybe: 'Peut-être',
      message: 'Message',
      getDirections: 'Obtenir Directions',
      addToCalendar: 'Ajouter au Calendrier',
      share: 'Partager',
      report: 'Signaler',
      showAll: 'Tout Afficher',
      showLess: 'Afficher Moins',
      free: 'Gratuit',
      outdoor: 'Extérieur',
      indoor: 'Intérieur',
      equipmentRequired: 'Équipement Requis',
      noEquipment: 'Aucun Équipement Nécessaire',
      mutualConnections: 'connexions mutuelles'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  useEffect(() => {
    if (activity) {
      setRsvpStatus(activity.userRsvpStatus || null);
    }
  }, [activity]);

  if (!activity) return null;

  const handleRSVP = (status) => {
    const newStatus = status === rsvpStatus ? null : status;
    setRsvpStatus(newStatus);
    onRSVP(activity.id, newStatus);
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
        weekday: 'long',
        month: 'long', 
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'easy': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'hard': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const mockAttendees = [
    { id: 1, name: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', mutual: true },
    { id: 2, name: 'Mike Chen', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', mutual: false },
    { id: 3, name: 'Emma Wilson', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', mutual: true },
    { id: 4, name: 'David Brown', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', mutual: false },
    { id: 5, name: 'Lisa Garcia', avatar: 'https://randomuser.me/api/portraits/women/5.jpg', mutual: true },
    { id: 6, name: 'Tom Anderson', avatar: 'https://randomuser.me/api/portraits/men/6.jpg', mutual: false }
  ];

  const displayedAttendees = showAllAttendees ? mockAttendees : mockAttendees.slice(0, 4);
  const mutualCount = mockAttendees.filter(a => a.mutual).length;

  return (
    <ModalOverlay
      isOpen={isOpen}
      onClose={onClose}
      title={t.activityDetails}
      size="lg"
    >
      <div className="max-h-[80vh] overflow-y-auto">
        {/* Activity Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={activity.image}
            alt={activity.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button
              variant="ghost"
              className="bg-black/50 text-white hover:bg-black/70 p-2"
              onClick={() => {
                // Share functionality
                if (navigator.share) {
                  navigator.share({
                    title: activity.title,
                    text: activity.description,
                    url: window.location.href
                  });
                }
              }}
            >
              <Icon name="Share" size={16} />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Title and Basic Info */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
              {activity.title}
            </h2>
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <span className={`px-2 py-1 rounded-full ${getDifficultyColor(activity.difficulty)}`}>
                {t.difficulty}: {activity.difficulty}
              </span>
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                {activity.isOutdoor ? t.outdoor : t.indoor}
              </span>
              <span className="flex items-center">
                <Icon name="MapPin" size={14} />
                <span className="ml-1">{activity.distance} away</span>
              </span>
            </div>
          </div>

          {/* Organizer */}
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src="https://randomuser.me/api/portraits/women/10.jpg"
                alt="Organizer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium text-text-primary">Jessica Martinez</p>
              <p className="text-sm text-text-secondary">{t.organizer}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => onMessage('organizer')}
              className="px-3 py-1 text-sm"
            >
              {t.message}
            </Button>
          </div>

          {/* When and Where */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-heading font-semibold text-text-primary flex items-center">
                <Icon name="Calendar" size={18} className="mr-2" />
                {t.when}
              </h3>
              <p className="text-text-secondary">{formatDate(activity.date)}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-semibold text-text-primary flex items-center">
                <Icon name="MapPin" size={18} className="mr-2" />
                {t.where}
              </h3>
              <p className="text-text-secondary">{activity.location}</p>
              <Button
                variant="link"
                onClick={() => {
                  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location)}`;
                  window.open(url, '_blank');
                }}
                className="p-0 text-sm"
              >
                {t.getDirections}
              </Button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-2">
              {t.description}
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {activity.description}
            </p>
          </div>

          {/* Requirements and Cost */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-heading font-semibold text-text-primary mb-2">
                {t.requirements}
              </h3>
              <p className="text-text-secondary">
                {activity.requiresEquipment ? t.equipmentRequired : t.noEquipment}
              </p>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-text-primary mb-2">
                {t.cost}
              </h3>
              <p className="text-text-secondary">
                {activity.cost || t.free}
              </p>
            </div>
          </div>

          {/* Attendees */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-semibold text-text-primary">
                {t.attendees} ({mockAttendees.length})
              </h3>
              {mutualCount > 0 && (
                <span className="text-sm text-primary">
                  {mutualCount} {t.mutualConnections}
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {displayedAttendees.map((attendee) => (
                <div key={attendee.id} className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={attendee.avatar}
                        alt={attendee.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {attendee.mutual && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border border-surface"></div>
                    )}
                  </div>
                  <span className="text-sm text-text-primary truncate">
                    {attendee.name}
                  </span>
                </div>
              ))}
            </div>
            
            {mockAttendees.length > 4 && (
              <Button
                variant="link"
                onClick={() => setShowAllAttendees(!showAllAttendees)}
                className="mt-2 p-0 text-sm"
              >
                {showAllAttendees ? t.showLess : t.showAll}
              </Button>
            )}
          </div>

          {/* RSVP Actions */}
          <div className="border-t border-border pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <Button
                  variant={rsvpStatus === 'going' ? 'success' : 'outline'}
                  onClick={() => handleRSVP('going')}
                  className="flex-1 sm:flex-none"
                >
                  <Icon name="Check" size={16} />
                  <span className="ml-2">{t.going}</span>
                </Button>
                <Button
                  variant={rsvpStatus === 'interested' ? 'primary' : 'outline'}
                  onClick={() => handleRSVP('interested')}
                  className="flex-1 sm:flex-none"
                >
                  <Icon name="Heart" size={16} />
                  <span className="ml-2">{t.interested}</span>
                </Button>
                <Button
                  variant={rsvpStatus === 'maybe' ? 'warning' : 'outline'}
                  onClick={() => handleRSVP('maybe')}
                  className="flex-1 sm:flex-none"
                >
                  <Icon name="HelpCircle" size={16} />
                  <span className="ml-2">{t.maybe}</span>
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    // Add to calendar functionality
                    const startDate = new Date(activity.date);
                    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours later
                    
                    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(activity.title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(activity.description)}&location=${encodeURIComponent(activity.location)}`;
                    
                    window.open(calendarUrl, '_blank');
                  }}
                  className="px-3 py-2"
                >
                  <Icon name="Calendar" size={16} />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    // Report functionality
                    alert('Report functionality would be implemented here');
                  }}
                  className="px-3 py-2"
                >
                  <Icon name="Flag" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default ActivityDetailModal;