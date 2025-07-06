import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WeatherWidget = ({ currentLanguage }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const translations = {
    en: {
      weather: 'Weather',
      feelsLike: 'Feels like',
      humidity: 'Humidity',
      wind: 'Wind',
      visibility: 'Visibility',
      perfect: 'Perfect for outdoor activities',
      good: 'Good for outdoor activities',
      fair: 'Fair for outdoor activities',
      poor: 'Consider indoor activities'
    },
    es: {
      weather: 'Clima',
      feelsLike: 'Se siente como',
      humidity: 'Humedad',
      wind: 'Viento',
      visibility: 'Visibilidad',
      perfect: 'Perfecto para actividades al aire libre',
      good: 'Bueno para actividades al aire libre',
      fair: 'Regular para actividades al aire libre',
      poor: 'Considera actividades en interiores'
    },
    fr: {
      weather: 'Météo',
      feelsLike: 'Ressenti',
      humidity: 'Humidité',
      wind: 'Vent',
      visibility: 'Visibilité',
      perfect: 'Parfait pour les activités extérieures',
      good: 'Bon pour les activités extérieures',
      fair: 'Correct pour les activités extérieures',
      poor: 'Considérez les activités intérieures'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  useEffect(() => {
    // Mock weather data
    const mockWeather = {
      temperature: 22,
      feelsLike: 24,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 8,
      visibility: 10,
      icon: 'Cloud',
      recommendation: 'good'
    };

    setTimeout(() => {
      setWeather(mockWeather);
      setLoading(false);
    }, 1000);
  }, []);

  const getRecommendationText = (recommendation) => {
    switch (recommendation) {
      case 'perfect': return t.perfect;
      case 'good': return t.good;
      case 'fair': return t.fair;
      case 'poor': return t.poor;
      default: return t.good;
    }
  };

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case 'perfect': return 'text-success bg-success/10';
      case 'good': return 'text-primary bg-primary/10';
      case 'fair': return 'text-warning bg-warning/10';
      case 'poor': return 'text-error bg-error/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  if (loading) {
    return (
      <div className="bg-surface rounded-lg border border-border p-4">
        <div className="animate-pulse">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-muted rounded-full"></div>
            <div className="h-4 bg-muted rounded w-20"></div>
          </div>
          <div className="space-y-2">
            <div className="h-8 bg-muted rounded w-16"></div>
            <div className="h-3 bg-muted rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <div className="flex items-center space-x-3 mb-3">
        <Icon name={weather.icon} size={24} color="var(--color-primary)" />
        <h3 className="font-heading font-semibold text-text-primary">{t.weather}</h3>
      </div>

      <div className="space-y-3">
        {/* Temperature */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-text-primary">
            {weather.temperature}°C
          </span>
          <span className="text-sm text-text-secondary">
            {t.feelsLike} {weather.feelsLike}°C
          </span>
        </div>

        {/* Condition */}
        <p className="text-text-secondary text-sm">{weather.condition}</p>

        {/* Weather Details */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <Icon name="Droplets" size={14} className="mx-auto mb-1 text-text-secondary" />
            <p className="text-text-secondary">{t.humidity}</p>
            <p className="font-medium text-text-primary">{weather.humidity}%</p>
          </div>
          <div className="text-center">
            <Icon name="Wind" size={14} className="mx-auto mb-1 text-text-secondary" />
            <p className="text-text-secondary">{t.wind}</p>
            <p className="font-medium text-text-primary">{weather.windSpeed} km/h</p>
          </div>
          <div className="text-center">
            <Icon name="Eye" size={14} className="mx-auto mb-1 text-text-secondary" />
            <p className="text-text-secondary">{t.visibility}</p>
            <p className="font-medium text-text-primary">{weather.visibility} km</p>
          </div>
        </div>

        {/* Recommendation */}
        <div className={`rounded-lg p-3 ${getRecommendationColor(weather.recommendation)}`}>
          <p className="text-sm font-medium">
            {getRecommendationText(weather.recommendation)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;