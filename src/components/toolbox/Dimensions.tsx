import React from 'react';
import { Lock, Unlock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { cn } from '../../lib/utils';

export const Dimensions: React.FC = () => {
  const { overlays, selectedIndex, updateOverlay } = useApp();
  const selectedOverlay = overlays[selectedIndex];

  const handleInputChange = (field: 'width' | 'height', valueString: string) => {
    const value = parseInt(valueString, 10);
    updateOverlay(selectedOverlay.id, { [field]: isNaN(value) ? 0 : value });
  };

  const toggleLock = () => {
    updateOverlay(selectedOverlay.id, { isLocked: !selectedOverlay.isLocked });
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
        Dimensions (px)
      </h3>

      <div className="relative flex items-center gap-3">

        <div className="flex-1 flex flex-col gap-1.5">
          <label htmlFor="width" className="text-[9px] font-semibold text-slate-500 uppercase px-1">
            Width
          </label>
          <input
            id="width"
            type="number"
            value={selectedOverlay.width || ''}
            onChange={(e) => handleInputChange('width', e.target.value)}
            className="w-full bg-surface-900 border border-surface-700 rounded-xl px-3 py-3 text-lg font-mono text-primary-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all shadow-inner"
          />
        </div>

        {/* Floating Lock Toggle (No lines) */}
        <div className="flex flex-col items-center justify-center pt-5">
          <button
            onClick={toggleLock}
            className={cn(
              "p-2.5 rounded-full border transition-all duration-300 group hover:scale-110 active:scale-95 shadow-lg",
              selectedOverlay.isLocked
                ? "bg-primary-500/10 border-primary-500/50 text-primary-400 shadow-[0_0_20px_rgba(14,165,233,0.15)]"
                : "bg-surface-800 border-surface-600 text-slate-400 hover:text-slate-200"
            )}
            title={selectedOverlay.isLocked ? "Aspect Ratio Locked" : "Aspect Ratio Unlocked"}
          >
            {selectedOverlay.isLocked ? (
              <Lock className="w-4 h-4" />
            ) : (
              <Unlock className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-1.5">
          <label htmlFor="height" className="text-[9px] font-semibold text-slate-500 uppercase px-1">
            Height
          </label>
          <input
            id="height"
            type="number"
            value={selectedOverlay.height || ''}
            onChange={(e) => handleInputChange('height', e.target.value)}
            className="w-full bg-surface-900 border border-surface-700 rounded-xl px-3 py-3 text-lg font-mono text-primary-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all shadow-inner"
          />
        </div>

      </div>

      <p className="text-[10px] text-slate-500 italic px-1">
        {selectedOverlay.isLocked
          ? "Lock enabled: Dimensions scale proportionally."
          : "Lock disabled: Changing dimensions updates the ratio."}
      </p>
    </div>
  );
};