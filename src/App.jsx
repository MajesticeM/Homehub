import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PropertyCard from './components/PropertyCard';
import PropertyDetailModal from './components/PropertyDetailModal';
import SellerChatModal from './components/SellerChatModal';
// import MaintenanceHub from './components/MaintenanceHub';
import AboutUsPage from './components/AboutUsPage';
import AuthPage from './components/AuthPage';
import HousingAdvicePage from './components/HousingAdvicePage';
// import MortgageCalculatorModal from './components/MortgageCalculatorModal';
import WishlistDrawer from './components/WishlistDrawer';
import ToastContainer from './components/Toast';
import AgentAuthPage from './components/AgentAuthPage';
import AgentDashboardApp from './agent-dashboard/App';
import QuickFilterBar from './components/QuickFilterBar';
import AdvancedFiltersModal from './components/AdvancedFiltersModal';
import MapExplorerModal from './components/MapExplorerModal';
import PropertyMapView from './components/PropertyMapView';

import { PROPERTIES, CITIES } from './data/propertiesData';
import { initialApplications, initialLeads, initialNotifications } from './data/mockData';
import { sound } from './utils/sound';
import {
  ArrowUpDown,
  Building2,
  Sparkles,
  Bed,
  Bath,
  SlidersHorizontal,
  MapPin,
  Dog,
  Waves,
  RotateCcw,
  X
} from 'lucide-react';

