import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ neighbors, onNeighborSelect, currentLanguage, userLocation }) => {
  const [selectedNeighbor, setSelectedNeighbor] = useState(null);

  const translations = {
    en: {
      mapView: 'Map View',
      away: 'away',
      compatibility: 'compatibility',
      viewProfile: 'View Profile',
      closeDetails: 'Close Details',
      yourLocation: 'Your Location',
      neighborsNearby: 'neighbors nearby',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      centerMap: 'Center Map'
    },
    es: {
      mapView: 'Vista de Mapa',
      away: 'de distancia',
      compatibility: 'compatibilidad',
      viewProfile: 'Ver Perfil',
      closeDetails: 'Cerrar Detalles',
      yourLocation: 'Tu Ubicación',
      neighborsNearby: 'vecinos cercanos',
      zoomIn: 'Acercar',
      zoomOut: 'Alejar',
      centerMap: 'Centrar Mapa'
    },
    fr: {
      mapView: 'Vue Carte',
      away: 'de distance',
      compatibility: 'compatibilité',
      viewProfile: 'Voir le Profil',
      closeDetails: 'Fermer les Détails',
      yourLocation: 'Votre Position',
      neighborsNearby: 'voisins à proximité',
      zoomIn: 'Zoomer',
      zoomOut: 'Dézoomer',
      centerMap: 'Centrer la Carte'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const handleMarkerClick = (neighbor) => {
    setSelectedNeighbor(neighbor);
    onNeighborSelect(neighbor);
  };

  const handleCloseDetails = () => {
    setSelectedNeighbor(null);
  };

  // Mock map coordinates based on user location
  const mapCenter = userLocation || { lat: 40.7128, lng: -74.0060 }; // Default to NYC

  return (
    <div className="relative w-full h-full bg-muted rounded-xl overflow-hidden">
      {/* Map Container */}
      <div className="w-full h-full">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title={t.mapView}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=14&output=embed`}
          className="border-0"
        />
      </div>

      {/* Map Overlay with Neighbor Markers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* User Location Marker */}
        <div 
          className="absolute w-4 h-4 bg-primary rounded-full border-2 border-white shadow-elevation-2 pointer-events-auto cursor-pointer"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          title={t.yourLocation}
        />

        {/* Neighbor Markers */}
        {neighbors.slice(0, 10).map((neighbor, index) => (
          <div
            key={neighbor.id}
            className="absolute w-10 h-10 pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-smooth hover:scale-110"
            style={{
              top: `${45 + (index % 3) * 10}%`,
              left: `${45 + (index % 4) * 10}%`
            }}
            onClick={() => handleMarkerClick(neighbor)}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full border-2 border-white shadow-elevation-2 overflow-hidden bg-surface">
                <img
                  src={neighbor.profileImage}
                  alt={neighbor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-success text-white text-xs rounded-full flex items-center justify-center font-bold">
                {neighbor.compatibilityScore}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="secondary"
          className="w-10 h-10 p-0 shadow-elevation-2"
          title={t.zoomIn}
        >
          <Icon name="Plus" size={16} />
        </Button>
        <Button
          variant="secondary"
          className="w-10 h-10 p-0 shadow-elevation-2"
          title={t.zoomOut}
        >
          <Icon name="Minus" size={16} />
        </Button>
        <Button
          variant="secondary"
          className="w-10 h-10 p-0 shadow-elevation-2"
          title={t.centerMap}
        >
          <Icon name="Navigation" size={16} />
        </Button>
      </div>

      {/* Neighbor Count Badge */}
      <div className="absolute top-4 left-4 bg-surface px-3 py-2 rounded-full shadow-elevation-2">
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={16} color="var(--color-primary)" />
          <span className="text-sm font-medium text-text-primary">
            {neighbors.length} {t.neighborsNearby}
          </span>
        </div>
      </div>

      {/* Selected Neighbor Details */}
      {selectedNeighbor && (
        <div className="absolute bottom-4 left-4 right-4 bg-surface rounded-xl shadow-elevation-4 p-4">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={selectedNeighbor.profileImage}
                alt={selectedNeighbor.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-heading font-semibold text-text-primary truncate">
                  {selectedNeighbor.name}, {selectedNeighbor.age}
                </h4>
                <Button
                  variant="ghost"
                  onClick={handleCloseDetails}
                  className="p-1 flex-shrink-0"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-text-secondary mb-2">
                <div className="flex items-center">
                  <Icon name="MapPin" size={12} className="mr-1" />
                  <span>{selectedNeighbor.distance} {t.away}</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Heart" size={12} className="mr-1" />
                  <span>{selectedNeighbor.compatibilityScore}% {t.compatibility}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {selectedNeighbor.interests.slice(0, 2).map((interest, index) => (
                    <span
                      key={index}
                      className="bg-muted text-text-secondary px-2 py-1 rounded-full text-xs"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                
                <Button
                  variant="primary"
                  onClick={() => onNeighborSelect(selectedNeighbor)}
                  className="text-sm px-3 py-1"
                >
                  {t.viewProfile}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;