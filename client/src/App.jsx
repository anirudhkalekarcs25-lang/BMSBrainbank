import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ExplorerPage from './pages/ExplorerPage';
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

  // Page Routing State ('home', 'explorer', 'crashpack', 'requests', 'leaderboard', 'bookmarks')
  const [currentPage, setCurrentPage] = useState('home');

  // Filters State for Explorer
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedSem, setSelectedSem] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedScheme, setSelectedScheme] = useState('ALL');
  const [selectedModule, setSelectedModule] = useState('ALL');

  // Modals State
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
    if (currentPage === 'crashpack') params.append('crashPack', 'true');

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
  }, [searchQuery, selectedDept, selectedSem, selectedType, selectedScheme, selectedModule, currentPage]);

  // Navigation Handler
  const handleNavigate = (page, filterObj = {}) => {
    setCurrentPage(page);
    if (filterObj.dept) setSelectedDept(filterObj.dept);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
  };

  // Filtered resources for Bookmarks tab
  const displayedResources = currentPage === 'bookmarks'
    ? resources.filter((r) => bookmarks.includes(r.id))
    : resources;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-400 selection:text-slate-950 font-['Plus_Jakarta_Sans'] transition-colors">
      
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenRequest={() => setIsRequestOpen(true)}
        bookmarkCount={bookmarks.length}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage
            resources={resources}
            departments={departments}
            onNavigate={handleNavigate}
            onUpvote={handleUpvote}
            onBookmark={handleBookmarkToggle}
            bookmarks={bookmarks}
            onSelectResource={setSelectedResource}
          />
        )}

        {currentPage === 'explorer' && (
          <ExplorerPage
            resources={displayedResources}
            departments={departments}
            loading={loading}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
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
            onUpvote={handleUpvote}
            onBookmark={handleBookmarkToggle}
            bookmarks={bookmarks}
            onSelectResource={setSelectedResource}
            onOpenUpload={() => setIsUploadOpen(true)}
          />
        )}

        {currentPage === 'crashpack' && (
          <div className="py-8">
            <CrashPack
              resources={resources}
              onUpvote={handleUpvote}
              onBookmark={handleBookmarkToggle}
              bookmarks={bookmarks}
              onSelectResource={setSelectedResource}
            />
          </div>
        )}

        {currentPage === 'leaderboard' && (
          <div className="py-8">
            <Leaderboard />
          </div>
        )}

        {currentPage === 'requests' && (
          <div className="max-w-4xl mx-auto py-12 px-4">
            <RequestModal
              isOpen={true}
              onClose={() => setCurrentPage('home')}
              departments={departments}
            />
          </div>
        )}

        {currentPage === 'bookmarks' && (
          <div className="max-w-7xl mx-auto py-12 px-4 space-y-6">
            <h2 className="text-3xl font-black text-white font-['Outfit']">
              Your Bookmarked Notes & Papers ({displayedResources.length})
            </h2>
            <ExplorerPage
              resources={displayedResources}
              departments={departments}
              loading={loading}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
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
              onUpvote={handleUpvote}
              onBookmark={handleBookmarkToggle}
              bookmarks={bookmarks}
              onSelectResource={setSelectedResource}
              onOpenUpload={() => setIsUploadOpen(true)}
            />
          </div>
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
