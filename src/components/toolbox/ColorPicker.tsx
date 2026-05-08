import React from 'react';
import { useApp } from '../../context/AppContext';
import { OVERLAY_COLORS } from '../../constants/colors';
import { cn } from '../../lib/utils';

export const ColorPicker: React.FC = () => {
  const { overlays, selectedIndex, updateOverlay } = useApp();
  const selectedOverlay = overlays[selectedIndex];

  return (
    <div className="flex flex-col gap-3">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
        Display Color
      </label>

      <div className="flex flex-wrap gap-2.5">
        {OVERLAY_COLORS.map((color) => {
          const isSelected = selectedOverlay.color === color;

          return (
            <button
              key={color}
              onClick={() => updateOverlay(selectedOverlay.id, { color })}
              title={`Select ${color}`}
              className={cn(
                // Base styles
                "w-8 h-8 rounded-full border-2 transition-all cursor-pointer",
                "hover:scale-110 active:scale-95",
                // Selected state: bright border and subtle glow
                isSelected
                  ? "border-white scale-110 shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
              style={{ backgroundColor: color }}
            >
              {/* Screen reader only label */}
              <span className="sr-only">Color {color}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};