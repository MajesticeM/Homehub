import React, { useState } from 'react';
import {
  X,
  FileText,
  ShieldCheck,
  CheckCircle2,
  User,
  Briefcase,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

export default function RentalApplicationModal({
  isOpen,
  onClose,
  property,
  defaultIncome,
  defaultExpenses,
  onSubmitApplication,
  addToast
}) {
  if (!isOpen || !property) return null;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    idNumber: '',
    statedIncome: defaultIncome ? String(defaultIncome) : '',
    employmentStatus: 'Full-Time Permanent',
    employer: '',
    moveInDate: '2026-11-01',
    hasIdDoc: true,
    hasBankStatements: true,
    hasPayslip: true,
    notes: '',
    consentCheck: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState('');
  const [errors, setErrors] = useState({});

  const agent = property.agent || {
    name: 'Verified Agent',
    agency: 'Habitat SA Agency',
    phone: '082 000 0000'
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.phone.trim()) errs.phone = 'Valid SA phone number is required';
    if (!formData.email.trim()) errs.email = 'Email address is required';
    if (!formData.idNumber.trim()) errs.idNumber = 'SA ID or Passport number is required';
    if (!formData.statedIncome || Number(formData.statedIncome) <= 0) {
      errs.statedIncome = 'Monthly net income is required';
    }
    if (!formData.consentCheck) {
      errs.consentCheck = 'Please agree to the tenant screening consent';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      sound.play('alert');
      if (addToast) addToast('Please fill in all required fields to apply', 'alert');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `APP-${Math.floor(810 + Math.random() * 190)}`;
      const newApp = {
        id: generatedId,
        applicantName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        idNumber: formData.idNumber.trim(),
        propertyId: property.id,
        propertyTitle: property.title,
        propertyLocation: property.neighborhood || property.location || property.address,
        monthlyRent: property.priceMonthly || property.price || 4500,
        statedIncome: Number(formData.statedIncome),
        employmentStatus: formData.employmentStatus,
        employer: formData.employer.trim() || 'Independent / Self',
        moveInDate: formData.moveInDate,
        submissionDate: new Date().toISOString().split('T')[0],
        status: 'Application Submitted',
        creditScore: 'TPN Score: Pending Check',
        documents: [
          { name: 'South African ID Card', status: formData.hasIdDoc ? 'Submitted' : 'Pending Upload' },
          { name: '3-Month Bank Statements', status: formData.hasBankStatements ? 'Submitted' : 'Pending Upload' },
          { name: 'Latest Payslip', status: formData.hasPayslip ? 'Submitted' : 'Pending Upload' },
          { name: 'Proof of Address', status: 'Pending Review' }
        ],
        outstandingSteps: 'Agent review & FICA document vetting',
        notes: `Online application via Customer Portal. Target move-in: ${formData.moveInDate}. Employer: ${formData.employer || 'Not specified'}. ${formData.notes ? 'Notes: ' + formData.notes : ''}`
      };

      if (onSubmitApplication) {
        onSubmitApplication(newApp, property);
      }

      setSubmittedAppId(generatedId);
      setIsSubmitting(false);
      setIsSubmitted(true);
      sound.play('success');

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Confetti fallback
      }

      if (addToast) {
        addToast(`🎉 Application for ${property.title} submitted! Sent to Agent Dashboard.`, 'success');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col my-auto animate-slide-up">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 leading-tight">
                Rental Application
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Direct Submission to Managing Agent Pipeline
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.play('click');
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {isSubmitted ? (
            /* SUCCESS CONFIRMATION STATE */
            <div className="text-center py-8 px-4 space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Application Received ({submittedAppId})
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  Application Submitted to Agent Dashboard!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. Your rental application for <strong>{property.title}</strong> has been received and added directly to <strong>{agent.name}</strong>'s agent dashboard pipeline.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-slate-50 rounded-2xl p-4 max-w-md mx-auto border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Reference Code:</span>
                  <span className="font-bold text-slate-900 font-mono">{submittedAppId}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Property:</span>
                  <span className="font-bold text-slate-900 truncate max-w-[200px]">{property.title}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Monthly Rent:</span>
                  <span className="font-bold text-slate-900">R{(property.priceMonthly || property.price || 0).toLocaleString()} / month</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Managing Agent:</span>
                  <span className="font-bold text-emerald-700">{agent.name} ({agent.agency || 'Habitat SA'})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Status in Dashboard:</span>
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">Application Submitted</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => {
                    sound.play('click');
                    onClose();
                  }}
                  className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition cursor-pointer"
                >
                  Done & Return to Listings
                </button>
              </div>
            </div>
          ) : (
            /* APPLICATION INPUT FORM */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Selected Property Preview Banner */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={property.images?.[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=200&q=80'}
                    alt={property.title}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Applying for
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 truncate mt-0.5">
                      {property.title}
                    </h4>
                    <p className="text-xs text-slate-500 truncate">
                      {property.neighborhood || property.address || property.location}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-base font-black text-slate-900 font-mono">
                    R{(property.priceMonthly || property.price || 0).toLocaleString()}
                    <span className="text-[10px] font-sans font-normal text-slate-500"> /mo</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Agent: {agent.name.split(' ')[0]}
                  </div>
                </div>
              </div>

              {/* SECTION 1: APPLICANT PERSONAL DETAILS */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-800">
                  <User className="w-3.5 h-3.5 text-slate-600" />
                  <span>1. Applicant Personal Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bongani Leon"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-3.5 py-2 rounded-xl bg-slate-50 border text-xs font-medium text-slate-900 focus:bg-white focus:outline-none ${
                        errors.fullName ? 'border-rose-500' : 'border-slate-200 focus:border-slate-800'
                      }`}
                    />
                    {errors.fullName && <p className="text-[10px] text-rose-500 mt-0.5">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      South African Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 082 345 6789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-3.5 py-2 rounded-xl bg-slate-50 border text-xs font-medium text-slate-900 focus:bg-white focus:outline-none ${
                        errors.phone ? 'border-rose-500' : 'border-slate-200 focus:border-slate-800'
                      }`}
                    />
                    {errors.phone && <p className="text-[10px] text-rose-500 mt-0.5">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. applicant@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-3.5 py-2 rounded-xl bg-slate-50 border text-xs font-medium text-slate-900 focus:bg-white focus:outline-none ${
                        errors.email ? 'border-rose-500' : 'border-slate-200 focus:border-slate-800'
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-rose-500 mt-0.5">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      SA ID or Passport Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 9605125890082"
                      value={formData.idNumber}
                      onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                      className={`w-full px-3.5 py-2 rounded-xl bg-slate-50 border text-xs font-medium text-slate-900 focus:bg-white focus:outline-none ${
                        errors.idNumber ? 'border-rose-500' : 'border-slate-200 focus:border-slate-800'
                      }`}
                    />
                    {errors.idNumber && <p className="text-[10px] text-rose-500 mt-0.5">{errors.idNumber}</p>}
                  </div>
                </div>
              </div>

              {/* SECTION 2: EMPLOYMENT & AFFORDABILITY */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-800">
                  <Briefcase className="w-3.5 h-3.5 text-slate-600" />
                  <span>2. Employment & Affordability</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Monthly Take-Home Income (Net) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400 text-xs">
                        R
                      </span>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 18000"
                        value={formData.statedIncome}
                        onChange={(e) => setFormData({ ...formData, statedIncome: e.target.value })}
                        className={`w-full pl-7 pr-3 py-2 rounded-xl bg-slate-50 border text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none ${
                          errors.statedIncome ? 'border-rose-500' : 'border-slate-200 focus:border-slate-800'
                        }`}
                      />
                    </div>
                    {errors.statedIncome && <p className="text-[10px] text-rose-500 mt-0.5">{errors.statedIncome}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Employment Type
                    </label>
                    <select
                      value={formData.employmentStatus}
                      onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:bg-white focus:outline-none"
                    >
                      <option value="Full-Time Permanent">Full-Time Permanent</option>
                      <option value="Contract Worker">Fixed Contract Worker</option>
                      <option value="Self-Employed / Business">Self-Employed / Business Owner</option>
                      <option value="Part-Time Employed">Part-Time Employed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Current Employer / Company
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vodacom / Deloitte / Self"
                      value={formData.employer}
                      onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Move-in Date
                    </label>
                    <input
                      type="date"
                      value={formData.moveInDate}
                      onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: FICA DOCUMENTS CHECKLIST */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>FICA Tenant Documents Confirmation</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Required for Approval
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-xl border border-slate-200/80">
                    <input
                      type="checkbox"
                      checked={formData.hasIdDoc}
                      onChange={(e) => setFormData({ ...formData, hasIdDoc: e.target.checked })}
                      className="rounded text-slate-900 focus:ring-slate-900 w-4 h-4"
                    />
                    <span className="font-medium">I have my South African ID or Passport ready</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-xl border border-slate-200/80">
                    <input
                      type="checkbox"
                      checked={formData.hasBankStatements}
                      onChange={(e) => setFormData({ ...formData, hasBankStatements: e.target.checked })}
                      className="rounded text-slate-900 focus:ring-slate-900 w-4 h-4"
                    />
                    <span className="font-medium">I have my latest 3 months stamped bank statements</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-xl border border-slate-200/80">
                    <input
                      type="checkbox"
                      checked={formData.hasPayslip}
                      onChange={(e) => setFormData({ ...formData, hasPayslip: e.target.checked })}
                      className="rounded text-slate-900 focus:ring-slate-900 w-4 h-4"
                    />
                    <span className="font-medium">I have my latest payslip / proof of income</span>
                  </label>
                </div>
              </div>

              {/* Notes / Special Requests */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Additional Notes or Questions for {agent.name.split(' ')[0]} (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Looking for a 12-month lease, have a vehicle parking bay requirement..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-slate-800"
                />
              </div>

              {/* Consent checkbox */}
              <div>
                <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentCheck}
                    onChange={(e) => setFormData({ ...formData, consentCheck: e.target.checked })}
                    className="mt-0.5 rounded text-slate-900 focus:ring-slate-900 w-4 h-4"
                  />
                  <span>
                    I confirm the information provided is accurate and authorize {agent.agency || 'Habitat SA'} to review my details and conduct credit checks in accordance with POPIA.
                  </span>
                </label>
                {errors.consentCheck && (
                  <p className="text-[10px] text-rose-500 mt-1">{errors.consentCheck}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-sm shadow-lg transition active:scale-95 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Submitting to Agent Pipeline...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition" />
                      <span>Submit Application for {property.title}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2 font-medium">
                  Instant pipeline connection: Your application will immediately appear in the Agent Dashboard.
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
