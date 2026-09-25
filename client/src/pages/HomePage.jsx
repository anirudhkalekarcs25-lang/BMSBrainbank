import React from 'react';
import {
  Sparkles,
  BookOpen,
  Zap,
  ShieldCheck,
  Trophy,
  Upload,
  Search,
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  Flame,
  CheckCircle2,
  FileText,
  Layers,
  GraduationCap
} from 'lucide-react';
import ResourceCard from '../components/ResourceCard';

export default function HomePage({
  resources,
  departments,
  onNavigate,
  onUpvote,
  onBookmark,
  bookmarks,
  onSelectResource
}) {
  const topResources = [...resources].sort((a, b) => b.upvotes - a.upvotes).slice(0, 6);

  const stats = [
    { label: 'Verified Materials', value: '250+', icon: BookOpen, color: 'from-cyan-400 to-blue-500' },
    { label: 'BMSCE Departments', value: '10+', icon: GraduationCap, color: 'from-purple-400 to-pink-500' },
    { label: 'Active Student Users', value: '1.2K+', icon: Users, color: 'from-emerald-400 to-teal-500' },
    { label: 'Community Rating', value: '4.9 ★', icon: Trophy, color: 'from-amber-400 to-orange-500' },
  ];

  const branchCards = [
    { code: 'P-CYCLE', name: '1st Year Physics Cycle', desc: 'Math 1, Physics, Programming in C, Basic Electrical', color: 'from-blue-600 to-cyan-500', tag: '1st Year' },
    { code: 'C-CYCLE', name: '1st Year Chemistry Cycle', desc: 'Math 2, Chemistry, Basic Electronics, Mechanics', color: 'from-emerald-600 to-teal-500', tag: '1st Year' },
    { code: 'CSE', name: 'Computer Science (CSE)', desc: 'DSA, DAA, COA, OS, DBMS, Software Engineering', color: 'from-purple-600 to-indigo-600', tag: 'Core Branch' },
    { code: 'ISE', name: 'Information Science (ISE)', desc: 'Web Tech, Software Eng, Networks, Java, Cryptography', color: 'from-cyan-600 to-blue-600', tag: 'Core Branch' },
    { code: 'AIML', name: 'AI & Machine Learning', desc: 'Machine Learning, Neural Networks, Image Processing', color: 'from-pink-600 to-rose-600', tag: 'Specialization' },
    { code: 'ECE', name: 'Electronics & Comm.', desc: 'NAL Network Analysis, ARM Processor, DSP, VLSI', color: 'from-amber-600 to-orange-600', tag: 'Core Branch' },
  ];

  return (
    <div className="space-y-16 pb-16 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-[580px] flex items-center justify-center pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        
        {/* Animated Background Mesh Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-purple-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          
          {/* Top Pill Header */}
          <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-500/40 shadow-2xl backdrop-blur-xl animate-float">
            <img src="/bmsce_logo.png" alt="BMSCE Seal" className="h-6 w-6 rounded-full object-contain p-0.5 bg-white/10" />
            <span className="text-xs font-bold text-white tracking-wide">B.M.S. College of Engineering</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-extrabold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center space-x-1">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              <span>Official Academic Vault</span>
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-7xl font-black tracking-tight text-white leading-[1.1] font-['Outfit']">
              BMS<span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">BrainBank</span>
            </h1>
            <p className="text-slate-300 text-lg sm:text-2xl max-w-3xl mx-auto font-normal leading-relaxed">
              The ultimate academic intelligence platform for BMSCE. Instant access to peer-verified <span className="text-cyan-400 font-bold">Notes, CIE Midterm Papers, SEE PYQs & Lab Manuals</span>.
            </p>
          </div>

          {/* Action Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('explorer')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 text-slate-950 font-black text-base shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] transition-all flex items-center space-x-2"
            >
              <Search className="h-5 w-5 stroke-[2.5]" />
              <span>Explore Vault Materials</span>
              <ArrowRight className="h-5 w-5 stroke-[2.5]" />
            </button>

            <button
              onClick={() => onNavigate('crashpack')}
              className="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-400 font-extrabold text-base shadow-xl hover:border-amber-400 transition-all flex items-center space-x-2"
            >
              <Flame className="h-5 w-5 text-amber-400 fill-amber-400 animate-bounce" />
              <span>Pre-Exam Crash Pack</span>
            </button>
          </div>

          {/* Stats Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-4xl mx-auto">
            {stats.map((st, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-xl flex flex-col items-center justify-center space-y-1 hover:border-cyan-500/30 transition-all">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${st.color} flex items-center justify-center text-slate-950 font-bold mb-1 shadow-md`}>
                  <st.icon className="h-5 w-5 text-slate-950 stroke-[2.5]" />
                </div>
                <div className="text-2xl font-black text-white font-['Outfit']">{st.value}</div>
                <div className="text-xs font-semibold text-slate-400">{st.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Quick Department / Cycle Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-cyan-400 mb-1 flex items-center space-x-1">
              <Layers className="h-4 w-4" />
              <span>Branch & Cycle Directories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
              Select Your Department
            </h2>
          </div>

          <button
            onClick={() => onNavigate('explorer')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
          >
            <span>View All Departments</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branchCards.map((b, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate('explorer', { dept: b.code })}
              className="group bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-3xl p-6 shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden backdrop-blur-xl flex flex-col justify-between hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    {b.tag}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-cyan-400">
                    {b.code}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-['Outfit']">
                  {b.name}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {b.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-cyan-400">
                <span>Browse Notes & PYQs</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Upvoted Study Materials Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-400 mb-1 flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span>Community Highest Rated</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
              Trending Notes & Papers
            </h2>
          </div>

          <button
            onClick={() => onNavigate('explorer')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
          >
            <span>Explore All Materials</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onUpvote={onUpvote}
              onBookmark={onBookmark}
              isBookmarked={bookmarks.includes(resource.id)}
              onSelectResource={onSelectResource}
            />
          ))}
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="space-y-4 lg:col-span-1">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Designed for BMSCE
              </span>
              <h2 className="text-3xl font-extrabold text-white font-['Outfit']">
                Why BMSBrainBank Beats Other Note Platforms
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Built from the ground up to address fragmented WhatsApp drives and missing CIE solution keys.
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                  <Flame className="h-5 w-5 text-amber-400" />
                </div>
                <h4 className="text-sm font-bold text-white font-['Outfit']">Pre-Exam Crash Pack</h4>
                <p className="text-xs text-slate-400">1-click panic button filtering formula sheets, CIE midterms, and SEE paper solutions for last-minute revision.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                </div>
                <h4 className="text-sm font-bold text-white font-['Outfit']">Faculty & Rep Verified</h4>
                <p className="text-xs text-slate-400">Verification badges ensure every uploaded document aligns with the official BMSCE 2022 NEP syllabus.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                  <Trophy className="h-5 w-5 text-amber-400" />
                </div>
                <h4 className="text-sm font-bold text-white font-['Outfit']">Contributor Hall of Fame</h4>
                <p className="text-xs text-slate-400">Gamified leaderboard rewarding BMSCE student contributors with badges based on peer upvotes.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                  <Zap className="h-5 w-5 text-cyan-400" />
                </div>
                <h4 className="text-sm font-bold text-white font-['Outfit']">Instant Drive & PDF Access</h4>
                <p className="text-xs text-slate-400">Direct cloud PDF viewing without registration walls, paywalls, or forced file downloads.</p>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
