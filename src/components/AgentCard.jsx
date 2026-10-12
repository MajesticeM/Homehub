import React from 'react';
import {
  Star,
  MapPin,
  CheckCircle2,
  Home,
  MessageCircle,
  Phone,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function AgentCard({ agent, onSelectAgent, onOpenReviews }) {
  const roomsCount = agent.properties.filter((p) => p.category === 'room').length;
  const housesCount = agent.properties.filter((p) => p.category === 'house').length;

  // Calculate price range
  const prices = agent.properties.map((p) => p.priceMonthly);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden group">
      
      {/* Top Banner & Agency Branding */}
      <div className="relative h-28 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {agent.coverImage && (
          <img
            src={agent.coverImage}
            alt={agent.name}
            className="w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* Badge & Area */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-slate-900 shadow-sm backdrop-blur-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            {agent.badge || 'Verified Agent'}
          </span>

          <span className="text-[11px] font-medium text-white/90 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
            <Clock className="w-3 h-3 text-emerald-400" />
            {agent.responseTime}
          </span>
        </div>

        {/* Areas Tagline */}
        <div className="absolute bottom-2.5 left-3 text-white text-xs font-semibold flex items-center gap-1 drop-shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate max-w-[240px]">
            {agent.operatingAreas.slice(0, 3).join(', ')}
            {agent.operatingAreas.length > 3 && ` +${agent.operatingAreas.length - 3}`}
          </span>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Logo & Agency Title */}
        <div className="flex items-start gap-3.5">
          <img
            src={agent.logo}
            alt={agent.name}
            className="w-13 h-13 rounded-2xl object-cover border-2 border-white shadow-md -mt-6 bg-white shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-emerald-700 transition">
                {agent.name}
              </h3>
              {agent.verified && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" title="PPRA Registered & Verified" />
              )}
            </div>
            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 font-medium">
              {agent.tagline}
            </p>
          </div>
        </div>

        {/* Rating & Reviews Bar */}
        <div className="flex items-center justify-between text-xs bg-slate-50 rounded-2xl p-2.5 border border-slate-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              sound.play('click');
              onOpenReviews(agent);
            }}
            className="flex items-center gap-1.5 hover:text-emerald-700 transition cursor-pointer font-semibold text-slate-800"
          >
            <div className="flex items-center gap-0.5 text-amber-500">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-extrabold text-slate-900 text-sm ml-0.5">{agent.rating}</span>
            </div>
            <span className="text-slate-500 underline decoration-slate-300 underline-offset-2">
              ({agent.reviewsCount} reviews)
            </span>
          </button>

          <div className="text-right">
            <span className="text-[11px] text-slate-500 block">Rentals from</span>
            <span className="font-extrabold text-slate-900 text-xs">
              R{minPrice.toLocaleString()} - R{maxPrice.toLocaleString()}/mo
            </span>
          </div>
        </div>

        {/* Listings Preview Pill / Count */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-slate-500" />
              <span>Available to Rent:</span>
            </span>
            <div className="flex items-center gap-1.5">
              {roomsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px]">
                  {roomsCount} {roomsCount === 1 ? 'Room' : 'Rooms'}
                </span>
              )}
              {housesCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold text-[11px]">
                  {housesCount} {housesCount === 1 ? 'House' : 'Houses'}
                </span>
              )}
            </div>
          </div>

          {/* Quick thumbnails of their listings */}
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            {agent.properties.slice(0, 3).map((prop) => (
              <div
                key={prop.id}
                className="relative rounded-xl overflow-hidden h-14 bg-slate-100 border border-slate-200/80 group/thumb"
                title={`${prop.title} — R${prop.priceMonthly}/mo`}
              >
                <img
                  src={prop.images[0]}
                  alt={prop.title}
                  className="w-full h-full object-cover group-hover/thumb:scale-110 transition duration-300"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/70 text-[9px] text-white font-bold px-1 py-0.5 truncate text-center">
                  R{prop.priceMonthly}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Action Button (Less clicks! Direct open) */}
        <div className="pt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              sound.play('click');
              onSelectAgent(agent);
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm hover:shadow"
          >
            <span>View {agent.properties.length} Listed Homes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              sound.play('click');
              onOpenReviews(agent);
            }}
            className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition"
            title="Read Reviews"
          >
            Reviews
          </button>
        </div>

      </div>

    </div>
  );
}
