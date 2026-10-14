import React from 'react';
import {
  X,
  SlidersHorizontal,
  RotateCcw,
  Check,
  Dog,
  Waves,
  Zap,
  Sun,
  ShieldCheck,
  Car,
  Trees,
  MapPin,
  Building2,
  Sparkles
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function AdvancedFiltersModal({
  isOpen,
  onClose,
  mode,
  minBeds,
  setMinBeds,
  selectedBaths,
  setSelectedBaths,
  selectedType,
  setSelectedType,
  petFriendlyOnly,
  setPetFriendlyOnly,
  poolOnly,
  setPoolOnly,
  prepaidOnly,
  setPrepaidOnly,
  solarOnly,
  setSolarOnly,
  parkingOnly,
  setParkingOnly,
  securityOnly,
  setSecurityOnly,
  minBudget,
  setMinBudget,
  maxBudget,
  setMaxBudget,
  searchLocation,
  setSearchLocation,
  matchingCount,
  onOpenMap,
  onResetFilters,
  addToast
}) {
  if (!isOpen) return null;

  const isBuy = mode === 'buy';

  // Count active filters (excluding defaults)
  let activeCount = 0;
  if (minBeds > 0) activeCount++;
  if (selectedBaths > 0) activeCount++;
  if (selectedType && selectedType !== 'All Types') activeCount++;
  if (petFriendlyOnly) activeCount++;
  if (poolOnly) activeCount++;
  if (prepaidOnly) activeCount++;
  if (solarOnly) activeCount++;
  if (parkingOnly) activeCount++;
  if (securityOnly) activeCount++;

  const handleApply = () => {
    sound.play('success');
    if (addToast) addToast(`Filters applied! Showing ${matchingCount} properties`, 'success');
    onClose();
    // Scroll to results
    const el = document.getElementById('explore-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const bedOptions = [
    { label: 'Any', value: 0 },
    { label: '1 Bed', value: 1 },
    { label: '2 Beds', value: 2 },
    { label: '3 Beds', value: 3 },
    { label: '4+ Beds', value: 4 }
  ];

  const bathOptions = [
    { label: 'Any', value: 0 },
    { label: '1+ Bath', value: 1 },
    { label: '2+ Baths', value: 2 },
    { label: '3+ Baths', value: 3 }
  ];

  const typeOptions = [
    { label: 'All Types', value: 'All Types' },
    { label: 'Room to Rent', value: 'Room to Rent' },
    { label: 'Apartment', value: 'Apartment' },
    { label: 'House', value: 'House' },
    { label: 'Townhouse', value: 'Townhouse' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col my-auto animate-slide-up">
        
        {/* Modal Top Bar */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Additional Property Filters
                </h3>
                {activeCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {activeCount} active
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Filter bedrooms, bathrooms, pets, pools & features in real-time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {activeCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (onResetFilters) onResetFilters();
                  sound.play('click');
                  if (addToast) addToast('Filters reset', 'info');
                }}
                className="px-2.5 py-1 text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                sound.play('click');
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-900">
          
          {/* Quick Map Banner Button */}
          {onOpenMap && (
            <div className="p-3 rounded-2xl hero-gradient border border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-2xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Prefer to choose your area on the map?
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Explore Tembisa & Midrand interactively like Property24
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  sound.play('click');
                  onClose();
                  onOpenMap();
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition shrink-0 cursor-pointer shadow-xs"
              >
                Open Map
              </button>
            </div>
          )}

          {/* 1. PROPERTY TYPE */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              Property Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {typeOptions.map((opt) => {
                const isSelected = (selectedType || 'All Types') === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setSelectedType(opt.value);
                      sound.play('toggle');
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-between border cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. BEDROOMS */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Bedrooms (Minimum)
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {bedOptions.map((opt) => {
                const isSelected = minBeds === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setMinBeds(opt.value);
                      sound.play('toggle');
                    }}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition border cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. BATHROOMS */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Bathrooms (Minimum)
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {bathOptions.map((opt) => {
                const isSelected = selectedBaths === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setSelectedBaths(opt.value);
                      sound.play('toggle');
                    }}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition border cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. MUST-HAVE FEATURES & AMENITIES */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Must-Have Amenities & Features
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              
              {/* Pet Friendly */}
              <button
                type="button"
                onClick={() => {
                  setPetFriendlyOnly(!petFriendlyOnly);
                  sound.play('toggle');
                }}
                className={`p-3 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                  petFriendlyOnly
                    ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-500/20'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    petFriendlyOnly ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Dog className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Pet-Friendly</div>
                    <div className="text-[10px] text-slate-500">Pets allowed / garden yard</div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                  petFriendlyOnly ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
                }`}>
                  {petFriendlyOnly && <Check className="w-3 h-3" />}
                </div>
              </button>

              {/* Swimming Pool */}
              <button
                type="button"
                onClick={() => {
                  setPoolOnly(!poolOnly);
                  sound.play('toggle');
                }}
                className={`p-3 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                  poolOnly
                    ? 'bg-blue-50/80 border-blue-300 ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    poolOnly ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Waves className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Swimming Pool</div>
                    <div className="text-[10px] text-slate-500">Complex or private pool</div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                  poolOnly ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
                }`}>
                  {poolOnly && <Check className="w-3 h-3" />}
                </div>
              </button>

              {/* Prepaid Electricity */}
              <button
                type="button"
                onClick={() => {
                  setPrepaidOnly(!prepaidOnly);
                  sound.play('toggle');
                }}
                className={`p-3 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                  prepaidOnly
                    ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-500/20'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    prepaidOnly ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Prepaid Meter</div>
                    <div className="text-[10px] text-slate-500">Own prepaid electricity box</div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                  prepaidOnly ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-300'
                }`}>
                  {prepaidOnly && <Check className="w-3 h-3" />}
                </div>
              </button>

              {/* Solar / Backup Power */}
              <button
                type="button"
                onClick={() => {
                  setSolarOnly(!solarOnly);
                  sound.play('toggle');
                }}
                className={`p-3 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                  solarOnly
                    ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-500/20'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    solarOnly ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Sun className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Solar / Backup Power</div>
                    <div className="text-[10px] text-slate-500">Inverter or solar geyser</div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                  solarOnly ? 'bg-amber-600 border-amber-600 text-white' : 'border-slate-300'
                }`}>
                  {solarOnly && <Check className="w-3 h-3" />}
                </div>
              </button>

              {/* Parking / Garage */}
              <button
                type="button"
                onClick={() => {
                  setParkingOnly(!parkingOnly);
                  sound.play('toggle');
                }}
                className={`p-3 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                  parkingOnly
                    ? 'bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-500/20'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    parkingOnly ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Covered Parking</div>
                    <div className="text-[10px] text-slate-500">Garage or covered bay</div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                  parkingOnly ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'
                }`}>
                  {parkingOnly && <Check className="w-3 h-3" />}
                </div>
              </button>

              {/* 24/7 Security */}
              <button
                type="button"
                onClick={() => {
                  setSecurityOnly(!securityOnly);
                  sound.play('toggle');
                }}
                className={`p-3 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                  securityOnly
                    ? 'bg-slate-100 border-slate-400 ring-2 ring-slate-900/10'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    securityOnly ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">24/7 Security</div>
                    <div className="text-[10px] text-slate-500">Biometric or guarded gate</div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                  securityOnly ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-300'
                }`}>
                  {securityOnly && <Check className="w-3 h-3" />}
                </div>
              </button>

            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
          <button
            type="button"
            onClick={() => {
              if (onResetFilters) onResetFilters();
              sound.play('click');
            }}
            className="text-xs font-bold text-slate-500 hover:text-slate-900 underline cursor-pointer"
          >
            Clear all
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md transition hover:scale-[1.01] active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Show {matchingCount} Matching {isBuy ? 'Homes' : 'Homes & Rooms'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
