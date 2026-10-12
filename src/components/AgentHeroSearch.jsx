import React from 'react';
import { Search, MapPin, X, Building2, Home, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';
import { POPULAR_RENTAL_AREAS } from '../data/agentsData';

export default function AgentHeroSearch({
  searchQuery,
  setSearchQuery,
  selectedArea,
  setSelectedArea,
  rentalTypeFilter,
  setRentalTypeFilter,
  totalAgentsCount,
  totalListingsCount
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4">
      <div className="relative rounded-[2.5rem] hero-gradient p-6 sm:p-10 border border-slate-200/70 shadow-xs space-y-6">
        
        {/* Top Trust Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Verified Local Real Estate Agents & Hosts (Tembisa & Midrand)</span>
        </div>

        {/* Headline */}
        <div className="max-w-3xl space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Find rooms & houses to rent <br className="hidden sm:inline" />
            <span className="text-emerald-700">through verified local agents.</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
            Choose an agent in your desired area to browse their listed rooms & family homes. Click any house to communicate directly with the specific assigned host.
          </p>
        </div>

        {/* Prominent Location Search Bar (Less clicks, instant live filtering) */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 border border-slate-200 shadow-md max-w-4xl space-y-3">
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            
            {/* Search Input */}
            <div className="relative flex-1 flex items-center">
              <MapPin className="w-5 h-5 text-emerald-600 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search area or agent (e.g. Tembisa, Midrand, Clayville, Phomolong, Winnie Mandela)..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    sound.play('click');
                  }}
                  className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Rental Category Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-bold shrink-0">
              <button
                type="button"
                onClick={() => {
                  setRentalTypeFilter('all');
                  sound.play('click');
                }}
                className={`px-3 py-2 rounded-xl transition cursor-pointer ${
                  rentalTypeFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Rentals
              </button>

              <button
                type="button"
                onClick={() => {
                  setRentalTypeFilter('room');
                  sound.play('click');
                }}
                className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1 ${
                  rentalTypeFilter === 'room'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🏠 Rooms</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRentalTypeFilter('house');
                  sound.play('click');
                }}
                className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1 ${
                  rentalTypeFilter === 'house'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🏡 Houses</span>
              </button>
            </div>

          </div>

          {/* Quick Area Filter Pills (1-Click selection) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar pt-1">
            <span className="text-[11px] font-bold text-slate-400 shrink-0 ml-1 mr-1">
              Popular:
            </span>
            {POPULAR_RENTAL_AREAS.map((area) => {
              const isSelected = selectedArea === area;
              return (
                <button
                  key={area}
                  type="button"
                  onClick={() => {
                    setSelectedArea(area);
                    sound.play('click');
                  }}
                  className={`px-3 py-1.5 rounded-full shrink-0 font-bold text-[11px] transition cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {area}
                </button>
              );
            })}
          </div>

        </div>

        {/* Quick Stats Strip */}
        <div className="flex items-center gap-6 text-xs text-slate-600 font-semibold flex-wrap">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{totalAgentsCount} Verified Agencies active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Home className="w-4 h-4 text-blue-600" />
            <span>{totalListingsCount} Rooms & Houses currently listed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            <span>Zero listing scam guarantee</span>
          </div>
        </div>

      </div>
    </div>
  );
}
