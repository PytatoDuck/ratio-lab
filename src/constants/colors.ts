/**
 * Predefined, high-contrast swatches for the overlays.
 * These are guaranteed to look good as SVG strokes on a dark canvas.
 */

export const OVERLAY_COLORS = [
  '#10b981', // Emerald
  '#38bdf8', // Light Blue / Sky
  '#f472b6', // Pink
  '#facc15', // Yellow
  '#fb923c', // Orange
  '#a78bfa', // Violet / Purple
  '#fb7185', // Rose
  '#c084fc', // Fuchsia
] as const;

// The default color for the primary "Base" canvas
export const DEFAULT_BASE_COLOR = OVERLAY_COLORS[0];