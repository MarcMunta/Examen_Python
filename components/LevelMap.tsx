import React from 'react';
import { Check, Lock, MapPin, Swords, Shield, Skull } from 'lucide-react';
import { Level } from '../types';

interface LevelMapProps {
  levels: Level[];
  currentLevelIdx: number;
  className?: string;
}

export const LevelMap: React.FC<LevelMapProps> = ({ levels, currentLevelIdx, className = '' }) => {
  return (
    <div className={`bg-slate-900/60 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-xl flex flex-col h-fit shadow-2xl ${className}`}>
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 text-center border-b border-slate-800 pb-2">
        Mapa de la Mazmorra
      </h3>
      
      <div className="relative flex flex-col gap-0 px-2">
        {/* Vertical Connecting Line Background */}
        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-800 -z-10 rounded-full"></div>
        
        {/* Active Progress Line */}
        <div 
          className="absolute left-[19px] top-4 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-500 -z-10 rounded-full transition-all duration-1000 ease-out"
          style={{ height: `${(currentLevelIdx / Math.max(1, levels.length - 1)) * 100}%` }}
        ></div>

        {levels.map((level, idx) => {
          const isCompleted = idx < currentLevelIdx;
          const isCurrent = idx === currentLevelIdx;
          const isLocked = idx > currentLevelIdx;

          return (
            <div key={level.id} className={`flex items-center gap-4 py-3 relative group ${isCurrent ? 'scale-105 origin-left' : 'opacity-70 hover:opacity-100'} transition-all duration-300`}>
              
              {/* Node Circle */}
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-500 shadow-lg z-10 shrink-0
                ${isCompleted 
                  ? 'bg-emerald-900/80 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                  : isCurrent 
                    ? 'bg-indigo-600 border-indigo-400 text-white ring-4 ring-indigo-500/20 shadow-[0_0_25px_rgba(99,102,241,0.5)]' 
                    : 'bg-slate-800 border-slate-700 text-slate-600'}
              `}>
                {isCompleted ? (
                  <Check size={18} strokeWidth={3} />
                ) : isCurrent ? (
                  <Swords size={18} className="animate-pulse" />
                ) : (
                  <Lock size={16} />
                )}
              </div>

              {/* Level Info Card */}
              <div className={`
                flex-1 px-3 py-2 rounded-lg border transition-all duration-300
                ${isCurrent 
                  ? 'bg-indigo-900/30 border-indigo-500/50 translate-x-1' 
                  : 'bg-transparent border-transparent group-hover:bg-slate-800/50 group-hover:border-slate-700'}
              `}>
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isCurrent ? 'text-indigo-300' : 'text-slate-500'}`}>
                    Nivel {level.id}
                  </span>
                  {isCurrent && <span className="flex w-2 h-2 bg-indigo-400 rounded-full animate-ping"></span>}
                </div>
                
                <div className={`text-sm font-medium truncate w-32 ${isCurrent ? 'text-white' : 'text-slate-400'}`}>
                   {level.monsterName}
                </div>
              </div>

              {/* Monster Avatar (Small preview on right) */}
              <div className={`
                absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-8 flex items-center justify-center text-lg drop-shadow-md transition-all
                ${isCurrent ? 'opacity-100 scale-125 rotate-6' : 'opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100'}
              `}>
                {level.monsterEmoji}
              </div>

            </div>
          );
        })}
      </div>

      {/* Footer Decoration */}
      <div className="mt-8 text-center opacity-30">
        <Shield size={24} className="mx-auto text-slate-500" />
      </div>
    </div>
  );
};