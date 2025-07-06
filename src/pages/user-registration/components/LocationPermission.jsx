import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const LocationPermission = ({ onLocationPermission, onManualAddress }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualAddress, setManualAddress] = useState('');
  const [locationStatus, setLocationStatus] = useState('pending'); // pending, granted, denied

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
      locationTitle: 'Enable Location Services',
      locationDescription: 'NeighborFit uses your location to connect you with neighbors in your area. Your exact location is never shared with other users.',
      privacyNote: 'We only show your general neighborhood to potential matches for privacy and safety.',
      enableLocation: 'Enable Location',
      manualEntry: 'Enter Address Manually',
      addressPlaceholder: 'Enter your address',
      useAddress: 'Use This Address',
      locationBenefits: [
        'Find neighbors within walking distance',
        'Discover local activities and events',
        'Connect with your immediate community',
        'Get personalized neighborhood recommendations'
      ],
      privacyTitle: 'Your Privacy Matters',
      privacyPoints: [
        'Only your neighborhood area is visible to others',
        'Exact address is never shared',
        'You control your visibility settings',
        'Location data is encrypted and secure'
      ]
    },
    es: {
      locationTitle: 'Habilitar Servicios de Ubicación',
      locationDescription: 'NeighborFit usa tu ubicación para conectarte con vecinos en tu área. Tu ubicación exacta nunca se comparte con otros usuarios.',
      privacyNote: 'Solo mostramos tu vecindario general a posibles coincidencias por privacidad y seguridad.',
      enableLocation: 'Habilitar Ubicación',
      manualEntry: 'Ingresar Dirección Manualmente',
      addressPlaceholder: 'Ingresa tu dirección',
      useAddress: 'Usar Esta Dirección',
      locationBenefits: [
        'Encuentra vecinos a distancia caminable',
        'Descubre actividades y eventos locales',
        'Conéctate con tu comunidad inmediata',
        'Obtén recomendaciones personalizadas del vecindario'
      ],
      privacyTitle: 'Tu Privacidad Importa',
      privacyPoints: [
        'Solo tu área de vecindario es visible para otros',
        'La dirección exacta nunca se comparte',
        'Controlas tus configuraciones de visibilidad',
        'Los datos de ubicación están encriptados y seguros'
      ]
    },
    fr: {
      locationTitle: 'Activer les Services de Localisation',
      locationDescription: 'NeighborFit utilise votre localisation pour vous connecter avec des voisins dans votre région. Votre localisation exacte n\'est jamais partagée avec d\'autres utilisateurs.',
      privacyNote: 'Nous ne montrons que votre quartier général aux correspondances potentielles pour la confidentialité et la sécurité.',
      enableLocation: 'Activer la Localisation',
      manualEntry: 'Saisir l\'Adresse Manuellement',
      addressPlaceholder: 'Entrez votre adresse',
      useAddress: 'Utiliser Cette Adresse',
      locationBenefits: [
        'Trouvez des voisins à distance de marche',
        'Découvrez des activités et événements locaux',
        'Connectez-vous avec votre communauté immédiate',
        'Obtenez des recommandations personnalisées du quartier'
      ],
      privacyTitle: 'Votre Confidentialité Compte',
      privacyPoints: [
        'Seule votre zone de quartier est visible aux autres',
        'L\'adresse exacte n\'est jamais partagée',
        'Vous contrôlez vos paramètres de visibilité',
        'Les données de localisation sont cryptées et sécurisées'
      ]
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const handleEnableLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });

      setLocationStatus('granted');
      onLocationPermission({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      });
    } catch (error) {
      setLocationStatus('denied');
      setShowManualEntry(true);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualAddress.trim()) {
      onManualAddress(manualAddress.trim());
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="MapPin" size={32} color="var(--color-primary)" />
        </div>
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          {t.locationTitle}
        </h2>
        <p className="text-text-secondary">
          {t.locationDescription}
        </p>
      </div>

      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} color="var(--color-success)" className="mt-0.5" />
          <div>
            <h3 className="font-medium text-text-primary mb-1">{t.privacyTitle}</h3>
            <p className="text-sm text-text-secondary">{t.privacyNote}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-text-primary">Why we need your location:</h3>
        <ul className="space-y-2">
          {t.locationBenefits.map((benefit, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Icon name="Check" size={16} color="var(--color-success)" className="mt-0.5" />
              <span className="text-sm text-text-secondary">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-text-primary">Privacy Protection:</h3>
        <ul className="space-y-2">
          {t.privacyPoints.map((point, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Icon name="Lock" size={16} color="var(--color-primary)" className="mt-0.5" />
              <span className="text-sm text-text-secondary">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {!showManualEntry ? (
        <div className="space-y-3">
          <Button
            variant="primary"
            onClick={handleEnableLocation}
            className="w-full"
            iconName="MapPin"
            iconPosition="left"
            disabled={locationStatus === 'granted'}
          >
            {locationStatus === 'granted' ? 'Location Enabled' : t.enableLocation}
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => setShowManualEntry(true)}
            className="w-full"
          >
            {t.manualEntry}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleManualSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder={t.addressPlaceholder}
            value={manualAddress}
            onChange={(e) => setManualAddress(e.target.value)}
            required
          />
          <div className="flex space-x-3">
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={!manualAddress.trim()}
            >
              {t.useAddress}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowManualEntry(false)}
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LocationPermission;