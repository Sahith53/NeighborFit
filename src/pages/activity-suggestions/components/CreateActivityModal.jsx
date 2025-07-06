import React, { useState, useEffect } from 'react';
import ModalOverlay from '../../../components/ui/ModalOverlay';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const CreateActivityModal = ({ isOpen, onClose, onCreateActivity, currentLanguage }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    location: '',
    maxParticipants: '',
    difficulty: 'easy',
    isOutdoor: false,
    requiresEquipment: false,
    cost: '',
    contactInfo: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const translations = {
    en: {
      createActivity: 'Create New Activity',
      title: 'Activity Title',
      titlePlaceholder: 'Enter activity title',
      description: 'Description',
      descriptionPlaceholder: 'Describe your activity...',
      category: 'Category',
      selectCategory: 'Select a category',
      date: 'Date',
      time: 'Time',
      location: 'Location',
      locationPlaceholder: 'Enter meeting location',
      maxParticipants: 'Max Participants',
      difficulty: 'Difficulty Level',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      isOutdoor: 'Outdoor Activity',
      requiresEquipment: 'Requires Equipment',
      cost: 'Cost (optional)',
      costPlaceholder: 'Enter cost if any',
      contactInfo: 'Contact Information',
      contactPlaceholder: 'How should people contact you?',
      cancel: 'Cancel',
      create: 'Create Activity',
      creating: 'Creating...',
      titleRequired: 'Title is required',
      descriptionRequired: 'Description is required',
      categoryRequired: 'Category is required',
      dateRequired: 'Date is required',
      timeRequired: 'Time is required',
      locationRequired: 'Location is required'
    },
    es: {
      createActivity: 'Crear Nueva Actividad',
      title: 'Título de la Actividad',
      titlePlaceholder: 'Ingresa el título de la actividad',
      description: 'Descripción',
      descriptionPlaceholder: 'Describe tu actividad...',
      category: 'Categoría',
      selectCategory: 'Selecciona una categoría',
      date: 'Fecha',
      time: 'Hora',
      location: 'Ubicación',
      locationPlaceholder: 'Ingresa el lugar de encuentro',
      maxParticipants: 'Máximo de Participantes',
      difficulty: 'Nivel de Dificultad',
      easy: 'Fácil',
      medium: 'Medio',
      hard: 'Difícil',
      isOutdoor: 'Actividad al Aire Libre',
      requiresEquipment: 'Requiere Equipo',
      cost: 'Costo (opcional)',
      costPlaceholder: 'Ingresa el costo si hay alguno',
      contactInfo: 'Información de Contacto',
      contactPlaceholder: '¿Cómo deberían contactarte?',
      cancel: 'Cancelar',
      create: 'Crear Actividad',
      creating: 'Creando...',
      titleRequired: 'El título es requerido',
      descriptionRequired: 'La descripción es requerida',
      categoryRequired: 'La categoría es requerida',
      dateRequired: 'La fecha es requerida',
      timeRequired: 'La hora es requerida',
      locationRequired: 'La ubicación es requerida'
    },
    fr: {
      createActivity: 'Créer une Nouvelle Activité',
      title: 'Titre de l\'Activité',
      titlePlaceholder: 'Entrez le titre de l\'activité',
      description: 'Description',
      descriptionPlaceholder: 'Décrivez votre activité...',
      category: 'Catégorie',
      selectCategory: 'Sélectionnez une catégorie',
      date: 'Date',
      time: 'Heure',
      location: 'Lieu',
      locationPlaceholder: 'Entrez le lieu de rencontre',
      maxParticipants: 'Participants Maximum',
      difficulty: 'Niveau de Difficulté',
      easy: 'Facile',
      medium: 'Moyen',
      hard: 'Difficile',
      isOutdoor: 'Activité Extérieure',
      requiresEquipment: 'Nécessite de l\'Équipement',
      cost: 'Coût (optionnel)',
      costPlaceholder: 'Entrez le coût s\'il y en a un',
      contactInfo: 'Informations de Contact',
      contactPlaceholder: 'Comment les gens devraient-ils vous contacter?',
      cancel: 'Annuler',
      create: 'Créer l\'Activité',
      creating: 'Création...',
      titleRequired: 'Le titre est requis',
      descriptionRequired: 'La description est requise',
      categoryRequired: 'La catégorie est requise',
      dateRequired: 'La date est requise',
      timeRequired: 'L\'heure est requise',
      locationRequired: 'Le lieu est requis'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const categories = [
    { value: 'fitness', label: t.fitness || 'Fitness' },
    { value: 'social', label: t.social || 'Social' },
    { value: 'family', label: t.family || 'Family' },
    { value: 'professional', label: t.professional || 'Professional' },
    { value: 'hobbies', label: t.hobbies || 'Hobbies' },
    { value: 'outdoor', label: t.outdoor || 'Outdoor' },
    { value: 'indoor', label: t.indoor || 'Indoor' },
    { value: 'food', label: t.food || 'Food & Dining' },
    { value: 'arts', label: t.arts || 'Arts & Culture' },
    { value: 'sports', label: t.sports || 'Sports' },
    { value: 'education', label: t.education || 'Education' }
  ];

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: '',
        description: '',
        category: '',
        date: '',
        time: '',
        location: '',
        maxParticipants: '',
        difficulty: 'easy',
        isOutdoor: false,
        requiresEquipment: false,
        cost: '',
        contactInfo: ''
      });
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = t.titleRequired;
    }
    if (!formData.description.trim()) {
      newErrors.description = t.descriptionRequired;
    }
    if (!formData.category) {
      newErrors.category = t.categoryRequired;
    }
    if (!formData.date) {
      newErrors.date = t.dateRequired;
    }
    if (!formData.time) {
      newErrors.time = t.timeRequired;
    }
    if (!formData.location.trim()) {
      newErrors.location = t.locationRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newActivity = {
        id: Date.now(),
        ...formData,
        dateTime: `${formData.date}T${formData.time}`,
        attendeeCount: 1,
        attendeeAvatars: ['https://randomuser.me/api/portraits/men/1.jpg'],
        mutualConnections: 0,
        userRsvpStatus: 'going',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        distance: '0.1 km'
      };

      onCreateActivity(newActivity);
      onClose();
    } catch (error) {
      console.error('Error creating activity:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalOverlay
      isOpen={isOpen}
      onClose={onClose}
      title={t.createActivity}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {t.title} *
          </label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder={t.titlePlaceholder}
            className={errors.title ? 'border-error' : ''}
          />
          {errors.title && (
            <p className="text-error text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {t.description} *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder={t.descriptionPlaceholder}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-smooth ${
              errors.description ? 'border-error' : 'border-border'
            }`}
          />
          {errors.description && (
            <p className="text-error text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {t.category} *
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-smooth ${
              errors.category ? 'border-error' : 'border-border'
            }`}
          >
            <option value="">{t.selectCategory}</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-error text-sm mt-1">{errors.category}</p>
          )}
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.date} *
            </label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className={errors.date ? 'border-error' : ''}
            />
            {errors.date && (
              <p className="text-error text-sm mt-1">{errors.date}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.time} *
            </label>
            <Input
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              className={errors.time ? 'border-error' : ''}
            />
            {errors.time && (
              <p className="text-error text-sm mt-1">{errors.time}</p>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {t.location} *
          </label>
          <Input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder={t.locationPlaceholder}
            className={errors.location ? 'border-error' : ''}
          />
          {errors.location && (
            <p className="text-error text-sm mt-1">{errors.location}</p>
          )}
        </div>

        {/* Max Participants and Difficulty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.maxParticipants}
            </label>
            <Input
              type="number"
              value={formData.maxParticipants}
              onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
              min="2"
              max="100"
              placeholder="10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.difficulty}
            </label>
            <select
              value={formData.difficulty}
              onChange={(e) => handleInputChange('difficulty', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            >
              <option value="easy">{t.easy}</option>
              <option value="medium">{t.medium}</option>
              <option value="hard">{t.hard}</option>
            </select>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isOutdoor}
              onChange={(e) => handleInputChange('isOutdoor', e.target.checked)}
              className="rounded border-border text-primary focus:ring-ring"
            />
            <span className="ml-2 text-sm text-text-primary">{t.isOutdoor}</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.requiresEquipment}
              onChange={(e) => handleInputChange('requiresEquipment', e.target.checked)}
              className="rounded border-border text-primary focus:ring-ring"
            />
            <span className="ml-2 text-sm text-text-primary">{t.requiresEquipment}</span>
          </label>
        </div>

        {/* Cost */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {t.cost}
          </label>
          <Input
            type="text"
            value={formData.cost}
            onChange={(e) => handleInputChange('cost', e.target.value)}
            placeholder={t.costPlaceholder}
          />
        </div>

        {/* Contact Info */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {t.contactInfo}
          </label>
          <Input
            type="text"
            value={formData.contactInfo}
            onChange={(e) => handleInputChange('contactInfo', e.target.value)}
            placeholder={t.contactPlaceholder}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            {t.cancel}
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {isSubmitting ? t.creating : t.create}
          </Button>
        </div>
      </form>
    </ModalOverlay>
  );
};

export default CreateActivityModal;