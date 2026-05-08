import React from 'react';
import { useApp } from '../../context/AppContext';

export const NameInput: React.FC = () => {
  const { overlays, selectedIndex, updateOverlay } = useApp();
  const selectedOverlay = overlays[selectedIndex];

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="layer-name"
        className="text-[10px] font-bold text-slate-500 uppercase tracking-widest"
      >
        Name / Title
      </label>
      <input
        id="layer-name"
        type="text"
        value={selectedOverlay.name}
        onChange={(e) => updateOverlay(selectedOverlay.id, { name: e.target.value })}
        placeholder="Enter layer name..."
        className="w-full bg-surface-900 border border-surface-700 rounded-lg px-3 py-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all"
      />
    </div>
  );
};