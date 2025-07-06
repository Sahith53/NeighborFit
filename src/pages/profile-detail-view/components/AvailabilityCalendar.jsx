import React, { useState, useEffect } from 'react';


const AvailabilityCalendar = ({ availability }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedDay, setSelectedDay] = useState(null);

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
      availability: 'Availability',
      timeSlots: 'Available Time Slots',
      morning: 'Morning',
      afternoon: 'Afternoon',
      evening: 'Evening',
      days: {
        monday: 'Mon',
        tuesday: 'Tue',
        wednesday: 'Wed',
        thursday: 'Thu',
        friday: 'Fri',
        saturday: 'Sat',
        sunday: 'Sun'
      },
      fullDays: {
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday'
      }
    },
    es: {
      availability: 'Disponibilidad',
      timeSlots: 'Horarios Disponibles',
      morning: 'Mañana',
      afternoon: 'Tarde',
      evening: 'Noche',
      days: {
        monday: 'Lun',
        tuesday: 'Mar',
        wednesday: 'Mié',
        thursday: 'Jue',
        friday: 'Vie',
        saturday: 'Sáb',
        sunday: 'Dom'
      },
      fullDays: {
        monday: 'Lunes',
        tuesday: 'Martes',
        wednesday: 'Miércoles',
        thursday: 'Jueves',
        friday: 'Viernes',
        saturday: 'Sábado',
        sunday: 'Domingo'
      }
    },
    fr: {
      availability: 'Disponibilité',
      timeSlots: 'Créneaux Disponibles',
      morning: 'Matin',
      afternoon: 'Après-midi',
      evening: 'Soir',
      days: {
        monday: 'Lun',
        tuesday: 'Mar',
        wednesday: 'Mer',
        thursday: 'Jeu',
        friday: 'Ven',
        saturday: 'Sam',
        sunday: 'Dim'
      },
      fullDays: {
        monday: 'Lundi',
        tuesday: 'Mardi',
        wednesday: 'Mercredi',
        thursday: 'Jeudi',
        friday: 'Vendredi',
        saturday: 'Samedi',
        sunday: 'Dimanche'
      }
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const getAvailabilityLevel = (slots) => {
    if (slots.length >= 3) return 'high';
    if (slots.length >= 1) return 'medium';
    return 'low';
  };

  const getAvailabilityColor = (level) => {
    switch (level) {
      case 'high':
        return 'bg-success text-success-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-text-secondary';
    }
  };

  const getTimeSlotLabel = (slot) => {
    switch (slot) {
      case 'morning':
        return t.morning;
      case 'afternoon':
        return t.afternoon;
      case 'evening':
        return t.evening;
      default:
        return slot;
    }
  };

  return (
    <div className="bg-surface p-6 rounded-lg border border-border">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        {t.availability}
      </h3>

      {/* Weekly Calendar */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {availability.map((day, index) => {
          const level = getAvailabilityLevel(day.timeSlots);
          const isSelected = selectedDay === index;
          
          return (
            <button
              key={index}
              onClick={() => setSelectedDay(isSelected ? null : index)}
              className={`p-3 rounded-lg text-center transition-smooth border ${
                isSelected
                  ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
              }`}
            >
              <div className="text-xs text-text-secondary mb-1">
                {t.days[day.day]}
              </div>
              <div className={`w-6 h-6 rounded-full mx-auto ${getAvailabilityColor(level)}`}>
                {day.timeSlots.length > 0 && (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-xs font-medium">
                      {day.timeSlots.length}
                    </span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Day Details */}
      {selectedDay !== null && (
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium text-text-primary mb-2">
            {t.fullDays[availability[selectedDay].day]}
          </h4>
          <p className="text-sm text-text-secondary mb-3">
            {t.timeSlots}
          </p>
          
          {availability[selectedDay].timeSlots.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {availability[selectedDay].timeSlots.map((slot, slotIndex) => (
                <span
                  key={slotIndex}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                >
                  {getTimeSlotLabel(slot)}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-secondary italic">
              No availability
            </p>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span>High</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span>Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;