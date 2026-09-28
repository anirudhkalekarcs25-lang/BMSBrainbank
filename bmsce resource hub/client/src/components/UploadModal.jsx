import React, { useState } from 'react';
import { X, UploadCloud, Link as LinkIcon, FileText, CheckCircle, Flame } from 'lucide-react';

export default function UploadModal({ isOpen, onClose, departments, subjects, onUploadSuccess }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    title: '',
    department_code: 'CSE',
    semester: '3',
    subject_code: '22CS3DCDSA',
    scheme: '2022',
    type: 'Notes',
    module: '0',
    author_name: '',
    author_usn: '',
    drive_link: '',
    description: '',
    tags: '',
    is_crash_pack: false
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const filteredSubjects = subjects.filter(
    (s) => s.department_code === formData.department_code && s.semester.toString() === formData.semester.toString()
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.subject_code || (!formData.drive_link && !file)) {
      setError('Please fill in the title, subject code, and provide either a Google Drive link or PDF file.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (file) {
        data.append('file', file);
      }

      const res = await fetch('/api/resources', {
        method: 'POST',
        body: data
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to upload resource.');
      }

      const newResource = await res.json();
      setLoading(false);
      onUploadSuccess(newResource);
      onClose();
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative transition-colors max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 mb-6">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 text-xs font-bold">
            <UploadCloud className="h-3.5 w-3.5" />
            <span>BMSCE Community Upload</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-slate-100">
            Share Academic Material
          </h2>
          <p className="text-xs text-gray-500 dark:text-slate-400">
            Upload your handwritten notes, solved PYQs, lab codes, or formula sheets to assist your BMSCE peers.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 text-xs font-medium border border-rose-200 dark:border-rose-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
              Resource Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Data Structures Module 1-3 Handwritten Notes with Solved PYQs"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          {/* Department & Semester */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                Branch / Cycle *
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

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                Semester *
              </label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subject Selection / Input */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                Subject Code *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 22CS3DCDSA"
                value={formData.subject_code}
                onChange={(e) => setFormData({ ...formData, subject_code: e.target.value.toUpperCase() })}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 font-mono focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                Material Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              >
                <option value="Notes">📝 Lecture Notes</option>
                <option value="PYQ">📄 PYQ & Answer Key</option>
                <option value="Lab Manual">🧪 Lab Manual / Code</option>
                <option value="Formula Sheet">⚡ Formula Cheat Sheet</option>
                <option value="Syllabus">📌 Syllabus Copy</option>
              </select>
            </div>
          </div>

          {/* Module & Scheme */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                Module
              </label>
              <select
                value={formData.module}
                onChange={(e) => setFormData({ ...formData, module: e.target.value })}
                className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              >
                <option value="0">Full Syllabus (All Modules)</option>
                <option value="1">Module 1</option>
                <option value="2">Module 2</option>
                <option value="3">Module 3</option>
                <option value="4">Module 4</option>
                <option value="5">Module 5</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                Scheme
              </label>
              <select
                value={formData.scheme}
                onChange={(e) => setFormData({ ...formData, scheme: e.target.value })}
                className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              >
                <option value="2022">2022 Scheme (NEP)</option>
                <option value="2021">2021 Scheme</option>
                <option value="2025">2025 Scheme</option>
              </select>
            </div>
          </div>

          {/* Drive Link & Local PDF */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
              Google Drive / OneDrive Link (Recommended)
            </label>
            <input
              type="url"
              placeholder="https://drive.google.com/file/d/..."
              value={formData.drive_link}
              onChange={(e) => setFormData({ ...formData, drive_link: e.target.value })}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
              OR Upload PDF File
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.zip,.png,.jpeg"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-xs text-gray-600 dark:text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 dark:file:bg-slate-800 dark:file:text-sky-400 hover:file:bg-sky-100"
            />
          </div>

          {/* Contributor USN & Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Varun Kumar"
                value={formData.author_name}
                onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                Your USN (BMSCE)
              </label>
              <input
                type="text"
                placeholder="e.g. 1BM22CS180"
                value={formData.author_usn}
                onChange={(e) => setFormData({ ...formData, author_usn: e.target.value.toUpperCase() })}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 font-mono focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
              Short Description / Topics Covered
            </label>
            <textarea
              rows={2}
              placeholder="Briefly describe what is inside these notes (e.g. covers trees, graphs, B-trees & 5 solved CIE problems)..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          {/* Crash pack check */}
          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="crash_pack"
              checked={formData.is_crash_pack}
              onChange={(e) => setFormData({ ...formData, is_crash_pack: e.target.checked })}
              className="h-4 w-4 text-sky-600 rounded border-gray-300 focus:ring-sky-500"
            />
            <label htmlFor="crash_pack" className="text-xs font-semibold text-gray-700 dark:text-slate-300 flex items-center space-x-1">
              <Flame className="h-3.5 w-3.5 text-amber-500" />
              <span>Mark as High-Priority Pre-Exam Crash Pack</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 dark:bg-sky-600 dark:hover:bg-sky-500 shadow-md shadow-sky-600/30 flex items-center space-x-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <span>Uploading...</span>
              ) : (
                <>
                  <UploadCloud className="h-4 w-4" />
                  <span>Submit Material</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
