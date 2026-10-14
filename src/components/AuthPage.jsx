import React, { useState, useMemo } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Circle,
  XCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Building2,
  Check,
  KeyRound,
  RefreshCw,
  X,
  UserCheck
} from 'lucide-react';
import { sound } from '../utils/sound';

// Helper to derive clean username from email address
export function deriveUsernameFromEmail(email) {
  if (!email || !email.includes('@')) return '';
  const prefix = email.split('@')[0];
  // Sanitize: lowercase alphanumeric and dots/underscores only
  const clean = prefix.toLowerCase().replace(/[^a-z0-9_.]/g, '');
  return clean || 'user';
}

// Google SVG Icon
function GoogleIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export default function AuthPage({
  initialMode = 'signin', // 'signin' | 'signup'
  onAuthSuccess,
  onBackToExplore,
  addToast
}) {
  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Google Dialog State
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');

  // Sign In State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign Up State (ONLY email address and password per user requirement)
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  // Dynamic username derived automatically from sign up email
  const createdUsername = useMemo(() => {
    return deriveUsernameFromEmail(signUpEmail);
  }, [signUpEmail]);

  // Real-time password requirement checklist evaluation
  const passwordRequirements = useMemo(() => {
    const targetPassword = mode === 'signup' ? signUpPassword : newPassword;
    return [
      {
        id: 'length',
        label: 'At least 8 characters long',
        met: targetPassword.length >= 8
      },
      {
        id: 'uppercase',
        label: 'At least one uppercase letter (A-Z)',
        met: /[A-Z]/.test(targetPassword)
      },
      {
        id: 'lowercase',
        label: 'At least one lowercase letter (a-z)',
        met: /[a-z]/.test(targetPassword)
      },
      {
        id: 'number',
        label: 'At least one number (0-9)',
        met: /[0-9]/.test(targetPassword)
      },
      {
        id: 'special',
        label: 'At least one special character (!@#$%^&*...)',
        met: /[^A-Za-z0-9]/.test(targetPassword)
      }
    ];
  }, [mode, signUpPassword, newPassword]);

  const metCount = passwordRequirements.filter((r) => r.met).length;
  const allRequirementsMet = metCount === passwordRequirements.length;

  const strengthColor =
    metCount <= 1
      ? 'bg-rose-500'
      : metCount <= 3
      ? 'bg-amber-500'
      : metCount === 4
      ? 'bg-blue-500'
      : 'bg-emerald-500';

  const strengthLabel =
    metCount === 0
      ? 'Empty'
      : metCount <= 1
      ? 'Weak'
      : metCount <= 3
      ? 'Moderate'
      : metCount === 4
      ? 'Good'
      : 'Strong';

  // Handle Google Sign In / Sign Up
  const handleGoogleSelect = (account) => {
    sound.play('click');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsGoogleModalOpen(false);

      const username = deriveUsernameFromEmail(account.email);
      const user = {
        id: 'usr_g_' + Date.now(),
        name: account.name,
        username: username,
        email: account.email,
        avatar: account.avatar,
        authProvider: 'google',
        createdAt: new Date().toISOString()
      };

      if (onAuthSuccess) {
        onAuthSuccess(user, mode === 'signup');
      }
    }, 600);
  };

  // Handle Sign In submission
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) {
      if (addToast) addToast('Please enter both your username (email) and password', 'alert');
      return;
    }

    setIsSubmitting(true);
    sound.play('click');

    setTimeout(() => {
      setIsSubmitting(false);
      const username = deriveUsernameFromEmail(signInEmail);
      const user = {
        id: 'usr_' + Date.now(),
        name: username.charAt(0).toUpperCase() + username.slice(1),
        username: username,
        email: signInEmail.trim().toLowerCase(),
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
        authProvider: 'email',
        createdAt: new Date().toISOString()
      };

      if (onAuthSuccess) {
        onAuthSuccess(user, false);
      }
    }, 500);
  };

  // Handle Sign Up submission (Email + Password only)
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!signUpEmail || !signUpPassword) {
      if (addToast) addToast('Please enter your email address and password', 'alert');
      return;
    }

    if (!allRequirementsMet) {
      if (addToast) addToast('Please fulfill all password requirements below', 'alert');
      sound.play('alert');
      return;
    }

    setIsSubmitting(true);
    sound.play('click');

    setTimeout(() => {
      setIsSubmitting(false);
      const username = createdUsername || deriveUsernameFromEmail(signUpEmail);
      const user = {
        id: 'usr_' + Date.now(),
        name: username.charAt(0).toUpperCase() + username.slice(1),
        username: username,
        email: signUpEmail.trim().toLowerCase(),
        avatar: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80`,
        authProvider: 'email',
        createdAt: new Date().toISOString()
      };

      if (onAuthSuccess) {
        onAuthSuccess(user, true);
      }
    }, 600);
  };

  // Handle Forgot Password submission
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      if (addToast) addToast('Please enter your registered email address', 'alert');
      return;
    }

    setIsSubmitting(true);
    sound.play('click');

    setTimeout(() => {
      setIsSubmitting(false);
      setForgotSubmitted(true);
      sound.play('success');
      if (addToast) addToast(`Password reset link dispatched to ${forgotEmail} 📩`, 'success');
    }, 600);
  };

  // Quick Demo account fill for testing
  const handleFillDemo = () => {
    sound.play('click');
    setSignInEmail('demo.renter@apartments.co.za');
    setSignInPassword('SecurePass123!');
    if (addToast) addToast('Demo credentials pre-filled!', 'info');
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      
      {/* Top Return Button */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            sound.play('click');
            if (onBackToExplore) onBackToExplore();
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Browse Properties</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>256-bit SSL Secure</span>
        </div>
      </div>

      {/* Main Card Container */}
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-8 animate-fade-in space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 mb-1 cursor-pointer" onClick={onBackToExplore}>
            <div className="flex items-center gap-0.5">
              <span className="w-1.5 h-5 bg-slate-900 rounded-full transform -skew-x-12"></span>
              <span className="w-1.5 h-5 bg-slate-900 rounded-full transform -skew-x-12"></span>
              <span className="w-1.5 h-5 bg-slate-900 rounded-full transform -skew-x-12"></span>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Apartments
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {mode === 'signin' && 'Sign in to your account'}
            {mode === 'signup' && 'Create your account'}
            {mode === 'forgot' && 'Reset your password'}
          </h2>

          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            {mode === 'signin' && 'Enter your username (email) and password, or continue with Google.'}
            {mode === 'signup' && 'Enter your email and password. Your unique username is generated automatically.'}
            {mode === 'forgot' && 'Enter your email address and we will send you a reset link.'}
          </p>
        </div>

        {/* Mode Selector Tabs (Sign In vs Sign Up) */}
        {mode !== 'forgot' && (
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => {
                sound.play('click');
                setMode('signin');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
                mode === 'signin'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                sound.play('click');
                setMode('signup');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
                mode === 'signup'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* 1. GOOGLE SIGN IN / SIGN UP OPTION */}
        {mode !== 'forgot' && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => {
                sound.play('click');
                setIsGoogleModalOpen(true);
              }}
              className="w-full py-3 px-4 rounded-2xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center justify-center gap-3 transition shadow-2xs hover:shadow-xs cursor-pointer group"
            >
              <GoogleIcon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
              <span>
                {mode === 'signin' ? 'Sign in with Google' : 'Sign up with Google'}
              </span>
            </button>

            {/* OR Separator */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full"></div>
              <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">
                Or with username & password
              </span>
              <div className="border-t border-slate-200 w-full"></div>
            </div>
          </div>
        )}

        {/* 2. SIGN IN FORM */}
        {mode === 'signin' && (
          <form onSubmit={handleSignInSubmit} className="space-y-4">
            {/* Username / Email Address */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">
                Username <span className="font-normal text-slate-500">(Email address)</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Password with Forgot Password link */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    sound.play('click');
                    setMode('forgot');
                    setForgotSubmitted(false);
                    setForgotEmail(signInEmail);
                  }}
                  className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => {
                    sound.play('click');
                    setShowPassword(!showPassword);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span className="text-xs text-slate-600 font-medium">Remember me</span>
              </label>

              {/* Demo quick-fill button */}
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] font-semibold text-slate-400 hover:text-slate-700 underline cursor-pointer"
                title="Use demo account"
              >
                Auto-fill demo
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition hover:shadow cursor-pointer disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Switch to Sign Up */}
            <div className="pt-2 text-center text-xs text-slate-500">
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => {
                  sound.play('click');
                  setMode('signup');
                }}
                className="font-bold text-slate-900 hover:underline cursor-pointer"
              >
                Sign up here
              </button>
            </div>
          </form>
        )}

        {/* 3. SIGN UP FORM (ONLY EMAIL ADDRESS AND PASSWORD PER USER REQUIREMENT) */}
        {mode === 'signup' && (
          <form onSubmit={handleSignUpSubmit} className="space-y-4">
            
            {/* Field 1: Email Address */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">
                Email address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                />
              </div>

              {/* Requirement: "for sign up it must create the username" */}
              {createdUsername ? (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/90 text-xs flex items-center justify-between text-emerald-900 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[11px]">
                      Created username: <strong className="font-mono text-emerald-950 font-bold">@{createdUsername}</strong>
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                    Auto-created
                  </span>
                </div>
              ) : (
                <p className="text-[11px] text-slate-500 font-medium">
                  Your unique <span className="font-mono font-semibold text-slate-700">@username</span> will be created automatically from your email address.
                </p>
              )}
            </div>

            {/* Field 2: Password */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => {
                    sound.play('click');
                    setShowPassword(!showPassword);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Requirement: "and for password it must show password requirements" */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-2.5 mt-2">
                
                {/* Strength Meter Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-600">Password Requirements</span>
                    <span className={`font-bold ${metCount === 5 ? 'text-emerald-700' : 'text-slate-600'}`}>
                      {strengthLabel} ({metCount}/5 met)
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-full flex-1 transition-all duration-300 ${
                          metCount >= level ? strengthColor : 'bg-transparent'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Individual Checklist Requirements */}
                <div className="space-y-1.5 pt-1">
                  {passwordRequirements.map((req) => (
                    <div
                      key={req.id}
                      className={`flex items-center gap-2 text-[11px] transition-colors ${
                        req.met ? 'text-emerald-700 font-semibold' : 'text-slate-500'
                      }`}
                    >
                      {req.met ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                      )}
                      <span>{req.label}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Terms checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span className="text-[11px] text-slate-500 leading-snug">
                  I agree to the <span className="underline text-slate-700">Terms of Service</span> and <span className="underline text-slate-700">Privacy Policy</span>.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !allRequirementsMet}
              className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition hover:shadow cursor-pointer ${
                allRequirementsMet
                  ? 'bg-slate-900 hover:bg-slate-800 text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Create Account</span>
                </>
              )}
            </button>

            {/* Switch to Sign In */}
            <div className="pt-2 text-center text-xs text-slate-500">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  sound.play('click');
                  setMode('signin');
                }}
                className="font-bold text-slate-900 hover:underline cursor-pointer"
              >
                Sign in here
              </button>
            </div>

          </form>
        )}

        {/* 4. FORGOT PASSWORD FLOW */}
        {mode === 'forgot' && (
          <div className="space-y-4">
            {!forgotSubmitted ? (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800">
                    Your username or email address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    We will send a password reset verification link to this address.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition hover:shadow cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Sending reset link...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4 text-amber-300" />
                      <span>Send Password Reset Link</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-xs text-emerald-950">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Reset Link Dispatched</span>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    We've sent a password reset link to <strong>{forgotEmail}</strong>. Please check your inbox or spam folder.
                  </p>
                </div>

                {/* Interactive Test Simulation: Set New Password Now */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-[11px] font-bold text-slate-600 block uppercase tracking-wide">
                    Live Demo: Simulate Resetting Password
                  </span>

                  <div className="space-y-2">
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        if (!newPassword || newPassword.length < 8) {
                          if (addToast) addToast('Please enter a password with at least 8 characters', 'alert');
                          return;
                        }
                        sound.play('success');
                        setResetSuccess(true);
                        if (addToast) addToast('Password reset successfully! You can now sign in.', 'success');
                      }}
                      className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer"
                    >
                      Save New Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Back to Sign In Link */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  sound.play('click');
                  setMode('signin');
                  setForgotSubmitted(false);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* 5. INTERACTIVE GOOGLE ACCOUNT CHOOSER DIALOG */}
      {isGoogleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-200 animate-slide-up space-y-5">
            
            {/* Google Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <GoogleIcon className="w-5 h-5 shrink-0" />
                <span className="font-bold text-sm text-slate-900">Sign in with Google</span>
              </div>
              <button
                type="button"
                onClick={() => setIsGoogleModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900">Choose an account</h4>
              <p className="text-xs text-slate-500">to continue to Apartments SA</p>
            </div>

            {/* Saved / Pre-configured Google Accounts */}
            <div className="space-y-2">
              {[
                {
                  name: 'Bongani Mthethwa',
                  email: 'bongani.mthethwa@gmail.com',
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
                },
                {
                  name: 'Kagiso Mthethwa',
                  email: 'kagiso.m@gmail.com',
                  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
                },
                {
                  name: 'Lerato Khumalo',
                  email: 'lerato.khumalo@gmail.com',
                  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
                }
              ].map((acc, idx) => (
                <div
                  key={idx}
                  onClick={() => handleGoogleSelect(acc)}
                  className="p-3 rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition cursor-pointer flex items-center gap-3 group"
                >
                  <img
                    src={acc.avatar}
                    alt={acc.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 truncate">
                      {acc.name}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{acc.email}</div>
                  </div>
                  <UserCheck className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                </div>
              ))}
            </div>

            {/* Or custom Google account */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-semibold text-slate-500 block">Use another Google email:</span>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your.email@gmail.com"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customGoogleEmail && customGoogleEmail.includes('@')) {
                      handleGoogleSelect({
                        name: customGoogleEmail.split('@')[0],
                        email: customGoogleEmail,
                        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
                      });
                    } else {
                      if (addToast) addToast('Please enter a valid Google email address', 'alert');
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
