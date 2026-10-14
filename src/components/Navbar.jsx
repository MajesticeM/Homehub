import React, { useState } from 'react';
import {
  Heart,
  Menu as MenuIcon,
  X,
  Building2,
  Sparkles,
  User,
  LogOut,
  ChevronDown,
  BookOpen
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function Navbar({
  currentPage,
  setCurrentPage,
  currentUser,
  onSignOut,
  favoritesCount,
  onOpenWishlist,
  soundMuted,
  setSoundMuted,
  addToast
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left Logo */}
        <div
          onClick={() => {
            setCurrentPage('explore');
            sound.play('click');
          }}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <span className="w-1.5 h-6 bg-slate-900 rounded-full transform -skew-x-12"></span>
              <span className="w-1.5 h-6 bg-slate-900 rounded-full transform -skew-x-12"></span>
              <span className="w-1.5 h-6 bg-slate-900 rounded-full transform -skew-x-12"></span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Apartments
            </span>
          </div>
        </div>

        {/* Center Nav Links tailored for Home Seeker */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          <button
            onClick={() => {
              setCurrentPage('explore');
              sound.play('click');
            }}
            className={`transition flex items-center gap-1.5 cursor-pointer ${
              currentPage === 'explore' ? 'text-slate-950 font-extrabold' : 'hover:text-slate-950'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Find by Agents</span>
          </button>

          <button
            onClick={() => {
              setCurrentPage('advice');
              sound.play('click');
            }}
            className={`transition flex items-center gap-1.5 cursor-pointer ${
              currentPage === 'advice' ? 'text-slate-950 font-extrabold' : 'hover:text-slate-950'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Advice & Guides</span>
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
              New
            </span>
          </button>

          <button
            onClick={() => {
              setCurrentPage('about');
              sound.play('click');
            }}
            className={`transition cursor-pointer ${
              currentPage === 'about' ? 'text-slate-950 font-extrabold' : 'hover:text-slate-950'
            }`}
          >
            About us
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Wishlist Heart */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 rounded-full hover:bg-slate-100 text-slate-700 transition cursor-pointer"
            title="Saved Wishlist"
          >
            <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-600'}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Authentication State: Signed In vs Signed Out */}
          {currentUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  sound.play('click');
                  setIsProfileMenuOpen(!isProfileMenuOpen);
                }}
                className="flex items-center gap-2 py-1.5 pl-2 pr-3 rounded-full border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 transition cursor-pointer"
              >
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover border border-white shadow-2xs"
                />
                <div className="text-left hidden sm:block">
                  <span className="text-xs font-bold text-slate-900 block leading-tight">
                    @{currentUser.username}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-slide-up space-y-1">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 font-mono truncate">{currentUser.email}</p>
                    <span className="mt-1 inline-block text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                      @{currentUser.username} • Verified
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onOpenWishlist();
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>Saved Wishlist ({favoritesCount})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      if (onSignOut) onSignOut();
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Sign In Button */}
              <button
                onClick={() => {
                  sound.play('click');
                  setCurrentPage('signin');
                }}
                className={`text-sm font-semibold px-3 py-2 transition cursor-pointer ${
                  currentPage === 'signin' ? 'text-slate-950 font-extrabold' : 'text-slate-800 hover:text-slate-950'
                }`}
              >
                Sign In
              </button>

              {/* Sign Up pill */}
              <button
                onClick={() => {
                  sound.play('click');
                  setCurrentPage('signup');
                }}
                className={`px-5 py-2 rounded-full border text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  currentPage === 'signup'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'border-slate-300 text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-100 p-4 space-y-3 bg-white">
          <button
            onClick={() => {
              setCurrentPage('explore');
              setIsMenuOpen(false);
            }}
            className="w-full text-left py-2 font-bold text-slate-900 flex items-center gap-2"
          >
            <Building2 className="w-4 h-4" />
            Find Homes & Rooms
          </button>

          <button
            onClick={() => {
              setCurrentPage('advice');
              setIsMenuOpen(false);
              sound.play('click');
            }}
            className={`w-full text-left py-2 font-medium flex items-center gap-2 ${
              currentPage === 'advice' ? 'text-slate-950 font-bold' : 'text-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Advice, Videos & Financial Advisor</span>
          </button>

          <button
            onClick={() => {
              setCurrentPage('about');
              setIsMenuOpen(false);
            }}
            className="w-full text-left py-2 font-medium text-slate-700"
          >
            About us
          </button>

          <button
            onClick={() => {
              onOpenWishlist();
              setIsMenuOpen(false);
            }}
            className="w-full text-left py-2 font-medium text-slate-700"
          >
            Saved Wishlist ({favoritesCount})
          </button>

          <div className="pt-2 border-t border-slate-100">
            {currentUser ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono">@{currentUser.username}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (onSignOut) onSignOut();
                  }}
                  className="w-full py-2 text-center text-xs font-bold text-rose-600 bg-rose-50 rounded-xl"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setCurrentPage('signin');
                  }}
                  className="w-full py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setCurrentPage('signup');
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
