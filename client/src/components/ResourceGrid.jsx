import React from 'react';
import ResourceCard from './ResourceCard';
import { BookOpen, SearchX, PlusCircle } from 'lucide-react';

export default function ResourceGrid({
  resources,
  loading,
  onUpvote,
  onBookmark,
  bookmarks,
  onSelectResource,
  onOpenUpload
}) {
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className="h-56 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700/60 p-6 animate-pulse flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/3" />
              <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full" />
            </div>
            <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (resources.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
        <div className="h-16 w-16 bg-blue-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 rounded-full flex items-center justify-center mx-auto">
          <SearchX className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-slate-200">
          No study materials found for this filter
        </h3>
        <p className="text-sm text-gray-500 dark:text-slate-400 max-w-md mx-auto">
          We couldn't find any uploaded notes or PYQs matching your search. Be the first BMSCE student to contribute materials for this subject!
        </p>
        <button
          onClick={onOpenUpload}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-all"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Upload Study Material Now</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
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
  );
}
