import React, { useState } from 'react';
import { User, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './Button';

interface NameModalProps {
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

export const NameModal: React.FC<NameModalProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length > 0) {
      onSubmit(name.trim().toUpperCase());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-indigo-500/50 rounded-2xl p-6 md:p-8 shadow-2xl dark:shadow-[0_0_50px_rgba(79,70,229,0.3)] relative overflow-hidden transition-all duration-300">
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10 text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-indigo-50 dark:bg-slate-800 rounded-full flex items-center justify-center border border-indigo-200 dark:border-indigo-500/30 mb-4 transition-colors shadow-sm">
            <User size={32} className="text-indigo-600 dark:text-indigo-400" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 transition-colors tracking-tight">Identifícate, Explorador</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm transition-colors font-medium">Tu nombre quedará grabado en los registros de la mazmorra.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="NOMBRE DE USUARIO..."
                maxLength={12}
                autoFocus
                className="w-full bg-slate-100 dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-700 rounded-xl px-4 py-4 text-center text-lg font-black text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all uppercase tracking-wider"
              />
              <Sparkles size={16} className="absolute top-1/2 right-4 -translate-y-1/2 text-indigo-500 opacity-0 group-focus-within:opacity-100 transition-opacity" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={onCancel}
                className="order-2 sm:order-1 flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 shadow-sm dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 dark:border-slate-900 dark:shadow-slate-900/50"
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                fullWidth 
                className="order-1 sm:order-2 flex-[2]"
                disabled={name.trim().length === 0}
              >
                <span className="flex items-center justify-center gap-2">
                  COMENZAR <ArrowRight size={18} />
                </span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};