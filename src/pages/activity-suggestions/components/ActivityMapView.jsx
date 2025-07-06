import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityMapView = ({ activities, onActivitySelect, currentLanguage }) => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to NYC

  const translations = {
    en: {
      mapView: 'Map View',
      listView: 'List View',
      activities: 'activities',
      viewDetails: 'View Details',
      getDirections: 'Get Directions',
      attendees: 'attendees',
      away: 'away'
    },
    es: {
      mapView: 'Vista de Mapa',
      listView: 'Vista de Lista',
      activities: 'actividades',
      viewDetails: 'Ver Detalles',
      getDirections: 'Obtener Direcciones',
      attendees: 'asistentes',
      away: 'de distancia'
    },
    fr: {
      mapView: 'Vue Carte',
      listView: 'Vue Liste',
      activities: 'activités',
      viewDetails: 'Voir Détails',
      getDirections: 'Obtenir Directions',
      attendees: 'participants',
      away: 'de distance'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  useEffect(() => {
    // Get user's location for map centering
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Geolocation error:', error);
        }
      );
    }
  }, []);

  const handleMarkerClick = (activity) => {
    setSelectedActivity(activity);
  };

  const handleViewDetails = (activity) => {
    onActivitySelect(activity);
    setSelectedActivity(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Generate mock coordinates for activities around the map center
  const activitiesWithCoords = activities.map((activity, index) => ({
    ...activity,
    lat: mapCenter.lat + (Math.random() - 0.5) * 0.02,
    lng: mapCenter.lng + (Math.random() - 0.5) * 0.02
  }));

  return (
    <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
      {/* Map Container */}
      <div className="w-full h-full">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Activities Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=14&output=embed`}
          className="w-full h-full"
        />
      </div>

      {/* Activity Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {activitiesWithCoords.map((activity, index) => {
          // Calculate position based on map bounds (simplified)
          const x = 50 + (index % 3) * 20; // Mock positioning
          const y = 30 + Math.floor(index / 3) * 25;
          
          return (
            <div
              key={activity.id}
              className="absolute pointer-events-auto"
              style={{ 
                left: `${x}%`, 
                top: `${y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <button
                onClick={() => handleMarkerClick(activity)}
                className={`w-8 h-8 rounded-full border-2 border-white shadow-elevation-3 transition-smooth hover:scale-110 ${
                  selectedActivity?.id === activity.id 
                    ? 'bg-primary' :'bg-accent'
                }`}
              >
                <Icon 
                  name="MapPin" 
                  size={16} 
                  color="white" 
                  className="mx-auto"
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Activity Details Popup */}
      {selectedActivity && (
        <div className="absolute bottom-4 left-4 right-4 bg-surface rounded-lg shadow-elevation-4 p-4 max-w-sm mx-auto">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-heading font-semibold text-lg text-text-primary line-clamp-1">
              {selectedActivity.title}
            </h3>
            <Button
              variant="ghost"
              onClick={() => setSelectedActivity(null)}
              className="p-1 -mr-1"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-text-secondary">
              <Icon name="Calendar" size={14} />
              <span className="text-sm ml-2">{formatDate(selectedActivity.date)}</span>
            </div>
            <div className="flex items-center text-text-secondary">
              <Icon name="MapPin" size={14} />
              <span className="text-sm ml-2">{selectedActivity.location}</span>
            </div>
            <div className="flex items-center text-text-secondary">
              <Icon name="Users" size={14} />
              <span className="text-sm ml-2">
                {selectedActivity.attendeeCount} {t.attendees}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="primary"
              onClick={() => handleViewDetails(selectedActivity)}
              className="flex-1 text-sm"
            >
              {t.viewDetails}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                // Open directions in default map app
                const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedActivity.lat},${selectedActivity.lng}`;
                window.open(url, '_blank');
              }}
              className="px-3 py-2"
            >
              <Icon name="Navigation" size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Activities Counter */}
      <div className="absolute top-4 left-4 bg-surface rounded-lg shadow-elevation-3 px-3 py-2">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={16} color="var(--color-primary)" />
          <span className="text-sm font-medium text-text-primary">
            {activities.length} {t.activities}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActivityMapView;