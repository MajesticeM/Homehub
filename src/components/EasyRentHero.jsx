import React, { useState } from 'react';
import {
  Search,
  MapPin,
  X,
  Wallet,
  Sparkles,
  CheckCircle2,
  DollarSign,
  Home,
  Sliders,
  ChevronDown
} from 'lucide-react';
import { sound } from '../utils/sound';
import { CITIES } from '../data/propertiesData';

export default function EasyRentHero({
  searchLocation,
  setSearchLocation,
  selectedType,
  setSelectedType,
  income,
  setIncome,
  expenses,
  setExpenses,
  recommendedBudget,
  budgetFilterActive,
  setBudgetFilterActive,
  minBudget,
  setMinBudget,
  maxBudget,
  setMaxBudget,
  filteredCount
}) {
  const [showAdvancedBudget, setShowAdvancedBudget] = useState(false);

  // Quick preset buttons for instant budget selection (Less clicks!)
  const budgetPresets = [
    { label: 'All Budgets', min: 0, max: 20000 },
    { label: 'Under R2,500', min: 0, max: 2500 },
    { label: 'R2,500 – R5,000', min: 2500, max: 5000 },
    { label: 'R5,000 – R9,000', min: 5000, max: 9000 },
    { label: 'R10,000+', min: 10000, max: 25000 }
  ];

  const handleApplyPreset = (preset) => {
    setMinBudget(preset.min);
    setMaxBudget(preset.max);
    setBudgetFilterActive(preset.label !== 'All Budgets');
    sound.play('click');
  };

  const handleApplyRecommended = () => {
    setMinBudget(recommendedBudget.min);
    setMaxBudget(recommendedBudget.max);
    setBudgetFilterActive(true);
    sound.play('success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4">
      <div className="relative rounded-[2.5rem] hero-gradient p-6 sm:p-10 border border-slate-200/70 shadow-xs space-y-6">
        
        {/* Top Trust Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Find Verified Rooms & Houses to Rent in Tembisa & Midrand</span>
        </div>

        {/* Headline */}
        <div className="max-w-3xl space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.14]">
            Find a house or room that fits <br className="hidden sm:inline" />
            <span className="text-emerald-700">your location & budget.</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
            Enter your preferred area and monthly budget to get instant recommendations. Open any property to view proximity to malls & taxi ranks, see the responsible agent, and chat in-app or via WhatsApp.
          </p>
        </div>

        {/* Smart & Simple Search Container (Less Clicks!) */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-md max-w-4xl space-y-4">
          
          {/* Row 1: Location & Property Type */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Location Search Bar */}
            <div className="md:col-span-8 relative flex items-center">
              <MapPin className="w-5 h-5 text-emerald-600 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Search area (e.g. Tembisa, Winnie Mandela, Clayville, Midrand, Carlswald)..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition"
              />
              {searchLocation && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchLocation('');
                    sound.play('click');
                  }}
                  className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Type Toggle: All / Rooms / Houses */}
            <div className="md:col-span-4 flex items-center gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setSelectedType('All Types');
                  sound.play('click');
                }}
                className={`flex-1 py-2 rounded-xl transition cursor-pointer text-center ${
                  selectedType === 'All Types'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedType('Room to Rent');
                  sound.play('click');
                }}
                className={`flex-1 py-2 rounded-xl transition cursor-pointer text-center ${
                  selectedType === 'Room to Rent'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Rooms
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedType('House');
                  sound.play('click');
                }}
                className={`flex-1 py-2 rounded-xl transition cursor-pointer text-center ${
                  selectedType === 'House'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Houses
              </button>
            </div>

          </div>

          {/* Row 2: Popular Location Chips (1-Click selection) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            <span className="text-[11px] font-bold text-slate-400 shrink-0 mr-1">
              Popular Areas:
            </span>
            {CITIES.map((city) => {
              const isSelected =
                (city === 'All Areas' && !searchLocation) ||
                (city !== 'All Areas' && searchLocation.toLowerCase().includes(city.toLowerCase()));
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setSearchLocation(city === 'All Areas' ? '' : city);
                    sound.play('click');
                  }}
                  className={`px-3 py-1.5 rounded-full shrink-0 font-bold text-[11px] transition cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {city}
                </button>
              );
            })}
          </div>

          {/* Row 3: Budget & Expense Recommendation Bar */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Wallet className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span>Smart Budget Recommendation</span>
                    {budgetFilterActive && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                        Active Filter
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Comfortable rent range based on your monthly income & living expenses:
                  </p>
                </div>
              </div>

              {/* Toggle to fine-tune income & expense numbers */}
              <button
                type="button"
                onClick={() => setShowAdvancedBudget(!showAdvancedBudget)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline decoration-emerald-300 underline-offset-2 flex items-center gap-1 self-start sm:self-center"
              >
                <span>{showAdvancedBudget ? 'Hide Calculator' : 'Adjust Income & Expenses'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvancedBudget ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Income & Expense Inputs (Collapsible or visible) */}
            {showAdvancedBudget && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200 animate-slide-up">
                
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Monthly Take-Home Income (R)
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-xs font-bold text-slate-400">R</span>
                    <input
                      type="number"
                      step="500"
                      min="1000"
                      value={income}
                      onChange={(e) => setIncome(Number(e.target.value) || 0)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Other Monthly Expenses (Groceries, Travel, Debts) (R)
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-xs font-bold text-slate-400">R</span>
                    <input
                      type="number"
                      step="500"
                      min="0"
                      value={expenses}
                      onChange={(e) => setExpenses(Number(e.target.value) || 0)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* Resulting Recommendation Banner & Presets */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-700 font-medium">
                  We recommend: <strong className="text-slate-950 font-bold">R{recommendedBudget.min.toLocaleString()} – R{recommendedBudget.max.toLocaleString()}/mo</strong>
                </span>
                <button
                  type="button"
                  onClick={handleApplyRecommended}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition shadow-2xs"
                >
                  Apply This Range
                </button>
              </div>

              {/* Fast Preset Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {budgetPresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold text-[10px] transition shrink-0"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* Quick Summary Strip */}
        <div className="flex items-center justify-between text-xs text-slate-600 font-semibold flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Showing {filteredCount} matching homes & rooms</span>
            {budgetFilterActive && (
              <span className="text-slate-400">• Budget: R{minBudget.toLocaleString()} - R{maxBudget.toLocaleString()}/mo</span>
            )}
          </div>

          <div className="flex items-center gap-4 text-slate-500 font-medium">
            <span>🛍️ Mall distances verified</span>
            <span>🚕 Taxi ranks included</span>
            <span>💬 In-app & WhatsApp chat ready</span>
          </div>
        </div>

      </div>
    </div>
  );
}
