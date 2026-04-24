import { todayKey } from "./streak";

export const FREE_GAME_IDS = ["memory-matrix", "focus-flow", "calm-count", "word-storm"] as const;
export const FREE_DAILY_SESSION_LIMIT = 8;
export const FREE_AD_EVERY_N_SESSIONS = 3;
export const FREE_MONTHLY_STREAK_SAVERS = 2;

export function isFreeGame(gameId: string): boolean {
  return (FREE_GAME_IDS as readonly string[]).includes(gameId);
}

export function isPro(tier: string | null | undefined): boolean {
  return tier === "pro" || tier === "annual";
}

/** Time until local midnight in "Xh Ym" form. */
export function timeUntilMidnight(now: Date = new Date()): string {
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  const ms = next.getTime() - now.getTime();
  const hours = Math.floor(ms / 3_600_000);
  const mins = Math.floor((ms % 3_600_000) / 60_000);
  return `${hours}h ${mins}m`;
}

export function isSameDay(dateKey: string | null): boolean {
  return !!dateKey && dateKey === todayKey();
}