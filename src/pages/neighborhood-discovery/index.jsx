import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import NeighborCard from './components/NeighborCard';
import FilterPanel from './components/FilterPanel';
import MapView from './components/MapView';
import SearchBar from './components/SearchBar';
import ViewToggle from './components/ViewToggle';
import SkeletonCard from './components/SkeletonCard';

const NeighborhoodDiscovery = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentView, setCurrentView] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [neighbors, setNeighbors] = useState([]);
  const [filteredNeighbors, setFilteredNeighbors] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [dailyDiscoveryCount, setDailyDiscoveryCount] = useState(0);
  const [matchStreak, setMatchStreak] = useState(3);

  const location = useLocation();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    distance: 5,
    ageMin: 18,
    ageMax: 65,
    interests: [],
    availability: [],
    lifestyle: []
  });

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
      title: 'Discover Neighbors',
      subtitle: 'Find compatible neighbors in your area',
      filters: 'Filters',
      search: 'Search',
      noResults: 'No neighbors found',
      noResultsDesc: 'Try adjusting your filters or search criteria',
      loadMore: 'Load More',
      dailyLimit: 'Daily Discovery Limit',
      matchStreak: 'Match Streak',
      days: 'days',
      viewsLeft: 'views left today',
      refreshTomorrow: 'Refresh tomorrow for more discoveries',
      locationError: 'Location access required',
      enableLocation: 'Enable Location',
      compatibilityMatch: 'compatibility match',
      away: 'away',
      online: 'Online now',
      recentlyActive: 'Recently active'
    },
    es: {
      title: 'Descubrir Vecinos',
      subtitle: 'Encuentra vecinos compatibles en tu área',
      filters: 'Filtros',
      search: 'Buscar',
      noResults: 'No se encontraron vecinos',
      noResultsDesc: 'Intenta ajustar tus filtros o criterios de búsqueda',
      loadMore: 'Cargar Más',
      dailyLimit: 'Límite Diario de Descubrimiento',
      matchStreak: 'Racha de Coincidencias',
      days: 'días',
      viewsLeft: 'vistas restantes hoy',
      refreshTomorrow: 'Actualiza mañana para más descubrimientos',
      locationError: 'Se requiere acceso a la ubicación',
      enableLocation: 'Habilitar Ubicación',
      compatibilityMatch: 'coincidencia de compatibilidad',
      away: 'de distancia',
      online: 'En línea ahora',
      recentlyActive: 'Recientemente activo'
    },
    fr: {
      title: 'Découvrir les Voisins',
      subtitle: 'Trouvez des voisins compatibles dans votre région',
      filters: 'Filtres',
      search: 'Rechercher',
      noResults: 'Aucun voisin trouvé',
      noResultsDesc: 'Essayez d\'ajuster vos filtres ou critères de recherche',
      loadMore: 'Charger Plus',
      dailyLimit: 'Limite Quotidienne de Découverte',
      matchStreak: 'Série de Correspondances',
      days: 'jours',
      viewsLeft: 'vues restantes aujourd\'hui',
      refreshTomorrow: 'Actualisez demain pour plus de découvertes',
      locationError: 'Accès à la localisation requis',
      enableLocation: 'Activer la Localisation',
      compatibilityMatch: 'correspondance de compatibilité',
      away: 'de distance',
      online: 'En ligne maintenant',
      recentlyActive: 'Récemment actif'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  // Mock neighbor data
  const mockNeighbors = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 28,
      distance: "0.3 km",
      compatibilityScore: 92,
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      interests: ["Fitness", "Yoga", "Coffee", "Reading"],
      isOnline: true,
      lastSeenMinutes: 0,
      bio: `Yoga instructor and coffee enthusiast looking for workout partners and book club members. Love morning runs and weekend farmers markets.`
    },
    {
      id: 2,
      name: "Michael Chen",
      age: 34,
      distance: "0.7 km",
      compatibilityScore: 87,
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      interests: ["Photography", "Hiking", "Cooking", "Tech"],
      isOnline: false,
      lastSeenMinutes: 45,
      bio: `Software engineer and weekend photographer. Always up for hiking adventures and trying new restaurants in the neighborhood.`
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      age: 31,
      distance: "1.2 km",
      compatibilityScore: 84,
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      interests: ["Art", "Music", "Gardening", "Wine"],
      isOnline: false,
      lastSeenMinutes: 120,
      bio: `Artist and music lover with a passion for community gardening. Host monthly wine and paint nights for neighbors.`
    },
    {
      id: 4,
      name: "David Thompson",
      age: 29,
      distance: "0.9 km",
      compatibilityScore: 81,
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      interests: ["Running", "Dogs", "BBQ", "Sports"],
      isOnline: true,
      lastSeenMinutes: 0,
      bio: `Marathon runner and dog dad looking for running buddies and fellow pet owners. Love hosting backyard BBQs.`
    },
    {
      id: 5,
      name: "Lisa Park",
      age: 26,
      distance: "1.5 km",
      compatibilityScore: 79,
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      interests: ["Dance", "Fashion", "Travel", "Food"],
      isOnline: false,
      lastSeenMinutes: 30,
      bio: `Dance instructor and fashion blogger. Love exploring new cuisines and planning weekend getaways with friends.`
    },
    {
      id: 6,
      name: "James Wilson",
      age: 35,
      distance: "2.1 km",
      compatibilityScore: 76,
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      interests: ["Cycling", "Beer", "Gaming", "Movies"],
      isOnline: false,
      lastSeenMinutes: 180,
      bio: `Cycling enthusiast and craft beer lover. Enjoy weekend bike rides and movie nights with neighbors.`
    }
  ];

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setNeighbors(mockNeighbors);
        setFilteredNeighbors(mockNeighbors);
        setIsLoading(false);
        setDailyDiscoveryCount(15); // Mock daily count
      }, 1500);
    };

    initializeData();
  }, []);

  // Handle search from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get('search');
    const focusParam = urlParams.get('focus');
    
    if (searchParam) {
      setSearchQuery(searchParam);
      handleSearch(searchParam);
    }
    
    if (focusParam === 'search') {
      // Focus search would be handled by SearchBar component
    }
  }, [location.search]);

  // Filter neighbors based on search and filters
  useEffect(() => {
    let filtered = [...neighbors];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(neighbor =>
        neighbor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        neighbor.interests.some(interest =>
          interest.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        neighbor.bio.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply distance filter
    filtered = filtered.filter(neighbor => {
      const distance = parseFloat(neighbor.distance.replace(' km', ''));
      return distance <= filters.distance;
    });

    // Apply age filter
    filtered = filtered.filter(neighbor =>
      neighbor.age >= filters.ageMin && neighbor.age <= filters.ageMax
    );

    // Apply interests filter
    if (filters.interests.length > 0) {
      filtered = filtered.filter(neighbor =>
        filters.interests.some(interest =>
          neighbor.interests.some(neighborInterest =>
            neighborInterest.toLowerCase().includes(interest.toLowerCase())
          )
        )
      );
    }

    setFilteredNeighbors(filtered);
  }, [neighbors, searchQuery, filters]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      navigate(`/neighborhood-discovery?search=${encodeURIComponent(query)}`);
    } else {
      navigate('/neighborhood-discovery');
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleLike = (neighborId) => {
    console.log('Liked neighbor:', neighborId);
    // In real app, this would send like to backend
    setDailyDiscoveryCount(prev => Math.max(0, prev - 1));
  };

  const handlePass = (neighborId) => {
    console.log('Passed on neighbor:', neighborId);
    // In real app, this would send pass to backend
    setFilteredNeighbors(prev => prev.filter(n => n.id !== neighborId));
  };

  const handleNeighborSelect = (neighbor) => {
    navigate('/profile-detail-view', { state: { neighborId: neighbor.id } });
  };

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    // Simulate loading more data
    setTimeout(() => {
      // In real app, this would fetch more neighbors
      setLoadingMore(false);
      setHasMore(false); // No more data for demo
    }, 1000);
  };

  const handleEnableLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Location error:', error);
          // Use default location for demo
          setUserLocation({ lat: 40.7128, lng: -74.0060 });
        }
      );
    }
  };

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      >= document.documentElement.offsetHeight - 1000
    ) {
      handleLoadMore();
    }
  }, [loadingMore, hasMore]);

  useEffect(() => {
    if (currentView === 'grid') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, currentView]);

  const renderGridView = () => (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <SearchBar
          onSearch={handleSearch}
          currentLanguage={currentLanguage}
          initialQuery={searchQuery}
        />
      </div>

      {/* Gamification Stats */}
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <div className="bg-surface rounded-lg p-4 text-center shadow-elevation-1">
          <div className="text-2xl font-bold text-primary mb-1">
            {dailyDiscoveryCount}
          </div>
          <div className="text-sm text-text-secondary">
            {t.viewsLeft}
          </div>
        </div>
        <div className="bg-surface rounded-lg p-4 text-center shadow-elevation-1">
          <div className="text-2xl font-bold text-success mb-1">
            {matchStreak}
          </div>
          <div className="text-sm text-text-secondary">
            {t.matchStreak} {t.days}
          </div>
        </div>
      </div>

      {/* Neighbors Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : filteredNeighbors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNeighbors.map((neighbor) => (
            <NeighborCard
              key={neighbor.id}
              neighbor={neighbor}
              onLike={handleLike}
              onPass={handlePass}
              currentLanguage={currentLanguage}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="mx-auto text-text-secondary mb-4" />
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
            {t.noResults}
          </h3>
          <p className="text-text-secondary mb-4">
            {t.noResultsDesc}
          </p>
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(true)}
            iconName="Filter"
          >
            {t.filters}
          </Button>
        </div>
      )}

      {/* Load More */}
      {!isLoading && filteredNeighbors.length > 0 && hasMore && (
        <div className="text-center py-6">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={loadingMore}
            iconName={loadingMore ? "Loader2" : "ChevronDown"}
            className={loadingMore ? "animate-spin" : ""}
          >
            {loadingMore ? 'Loading...' : t.loadMore}
          </Button>
        </div>
      )}

      {/* Daily Limit Reached */}
      {dailyDiscoveryCount === 0 && (
        <div className="bg-warning/10 border border-warning/20 rounded-xl p-6 text-center">
          <Icon name="Clock" size={32} className="mx-auto text-warning mb-3" />
          <h3 className="font-heading font-semibold text-text-primary mb-2">
            {t.dailyLimit}
          </h3>
          <p className="text-text-secondary">
            {t.refreshTomorrow}
          </p>
        </div>
      )}
    </div>
  );

  const renderMapView = () => (
    <div className="h-[calc(100vh-200px)] min-h-[500px]">
      <MapView
        neighbors={filteredNeighbors}
        onNeighborSelect={handleNeighborSelect}
        currentLanguage={currentLanguage}
        userLocation={userLocation}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      
      <main className="pt-32 md:pt-40 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-2">
                  {t.title}
                </h1>
                <p className="text-text-secondary">
                  {t.subtitle}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <ViewToggle
                  currentView={currentView}
                  onViewChange={setCurrentView}
                  currentLanguage={currentLanguage}
                />
                <Button
                  variant="outline"
                  onClick={() => setIsFilterOpen(true)}
                  iconName="Filter"
                  className="md:hidden"
                >
                  {t.filters}
                </Button>
              </div>
            </div>
          </div>

          {/* Location Permission Check */}
          {!userLocation && (
            <div className="bg-info/10 border border-info/20 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={20} className="text-info" />
                  <span className="text-text-primary">{t.locationError}</span>
                </div>
                <Button
                  variant="info"
                  onClick={handleEnableLocation}
                  className="text-sm"
                >
                  {t.enableLocation}
                </Button>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex gap-6">
            {/* Desktop Filter Sidebar */}
            <div className="hidden md:block w-80 flex-shrink-0">
              <div className="sticky top-40">
                <FilterPanel
                  isOpen={true}
                  onClose={() => {}}
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  currentLanguage={currentLanguage}
                />
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              {currentView === 'grid' ? renderGridView() : renderMapView()}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default NeighborhoodDiscovery;