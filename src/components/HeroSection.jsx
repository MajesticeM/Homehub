import React from 'react';
import { ShieldCheck, Zap, MessageCircle } from 'lucide-react';
import SmartHeroFinder from './SmartHeroFinder';

export default function HeroSection({
  mode,
  setMode,
  selectedLocations,
  setSelectedLocations,
  searchLocation,
  setSearchLocation,
  nearMeOnly,
  setNearMeOnly,
  minBudget,
  setMinBudget,
  maxBudget,
  setMaxBudget,
  selectedType,
  setSelectedType,
  minBeds,
  setMinBeds,
  onSearchSubmit,
  onOpenAffordabilityModal,
  onOpenMortgageModal,
  setCurrentPage,
  addToast,
  affordabilityProfile,
  setAffordabilityProfile,
  filteredCount
}) {
  const handleScrollToExplore = () => {
    const el = document.getElementById('explore-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-4">
      {/* Hero Outer Rounded Container */}
      <div className="relative rounded-[2rem] hero-gradient overflow-hidden p-4 sm:p-6 lg:p-6 border border-slate-200/60 shadow-sm">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Clean Brand & Value Props (5 Cols) */}
          <div className="lg:col-span-5 space-y-3.5 z-10">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-slate-200 text-[11px] font-bold text-slate-800 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Matched in under 2 minutes • 100% Verified Homes</span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Get the exact home you want <br />
              <span className="text-emerald-700">in just a few minutes.</span>
            </h1>

            {/* Clear Subtitle */}
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md">
              Stop wasting days scrolling through expired listings and waiting for unreturned calls. Instantly calculate your comfortable budget, pick your top areas across Tembisa and Midrand, and get connected to verified hosts in under 3 minutes.
            </p>

            {/* 3 Simple Value Props */}
            <div className="space-y-2 pt-0.5">
              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                <div className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shrink-0 shadow-2xs">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <span>Instant 2-minute budget & property match</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                <div className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shrink-0 shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>Direct contact with verified hosts & landlords (zero middlemen)</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                <div className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-amber-600 shrink-0 shadow-2xs">
                  <MessageCircle className="w-3.5 h-3.5" />
                </div>
                <span>Fast 60-second online application & same-day viewing booking</span>
              </div>
            </div>

          </div>

          {/* Right Side: Fast & Streamlined Interactive Search & Match Form (7 Cols) */}
          <div className="lg:col-span-7 relative flex justify-center w-full">
            <SmartHeroFinder
              mode={mode}
              setMode={setMode}
              selectedLocations={selectedLocations}
              setSelectedLocations={setSelectedLocations}
              searchLocation={searchLocation}
              setSearchLocation={setSearchLocation}
              nearMeOnly={nearMeOnly}
              setNearMeOnly={setNearMeOnly}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              affordabilityProfile={affordabilityProfile}
              setAffordabilityProfile={setAffordabilityProfile}
              minBudget={minBudget}
              setMinBudget={setMinBudget}
              maxBudget={maxBudget}
              setMaxBudget={setMaxBudget}
              filteredCount={filteredCount}
              onExploreClick={handleScrollToExplore}
              addToast={addToast}
            />
          </div>

        </div>

      </div>
    </div>
  );
}


