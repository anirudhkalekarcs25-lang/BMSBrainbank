import React from 'react';
import { X, ExternalLink, ThumbsUp, Bookmark, Download, ShieldCheck, UserCheck, Tag, FileText } from 'lucide-react';

export default function ResourceDetailModal({ resource, onClose, onUpvote, onBookmark, isBookmarked }) {
  if (!resource) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative transition-colors max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3 pr-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-sky-950 text-sky-400 border border-sky-800">
              {resource.subject_code}
            </span>
            <span className="text-xs font-semibold text-gray-500 dark:text-slate-400">
              Semester {resource.semester} • {resource.department_code} Department
            </span>
            {resource.is_verified === 1 && (
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[11px] font-bold">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Faculty / Rep Verified</span>
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-slate-100 leading-snug">
            {resource.title}
          </h2>
        </div>

        {/* Contributor Information Card */}
        <div className="my-5 p-4 rounded-xl bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-sm">
              {resource.author_name.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 dark:text-slate-100 flex items-center space-x-1">
                <span>{resource.author_name}</span>
                <UserCheck className="h-3.5 w-3.5 text-sky-500" />
              </div>
              <p className="text-xs text-gray-500 dark:text-slate-400 font-mono">
                USN: {resource.author_usn || 'BMSCE Student'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onUpvote(resource.id)}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 hover:bg-sky-50 text-gray-800 dark:text-slate-200 text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-all"
            >
              <ThumbsUp className="h-4 w-4 text-sky-500" />
              <span>{resource.upvotes} Upvotes</span>
            </button>

            <button
              onClick={() => onBookmark(resource.id)}
              className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
                isBookmarked
                  ? 'bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800'
                  : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-200 border-gray-300 dark:border-slate-600'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-purple-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1">
              Description & Notes Overview
            </h4>
            <p className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed bg-gray-50/50 dark:bg-slate-800/40 p-3 rounded-lg border border-gray-100 dark:border-slate-800">
              {resource.description || 'No detailed description provided for this resource.'}
            </p>
          </div>

          {/* Tags */}
          {resource.tags && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1 flex items-center space-x-1">
                <Tag className="h-3.5 w-3.5" />
                <span>Search Tags</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {resource.tags.split(',').map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Direct Action Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="text-xs text-gray-500 dark:text-slate-400">
            Added on: {new Date(resource.created_at || Date.now()).toLocaleDateString()}
          </div>

          <a
            href={resource.drive_link || resource.file_url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-sm shadow-lg shadow-sky-600/30 flex items-center space-x-2 transition-all transform active:scale-95"
          >
            <span>Open Full Resource / PDF</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

      </div>
    </div>
  );
}
