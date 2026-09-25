import React, { useState } from 'react';
import {
  FileText,
  ThumbsUp,
  Download,
  ExternalLink,
  Bookmark,
  CheckCircle,
  Share2,
  Flame,
  UserCheck,
  ShieldCheck
} from 'lucide-react';

export default function ResourceCard({
  resource,
  onUpvote,
  onBookmark,
  isBookmarked,
  onSelectResource
}) {
  const [copied, setCopied] = useState(false);

  const handleShare = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(resource.drive_link || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'Notes':
        return 'bg-blue-500/10 text-cyan-400 border-cyan-500/30';
      case 'PYQ':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Lab Manual':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'Formula Sheet':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div
      onClick={() => onSelectResource(resource)}
      className="group bg-slate-900/90 hover:bg-slate-900/95 rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/50 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden backdrop-blur-xl"
    >
      {/* Top Pre-Exam Crash Pack Badge */}
      {resource.is_crash_pack === 1 && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-red-600 via-amber-500 to-orange-500 text-slate-950 text-[10px] font-black uppercase px-3 py-0.5 rounded-bl-xl shadow-md flex items-center space-x-1">
          <Flame className="h-3 w-3 fill-slate-950" />
          <span>Crash Pack</span>
        </div>
      )}

      <div>
        {/* Department & Subject Code Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              {resource.subject_code}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              Sem {resource.semester} • {resource.department_code}
            </span>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookmark(resource.id);
            }}
            className={`p-1.5 rounded-xl transition-colors ${
              isBookmarked
                ? 'text-purple-400 bg-purple-500/20 border border-purple-500/40'
                : 'text-slate-500 hover:text-purple-400 hover:bg-slate-800'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-purple-400' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 line-clamp-2 transition-colors mb-2 font-['Outfit']">
          {resource.title}
        </h3>

        {/* Description */}
        {resource.description && (
          <p className="text-xs text-slate-400 line-clamp-2 mb-3 font-normal leading-relaxed">
            {resource.description}
          </p>
        )}

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${getTypeBadge(resource.type)}`}>
            {resource.type}
          </span>

          {resource.module > 0 ? (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              Module {resource.module}
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              Full Syllabus
            </span>
          )}

          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-800 text-slate-400 border border-slate-800">
            {resource.scheme} Scheme
          </span>
        </div>
      </div>

      {/* Author & Action Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
        
        {/* Contributor badge */}
        <div className="flex items-center space-x-1.5 text-xs text-slate-400">
          <UserCheck className="h-3.5 w-3.5 text-cyan-400" />
          <span className="truncate max-w-[120px] font-semibold">{resource.author_name}</span>
          {resource.is_verified === 1 && (
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 inline" title="Verified BMSBrainBank Material" />
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpvote(resource.id);
            }}
            className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-300 text-xs font-bold flex items-center space-x-1 border border-slate-700 transition-all"
            title="Upvote Quality"
          >
            <ThumbsUp className="h-3.5 w-3.5 text-cyan-400" />
            <span>{resource.upvotes}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Copy Share Link"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
          {copied && (
            <span className="absolute bottom-2 right-12 text-[10px] bg-slate-900 text-white px-2 py-1 rounded border border-slate-700">Copied!</span>
          )}

          <a
            href={resource.drive_link || resource.file_url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-3.5 py-1 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-extrabold flex items-center space-x-1 shadow-md shadow-cyan-500/20 transition-all"
          >
            <span>Open</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

      </div>
    </div>
  );
}
