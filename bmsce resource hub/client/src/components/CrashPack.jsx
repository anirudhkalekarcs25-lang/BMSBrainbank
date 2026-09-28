import React from 'react';
import { Flame, CheckCircle, Zap, ShieldAlert, Sparkles, FileText, ArrowRight } from 'lucide-react';
import ResourceCard from './ResourceCard';

export default function CrashPack({ resources, onUpvote, onBookmark, bookmarks, onSelectResource }) {
  const crashResources = resources.filter(r => r.is_crash_pack === 1 || r.type === 'Formula Sheet' || r.type === 'PYQ');

  return (
    <div className="bg-amber-500/5 dark:bg-amber-950/20 py-8 border-b border-amber-200 dark:border-amber-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Alert Card */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/20 text-yellow-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Zap className="h-4 w-4 text-yellow-300" />
              <span>BMSCE CIE & SEE Exam Mode</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Pre-Exam Crash Prep Vault
            </h2>

            <p className="text-amber-100 text-sm sm:text-base font-medium leading-relaxed">
              Facing exams in less than 24 hours? Here are the top-rated formula cheat sheets, previous year question paper keys, and quick revision notes compiled specifically for BMSCE midterms and semester finals.
            </p>
          </div>

          <Flame className="absolute -right-8 -bottom-8 h-64 w-64 text-amber-400/20 pointer-events-none" />
        </div>

        {/* High Priority Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-extrabold text-gray-900 dark:text-slate-100">
                Essential Exam Materials ({crashResources.length})
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {crashResources.map((resource) => (
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
        </div>

      </div>
    </div>
  );
}
