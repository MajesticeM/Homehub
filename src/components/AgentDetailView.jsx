import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  MapPin,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
  Clock,
  Home,
  MessageSquare,
  Sparkles,
  BedDouble,
  Bath,
  Car,
  Zap,
  UserCheck,
  Send,
  Calendar,
  Share2
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function AgentDetailView({
  agent,
  onBack,
  onSelectProperty,
  onOpenDirectChat,
  onAddReview,
  initialTab = 'properties'
}) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'properties' | 'reviews'
  const [propertyFilter, setPropertyFilter] = useState('all'); // 'all' | 'room' | 'house'
  
  // New Review Form State
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewProperty, setReviewProperty] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewError, setReviewError] = useState('');

  // Filter properties
  const filteredProperties = agent.properties.filter((p) => {
    if (propertyFilter === 'room') return p.category === 'room';
    if (propertyFilter === 'house') return p.category === 'house';
    return true;
  });

  const roomsCount = agent.properties.filter((p) => p.category === 'room').length;
  const housesCount = agent.properties.filter((p) => p.category === 'house').length;

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewAuthor.trim()) {
      setReviewError('Please enter your name.');
      return;
    }
    if (!reviewComment.trim()) {
      setReviewError('Please write a short review.');
      return;
    }

    const newRev = {
      id: 'rev_' + Date.now(),
      author: reviewAuthor.trim(),
      rating: Number(reviewRating),
      date: 'Just now',
      verifiedTenant: true,
      propertyTitle: reviewProperty.trim() || 'Verified Rental Consultation',
      comment: reviewComment.trim()
    };

    onAddReview(agent.id, newRev);
    sound.play('success');

    // Reset Form
    setReviewAuthor('');
    setReviewProperty('');
    setReviewComment('');
    setReviewRating(5);
    setReviewError('');
    setShowReviewForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6 animate-fade-in">
      
      {/* Back Button (Less clicks, 1-click return) */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            sound.play('click');
            onBack();
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Agents</span>
        </button>

        <div className="text-xs text-slate-500 font-medium">
          {agent.primaryArea} Real Estate Partner
        </div>
      </div>

      {/* Agent Master Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        
        {/* Cover Photo */}
        <div className="relative h-44 sm:h-56 bg-slate-900 overflow-hidden">
          {agent.coverImage && (
            <img
              src={agent.coverImage}
              alt={agent.name}
              className="w-full h-full object-cover opacity-45"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-900 shadow-sm">
              {agent.ppraNumber}
            </span>
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div className="text-white space-y-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500 text-white shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                {agent.badge}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {agent.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 font-medium line-clamp-1 max-w-2xl">
                {agent.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Agency Info Bar */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-8 space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {agent.description}
            </p>

            {/* Operating Areas Pills */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Service Areas:
              </span>
              {agent.operatingAreas.map((area) => (
                <span
                  key={area}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium text-[11px]"
                >
                  {area}
                </span>
              ))}
            </div>

            {/* Quick Contact Line */}
            <div className="flex items-center gap-4 text-xs text-slate-600 flex-wrap pt-1 font-medium">
              <a
                href={`tel:${agent.phone}`}
                className="hover:text-emerald-700 flex items-center gap-1.5 transition"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>{agent.phone}</span>
              </a>
              <a
                href={`mailto:${agent.email}`}
                className="hover:text-emerald-700 flex items-center gap-1.5 transition"
              >
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{agent.email}</span>
              </a>
              <span className="text-slate-400">📍 {agent.officeAddress}</span>
            </div>
          </div>

          {/* Right Rating & Quick WhatsApp */}
          <div className="md:col-span-4 bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="text-xl font-black text-slate-900">{agent.rating}</span>
                  <span className="text-xs text-slate-500 font-medium">/ 5.0</span>
                </div>
                <div className="text-xs text-slate-600 font-semibold mt-0.5">
                  Based on {agent.reviewsCount} verified reviews
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-500 font-bold block">Response</span>
                <span className="text-xs font-extrabold text-emerald-700">
                  {agent.responseTime}
                </span>
              </div>
            </div>

            <a
              href={`https://wa.me/${agent.whatsapp.replace('+', '')}?text=${encodeURIComponent(
                `Hello ${agent.name}, I found your agency and would like to inquire about rooms and houses to rent.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Agency Office</span>
            </a>
          </div>

        </div>

      </div>

      {/* Main Tabs Navigation (Listed Rentals vs Reviews) */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-3">
        
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setActiveTab('properties');
              sound.play('click');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'properties'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Listed Houses & Rooms ({agent.properties.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('reviews');
              sound.play('click');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'reviews'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>Agent Reviews ({agent.reviews.length})</span>
          </button>
        </div>

        {/* Property Type Filter when on properties tab */}
        {activeTab === 'properties' && (
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs">
            <button
              onClick={() => { setPropertyFilter('all'); sound.play('click'); }}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                propertyFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({agent.properties.length})
            </button>
            <button
              onClick={() => { setPropertyFilter('room'); sound.play('click'); }}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                propertyFilter === 'room' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Rooms ({roomsCount})
            </button>
            <button
              onClick={() => { setPropertyFilter('house'); sound.play('click'); }}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                propertyFilter === 'house' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Houses ({housesCount})
            </button>
          </div>
        )}

      </div>

      {/* TAB 1: PROPERTIES LISTED UNDER THIS AGENT */}
      {activeTab === 'properties' && (
        <div className="space-y-6">
          
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              Homes & Rooms Managed by {agent.name}
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Click any property to see the assigned contact person
            </span>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 p-8 space-y-3">
              <Home className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800">No properties matching this category</h3>
              <button
                onClick={() => setPropertyFilter('all')}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Show All Rentals
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((prop) => (
                <div
                  key={prop.id}
                  onClick={() => {
                    sound.play('click');
                    onSelectProperty(prop);
                  }}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
                >
                  
                  {/* Photo & Tag */}
                  <div className="relative h-52 bg-slate-100 overflow-hidden">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-white/95 text-slate-900 shadow-sm">
                        {prop.type}
                      </span>
                      {prop.prepaidElectricity && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-2xs flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          Prepaid
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 text-white">
                      <div className="text-xl font-extrabold tracking-tight drop-shadow-sm">
                        R{prop.priceMonthly.toLocaleString()}
                        <span className="text-xs font-normal opacity-90"> / month</span>
                      </div>
                      <div className="text-[11px] opacity-80">
                        Deposit: R{prop.deposit.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Body & Specs */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-emerald-700 transition line-clamp-1">
                        {prop.title}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 font-medium line-clamp-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{prop.address}</span>
                      </p>
                    </div>

                    {/* Quick Specs */}
                    <div className="flex items-center gap-3 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="flex items-center gap-1">
                        <BedDouble className="w-3.5 h-3.5 text-slate-400" />
                        <strong>{prop.beds}</strong> {prop.beds === 1 ? 'Bed' : 'Beds'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Bath className="w-3.5 h-3.5 text-slate-400" />
                        <strong>{prop.baths}</strong> Bath
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Car className="w-3.5 h-3.5 text-slate-400" />
                        <strong>{prop.parking}</strong> Parking
                      </span>
                    </div>

                    {/* Crucial Requirement: THE SPECIFIC PERSON UNDER THAT HOUSE */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={prop.assignedPerson.avatar}
                          alt={prop.assignedPerson.name}
                          className="w-9 h-9 rounded-full object-cover border border-emerald-400 shadow-2xs shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] text-emerald-700 font-extrabold uppercase tracking-wider block">
                            Assigned Contact
                          </span>
                          <span className="font-bold text-slate-900 text-xs truncate block">
                            {prop.assignedPerson.name}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.play('click');
                          onOpenDirectChat(prop);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1 shrink-0"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat</span>
                      </button>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* TAB 2: AGENT REVIEWS & WRITE A REVIEW */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          
          {/* Reviews Header Banner */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center shadow-xs">
                <span className="text-3xl font-black text-slate-900">{agent.rating}</span>
                <div className="flex items-center gap-0.5 text-amber-500 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Reviews for {agent.name}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Tenants review lease transparency, punctuality, and responsiveness.
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    100% Verified Reviews
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {agent.reviews.length} total reviews
                  </span>
                </div>
              </div>
            </div>

            {/* Write Review Button */}
            <button
              type="button"
              onClick={() => {
                setShowReviewForm(!showReviewForm);
                sound.play('click');
              }}
              className="py-2.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm self-start md:self-center"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{showReviewForm ? 'Cancel Review' : 'Write a Review for this Agent'}</span>
            </button>

          </div>

          {/* Interactive Review Form */}
          {showReviewForm && (
            <form
              onSubmit={handleSubmitReview}
              className="bg-white rounded-3xl p-6 border-2 border-slate-900/10 shadow-lg space-y-4 animate-slide-up"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Leave your review for {agent.name}</span>
                </h4>
                <span className="text-xs text-slate-500">Fast 1-click submission</span>
              </div>

              {reviewError && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold">
                  {reviewError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    placeholder="e.g. Sipho Ndlovu"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                  />
                </div>

                {/* Property Rented / Viewed */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Property or Room Rented / Viewed
                  </label>
                  <input
                    type="text"
                    value={reviewProperty}
                    onChange={(e) => setReviewProperty(e.target.value)}
                    placeholder="e.g. Bachelor Room in Winnie Mandela"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                  />
                </div>

              </div>

              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        setReviewRating(star);
                        sound.play('toggle');
                      }}
                      className="p-1.5 rounded-lg hover:bg-slate-100 transition"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">
                    {reviewRating} out of 5 stars
                  </span>
                </div>
              </div>

              {/* Review Comment */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Review / Experience *
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share details about your communication with the agent, property condition, lease signing, etc."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Review</span>
                </button>
              </div>

            </form>
          )}

          {/* List of Reviews */}
          <div className="space-y-4">
            {agent.reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">
                          {rev.author}
                        </span>
                        {rev.verifiedTenant && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Verified Tenant
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {rev.propertyTitle}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.round(rev.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {rev.date}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed pt-1">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
