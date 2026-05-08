import React from 'react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { APP_CONFIG } from '../../constants/config';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-surface-700/50 mt-auto py-8 relative z-10 overflow-hidden">
      {/* Subtle ambient glow at the bottom of the page */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50%] h-25 bg-primary-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-400 mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 relative">

        {/* Author & Copyright Info */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-sm text-slate-500">
            Designed & Built by{' '}
            <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-slate-300 to-slate-100 drop-shadow-sm">
              {APP_CONFIG.author}
            </span>
          </p>
          <p className="text-[10px] text-surface-600 font-mono tracking-widest uppercase">
            {APP_CONFIG.appName} © {new Date().getFullYear()}
          </p>
        </div>

        {/* Action / Link */}
        <div className="flex items-center">
          <a
            href={APP_CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-800/50 border border-surface-700/50 text-slate-400 hover:text-primary-400 hover:border-primary-500/40 hover:bg-primary-500/10 transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(14,165,233,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="View source on GitHub"
          >
            <SiGithub className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xs font-bold tracking-wide">Star on GitHub</span>
          </a>
        </div>

      </div>
    </footer>
  );
};