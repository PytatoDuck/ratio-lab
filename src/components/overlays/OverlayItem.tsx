import React from 'react';
import {
  Trash2,
  ChevronUp,
  ChevronDown,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { Overlay } from '../../types';
import { cn } from '../../lib/utils';

interface OverlayItemProps {
  overlay: Overlay;
  index: number;
  isLast: boolean;
}

export const OverlayItem: React.FC<OverlayItemProps> = ({ overlay, index, isLast }) => {
  const {
    selectedIndex,
    setSelectedIndex,
    moveOverlay,
    removeOverlay,
    overlays
  } = useApp();

  const isSelected = selectedIndex === index;
  const isBase = index === 0;

  return (
    <div
      onClick={() => setSelectedIndex(index)}
      className={cn(
        "group relative flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer",
        isSelected
          ? "bg-surface-800 border-primary-500/50 shadow-[0_0_20px_rgba(14,165,233,0.05)]"
          : "bg-surface-800/40 border-surface-700 hover:border-surface-600 hover:bg-surface-800"
      )}
    >
      {/* 1. Selection Indicator & Color Swatch */}
      <div className="relative shrink-0">
        <div
          className="w-10 h-10 rounded-lg shadow-inner flex items-center justify-center transition-transform group-hover:scale-105"
          style={{ backgroundColor: overlay.color }}
        >
          {isSelected && <Check className="w-5 h-5 text-white drop-shadow-md" />}
        </div>
        {isBase && (
          <div className="absolute -top-2 -left-2 bg-primary-500 text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded-sm text-white shadow-lg">
            Base
          </div>
        )}
      </div>

      {/* 2. Info Section */}
      <div className="flex-1 min-w-0">
        <h4 className={cn(
          "text-sm font-bold truncate transition-colors",
          isSelected ? "text-slate-100" : "text-slate-400 group-hover:text-slate-200"
        )}>
          {overlay.name || (isBase ? 'Base Canvas' : `Overlay ${index}`)}
        </h4>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs font-mono text-slate-500">
            {overlay.width} × {overlay.height}
          </span>
          <span className="text-[10px] bg-surface-900 px-1.5 py-0.5 rounded border border-surface-700 text-slate-400 font-medium">
            {overlay.ratioX}:{overlay.ratioY}
          </span>
        </div>
      </div>

      {/* 3. Action Buttons (Hidden on mobile until active, visible on hover for desktop) */}
      <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 lg:transition-opacity">

        {/* Move Up */}
        <button
          disabled={index === 0}
          onClick={(e) => { e.stopPropagation(); moveOverlay(index, 'up'); }}
          className="p-1.5 rounded-md hover:bg-surface-700 text-slate-500 hover:text-slate-200 disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
          title="Move up (Make Base)"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        {/* Move Down */}
        <button
          disabled={isLast}
          onClick={(e) => { e.stopPropagation(); moveOverlay(index, 'down'); }}
          className="p-1.5 rounded-md hover:bg-surface-700 text-slate-500 hover:text-slate-200 disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
          title="Move down"
        >
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Delete - Only show if there's more than one overlay */}
        {overlays.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); removeOverlay(overlay.id); }}
            className="p-1.5 rounded-md hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors ml-1"
            title="Remove layer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 4. Active Selection Ring (Decorative) */}
      {isSelected && (
        <div className="absolute inset-0 rounded-xl border border-primary-500/20 pointer-events-none" />
      )}
    </div>
  );
};