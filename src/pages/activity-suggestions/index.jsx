import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import ActivityCard from './components/ActivityCard';
import CategoryFilter from './components/CategoryFilter';
import CreateActivityModal from './components/CreateActivityModal';
import ActivityMapView from './components/ActivityMapView';
import WeatherWidget from './components/WeatherWidget';
import ActivityDetailModal from './components/ActivityDetailModal';

const ActivitySuggestions = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('date'); // 'date', 'distance', 'popularity'
  
  const location = useLocation();
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
      activitySuggestions: 'Activity Suggestions',
      currentNeighborhood: 'Downtown District',
      searchPlaceholder: 'Search activities...',
      suggestActivity: 'Suggest Activity',
      listView: 'List View',
      mapView: 'Map View',
      sortBy: 'Sort by',
      date: 'Date',
      distance: 'Distance',
      popularity: 'Popularity',
      noActivities: 'No activities found',
      noActivitiesDesc: 'Try adjusting your filters or create a new activity',
      createFirst: 'Create First Activity',
      loading: 'Loading activities...',
      filters: 'Filters',
      clearFilters: 'Clear Filters'
    },
    es: {
      activitySuggestions: 'Sugerencias de Actividades',
      currentNeighborhood: 'Distrito Centro',
      searchPlaceholder: 'Buscar actividades...',
      suggestActivity: 'Sugerir Actividad',
      listView: 'Vista de Lista',
      mapView: 'Vista de Mapa',
      sortBy: 'Ordenar por',
      date: 'Fecha',
      distance: 'Distancia',
      popularity: 'Popularidad',
      noActivities: 'No se encontraron actividades',
      noActivitiesDesc: 'Intenta ajustar tus filtros o crear una nueva actividad',
      createFirst: 'Crear Primera Actividad',
      loading: 'Cargando actividades...',
      filters: 'Filtros',
      clearFilters: 'Limpiar Filtros'
    },
    fr: {
      activitySuggestions: 'Suggestions d\'Activités',
      currentNeighborhood: 'District Centre-ville',
      searchPlaceholder: 'Rechercher des activités...',
      suggestActivity: 'Suggérer une Activité',
      listView: 'Vue Liste',
      mapView: 'Vue Carte',
      sortBy: 'Trier par',
      date: 'Date',
      distance: 'Distance',
      popularity: 'Popularité',
      noActivities: 'Aucune activité trouvée',
      noActivitiesDesc: 'Essayez d\'ajuster vos filtres ou créez une nouvelle activité',
      createFirst: 'Créer la Première Activité',
      loading: 'Chargement des activités...',
      filters: 'Filtres',
      clearFilters: 'Effacer les Filtres'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  // Mock activities data
  const mockActivities = [
    {
      id: 1,
      title: "Morning Yoga in Central Park",
      description: `Join us for a peaceful morning yoga session in the heart of Central Park. Perfect for all skill levels, we'll focus on gentle stretches and mindfulness.\n\nBring your own mat or rent one for $5. We'll meet at the Great Lawn and practice together as the sun rises over the city.`,
      category: "fitness",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      location: "Central Park, Great Lawn",
      distance: "0.8 km",
      difficulty: "easy",
      isOutdoor: true,
      requiresEquipment: true,
      cost: "Free",
      attendeeCount: 12,
      attendeeAvatars: [
        "https://randomuser.me/api/portraits/women/1.jpg",
        "https://randomuser.me/api/portraits/men/2.jpg",
        "https://randomuser.me/api/portraits/women/3.jpg"
      ],
      mutualConnections: 3,
      userRsvpStatus: null,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Neighborhood Book Club",
      description: `Monthly book club meeting where we discuss contemporary fiction and share recommendations. This month we're reading 'The Seven Husbands of Evelyn Hugo'.\n\nCoffee and light snacks provided. New members always welcome!`,
      category: "social",
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      location: "Corner Café, Main Street",
      distance: "1.2 km",
      difficulty: "easy",
      isOutdoor: false,
      requiresEquipment: false,
      cost: "Free",
      attendeeCount: 8,
      attendeeAvatars: [
        "https://randomuser.me/api/portraits/women/4.jpg",
        "https://randomuser.me/api/portraits/men/5.jpg",
        "https://randomuser.me/api/portraits/women/6.jpg"
      ],
      mutualConnections: 2,
      userRsvpStatus: "interested",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Family Picnic & Games",
      description: `Bring the whole family for an afternoon of fun activities, games, and good food. We'll have face painting, balloon animals, and organized games for kids of all ages.\n\nPotluck style - bring a dish to share. Drinks and paper goods provided.`,
      category: "family",
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
      location: "Riverside Park",
      distance: "2.1 km",
      difficulty: "easy",
      isOutdoor: true,
      requiresEquipment: false,
      cost: "Free",
      attendeeCount: 25,
      attendeeAvatars: [
        "https://randomuser.me/api/portraits/women/7.jpg",
        "https://randomuser.me/api/portraits/men/8.jpg",
        "https://randomuser.me/api/portraits/women/9.jpg"
      ],
      mutualConnections: 5,
      userRsvpStatus: "going",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Professional Networking Mixer",
      description: `Connect with local professionals over drinks and appetizers. Great opportunity to expand your network and learn about career opportunities in the area.\n\nBusiness casual attire. Bring business cards for networking.`,
      category: "professional",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
      location: "The Rooftop Bar, Downtown",
      distance: "1.5 km",
      difficulty: "easy",
      isOutdoor: false,
      requiresEquipment: false,
      cost: "$15",
      attendeeCount: 18,
      attendeeAvatars: [
        "https://randomuser.me/api/portraits/men/10.jpg",
        "https://randomuser.me/api/portraits/women/11.jpg",
        "https://randomuser.me/api/portraits/men/12.jpg"
      ],
      mutualConnections: 4,
      userRsvpStatus: "maybe",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Photography Walk",
      description: `Explore the neighborhood with fellow photography enthusiasts. We'll visit scenic spots and share tips on composition, lighting, and technique.\n\nBring your camera (phone cameras welcome too!). All skill levels encouraged to join.`,
      category: "hobbies",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
      location: "Historic District",
      distance: "0.9 km",
      difficulty: "medium",
      isOutdoor: true,
      requiresEquipment: true,
      cost: "Free",
      attendeeCount: 7,
      attendeeAvatars: [
        "https://randomuser.me/api/portraits/women/13.jpg",
        "https://randomuser.me/api/portraits/men/14.jpg",
        "https://randomuser.me/api/portraits/women/15.jpg"
      ],
      mutualConnections: 1,
      userRsvpStatus: null,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Community Garden Workday",
      description: `Help maintain our neighborhood community garden! We'll be planting seasonal vegetables, weeding, and general maintenance.\n\nGardening gloves and tools provided. Wear clothes you don't mind getting dirty.`,
      category: "outdoor",
      date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days from now
      location: "Community Garden, Oak Street",
      distance: "1.8 km",
      difficulty: "medium",
      isOutdoor: true,
      requiresEquipment: false,
      cost: "Free",
      attendeeCount: 15,
      attendeeAvatars: [
        "https://randomuser.me/api/portraits/men/16.jpg",
        "https://randomuser.me/api/portraits/women/17.jpg",
        "https://randomuser.me/api/portraits/men/18.jpg"
      ],
      mutualConnections: 2,
      userRsvpStatus: null,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop"
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setActivities(mockActivities);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...activities];

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(activity => 
        selectedCategories.includes(activity.category)
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(activity =>
        activity.title.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query) ||
        activity.location.toLowerCase().includes(query) ||
        activity.category.toLowerCase().includes(query)
      );
    }

    // Sort activities
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date) - new Date(b.date);
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'popularity':
          return b.attendeeCount - a.attendeeCount;
        default:
          return 0;
      }
    });

    setFilteredActivities(filtered);
  }, [activities, selectedCategories, searchQuery, sortBy]);

  const handleRSVP = (activityId, status) => {
    setActivities(prev => prev.map(activity => 
      activity.id === activityId 
        ? { ...activity, userRsvpStatus: status }
        : activity
    ));
  };

  const handleCreateActivity = (newActivity) => {
    setActivities(prev => [newActivity, ...prev]);
  };

  const handleViewDetails = (activity) => {
    setSelectedActivity(activity);
    setIsDetailModalOpen(true);
  };

  const handleMessage = (type) => {
    // Navigate to messaging or show message modal
    navigate('/neighborhood-discovery?tab=messages');
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSearchQuery('');
    setSortBy('date');
  };

  const hasActiveFilters = selectedCategories.length > 0 || searchQuery.trim() || sortBy !== 'date';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      
      <main className="pt-32 md:pt-40 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-primary">
                  {t.activitySuggestions}
                </h1>
                <div className="flex items-center text-text-secondary mt-1">
                  <Icon name="MapPin" size={16} />
                  <span className="ml-1 text-sm">{t.currentNeighborhood}</span>
                </div>
              </div>
              <Button
                variant="primary"
                onClick={() => setIsCreateModalOpen(true)}
                className="hidden md:flex"
              >
                <Icon name="Plus" size={16} />
                <span className="ml-2">{t.suggestActivity}</span>
              </Button>
            </div>

            {/* Mobile Create Button */}
            <div className="md:hidden mb-4">
              <Button
                variant="primary"
                onClick={() => setIsCreateModalOpen(true)}
                fullWidth
              >
                <Icon name="Plus" size={16} />
                <span className="ml-2">{t.suggestActivity}</span>
              </Button>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={20} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                  />
                  <Input
                    type="search"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* View Toggle and Sort */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center bg-muted rounded-lg p-1">
                  <Button
                    variant={viewMode === 'list' ? 'primary' : 'ghost'}
                    onClick={() => setViewMode('list')}
                    className="px-3 py-1 text-sm"
                  >
                    <Icon name="List" size={16} />
                    <span className="ml-1 hidden sm:inline">{t.listView}</span>
                  </Button>
                  <Button
                    variant={viewMode === 'map' ? 'primary' : 'ghost'}
                    onClick={() => setViewMode('map')}
                    className="px-3 py-1 text-sm"
                  >
                    <Icon name="Map" size={16} />
                    <span className="ml-1 hidden sm:inline">{t.mapView}</span>
                  </Button>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm bg-surface border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="date">{t.date}</option>
                  <option value="distance">{t.distance}</option>
                  <option value="popularity">{t.popularity}</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                <span className="text-sm text-text-secondary">
                  {filteredActivities.length} activities found
                </span>
                <Button
                  variant="link"
                  onClick={clearAllFilters}
                  className="text-sm p-0"
                >
                  {t.clearFilters}
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Weather Widget */}
              <WeatherWidget currentLanguage={currentLanguage} />

              {/* Filters - Desktop */}
              <div className="hidden lg:block">
                <h3 className="font-heading font-semibold text-text-primary mb-3">
                  {t.filters}
                </h3>
                <CategoryFilter
                  selectedCategories={selectedCategories}
                  onCategoryChange={setSelectedCategories}
                  currentLanguage={currentLanguage}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Mobile Filters */}
              <div className="lg:hidden mb-6">
                <CategoryFilter
                  selectedCategories={selectedCategories}
                  onCategoryChange={setSelectedCategories}
                  currentLanguage={currentLanguage}
                />
              </div>

              {/* Content Area */}
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-text-secondary">{t.loading}</p>
                  </div>
                </div>
              ) : viewMode === 'list' ? (
                filteredActivities.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredActivities.map((activity) => (
                      <ActivityCard
                        key={activity.id}
                        activity={activity}
                        onRSVP={handleRSVP}
                        onViewDetails={handleViewDetails}
                        currentLanguage={currentLanguage}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Calendar" size={48} className="mx-auto mb-4 text-text-secondary" />
                    <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                      {t.noActivities}
                    </h3>
                    <p className="text-text-secondary mb-6">
                      {t.noActivitiesDesc}
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => setIsCreateModalOpen(true)}
                    >
                      {t.createFirst}
                    </Button>
                  </div>
                )
              ) : (
                <div className="h-96 md:h-[600px] rounded-lg overflow-hidden">
                  <ActivityMapView
                    activities={filteredActivities}
                    onActivitySelect={handleViewDetails}
                    currentLanguage={currentLanguage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <CreateActivityModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateActivity={handleCreateActivity}
        currentLanguage={currentLanguage}
      />

      <ActivityDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        activity={selectedActivity}
        onRSVP={handleRSVP}
        onMessage={handleMessage}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default ActivitySuggestions;