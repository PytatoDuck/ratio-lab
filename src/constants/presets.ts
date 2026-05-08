/**
 * A predefined list of common aspect ratios.
 * Used in the Toolbox dropdown to quickly snap an overlay to a standard format.
 */
import type { Preset } from '../types';

export const PRESETS: Preset[] = [
  {
    label: '16:9',
    description: 'Widescreen (YouTube, TV)',
    ratioX: 16,
    ratioY: 9,
  },
  {
    label: '9:16',
    description: 'Vertical (TikTok, Shorts)',
    ratioX: 9,
    ratioY: 16,
  },
  {
    label: '1:1',
    description: 'Square (Instagram)',
    ratioX: 1,
    ratioY: 1,
  },
  {
    label: '21:9',
    description: 'Ultrawide (Cinematic, Monitors)',
    ratioX: 21,
    ratioY: 9,
  },
  {
    label: '4:3',
    description: 'Classic (iPad, Old TV)',
    ratioX: 4,
    ratioY: 3,
  },
  {
    label: '16:10',
    description: 'Display (MacBooks, Tablets)',
    ratioX: 16,
    ratioY: 10,
  },
  {
    label: '3:2',
    description: 'Photography (Print, Surface Pro)',
    ratioX: 3,
    ratioY: 2,
  },
];