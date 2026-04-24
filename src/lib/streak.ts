export const STREAK_MILESTONES = [3, 7, 14, 21, 30, 60, 100] as const;

export const MILESTONE_MESSAGES: Record<number, string> = {
  3: "Three days in. The habit is forming.",
  7: "One week strong! Your focus scores are up 15%.",
  14: "Two weeks of rewiring. Memory & speed climbing fast.",
  21: "21 days — research says the habit is yours now.",
  30: "A full month! You're in the top 8% of users.",
  60: "Two months. Your brain is measurably sharper.",
  100: "100 days. You are officially rewired.",
};

/** Local-timezone YYYY-MM-DD */
export function todayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function daysBetween(aIso: string, bIso: string): number {
  const a = new Date(aIso + "T00:00:00");
  const b = new Date(bIso + "T00:00:00");
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

export type StreakDecision = {
  /** new streak after evaluation */
  streak: number;
  /** whether streak was reset to 0 because of a missed day */
  reset: boolean;
  /** whether today has already been counted */
  countedToday: boolean;
};

/** Pure: decide what the streak should be on app open. */
export function evaluateStreakOnOpen(
  currentStreak: number,
  lastSessionDate: string | null,
  today: string = todayKey(),
): StreakDecision {
  if (!lastSessionDate) return { streak: 0, reset: false, countedToday: false };
  const diff = daysBetween(lastSessionDate, today);
  if (diff <= 0) return { streak: currentStreak, reset: false, countedToday: true };
  if (diff === 1) return { streak: currentStreak, reset: false, countedToday: false };
  return { streak: 0, reset: true, countedToday: false };
}

/** Pure: streak after completing a session today. */
export function applySessionToStreak(
  currentStreak: number,
  lastSessionDate: string | null,
  today: string = todayKey(),
): { streak: number; milestone: number | null } {
  let next = currentStreak;
  if (!lastSessionDate) {
    next = 1;
  } else {
    const diff = daysBetween(lastSessionDate, today);
    if (diff <= 0) next = currentStreak === 0 ? 1 : currentStreak;
    else if (diff === 1) next = currentStreak + 1;
    else next = 1;
  }
  const milestone = (STREAK_MILESTONES as readonly number[]).includes(next) ? next : null;
  return { streak: next, milestone };
}