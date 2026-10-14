import React, { useState } from 'react';
import { ArrowLeft, Building2, Lock, Mail, Phone, User } from 'lucide-react';

export default function AgentAuthPage({ onBack, onLogin, onRegister }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    agency: '',
    phone: ''
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (mode === 'login') {
      const result = onLogin({
        email: form.email,
        password: form.password
      });

      if (!result.ok) {
        setError(result.message);
      }
      return;
    }

    const result = onRegister({
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      agency: form.agency,
      phone: form.phone
    });

    if (!result.ok) {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 bg-white">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] min-h-[720px]">
          <div className="bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-between">
            <div>
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to listings
              </button>

              <div className="mt-12">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-200">
                  <Building2 className="h-3.5 w-3.5" />
                  Agent Portal
                </div>

                <h1 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
                  Grow your rental pipeline from one dashboard.
                </h1>
                <p className="mt-4 max-w-md text-sm text-slate-300 md:text-base">
                  Manage listings, qualify leads, schedule viewings, and keep every property opportunity moving.
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-4 text-sm text-slate-200">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="font-bold text-white">Property operations</div>
                <div className="mt-1">Create listings, track enquiries, and update availability in minutes.</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="font-bold text-white">Brand trust</div>
                <div className="mt-1">Present a premium agent experience to buyers and tenants across the platform.</div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10 flex items-center justify-center bg-slate-50">
            <div className="w-full max-w-md">
              <div className="mb-6 flex rounded-full bg-slate-200 p-1">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Agent Login
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    mode === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Register
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
                      Full name
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      <input
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                        placeholder="Jane Smith"
                        required={mode === 'register'}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                      placeholder="agent@company.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {mode === 'register' && (
                  <>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
                        Agency / Brand name
                      </label>
                      <input
                        name="agency"
                        value={form.agency}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                        placeholder="Habitat Realty"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
                        Phone number
                      </label>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                          placeholder="082 555 1234"
                        />
                      </div>
                    </div>
                  </>
                )}

                {error && (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
                >
                  {mode === 'login' ? 'Login as Agent' : 'Register as Agent'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
