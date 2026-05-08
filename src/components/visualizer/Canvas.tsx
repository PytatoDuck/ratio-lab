import React, { useMemo } from 'react';
import { motion, type Transition } from 'motion/react';
import { useApp } from '../../context/AppContext';

export const Canvas: React.FC = () => {
  const { overlays } = useApp();

  const baseOverlay = overlays[0];
  const comparisonOverlays = overlays.slice(1);

  const maxDimensions = useMemo(() => {
    let maxWidth = baseOverlay.width || 1;
    let maxHeight = baseOverlay.height || 1;

    comparisonOverlays.forEach((overlay) => {
      if (overlay.width > maxWidth) maxWidth = overlay.width;
      if (overlay.height > maxHeight) maxHeight = overlay.height;
    });

    // 15% padding for breathing room
    const paddingX = maxWidth * 0.15;
    const paddingY = maxHeight * 0.15;

    return {
      totalWidth: maxWidth + paddingX * 2,
      totalHeight: maxHeight + paddingY * 2,
      centerX: (maxWidth + paddingX * 2) / 2,
      centerY: (maxHeight + paddingY * 2) / 2,
    };
  }, [baseOverlay, comparisonOverlays]);

  const springTransition: Transition = {
    type: "spring",
    stiffness: 200,
    damping: 25,
    mass: 0.8,
  };

  return (
    <div className="w-full bg-surface-800/80 backdrop-blur-xl border border-surface-700/50 rounded-2xl overflow-hidden shadow-2xl relative flex items-center justify-center p-4 min-h-75 lg:min-h-125 group">

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15] transition-opacity duration-1000 group-hover:opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      <motion.svg
        className="w-full h-full max-h-[75vh] drop-shadow-xl"
        initial={false}
        animate={{
          viewBox: `0 0 ${maxDimensions.totalWidth} ${maxDimensions.totalHeight}`
        }}
        transition={springTransition}
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.line
          x1={maxDimensions.centerX} y1={0} x2={maxDimensions.centerX} y2={maxDimensions.totalHeight}
          stroke="#ffffff" strokeOpacity={0.08} strokeWidth={Math.max(maxDimensions.totalWidth * 0.001, 1)}
          strokeDasharray="10,10"
        />
        <motion.line
          x1={0} y1={maxDimensions.centerY} x2={maxDimensions.totalWidth} y2={maxDimensions.centerY}
          stroke="#ffffff" strokeOpacity={0.08} strokeWidth={Math.max(maxDimensions.totalWidth * 0.001, 1)}
          strokeDasharray="10,10"
        />

        {/* Render Base Layer */}
        <motion.rect
          initial={false}
          animate={{
            x: maxDimensions.centerX - (baseOverlay.width / 2),
            y: maxDimensions.centerY - (baseOverlay.height / 2),
            width: baseOverlay.width,
            height: baseOverlay.height,
            fill: baseOverlay.color,
            fillOpacity: 0.1,
            stroke: baseOverlay.color,
            strokeWidth: Math.max(maxDimensions.totalWidth * 0.003, 2),
          }}
          transition={springTransition}
        />

        {/* Render Comparison Layers */}
        {comparisonOverlays.map((overlay, index) => {
          const dynamicStrokeWidth = Math.max(maxDimensions.totalWidth * 0.003, 2);

          return (
            <motion.rect
              key={overlay.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: maxDimensions.centerX - (overlay.width / 2),
                y: maxDimensions.centerY - (overlay.height / 2),
                width: overlay.width,
                height: overlay.height,
                stroke: overlay.color,
                strokeWidth: dynamicStrokeWidth,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ ...springTransition, delay: index * 0.05 }}
              fill="none"
              strokeDasharray={`${dynamicStrokeWidth * 3}, ${dynamicStrokeWidth * 4}`}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}
      </motion.svg>

      <div className="absolute bottom-4 right-4 flex items-center gap-2 pointer-events-none">
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold bg-surface-900/80 px-2.5 py-1.5 rounded-md backdrop-blur-md border border-surface-700/50 shadow-lg">
          Base: {baseOverlay.width} x {baseOverlay.height}
        </span>
      </div>
    </div>
  );
};