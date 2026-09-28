import React from 'react';
import { Upload, HelpCircle, Trophy, Moon, Sun, Flame, Sparkles, Home, Search, PlusCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({
  currentPage,
  setCurrentPage,
  onOpenUpload,
  onOpenRequest,
  bookmarkCount
}) {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-slate-950/90 border-b border-slate-800/80 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-2.5">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setCurrentPage('home')}>
          {/* Custom BMSBrainBank Logo */}
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
                BMS<span className="text-white">BrainBank</span>
              </span>
              <span className="text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                VAULT
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium -mt-0.5">
              B.M.S. College of Engineering
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="hidden lg:flex items-center space-x-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setCurrentPage('home')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition-all ${
              currentPage === 'home'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setCurrentPage('explorer')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition-all ${
              currentPage === 'explorer'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Search className="h-3.5 w-3.5" />
            <span>Vault Explorer</span>
          </button>

          <button
            onClick={() => setCurrentPage('crashpack')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center space-x-1.5 transition-all ${
              currentPage === 'crashpack'
                ? 'bg-gradient-to-r from-red-600 via-amber-500 to-amber-400 text-slate-950 shadow-lg shadow-red-600/30 animate-pulse'
                : 'text-amber-400 hover:bg-amber-950/40'
            }`}
          >
            <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            <span>Crash Pack ⚡</span>
          </button>

          <button
            onClick={() => setCurrentPage('requests')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition-all ${
              currentPage === 'requests'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Request Desk</span>
          </button>

          <button
            onClick={() => setCurrentPage('leaderboard')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition-all ${
              currentPage === 'leaderboard'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Trophy className="h-3.5 w-3.5 text-amber-400" />
            <span>Hall of Fame</span>
          </button>

          <button
            onClick={() => setCurrentPage('bookmarks')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition-all ${
              currentPage === 'bookmarks'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
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

        {/* Action Controls & Official College Logo */}
        <div className="flex items-center space-x-2.5">
          
          {/* Official BMSCE Seal Badge */}
          <div className="hidden sm:flex items-center space-x-2 pl-2 border-r border-slate-800 pr-3" title="Official B.M.S. College of Engineering Seal">
            <img
              src="/bmsce_logo.png"
              alt="BMSCE Official Seal"
              className="h-8 w-8 rounded-full object-contain bg-white/10 p-0.5 ring-1 ring-slate-700"
            />
            <div className="text-[10px] font-semibold text-slate-300 leading-tight">
              <div className="font-extrabold text-white">BMSCE</div>
              <div className="text-slate-400">Estd. 1946</div>
            </div>
          </div>

          {/* Upload Button */}
          <button
            onClick={onOpenUpload}
            className="px-4 py-2 text-xs font-black text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:from-cyan-300 hover:to-sky-200 rounded-xl shadow-lg shadow-cyan-500/25 flex items-center space-x-1.5 transition-all transform active:scale-95"
          >
            <Upload className="h-4 w-4 text-slate-950 stroke-[2.5]" />
            <span>Upload</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all border border-slate-800"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-300" />}
          </button>
        </div>

      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex lg:hidden overflow-x-auto px-4 py-2 bg-slate-900/90 border-t border-slate-800 space-x-2 scrollbar-none">
        <button
          onClick={() => setCurrentPage('home')}
          className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${currentPage === 'home' ? 'bg-cyan-500 text-slate-950' : 'text-slate-300'}`}
        >
          Home
        </button>
        <button
          onClick={() => setCurrentPage('explorer')}
          className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${currentPage === 'explorer' ? 'bg-cyan-500 text-slate-950' : 'text-slate-300'}`}
        >
          Explorer
        </button>
        <button
          onClick={() => setCurrentPage('crashpack')}
          className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${currentPage === 'crashpack' ? 'bg-gradient-to-r from-red-600 to-amber-500 text-slate-950' : 'text-amber-400'}`}
        >
          Crash Pack ⚡
        </button>
        <button
          onClick={() => setCurrentPage('requests')}
          className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${currentPage === 'requests' ? 'bg-cyan-500 text-slate-950' : 'text-slate-300'}`}
        >
          Requests
        </button>
        <button
          onClick={() => setCurrentPage('leaderboard')}
          className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${currentPage === 'leaderboard' ? 'bg-cyan-500 text-slate-950' : 'text-slate-300'}`}
        >
          Hall of Fame
        </button>
        <button
          onClick={() => setCurrentPage('bookmarks')}
          className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${currentPage === 'bookmarks' ? 'bg-cyan-500 text-slate-950' : 'text-slate-300'}`}
        >
          Saved ({bookmarkCount})
        </button>
      </div>
    </header>
  );
}
