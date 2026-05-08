import React from 'react';
import { APP_CONFIG } from '../../constants/config';

export const Header: React.FC = () => {
  return (
    <header className="w-full sticky top-0 z-50">
      {/* Premium Glassmorphic Background */}
      <div className="absolute inset-0 bg-surface-900/60 backdrop-blur-2xl border-b border-surface-700/50" />

      {/* Subtle top edge highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary-500/20 to-transparent" />

      <div className="max-w-400 mx-auto px-4 h-16 flex items-center justify-between relative">

        {/* Logo & App Name */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <h1 className="font-extrabold text-xl tracking-tight flex items-center drop-shadow-sm">
            <span className="text-slate-100">Ratio</span>
            <span className="text-surface-600 mx-0.5 font-mono font-medium -translate-y-px group-hover:text-primary-500/50 transition-colors duration-300">:</span>
            <span className="text-transparent bg-clip-text bg-linear-to-br from-primary-400 to-primary-600">Lab</span>
          </h1>

        </div>

        {/* Right side alignment/balance */}
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 bg-surface-800/50 px-2 py-1 rounded border border-surface-700/50 shadow-inner">
            v{APP_CONFIG.version}
          </span>
        </div>

      </div>
    </header>
  );
};