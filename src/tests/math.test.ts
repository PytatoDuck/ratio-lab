import { describe, it, expect } from 'vitest';
import {
  getGCD,
  simplifyResolution,
  calculateMissingDimension,
  parseRatioString,
  formatRatioString
} from '../lib/math';

describe('Math Utilities', () => {

  describe('getGCD()', () => {
    it('calculates standard GCD correctly', () => {
      expect(getGCD(1920, 1080)).toBe(120);
      expect(getGCD(2560, 1440)).toBe(160);
      expect(getGCD(1080, 1080)).toBe(1080);
    });

    it('handles edge cases safely', () => {
      expect(getGCD(0, 1080)).toBe(1080);
      expect(getGCD(1920, 0)).toBe(1920);
      expect(getGCD(0, 0)).toBe(1); // Safe fallback
      expect(getGCD(-1920, 1080)).toBe(120); // Handles negatives gracefully
    });
  });

  describe('simplifyResolution()', () => {
    it('simplifies common resolutions into correct aspect ratios', () => {
      expect(simplifyResolution(1920, 1080)).toEqual({ ratioX: 16, ratioY: 9 });
      expect(simplifyResolution(3840, 2160)).toEqual({ ratioX: 16, ratioY: 9 });
      expect(simplifyResolution(1080, 1920)).toEqual({ ratioX: 9, ratioY: 16 });
      expect(simplifyResolution(2560, 1080)).toEqual({ ratioX: 64, ratioY: 27 }); // 21:9 is technically 64:27 mathematically!
      expect(simplifyResolution(1080, 1080)).toEqual({ ratioX: 1, ratioY: 1 });
    });

    it('returns 1:1 fallback for invalid or zero inputs', () => {
      expect(simplifyResolution(0, 1080)).toEqual({ ratioX: 1, ratioY: 1 });
      expect(simplifyResolution(-100, -100)).toEqual({ ratioX: 1, ratioY: 1 });
    });
  });

  describe('calculateMissingDimension()', () => {
    it('calculates Height when Width and Ratio are provided', () => {
      // Width: 1920, Ratio: 16:9 -> Target Height?
      expect(calculateMissingDimension(1920, 16, 9)).toBe(1080);
      // Width: 2560, Ratio: 21:9 -> Target Height?
      expect(calculateMissingDimension(2560, 21, 9)).toBe(1097); // 1097.14 rounded
    });

    it('calculates Width when Height and Ratio are provided', () => {
      // Height: 1080, Ratio: 9:16 (working backwards for width) -> Target Width?
      expect(calculateMissingDimension(1080, 9, 16)).toBe(1920);
    });

    it('returns 0 for invalid or negative inputs', () => {
      expect(calculateMissingDimension(0, 16, 9)).toBe(0);
      expect(calculateMissingDimension(1920, 0, 9)).toBe(0);
      expect(calculateMissingDimension(1920, 16, -5)).toBe(0);
    });
  });

  describe('parseRatioString()', () => {
    it('parses standard colon-separated strings', () => {
      expect(parseRatioString('16:9')).toEqual({ ratioX: 16, ratioY: 9 });
      expect(parseRatioString('21:9')).toEqual({ ratioX: 21, ratioY: 9 });
    });

    it('handles spaces and slashes', () => {
      expect(parseRatioString(' 16 : 9 ')).toEqual({ ratioX: 16, ratioY: 9 });
      expect(parseRatioString('16/9')).toEqual({ ratioX: 16, ratioY: 9 });
    });

    it('handles decimal cinematic ratios', () => {
      // 1.85:1 simplified usually becomes 37:20
      expect(parseRatioString('1.85:1')).toEqual({ ratioX: 37, ratioY: 20 });
      // 2.35:1 simplified usually becomes 47:20
      expect(parseRatioString('2.35:1')).toEqual({ ratioX: 47, ratioY: 20 });
    });

    it('returns null for garbage or invalid strings', () => {
      expect(parseRatioString('hello')).toBeNull();
      expect(parseRatioString('16::9')).toBeNull();
      expect(parseRatioString('16:0')).toBeNull();
      expect(parseRatioString('-16:9')).toBeNull();
    });
  });

  describe('formatRatioString()', () => {
    it('formats valid numbers into a string', () => {
      expect(formatRatioString(16, 9)).toBe('16:9');
    });

    it('returns 1:1 fallback for 0 or negatives', () => {
      expect(formatRatioString(0, 9)).toBe('1:1');
      expect(formatRatioString(16, -5)).toBe('1:1');
    });
  });
});