import React, { useState } from 'react';
import {
  X,
  Heart,
  MapPin,
  CheckCircle2,
  BedDouble,
  Bath,
  Car,
  Zap,
  ShoppingBag,
  Bus,
  Clock,
  Phone,
  MessageSquare,
  ShieldCheck,
  Calendar,
  Sparkles,
  Star,
  Send,
  FileText,
  BadgeCheck,
  Building2,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function PropertyDetailModal({
  property,
  allProperties = [],
  isFavorite,
  onToggleFavorite,
  onOpenChatAgent,
  onSelectOtherProperty,
  onClose,
  onAddAgentReview,
  addToast
}) {
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [viewingDate, setViewingDate] = useState('Tomorrow');
  const [viewingTime, setViewingTime] = useState('14:00 PM');
  const [viewingConfirmed, setViewingConfirmed] = useState(false);

  // Review Form for this agent
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewError, setReviewError] = useState('');

  const agent = property.agent;
  const reviews = agent.reviews || [];
  const images =
    property.images && property.images.length > 0
      ? property.images
      : ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80'];

  // Room / Area label resolver for each image in the slideshow
  const getRoomLabel = (index) => {
    if (property.imageLabels && property.imageLabels[index]) {
      return property.imageLabels[index];
    }
    const isRoom = property.type === 'Room to Rent' || property.category === 'room';
    if (isRoom) {
      const roomLabels = ['Bedroom & Living Area', 'Private En-Suite Bathroom', 'Kitchenette / Yard Area'];
      return roomLabels[index] || `Room View ${index + 1}`;
    } else {
      const houseLabels = ['Lounge & Living Room', 'Fitted Kitchen', 'Master Bedroom', 'Patio & Yard'];
      return houseLabels[index] || `Interior View ${index + 1}`;
    }
  };

  // Filter other houses/rooms listed under this agent or agency
  const morePropertiesFromAgent = allProperties.filter((p) => {
    if (p.id === property.id) return false;
    if (agent.agency && p.agent?.agency === agent.agency) return true;
    if (p.agent?.name === agent.name) return true;
    return false;
  });

  const handlePrevImg = () => {
    sound.play('click');
    setSelectedImgIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImg = () => {
    sound.play('click');
    setSelectedImgIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleBookViewing = (e) => {
    e.preventDefault();
    setViewingConfirmed(true);
    sound.play('success');
    addToast(
      `Viewing scheduled with ${agent.name} for ${viewingDate} at ${viewingTime}! 📅`,
      'success'
    );
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewAuthor.trim()) {
      setReviewError('Please enter your name.');
      return;
    }
    if (!reviewComment.trim()) {
      setReviewError('Please write your review.');
      return;
    }

    const newRev = {
      id: 'rev_' + Date.now(),
      author: reviewAuthor.trim(),
      rating: Number(reviewRating),
      date: 'Just now',
      comment: reviewComment.trim()
    };

    if (onAddAgentReview) {
      onAddAgentReview(property.id, newRev);
    }
    sound.play('success');
    addToast(`Review submitted for ${agent.name}! Thank you. ⭐`, 'success');

    // Reset Form
    setReviewAuthor('');
    setReviewComment('');
    setReviewRating(5);
    setReviewError('');
    setShowReviewForm(false);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ${agent.name}, I am interested in renting '${property.title}' (R${property.priceMonthly}/mo) in ${property.neighborhood}. Is it still available to view?`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col my-auto animate-slide-up">
        
        {/* TOP COMPACT BAR */}
        <div className="px-6 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-slate-900 text-white shadow-2xs">
              {property.type} to Rent
            </span>
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Available {property.availableFrom || 'Immediately'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleFavorite(property.id)}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-700 transition"
              title="Save to Wishlist"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? 'text-rose-500 fill-rose-500' : 'text-slate-600'
                }`}
              />
            </button>

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
        </div>

        {/* SCROLLABLE BODY WITH BALANCED WHITE SPACE */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* ============================================================== */}
          {/* 1. PHOTO SLIDESHOW (SINGLE DISPLAY WITH ROOM LABELS) */}
          {/* ============================================================== */}
          <div className="space-y-3">
            <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden bg-slate-900 shadow-md">
              <img
                src={images[selectedImgIdx]}
                alt={getRoomLabel(selectedImgIdx)}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Gradient Vignette for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

              {/* Room Location Label (e.g. "Kitchen", "Bedroom & Living Area") */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-900 shadow flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{getRoomLabel(selectedImgIdx)}</span>
              </div>

              {/* Photo Counter Tag */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                {selectedImgIdx + 1} / {images.length}
              </div>

              {/* Slideshow Previous / Next Navigation Controls */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImg}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg transition active:scale-95 cursor-pointer"
                    title="Previous room photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextImg}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg transition active:scale-95 cursor-pointer"
                    title="Next room photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Bottom Quick Price Bar */}
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-2xl font-black drop-shadow-sm">
                  R{property.priceMonthly.toLocaleString()}
                  <span className="text-xs font-normal opacity-90"> / month</span>
                </div>
                <div className="text-xs text-slate-200 drop-shadow-xs">
                  Deposit: R{property.deposit ? property.deposit.toLocaleString() : property.priceMonthly.toLocaleString()}
                </div>
              </div>

              {/* Slideshow Pagination Indicator Dots */}
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        sound.play('click');
                        setSelectedImgIdx(idx);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        selectedImgIdx === idx ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                      }`}
                      title={`Go to photo ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Small Thumbnail Indicator Strip */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      sound.play('click');
                      setSelectedImgIdx(idx);
                    }}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                      selectedImgIdx === idx ? 'border-slate-900 scale-102 shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={getRoomLabel(idx)} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[8px] text-white font-bold text-center truncate px-0.5">
                      {getRoomLabel(idx).split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ============================================================== */}
          {/* 2. HOUSE INFORMATION (CLEAN, SCANNABLE & UNCLUTTERED) */}
          {/* ============================================================== */}
          <div className="space-y-6">
            
            {/* Title & Street Address */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {property.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1 font-medium">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{property.address}</span>
              </p>
            </div>

            {/* Key Specs Bar (Reduced Cognitive Load) */}
            <div className="flex items-center gap-4 text-xs font-bold text-slate-700 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 flex-wrap">
              <span className="flex items-center gap-1.5">
                <BedDouble className="w-4 h-4 text-slate-500" />
                <span>{property.beds} Bedroom{property.beds > 1 ? 's' : ''}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-slate-500" />
                <span>{property.baths} Bathroom{property.baths > 1 ? 's' : ''}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Car className="w-4 h-4 text-slate-500" />
                <span>{property.parking || property.garage || 1} Parking Bay</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-amber-700 font-extrabold">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>{property.prepaidElectricity ? 'Prepaid Meter' : 'Billed Electricity'}</span>
              </span>
            </div>

            {/* Proximity: Close to Mall & Taxi Rank (Compact & Clean) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Close to Mall</span>
                  <span className="font-bold text-slate-900 truncate block">
                    {property.proximity?.mall || 'Nearby shopping complex & convenience centres'}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Bus className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Close to Taxi Rank</span>
                  <span className="font-bold text-slate-900 truncate block">
                    {property.proximity?.taxiRank || 'Walking distance to local minibus taxi ranks'}
                  </span>
                </div>
              </div>
            </div>

            {/* Short Description */}
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-slate-900">About this Home</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {property.description}
              </p>
            </div>

            {/* Key Features & Amenities (Compact Pills) */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900">Key Features</h3>
              <div className="flex flex-wrap gap-2 text-xs text-slate-700">
                {property.amenities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 font-medium text-[11px]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{amenity}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Rental Requirements (Compact Pill Checklist) */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Rental Requirements Checklist</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                  Standard
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200/70">
                  <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] text-slate-700 font-medium">3 Months Bank Statements</span>
                </div>

                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200/70">
                  <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] text-slate-700 font-medium">SA ID or Valid Passport</span>
                </div>

                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200/70">
                  <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] text-slate-700 font-medium">Proof of Income / 3 Months Payslips</span>
                </div>

                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200/70">
                  <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] text-slate-700 font-medium">
                    Deposit: R{property.deposit ? property.deposit.toLocaleString() : property.priceMonthly.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* ============================================================== */}
          {/* 3. VISUAL SEPARATION & CLEAR SPACE BEFORE AGENT SECTION */}
          {/* ============================================================== */}
          <div className="pt-6 border-t-2 border-slate-100">
            
            {/* AGENT & CONTACT INFORMATION (DEDICATED, SPACIOUS, UNCLUTTERED CARD) */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-5">
              
              {/* Agency Overview (Where it is from & small enticing info) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3.5">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                      {agent.agency || 'Verified Real Estate Agency'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    📍 <strong>{agent.agencyOrigin || 'Based in Tembisa & Midrand'}</strong> — {agent.agencyHighlight || 'Specializing in verified local homes with scam-free physical inspections.'}
                  </p>
                </div>

                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full shrink-0 self-start sm:self-center">
                  Verified Local Agency
                </span>
              </div>

              {/* Responsible Contact Person (Photo, Name, Role, Rating) */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-13 h-13 rounded-2xl object-cover border-2 border-white shadow-md shrink-0"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" title="Online" />
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-base font-extrabold text-slate-900">
                        {agent.name}
                      </h4>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    </div>
                    <p className="text-xs font-semibold text-emerald-800">
                      {agent.role}
                    </p>
                    <div className="flex items-center gap-2 pt-0.5 text-xs text-slate-500">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-extrabold text-slate-900">{agent.rating}</span>
                      </div>
                      <span>({agent.reviewsCount || reviews.length} reviews)</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-bold text-[11px]">
                        {agent.responseTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Communication Buttons to Speak with Contact Person */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                {/* 1. Chat in App */}
                <button
                  type="button"
                  onClick={() => {
                    sound.play('click');
                    onClose();
                    onOpenChatAgent(property);
                  }}
                  className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-amber-300" />
                  <span>Chat in App with {agent.name.split(' ')[0]}</span>
                </button>

                {/* 2. Opt for WhatsApp */}
                <a
                  href={`https://wa.me/${agent.whatsapp ? agent.whatsapp.replace('+', '') : '27738914420'}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.play('click')}
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Directly</span>
                </a>

                {/* 3. Direct Phone Call */}
                <a
                  href={`tel:${agent.phone}`}
                  onClick={() => sound.play('click')}
                  className="py-3 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Call {agent.phone}</span>
                </a>
              </div>

              {/* Schedule Free Viewing Form */}
              <div className="pt-2 border-t border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-600" />
                    <span>Schedule Free Viewing with {agent.name.split(' ')[0]}</span>
                  </span>
                </div>

                {viewingConfirmed ? (
                  <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Viewing confirmed for {viewingDate} at {viewingTime}!</span>
                  </div>
                ) : (
                  <form onSubmit={handleBookViewing} className="flex flex-col sm:flex-row items-center gap-2">
                    <select
                      value={viewingDate}
                      onChange={(e) => setViewingDate(e.target.value)}
                      className="w-full sm:w-auto px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800"
                    >
                      <option value="Today">Today</option>
                      <option value="Tomorrow">Tomorrow</option>
                      <option value="This Saturday">This Saturday</option>
                      <option value="This Sunday">This Sunday</option>
                    </select>

                    <select
                      value={viewingTime}
                      onChange={(e) => setViewingTime(e.target.value)}
                      className="w-full sm:w-auto px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800"
                    >
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="14:00 PM">14:00 PM</option>
                      <option value="16:30 PM">16:30 PM</option>
                    </select>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Request Tour</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Agent Reviews (Collapsible / Concise) */}
              <div className="pt-2 border-t border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>Tenant Feedback ({reviews.length})</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setShowReviewForm(!showReviewForm);
                      sound.play('click');
                    }}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline decoration-emerald-300"
                  >
                    {showReviewForm ? 'Cancel' : 'Write Review'}
                  </button>
                </div>

                {showReviewForm && (
                  <form
                    onSubmit={handleSubmitReview}
                    className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-2.5 animate-slide-up"
                  >
                    {reviewError && (
                      <div className="p-2 rounded-xl bg-red-50 text-red-700 text-xs font-semibold">
                        {reviewError}
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        value={reviewAuthor}
                        onChange={(e) => setReviewAuthor(e.target.value)}
                        placeholder="Your Name"
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                      />
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800"
                      >
                        <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                        <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                        <option value="3">⭐⭐⭐ (3 Stars)</option>
                      </select>
                    </div>
                    <textarea
                      rows={2}
                      required
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your experience with this agent..."
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        <span>Submit</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Show Latest 2 Reviews only to keep clean */}
                <div className="space-y-2">
                  {reviews.slice(0, 2).map((rev) => (
                    <div key={rev.id} className="bg-white p-2.5 rounded-xl border border-slate-200/60 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>{rev.author}</span>
                        <span className="text-amber-500 text-[11px]">★ {rev.rating}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">"{rev.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* ============================================================== */}
          {/* 4. MORE HOUSES LISTED UNDER THIS AGENT (AT THE VERY END) */}
          {/* ============================================================== */}
          {morePropertiesFromAgent.length > 0 && (
            <div className="pt-8 border-t-2 border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    <span>More Homes & Rooms Listed by {agent.agency || agent.name}</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Other available verified properties from this agency
                  </p>
                </div>

                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {morePropertiesFromAgent.length} Available
                </span>
              </div>

              {/* Grid of Other Properties */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {morePropertiesFromAgent.map((otherProp) => (
                  <div
                    key={otherProp.id}
                    onClick={() => {
                      sound.play('click');
                      if (onSelectOtherProperty) {
                        onSelectOtherProperty(otherProp);
                      }
                    }}
                    className="bg-slate-50 hover:bg-white p-3 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition cursor-pointer flex gap-3 group"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                      <img
                        src={otherProp.images[0]}
                        alt={otherProp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-black/70 text-[8px] text-white font-bold text-center py-0.5">
                        {otherProp.type}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-sm font-black text-slate-900">
                          R{otherProp.priceMonthly.toLocaleString()}
                          <span className="text-[10px] font-normal text-slate-500"> /mo</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-700 transition">
                          {otherProp.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{otherProp.neighborhood || otherProp.location}</span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium pt-1 border-t border-slate-200/60">
                        <span>{otherProp.beds} Bed • {otherProp.baths} Bath</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition">
                          <span>View</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
