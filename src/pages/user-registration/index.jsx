import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SocialRegistration from './components/SocialRegistration';
import RegistrationForm from './components/RegistrationForm';
import LocationPermission from './components/LocationPermission';
import TermsAndPrivacy from './components/TermsAndPrivacy';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const UserRegistration = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    basicInfo: null,
    location: null,
    termsAccepted: false
  });
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
      title: 'Join NeighborFit',
      subtitle: 'Connect with neighbors who share your lifestyle',
      step: 'Step',
      of: 'of',
      back: 'Back',
      alreadyHaveAccount: 'Already have an account?',
      signIn: 'Sign In',
      steps: {
        1: 'Create Account',
        2: 'Location Setup',
        3: 'Terms & Privacy'
      },
      heroTitle: 'Build Meaningful Connections in Your Neighborhood',
      heroSubtitle: 'Discover neighbors who share your interests, lifestyle, and values. Create lasting friendships right where you live.',
      features: [
        'Find compatible neighbors nearby',
        'Join local activities and events',
        'Build a stronger community',
        'Safe and secure platform'
      ]
    },
    es: {
      title: 'Únete a NeighborFit',
      subtitle: 'Conéctate con vecinos que comparten tu estilo de vida',
      step: 'Paso',
      of: 'de',
      back: 'Atrás',
      alreadyHaveAccount: '¿Ya tienes una cuenta?',
      signIn: 'Iniciar Sesión',
      steps: {
        1: 'Crear Cuenta',
        2: 'Configurar Ubicación',
        3: 'Términos y Privacidad'
      },
      heroTitle: 'Construye Conexiones Significativas en tu Vecindario',
      heroSubtitle: 'Descubre vecinos que comparten tus intereses, estilo de vida y valores. Crea amistades duraderas justo donde vives.',
      features: [
        'Encuentra vecinos compatibles cerca',
        'Únete a actividades y eventos locales',
        'Construye una comunidad más fuerte',
        'Plataforma segura y protegida'
      ]
    },
    fr: {
      title: 'Rejoignez NeighborFit',
      subtitle: 'Connectez-vous avec des voisins qui partagent votre style de vie',
      step: 'Étape',
      of: 'de',
      back: 'Retour',
      alreadyHaveAccount: 'Vous avez déjà un compte?',
      signIn: 'Se Connecter',
      steps: {
        1: 'Créer un Compte',
        2: 'Configuration de Localisation',
        3: 'Conditions et Confidentialité'
      },
      heroTitle: 'Construisez des Connexions Significatives dans Votre Quartier',
      heroSubtitle: 'Découvrez des voisins qui partagent vos intérêts, votre style de vie et vos valeurs. Créez des amitiés durables là où vous vivez.',
      features: [
        'Trouvez des voisins compatibles à proximité',
        'Rejoignez des activités et événements locaux',
        'Construisez une communauté plus forte',
        'Plateforme sûre et sécurisée'
      ]
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const handleSocialRegistration = async (provider) => {
    setIsLoading(true);
    try {
      // Mock social registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockSocialData = {
        firstName: provider === 'google' ? 'John' : 'Jane',
        lastName: provider === 'google' ? 'Doe' : 'Smith',
        email: provider === 'google' ? 'john.doe@gmail.com' : 'jane.smith@facebook.com',
        provider: provider,
        socialId: `${provider}_${Date.now()}`
      };

      setRegistrationData(prev => ({
        ...prev,
        basicInfo: mockSocialData
      }));
      
      setCurrentStep(2);
    } catch (error) {
      console.error('Social registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmission = async (formData) => {
    setIsLoading(true);
    try {
      // Mock form validation and submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRegistrationData(prev => ({
        ...prev,
        basicInfo: formData
      }));
      
      setCurrentStep(2);
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationPermission = async (locationData) => {
    setIsLoading(true);
    try {
      // Mock location processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRegistrationData(prev => ({
        ...prev,
        location: locationData
      }));
      
      setCurrentStep(3);
    } catch (error) {
      console.error('Location permission failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualAddress = async (address) => {
    setIsLoading(true);
    try {
      // Mock address geocoding
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockLocationData = {
        address: address,
        latitude: 40.7128,
        longitude: -74.0060,
        neighborhood: 'Downtown',
        city: 'New York',
        state: 'NY',
        country: 'USA'
      };

      setRegistrationData(prev => ({
        ...prev,
        location: mockLocationData
      }));
      
      setCurrentStep(3);
    } catch (error) {
      console.error('Address processing failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTermsAcceptance = async (termsData) => {
    setIsLoading(true);
    try {
      // Mock final registration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const finalRegistrationData = {
        ...registrationData,
        termsAccepted: true,
        termsData: termsData,
        registrationDate: new Date().toISOString(),
        userId: `user_${Date.now()}`
      };

      // Store registration data (mock)
      localStorage.setItem('userRegistrationData', JSON.stringify(finalRegistrationData));
      localStorage.setItem('isAuthenticated', 'true');
      
      // Navigate to profile setup
      navigate('/profile-setup');
    } catch (error) {
      console.error('Registration completion failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <SocialRegistration onSocialRegister={handleSocialRegistration} />
            <RegistrationForm onSubmit={handleFormSubmission} isLoading={isLoading} />
          </div>
        );
      case 2:
        return (
          <LocationPermission
            onLocationPermission={handleLocationPermission}
            onManualAddress={handleManualAddress}
          />
        );
      case 3:
        return (
          <TermsAndPrivacy onAccept={handleTermsAcceptance} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Hero Content (Desktop) */}
            <div className="hidden lg:block space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-heading font-bold text-text-primary">
                  {t.heroTitle}
                </h1>
                <p className="text-lg text-text-secondary">
                  {t.heroSubtitle}
                </p>
              </div>

              <div className="space-y-4">
                {t.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center">
                      <Icon name="Check" size={14} color="var(--color-success)" />
                    </div>
                    <span className="text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="relative h-64 rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                  alt="Neighbors connecting in community"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column - Registration Form */}
            <div className="w-full max-w-md mx-auto lg:max-w-none">
              <div className="bg-surface rounded-xl shadow-elevation-3 p-6 lg:p-8">
                {/* Header */}
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
                    {t.title}
                  </h1>
                  <p className="text-text-secondary">
                    {t.subtitle}
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm text-text-secondary mb-2">
                    <span>{t.step} {currentStep} {t.of} 3</span>
                    <span>{t.steps[currentStep]}</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentStep / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Back Button */}
                {currentStep > 1 && (
                  <div className="mb-4">
                    <Button
                      variant="ghost"
                      onClick={handleBackStep}
                      iconName="ArrowLeft"
                      iconPosition="left"
                      className="text-sm"
                    >
                      {t.back}
                    </Button>
                  </div>
                )}

                {/* Step Content */}
                {renderStepContent()}

                {/* Sign In Link */}
                {currentStep === 1 && (
                  <div className="mt-6 text-center">
                    <p className="text-sm text-text-secondary">
                      {t.alreadyHaveAccount}{' '}
                      <button
                        onClick={() => navigate('/user-login')}
                        className="text-primary hover:underline font-medium"
                      >
                        {t.signIn}
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;