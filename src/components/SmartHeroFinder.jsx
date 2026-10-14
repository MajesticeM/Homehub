import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Minus,
  Plus,
  CheckCircle2,
  Search,
  LocateFixed,
  MapPin,
  X,
  Building2,
  Sparkles,
  ChevronDown,
  Check
} from 'lucide-react';
import { sound } from '../utils/sound';

export const POPULAR_LOCATIONS = [
  // Corporate Headquarters & Business Hubs
  {
    name: 'PwC Tower (Waterfall City)',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'PwC Tower, Waterfall City, Midrand',
    subtext: 'Iconic Waterfall City corporate skyscraper & offices',
    category: 'Corporate Office',
    iconType: 'office'
  },
  {
    name: 'Mall of Africa',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'Mall of Africa, Waterfall City, Midrand',
    subtext: 'Waterfall City commercial, retail & lifestyle hub',
    category: 'Shopping & Offices',
    iconType: 'mall'
  },
  {
    name: 'Deloitte Waterfall Campus',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'Deloitte, Waterfall City, Midrand',
    subtext: 'Deloitte Africa Headquarters, Waterfall City',
    category: 'Corporate Office',
    iconType: 'office'
  },
  {
    name: 'Vodacom Corporate Park',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'Vodacom Corporate Park, Midrand',
    subtext: 'Vodaworld & Vodacom Commercial Campus, Vorna Valley',
    category: 'Corporate Office',
    iconType: 'office'
  },
  {
    name: 'Gautrain Midrand Station',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'Gautrain Station, Midrand',
    subtext: 'Rapid train link to Sandton, Rosebank, OR Tambo & Pretoria',
    category: 'Transit Hub',
    iconType: 'transit'
  },
  {
    name: 'Netcare Waterfall City Hospital',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'Netcare Waterfall City Hospital, Midrand',
    subtext: 'Specialist medical & healthcare hospital precinct',
    category: 'Healthcare Hub',
    iconType: 'hospital'
  },

  // Suburbs & Neighborhoods
  {
    name: 'Carlswald',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'Carlswald, Midrand, Gauteng',
    subtext: 'Popular residential suburb in Midrand (6 mins to PwC)',
    category: 'Midrand Suburb',
    iconType: 'suburb'
  },
  {
    name: 'Waterfall City',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'Waterfall City, Midrand, Gauteng',
    subtext: 'Waterfall Precinct (Home of PwC Tower & Mall of Africa)',
    category: 'Midrand Precinct',
    iconType: 'suburb'
  },
  {
    name: 'Vorna Valley',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'Vorna Valley, Midrand, Gauteng',
    subtext: 'Minutes to PwC Tower, Mall of Africa & N1 Highway',
    category: 'Midrand Suburb',
    iconType: 'suburb'
  },
  {
    name: 'Noordwyk',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'Noordwyk, Midrand, Gauteng',
    subtext: 'Central family suburb in Midrand near Vodacom HQ',
    category: 'Midrand Suburb',
    iconType: 'suburb'
  },
  {
    name: 'Halfway House',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'Halfway House, Midrand, Gauteng',
    subtext: 'Central business & residential district near Gallagher',
    category: 'Midrand Suburb',
    iconType: 'suburb'
  },
  {
    name: 'Kyalami',
    city: 'Midrand',
    province: 'Gauteng',
    fullText: 'Kyalami, Midrand, Gauteng',
    subtext: 'Equestrian estates & high-end developments near N1',
    category: 'Midrand Suburb',
    iconType: 'suburb'
  },
  {
    name: 'Clayville East',
    city: 'Tembisa',
    province: 'Gauteng',
    fullText: 'Clayville East, Tembisa, Gauteng',
    subtext: 'Family houses & modern developments (12 mins to Midrand)',
    category: 'Tembisa Suburb',
    iconType: 'suburb'
  },
  {
    name: 'Winnie Mandela',
    city: 'Tembisa',
    province: 'Gauteng',
    fullText: 'Winnie Mandela, Tembisa, Gauteng',
    subtext: 'Affordable rooms to rent & bachelor units',
    category: 'Tembisa Suburb',
    iconType: 'suburb'
  },
  {
    name: 'Phomolong',
    city: 'Tembisa',
    province: 'Gauteng',
    fullText: 'Phomolong, Tembisa, Gauteng',
    subtext: 'Near Phomolong Train Station & Taxi Ranks',
    category: 'Tembisa Suburb',
    iconType: 'suburb'
  },
  {
    name: 'Birch Acres',
    city: 'Tembisa',
    province: 'Gauteng',
    fullText: 'Birch Acres, Tembisa, Gauteng',
    subtext: 'Quiet border suburb of Tembisa & Kempton Park',
    category: 'Tembisa Suburb',
    iconType: 'suburb'
  },
  {
    name: 'Tembisa Central',
    city: 'Tembisa',
    province: 'Gauteng',
    fullText: 'Tembisa, Gauteng',
    subtext: 'Main Tembisa Municipality & Transport Hub',
    category: 'Tembisa City',
    iconType: 'suburb'
  }
];

