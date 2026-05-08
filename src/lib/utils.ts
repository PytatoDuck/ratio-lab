import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind classes safely, resolving any conflicts.
 * 
 * @param inputs - An array of class values (strings, objects, or arrays)
 * @returns A merged, conflict-free string of Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}