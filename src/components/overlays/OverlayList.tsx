import React from 'react';
import { Plus, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { OverlayItem } from './OverlayItem';
import { cn } from '../../lib/utils';

export const OverlayList: React.FC = () => {
  const { overlays, addOverlay } = useApp();

  const MAX_OVERLAYS = 4;
  const isLimitReached = overlays.length >= MAX_OVERLAYS;

  return (
    <section className="flex flex-col gap-4">

      {/* Header with Counter */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Maximize className="w-4 h-4 text-emerald-500/60" />
          <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            Active Layers
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400 bg-surface-800 px-2.5 py-1 rounded-full border border-surface-700/50 shadow-inner">
          {overlays.length} / {MAX_OVERLAYS}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        <AnimatePresence mode="popLayout" initial={false}>
          {overlays.map((overlay, index) => (
            <motion.div
              key={overlay.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <OverlayItem
                overlay={overlay}
                index={index}
                isLast={index === overlays.length - 1}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add Button */}
        {!isLimitReached && (
          <motion.button
            layout
            onClick={addOverlay}
            className={cn(
              "group relative flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer min-h-25",
              "border-surface-700 bg-surface-800/20 hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]"
            )}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-2 text-slate-400 group-hover:text-emerald-400 transition-colors">
              <Plus className="w-5 h-5" />
              <span className="text-sm font-bold tracking-tight">Add Overlay</span>
            </div>
          </motion.button>
        )}
      </div>

      {isLimitReached && (
        <p className="text-center text-[10px] text-surface-600 italic py-2">
          Maximum of {MAX_OVERLAYS} overlays reached.
        </p>
      )}
    </section>
  );
};