export default function SmartHeroFinder({
  mode,
  setMode,
  selectedLocations = [],
  setSelectedLocations,
  searchLocation,
  setSearchLocation,
  nearMeOnly,
  setNearMeOnly,
  selectedType,
  setSelectedType,
  affordabilityProfile,
  setAffordabilityProfile,
  minBudget,
  setMinBudget,
  maxBudget,
  setMaxBudget,
  filteredCount,
  onExploreClick,
  addToast
}) {
  const isBuy = mode === 'buy';
  const searchContainerRef = useRef(null);

  // Dropdown visibility & filtering state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState(searchLocation || '');

  // State for Rent (Initialized to 12500 and 7000 matching screenshot preview)
  const [takeHomePay, setTakeHomePay] = useState(affordabilityProfile?.income ?? 12500);
  const [otherExpenses, setOtherExpenses] = useState(affordabilityProfile?.expenses ?? 7000);

  // State for Buy
  const [targetPrice, setTargetPrice] = useState(1200000);
  const [deposit, setDeposit] = useState(100000);

  // Keep input value in sync if searchLocation changes externally
  useEffect(() => {
    if (searchLocation !== undefined) {
      setInputValue(searchLocation);
    }
  }, [searchLocation]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter autocomplete suggestions based on user typing
  const matchingLocations = POPULAR_LOCATIONS.filter((item) => {
    if (!inputValue || inputValue.trim() === '') return true;
    const q = inputValue.toLowerCase().trim();
    return (
      item.name.toLowerCase().includes(q) ||
      item.city.toLowerCase().includes(q) ||
      item.fullText.toLowerCase().includes(q) ||
      item.subtext.toLowerCase().includes(q)
    );
  });

  // Location Toggle Handler for Multi-location Selection (Limited to max 3)
  const handleToggleLocation = (locName) => {
    sound.play('toggle');
    if (!setSelectedLocations) return;

    if (selectedLocations.includes(locName)) {
      // Remove
      setSelectedLocations(selectedLocations.filter((l) => l !== locName));
      if (addToast) addToast(`Removed ${locName}`, 'info');
    } else {
      // Add with max 3 check
      if (selectedLocations.length >= 3) {
        sound.play('alert');
        if (addToast) addToast('You can select a maximum of 3 locations at a time 📍', 'alert');
        return;
      }
      setSelectedLocations([...selectedLocations, locName]);
      if (addToast) addToast(`Added ${locName} (${selectedLocations.length + 1}/3)`, 'success');
    }
    setInputValue('');
    if (setSearchLocation) setSearchLocation('');
    if (nearMeOnly && setNearMeOnly) setNearMeOnly(false);
  };

  const handleRemoveLocation = (locName) => {
    sound.play('click');
    if (setSelectedLocations) {
      setSelectedLocations(selectedLocations.filter((l) => l !== locName));
    }
  };

  const handleClearAllLocations = () => {
    sound.play('click');
    if (setSelectedLocations) setSelectedLocations([]);
    setInputValue('');
    if (setSearchLocation) setSearchLocation('');
    if (nearMeOnly && setNearMeOnly) setNearMeOnly(false);
  };

  // Dynamic input verification
  const hasLocationInput =
    (selectedLocations && selectedLocations.length > 0) ||
    Boolean(inputValue && inputValue.trim().length > 0) ||
    Boolean(nearMeOnly);

  const hasIncomeInput = takeHomePay !== '' && takeHomePay !== null && !isNaN(takeHomePay) && Number(takeHomePay) > 0;
  const hasExpensesInput = otherExpenses !== '' && otherExpenses !== null && !isNaN(otherExpenses) && Number(otherExpenses) >= 0;

  const hasTargetPriceInput = targetPrice !== '' && targetPrice !== null && !isNaN(targetPrice) && Number(targetPrice) > 0;
  const hasDepositInput = deposit !== '' && deposit !== null && !isNaN(deposit) && Number(deposit) >= 0;

  const isFormReady = isBuy
    ? (hasLocationInput && hasTargetPriceInput && hasDepositInput)
    : (hasLocationInput && hasIncomeInput && hasExpensesInput);

  // Auto-calculate Rent Comfort (yields R3,600 - R4,400 with R4,000 for R12,500/R7,000)
  const safeBasePercent = 0.29;
  const maxSafePercent = 0.35;
  const income = Math.max(0, Number(takeHomePay) || 0);
  const expenses = Math.max(0, Number(otherExpenses) || 0);
  const leftoverCash = Math.max(0, income - expenses);

  const calculatedMinRent = Math.max(
    1500,
    Math.round((income * safeBasePercent) / 100) * 100
  );

  const calculatedMaxRent = Math.max(
    calculatedMinRent + 800,
    Math.round(Math.min(income * maxSafePercent, leftoverCash * 0.75) / 100) * 100
  );

  const recommendedPoint = Math.round((calculatedMinRent + calculatedMaxRent) / 2 / 100) * 100;

  // Auto-calculate Mortgage Bond
  const tPrice = Number(targetPrice) || 0;
  const dep = Number(deposit) || 0;
  const loanAmount = Math.max(0, tPrice - dep);
  const monthlyRate = 0.1175 / 12;
  const nMonths = 240;
  const estMonthlyBond =
    loanAmount > 0
      ? Math.round(
          (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, nMonths))) /
            (Math.pow(1 + monthlyRate, nMonths) - 1)
        )
      : 0;

  // Sync affordability to parent
  useEffect(() => {
    if (!isBuy && hasIncomeInput && hasExpensesInput) {
      if (setAffordabilityProfile) {
        setAffordabilityProfile({
          income,
          expenses,
          minBudget: calculatedMinRent,
          maxBudget: calculatedMaxRent,
          recommended: recommendedPoint,
          calculatedAt: new Date().toISOString()
        });
      }
      if (setMinBudget) setMinBudget(calculatedMinRent);
      if (setMaxBudget) setMaxBudget(calculatedMaxRent);
    }
  }, [takeHomePay, otherExpenses, isBuy, hasIncomeInput, hasExpensesInput]);

  return (
    <div className="w-full max-w-xl rounded-3xl bg-white border border-slate-200/90 shadow-xl overflow-visible p-5 sm:p-6 space-y-4 transition-all relative">
      
      {/* 1. TOP GROUP: Mode Switcher Pill (Renting on left, Buy on right) */}
      <div className="flex justify-center">
        <div className="inline-flex p-0.5 rounded-full bg-slate-100 border border-slate-200 shadow-2xs">
          <button
            type="button"
            onClick={() => {
              setMode('rent');
              sound.play('toggle');
              if (addToast) addToast('Switched to Renting 🔑', 'info');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              mode === 'rent'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Renting
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('buy');
              sound.play('toggle');
              if (addToast) addToast('Switched to Buy 🏷️', 'info');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              mode === 'buy'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Buy
          </button>
        </div>
      </div>

      {/* 2. SEARCH BAR (Supports up to 3 Locations at the Same Time) */}
      <div ref={searchContainerRef} className="relative z-30">
        <div className={`flex flex-wrap items-center gap-1.5 p-2 rounded-2xl border transition shadow-2xs ${
          hasLocationInput
            ? 'bg-white border-slate-300 ring-2 ring-emerald-500/10'
            : 'bg-slate-50 border-slate-200 focus-within:bg-white focus-within:border-slate-800'
        }`}>
          <div className="flex-1 flex flex-wrap items-center gap-1.5 min-w-[200px] pl-1">
            <Search className={`w-4 h-4 mr-1 shrink-0 ${hasLocationInput ? 'text-emerald-600' : 'text-slate-400'}`} />

            {/* Selected Location Pills inside Search Bar */}
            {selectedLocations.map((loc) => (
              <span
                key={loc}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-900 text-white shadow-2xs shrink-0 animate-fade-in"
              >
                <span>{loc}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveLocation(loc);
                  }}
                  className="hover:text-red-300 cursor-pointer ml-0.5"
                  title={`Remove ${loc}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {/* Location Input for typing or adding more (Max 3) */}
            <input
              type="text"
              value={inputValue}
              onFocus={() => setIsDropdownOpen(true)}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (setSearchLocation) setSearchLocation(e.target.value);
                if (nearMeOnly && setNearMeOnly) setNearMeOnly(false);
                if (!isDropdownOpen) setIsDropdownOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && inputValue.trim()) {
                  e.preventDefault();
                  handleToggleLocation(inputValue.trim());
                }
              }}
              disabled={selectedLocations.length >= 3 && !inputValue}
              placeholder={
                selectedLocations.length >= 3
                  ? 'Max 3 locations selected (3/3)'
                  : selectedLocations.length === 0
                  ? 'Search suburb or place (up to 3)...'
                  : `Add area (${selectedLocations.length}/3)...`
              }
              className="flex-1 min-w-[120px] bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-medium truncate py-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            />

            {(selectedLocations.length > 0 || inputValue) && (
              <button
                type="button"
                onClick={handleClearAllLocations}
                className="p-1 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer shrink-0"
                title="Clear all locations"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Near me button */}
          <button
            type="button"
            onClick={() => {
              const nextState = !nearMeOnly;
              if (setNearMeOnly) setNearMeOnly(nextState);
              if (nextState) {
                if (setSelectedLocations) setSelectedLocations(['Near me (< 3.5 km)']);
                setInputValue('');
                setIsDropdownOpen(false);
                sound.play('success');
                if (addToast) addToast('📍 Showing properties near you (< 3.5 km)', 'success');
              } else {
                if (setSelectedLocations) setSelectedLocations([]);
              }
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0 cursor-pointer ${
              nearMeOnly
                ? 'bg-emerald-500 text-white shadow-2xs'
                : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'
            }`}
          >
            <LocateFixed className="w-3.5 h-3.5" />
            <span>Near me</span>
          </button>
        </div>

        {/* Autocomplete & Multi-Location Dropdown Popup */}
        {isDropdownOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200/90 shadow-2xl overflow-hidden animate-fade-in z-50 max-h-72 overflow-y-auto">
            
            <div className="p-2.5 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <span>Select Suburbs or Areas (Max 3)</span>
              <span className={`font-bold lowercase ${selectedLocations.length >= 3 ? 'text-amber-600' : 'text-emerald-700'}`}>
                {selectedLocations.length}/3 selected
              </span>
            </div>

            {/* Popular Quick Area Pills inside Dropdown */}
            <div className="p-2 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto bg-slate-50/40">
              <span className="text-[10px] font-bold text-slate-400 shrink-0">Quick:</span>
              {['Tembisa', 'Midrand', 'Waterfall City', 'Carlswald', 'Vorna Valley', 'Clayville', 'Phomolong', 'Noordwyk'].map((area) => {
                const isSelected = selectedLocations.includes(area);
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => handleToggleLocation(area)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-white hover:bg-slate-200 border border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{area}</span>
                    {isSelected && <Check className="w-2.5 h-2.5 text-emerald-400" />}
                  </button>
                );
              })}
            </div>

            {/* List of locations with Checkbox selection */}
            {matchingLocations.length > 0 ? (
              <div className="p-1 space-y-0.5">
                {matchingLocations.map((item, idx) => {
                  const isSelected = selectedLocations.includes(item.name);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleToggleLocation(item.name)}
                      className={`w-full px-3 py-2 rounded-xl text-left transition flex items-center justify-between group cursor-pointer border ${
                        isSelected
                          ? 'bg-slate-50 border-slate-300 font-bold'
                          : 'hover:bg-slate-50 border-transparent hover:border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition shrink-0 shadow-2xs ${
                          isSelected ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 truncate">
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{item.name}</span>
                            <span className="text-[10px] font-medium text-slate-500">
                              {item.city}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium leading-tight truncate">
                            {item.subtext}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {item.category}
                        </span>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isSelected ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-slate-500">
                <span>No exact matches for "{inputValue}". Press Enter to add as custom area.</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. PROPERTY TYPE DROPDOWN (Own Row Below Search Bar) */}
      <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl border border-slate-200 bg-white text-xs font-bold text-slate-800 shadow-2xs hover:border-slate-300 transition">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
          <select
            value={selectedType || 'All Types'}
            onChange={(e) => {
              if (setSelectedType) setSelectedType(e.target.value);
              sound.play('click');
              if (addToast) addToast(`Filtered to: ${e.target.value}`, 'info');
            }}
            className="w-full bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer text-xs sm:text-sm truncate"
          >
            <option value="All Types">All Property Types</option>
            <option value="Room to Rent">Rooms to Rent</option>
            <option value="Apartment">Apartments</option>
            <option value="House">Houses</option>
            <option value="Townhouse">Townhouses</option>
            <option value="Villa">Villas</option>
          </select>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 pointer-events-none" />
      </div>

      {/* 4. QUESTIONS GROUP: EXACT STACKED LAYOUT FROM SCREENSHOT */}
      {!isBuy ? (
        /* ================= RENTING EXPERIENCE ================= */
        <div className="space-y-3.5 animate-fade-in">
          
          {/* Question 1: Monthly Income */}
          <div className={`p-3.5 rounded-2xl border transition-all space-y-2.5 ${
            hasIncomeInput
              ? 'bg-slate-50/90 border-slate-300 ring-2 ring-emerald-500/10'
              : 'bg-slate-50/70 border-slate-200/60'
          }`}>
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-slate-900">
                1. How much do you take home each month?
              </label>
              {hasIncomeInput ? (
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  R{Number(takeHomePay).toLocaleString()}
                </span>
              ) : (
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                  Required
                </span>
              )}
            </div>

            {/* Stepper Buttons & Input */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const current = Number(takeHomePay) || 0;
                  setTakeHomePay(Math.max(2000, current - 500));
                  sound.play('toggle');
                }}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 active:scale-95 shadow-2xs transition shrink-0 cursor-pointer"
                title="Decrease"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold text-xs pointer-events-none">
                  R
                </span>
                <input
                  type="number"
                  value={takeHomePay}
                  onChange={(e) => setTakeHomePay(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="12500"
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-slate-200 font-mono font-bold text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-slate-800 shadow-2xs"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  const current = Number(takeHomePay) || 12000;
                  setTakeHomePay(current + 500);
                  sound.play('toggle');
                }}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 active:scale-95 shadow-2xs transition shrink-0 cursor-pointer"
                title="Increase"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider shrink-0">QUICK:</span>
              {[8000, 12000, 15000, 20000, 25000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setTakeHomePay(val);
                    sound.play('click');
                  }}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition whitespace-nowrap cursor-pointer ${
                    Number(takeHomePay) === val
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  R{(val / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Monthly Expenses */}
          <div className={`p-3.5 rounded-2xl border transition-all space-y-2.5 ${
            hasExpensesInput
              ? 'bg-slate-50/90 border-slate-300 ring-2 ring-emerald-500/10'
              : 'bg-slate-50/70 border-slate-200/60'
          }`}>
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-slate-900">
                2. About how much do you spend on other things?
              </label>
              {hasExpensesInput ? (
                <span className="text-xs font-mono font-bold text-slate-700 bg-slate-200/80 px-2.5 py-0.5 rounded-md border border-slate-300">
                  R{Number(otherExpenses).toLocaleString()}
                </span>
              ) : (
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                  Required
                </span>
              )}
            </div>

            {/* Stepper Buttons & Input */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const current = Number(otherExpenses) || 0;
                  setOtherExpenses(Math.max(0, current - 500));
                  sound.play('toggle');
                }}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 active:scale-95 shadow-2xs transition shrink-0 cursor-pointer"
                title="Decrease"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold text-xs pointer-events-none">
                  R
                </span>
                <input
                  type="number"
                  value={otherExpenses}
                  onChange={(e) => setOtherExpenses(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="7000"
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-slate-200 font-mono font-bold text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-slate-800 shadow-2xs"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  const current = Number(otherExpenses) || 6500;
                  setOtherExpenses(current + 500);
                  sound.play('toggle');
                }}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 active:scale-95 shadow-2xs transition shrink-0 cursor-pointer"
                title="Increase"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider shrink-0">QUICK:</span>
              {[3000, 5000, 7000, 10000, 14000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setOtherExpenses(val);
                    sound.play('click');
                  }}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition whitespace-nowrap cursor-pointer ${
                    Number(otherExpenses) === val
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  R{(val / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC RESULT CARD: YOUR COMFORTABLE HOME BUDGET */}
          {isFormReady ? (
            <div className="p-4 sm:p-5 rounded-2xl hero-gradient border border-slate-200 shadow-xs space-y-1.5 animate-fade-in">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                YOUR COMFORTABLE HOME BUDGET
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight leading-none">
                R{calculatedMinRent.toLocaleString()} – R{calculatedMaxRent.toLocaleString()}
                <span className="text-xs font-sans text-slate-600 font-normal ml-1.5">/month</span>
              </div>
              <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                We recommend staying around <strong className="text-slate-900 font-mono">R{recommendedPoint.toLocaleString()}</strong>, so you have room for your other expenses.
              </p>
            </div>
          ) : (
            <div className="p-3 rounded-2xl bg-slate-50/70 border border-dashed border-slate-200 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>
                {!hasLocationInput
                  ? 'Select location & 2 questions to reveal your budget.'
                  : !hasIncomeInput
                  ? 'Enter monthly take-home money.'
                  : 'Enter other monthly expenses.'}
              </span>
            </div>
          )}

        </div>
      ) : (
        /* ================= BUYING EXPERIENCE ================= */
        <div className="space-y-3.5 animate-fade-in">
          
          {/* Target Price */}
          <div className={`p-3.5 rounded-2xl border transition-all space-y-2.5 ${
            hasTargetPriceInput
              ? 'bg-slate-50/90 border-slate-300 ring-2 ring-indigo-500/10'
              : 'bg-slate-50/70 border-slate-200/60'
          }`}>
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-slate-900">
                1. Target property price
              </label>
              {hasTargetPriceInput ? (
                <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                  R{(Number(targetPrice) / 1000).toFixed(0)}k
                </span>
              ) : (
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                  Required
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const current = Number(targetPrice) || 500000;
                  setTargetPrice(Math.max(300000, current - 50000));
                  sound.play('toggle');
                }}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 active:scale-95 shadow-2xs transition shrink-0 cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold text-xs pointer-events-none">
                  R
                </span>
                <input
                  type="number"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="1200000"
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-slate-200 font-mono font-bold text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-slate-800 shadow-2xs"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  const current = Number(targetPrice) || 1150000;
                  setTargetPrice(current + 50000);
                  sound.play('toggle');
                }}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 active:scale-95 shadow-2xs transition shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pt-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider shrink-0">QUICK:</span>
              {[500000, 850000, 1200000, 1800000, 2500000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setTargetPrice(val);
                    sound.play('click');
                  }}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition whitespace-nowrap cursor-pointer ${
                    Number(targetPrice) === val
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  R{(val / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>

          {/* Cash Deposit */}
          <div className={`p-3.5 rounded-2xl border transition-all space-y-2.5 ${
            hasDepositInput
              ? 'bg-slate-50/90 border-slate-300 ring-2 ring-indigo-500/10'
              : 'bg-slate-50/70 border-slate-200/60'
          }`}>
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-slate-900">
                2. Cash deposit available
              </label>
              {hasDepositInput ? (
                <span className="text-xs font-mono font-bold text-slate-700 bg-slate-200/80 px-2.5 py-0.5 rounded-md border border-slate-300">
                  R{Number(deposit).toLocaleString()}
                </span>
              ) : (
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                  Required
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const current = Number(deposit) || 0;
                  setDeposit(Math.max(0, current - 25000));
                  sound.play('toggle');
                }}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 active:scale-95 shadow-2xs transition shrink-0 cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold text-xs pointer-events-none">
                  R
                </span>
                <input
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="100000"
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-slate-200 font-mono font-bold text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-slate-800 shadow-2xs"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  const current = Number(deposit) || 75000;
                  setDeposit(current + 25000);
                  sound.play('toggle');
                }}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 active:scale-95 shadow-2xs transition shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pt-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider shrink-0">QUICK:</span>
              {[0, 50000, 100000, 200000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setDeposit(val);
                    sound.play('click');
                  }}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition whitespace-nowrap cursor-pointer ${
                    Number(deposit) === val
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {val === 0 ? 'None' : `R${(val / 1000).toFixed(0)}k`}
                </button>
              ))}
            </div>
          </div>

          {/* Result Card */}
          {isFormReady ? (
            <div className="p-4 sm:p-5 rounded-2xl hero-gradient border border-slate-200 shadow-xs space-y-1.5 animate-fade-in">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Estimated monthly bond
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight leading-none">
                ~R{estMonthlyBond.toLocaleString()}
                <span className="text-xs font-sans text-slate-600 font-normal ml-1.5">/ month</span>
              </div>
              <p className="text-xs text-slate-500 pt-1">
                Based on 20-year bond @ 11.75% prime interest rate
              </p>
            </div>
          ) : (
            <div className="p-3 rounded-2xl bg-slate-50/70 border border-dashed border-slate-200 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>
                {!hasLocationInput
                  ? 'Select location & price to calculate monthly bond.'
                  : !hasTargetPriceInput
                  ? 'Enter target property price.'
                  : 'Enter deposit amount.'}
              </span>
            </div>
          )}

        </div>
      )}

      {/* 5. ACTION CTA BUTTON (Exactly like the screenshot, NO "More Filters" here!) */}
      {isFormReady && (
        <div className="pt-1 animate-fade-in transition-all duration-300">
          <button
            type="button"
            onClick={() => {
              sound.play('success');
              if (onExploreClick) onExploreClick();
            }}
            className="w-full py-3.5 px-5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md transition hover:scale-[1.01] active:scale-95 flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition shrink-0" />
              <span>
                Show {filteredCount} Matching {isBuy ? 'Homes to Buy' : 'Homes & Rooms'}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-300 group-hover:text-white transition">
              <span>View below</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </button>
        </div>
      )}

    </div>
  );
}
