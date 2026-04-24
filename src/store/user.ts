import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "@/integrations/supabase/client";

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
  hydrated: boolean;
  setStreak: (n: number) => void;
  setBrainScores: (s: Partial<BrainScores>) => void;
  addSession: (s: SessionRecord) => void;
  syncFromSupabase: (userId: string) => Promise<void>;
  reset: () => void;
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
      hydrated: false,
      setStreak: (streak) => set({ streak }),
      setBrainScores: (s) =>
        set((state) => ({ brainScores: { ...state.brainScores, ...s } })),
      addSession: (s) =>
        set((state) => ({
          sessionHistory: [s, ...state.sessionHistory].slice(0, 50),
          totalSessions: state.totalSessions + 1,
        })),
      syncFromSupabase: async (userId) => {
        const [{ data: profile }, { data: brain }] = await Promise.all([
          supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
          supabase
            .from("brain_scores")
            .select("focus, memory, speed, logic, calm")
            .eq("user_id", userId)
            .order("recorded_at", { ascending: false })
            .limit(1)
            .maybeSingle(),
        ]);
        set((state) => ({
          hydrated: true,
          streak: profile?.current_streak ?? state.streak,
          totalSessions: profile?.total_sessions ?? state.totalSessions,
          brainScores: brain
            ? {
                focus: brain.focus,
                memory: brain.memory,
                speed: brain.speed,
                logic: brain.logic,
                calm: brain.calm,
              }
            : state.brainScores,
        }));
      },
      reset: () =>
        set({
          streak: 0,
          totalSessions: 0,
          focusImprovement: 0,
          programProgress: 0,
          leaderboardRank: 0,
          brainScores: { focus: 0, memory: 0, speed: 0, logic: 0, calm: 0 },
          currentDay: 1,
          sessionHistory: [],
          hydrated: false,
        }),
    }),
    { name: "rewire-user" },
  ),
);