import React from 'react';
import {
  SlidersHorizontal,
  MapPin,
  Building2,
  Bed,
  Bath,
  Dog,
  Waves,
  ArrowUpDown,
  LayoutGrid,
  Map as MapIcon,
  Columns2,
  X,
  RotateCcw
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function QuickFilterBar({
  filteredCount,
  mode,
  selectedType,
  setSelectedType,
  minBeds,
  setMinBeds,
  selectedBaths,
  setSelectedBaths,
  petFriendlyOnly,
  setPetFriendlyOnly,
  poolOnly,
  setPoolOnly,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onOpenAdvancedModal,
  onResetFilters,
  searchLocation,
  setSearchLocation,
  addToast
}) {
  const propertyTypes = [
    { label: 'All Types', value: 'All Types' },
    { label: 'Rooms', value: 'Room to Rent' },
    { label: 'Apartments', value: 'Apartment' },
    { label: 'Houses', value: 'House' },
    { label: 'Townhouses', value: 'Townhouse' }
  ];

  const bedOptions = [
    { label: 'Any Beds', value: 0 },
    { label: '1 Bed', value: 1 },
    { label: '2 Beds', value: 2 },
    { label: '3+ Beds', value: 3 }
  ];

  const bathOptions = [
    { label: 'Any Baths', value: 0 },
    { label: '1+ Bath', value: 1 },
    { label: '2+ Baths', value: 2 }
  ];

  // Count active non-default filters
  let activeFilterCount = 0;
  if (selectedType && selectedType !== 'All Types') activeFilterCount++;
  if (minBeds > 0) activeFilterCount++;
  if (selectedBaths > 0) activeFilterCount++;
  if (petFriendlyOnly) activeFilterCount++;
  if (poolOnly) activeFilterCount++;
  if (searchLocation && searchLocation.trim() !== '') activeFilterCount++;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-3 sm:p-4 space-y-3 sticky top-16 z-30 backdrop-blur-md bg-white/95 transition-all">
      
      {/* ROW 1: PRIMARY REALTIME QUICK-FILTERS & VIEW SWITCHER */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Left Side: Realtime Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* 1. Property Type Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
            {propertyTypes.map((pt) => {
              const isActive = (selectedType || 'All Types') === pt.value;
              return (
                <button
                  key={pt.value}
                  type="button"
                  onClick={() => {
                    setSelectedType(pt.value);
                    sound.play('toggle');
                    if (addToast) addToast(`Showing ${pt.label}`, 'info');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {pt.label}
                </button>
              );
            })}
          </div>

          {/* 2. Bedrooms Quick Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
            <Bed className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
            {bedOptions.map((opt) => {
              const isActive = minBeds === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setMinBeds(opt.value);
                    sound.play('toggle');
                    if (addToast) addToast(opt.value === 0 ? 'Any bedrooms' : `${opt.label} minimum`, 'info');
                  }}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* 3. Bathrooms Quick Selector (Hidden on tiny screens) */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
            <Bath className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
            {bathOptions.map((opt) => {
              const isActive = selectedBaths === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setSelectedBaths(opt.value);
                    sound.play('toggle');
                  }}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* 4. Pet Friendly Quick Toggle */}
          <button
            type="button"
            onClick={() => {
              const next = !petFriendlyOnly;
              setPetFriendlyOnly(next);
              sound.play('toggle');
              if (addToast) addToast(next ? 'Filtered to Pet-Friendly 🐾' : 'Pet filter cleared', 'info');
            }}
            className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
              petFriendlyOnly
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <Dog className="w-3.5 h-3.5" />
            <span>Pets</span>
          </button>

          {/* 5. Pool Quick Toggle */}
          <button
            type="button"
            onClick={() => {
              const next = !poolOnly;
              setPoolOnly(next);
              sound.play('toggle');
              if (addToast) addToast(next ? 'Filtered to Swimming Pool 🏊' : 'Pool filter cleared', 'info');
            }}
            className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
              poolOnly
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
            <span>Pool</span>
          </button>

          {/* 6. All Filters Button (Opens Modal) */}
          <button
            type="button"
            onClick={() => {
              sound.play('click');
              if (onOpenAdvancedModal) onOpenAdvancedModal();
            }}
            className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
              activeFilterCount > 0
                ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
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

        </div>

        {/* Right Side: View Mode Switcher (Grid | Split | Map like Property24) */}
        <div className="flex items-center gap-2">
          
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
            {/* Grid View */}
            <button
              type="button"
              onClick={() => {
                setViewMode('grid');
                sound.play('toggle');
              }}
              title="Grid View"
              className={`p-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">Grid</span>
            </button>

            {/* Split View (Cards + Map) */}
            <button
              type="button"
              onClick={() => {
                setViewMode('split');
                sound.play('toggle');
              }}
              title="Split View (List + Map)"
              className={`hidden md:flex p-1.5 rounded-xl text-xs font-bold transition items-center gap-1 cursor-pointer ${
                viewMode === 'split'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Columns2 className="w-4 h-4" />
              <span className="text-xs">Split</span>
            </button>

            {/* Map View */}
            <button
              type="button"
              onClick={() => {
                setViewMode('map');
                sound.play('toggle');
              }}
              title="Interactive Map View (Property24 style)"
              className={`p-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                viewMode === 'map'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold">Map</span>
            </button>
          </div>

        </div>

      </div>

      {/* ROW 2: REALTIME STATUS & ACTIVE FILTER BADGES */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 text-xs">
        
        {/* Active Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-extrabold text-slate-900">
            {filteredCount} {mode === 'buy' ? 'Homes for Sale' : 'Homes & Rooms to Rent'}
          </span>

          {searchLocation && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span>{searchLocation}</span>
              <button
                type="button"
                onClick={() => {
                  setSearchLocation('');
                  sound.play('click');
                }}
                className="hover:text-red-500 cursor-pointer ml-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedType && selectedType !== 'All Types' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
              <span>{selectedType}</span>
              <button
                type="button"
                onClick={() => {
                  setSelectedType('All Types');
                  sound.play('click');
                }}
                className="hover:text-red-500 cursor-pointer ml-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {minBeds > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
              <span>{minBeds}+ Beds</span>
              <button
                type="button"
                onClick={() => {
                  setMinBeds(0);
                  sound.play('click');
                }}
                className="hover:text-red-500 cursor-pointer ml-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedBaths > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
              <span>{selectedBaths}+ Baths</span>
              <button
                type="button"
                onClick={() => {
                  setSelectedBaths(0);
                  sound.play('click');
                }}
                className="hover:text-red-500 cursor-pointer ml-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {petFriendlyOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span>Pets Allowed</span>
              <button
                type="button"
                onClick={() => {
                  setPetFriendlyOnly(false);
                  sound.play('click');
                }}
                className="hover:text-red-500 cursor-pointer ml-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {poolOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
              <span>Pool</span>
              <button
                type="button"
                onClick={() => {
                  setPoolOnly(false);
                  sound.play('click');
                }}
                className="hover:text-red-500 cursor-pointer ml-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={() => {
                if (onResetFilters) onResetFilters();
                sound.play('click');
              }}
              className="text-[11px] font-bold text-slate-500 hover:text-red-600 underline ml-1 cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Clear all</span>
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
            <ArrowUpDown className="w-3 h-3" />
            Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              sound.play('click');
            }}
            className="px-2.5 py-1 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 shadow-2xs cursor-pointer focus:outline-hidden"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

      </div>

    </div>
  );
}