export default function App() {
  // Current Authenticated User (saved in localStorage)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('habitat_current_user_sa_v1');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Navigation Page: 'explore' (Customer Facing Portal default) | 'agent-dashboard' | 'about' | 'signin' | 'signup'
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'agent' || params.get('agent') === 'true' || window.location.hash === '#agent-dashboard' || window.location.hash === '#agent') {
        return 'agent-dashboard';
      }
      if (params.get('page') === 'signin' || window.location.hash === '#signin') {
        return 'signin';
      }
      if (params.get('page') === 'signup' || window.location.hash === '#signup') {
        return 'signup';
      }
    }
    return 'explore';
  });

  // Applications State (Connected between customer portal and agent dashboard)
  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem('habitat_applications_sa_v1');
      return saved ? JSON.parse(saved) : initialApplications;
    } catch {
      return initialApplications;
    }
  });
  const [agentProfile, setAgentProfile] = useState(() => getActiveAgent());

  // Properties State (Rooms & Houses to Rent / Buy)
  const [properties, setProperties] = useState(() => {
    try {
      const saved = localStorage.getItem('apartments_properties_sa_v3');
      return saved ? JSON.parse(saved) : PROPERTIES;
    } catch {
      return PROPERTIES;
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('apartments_favorites_sa_v2');
      return saved ? JSON.parse(saved) : ['p2', 'p5', 'p1'];
    } catch {
      return ['p2', 'p5', 'p1'];
    }
  });

  // Discovery Mode: 'rent' | 'buy' (defaults to 'rent')
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('apartments_mode_v2') || 'rent';
  });

  // Filter State: Multiple locations at the same time + single search
  const [selectedLocations, setSelectedLocations] = useState(['Tembisa']);
  const [searchLocation, setSearchLocation] = useState('');
  const [nearMeOnly, setNearMeOnly] = useState(false);
  const [selectedType, setSelectedType] = useState('All Types');
  const [minBeds, setMinBeds] = useState(0);
  const [selectedBaths, setSelectedBaths] = useState(0);
  const [petFriendlyOnly, setPetFriendlyOnly] = useState(false);
  const [poolOnly, setPoolOnly] = useState(false);
  const [prepaidOnly, setPrepaidOnly] = useState(false);
  const [solarOnly, setSolarOnly] = useState(false);
  const [parkingOnly, setParkingOnly] = useState(false);
  const [securityOnly, setSecurityOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Modal States
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // Personalized Budget & Affordability Profile
  const [affordabilityProfile, setAffordabilityProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('apartments_affordability_profile_v2');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(mode === 'buy' ? 4000000 : 25000);

  // Modals & Chat Overlays
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [chatProperty, setChatProperty] = useState(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMortgageModalOpen, setIsMortgageModalOpen] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);

  // Toast System
  const [toasts, setToasts] = useState([]);
  const addToast = (msg, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, msg, type }]);
    if (!soundMuted) {
      if (type === 'success') sound.play('success');
      else if (type === 'alert') sound.play('alert');
      else sound.play('toggle');
    }
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  useEffect(() => {
    localStorage.setItem('apartments_properties_sa_v3', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('apartments_favorites_sa_v2', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('apartments_mode_v2', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('habitat_active_view', currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (!agentProfile && currentPage === 'agent-dashboard') {
      setCurrentPage('agent-auth');
    }
  }, [agentProfile, currentPage]);

  useEffect(() => {
    if (agentProfile && currentPage === 'agent-auth') {
      setCurrentPage('agent-dashboard');
    }
  }, [agentProfile, currentPage]);

  useEffect(() => {
    if (affordabilityProfile) {
      localStorage.setItem('apartments_affordability_profile_v2', JSON.stringify(affordabilityProfile));
    }
  }, [affordabilityProfile]);

  const handleToggleFavorite = (propId) => {
    setFavorites((prev) => {
      const exists = prev.includes(propId);
      if (exists) {
        sound.play('click');
        addToast('Removed from saved homes', 'info');
        return prev.filter((id) => id !== propId);
      } else {
        sound.play('success');
        addToast('Added to saved wishlist! ❤️', 'success');
        return [...prev, propId];
      }
    });
  };

  const handleAgentLogin = ({ email, password }) => {
    const result = loginAgent({ email, password });
    if (result.ok) {
      setAgentProfile(result.agent);
      setCurrentPage('agent-dashboard');
    }
    return result;
  };

  const handleAgentRegister = (payload) => {
    const result = registerAgent(payload);
    if (result.ok) {
      setAgentProfile(result.agent);
      setCurrentPage('agent-dashboard');
    }
    return result;
  };

  const handleAgentLogout = () => {
    logoutAgent();
    setAgentProfile(null);
    setCurrentPage('explore');
  };

  // Add review to a property's responsible agent
  const handleAddAgentReview = (propertyId, newReview) => {
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id !== propertyId) return p;
        const currentReviews = p.agent.reviews || [];
        const updatedReviews = [newReview, ...currentReviews];
        const newAvg = (
          updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
        ).toFixed(2);
        return {
          ...p,
          agent: {
            ...p.agent,
            reviews: updatedReviews,
            reviewsCount: updatedReviews.length,
            rating: parseFloat(newAvg)
          }
        };
      })
    );

    setSelectedProperty((prev) => {
      if (!prev || prev.id !== propertyId) return prev;
      const currentReviews = prev.agent.reviews || [];
      const updatedReviews = [newReview, ...currentReviews];
      const newAvg = (
        updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
      ).toFixed(2);
      return {
        ...prev,
        agent: {
          ...prev.agent,
          reviews: updatedReviews,
          reviewsCount: updatedReviews.length,
          rating: parseFloat(newAvg)
        }
      };
    });
  };

  // Connected Application Handler: Syncs customer online applications directly to Agent Dashboard pipeline
  const handleCustomerApplication = (newApp, prop) => {
    setApplications((prev) => [newApp, ...prev.filter((a) => a.id !== newApp.id)]);

    try {
      const existing = localStorage.getItem('habitat_applications_sa_v1');
      const parsed = existing ? JSON.parse(existing) : [];
      const updated = [newApp, ...parsed.filter((a) => a.id !== newApp.id)];
      localStorage.setItem('habitat_applications_sa_v1', JSON.stringify(updated));

      // Also create a lead record for the agent's CRM pipeline
      const leadsRaw = localStorage.getItem('habitat_leads_sa_v1');
      const parsedLeads = leadsRaw ? JSON.parse(leadsRaw) : [];
      const newLead = {
        id: `LEAD-${Math.floor(550 + Math.random() * 450)}`,
        tenantName: newApp.applicantName,
        phone: newApp.phone,
        email: newApp.email,
        propertyId: prop?.id || newApp.propertyId,
        propertyTitle: prop?.title || newApp.propertyTitle,
        budgetMonthly: prop?.priceMonthly || newApp.monthlyRent || 4500,
        source: 'Online Application Portal',
        dateAdded: new Date().toISOString().split('T')[0],
        status: 'Application in Progress',
        assignedAgentId: prop?.agent?.id || 'agent-1',
        assignedAgentName: prop?.agent?.name || 'Kgomotso Dlamini',
        notes: [
          {
            id: `n-${Date.now()}`,
            author: 'Online Portal',
            date: new Date().toISOString(),
            text: `Submitted rental application for ${newApp.propertyTitle}. Net income: R${newApp.statedIncome}. Target move-in: ${newApp.moveInDate}.`
          }
        ]
      };
      localStorage.setItem('habitat_leads_sa_v1', JSON.stringify([newLead, ...parsedLeads]));

      // Also add agent notification
      const notifsRaw = localStorage.getItem('habitat_notifications_sa_v1');
      const parsedNotifs = notifsRaw ? JSON.parse(notifsRaw) : [];
      const newNotif = {
        id: `notif-${Date.now()}`,
        title: 'New Online Rental Application! 📋',
        message: `${newApp.applicantName} applied for ${prop?.title || newApp.propertyTitle} (Rent: R${newApp.monthlyRent}/mo)`,
        timestamp: new Date().toISOString(),
        type: 'application',
        linkPage: 'applications',
        targetId: newApp.id,
        read: false
      };
      localStorage.setItem('habitat_notifications_sa_v1', JSON.stringify([newNotif, ...parsedNotifs]));

      // Live event dispatch
      window.dispatchEvent(new CustomEvent('habitat_application_submitted', { detail: newApp }));
    } catch (err) {
      console.error('Failed to sync application to storage:', err);
    }

    addToast(`🎉 Application for "${prop?.title || newApp.propertyTitle}" submitted and sent directly to the agent's dashboard!`, 'success');
  };

  const handleAuthSuccess = (user, isNew = false) => {
    try {
      localStorage.setItem('habitat_current_user_sa_v1', JSON.stringify(user));
    } catch (err) {
      console.error(err);
    }
    setCurrentUser(user);
    sound.play('success');
    addToast(isNew ? `Welcome to Apartments, @${user.username}! 🎉` : `Welcome back, @${user.username}! 👋`, 'success');
    setCurrentPage('explore');
  };

  const handleSignOut = () => {
    try {
      localStorage.removeItem('habitat_current_user_sa_v1');
    } catch (err) {
      console.error(err);
    }
    setCurrentUser(null);
    sound.play('click');
    addToast('You have signed out successfully.', 'info');
    if (currentPage === 'signin' || currentPage === 'signup') {
      setCurrentPage('explore');
    }
  };

  useEffect(() => {
    if (currentPage === 'signin') {
      window.history.replaceState(null, '', '#signin');
    } else if (currentPage === 'signup') {
      window.history.replaceState(null, '', '#signup');
    } else if (currentPage === 'about') {
      window.history.replaceState(null, '', '#about');
    } else if (currentPage === 'explore') {
      window.history.replaceState(null, '', '#');
    }
  }, [currentPage]);

  // Location matching helper supporting suburbs, landmarks, transport links and keywords
  const matchesLocationString = (property, locString) => {
    if (!locString || !locString.trim()) return true;
    if (locString.toLowerCase().includes('near me')) {
      return property.distanceKm <= 3.5;
    }
    const clean = locString
      .toLowerCase()
      .replace(/,?\s*gauteng/i, '')
      .replace(/,?\s*south africa/i, '')
      .trim();

    if (!clean) return true;

    const searchable = [
      property.location,
      property.neighborhood,
      property.address,
      property.title,
      property.description,
      ...(property.landmarks || []),
      property.proximity?.mall || '',
      property.proximity?.taxiRank || '',
      property.proximity?.hospital || '',
      property.proximity?.workOrSchool || ''
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    if (searchable.includes(clean)) return true;

    const words = clean.split(/[\s,]+/).filter((w) => w.length >= 3);
    if (words.length > 0) {
      return words.some((word) => searchable.includes(word));
    }
    return false;
  };

  // Filtered Properties
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        // 1. Multiple locations filter: if selectedLocations has items, property must match ANY of them
        if (selectedLocations && selectedLocations.length > 0) {
          const matchesAnySelected = selectedLocations.some((loc) => matchesLocationString(p, loc));
          if (!matchesAnySelected) return false;
        }

        // 2. Free-text search location if typed
        if (searchLocation && searchLocation.trim() !== '') {
          if (!matchesLocationString(p, searchLocation)) return false;
        }

        // 3. Near me filter
        if (nearMeOnly && p.distanceKm > 3.5) {
          return false;
        }

        // 4. Budget filter (with reasonable tolerance so homes within reach aren't hidden)
        const currentPrice = mode === 'buy' ? p.price : p.priceMonthly;
        if (minBudget && currentPrice < minBudget * 0.7) return false;
        if (maxBudget && currentPrice > maxBudget * 1.25) return false;

        // 5. Property Type
        if (
          selectedType &&
          selectedType !== 'All Types' &&
          selectedType !== 'All Property Types' &&
          p.type !== selectedType
        ) {
          return false;
        }

        // 6. Bedrooms:
        // When user selects 2 bedrooms (minBeds === 2), show properties with 2 bedrooms!
        // When user selects 1 bedroom (minBeds === 1), show properties with 1 bedroom.
        // When user selects 3+ bedrooms (minBeds === 3), show properties with >= 3 bedrooms.
        // When user selects 4+ bedrooms (minBeds === 4), show properties with >= 4 bedrooms.
        if (minBeds === 1 && p.beds !== 1) return false;
        if (minBeds === 2 && p.beds !== 2) return false;
        if (minBeds === 3 && p.beds < 3) return false;
        if (minBeds >= 4 && p.beds < 4) return false;

        // 7. Bathrooms:
        if (selectedBaths > 0 && p.baths < selectedBaths) {
          return false;
        }

        // 8. Pet friendly:
        if (petFriendlyOnly && !p.petFriendly) {
          return false;
        }

        // 9. Swimming Pool:
        if (poolOnly) {
          const hasPool =
            p.amenities?.some((a) => a.toLowerCase().includes('pool')) ||
            p.description?.toLowerCase().includes('pool');
          if (!hasPool) return false;
        }

        // 10. Prepaid Electricity:
        if (prepaidOnly && !p.prepaidElectricity) {
          return false;
        }

        // 11. Solar / Backup power:
        if (solarOnly) {
          const hasSolar =
            p.amenities?.some((a) => /solar|inverter|backup/i.test(a)) ||
            p.description?.toLowerCase().includes('solar') ||
            p.description?.toLowerCase().includes('inverter');
          if (!hasSolar) return false;
        }

        // 12. Parking:
        if (parkingOnly && (p.parking || 0) < 1 && (p.garage || 0) < 1) {
          return false;
        }

        // 13. Security:
        if (securityOnly) {
          const hasSecurity =
            p.amenities?.some((a) => /security|guard|gate|biometric|alarm|fence/i.test(a)) ||
            p.description?.toLowerCase().includes('security') ||
            p.description?.toLowerCase().includes('gate');
          if (!hasSecurity) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = mode === 'buy' ? a.price : a.priceMonthly;
        const priceB = mode === 'buy' ? b.price : b.priceMonthly;

        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [
    properties,
    mode,
    selectedLocations,
    searchLocation,
    nearMeOnly,
    minBudget,
    maxBudget,
    selectedType,
    minBeds,
    selectedBaths,
    petFriendlyOnly,
    poolOnly,
    prepaidOnly,
    solarOnly,
    parkingOnly,
    securityOnly,
    sortBy
  ]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedLocations && selectedLocations.length > 0) count += selectedLocations.length;
    if (searchLocation && searchLocation.trim() !== '') count++;
    if (nearMeOnly) count++;
    if (selectedType && selectedType !== 'All Types' && selectedType !== 'All Property Types') count++;
    if (minBeds > 0) count++;
    if (selectedBaths > 0) count++;
    if (petFriendlyOnly) count++;
    if (poolOnly) count++;
    if (prepaidOnly) count++;
    if (solarOnly) count++;
    if (parkingOnly) count++;
    if (securityOnly) count++;
    return count;
  }, [
    selectedLocations,
    searchLocation,
    nearMeOnly,
    selectedType,
    minBeds,
    selectedBaths,
    petFriendlyOnly,
    poolOnly,
    prepaidOnly,
    solarOnly,
    parkingOnly,
    securityOnly
  ]);

  const handleResetAllFilters = () => {
    setSelectedLocations([]);
    setSearchLocation('');
    setNearMeOnly(false);
    setSelectedType('All Types');
    setMinBeds(0);
    setSelectedBaths(0);
    setPetFriendlyOnly(false);
    setPoolOnly(false);
    setPrepaidOnly(false);
    setSolarOnly(false);
    setParkingOnly(false);
    setSecurityOnly(false);
    setMinBudget(0);
    setMaxBudget(mode === 'buy' ? 4000000 : 25000);
    setSortBy('featured');
    sound.play('toggle');
    addToast('All filters have been reset', 'info');
  };

  const recommendedBudgetRange = useMemo(() => {
    return {
      min: affordabilityProfile?.minBudget || minBudget,
      max: affordabilityProfile?.maxBudget || maxBudget
    };
  }, [affordabilityProfile, minBudget, maxBudget]);

  if (currentPage === 'agent-auth') {
    return (
      <div className="min-h-screen">
        <AgentAuthPage
          onBack={() => setCurrentPage('explore')}
          onLogin={handleAgentLogin}
          onRegister={handleAgentRegister}
        />
      </div>
    );
  }

  if (currentPage === 'agent-dashboard') {
    return (
      <div className="agent-dashboard-root min-h-screen">
        <ToastContainer toasts={toasts} />
        <AgentDashboardApp
          onSwitchToTenantView={() => {
            setCurrentPage('explore');
            window.history.replaceState(null, '', window.location.pathname);
          }}
          externalApplications={applications}
          onUpdateExternalApplications={setApplications}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-slate-900 selection:text-white">
      <ToastContainer toasts={toasts} />

      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        favoritesCount={favorites.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        soundMuted={soundMuted}
        setSoundMuted={setSoundMuted}
        addToast={addToast}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-20">
        
        {/* PAGE 1: SIGN IN */}
        {currentPage === 'signin' && (
          <AuthPage
            initialMode="signin"
            onAuthSuccess={handleAuthSuccess}
            onBackToExplore={() => setCurrentPage('explore')}
            addToast={addToast}
          />
        )}

        {/* PAGE 2: SIGN UP */}
        {currentPage === 'signup' && (
          <AuthPage
            initialMode="signup"
            onAuthSuccess={handleAuthSuccess}
            onBackToExplore={() => setCurrentPage('explore')}
            addToast={addToast}
          />
        )}

        {/* PAGE 3: ABOUT US */}
        {currentPage === 'about' && (
          <AboutUsPage
            onBack={() => setCurrentPage('explore')}
          />
        )}

        {/* PAGE 4: MAIN DISCOVERY (Exact Hero Look & Feel) */}
        {currentPage === 'explore' && (
          <div className="space-y-8">
            
            {/* The Exact Look & Feel Hero Component */}
            {/* The Exact Look & Feel Hero Component */}
            <HeroSection
              mode={mode}
              setMode={setMode}
              selectedLocations={selectedLocations}
              setSelectedLocations={setSelectedLocations}
              searchLocation={searchLocation}
              setSearchLocation={setSearchLocation}
              nearMeOnly={nearMeOnly}
              setNearMeOnly={setNearMeOnly}
              minBudget={minBudget}
              setMinBudget={setMinBudget}
              maxBudget={maxBudget}
              setMaxBudget={setMaxBudget}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              minBeds={minBeds}
              setMinBeds={setMinBeds}
              onSearchSubmit={() => {
                const el = document.getElementById('explore-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenAffordabilityModal={() => {}}
              onOpenMortgageModal={() => {}}
              setCurrentPage={setCurrentPage}
              addToast={addToast}
              affordabilityProfile={affordabilityProfile}
              setAffordabilityProfile={setAffordabilityProfile}
              filteredCount={filteredProperties.length}
            />

            {/* Properties List Section */}
            <section id="explore-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <span>
                      {selectedLocations && selectedLocations.length > 0
                        ? `Properties in ${selectedLocations.join(', ')}`
                        : searchLocation
                        ? `Properties in ${searchLocation}`
                        : 'Available Homes & Rooms'}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                      {filteredProperties.length} {mode === 'buy' ? 'For Sale' : 'To Rent'}
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                    Click any property to see the assigned agent, proximity to malls & taxi ranks, or apply directly online.
                  </p>
                </div>

                {/* Selected Location Tags */}
                {selectedLocations && selectedLocations.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-center">
                    <span className="text-[11px] font-bold text-slate-400">Areas:</span>
                    {selectedLocations.map((loc) => (
                      <span
                        key={loc}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-900 text-white shadow-2xs"
                      >
                        <span>{loc}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedLocations((prev) => prev.filter((l) => l !== loc));
                            sound.play('click');
                          }}
                          className="hover:text-red-300 cursor-pointer ml-0.5"
                          title={`Remove ${loc}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* THE UNIFIED FILTER BAR: ALL FILTERS LINED UP ON THAT LINE WHERE FEATURED FIRST IS */}
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-2.5 sm:p-3 flex flex-wrap items-center justify-between gap-2.5 sticky top-16 z-30 backdrop-blur-md bg-white/95">
                
                {/* Left Side: Filter Controls Lined Up */}
                <div className="flex flex-wrap items-center gap-2">
                  
                  {/* 1. Property Type Dropdown */}
                  <div className="relative">
                    <select
                      value={selectedType || 'All Types'}
                      onChange={(e) => {
                        setSelectedType(e.target.value);
                        sound.play('toggle');
                        addToast(`Filtered by ${e.target.value}`, 'info');
                      }}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 shadow-2xs cursor-pointer hover:border-slate-300 focus:outline-hidden"
                    >
                      <option value="All Types">All Property Types</option>
                      <option value="Room to Rent">Rooms to Rent</option>
                      <option value="Apartment">Apartments</option>
                      <option value="House">Houses</option>
                      <option value="Townhouse">Townhouses</option>
                    </select>
                  </div>

                  {/* 2. Bedrooms Filter (All Beds, 1 Bed, 2 Beds, 3+ Beds) */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/60">
                    <Bed className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
                    {[
                      { label: 'All Beds', value: 0 },
                      { label: '1 Bed', value: 1 },
                      { label: '2 Beds', value: 2 },
                      { label: '3+ Beds', value: 3 }
                    ].map((opt) => {
                      const isActive = minBeds === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setMinBeds(opt.value);
                            sound.play('toggle');
                            addToast(opt.value === 0 ? 'Showing all bedrooms' : `Filtered to ${opt.label}`, 'info');
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                            isActive
                              ? 'bg-slate-900 text-white shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* 3. Bathrooms Dropdown (Desktop) */}
                  <div className="hidden lg:flex items-center">
                    <select
                      value={selectedBaths}
                      onChange={(e) => {
                        setSelectedBaths(Number(e.target.value));
                        sound.play('toggle');
                      }}
                      className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 shadow-2xs cursor-pointer hover:border-slate-300 focus:outline-hidden"
                    >
                      <option value={0}>Any Baths</option>
                      <option value={1}>1+ Bath</option>
                      <option value={2}>2+ Baths</option>
                    </select>
                  </div>

                  {/* 4. Pet Friendly Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const next = !petFriendlyOnly;
                      setPetFriendlyOnly(next);
                      sound.play('toggle');
                      addToast(next ? 'Filtered to Pet-Friendly 🐾' : 'Pet filter cleared', 'info');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                      petFriendlyOnly
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                        : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 shadow-2xs'
                    }`}
                  >
                    <Dog className="w-3.5 h-3.5" />
                    <span>Pets</span>
                  </button>

                  {/* 5. Swimming Pool Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const next = !poolOnly;
                      setPoolOnly(next);
                      sound.play('toggle');
                      addToast(next ? 'Filtered to Swimming Pool 🏊' : 'Pool filter cleared', 'info');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                      poolOnly
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 shadow-2xs'
                    }`}
                  >
                    <Waves className="w-3.5 h-3.5" />
                    <span>Pool</span>
                  </button>

                  {/* 6. MORE FILTERS BUTTON (Placed right here on the line with Featured First!) */}
                  <button
                    type="button"
                    onClick={() => {
                      sound.play('click');
                      setIsFilterModalOpen(true);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                      activeFilterCount > 0
                        ? 'bg-slate-950 text-white border-slate-950 shadow-2xs'
                        : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 shadow-2xs'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>More Filters</span>
                    {activeFilterCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] flex items-center justify-center font-bold">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  {/* 7. Reset Filters Button */}
                  {activeFilterCount > 0 && (
                    <button
                      type="button"
                      onClick={handleResetAllFilters}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 transition flex items-center gap-1 cursor-pointer"
                      title="Reset all filters"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  )}

                </div>

                {/* Right Side: Map View & Sort Selector Lined Up Together */}
                <div className="flex items-center gap-2">
                  
                  {/* Map View Button (Commented out for now as requested) */}
                  {/*
                  <button
                    type="button"
                    onClick={() => {
                      sound.play('click');
                      setIsMapModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    title="Open Interactive Map"
                  >
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Map View</span>
                  </button>
                  */}

                  {/* Sort selector with "Featured First" */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-400 mr-0.5 flex items-center gap-1">
                      <ArrowUpDown className="w-3.5 h-3.5" />
                      Sort:
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value);
                        sound.play('click');
                      }}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 shadow-2xs cursor-pointer hover:border-slate-300 focus:outline-hidden"
                    >
                      <option value="featured">Featured First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>

                </div>

              </div>

              {/* Properties Grid */}
              {filteredProperties.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl p-8 space-y-3 border border-slate-200">
                  <Building2 className="w-10 h-10 text-slate-400 mx-auto" />
                  <h3 className="text-base font-bold text-slate-900">
                    No properties found matching this criteria
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try adjusting your bedrooms, location or expanding your budget range.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetAllFilters}
                    className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-slate-800 shadow-xs transition"
                  >
                    Reset Filters & View All
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      isFavorite={favorites.includes(property.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onSelectProperty={(prop) => setSelectedProperty(prop)}
                      recommendedBudget={recommendedBudgetRange}
                    />
                  ))}
                </div>
              )}

            </section>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-slate-50/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Apartments</span>
            <span>•</span>
            <span>Discover Homes, Rooms & Verified Hosts in Tembisa & Midrand</span>
          </div>
          <div className="flex items-center gap-3">
            <span>© 2026 Apartments Co. All rights reserved.</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setCurrentPage('agent-dashboard');
                sound.play('click');
              }}
              className="text-slate-400 hover:text-slate-700 underline text-[11px] cursor-pointer"
              title="Agent Portal (Management Access)"
            >
              Agent Portal
            </button>
          </div>
        </div>
      </footer>

      {/* MODAL 1: FULL PROPERTY DETAILS & DIRECT ONLINE APPLICATION */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          allProperties={properties}
          isFavorite={favorites.includes(selectedProperty.id)}
          onToggleFavorite={handleToggleFavorite}
          onOpenChatAgent={(prop) => setChatProperty(prop)}
          onSelectOtherProperty={(prop) => setSelectedProperty(prop)}
          onClose={() => setSelectedProperty(null)}
          onAddAgentReview={handleAddAgentReview}
          onApplyProperty={handleCustomerApplication}
          affordabilityProfile={affordabilityProfile}
          addToast={addToast}
        />
      )}

      {/* MODAL 2: IN-APP LIVE CHAT WITH RESPONSIBLE AGENT */}
      {chatProperty && (
        <SellerChatModal
          property={chatProperty}
          onClose={() => setChatProperty(null)}
          addToast={addToast}
        />
      )}

      {/* MODAL 3: MORTGAGE / BOND & AFFORDABILITY CALCULATOR (COMMENTED OUT AS REQUESTED) */}
      {/*
      {isMortgageModalOpen && (
        <MortgageCalculatorModal
          isOpen={isMortgageModalOpen}
          onClose={() => setIsMortgageModalOpen(false)}
          defaultPrice={1200000}
        />
      )}
      */}

      {/* MODAL 4: WISHLIST DRAWER */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        favorites={favorites}
        properties={properties}
        mode={mode}
        onToggleFavorite={handleToggleFavorite}
        onSelectProperty={(prop) => {
          setIsWishlistOpen(false);
          setSelectedProperty(prop);
        }}
      />

      {/* MODAL 5: ADVANCED FILTERS MODAL */}
      <AdvancedFiltersModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        mode={mode}
        minBeds={minBeds}
        setMinBeds={setMinBeds}
        selectedBaths={selectedBaths}
        setSelectedBaths={setSelectedBaths}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        petFriendlyOnly={petFriendlyOnly}
        setPetFriendlyOnly={setPetFriendlyOnly}
        poolOnly={poolOnly}
        setPoolOnly={setPoolOnly}
        prepaidOnly={prepaidOnly}
        setPrepaidOnly={setPrepaidOnly}
        solarOnly={solarOnly}
        setSolarOnly={setSolarOnly}
        parkingOnly={parkingOnly}
        setParkingOnly={setParkingOnly}
        securityOnly={securityOnly}
        setSecurityOnly={setSecurityOnly}
        minBudget={minBudget}
        setMinBudget={setMinBudget}
        maxBudget={maxBudget}
        setMaxBudget={setMaxBudget}
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        matchingCount={filteredProperties.length}
        onOpenMap={() => {
          setIsFilterModalOpen(false);
          setIsMapModalOpen(true);
        }}
        onResetFilters={handleResetAllFilters}
        addToast={addToast}
      />

      {/* MODAL 6: INTERACTIVE MAP EXPLORER MODAL (Commented out for now as requested) */}
      {/*
      <MapExplorerModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        properties={filteredProperties}
        selectedProperty={selectedProperty}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        mode={mode}
        addToast={addToast}
      />
      */}

    </div>
  );
}
