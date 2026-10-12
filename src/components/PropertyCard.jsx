import React, { useState } from 'react';
import {
  Heart,
  BedDouble,
  Bath,
  Car,
  MapPin,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Zap,
  ShoppingBag,
  Bus,
  Star
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function PropertyCard({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
  onChatAgent,
  recommendedBudget
}) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  // Check if this property fits the user's recommended income/expense budget
  const isBudgetMatch =
    recommendedBudget &&
    property.priceMonthly >= recommendedBudget.min &&
    property.priceMonthly <= recommendedBudget.max;

  return (
    <div
      onClick={() => {
        sound.play('click');
        onSelectProperty(property);
      }}
      className="group cursor-pointer bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Top Image Section */}
      <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
        <img
          src={property.images[currentImgIdx] || property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5 pointer-events-auto">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-white/95 text-slate-900 shadow-sm backdrop-blur-sm">
              {property.type}
            </span>

            {isBudgetMatch && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-2xs flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-200" />
                Fits Your Budget
              </span>
            )}

            {property.prepaidElectricity && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-2xs flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Prepaid
              </span>
            )}
          </div>

          {/* Favorite Heart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(property.id);
            }}
            className="p-2 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-rose-500 shadow-md transition pointer-events-auto"
            title="Save to Wishlist"
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite ? 'text-rose-500 fill-rose-500' : 'text-slate-600'
              }`}
            />
          </button>
        </div>

        {/* Price & Deposit at bottom of image */}
        <div className="absolute bottom-3 left-3 text-white">
          <div className="text-xl font-extrabold tracking-tight drop-shadow-sm">
            R{property.priceMonthly.toLocaleString()}
            <span className="text-xs font-normal opacity-90"> / month</span>
          </div>
          <div className="text-[11px] opacity-80">
            Deposit: R{property.deposit ? property.deposit.toLocaleString() : property.priceMonthly.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
        
        {/* Title & Location */}
        <div className="space-y-1">
          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-emerald-700 transition line-clamp-1">
            {property.title}
          </h3>
          <p className="text-xs text-slate-500 flex items-center gap-1 font-medium line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{property.address}</span>
          </p>
        </div>

        {/* Proximity Highlights (Close to Mall & Taxi Rank!) */}
        <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-2xl border border-slate-100 text-xs">
          {property.proximity?.mall && (
            <div className="flex items-center gap-1.5 text-slate-700 font-medium truncate">
              <ShoppingBag className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span className="text-[11px] truncate">
                <strong>Mall:</strong> {property.proximity.mall}
              </span>
            </div>
          )}

          {property.proximity?.taxiRank && (
            <div className="flex items-center gap-1.5 text-slate-700 font-medium truncate">
              <Bus className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="text-[11px] truncate">
                <strong>Taxi Rank:</strong> {property.proximity.taxiRank}
              </span>
            </div>
          )}
        </div>

        {/* Specs: Beds, Baths, Parking */}
        <div className="flex items-center justify-between text-xs text-slate-600 pt-0.5 px-1 font-semibold">
          <span className="flex items-center gap-1">
            <BedDouble className="w-3.5 h-3.5 text-slate-400" />
            <strong>{property.beds}</strong> {property.beds === 1 ? 'Bed' : 'Beds'}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Bath className="w-3.5 h-3.5 text-slate-400" />
            <strong>{property.baths}</strong> Bath
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Car className="w-3.5 h-3.5 text-slate-400" />
            <strong>{property.parking || property.garage || 1}</strong> Bay
          </span>
        </div>

        {/* Responsible Agent & Direct Communication Strip */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          
          {/* Agent info */}
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={property.agent.avatar}
              alt={property.agent.name}
              className="w-8 h-8 rounded-full object-cover border border-emerald-400 shadow-2xs shrink-0"
            />
            <div className="min-w-0">
              <span className="font-bold text-slate-900 text-xs truncate block">
                {property.agent.name}
              </span>
              <div className="flex items-center gap-1 text-[10px] text-slate-500">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                <span className="font-bold text-slate-700">{property.agent.rating}</span>
                <span>({property.agent.reviewsCount || 30})</span>
              </div>
            </div>
          </div>

          {/* Quick Contact Buttons (In-App Chat & WhatsApp) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                sound.play('click');
                onChatAgent(property);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1 transition shadow-2xs"
              title="Chat in App"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat</span>
            </button>

            <a
              href={`https://wa.me/${property.agent.whatsapp ? property.agent.whatsapp.replace('+', '') : '27738914420'}?text=${encodeURIComponent(
                `Hello ${property.agent.name}, I am interested in renting '${property.title}' (R${property.priceMonthly}/mo) in ${property.neighborhood}. Is it available?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                sound.play('click');
              }}
              className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 transition shadow-2xs"
              title="WhatsApp Agent"
            >
              <span>WA</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
