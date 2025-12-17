import React from 'react';
import { Trophy, Crown, Medal } from 'lucide-react';
import { LeaderboardEntry } from '../types';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentPlayerName?: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries, currentPlayerName }) => {
  // Ensure we have at least empty slots for the podium logic to work visually
  const top3 = [
    entries[0] || null, // 1st
    entries[1] || null, // 2nd
    entries[2] || null  // 3rd
  ];

  const rest = entries.slice(3);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/60 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-700/50 p-6 md:p-8 backdrop-blur-md transition-colors duration-300">
      <h3 className="text-center text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 dark:from-yellow-200 dark:via-yellow-500 dark:to-yellow-200 uppercase tracking-widest mb-12 mt-2 flex items-center justify-center gap-3">
        <Trophy className="text-yellow-600 dark:text-yellow-500" /> Salón de la Fama
      </h3>

      {/* --- PODIUM --- */}
      <div className="flex justify-center items-end gap-2 md:gap-4 mb-12 h-48 md:h-56 pb-2">
        
        {/* 2nd Place (Left) */}
        <div className="flex flex-col items-center w-1/3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {top3[1] && (
            <div className="mb-3 text-center w-full">
              <span className={`block font-bold truncate px-2 text-sm md:text-base ${top3[1].username === currentPlayerName ? 'text-yellow-600 dark:text-yellow-400' : 'text-slate-700 dark:text-slate-300'}`}>
                {top3[1].username}
              </span>
              <span className="text-xs font-mono text-slate-500">{top3[1].score} pts</span>
            </div>
          )}
          <div className="w-full h-24 md:h-32 bg-gradient-to-t from-slate-300 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-t-lg border-t-4 border-slate-400 relative flex items-start justify-center pt-2 shadow-lg">
             <div className="absolute inset-0 bg-white/20 dark:bg-white/5"></div>
             <span className="text-3xl font-black text-slate-500/30 dark:text-slate-400/50">2</span>
             <Medal size={24} className="absolute -top-3 text-slate-500 dark:text-slate-300 drop-shadow-lg" />
          </div>
        </div>

        {/* 1st Place (Center) */}
        <div className="flex flex-col items-center w-1/3 z-10 animate-slide-up">
           {top3[0] && (
            <div className="mb-3 text-center transform scale-110 w-full">
              <Crown size={20} className="text-yellow-500 dark:text-yellow-400 mx-auto mb-1 animate-bounce" />
              <span className={`block font-bold truncate px-2 text-base md:text-lg ${top3[0].username === currentPlayerName ? 'text-yellow-600 dark:text-yellow-400' : 'text-slate-900 dark:text-white'}`}>
                {top3[0].username}
              </span>
              <span className="text-sm font-mono text-yellow-600 dark:text-yellow-500 font-bold">{top3[0].score} pts</span>
            </div>
          )}
          <div className="w-full h-32 md:h-44 bg-gradient-to-t from-yellow-400 to-yellow-300 dark:from-yellow-600 dark:to-yellow-500 rounded-t-lg border-t-4 border-yellow-200 dark:border-yellow-300 relative flex items-start justify-center pt-4 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
             <div className="absolute inset-0 bg-white/20 dark:bg-white/10 animate-pulse"></div>
             <span className="text-5xl font-black text-yellow-700/30 dark:text-yellow-900/40">1</span>
          </div>
        </div>

        {/* 3rd Place (Right) */}
        <div className="flex flex-col items-center w-1/3 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {top3[2] && (
            <div className="mb-3 text-center w-full">
              <span className={`block font-bold truncate px-2 text-sm md:text-base ${top3[2].username === currentPlayerName ? 'text-yellow-600 dark:text-yellow-400' : 'text-slate-700 dark:text-slate-300'}`}>
                {top3[2].username}
              </span>
              <span className="text-xs font-mono text-slate-500">{top3[2].score} pts</span>
            </div>
          )}
          <div className="w-full h-16 md:h-24 bg-gradient-to-t from-orange-400 to-orange-300 dark:from-orange-800 dark:to-orange-700 rounded-t-lg border-t-4 border-orange-300 dark:border-orange-500 relative flex items-start justify-center pt-2 shadow-lg">
             <div className="absolute inset-0 bg-white/20 dark:bg-white/5"></div>
             <span className="text-3xl font-black text-orange-800/30 dark:text-orange-900/50">3</span>
             <Medal size={24} className="absolute -top-3 text-orange-600 dark:text-orange-400 drop-shadow-lg" />
          </div>
        </div>
      </div>

      {/* --- LIST --- */}
      <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
        {rest.length === 0 && top3[0] === null && (
          <div className="text-center text-slate-500 italic py-4">Aún no hay leyendas...</div>
        )}
        
        {rest.map((entry, idx) => (
          <div 
            key={idx} 
            className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${entry.username === currentPlayerName ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-500/50' : 'bg-slate-100 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50'}`}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-slate-400 dark:text-slate-500 w-6 text-right font-bold">{idx + 4}</span>
              <span className={`font-medium ${entry.username === currentPlayerName ? 'text-indigo-600 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300'}`}>
                {entry.username}
              </span>
            </div>
            <span className="font-mono font-bold text-slate-500 dark:text-slate-400">{entry.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};