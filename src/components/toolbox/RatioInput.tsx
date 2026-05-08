import React, { useState } from 'react';
import { ChevronDown, Target } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PRESETS } from '../../constants/presets';
import { cn } from '../../lib/utils';

export const RatioInput: React.FC = () => {
  const { overlays, selectedIndex, updateOverlay } = useApp();
  const selectedOverlay = overlays[selectedIndex];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleRatioChange = (field: 'ratioX' | 'ratioY', valueString: string) => {
    const val = parseInt(valueString, 10);
    updateOverlay(selectedOverlay.id, { [field]: isNaN(val) ? 0 : val });
  };

  const applyPreset = (ratioX: number, ratioY: number) => {
    updateOverlay(selectedOverlay.id, { ratioX, ratioY });
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col gap-2 relative">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
        <Target className="w-3 h-3" />
        Target Ratio
      </label>

      <div className="flex gap-2 items-center h-11.5">
        {/* Separated X & Y Numeric Inputs */}
        <div className="flex flex-1 items-center bg-surface-900 border border-surface-700 rounded-xl overflow-hidden focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20 transition-all h-full shadow-inner">
          <input
            type="number"
            value={selectedOverlay.ratioX || ''}
            onChange={(e) => handleRatioChange('ratioX', e.target.value)}
            className="w-full bg-transparent text-center text-slate-100 focus:outline-none font-mono py-2 text-lg"
          />
          <span className="text-surface-600 font-bold select-none">:</span>
          <input
            type="number"
            value={selectedOverlay.ratioY || ''}
            onChange={(e) => handleRatioChange('ratioY', e.target.value)}
            className="w-full bg-transparent text-center text-slate-100 focus:outline-none font-mono py-2 text-lg"
          />
        </div>

        {/* Preset Dropdown Toggle */}
        <div className="relative h-full">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={cn(
              "h-full px-4 flex items-center justify-center bg-surface-800 border border-surface-700 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-surface-700 hover:border-surface-600 transition-all cursor-pointer shadow-sm",
              isDropdownOpen && "bg-surface-700 text-primary-400 border-primary-500/50 ring-2 ring-primary-500/20"
            )}
            title="Standard Presets"
          >
            <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isDropdownOpen && "rotate-180")} />
          </button>

          {/* Actual Dropdown Menu */}
          {isDropdownOpen && (
            <>
              <div className="fixed inset-0 z-80" onClick={() => setIsDropdownOpen(false)} />

              <div className="absolute right-0 top-[calc(100%+8px)] w-64 bg-surface-800/95 backdrop-blur-xl border border-surface-700 rounded-xl shadow-2xl z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-1.5 mb-1 border-b border-surface-700/50">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Common Formats</span>
                </div>

                <div className="max-h-60 overflow-y-auto custom-scrollbar">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => applyPreset(preset.ratioX, preset.ratioY)}
                      className="w-full px-4 py-2.5 flex flex-col items-start hover:bg-surface-700/50 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-200 group-hover:text-primary-400 transition-colors">
                          {preset.label}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          ({preset.ratioX}:{preset.ratioY})
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 line-clamp-1 italic mt-0.5">
                        {preset.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};