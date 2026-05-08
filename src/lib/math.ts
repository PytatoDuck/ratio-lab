/**
 * Calculates the Greatest Common Divisor (GCD) using the Euclidean algorithm.
 * Used for simplifying raw resolutions into their base aspect ratio.
 */
export function getGCD(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));

  // Prevent infinite loops on 0
  if (b === 0) return a === 0 ? 1 : a;

  return getGCD(b, a % b);
}

/**
 * Takes a width and height and returns the simplified aspect ratio.
 * Example: 1920, 1080 -> { ratioX: 16, ratioY: 9 }
 */
export function simplifyResolution(width: number, height: number): { ratioX: number; ratioY: number } {
  // Prevent division by zero and invalid negative dimensions
  if (width <= 0 || height <= 0) {
    return { ratioX: 1, ratioY: 1 }; // Safe fallback
  }

  const gcd = getGCD(width, height);

  return {
    ratioX: Math.round(width / gcd),
    ratioY: Math.round(height / gcd),
  };
}

/**
 * Calculates the missing dimension when the aspect ratio is LOCKED.
 * 
 * @param knownDimension - The value the user just typed (e.g., they typed a new Width)
 * @param knownRatioPart - The ratio component for the dimension they typed (e.g., 16)
 * @param targetRatioPart - The ratio component for the dimension we need to find (e.g., 9)
 * @returns The calculated dimension, rounded to the nearest integer.
 */
export function calculateMissingDimension(
  knownDimension: number,
  knownRatioPart: number,
  targetRatioPart: number
): number {
  if (knownRatioPart <= 0 || targetRatioPart <= 0 || knownDimension <= 0) {
    return 0; // Invalid input safety
  }

  // Formula: (Known Dimension / Known Ratio Part) * Target Ratio Part
  const calculated = (knownDimension / knownRatioPart) * targetRatioPart;
  return Math.round(calculated);
}

/**
 * Parses a string input (e.g., "16:9", "16/9", " 16 : 9 ") into numeric ratio parts.
 * 
 * @returns An object with ratioX and ratioY, or null if parsing fails.
 */
export function parseRatioString(input: string): { ratioX: number; ratioY: number } | null {
  // Replace slashes with colons, strip all whitespace
  const sanitized = input.replace(/\//g, ':').replace(/\s+/g, '');

  // Regex strictly expects Number:Number or Number:Number.Number
  const regex = /^(\d+(\.\d+)?):(\d+(\.\d+)?)$/;
  const match = sanitized.match(regex);

  if (!match) return null;

  const ratioX = parseFloat(match[1]);
  const ratioY = parseFloat(match[3]);

  if (isNaN(ratioX) || isNaN(ratioY) || ratioX <= 0 || ratioY <= 0) {
    return null;
  }

  // If the user inputs something like "1.77:1", we want to simplify it back to whole numbers
  // by multiplying both sides until they are integers (simple approach for common decimals)
  if (!Number.isInteger(ratioX) || !Number.isInteger(ratioY)) {
    // Multiply by 100 to handle common decimals, then simplify
    const scaledX = Math.round(ratioX * 100);
    const scaledY = Math.round(ratioY * 100);
    return simplifyResolution(scaledX, scaledY);
  }

  return { ratioX, ratioY };
}

/**
 * Utility to format ratio numbers into a clean string (e.g. { ratioX: 16, ratioY: 9 } -> "16:9")
 */
export function formatRatioString(ratioX: number, ratioY: number): string {
  if (ratioX <= 0 || ratioY <= 0) return "1:1"; // fallback
  return `${ratioX}:${ratioY}`;
}