import React from 'react';
import { Layers } from 'lucide-react';
import { APP_CONFIG } from '../../constants/config';

export const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-surface-800 bg-surface-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo & App Name */}
        <div className="flex items-center gap-2 text-slate-100">
          <Layers className="w-6 h-6 text-primary-400" />
          <h1 className="font-bold text-xl tracking-tight">
            {APP_CONFIG.appName}
          </h1>
        </div>
      </div>
    </header>
  );
};