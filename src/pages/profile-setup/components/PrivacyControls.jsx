import React from 'react';
import Icon from '../../../components/AppIcon';

const PrivacyControls = ({ currentLanguage, formData, onFormChange }) => {
  const translations = {
    en: {
      privacySettings: 'Privacy Settings',
      profileVisibility: 'Profile Visibility',
      locationSharing: 'Location Sharing',
      contactInfo: 'Contact Information',
      activityStatus: 'Activity Status',
      everyone: 'Everyone in Neighborhood',
      matches: 'Matches Only',
      friends: 'Friends Only',
      precise: 'Precise Location',
      approximate: 'Approximate Location',
      hidden: 'Hidden',
      visible: 'Visible to Matches',
      private: 'Private',
      online: 'Show Online Status',
      offline: 'Always Appear Offline',
      auto: 'Auto (Based on Activity)',
      privacyTip: 'You can change these settings anytime in your profile'
    },
    es: {
      privacySettings: 'Configuración de Privacidad',
      profileVisibility: 'Visibilidad del Perfil',
      locationSharing: 'Compartir Ubicación',
      contactInfo: 'Información de Contacto',
      activityStatus: 'Estado de Actividad',
      everyone: 'Todos en el Vecindario',
      matches: 'Solo Coincidencias',
      friends: 'Solo Amigos',
      precise: 'Ubicación Precisa',
      approximate: 'Ubicación Aproximada',
      hidden: 'Oculto',
      visible: 'Visible para Coincidencias',
      private: 'Privado',
      online: 'Mostrar Estado En Línea',
      offline: 'Siempre Aparecer Desconectado',
      auto: 'Automático (Basado en Actividad)',
      privacyTip: 'Puedes cambiar estas configuraciones en cualquier momento en tu perfil'
    },
    fr: {
      privacySettings: 'Paramètres de Confidentialité',
      profileVisibility: 'Visibilité du Profil',
      locationSharing: 'Partage de Localisation',
      contactInfo: 'Informations de Contact',
      activityStatus: 'Statut d\'Activité',
      everyone: 'Tout le Monde dans le Quartier',
      matches: 'Correspondances Seulement',
      friends: 'Amis Seulement',
      precise: 'Localisation Précise',
      approximate: 'Localisation Approximative',
      hidden: 'Caché',
      visible: 'Visible aux Correspondances',
      private: 'Privé',
      online: 'Afficher le Statut En Ligne',
      offline: 'Toujours Apparaître Hors Ligne',
      auto: 'Auto (Basé sur l\'Activité)',
      privacyTip: 'Vous pouvez modifier ces paramètres à tout moment dans votre profil'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const privacySettings = [
    {
      key: 'profileVisibility',
      title: t.profileVisibility,
      icon: 'Eye',
      options: [
        { value: 'everyone', label: t.everyone },
        { value: 'matches', label: t.matches },
        { value: 'friends', label: t.friends }
      ]
    },
    {
      key: 'locationSharing',
      title: t.locationSharing,
      icon: 'MapPin',
      options: [
        { value: 'precise', label: t.precise },
        { value: 'approximate', label: t.approximate },
        { value: 'hidden', label: t.hidden }
      ]
    },
    {
      key: 'contactInfo',
      title: t.contactInfo,
      icon: 'Phone',
      options: [
        { value: 'visible', label: t.visible },
        { value: 'private', label: t.private }
      ]
    },
    {
      key: 'activityStatus',
      title: t.activityStatus,
      icon: 'Activity',
      options: [
        { value: 'online', label: t.online },
        { value: 'offline', label: t.offline },
        { value: 'auto', label: t.auto }
      ]
    }
  ];

  const handlePrivacyChange = (setting, value) => {
    onFormChange({
      ...formData,
      privacy: {
        ...formData.privacy,
        [setting]: value
      }
    });
  };

  const getPrivacyValue = (setting) => {
    return formData.privacy?.[setting] || privacySettings.find(s => s.key === setting)?.options[0]?.value;
  };

  return (
    <div className="bg-surface rounded-xl p-6 border border-border">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">
        {t.privacySettings}
      </h3>
      
      <div className="space-y-6">
        {privacySettings.map((setting) => (
          <div key={setting.key} className="space-y-3">
            <div className="flex items-center space-x-2">
              <Icon name={setting.icon} size={20} color="var(--color-primary)" />
              <h4 className="font-medium text-text-primary">{setting.title}</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {setting.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handlePrivacyChange(setting.key, option.value)}
                  className={`p-3 rounded-lg border transition-smooth text-sm font-medium text-left ${
                    getPrivacyValue(setting.key) === option.value
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-muted text-text-secondary border-border hover:border-primary hover:bg-primary/5'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
        
        <div className="bg-muted rounded-lg p-4 mt-6">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} color="var(--color-text-secondary)" className="mt-0.5" />
            <p className="text-text-secondary text-sm">
              {t.privacyTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyControls;