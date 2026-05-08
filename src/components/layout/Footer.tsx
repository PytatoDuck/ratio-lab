import React from 'react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { APP_CONFIG } from '../../constants/config';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-surface-800 mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 gap-4">

        {/* Author Info */}
        <p>
          Built by <span className="font-medium text-slate-300">{APP_CONFIG.author}</span>
        </p>

        {/* Links */}
        <div className="flex items-center gap-6">
          <span>v{APP_CONFIG.version}</span>

          <a
            href={APP_CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-slate-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm"
            aria-label="View source on GitHub"
          >
            <SiGithub className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>

      </div>
    </footer>
  );
};