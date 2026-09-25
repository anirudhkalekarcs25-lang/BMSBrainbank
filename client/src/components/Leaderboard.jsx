import React, { useState, useEffect } from 'react';
import { Trophy, Award, Medal, ThumbsUp, Upload, Sparkles, UserCheck } from 'lucide-react';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((res) => res.json())
      .then((data) => {
        setLeaders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load leaderboard:', err);
        setLoading(false);
      });
  }, []);

  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <div className="h-8 w-8 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center text-sm shadow-md ring-2 ring-amber-300">
          🥇
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="h-8 w-8 rounded-full bg-slate-300 text-slate-900 font-black flex items-center justify-center text-sm shadow-md ring-2 ring-slate-200">
          🥈
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="h-8 w-8 rounded-full bg-amber-700 text-amber-100 font-black flex items-center justify-center text-sm shadow-md ring-2 ring-amber-600">
          🥉
        </div>
      );
    }
    return (
      <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center text-xs">
        #{rank}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 text-xs font-extrabold uppercase tracking-wider">
          <Trophy className="h-4 w-4 text-amber-500" />
          <span>BMSCE Contributor Hall of Fame</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-slate-100">
          Top Student Contributors
        </h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xl mx-auto">
          Recognizing the students who help make academic notes, PYQs, and lab manuals accessible to the entire BMSCE community.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500 text-sm">Loading Contributor Leaderboard...</div>
      ) : (
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl border border-gray-200 dark:border-slate-700/80 overflow-hidden shadow-xl">
          <div className="divide-y divide-gray-100 dark:divide-slate-700/60">
            {leaders.map((leader, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  {getRankBadge(index + 1)}

                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-slate-100 flex items-center space-x-2">
                      <span>{leader.author_name}</span>
                      <UserCheck className="h-4 w-4 text-sky-500" />
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400 font-mono">
                      USN: {leader.author_usn || 'BMSCE Student'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  {/* Uploads Count */}
                  <div className="text-center">
                    <div className="text-sm font-extrabold text-gray-900 dark:text-slate-100 flex items-center justify-center space-x-1">
                      <Upload className="h-3.5 w-3.5 text-sky-500" />
                      <span>{leader.uploads_count}</span>
                    </div>
                    <div className="text-[10px] uppercase font-bold text-gray-400 dark:text-slate-500">
                      Uploads
                    </div>
                  </div>

                  {/* Upvotes Count */}
                  <div className="text-center">
                    <div className="text-sm font-extrabold text-amber-600 dark:text-amber-400 flex items-center justify-center space-x-1">
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span>{leader.total_upvotes}</span>
                    </div>
                    <div className="text-[10px] uppercase font-bold text-gray-400 dark:text-slate-500">
                      Upvotes
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
