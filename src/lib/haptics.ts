/** Tiny wrapper around the Vibration API. No-op when unsupported. */
function vibrate(pattern: number | number[]) {
  if (typeof navigator === "undefined") return;
  const nav = navigator as Navigator & { vibrate?: (p: number | number[]) => boolean };
  if (typeof nav.vibrate === "function") {
    try {
      nav.vibrate(pattern);
    } catch {
      /* ignore */
    }
  }
}

export const haptics = {
  match: () => vibrate(50),
  miss: () => vibrate([30, 50, 30]),
  milestone: () => vibrate([100, 50, 100, 50, 200]),
  tap: () => vibrate(15),
};