import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import ResourceGrid from '../components/ResourceGrid';
import { Search, LayoutGrid, List, RotateCcw, Filter, Sparkles } from 'lucide-react';

export default function ExplorerPage({
  resources,
  departments,
  loading,
  searchQuery,
  setSearchQuery,
  selectedDept,
  setSelectedDept,
  selectedSem,
  setSelectedSem,
  selectedType,
  setSelectedType,
  selectedScheme,
  setSelectedScheme,
  selectedModule,
  setSelectedModule,
  resetFilters,
  onUpvote,
  onBookmark,
  bookmarks,
  onSelectResource,
  onOpenUpload
}) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>BMSCE Academic Repository</span>
              </div>
              <h1 className="text-3xl font-black text-white font-['Outfit']">
                Vault Intelligence Explorer
              </h1>
              <p className="text-xs text-slate-400">
                Filter and search through 250+ lecture notes, CIE midterm keys, and SEE papers across BMSCE departments.
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all ${
                  viewMode === 'list'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>

          {/* Instant Search Bar */}
          <div className="relative max-w-3xl">
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cyan-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Subject Code (e.g. 22CS3DCDSA), Subject Title, or Topic..."
                className="w-full pl-11 pr-24 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm shadow-xl font-semibold"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 px-3 py-1 rounded-xl bg-slate-800 text-xs font-semibold text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Filter Control Bar */}
      <FilterBar
        departments={departments}
        selectedDept={selectedDept}
        setSelectedDept={setSelectedDept}
        selectedSem={selectedSem}
        setSelectedSem={setSelectedSem}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedScheme={selectedScheme}
        setSelectedScheme={setSelectedScheme}
        selectedModule={selectedModule}
        setSelectedModule={setSelectedModule}
        resetFilters={resetFilters}
        totalResults={resources.length}
      />

      {/* Results View */}
      {viewMode === 'grid' ? (
        <ResourceGrid
          resources={resources}
          loading={loading}
          onUpvote={onUpvote}
          onBookmark={onBookmark}
          bookmarks={bookmarks}
          onSelectResource={onSelectResource}
          onOpenUpload={onOpenUpload}
        />
      ) : (
        /* Compact List View */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden divide-y divide-slate-800">
            {resources.map((r) => (
              <div
                key={r.id}
                onClick={() => onSelectResource(r)}
                className="p-4 hover:bg-slate-800/60 transition-colors flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      {r.subject_code}
                    </span>
                    <span className="text-xs text-slate-400">
                      Sem {r.semester} • {r.department_code} • {r.scheme} Scheme
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                      {r.type}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-['Outfit']">{r.title}</h4>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpvote(r.id);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:text-cyan-400 flex items-center space-x-1"
                  >
                    <span>👍 {r.upvotes}</span>
                  </button>

                  <a
                    href={r.drive_link || r.file_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-1.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-black"
                  >
                    Open
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
