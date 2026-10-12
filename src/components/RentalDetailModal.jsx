import React, { useState } from 'react';
import {
  X,
  MapPin,
  CheckCircle2,
  BedDouble,
  Bath,
  Car,
  Zap,
  Phone,
  Mail,
  MessageSquare,
  ShieldCheck,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Clock,
  Send
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function RentalDetailModal({
  property,
  onClose,
  onOpenDirectChat,
  addToast
}) {
  const [selectedImg, setSelectedImg] = useState(property.images[0]);
  const [viewingDate, setViewingDate] = useState('Tomorrow');
  const [viewingTime, setViewingTime] = useState('14:00 PM');
  const [viewingBooked, setViewingBooked] = useState(false);

  const person = property.assignedPerson;

  const handleBookViewing = (e) => {
    e.preventDefault();
    setViewingBooked(true);
    sound.play('success');
    addToast(
      `Viewing request sent to ${person.name} for ${viewingDate} at ${viewingTime}! 📅`,
      'success'
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col my-auto animate-slide-up">
        
        {/* Top Sticky Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-slate-100 text-slate-800">
              {property.type}
            </span>
            {property.prepaidElectricity && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                Prepaid Electricity
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              sound.play('click');
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Photos Showcase */}
          <div className="space-y-3">
            <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={selectedImg}
                alt={property.title}
                className="w-full h-full object-cover transition duration-300"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl">
                  <div className="text-2xl font-black">
                    R{property.priceMonthly.toLocaleString()}
                    <span className="text-xs font-normal opacity-90"> / month</span>
                  </div>
                  <div className="text-xs text-slate-200">
                    Deposit: R{property.deposit.toLocaleString()}
                  </div>
                </div>

                <span className="bg-emerald-600/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold shadow">
                  Available {property.availableFrom}
                </span>
              </div>
            </div>

            {/* Thumbnail selector */}
            {property.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedImg(img);
                      sound.play('click');
                    }}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                      selectedImg === img ? 'border-slate-900 scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Location Header */}
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {property.title}
            </h2>
            <p className="text-sm text-slate-600 flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{property.address}</span>
            </p>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
              <BedDouble className="w-4 h-4 text-slate-500 mx-auto mb-1" />
              <div className="text-xs text-slate-500">Bedrooms</div>
              <div className="text-sm font-bold text-slate-900">{property.beds} Bed</div>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
              <Bath className="w-4 h-4 text-slate-500 mx-auto mb-1" />
              <div className="text-xs text-slate-500">Bathrooms</div>
              <div className="text-sm font-bold text-slate-900">{property.baths} Bath</div>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
              <Car className="w-4 h-4 text-slate-500 mx-auto mb-1" />
              <div className="text-xs text-slate-500">Parking</div>
              <div className="text-sm font-bold text-slate-900">{property.parking} Bays</div>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
              <Zap className="w-4 h-4 text-amber-500 mx-auto mb-1" />
              <div className="text-xs text-slate-500">Electricity</div>
              <div className="text-sm font-bold text-slate-900">
                {property.prepaidElectricity ? 'Prepaid Meter' : 'Billed'}
              </div>
            </div>
          </div>

          {/* CRITICAL CORE REQUIREMENT: SPECIFIC PERSON UNDER THAT HOUSE */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50/60 via-slate-50 to-emerald-50/40 border-2 border-emerald-500/20 shadow-md space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                  Assigned Contact Person for this House
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-600 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs">
                Direct Host • No Middleman
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              {/* Person Profile */}
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md shrink-0"
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" title="Online" />
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-lg font-extrabold text-slate-900">
                      {person.name}
                    </h3>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>
                  <p className="text-xs font-semibold text-emerald-700">
                    {person.role}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{person.responseTime}</span>
                  </p>
                  <p className="text-xs text-slate-600 pt-1 line-clamp-2 max-w-md font-medium">
                    {person.bio}
                  </p>
                </div>
              </div>

            </div>

            {/* Direct Communication Buttons (User friendly, Less clicks) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              
              {/* 1. In-App Interactive Chat */}
              <button
                type="button"
                onClick={() => {
                  sound.play('click');
                  onClose();
                  onOpenDirectChat(property);
                }}
                className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm hover:shadow"
              >
                <MessageSquare className="w-4 h-4 text-amber-300" />
                <span>Chat with {person.name.split(' ')[0]}</span>
              </button>

              {/* 2. Direct WhatsApp */}
              <a
                href={`https://wa.me/${person.whatsapp.replace('+', '')}?text=${encodeURIComponent(
                  `Hello ${person.name}, I found your listing '${property.title}' (R${property.priceMonthly}/mo) in ${property.neighborhood}. Is it still available to view?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.play('click')}
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm hover:shadow"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Directly</span>
              </a>

              {/* 3. Direct Phone Call */}
              <a
                href={`tel:${person.phone}`}
                onClick={() => sound.play('click')}
                className="py-3 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition shadow-2xs"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call {person.phone}</span>
              </a>

            </div>

          </div>

          {/* Quick Schedule Viewing Section (Less clicks, 1-click confirmation) */}
          <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200/90 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-700" />
              <span>Schedule a Free Viewing with {person.name.split(' ')[0]}</span>
            </h4>

            {viewingBooked ? (
              <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <div>
                  <strong>Viewing Scheduled!</strong> {person.name} has been notified and will meet you at {property.address} on {viewingDate} at {viewingTime}.
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookViewing} className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={viewingDate}
                    onChange={(e) => setViewingDate(e.target.value)}
                    className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800"
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Saturday">This Saturday</option>
                    <option value="This Sunday">This Sunday</option>
                  </select>

                  <select
                    value={viewingTime}
                    onChange={(e) => setViewingTime(e.target.value)}
                    className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800"
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="14:00 PM">14:00 PM</option>
                    <option value="16:30 PM">16:30 PM</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Confirm Viewing Request</span>
                </button>
              </form>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900">About this Property</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Amenities & Key Highlights */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">Property Features & Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Landmarks & Transit */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">Nearby Transit & Essentials</h3>
            <div className="space-y-2 text-xs text-slate-600">
              {property.landmarks.map((landmark, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{landmark}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
