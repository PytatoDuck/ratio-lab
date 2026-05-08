import React from 'react';
import { Settings2, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NameInput } from './NameInput';
import { Dimensions } from './Dimensions';
import { RatioInput } from './RatioInput';
import { ColorPicker } from './ColorPicker';

export const Toolbox: React.FC = () => {
  const { overlays, selectedIndex } = useApp();
  const selectedOverlay = overlays[selectedIndex];

  if (!selectedOverlay) return null;

  const isBase = selectedIndex === 0;

  return (
    <aside className="w-full bg-surface-800/80 backdrop-blur-xl border border-surface-700/50 rounded-2xl shadow-2xl flex flex-col relative">

      {/* Header Area */}
      <div className="px-5 py-4 border-b border-surface-700/50 flex items-center justify-between bg-surface-800/50 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-primary-400" />
          <h2 className="font-bold text-slate-100 tracking-tight">Toolbox</h2>
        </div>

        {/* Visual Badge */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {isBase ? 'Base Layer' : `Overlay ${selectedIndex}`}
          </span>
          <div
            className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_currentColor]"
            style={{ backgroundColor: selectedOverlay.color, color: selectedOverlay.color }}
          />
        </div>
      </div>

      {/* Main Form Area */}
      <div className="p-6 flex flex-col gap-8">
        <section className="space-y-6">
          <NameInput />
          <ColorPicker />
        </section>

        <div className="h-px bg-surface-700/50" />

        <section className="space-y-8 relative">
          <Dimensions />
          <RatioInput />
        </section>

        {!isBase && (
          <div className="mt-2 p-3.5 rounded-xl bg-primary-500/10 border border-primary-500/20 flex gap-3 shadow-inner">
            <Info className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-300 leading-relaxed">
              This overlay is being compared against the <span className="text-white font-semibold">Base Canvas</span>.
              Move it to the top of the list to make it the new Base.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};