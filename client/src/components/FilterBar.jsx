import React from 'react';
import { Filter, RotateCcw, Layers, BookMarked, GraduationCap, Clock } from 'lucide-react';

export default function FilterBar({
  departments,
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
  totalResults
}) {
  const resourceTypes = [
    { value: 'ALL', label: 'All Material Types' },
    { value: 'Notes', label: '📝 Lecture Notes' },
    { value: 'PYQ', label: '📄 PYQs & Solutions' },
    { value: 'Lab Manual', label: '🧪 Lab Manuals' },
    { value: 'Formula Sheet', label: '⚡ Formula Cheat Sheets' },
    { value: 'Syllabus', label: '📌 Syllabus Copies' },
  ];

  const semesters = [
    { value: 'ALL', label: 'All Semesters' },
    { value: '1', label: 'Semester 1' },
    { value: '2', label: 'Semester 2' },
    { value: '3', label: 'Semester 3' },
    { value: '4', label: 'Semester 4' },
    { value: '5', label: 'Semester 5' },
    { value: '6', label: 'Semester 6' },
    { value: '7', label: 'Semester 7' },
    { value: '8', label: 'Semester 8' },
  ];

  const schemes = [
    { value: 'ALL', label: 'All Schemes' },
    { value: '2022', label: '2022 Scheme (NEP)' },
    { value: '2021', label: '2021 Scheme' },
    { value: '2025', label: '2025 Scheme' },
  ];

  const modules = [
    { value: 'ALL', label: 'All Modules' },
    { value: '1', label: 'Module 1' },
    { value: '2', label: 'Module 2' },
    { value: '3', label: 'Module 3' },
    { value: '4', label: 'Module 4' },
    { value: '5', label: 'Module 5' },
  ];

  const hasActiveFilters = selectedDept !== 'ALL' || selectedSem !== 'ALL' || selectedType !== 'ALL' || selectedScheme !== 'ALL' || selectedModule !== 'ALL';

  return (
    <div className="bg-slate-900/90 dark:bg-slate-900/90 border-b border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8 shadow-md backdrop-blur-md">
      <div className="max-w-7xl mx-auto space-y-3.5">
        
        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-cyan-400" />
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-300">
              Filter Vault Intelligence
            </h2>
            <span className="ml-2 px-2.5 py-0.5 rounded-md text-[11px] font-extrabold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {totalResults} items
            </span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-rose-400 hover:text-rose-300 font-extrabold flex items-center space-x-1 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Filter Selection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          
          {/* Department Select */}
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
              Branch / Cycle
            </label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full text-xs py-2 px-3 rounded-xl bg-slate-950 border border-slate-700/80 text-slate-200 focus:ring-2 focus:ring-cyan-400 focus:outline-none font-semibold"
            >
              <option value="ALL">All Branches & Cycles</option>
              {departments.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.code} ({d.name})
                </option>
              ))}
            </select>
          </div>

          {/* Semester Select */}
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
              Semester
            </label>
            <select
              value={selectedSem}
              onChange={(e) => setSelectedSem(e.target.value)}
              className="w-full text-xs py-2 px-3 rounded-xl bg-slate-950 border border-slate-700/80 text-slate-200 focus:ring-2 focus:ring-cyan-400 focus:outline-none font-semibold"
            >
              {semesters.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Resource Type */}
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
              Material Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full text-xs py-2 px-3 rounded-xl bg-slate-950 border border-slate-700/80 text-slate-200 focus:ring-2 focus:ring-cyan-400 focus:outline-none font-semibold"
            >
              {resourceTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Scheme Select */}
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
              BMSCE Scheme
            </label>
            <select
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
              className="w-full text-xs py-2 px-3 rounded-xl bg-slate-950 border border-slate-700/80 text-slate-200 focus:ring-2 focus:ring-cyan-400 focus:outline-none font-semibold"
            >
              {schemes.map((sc) => (
                <option key={sc.value} value={sc.value}>
                  {sc.label}
                </option>
              ))}
            </select>
          </div>

          {/* Module Select */}
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
              Module
            </label>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full text-xs py-2 px-3 rounded-xl bg-slate-950 border border-slate-700/80 text-slate-200 focus:ring-2 focus:ring-cyan-400 focus:outline-none font-semibold"
            >
              {modules.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>
    </div>
  );
}
