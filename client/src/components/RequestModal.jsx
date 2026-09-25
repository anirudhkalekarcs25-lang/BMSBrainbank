import React, { useState, useEffect } from 'react';
import { X, HelpCircle, ThumbsUp, PlusCircle, CheckCircle2 } from 'lucide-react';

export default function RequestModal({ isOpen, onClose, departments }) {
  if (!isOpen) return null;

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subject_code: '',
    department_code: 'CSE',
    semester: '3',
    description: '',
    requested_by: ''
  });

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/requests');
      const data = await res.json();
      setRequests(data);
      setLoading(false);
    } catch (err) {
      console.error('Error loading requests:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpvoteRequest = async (id) => {
    try {
      const res = await fetch(`/api/requests/${id}/upvote`, { method: 'POST' });
      const updated = await res.json();
      setRequests((prev) =>
        prev.map((rq) => (rq.id === id ? { ...rq, upvotes: updated.upvotes } : rq))
      );
    } catch (err) {
      console.error('Failed to upvote request:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.subject_code) return;

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const newReq = await res.json();
        setRequests([newReq, ...requests]);
        setShowForm(false);
        setFormData({
          title: '',
          subject_code: '',
          department_code: 'CSE',
          semester: '3',
          description: '',
          requested_by: ''
        });
      }
    } catch (err) {
      console.error('Error submitting request:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative transition-colors max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6 pr-8">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 text-xs font-bold mb-2">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>BMSCE Community Request Desk</span>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-slate-100">
              Request Academic Notes & Papers
            </h2>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-all"
          >
            <PlusCircle className="h-4 w-4" />
            <span>{showForm ? 'View Requests' : 'Post New Request'}</span>
          </button>
        </div>

        {showForm ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                Request Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Need 22CS4DCCNA Computer Networks Module 4 Socket Programming Solution"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                  Subject Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 22CS4DCCNA"
                  value={formData.subject_code}
                  onChange={(e) => setFormData({ ...formData, subject_code: e.target.value.toUpperCase() })}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 font-mono focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                  Branch / Dept
                </label>
                <select
                  value={formData.department_code}
                  onChange={(e) => setFormData({ ...formData, department_code: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  {departments.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.code} ({d.name})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                Your Name / USN
              </label>
              <input
                type="text"
                placeholder="e.g. Ananya S (1BM22CS024)"
                value={formData.requested_by}
                onChange={(e) => setFormData({ ...formData, requested_by: e.target.value })}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                Additional Context / Questions
              </label>
              <textarea
                rows={3}
                placeholder="Explain what specific topics, question paper years, or unit notes you are looking for..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-md"
              >
                Post Request
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">
              Upvote existing requests if you need the same materials! Higher upvoted requests get featured for top student contributors to upload.
            </p>

            {loading ? (
              <div className="text-center py-8 text-xs text-gray-500">Loading requests...</div>
            ) : requests.length === 0 ? (
              <div className="text-center py-8 text-xs text-gray-500">No requests submitted yet.</div>
            ) : (
              requests.map((rq) => (
                <div
                  key={rq.id}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/80 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-900 text-sky-400 dark:bg-sky-950 dark:text-sky-300">
                        {rq.subject_code}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-slate-400">
                        Sem {rq.semester} • {rq.department_code}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-slate-100">{rq.title}</h4>
                    {rq.description && (
                      <p className="text-xs text-gray-600 dark:text-slate-300">{rq.description}</p>
                    )}
                    <div className="text-[11px] text-gray-500 dark:text-slate-400 pt-1">
                      Requested by <span className="font-semibold text-gray-700 dark:text-slate-200">{rq.requested_by}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleUpvoteRequest(rq.id)}
                    className="px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-gray-700 dark:text-slate-200 text-xs font-bold flex flex-col items-center space-y-1 shadow-sm transition-all"
                  >
                    <ThumbsUp className="h-4 w-4 text-sky-500" />
                    <span>{rq.upvotes}</span>
                  </button>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}
