import React from 'react';
import { Plus, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { OverlayItem } from './OverlayItem';
import { cn } from '../../lib/utils';

export const OverlayList: React.FC = () => {
  const { overlays, addOverlay } = useApp();

  // Maximum number of overlays allowed (Sync with AppContext logic)
  const MAX_OVERLAYS = 4;
  const isLimitReached = overlays.length >= MAX_OVERLAYS;

  return (
    <section className="flex flex-col gap-4">

      {/* Header with Counter */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Maximize className="w-4 h-4 text-slate-500" />
          <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            Active Overlays
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-600 bg-surface-800 px-2 py-0.5 rounded-full border border-surface-700">
          {overlays.length} / {MAX_OVERLAYS}
        </span>
      </div>

      {/* The List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">

        <AnimatePresence mode="popLayout" initial={false}>
          {overlays.map((overlay, index) => (
            <motion.div
              key={overlay.id}
              layout
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 1 }}
            >
              <OverlayItem
                overlay={overlay}
                index={index}
                isLast={index === overlays.length - 1}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* "Add Overlay" Button Card */}
        {!isLimitReached && (
          <motion.button
            layout
            onClick={addOverlay}
            className={cn(
              "group relative flex flex-col items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed transition-all cursor-pointer min-h-[92px]",
              "border-surface-700 bg-surface-800/20 hover:border-primary-500/40 hover:bg-primary-500/5 hover:shadow-[0_0_20px_rgba(14,165,233,0.05)]"
            )}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-2 text-slate-400 group-hover:text-primary-400 transition-colors">
              <Plus className="w-5 h-5" />
              <span className="text-sm font-bold tracking-tight">Add Overlay</span>
            </div>
            <span className="text-[10px] text-slate-600 group-hover:text-slate-500">
              Compare another ratio
            </span>
          </motion.button>
        )}
      </div>

      {/* Limit Warning (Optional visibility) */}
      {isLimitReached && (
        <p className="text-center text-[10px] text-slate-600 italic py-2">
          Maximum of {MAX_OVERLAYS} overlays reached.
        </p>
      )}
    </section>
  );
};