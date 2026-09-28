import React from 'react';
import { Search, Sparkles, ShieldCheck, Flame, Zap, BrainCircuit, CheckCircle2 } from 'lucide-react';

export default function HeroSearch({ searchQuery, setSearchQuery, selectedDept, setSelectedDept, onToggleCrashPack, isCrashPackActive }) {
  const quickTags = [
    { label: 'Data Structures (22CS3DCDSA)', dept: 'CSE', query: '22CS3DCDSA' },
    { label: 'Calculus Math-1 (22MA1BSMTH)', dept: 'P-CYCLE', query: '22MA1BSMTH' },
    { label: 'DAA Algorithms (22CS4DCDAA)', dept: 'CSE', query: '22CS4DCDAA' },
    { label: 'Physics Cycle Notes', dept: 'P-CYCLE', query: 'Physics' },
    { label: 'SEE 2024 Question Papers', query: 'SEE 2024' },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
      
      {/* Background Decorative Glow Effects */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-red-600/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-7">
        
        {/* College Seal & Brand Badge */}
        <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-semibold backdrop-blur-xl shadow-xl">
          <img src="/bmsce_logo.png" alt="BMSCE Seal" className="h-6 w-6 rounded-full object-contain" />
          <span className="font-extrabold text-white">B.M.S. College of Engineering</span>
          <span className="text-slate-500">•</span>
          <span className="text-cyan-400 font-bold flex items-center space-x-1">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <span>Official Academic Vault</span>
          </span>
        </div>

        {/* Hero Headline */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.15] font-['Outfit']">
            BMS<span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">BrainBank</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Instant access to verified <span className="text-cyan-400 font-bold">Notes, PYQs, CIE papers & Lab Manuals</span> curated specifically for BMSCE engineering students.
          </p>
        </div>

        {/* Instant Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="relative flex items-center group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cyan-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Subject Code (e.g. 22CS3DCDSA), Subject Name, or Keyword..."
              className="w-full pl-11 pr-24 py-4 rounded-2xl bg-slate-900/95 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm sm:text-base shadow-2xl backdrop-blur-xl transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Quick Tag Recommendations */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-semibold flex items-center mr-1">
            <Sparkles className="h-3.5 w-3.5 text-amber-400 mr-1" /> Quick searches:
          </span>
          {quickTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSearchQuery(tag.query);
                if (tag.dept) setSelectedDept(tag.dept);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all hover:text-white hover:border-cyan-500/40 text-[11px] font-semibold"
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Pre-Exam Banner Callout */}
        <div className="pt-3">
          <button
            onClick={onToggleCrashPack}
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all shadow-xl ${
              isCrashPackActive
                ? 'bg-gradient-to-r from-red-600 via-amber-500 to-amber-400 text-slate-950 ring-2 ring-amber-300 shadow-amber-500/30'
                : 'bg-gradient-to-r from-red-700 via-rose-600 to-amber-600 text-white hover:from-red-600 hover:to-amber-500 shadow-red-950/50'
            }`}
          >
            <Flame className="h-5 w-5 text-amber-300 animate-bounce" />
            <span>
              {isCrashPackActive ? '🔥 Active Mode: Pre-Exam Crash Pack (CIE/SEE)' : '⚡ Exams coming up? Switch to Pre-Exam Crash Pack'}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
