import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProfilePhotoUpload from './components/ProfilePhotoUpload';
import PersonalInfoSection from './components/PersonalInfoSection';
import LifestylePreferences from './components/LifestylePreferences';
import InterestsSection from './components/InterestsSection';
import AvailabilitySettings from './components/AvailabilitySettings';
import PrivacyControls from './components/PrivacyControls';
import ProgressIndicator from './components/ProgressIndicator';

const ProfileSetup = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    photo: null,
    firstName: '',
    lastName: '',
    age: '',
    occupation: '',
    bio: '',
    fitnessLevel: '',
    socialPreference: '',
    familyStatus: '',
    workSchedule: '',
    petOwner: '',
    interests: [],
    preferredDays: [],
    preferredTimes: [],
    privacy: {
      profileVisibility: 'everyone',
      locationSharing: 'approximate',
      contactInfo: 'visible',
      activityStatus: 'auto'
    }
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const navigate = useNavigate();

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
      profileSetup: 'Profile Setup',
      createProfile: 'Create Your Profile',
      subtitle: 'Help your neighbors get to know you better',
      saveAndContinue: 'Save & Continue',
      skipForNow: 'Skip for Now',
      previous: 'Previous',
      next: 'Next',
      completeProfile: 'Complete Profile',
      previewProfile: 'Preview Profile',
      editProfile: 'Edit Profile',
      profilePreview: 'Profile Preview',
      backToEdit: 'Back to Edit',
      profileComplete: 'Profile Complete!',
      startMatching: 'Start Finding Neighbors',
      requiredFields: 'Please fill in all required fields',
      profileSaved: 'Profile saved successfully!'
    },
    es: {
      profileSetup: 'Configuración del Perfil',
      createProfile: 'Crea Tu Perfil',
      subtitle: 'Ayuda a tus vecinos a conocerte mejor',
      saveAndContinue: 'Guardar y Continuar',
      skipForNow: 'Omitir por Ahora',
      previous: 'Anterior',
      next: 'Siguiente',
      completeProfile: 'Completar Perfil',
      previewProfile: 'Vista Previa del Perfil',
      editProfile: 'Editar Perfil',
      profilePreview: 'Vista Previa del Perfil',
      backToEdit: 'Volver a Editar',
      profileComplete: '¡Perfil Completo!',
      startMatching: 'Comenzar a Encontrar Vecinos',
      requiredFields: 'Por favor completa todos los campos requeridos',
      profileSaved: '¡Perfil guardado exitosamente!'
    },
    fr: {
      profileSetup: 'Configuration du Profil',
      createProfile: 'Créez Votre Profil',
      subtitle: 'Aidez vos voisins à mieux vous connaître',
      saveAndContinue: 'Enregistrer et Continuer',
      skipForNow: 'Ignorer pour Maintenant',
      previous: 'Précédent',
      next: 'Suivant',
      completeProfile: 'Compléter le Profil',
      previewProfile: 'Aperçu du Profil',
      editProfile: 'Modifier le Profil',
      profilePreview: 'Aperçu du Profil',
      backToEdit: 'Retour à l\'Édition',
      profileComplete: 'Profil Terminé!',
      startMatching: 'Commencer à Trouver des Voisins',
      requiredFields: 'Veuillez remplir tous les champs requis',
      profileSaved: 'Profil enregistré avec succès!'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const totalSteps = 6;
  const completedSections = getCompletedSections();

  function getCompletedSections() {
    const sections = [];
    if (formData.photo) sections.push('photo');
    if (formData.firstName && formData.lastName && formData.age) sections.push('personal');
    if (formData.fitnessLevel && formData.socialPreference) sections.push('lifestyle');
    if (formData.interests.length > 0) sections.push('interests');
    if (formData.preferredDays.length > 0 && formData.preferredTimes.length > 0) sections.push('availability');
    if (formData.privacy) sections.push('privacy');
    return sections;
  }

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0: // Photo
        return true; // Photo is optional
      case 1: // Personal Info
        return formData.firstName && formData.lastName && formData.age;
      case 2: // Lifestyle
        return formData.fitnessLevel && formData.socialPreference;
      case 3: // Interests
        return formData.interests.length > 0;
      case 4: // Availability
        return formData.preferredDays.length > 0 && formData.preferredTimes.length > 0;
      case 5: // Privacy
        return true; // Privacy has defaults
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsPreviewMode(true);
      }
    } else {
      alert(t.requiredFields);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/neighborhood-discovery');
    }
  };

  const handleCompleteProfile = () => {
    // Save profile data (in real app, this would be an API call)
    localStorage.setItem('userProfile', JSON.stringify(formData));
    navigate('/neighborhood-discovery');
  };

  const handleFormChange = (newData) => {
    setFormData(newData);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ProfilePhotoUpload
            currentLanguage={currentLanguage}
            onPhotoChange={(photo) => handleFormChange({ ...formData, photo })}
            initialPhoto={formData.photo}
          />
        );
      case 1:
        return (
          <PersonalInfoSection
            currentLanguage={currentLanguage}
            formData={formData}
            onFormChange={handleFormChange}
          />
        );
      case 2:
        return (
          <LifestylePreferences
            currentLanguage={currentLanguage}
            formData={formData}
            onFormChange={handleFormChange}
          />
        );
      case 3:
        return (
          <InterestsSection
            currentLanguage={currentLanguage}
            formData={formData}
            onFormChange={handleFormChange}
          />
        );
      case 4:
        return (
          <AvailabilitySettings
            currentLanguage={currentLanguage}
            formData={formData}
            onFormChange={handleFormChange}
          />
        );
      case 5:
        return (
          <PrivacyControls
            currentLanguage={currentLanguage}
            formData={formData}
            onFormChange={handleFormChange}
          />
        );
      default:
        return null;
    }
  };

  const renderProfilePreview = () => {
    return (
      <div className="bg-surface rounded-xl p-6 border border-border">
        <div className="text-center mb-6">
          <Icon name="CheckCircle" size={48} color="var(--color-success)" className="mx-auto mb-4" />
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
            {t.profileComplete}
          </h2>
          <p className="text-text-secondary">
            {t.subtitle}
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Photo */}
          {formData.photo && (
            <div className="text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary mx-auto">
                <img
                  src={formData.photo}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Personal Info */}
          <div className="text-center">
            <h3 className="text-xl font-heading font-semibold text-text-primary">
              {formData.firstName} {formData.lastName}
            </h3>
            {formData.age && (
              <p className="text-text-secondary">
                {formData.age} years old
              </p>
            )}
            {formData.occupation && (
              <p className="text-text-secondary">
                {formData.occupation}
              </p>
            )}
          </div>

          {/* Bio */}
          {formData.bio && (
            <div className="bg-muted rounded-lg p-4">
              <p className="text-text-primary text-sm">
                {formData.bio}
              </p>
            </div>
          )}

          {/* Interests */}
          {formData.interests.length > 0 && (
            <div>
              <h4 className="font-medium text-text-primary mb-2">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {formData.interests.slice(0, 6).map((interest) => (
                  <span
                    key={interest}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
                {formData.interests.length > 6 && (
                  <span className="text-text-secondary text-sm">
                    +{formData.interests.length - 6} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-3 mt-8">
          <Button
            variant="outline"
            onClick={() => setIsPreviewMode(false)}
            className="flex-1"
            iconName="Edit"
            iconPosition="left"
          >
            {t.backToEdit}
          </Button>
          <Button
            variant="primary"
            onClick={handleCompleteProfile}
            className="flex-1"
            iconName="Users"
            iconPosition="right"
          >
            {t.startMatching}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      
      <main className="pt-32 md:pt-40 pb-20 md:pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-2">
              {t.createProfile}
            </h1>
            <p className="text-text-secondary text-lg">
              {t.subtitle}
            </p>
          </div>

          {isPreviewMode ? (
            <div className="max-w-2xl mx-auto">
              {renderProfilePreview()}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Progress Sidebar - Desktop */}
              <div className="hidden lg:block">
                <div className="sticky top-40">
                  <ProgressIndicator
                    currentLanguage={currentLanguage}
                    currentStep={currentStep}
                    totalSteps={totalSteps}
                    completedSections={completedSections}
                  />
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="space-y-6">
                  {/* Progress Indicator - Mobile */}
                  <div className="lg:hidden">
                    <ProgressIndicator
                      currentLanguage={currentLanguage}
                      currentStep={currentStep}
                      totalSteps={totalSteps}
                      completedSections={completedSections}
                    />
                  </div>

                  {/* Current Step Content */}
                  {renderCurrentStep()}

                  {/* Navigation Buttons */}
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    {currentStep > 0 && (
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        iconName="ChevronLeft"
                        iconPosition="left"
                        className="sm:w-auto"
                      >
                        {t.previous}
                      </Button>
                    )}
                    
                    <div className="flex space-x-3 flex-1">
                      <Button
                        variant="ghost"
                        onClick={handleSkip}
                        className="flex-1 sm:flex-none"
                      >
                        {t.skipForNow}
                      </Button>
                      
                      <Button
                        variant="primary"
                        onClick={handleNext}
                        iconName={currentStep === totalSteps - 1 ? "Eye" : "ChevronRight"}
                        iconPosition="right"
                        className="flex-1"
                      >
                        {currentStep === totalSteps - 1 ? t.previewProfile : t.next}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfileSetup;