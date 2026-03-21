/**
 * Shared cursor state — updated by BoatCursor, read by WavePattern.
 * Avoids React re-renders for smooth 60fps cursor tracking.
 */
export type CursorSnapshot = {
  x: number;
  y: number;
  velocity: number;
  isOverWaves: boolean;
};

const WAVE_SECTION_HEIGHT = 220;

let snapshot: CursorSnapshot = {
  x: 0,
  y: 0,
  velocity: 0,
  isOverWaves: false,
};

export function getCursorSnapshot(): CursorSnapshot {
  return snapshot;
}

export function updateCursorSnapshot(update: Partial<CursorSnapshot>) {
  snapshot = { ...snapshot, ...update };
}

export function getIsOverWaves(clientY: number): boolean {
  if (typeof window === "undefined") return false;
  return clientY >= window.innerHeight - WAVE_SECTION_HEIGHT;
}
