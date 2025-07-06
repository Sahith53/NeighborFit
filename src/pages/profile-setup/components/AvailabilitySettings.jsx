import React from 'react';
import Icon from '../../../components/AppIcon';

const AvailabilitySettings = ({ currentLanguage, formData, onFormChange }) => {
  const translations = {
    en: {
      availability: 'Availability Settings',
      preferredDays: 'Preferred Days',
      preferredTimes: 'Preferred Times',
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
      morning: 'Morning (6AM - 12PM)',
      afternoon: 'Afternoon (12PM - 6PM)',
      evening: 'Evening (6PM - 10PM)',
      night: 'Night (10PM - 6AM)'
    },
    es: {
      availability: 'Configuración de Disponibilidad',
      preferredDays: 'Días Preferidos',
      preferredTimes: 'Horarios Preferidos',
      monday: 'Lunes',
      tuesday: 'Martes',
      wednesday: 'Miércoles',
      thursday: 'Jueves',
      friday: 'Viernes',
      saturday: 'Sábado',
      sunday: 'Domingo',
      morning: 'Mañana (6AM - 12PM)',
      afternoon: 'Tarde (12PM - 6PM)',
      evening: 'Noche (6PM - 10PM)',
      night: 'Madrugada (10PM - 6AM)'
    },
    fr: {
      availability: 'Paramètres de Disponibilité',
      preferredDays: 'Jours Préférés',
      preferredTimes: 'Heures Préférées',
      monday: 'Lundi',
      tuesday: 'Mardi',
      wednesday: 'Mercredi',
      thursday: 'Jeudi',
      friday: 'Vendredi',
      saturday: 'Samedi',
      sunday: 'Dimanche',
      morning: 'Matin (6h - 12h)',
      afternoon: 'Après-midi (12h - 18h)',
      evening: 'Soir (18h - 22h)',
      night: 'Nuit (22h - 6h)'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const days = [
    { key: 'monday', label: t.monday, icon: 'Calendar' },
    { key: 'tuesday', label: t.tuesday, icon: 'Calendar' },
    { key: 'wednesday', label: t.wednesday, icon: 'Calendar' },
    { key: 'thursday', label: t.thursday, icon: 'Calendar' },
    { key: 'friday', label: t.friday, icon: 'Calendar' },
    { key: 'saturday', label: t.saturday, icon: 'Calendar' },
    { key: 'sunday', label: t.sunday, icon: 'Calendar' }
  ];

  const timeSlots = [
    { key: 'morning', label: t.morning, icon: 'Sunrise' },
    { key: 'afternoon', label: t.afternoon, icon: 'Sun' },
    { key: 'evening', label: t.evening, icon: 'Sunset' },
    { key: 'night', label: t.night, icon: 'Moon' }
  ];

  const selectedDays = formData.preferredDays || [];
  const selectedTimes = formData.preferredTimes || [];

  const handleDayToggle = (day) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day];
    
    onFormChange({
      ...formData,
      preferredDays: updatedDays
    });
  };

  const handleTimeToggle = (time) => {
    const updatedTimes = selectedTimes.includes(time)
      ? selectedTimes.filter(t => t !== time)
      : [...selectedTimes, time];
    
    onFormChange({
      ...formData,
      preferredTimes: updatedTimes
    });
  };

  return (
    <div className="bg-surface rounded-xl p-6 border border-border">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">
        {t.availability}
      </h3>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Calendar" size={20} color="var(--color-primary)" />
            <h4 className="font-medium text-text-primary">{t.preferredDays}</h4>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {days.map((day) => (
              <button
                key={day.key}
                onClick={() => handleDayToggle(day.key)}
                className={`p-3 rounded-lg border transition-smooth text-sm font-medium ${
                  selectedDays.includes(day.key)
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-muted text-text-secondary border-border hover:border-primary hover:bg-primary/5'
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Clock" size={20} color="var(--color-primary)" />
            <h4 className="font-medium text-text-primary">{t.preferredTimes}</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot.key}
                onClick={() => handleTimeToggle(slot.key)}
                className={`flex items-center space-x-3 p-4 rounded-lg border transition-smooth ${
                  selectedTimes.includes(slot.key)
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-muted text-text-secondary border-border hover:border-primary hover:bg-primary/5'
                }`}
              >
                <Icon 
                  name={slot.icon} 
                  size={20} 
                  color={selectedTimes.includes(slot.key) ? 'white' : 'var(--color-text-secondary)'} 
                />
                <span className="font-medium">{slot.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilitySettings;