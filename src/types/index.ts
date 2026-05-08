/**
 * Represents a single aspect ratio or resolution layer.
 * Index 0 in the application state is always treated as the "Base Canvas".
 */
export interface Overlay {
  /** Unique identifier for React lists and selection logic */
  id: string;

  /** User-defined name (Like "Banner", "Avatar") */
  name: string;

  /** Pixel width of the resolution */
  width: number;

  /** Pixel height of the resolution */
  height: number;

  /** The horizontal part of the ratio (Like 16 in 16:9) */
  ratioX: number;

  /** The vertical part of the ratio (Like 9 in 16:9) */
  ratioY: number;

  /** Hex code or CSS variable for the overlay stroke/fill color */
  color: string;

  /** 
   * When true: Changing width auto-calculates height based on the ratio.
   * When false: Changing width/height manually recalculates the simplified ratio.
   */
  isLocked: boolean;
}

/**
 * Used for the preset dropdown in the Toolbox.
 */
export interface Preset {
  /** The name of the format ("UltraWide" or whatever) */
  label: string;

  /** Brief description ("Cinema & Gaming") */
  description: string;

  /** Horizontal ratio value */
  ratioX: number;

  /** Vertical ratio value */
  ratioY: number;
}

/**
 * Global application metadata (used for Header, Footer, and SEO).
 */
export interface AppConfig {
  author: string;
  githubUrl: string;
  appName: string;
  version: string;
}

/**
 * The shape of our Global State (Context).
 * This defines how components interact with the data.
 */
export interface AppContextType {
  /** Array of all active overlays. index 0 = base. */
  overlays: Overlay[];

  /** The index of the overlay currently being edited in the Toolbox. */
  selectedIndex: number;

  /** Updates a specific overlay by ID with new values */
  updateOverlay: (id: string, updates: Partial<Overlay>) => void;

  /** Changes which overlay is currently being edited */
  setSelectedIndex: (index: number) => void;

  /** Adds a new overlay with default settings */
  addOverlay: () => void;

  /** Removes an overlay from the list */
  removeOverlay: (id: string) => void;

  /** Moves an overlay up or down in the list (changing the visual priority) */
  moveOverlay: (index: number, direction: 'up' | 'down') => void;
}