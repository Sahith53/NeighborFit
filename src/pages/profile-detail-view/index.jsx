import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProfilePhotoCarousel from './components/ProfilePhotoCarousel';
import BasicInfoSection from './components/BasicInfoSection';
import CompatibilityScore from './components/CompatibilityScore';
import InterestsSection from './components/InterestsSection';
import AvailabilityCalendar from './components/AvailabilityCalendar';
import ActionButtons from './components/ActionButtons';
import MessagingPreview from './components/MessagingPreview';

const ProfileDetailView = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const profileId = searchParams.get('id') || '1';

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  useEffect(() => {
    // Simulate loading profile data
    const loadProfile = async () => {
      setIsLoading(true);
      
      // Mock profile data
      const mockProfile = {
        id: profileId,
        name: "Sarah Johnson",
        age: 32,
        distance: "0.3 miles",
        walkingTime: "6 min",
        drivingTime: "2 min",
        profession: "Marketing Manager",
        familyStatus: "Single, no kids",
        joinedDate: "March 2024",
        mutualFriends: 2,
        mutualGroups: ["Riverside Runners", "Book Club"],
        isVerified: true,
        photos: [
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face"
        ],
        compatibilityScore: 85,
        compatibilityReasons: [
          {
            type: "interests",
            description: "You both enjoy running, yoga, and outdoor activities"
          },
          {
            type: "schedule",
            description: "Similar availability for morning and evening activities"
          },
          {
            type: "social",
            description: "Both prefer small group activities and one-on-one meetups"
          }
        ],
        interests: [
          {
            name: "Fitness",
            items: [
              { name: "Running", shared: true },
              { name: "Yoga", shared: true },
              { name: "Hiking", shared: false },
              { name: "Swimming", shared: true },
              { name: "Cycling", shared: false }
            ]
          },
          {
            name: "Hobbies",
            items: [
              { name: "Reading", shared: true },
              { name: "Cooking", shared: false },
              { name: "Photography", shared: true },
              { name: "Gardening", shared: false }
            ]
          },
          {
            name: "Food",
            items: [
              { name: "Coffee", shared: true },
              { name: "Healthy Eating", shared: true },
              { name: "Vegetarian", shared: false }
            ]
          }
        ],
        availability: [
          { day: "monday", timeSlots: ["morning", "evening"] },
          { day: "tuesday", timeSlots: ["evening"] },
          { day: "wednesday", timeSlots: ["morning", "afternoon", "evening"] },
          { day: "thursday", timeSlots: ["evening"] },
          { day: "friday", timeSlots: ["afternoon", "evening"] },
          { day: "saturday", timeSlots: ["morning", "afternoon"] },
          { day: "sunday", timeSlots: ["morning"] }
        ],
        previousMessages: [
          {
            content: "Hi! I saw we both love running. Would you like to join me for a morning jog sometime?",
            isFromUser: true,
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
          },
          {
            content: "That sounds great! I usually run around Riverside Park. What\'s your usual route?",
            isFromUser: false,
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000)
          },
          {
            content: "Perfect! I run there too. How about we meet at the main entrance tomorrow at 7 AM?",
            isFromUser: true,
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
          }
        ]
      };

      setTimeout(() => {
        setProfile(mockProfile);
        setIsLoading(false);
      }, 1000);
    };

    loadProfile();
  }, [profileId]);

  const translations = {
    en: {
      loading: 'Loading profile...',
      profileNotFound: 'Profile not found',
      goBack: 'Go Back',
      about: 'About'
    },
    es: {
      loading: 'Cargando perfil...',
      profileNotFound: 'Perfil no encontrado',
      goBack: 'Volver',
      about: 'Acerca de'
    },
    fr: {
      loading: 'Chargement du profil...',
      profileNotFound: 'Profil introuvable',
      goBack: 'Retour',
      about: 'À propos'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const handleConnect = async (profileId) => {
    // Mock connection logic
    console.log('Connecting with profile:', profileId);
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handlePass = (profileId) => {
    console.log('Passing on profile:', profileId);
  };

  const handleReport = (profileId, reason) => {
    console.log('Reporting profile:', profileId, 'Reason:', reason);
  };

  const handleBack = () => {
    navigate('/neighborhood-discovery');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <TabNavigation />
        <div className="pt-32 md:pt-40 pb-20 md:pb-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-text-secondary">{t.loading}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <TabNavigation />
        <div className="pt-32 md:pt-40 pb-20 md:pb-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center py-20">
              <Icon name="UserX" size={64} className="text-text-secondary mx-auto mb-4" />
              <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">
                {t.profileNotFound}
              </h2>
              <Button variant="primary" onClick={handleBack}>
                {t.goBack}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      
      <div className="pt-32 md:pt-40 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              iconName="ArrowLeft"
              iconPosition="left"
              className="text-text-secondary hover:text-primary"
            >
              {t.goBack}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Photos */}
              <ProfilePhotoCarousel
                photos={profile.photos}
                userName={profile.name}
                isVerified={profile.isVerified}
              />

              {/* Profile Name */}
              <div className="bg-surface p-6 rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-heading font-bold text-text-primary">
                    {profile.name}
                  </h1>
                  {profile.isVerified && (
                    <Icon name="CheckCircle" size={24} className="text-success" />
                  )}
                </div>
              </div>

              {/* Basic Information */}
              <BasicInfoSection profile={profile} />

              {/* Interests */}
              <InterestsSection interests={profile.interests} />

              {/* Availability */}
              <AvailabilityCalendar availability={profile.availability} />

              {/* Messaging Preview */}
              <MessagingPreview
                messages={profile.previousMessages}
                profileName={profile.name}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Compatibility Score */}
              <CompatibilityScore
                score={profile.compatibilityScore}
                reasons={profile.compatibilityReasons}
              />

              {/* Desktop Action Buttons */}
              <div className="hidden lg:block">
                <ActionButtons
                  profileId={profile.id}
                  onConnect={handleConnect}
                  onPass={handlePass}
                  onReport={handleReport}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Action Buttons */}
      <div className="lg:hidden">
        <ActionButtons
          profileId={profile.id}
          onConnect={handleConnect}
          onPass={handlePass}
          onReport={handleReport}
        />
      </div>
    </div>
  );
};

export default ProfileDetailView;