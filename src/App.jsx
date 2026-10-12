import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PropertyCard from './components/PropertyCard';
import PropertyDetailModal from './components/PropertyDetailModal';
import SellerChatModal from './components/SellerChatModal';
import MaintenanceHub from './components/MaintenanceHub';
import AboutUsPage from './components/AboutUsPage';
import MortgageCalculatorModal from './components/MortgageCalculatorModal';
import WishlistDrawer from './components/WishlistDrawer';
import ToastContainer from './components/Toast';

import { PROPERTIES, CITIES } from './data/propertiesData';
import { sound } from './utils/sound';
import { ArrowUpDown, Building2, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation Page: 'explore' | 'maintenance' | 'about'
  const [currentPage, setCurrentPage] = useState('explore');

  // Properties State (Rooms & Houses to Rent / Buy)
  const [properties, setProperties] = useState(() => {
    try {
      const saved = localStorage.getItem('apartments_properties_sa_v2');
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

  // Discovery Mode: 'rent' | 'buy' (defaults to 'rent' as requested)
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('apartments_mode_v2') || 'rent';
  });

  // Filter State
  const [searchLocation, setSearchLocation] = useState('Tembisa');
  const [nearMeOnly, setNearMeOnly] = useState(false);
  const [selectedType, setSelectedType] = useState('All Types');
  const [minBeds, setMinBeds] = useState(0);
  const [sortBy, setSortBy] = useState('featured');

  // Personalized Budget & Affordability Profile
  const [affordabilityProfile, setAffordabilityProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('apartments_affordability_profile_v2');
      return saved
        ? JSON.parse(saved)
        : { income: 15000, expenses: 7000, minBudget: 2200, maxBudget: 6500, target: 4500, active: true };
    } catch {
      return { income: 15000, expenses: 7000, minBudget: 2200, maxBudget: 6500, target: 4500, active: true };
    }
  });

  const [minBudget, setMinBudget] = useState(mode === 'buy' ? 500000 : 2000);
  const [maxBudget, setMaxBudget] = useState(mode === 'buy' ? 2500000 : 7500);

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
    localStorage.setItem('apartments_properties_sa_v2', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('apartments_favorites_sa_v2', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('apartments_mode_v2', mode);
  }, [mode]);

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

  // Filtered Properties
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        // Location Match (matches city, neighborhood, address, title, or landmarks)
        if (searchLocation && searchLocation.trim() !== '') {
          const terms = searchLocation
            .toLowerCase()
            .split(',')
            .map((s) => s.trim())
            .filter((s) => s.length > 0 && s !== 'gauteng' && s !== 'south africa');

          const primaryTerm = terms[0] || searchLocation.toLowerCase().trim();

          const matchLoc =
            terms.some((term) =>
              p.location.toLowerCase().includes(term) ||
              p.neighborhood.toLowerCase().includes(term) ||
              p.address.toLowerCase().includes(term) ||
              p.title.toLowerCase().includes(term) ||
              (p.proximity?.mall && p.proximity.mall.toLowerCase().includes(term)) ||
              (p.proximity?.taxiRank && p.proximity.taxiRank.toLowerCase().includes(term)) ||
              (p.landmarks && p.landmarks.some((l) => l.toLowerCase().includes(term)))
            ) ||
            p.location.toLowerCase().includes(primaryTerm) ||
            p.neighborhood.toLowerCase().includes(primaryTerm) ||
            p.address.toLowerCase().includes(primaryTerm) ||
            p.title.toLowerCase().includes(primaryTerm);

          if (!matchLoc) return false;
        }

        if (nearMeOnly && p.distanceKm > 3.5) {
          return false;
        }

        const currentPrice = mode === 'buy' ? p.price : p.priceMonthly;
        if (minBudget && currentPrice < minBudget) return false;
        if (maxBudget && currentPrice > maxBudget) return false;

        if (selectedType !== 'All Types' && p.type !== selectedType) {
          return false;
        }

        if (minBeds > 0 && p.beds < minBeds) {
          return false;
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
  }, [properties, mode, searchLocation, nearMeOnly, minBudget, maxBudget, selectedType, minBeds, sortBy]);

  const recommendedBudgetRange = useMemo(() => {
    return {
      min: affordabilityProfile?.minBudget || minBudget,
      max: affordabilityProfile?.maxBudget || maxBudget
    };
  }, [affordabilityProfile, minBudget, maxBudget]);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-slate-900 selection:text-white">
      <ToastContainer toasts={toasts} />

      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        favoritesCount={favorites.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenMortgageModal={() => setIsMortgageModalOpen(true)}
        soundMuted={soundMuted}
        setSoundMuted={setSoundMuted}
        addToast={addToast}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-20">
        
        {/* PAGE 1: HOME MAINTENANCE SERVICES & QUOTES */}
        {currentPage === 'maintenance' && (
          <MaintenanceHub
            onSelectProvider={() => {}}
            onOpenQuoteChat={() => {}}
            addToast={addToast}
          />
        )}

        {/* PAGE 2: ABOUT US */}
        {currentPage === 'about' && (
          <AboutUsPage
            onBack={() => setCurrentPage('explore')}
          />
        )}

        {/* PAGE 3: MAIN DISCOVERY (Exact Hero Look & Feel Requested) */}
        {currentPage === 'explore' && (
          <div className="space-y-8">
            
            {/* The Exact Look & Feel Hero Component */}
            <HeroSection
              mode={mode}
              setMode={setMode}
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
              onOpenAffordabilityModal={() => setIsMortgageModalOpen(true)}
              onOpenMortgageModal={() => setIsMortgageModalOpen(true)}
              setCurrentPage={setCurrentPage}
              addToast={addToast}
              affordabilityProfile={affordabilityProfile}
              setAffordabilityProfile={setAffordabilityProfile}
              filteredCount={filteredProperties.length}
            />

            {/* Properties List Section */}
            <section id="explore-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <span>
                      {searchLocation ? `Properties in ${searchLocation}` : 'Available Homes & Rooms'}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                      {filteredProperties.length} {mode === 'buy' ? 'For Sale' : 'To Rent'}
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                    Click any property to see the assigned agent, proximity to malls & taxi ranks, and start a chat or WhatsApp.
                  </p>
                </div>

                {/* Sort selector */}
                <div className="flex items-center gap-1.5 self-start sm:self-center">
                  <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
                    <ArrowUpDown className="w-3.5 h-3.5" />
                    Sort:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      sound.play('click');
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 shadow-2xs cursor-pointer focus:outline-hidden"
                  >
                    <option value="featured">Featured First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
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
                    Try adjusting your location or expanding your budget range.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchLocation('Tembisa');
                      setSelectedType('All Types');
                      setMinBudget(0);
                      setMaxBudget(mode === 'buy' ? 4000000 : 20000);
                      sound.play('click');
                    }}
                    className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
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
                      onChatAgent={(prop) => setChatProperty(prop)}
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
          <div>Proximity to Malls & Taxi Ranks, In-App Chat & WhatsApp Direct</div>
          <div>© 2026 Apartments Co. All rights reserved.</div>
        </div>
      </footer>

      {/* MODAL 1: FULL PROPERTY DETAILS & RESPONSIBLE AGENT WITH WHATSAPP/CHAT */}
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

      {/* MODAL 3: MORTGAGE / BOND & AFFORDABILITY CALCULATOR */}
      {isMortgageModalOpen && (
        <MortgageCalculatorModal
          isOpen={isMortgageModalOpen}
          onClose={() => setIsMortgageModalOpen(false)}
          defaultPrice={1200000}
        />
      )}

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

    </div>
  );
}
