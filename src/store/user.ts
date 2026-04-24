import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BrainScores = {
  focus: number;
  memory: number;
  speed: number;
  logic: number;
  calm: number;
};

export type SessionRecord = {
  gameId: string;
  score: number;
  accuracy: number;
  durationSec: number;
  skill: string;
  at: number;
};

type State = {
  streak: number;
  totalSessions: number;
  focusImprovement: number;
  programProgress: number;
  leaderboardRank: number;
  brainScores: BrainScores;
  currentDay: number;
  sessionHistory: SessionRecord[];
  setStreak: (n: number) => void;
  setBrainScores: (s: Partial<BrainScores>) => void;
  addSession: (s: SessionRecord) => void;
};

export const useUserStore = create<State>()(
  persist(
    (set) => ({
      streak: 7,
      totalSessions: 156,
      focusImprovement: 41,
      programProgress: 89,
      leaderboardRank: 42,
      brainScores: { focus: 42, memory: 72, speed: 59, logic: 74, calm: 54 },
      currentDay: 4,
      sessionHistory: [],
      setStreak: (streak) => set({ streak }),
      setBrainScores: (s) =>
        set((state) => ({ brainScores: { ...state.brainScores, ...s } })),
      addSession: (s) =>
        set((state) => ({
          sessionHistory: [s, ...state.sessionHistory].slice(0, 50),
          totalSessions: state.totalSessions + 1,
        })),
    }),
    { name: "rewire-user" },
  ),
);