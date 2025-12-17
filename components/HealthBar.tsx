import React from 'react';
import { Heart } from 'lucide-react';

interface HealthBarProps {
  current: number;
  max: number;
}

export const HealthBar: React.FC<HealthBarProps> = ({ current, max }) => {
  // Defensive coding: clamp values to prevent visual glitches
  const safeCurrent = Math.max(0, current);
  const safeMax = Math.max(1, max); // Prevent division by zero
  const percentage = (safeCurrent / safeMax) * 100;
  
  // Calculate Color & Glow based on health percentage
  let colorClass = "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]";
  let iconClass = "text-red-500 dark:text-red-400";
  
  if (percentage <= 50) {
    colorClass = "bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.6)]";
    iconClass = "text-red-500";
  }
  if (percentage <= 25) {
    colorClass = "bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)]";
    iconClass = "text-red-600 animate-pulse fill-red-600";
  }

  return (
    <div className="flex items-center gap-3 w-full max-w-[200px] md:max-w-xs bg-white/80 dark:bg-slate-900/80 p-2 rounded-xl border border-slate-200 dark:border-slate-700/50 backdrop-blur-md transition-colors duration-300">
      {/* Icon */}
      <Heart className={`w-5 h-5 transition-colors duration-300 ${iconClass}`} />
      
      {/* Bar Container */}
      <div className="flex-1 flex flex-col gap-1">
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full relative overflow-hidden border border-slate-300 dark:border-slate-700/50">
          <div 
            className={`h-full rounded-full transition-all duration-500 ease-out ${colorClass}`}
            style={{ width: `${Math.max(0, Math.min(100, percentage))}%` }}
          >
            {/* Shine effect inside the bar */}
            <div className="absolute top-0 left-0 right-0 h-[40%] bg-white/30 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Text Number */}
      <div className="font-mono text-xs font-bold text-slate-600 dark:text-slate-300 min-w-[60px] text-right">
        <span className={percentage <= 25 ? "text-red-500" : "text-slate-800 dark:text-white"}>{safeCurrent}</span>
        <span className="text-slate-400 dark:text-slate-600">/</span>
        <span className="text-slate-400 dark:text-slate-500">{safeMax}</span>
      </div>
    </div>
  );
};