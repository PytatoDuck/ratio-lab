import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Overlay, AppContextType } from '../types';
import { calculateMissingDimension, simplifyResolution } from '../lib/math';
import { DEFAULT_BASE_COLOR, OVERLAY_COLORS } from '../constants/colors';

// Provide a safe fallback for ID generation if crypto isn't available
const generateId = () => typeof crypto !== 'undefined' && crypto.randomUUID
  ? crypto.randomUUID()
  : Math.random().toString(36).substring(2, 9);

const AppContext = createContext<AppContextType | null>(null);

const MAX_OVERLAYS = 4;

const initialState: Overlay[] = [
  {
    id: generateId(),
    name: 'Base Canvas',
    width: 1920,
    height: 1080,
    ratioX: 16,
    ratioY: 9,
    color: DEFAULT_BASE_COLOR,
    isLocked: true,
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [overlays, setOverlays] = useState<Overlay[]>(initialState);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  /**
   * Core update function. Dynamically handles the math based on lock state.
   */
  const updateOverlay = useCallback((id: string, updates: Partial<Overlay>) => {
    setOverlays((prev) => prev.map((overlay) => {
      if (overlay.id !== id) return overlay;

      // Create a draft of the new overlay with simple merged values
      let draft = { ...overlay, ...updates };

      // SCENARIO 1: The Ratio changed. We always update Height to match the new ratio against current Width.
      if (updates.ratioX !== undefined || updates.ratioY !== undefined) {
        draft.height = calculateMissingDimension(draft.width, draft.ratioX, draft.ratioY);
      }
      // SCENARIO 2: Width changed
      else if (updates.width !== undefined) {
        if (draft.isLocked) {
          draft.height = calculateMissingDimension(draft.width, draft.ratioX, draft.ratioY);
        } else {
          // Unlocked: recalculate the base aspect ratio based on the raw numbers
          const newRatio = simplifyResolution(draft.width, draft.height);
          draft.ratioX = newRatio.ratioX;
          draft.ratioY = newRatio.ratioY;
        }
      }
      // SCENARIO 3: Height changed
      else if (updates.height !== undefined) {
        if (draft.isLocked) {
          // Working backwards to find width
          draft.width = calculateMissingDimension(draft.height, draft.ratioY, draft.ratioX);
        } else {
          const newRatio = simplifyResolution(draft.width, draft.height);
          draft.ratioX = newRatio.ratioX;
          draft.ratioY = newRatio.ratioY;
        }
      }

      return draft;
    }));
  }, []);

  /**
   * Adds a new overlay up to the MAX_OVERLAYS limit.
   */
  const addOverlay = useCallback(() => {
    setOverlays((prev) => {
      if (prev.length >= MAX_OVERLAYS) return prev;

      // Pick a color that isn't the base color
      const colorIndex = prev.length % OVERLAY_COLORS.length;
      const newOverlay: Overlay = {
        id: generateId(),
        name: `Overlay ${prev.length}`,
        width: 1920,
        height: 1080,
        ratioX: 16,
        ratioY: 9,
        color: OVERLAY_COLORS[colorIndex === 0 ? 1 : colorIndex],
        isLocked: true,
      };

      // Select the newly added overlay automatically
      setSelectedIndex(prev.length);
      return [...prev, newOverlay];
    });
  }, []);

  /**
   * Removes an overlay, preventing deletion of the final remaining item.
   */
  const removeOverlay = useCallback((id: string) => {
    setOverlays((prev) => {
      if (prev.length <= 1) return prev; // Must have at least 1 item

      const indexToRemove = prev.findIndex(o => o.id === id);
      const newOverlays = prev.filter(o => o.id !== id);

      // Adjust selected index so it doesn't point to a deleted item
      setSelectedIndex((current) => {
        if (current === indexToRemove) return Math.max(0, current - 1);
        if (current > indexToRemove) return current - 1;
        return current;
      });

      return newOverlays;
    });
  }, []);

  /**
   * Moves an overlay up or down in the array.
   * Index 0 is strictly treated as the "Base Canvas" by the visualizer.
   */
  const moveOverlay = useCallback((index: number, direction: 'up' | 'down') => {
    setOverlays((prev) => {
      const newOverlays = [...prev];
      if (direction === 'up' && index > 0) {
        // Swap with previous
        [newOverlays[index - 1], newOverlays[index]] = [newOverlays[index], newOverlays[index - 1]];

        // Track the selected index so the toolbox doesn't lose focus
        setSelectedIndex((current) => current === index ? index - 1 : current === index - 1 ? index : current);
      }
      else if (direction === 'down' && index < newOverlays.length - 1) {
        // Swap with next
        [newOverlays[index + 1], newOverlays[index]] = [newOverlays[index], newOverlays[index + 1]];

        setSelectedIndex((current) => current === index ? index + 1 : current === index + 1 ? index : current);
      }
      return newOverlays;
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        overlays,
        selectedIndex,
        updateOverlay,
        setSelectedIndex,
        addOverlay,
        removeOverlay,
        moveOverlay
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

/**
 * Custom hook to consume the AppContext easily inside components.
 */
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};