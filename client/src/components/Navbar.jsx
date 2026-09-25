import React from 'react';
import { Upload, HelpCircle, Trophy, Moon, Sun, Flame, Sparkles, BrainCircuit } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({
  onOpenUpload,
  onOpenRequest,
  onToggleCrashPack,
  isCrashPackActive,
  activeTab,
  setActiveTab,
  bookmarkCount
}) {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/85 dark:bg-slate-950/90 border-b border-slate-800/80 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-2">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab('all')}>
          {/* Custom BMSBrainBank Logo Mark */}
          <div className="relative">
            <img
              src="/bms_brainbank_logo.jpg"
              alt="BMSBrainBank Official Logo"
              className="h-11 w-11 rounded-xl object-cover ring-2 ring-cyan-400/40 group-hover:ring-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/20"
            />
            <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 bg-emerald-500 rounded-full border-2 border-slate-950" title="System Live" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent group-hover:from-white group-hover:to-cyan-300 transition-all font-['Outfit']">
                BMS<span className="text-white dark:text-white">BrainBank</span>
              </span>
              <span className="text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                VAULT
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium -mt-0.5 flex items-center space-x-1">
              <span>B.M.S. College of Engineering</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="hidden md:flex items-center space-x-1 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all' && !isCrashPackActive
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            All Materials
          </button>

          <button
            onClick={onToggleCrashPack}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition-all ${
              isCrashPackActive
                ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-lg shadow-red-600/30 animate-pulse'
                : 'text-amber-400 hover:bg-amber-950/40'
            }`}
          >
            <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            <span>Crash Pack (CIE/SEE)</span>
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all ${
              activeTab === 'leaderboard'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Trophy className="h-3.5 w-3.5 text-amber-400" />
            <span>Hall of Fame</span>
          </button>

          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
              activeTab === 'bookmarks'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>Saved</span>
            {bookmarkCount > 0 && (
              <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-purple-500 text-white font-black">
                {bookmarkCount}
              </span>
            )}
          </button>
        </div>

        {/* Action Controls & Official College Logo Badge */}
        <div className="flex items-center space-x-2.5">
          
          {/* Official BMSCE Seal */}
          <div className="hidden lg:flex items-center space-x-2 pl-2 border-r border-slate-800 pr-3" title="Official B.M.S. College of Engineering Seal">
            <img
              src="/bmsce_logo.png"
              alt="BMSCE Official Seal"
              className="h-9 w-9 rounded-full object-contain bg-white/10 p-0.5 ring-1 ring-slate-700"
            />
            <div className="text-[10px] font-semibold text-slate-300 leading-tight">
              <div className="font-extrabold text-white">BMSCE</div>
              <div className="text-slate-400">Estd. 1946</div>
            </div>
          </div>

          {/* Request Notes Button */}
          <button
            onClick={onOpenRequest}
            className="px-3 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-700/80 rounded-xl flex items-center space-x-1.5 transition-all"
          >
            <HelpCircle className="h-4 w-4 text-cyan-400" />
            <span className="hidden sm:inline">Request Notes</span>
          </button>

          {/* Upload Button */}
          <button
            onClick={onOpenUpload}
            className="px-4 py-2 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:from-cyan-300 hover:to-sky-200 rounded-xl shadow-lg shadow-cyan-500/25 flex items-center space-x-1.5 transition-all transform active:scale-95"
          >
            <Upload className="h-4 w-4 text-slate-950 stroke-[2.5]" />
            <span>Upload</span>
          </button>

          {/* Dark/Light Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all border border-slate-800"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-300" />}
          </button>
        </div>

      </div>
    </header>
  );
}
