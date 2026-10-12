import React, { useState } from 'react';
import {
  Search,
  Heart,
  Wrench,
  Calculator,
  Menu as MenuIcon,
  X,
  Building2,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function Navbar({
  currentPage,
  setCurrentPage,
  favoritesCount,
  onOpenWishlist,
  onOpenMortgageModal,
  soundMuted,
  setSoundMuted,
  addToast
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null); // 'signin' | 'signup' | null

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

        {/* Center Nav Links tailored for Home Seeker & Maintenance */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          <button
            onClick={() => {
              setCurrentPage('explore');
              sound.play('click');
            }}
            className={`transition flex items-center gap-1.5 ${
              currentPage === 'explore' ? 'text-slate-950 font-extrabold' : 'hover:text-slate-950'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Find by Agents</span>
          </button>

          <button
            onClick={() => {
              setCurrentPage('maintenance');
              sound.play('click');
            }}
            className={`transition flex items-center gap-1.5 ${
              currentPage === 'maintenance' ? 'text-slate-950 font-extrabold' : 'hover:text-slate-950'
            }`}
          >
            <Wrench className="w-4 h-4 text-slate-700" />
            <span>Home Maintenance & Repairs</span>
          </button>

          <button
            onClick={() => {
              setCurrentPage('about');
              sound.play('click');
            }}
            className={`transition ${
              currentPage === 'about' ? 'text-slate-950 font-extrabold' : 'hover:text-slate-950'
            }`}
          >
            About us
          </button>

          <button
            onClick={onOpenMortgageModal}
            className="hover:text-slate-950 transition flex items-center gap-1.5 text-slate-600"
          >
            <Calculator className="w-4 h-4" />
            <span>Calculator</span>
          </button>

          <button
            onClick={() => {
              setCurrentPage('agent-dashboard');
              sound.play('click');
            }}
            className="transition flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Agent Dashboard</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Wishlist Heart */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 rounded-full hover:bg-slate-100 text-slate-700 transition"
            title="Saved Wishlist"
          >
            <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-600'}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Sign In */}
          <button
            onClick={() => setAuthModal('signin')}
            className="hidden sm:inline-block text-sm font-semibold text-slate-800 hover:text-slate-950 px-3 py-2 transition"
          >
            Sign In
          </button>

          {/* Sign Up pill */}
          <button
            onClick={() => setAuthModal('signup')}
            className="px-5 py-2 rounded-full border border-slate-300 text-sm font-semibold text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200"
          >
            Sign Up
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
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
              setCurrentPage('agent-dashboard');
              setIsMenuOpen(false);
            }}
            className="w-full text-left py-2 font-bold text-emerald-800 flex items-center gap-2 bg-emerald-50 px-3 rounded-xl border border-emerald-200"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Agent Dashboard (SA Portal)
          </button>
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
              setCurrentPage('maintenance');
              setIsMenuOpen(false);
            }}
            className="w-full text-left py-2 font-bold text-slate-900 flex items-center gap-2"
          >
            <Wrench className="w-4 h-4" />
            Home Maintenance (Plumbers, Gardeners, Painters)
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
              onOpenMortgageModal();
              setIsMenuOpen(false);
            }}
            className="w-full text-left py-2 font-medium text-slate-700"
          >
            Mortgage Calculator
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
        </div>
      )}

      {/* Auth Modal */}
      {authModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-200 animate-slide-up space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-900">
                {authModal === 'signin' ? 'Welcome Back' : 'Create an Account'}
              </h3>
              <button onClick={() => setAuthModal(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sound.play('success');
                addToast(authModal === 'signin' ? 'Signed in successfully! 👋' : 'Account registered! Welcome to Apartments 🎉', 'success');
                setAuthModal(null);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow transition"
              >
                {authModal === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
