import React from 'react';
import { Heart, MapPin, ShieldCheck, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Info with Both Logos */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center space-x-3">
            <img
              src="/bms_brainbank_logo.jpg"
              alt="BMSBrainBank Logo"
              className="h-10 w-10 rounded-xl object-cover ring-2 ring-cyan-400/40"
            />
            <div>
              <span className="text-xl font-extrabold text-white font-['Outfit']">
                BMS<span className="text-cyan-400">BrainBank</span>
              </span>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Official Intelligence Vault
              </p>
            </div>

            <span className="text-slate-700">|</span>

            <img
              src="/bmsce_logo.png"
              alt="BMSCE Seal"
              className="h-8 w-8 rounded-full object-contain bg-white/10 p-0.5"
              title="B.M.S. College of Engineering"
            />
          </div>

          <p className="text-xs text-slate-400 max-w-md leading-relaxed">
            BMSBrainBank is the unified academic intelligence repository designed for B.M.S. College of Engineering (BMSCE) students. Built to centralize handwritten lecture notes, CIE midterm papers, SEE question solutions, and lab manuals in one accessible portal.
          </p>

          <div className="flex items-center space-x-1.5 text-xs text-slate-400 pt-1 font-medium">
            <MapPin className="h-3.5 w-3.5 text-rose-500" />
            <span>Bull Temple Road, Basavanagudi, Bengaluru, Karnataka 560019</span>
          </div>
        </div>

        {/* Popular Branches */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-200 mb-3 font-['Outfit']">
            Engineering Branches
          </h4>
          <ul className="space-y-2 text-xs">
            <li><span className="hover:text-cyan-400 cursor-pointer transition-colors">1st Year Physics & Chemistry Cycles</span></li>
            <li><span className="hover:text-cyan-400 cursor-pointer transition-colors">Computer Science (CSE)</span></li>
            <li><span className="hover:text-cyan-400 cursor-pointer transition-colors">Information Science (ISE)</span></li>
            <li><span className="hover:text-cyan-400 cursor-pointer transition-colors">AI & Machine Learning (AIML)</span></li>
            <li><span className="hover:text-cyan-400 cursor-pointer transition-colors">Electronics & Comm. (ECE)</span></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-200 mb-3 font-['Outfit']">
            Vault Categories
          </h4>
          <ul className="space-y-2 text-xs">
            <li><span className="hover:text-cyan-400 cursor-pointer transition-colors">Handwritten Lecture Notes</span></li>
            <li><span className="hover:text-cyan-400 cursor-pointer transition-colors">CIE-1, CIE-2 & CIE-3 Midterm Papers</span></li>
            <li><span className="hover:text-cyan-400 cursor-pointer transition-colors">SEE Final Question Papers & Keys</span></li>
            <li><span className="hover:text-cyan-400 cursor-pointer transition-colors">Pre-Exam Formula Cheat Sheets</span></li>
            <li><span className="hover:text-cyan-400 cursor-pointer transition-colors">2022 NEP Scheme Syllabi</span></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>
          © {new Date().getFullYear()} BMSBrainBank. B.M.S. College of Engineering Academics.
        </div>
        <div className="flex items-center space-x-1.5">
          <span>Crafted with</span>
          <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
          <span>for BMSCE Bengaluru</span>
        </div>
      </div>
    </footer>
  );
}
