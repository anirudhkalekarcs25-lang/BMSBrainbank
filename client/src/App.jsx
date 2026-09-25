import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSearch from './components/HeroSearch';
import FilterBar from './components/FilterBar';
import ResourceGrid from './components/ResourceGrid';
import ResourceDetailModal from './components/ResourceDetailModal';
import CrashPack from './components/CrashPack';
import UploadModal from './components/UploadModal';
import RequestModal from './components/RequestModal';
import Leaderboard from './components/Leaderboard';
import Footer from './components/Footer';

export default function App() {
  const [resources, setResources] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedSem, setSelectedSem] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedScheme, setSelectedScheme] = useState('ALL');
  const [selectedModule, setSelectedModule] = useState('ALL');

  // Mode & Tabs State
  const [isCrashPackActive, setIsCrashPackActive] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'leaderboard', 'bookmarks'

  // Modals
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  // Bookmarks (saved in localStorage)
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('bmsce_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bmsce_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Fetch Departments & Subjects on boot
  useEffect(() => {
    fetch('/api/departments')
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error('Failed to fetch departments:', err));

    fetch('/api/subjects')
      .then((res) => res.json())
      .then((data) => setSubjects(data))
      .catch((err) => console.error('Failed to fetch subjects:', err));
  }, []);

  // Fetch Resources with Filters
  const fetchResources = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (selectedDept !== 'ALL') params.append('dept', selectedDept);
    if (selectedSem !== 'ALL') params.append('sem', selectedSem);
    if (selectedType !== 'ALL') params.append('type', selectedType);
    if (selectedScheme !== 'ALL') params.append('scheme', selectedScheme);
    if (selectedModule !== 'ALL') params.append('module', selectedModule);
    if (isCrashPackActive) params.append('crashPack', 'true');

    fetch(`/api/resources?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setResources(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch resources:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchResources();
  }, [searchQuery, selectedDept, selectedSem, selectedType, selectedScheme, selectedModule, isCrashPackActive]);

  // Upvote Handler
  const handleUpvote = async (id) => {
    try {
      const res = await fetch(`/api/resources/${id}/upvote`, { method: 'POST' });
      const updated = await res.json();
      setResources((prev) =>
        prev.map((r) => (r.id === id ? { ...r, upvotes: updated.upvotes } : r))
      );
      if (selectedResource && selectedResource.id === id) {
        setSelectedResource((prev) => ({ ...prev, upvotes: updated.upvotes }));
      }
    } catch (err) {
      console.error('Upvote failed:', err);
    }
  };

  // Bookmark Toggle
  const handleBookmarkToggle = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((bId) => bId !== id) : [...prev, id]
    );
  };

  // Reset Filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDept('ALL');
    setSelectedSem('ALL');
    setSelectedType('ALL');
    setSelectedScheme('ALL');
    setSelectedModule('ALL');
    setIsCrashPackActive(false);
  };

  // Filter for Bookmarks view
  const displayedResources = activeTab === 'bookmarks'
    ? resources.filter((r) => bookmarks.includes(r.id))
    : resources;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-colors">
      
      {/* Top Navigation */}
      <Navbar
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenRequest={() => setIsRequestOpen(true)}
        onToggleCrashPack={() => {
          setIsCrashPackActive(!isCrashPackActive);
          setActiveTab('all');
        }}
        isCrashPackActive={isCrashPackActive}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarkCount={bookmarks.length}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeTab === 'leaderboard' ? (
          <Leaderboard />
        ) : (
          <>
            {/* Hero Search Section */}
            <HeroSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedDept={selectedDept}
              setSelectedDept={setSelectedDept}
              onToggleCrashPack={() => setIsCrashPackActive(!isCrashPackActive)}
              isCrashPackActive={isCrashPackActive}
            />

            {/* Filter Controls Bar */}
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
              totalResults={displayedResources.length}
            />

            {/* Crash Pack Mode Drawer */}
            {isCrashPackActive && (
              <CrashPack
                resources={resources}
                onUpvote={handleUpvote}
                onBookmark={handleBookmarkToggle}
                bookmarks={bookmarks}
                onSelectResource={setSelectedResource}
              />
            )}

            {/* Resource Cards Grid */}
            <ResourceGrid
              resources={displayedResources}
              loading={loading}
              onUpvote={handleUpvote}
              onBookmark={handleBookmarkToggle}
              bookmarks={bookmarks}
              onSelectResource={setSelectedResource}
              onOpenUpload={() => setIsUploadOpen(true)}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        departments={departments}
        subjects={subjects}
        onUploadSuccess={(newRes) => {
          setResources([newRes, ...resources]);
          fetchResources();
        }}
      />

      <RequestModal
        isOpen={isRequestOpen}
        onClose={() => setIsRequestOpen(false)}
        departments={departments}
      />

      <ResourceDetailModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
        onUpvote={handleUpvote}
        onBookmark={handleBookmarkToggle}
        isBookmarked={selectedResource ? bookmarks.includes(selectedResource.id) : false}
      />

    </div>
  );
}
