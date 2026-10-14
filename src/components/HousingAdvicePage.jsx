import React, { useState } from 'react';
import {
  BookOpen,
  Video,
  FileText,
  UserCheck,
  ShieldCheck,
  Calculator,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  HelpCircle,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  Sparkles,
  ChevronRight,
  X,
  Building2,
  DollarSign,
  TrendingUp,
  Award,
  Layers,
  Search,
  Check
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function HousingAdvicePage({
  onBackToExplore,
  addToast,
  affordabilityProfile
}) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'renting' | 'buying' | 'videos' | 'articles' | 'advisor'
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);

  // Financial Decision Assistant State
  const [decisionTool, setDecisionTool] = useState('rent-afford'); // 'rent-afford' | 'bond-afford' | 'rent-vs-buy'
  
  // Rent Afford Tool Inputs
  const [calcIncome, setCalcIncome] = useState(affordabilityProfile?.income || 14000);
  const [calcRent, setCalcRent] = useState(4200);

  // Bond Afford Tool Inputs
  const [grossIncome, setGrossIncome] = useState(25000);
  const [depositAmount, setDepositAmount] = useState(50000);

  // Consultation Booking Form State
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    topic: 'Rental Affordability & Budget Check',
    preferredTime: 'Tomorrow morning (09:00 - 12:00)',
    contactMethod: 'WhatsApp Call'
  });
  const [bookingSuccess, setBookingSuccess] = useState(null);

  // Filter videos & articles based on search query
  const videos = [
    {
      id: 'v1',
      title: 'How to Rent Your First Room or Apartment in Tembisa & Midrand Safely',
      duration: '8:45',
      author: 'Kagiso Mthethwa (Senior Rental Specialist)',
      category: 'renting',
      views: '4.2k views',
      thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      description: 'Avoid common scams, understand deposit protections under the Rental Housing Act, and learn how to inspect a room before paying a single Rand.',
      chapters: [
        { time: '0:00', title: 'Introduction & South African rental realities' },
        { time: '2:15', title: '3 Red flags of rental fraud on social media' },
        { time: '4:30', title: 'The Move-In inspection snag list' },
        { time: '6:50', title: 'Prepaid electricity vs shared municipal billing' }
      ]
    },
    {
      id: 'v2',
      title: 'First-Time Home Buyers: How to Unlock the FLISP Government Subsidy (Up to R130,000)',
      duration: '12:20',
      author: 'Siphesihle Khumalo, CFP® (Property Finance Consultant)',
      category: 'buying',
      views: '9.8k views',
      thumbnail: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80',
      description: 'If you earn between R3,501 and R22,000 per month, the South African government offers a once-off cash grant to reduce your bond. Here is how to apply step-by-step.',
      chapters: [
        { time: '0:00', title: 'What is FLISP / First Home Finance?' },
        { time: '3:10', title: 'Income brackets and subsidy tiers' },
        { time: '6:45', title: 'Documents required for Department of Human Settlements' },
        { time: '9:30', title: 'Combining FLISP with your bank bond approval' }
      ]
    },
    {
      id: 'v3',
      title: 'Understanding South African Lease Agreements & Your Rights as a Tenant',
      duration: '10:15',
      author: 'Advocate Lerato Ndlovu (Property Legal Counsel)',
      category: 'renting',
      views: '6.1k views',
      thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
      description: 'Can a landlord lock you out or cut your electricity? What notice period must you give? Clear legal answers without confusing jargon.',
      chapters: [
        { time: '0:00', title: 'The Consumer Protection Act (CPA) 20-day notice rule' },
        { time: '3:40', title: 'What happens to your deposit interest?' },
        { time: '6:15', title: 'Illegal landlord actions & Rental Housing Tribunal remedy' },
        { time: '8:50', title: 'Maintenance: What is landlord vs tenant responsibility' }
      ]
    },
    {
      id: 'v4',
      title: 'Rent vs Buy in Midrand & Tembisa: Which Makes True Financial Sense in 2026?',
      duration: '14:30',
      author: 'Kgomotso Ndlovu, CA(SA)',
      category: 'buying',
      views: '11.5k views',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      description: 'A detailed mathematical breakdown comparing renting in Vorna Valley or Clayville vs taking a 20-year bond at 11.75% prime interest.',
      chapters: [
        { time: '0:00', title: 'The 5% Rule: Opportunity cost of homeownership' },
        { time: '4:20', title: 'Hidden property costs: Rates, levies & maintenance' },
        { time: '8:40', title: '5-Year net worth model: Renting + Investing surplus' },
        { time: '11:50', title: 'When buying is 100% the right decision for your family' }
      ]
    }
  ];

  const articles = [
    {
      id: 'a1',
      title: 'The 10-Point Move-In Checklist: Never Pay a Deposit Until You Check These',
      category: 'renting',
      readTime: '4 min read',
      date: 'Updated October 2026',
      summary: 'Essential checklist covering water pressure, prepaid meter functionality, window locks, and photo inventory to ensure your deposit is returned in full.',
      content: `Moving into a new room or apartment is an exciting milestone, but tenant disputes in South Africa almost always trace back to an inadequate move-in inspection.

Under the Rental Housing Act No. 50 of 1999, both landlord and tenant must jointly inspect the premises before the tenant moves in to document any pre-existing defects.

### 1. Test All Plumbing Fixtures
Turn on every tap and the shower simultaneously. Check that water pressure does not drop to a trickle. Run your hands around the base of the toilet and under the kitchen sink to detect slow leaks that could cause dampness.

### 2. Verify the Prepaid Electricity Meter
Ensure the room or apartment has its own dedicated prepaid sub-meter. Ask the host to demonstrate loading a token. Confirm who pays for common area lighting and water pumps.

### 3. Test Windows, Latches, and Security Gates
Burglar bars and security gates are vital in Gauteng. Check that all locks turn smoothly from both inside and outside without sticking.

### 4. Photographic & Video Inventory
Before placing any furniture, take high-resolution, timestamped photographs of every wall, ceiling corner, floor tile, and kitchen cupboard. Send these photos via email or WhatsApp to the agent/landlord within 7 days of moving in to create an irrefutable paper trail.`
    },
    {
      id: 'a2',
      title: 'How to Qualify for a Home Loan in South Africa on an Average Salary',
      category: 'buying',
      readTime: '6 min read',
      date: 'Updated October 2026',
      summary: 'Learn how South African banks assess credit scores, calculate your Debt-to-Income (DTI) ratio, and why a clean 6-month bank statement is crucial.',
      content: `Getting approved for a 20-year bond with major South African banks (Standard Bank, FNB, Absa, Nedbank) requires understanding exactly what credit scoring algorithms look for.

### 1. The 30% Gross Income Affordability Rule
Under the National Credit Act (NCA), your monthly bond repayment should never exceed 30% of your verifiable gross monthly income (or combined household income for joint applications).
- E.g., On a gross salary of R20,000, your maximum monthly bond installment is approximately R6,000. At 11.75% interest, that qualifies you for roughly R560,000 in home finance.

### 2. Credit Score Target: 650+
Your credit bureau score (TransUnion, Experian) is the single most important factor:
- Below 600: High risk, likely rejected or interest loaded at Prime + 2.5%
- 600 - 649: Moderate risk, bank will require a 10% - 15% deposit
- 650 - 720: Good, high probability of 100% bond approval at Prime
- 720+: Excellent, banks will compete with interest rate discounts (e.g., Prime - 1.0%)

### 3. Cleaning Up Bank Statements 90 Days in Advance
Banks inspect 3 to 6 months of bank statements line-by-line. Any bounced debit orders, gambling transactions, or unarranged overdraft fees will severely lower your score.`
    },
    {
      id: 'a3',
      title: 'Hidden Costs of Buying Property: Transfer Duty, Attorney Fees & Moving Expenses',
      category: 'buying',
      readTime: '5 min read',
      date: 'Updated October 2026',
      summary: 'Buying a house involves more than just the purchase price. Learn about transfer fees, bond registration attorneys, rates clearances, and municipal deposits.',
      content: `Many first-time homebuyers in South Africa save just enough for a deposit, only to be shocked by conveyancing attorney bills payable before registration.

### 1. Transfer Duty Exemption
Good news: In South Africa, properties purchased for R1,100,000 or less are 100% EXEMPT from government transfer duty tax. If you buy a house for R850,000 in Tembisa or Midrand, your transfer duty tax is R0.

### 2. Conveyancing & Bond Registration Attorney Fees
Even if transfer duty is R0, you must pay two sets of legal fees:
- Transfer Attorney (acts for seller to transfer ownership): Approx R22,000 - R30,000 on an R800k home.
- Bond Registration Attorney (acts for bank to register the mortgage): Approx R20,000 - R28,000.
Budget roughly 6% to 8% of the property value for upfront legal and registration costs.

### 3. Water & Rates Clearance Advance
Municipalities require the buyer to prepay 3 to 6 months of estimated rates and municipal utilities in advance before issuing a clearance certificate.`
    },
    {
      id: 'a4',
      title: 'Can a Landlord Evict You for Late Rent? Know Your Rights Under the PIE Act',
      category: 'renting',
      readTime: '5 min read',
      date: 'Updated October 2026',
      summary: 'Understanding legal notice periods, lockouts, illegal electricity cuts, and how to resolve rent arrears amicably before facing court.',
      content: `Under South African constitutional law and the Prevention of Illegal Eviction from and Unlawful Occupation of Land (PIE) Act, self-help evictions by landlords are strictly criminal offenses.

### What Landlords CANNOT Do:
- A landlord cannot change your locks while you are away.
- A landlord cannot cut off your electricity, water, or padlock the gate.
- A landlord cannot seize your personal belongings (clothes, appliances) without a formal court order.

### What Landlords CAN Legally Do:
- If rent is unpaid, the landlord can serve a formal Letter of Demand giving you 20 business days to settle the arrears (under the Consumer Protection Act).
- If unpaid after 20 business days, the landlord can legally cancel your lease agreement and apply to the Magistrates Court for an eviction order.`
    }
  ];

  const advisors = [
    {
      id: 'adv-1',
      name: 'Siphesihle Khumalo, CFP®',
      title: 'Certified Financial Planner & Mortgage Specialist',
      credentials: 'CFP® • FSCA Lic. #48291 • MBA Finance (Wits)',
      specialty: 'First-Time Home Buyers, FLISP Subsidies & Bond Approvals',
      experience: '11+ years guiding South African families',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      phone: '+27 82 555 4910',
      whatsapp: '+27825554910',
      rating: 4.98,
      reviewsCount: 84,
      availability: 'Available for WhatsApp or Call this week',
      bio: 'Siphesihle specializes in structuring finance for young professionals and families in Gauteng. He has assisted over 350 first-time buyers in securing FLISP government subsidies and negotiated prime-minus interest rates from major banks.'
    },
    {
      id: 'adv-2',
      name: 'Kgomotso Ndlovu, CA(SA)',
      title: 'Chartered Accountant & Wealth Strategist',
      credentials: 'CA(SA) • SAICA Member • BCom Acc Honours (UJ)',
      specialty: 'Debt Consolidation, Credit Score Repair & Rent vs Buy Modeling',
      experience: '9+ years personal wealth advisory',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
      phone: '+27 73 444 8192',
      whatsapp: '+27734448192',
      rating: 4.95,
      reviewsCount: 62,
      availability: 'Available today for quick consultation',
      bio: 'Kgomotso helps renters build a structured 12-month roadmap from renting to homeownership. Her practical debt-clearing strategies help clients boost their credit scores by 80+ points in 90 days.'
    },
    {
      id: 'adv-3',
      name: 'Mpho Mthembu',
      title: 'Independent Mortgage Originator & Home Loan Advisor',
      credentials: 'FSCA Registered • Multi-Bank Originator (SA Home Loans, Absa, Standard Bank, FNB)',
      specialty: '100% Home Loans, Joint Bond Applications & FLISP Fast-Track',
      experience: '14+ years mortgage origination',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
      phone: '+27 84 999 1234',
      whatsapp: '+27849991234',
      rating: 4.99,
      reviewsCount: 118,
      availability: 'Free 15-minute bond assessment slots open',
      bio: 'Mpho submits home loan applications simultaneously to all 5 major banks, forcing them to compete for your business with the best interest rate. Zero cost to the buyer as banks pay originator fees.'
    }
  ];

  // Rent Affordability Calculations
  const rentRatio = calcIncome > 0 ? ((calcRent / calcIncome) * 100).toFixed(1) : 0;
  const rentStatus =
    rentRatio <= 28
      ? { label: 'Extremely Safe & Comfortable', color: 'emerald', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' }
      : rentRatio <= 35
      ? { label: 'Reasonable / Manageable', color: 'indigo', bg: 'bg-indigo-50 text-indigo-800 border-indigo-200' }
      : rentRatio <= 42
      ? { label: 'High Financial Stretch', color: 'amber', bg: 'bg-amber-50 text-amber-800 border-amber-200' }
      : { label: 'Dangerous Budget Risk', color: 'rose', bg: 'bg-rose-50 text-rose-800 border-rose-200' };

  // Bond Affordability Calculations
  const maxMonthlyBondInstallment = Math.round(grossIncome * 0.30);
  const estLoanAmount = Math.round((maxMonthlyBondInstallment * (Math.pow(1 + 0.1175 / 12, 240) - 1)) / ((0.1175 / 12) * Math.pow(1 + 0.1175 / 12, 240)));
  const totalPurchaseCapacity = estLoanAmount + Number(depositAmount || 0);

  // FLISP Subsidy estimate
  let flispEstimate = 0;
  if (grossIncome >= 3501 && grossIncome <= 22000) {
    flispEstimate = Math.round(Math.max(38000, 130000 - ((grossIncome - 3501) * 4.9)));
  }

  // Filter content
  const filteredVideos = videos.filter((v) => {
    if (activeTab === 'renting' && v.category !== 'renting') return false;
    if (activeTab === 'buying' && v.category !== 'buying') return false;
    if (!searchQuery) return true;
    return (
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const filteredArticles = articles.filter((a) => {
    if (activeTab === 'renting' && a.category !== 'renting') return false;
    if (activeTab === 'buying' && a.category !== 'buying') return false;
    if (!searchQuery) return true;
    return (
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleBookAdvisorSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) {
      if (addToast) addToast('Please enter your name and phone number', 'alert');
      return;
    }

    sound.play('success');
    const refId = `ADV-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingSuccess({
      refId,
      advisorName: selectedAdvisor ? selectedAdvisor.name : 'One of our Accredited Financial Advisors',
      name: bookingForm.name,
      phone: bookingForm.phone,
      topic: bookingForm.topic,
      preferredTime: bookingForm.preferredTime
    });

    if (addToast) {
      addToast(`🎉 Consultation confirmed! Ref #${refId}. An advisor will reach out on WhatsApp.`, 'success');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-24 animate-fade-in text-slate-900">
      
      {/* 1. TOP HERO HEADER */}
      <div className="bg-white border-b border-slate-200/80 pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onBackToExplore}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-xl cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              <span>Back to Properties</span>
            </button>

            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              100% Free Knowledge & Certified Advisory
            </span>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Housing & Financial Advice Hub
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              Everything you need to rent safely, buy your first home, unlock government subsidies like FLISP, and get free personalized guidance from certified financial advisors.
            </p>
          </div>

          {/* Quick Search & Filter Tabs */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
              {[
                { id: 'all', label: 'All Knowledge' },
                { id: 'renting', label: 'Renting Guide' },
                { id: 'buying', label: 'Buying a Home' },
                { id: 'videos', label: 'Video Masterclasses' },
                { id: 'articles', label: 'Articles & Checklists' },
                { id: 'advisor', label: 'Get a Financial Advisor' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    sound.play('toggle');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-slate-950 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/70'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guides, subsidies, lease..."
                className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:border-slate-800 shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* MAIN CONTENT BODY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        
        {/* ========================================================================= */}
        {/* SECTION A: INTERACTIVE FINANCIAL DECISION ASSISTANT (Crucial for decisions) */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'advisor' || activeTab === 'buying' || activeTab === 'renting') && (
          <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Instant Decision Assistant</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
                  Calculate Your Financial Housing Decisions
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Interactive mathematical models based on South African National Credit Act (NCA) standards.
                </p>
              </div>

              {/* Tool Switcher */}
              <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200 self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => {
                    setDecisionTool('rent-afford');
                    sound.play('toggle');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    decisionTool === 'rent-afford' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Can I Afford This Rent?
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDecisionTool('bond-afford');
                    sound.play('toggle');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    decisionTool === 'bond-afford' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Home Loan & FLISP Eligibility
                </button>
              </div>
            </div>

            {/* TOOL 1: CAN I AFFORD THIS RENT */}
            {decisionTool === 'rent-afford' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
                
                <div className="lg:col-span-6 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Your Monthly Net Take-Home Pay (After Tax & Deductions)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400 text-sm">R</span>
                      <input
                        type="number"
                        value={calcIncome}
                        onChange={(e) => setCalcIncome(Number(e.target.value) || 0)}
                        placeholder="14000"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 font-mono font-bold text-sm focus:bg-white focus:outline-hidden focus:border-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Target Monthly Rent (Room or Apartment)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400 text-sm">R</span>
                      <input
                        type="number"
                        value={calcRent}
                        onChange={(e) => setCalcRent(Number(e.target.value) || 0)}
                        placeholder="4200"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 font-mono font-bold text-sm focus:bg-white focus:outline-hidden focus:border-slate-800"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600 space-y-1">
                    <span className="font-bold text-slate-800">💡 Financial Rule of Thumb:</span>
                    <p>
                      Financial planners strongly recommend spending no more than <strong>30% of take-home pay</strong> on rent. If you go above 35%, emergencies and unexpected medical/transport expenses become stressful.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="p-6 rounded-3xl hero-gradient border border-slate-200/80 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Affordability Verdict
                      </span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${rentStatus.bg}`}>
                        {rentStatus.label}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-3xl sm:text-4xl font-black font-mono text-slate-900">
                        {rentRatio}% <span className="text-sm font-sans font-medium text-slate-500">of your take-home pay</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        You will have <strong className="font-mono text-slate-900">R{(calcIncome - calcRent).toLocaleString()}</strong> left over each month for groceries, utilities, transport, and savings.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Need personal budget help?</span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAdvisor(advisors[0]);
                          setIsAdvisorModalOpen(true);
                          sound.play('click');
                        }}
                        className="font-bold text-slate-950 underline hover:text-emerald-700 cursor-pointer"
                      >
                        Ask an Advisor for Free →
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TOOL 2: HOME LOAN & FLISP SUBSIDY CALCULATOR */}
            {decisionTool === 'bond-afford' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
                
                <div className="lg:col-span-6 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Gross Monthly Household Income (Before Tax)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400 text-sm">R</span>
                      <input
                        type="number"
                        value={grossIncome}
                        onChange={(e) => setGrossIncome(Number(e.target.value) || 0)}
                        placeholder="25000"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 font-mono font-bold text-sm focus:bg-white focus:outline-hidden focus:border-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Available Cash Deposit
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400 text-sm">R</span>
                      <input
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(Number(e.target.value) || 0)}
                        placeholder="50000"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 font-mono font-bold text-sm focus:bg-white focus:outline-hidden focus:border-slate-800"
                      />
                    </div>
                  </div>

                  {flispEstimate > 0 && (
                    <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                      <div className="flex items-center gap-1.5 font-extrabold text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>FLISP Government Subsidy Available!</span>
                      </div>
                      <p>
                        Based on your income of R{grossIncome.toLocaleString()}, you may qualify for an estimated <strong>R{flispEstimate.toLocaleString()} once-off cash subsidy</strong> from the National Department of Human Settlements.
                      </p>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-6">
                  <div className="p-6 rounded-3xl hero-gradient border border-slate-200/80 shadow-xs space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      Estimated Bank Buying Capacity
                    </span>

                    <div className="space-y-1">
                      <div className="text-3xl sm:text-4xl font-black font-mono text-slate-900">
                        R{totalPurchaseCapacity.toLocaleString()}
                      </div>
                      <p className="text-xs text-slate-600">
                        Max Bank Loan: <strong className="font-mono">R{estLoanAmount.toLocaleString()}</strong> + Deposit: <strong className="font-mono">R{Number(depositAmount || 0).toLocaleString()}</strong>
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="p-3 bg-white/80 rounded-xl border border-slate-200/60">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Max Monthly Bond</span>
                        <span className="font-mono font-bold text-slate-900 text-sm">~R{maxMonthlyBondInstallment.toLocaleString()}/mo</span>
                      </div>
                      <div className="p-3 bg-white/80 rounded-xl border border-slate-200/60">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Prime Rate (2026)</span>
                        <span className="font-mono font-bold text-slate-900 text-sm">11.75% / 20 Yrs</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAdvisor(advisors[2]); // Mpho mortgage originator
                        setIsAdvisorModalOpen(true);
                        sound.play('click');
                      }}
                      className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                      <span>Connect with Mortgage Advisor for Pre-Approval</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION B: GET A FINANCIAL ADVISOR (Verified Directory & Booking)        */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'advisor') && (
          <section className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Human Experts</span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight mt-1">
                  Connect with an Accredited Financial Advisor
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Free 15-minute consultations to review your affordability, credit health, and home loan options.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedAdvisor(null);
                  setIsAdvisorModalOpen(true);
                  sound.play('click');
                }}
                className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition cursor-pointer self-start sm:self-center"
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>Book Free 15-Min Session</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {advisors.map((adv) => (
                <div
                  key={adv.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={adv.avatar}
                        alt={adv.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-2xs"
                      />
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-700 transition">
                          {adv.name}
                        </h3>
                        <p className="text-[11px] font-bold text-slate-500">{adv.title}</p>
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-0.5 border border-emerald-200/60">
                          ★ {adv.rating} ({adv.reviewsCount} verified clients)
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 space-y-2 pt-1 border-t border-slate-100">
                      <div className="text-[11px] font-mono text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        {adv.credentials}
                      </div>
                      <p className="line-clamp-3 text-xs leading-relaxed text-slate-600">
                        {adv.bio}
                      </p>
                      <div className="text-[11px] font-bold text-slate-800 pt-1">
                        🎯 Focus: <span className="font-normal text-slate-600">{adv.specialty}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
                      <Clock className="w-3 h-3 shrink-0" />
                      <span className="truncate">{adv.availability}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`https://wa.me/${adv.whatsapp.replace('+', '')}?text=${encodeURIComponent(`Hi ${adv.name}, I found you on the Apartments Advice Portal and would like to ask a quick property question.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sound.play('click')}
                        className="py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-1.5 transition border border-emerald-200"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAdvisor(adv);
                          setIsAdvisorModalOpen(true);
                          sound.play('click');
                        }}
                        className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-2xs cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Book Call</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION C: VIDEO MASTERCLASSES                                            */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'videos' || activeTab === 'renting' || activeTab === 'buying') && (
          <section className="space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                  <Video className="w-3.5 h-3.5" />
                  <span>Video Masterclasses</span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight mt-1">
                  Watch & Learn: Practical Video Guides
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Bite-sized walkthroughs covering tenant rights, FLISP applications, and rent budgeting.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => {
                    setSelectedVideo(video);
                    sound.play('click');
                  }}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col justify-between group cursor-pointer hover:shadow-md transition"
                >
                  <div>
                    {/* Thumbnail with Play Button */}
                    <div className="relative aspect-video overflow-hidden bg-slate-900">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                        <div className="w-11 h-11 rounded-full bg-white/90 group-hover:bg-white text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                          <Play className="w-5 h-5 ml-0.5 fill-slate-950" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-slate-950/80 text-white font-mono font-bold text-[10px]">
                        {video.duration}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <span>{video.category === 'renting' ? '🔑 Renting' : '🏡 Buying'}</span>
                        <span>{video.views}</span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 line-clamp-2 leading-snug group-hover:text-emerald-700 transition">
                        {video.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 text-[11px] font-bold text-emerald-700 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="truncate text-slate-500 font-normal">{video.author}</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition shrink-0">
                      Watch <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION D: ARTICLES, LEGAL RIGHTS & CHECKLISTS                           */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'articles' || activeTab === 'renting' || activeTab === 'buying') && (
          <section className="space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  <FileText className="w-3.5 h-3.5 text-amber-600" />
                  <span>In-Depth Articles & Checklists</span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight mt-1">
                  Tenant Rights, Checklists & Property Insights
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Verified information under South African housing legislation to protect your deposit and pocket.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => {
                    setSelectedArticle(art);
                    sound.play('click');
                  }}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition cursor-pointer group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                        {art.category === 'renting' ? '🔑 Tenant Guide' : '🏡 Buyer Roadmap'}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">{art.readTime}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-slate-950 leading-snug group-hover:text-emerald-700 transition">
                      {art.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {art.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition">
                    <span className="text-slate-400 font-normal text-[11px]">{art.date}</span>
                    <span className="flex items-center gap-1">
                      Read full article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </section>
        )}

      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: VIDEO MASTERCLASS PLAYER MODAL                                    */}
      {/* ========================================================================= */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-slide-up my-auto max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-bold uppercase">
                  {selectedVideo.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">• {selectedVideo.duration}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Simulated Screen */}
            <div className="relative aspect-video bg-slate-950 flex flex-col justify-between overflow-hidden">
              <img
                src={selectedVideo.thumbnail}
                alt={selectedVideo.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="relative z-10 p-4 flex items-center justify-between text-white text-xs bg-gradient-to-b from-black/80 to-transparent">
                <span className="font-bold">{selectedVideo.title}</span>
                <span className="font-mono">{selectedVideo.duration}</span>
              </div>
              
              {/* Big Center Play Icon */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition cursor-pointer">
                  <Play className="w-8 h-8 ml-1 fill-white" />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative z-10 p-3 bg-gradient-to-t from-black/90 to-transparent text-white space-y-1">
                <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-emerald-400 rounded-full"></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-300 font-mono">
                  <span>Playing: 02:45 / {selectedVideo.duration}</span>
                  <span>Presenter: {selectedVideo.author}</span>
                </div>
              </div>
            </div>

            {/* Chapters & Takeaways */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">Overview</h4>
                <p className="text-slate-600 leading-relaxed">{selectedVideo.description}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Video Chapters
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedVideo.chapters.map((ch, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-slate-700"
                    >
                      <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md text-[10px]">
                        {ch.time}
                      </span>
                      <span className="font-medium text-xs truncate">{ch.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-indigo-50/70 rounded-2xl border border-indigo-100 flex items-center justify-between">
                <span className="text-indigo-900 font-medium">Have specific questions about this video?</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedVideo(null);
                    setSelectedAdvisor(advisors[0]);
                    setIsAdvisorModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-indigo-900 text-white font-bold text-xs"
                >
                  Consult an Advisor
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ARTICLE READING MODAL                                             */}
      {/* ========================================================================= */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-slide-up my-auto max-h-[90vh]">
            
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-bold uppercase">
                    {selectedArticle.category === 'renting' ? '🔑 Tenant Legal Guide' : '🏡 Homebuyer Advice'}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">• {selectedArticle.readTime}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-950">
                  {selectedArticle.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer shrink-0 ml-3"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans prose prose-slate max-w-none">
              {selectedArticle.content.split('\n\n').map((para, idx) => {
                if (para.startsWith('### ')) {
                  return (
                    <h4 key={idx} className="text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-100">
                      {para.replace('### ', '')}
                    </h4>
                  );
                }
                if (para.startsWith('- ')) {
                  return (
                    <ul key={idx} className="list-disc pl-5 space-y-1">
                      {para.split('\n').map((li, i) => (
                        <li key={i}>{li.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={idx}>{para}</p>;
              })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Published by Apartments SA Legal & Financial Desk</span>
              <button
                type="button"
                onClick={() => {
                  setSelectedArticle(null);
                  sound.play('click');
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold cursor-pointer hover:bg-slate-800"
              >
                Done Reading
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: BOOK FREE 15-MINUTE FINANCIAL ADVISOR SESSION                     */}
      {/* ========================================================================= */}
      {isAdvisorModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-slide-up my-auto">
            
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Book Free 15-Min Advisor Session
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedAdvisor ? `With ${selectedAdvisor.name}` : 'With an Accredited SA Property Advisor'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAdvisorModalOpen(false);
                  setBookingSuccess(null);
                }}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            {bookingSuccess ? (
              <div className="p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-extrabold text-slate-900">Consultation Confirmed!</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Your request has been routed to <strong>{bookingSuccess.advisorName}</strong>. You will receive a WhatsApp message shortly to confirm your session.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Reference Code:</span>
                    <span className="font-mono font-bold text-slate-900">{bookingSuccess.refId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Topic:</span>
                    <span className="font-bold text-slate-800">{bookingSuccess.topic}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Contact:</span>
                    <span className="font-mono text-slate-800">{bookingSuccess.phone}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsAdvisorModalOpen(false);
                    setBookingSuccess(null);
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs cursor-pointer hover:bg-slate-800"
                >
                  Close & Return
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookAdvisorSubmit} className="p-6 space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    placeholder="e.g. Nomsa Sithole"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-xs focus:bg-white focus:outline-hidden focus:border-slate-800"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                      WhatsApp / Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      placeholder="082 123 4567"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono font-bold text-xs focus:bg-white focus:outline-hidden focus:border-slate-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      placeholder="nomsa@gmail.com"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-xs focus:bg-white focus:outline-hidden focus:border-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    What Advice Do You Need?
                  </label>
                  <select
                    value={bookingForm.topic}
                    onChange={(e) => setBookingForm({ ...bookingForm, topic: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium text-xs focus:outline-hidden cursor-pointer"
                  >
                    <option value="Rental Affordability & Budget Check">Rental Affordability & Budget Check</option>
                    <option value="FLISP Government Subsidy Application">FLISP Government Subsidy Application</option>
                    <option value="Home Loan Pre-Approval & Bank Rates">Home Loan Pre-Approval & Bank Rates</option>
                    <option value="Credit Score Rehabilitation (Boost score for bond)">Credit Score Rehabilitation (Boost score for bond)</option>
                    <option value="Rent vs. Buy 5-Year Financial Decision">Rent vs. Buy 5-Year Financial Decision</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                      Preferred Timing
                    </label>
                    <select
                      value={bookingForm.preferredTime}
                      onChange={(e) => setBookingForm({ ...bookingForm, preferredTime: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium text-xs focus:outline-hidden cursor-pointer"
                    >
                      <option value="Today afternoon (14:00 - 17:00)">Today afternoon (14:00 - 17:00)</option>
                      <option value="Tomorrow morning (09:00 - 12:00)">Tomorrow morning (09:00 - 12:00)</option>
                      <option value="Saturday morning (10:00 - 13:00)">Saturday morning (10:00 - 13:00)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                      Contact Channel
                    </label>
                    <select
                      value={bookingForm.contactMethod}
                      onChange={(e) => setBookingForm({ ...bookingForm, contactMethod: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium text-xs focus:outline-hidden cursor-pointer"
                    >
                      <option value="WhatsApp Call">WhatsApp Voice Call</option>
                      <option value="WhatsApp Chat">WhatsApp Chat Only</option>
                      <option value="Direct Phone Call">Standard Phone Call</option>
                      <option value="Google Meet">Google Meet Video</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Confirm Free 15-Minute Session</span>
                  </button>
                  <p className="text-[10px] text-slate-400 text-center mt-2">
                    🔒 No obligation, no sales push. Accredited independent guidance.
                  </p>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
