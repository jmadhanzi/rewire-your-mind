import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "@/integrations/supabase/client";
import { applySessionToStreak, evaluateStreakOnOpen, todayKey } from "@/lib/streak";

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
  lastSessionDate: string | null;
  streakSaversRemaining: number;
  pendingMilestone: number | null;
  pendingStreakReset: { previousStreak: number } | null;
  subscriptionTier: string;
  sessionsToday: number;
  sessionsTodayDate: string | null;
  setStreak: (n: number) => void;
  setBrainScores: (s: Partial<BrainScores>) => void;
  addSession: (s: SessionRecord) => void;
  getSessionsToday: () => number;
  recordSessionForUser: (userId: string, s: SessionRecord) => Promise<void>;
  evaluateStreakForUser: (userId: string) => Promise<void>;
  useStreakSaver: (userId: string) => Promise<boolean>;
  dismissStreakReset: (userId: string) => Promise<void>;
  clearMilestone: () => void;
  syncFromSupabase: (userId: string) => Promise<void>;
  reset: () => void;
};

export const useUserStore = create<State>()(
  persist(
    (set, get) => ({
      streak: 7,
      totalSessions: 156,
      focusImprovement: 41,
      programProgress: 89,
      leaderboardRank: 42,
      brainScores: { focus: 42, memory: 72, speed: 59, logic: 74, calm: 54 },
      currentDay: 4,
      sessionHistory: [],
      hydrated: false,
      lastSessionDate: null,
      streakSaversRemaining: 2,
      pendingMilestone: null,
      pendingStreakReset: null,
      subscriptionTier: "free",
      sessionsToday: 0,
      sessionsTodayDate: null,
      setStreak: (streak) => set({ streak }),
      setBrainScores: (s) =>
        set((state) => ({ brainScores: { ...state.brainScores, ...s } })),
      addSession: (s) =>
        set((state) => ({
          sessionHistory: [s, ...state.sessionHistory].slice(0, 50),
          totalSessions: state.totalSessions + 1,
        })),
      getSessionsToday: () => {
        const st = get();
        const today = todayKey();
        return st.sessionsTodayDate === today ? st.sessionsToday : 0;
      },
      recordSessionForUser: async (userId, s) => {
        const today = todayKey();
        const state = get();
        const { streak: newStreak, milestone } = applySessionToStreak(
          state.streak,
          state.lastSessionDate,
          today,
        );
        const sameDay = state.sessionsTodayDate === today;
        const newSessionsToday = (sameDay ? state.sessionsToday : 0) + 1;
        set((st) => ({
          sessionHistory: [s, ...st.sessionHistory].slice(0, 50),
          totalSessions: st.totalSessions + 1,
          streak: newStreak,
          lastSessionDate: today,
          pendingMilestone: milestone ?? st.pendingMilestone,
          sessionsToday: newSessionsToday,
          sessionsTodayDate: today,
        }));
        const { error } = await supabase
          .from("profiles")
          .update({
            current_streak: newStreak,
            last_session_date: today,
            total_sessions: state.totalSessions + 1,
          })
          .eq("id", userId);
        if (error) console.error("update streak", error);
      },
      evaluateStreakForUser: async (userId) => {
        const state = get();
        const decision = evaluateStreakOnOpen(state.streak, state.lastSessionDate);
        if (decision.reset && state.streak > 0) {
          // Don't auto-zero — let user see the streak saver modal first.
          set({ pendingStreakReset: { previousStreak: state.streak } });
        } else if (!decision.reset) {
          set({ streak: decision.streak });
          if (decision.streak !== state.streak) {
            await supabase
              .from("profiles")
              .update({ current_streak: decision.streak })
              .eq("id", userId);
          }
        }
      },
      useStreakSaver: async (userId) => {
        const state = get();
        if (state.streakSaversRemaining <= 0) return false;
        const today = todayKey();
        const newRemaining = state.streakSaversRemaining - 1;
        set({
          streakSaversRemaining: newRemaining,
          lastSessionDate: today,
          pendingStreakReset: null,
        });
        const { error } = await supabase
          .from("profiles")
          .update({
            streak_savers_remaining: newRemaining,
            last_session_date: today,
          })
          .eq("id", userId);
        if (error) console.error("use saver", error);
        return true;
      },
      dismissStreakReset: async (userId) => {
        set({ streak: 0, pendingStreakReset: null });
        const { error } = await supabase
          .from("profiles")
          .update({ current_streak: 0 })
          .eq("id", userId);
        if (error) console.error("dismiss streak", error);
      },
      clearMilestone: () => set({ pendingMilestone: null }),
      syncFromSupabase: async (userId) => {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const [{ data: profile }, { data: brain }, { data: sessions }] = await Promise.all([
          supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
          supabase
            .from("brain_scores")
            .select("focus, memory, speed, logic, calm")
            .eq("user_id", userId)
            .order("recorded_at", { ascending: false })
            .limit(1)
            .maybeSingle(),
          supabase
            .from("game_sessions")
            .select("game_id, score, accuracy, duration_seconds, cognitive_domain, played_at")
            .eq("user_id", userId)
            .gte("played_at", sevenDaysAgo.toISOString())
            .order("played_at", { ascending: false }),
        ]);
        set((state) => ({
          hydrated: true,
          streak: profile?.current_streak ?? state.streak,
          totalSessions: profile?.total_sessions ?? state.totalSessions,
          lastSessionDate: profile?.last_session_date ?? state.lastSessionDate,
          streakSaversRemaining:
            profile?.streak_savers_remaining ?? state.streakSaversRemaining,
          subscriptionTier: profile?.subscription_tier ?? state.subscriptionTier,
          brainScores: brain
            ? {
                focus: brain.focus,
                memory: brain.memory,
                speed: brain.speed,
                logic: brain.logic,
                calm: brain.calm,
              }
            : state.brainScores,
          sessionHistory: sessions
            ? sessions.map((r) => ({
                gameId: r.game_id,
                score: r.score,
                accuracy: r.accuracy,
                durationSec: r.duration_seconds,
                skill: r.cognitive_domain ?? "",
                at: new Date(r.played_at).getTime(),
              }))
            : state.sessionHistory,
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
          lastSessionDate: null,
          streakSaversRemaining: 2,
          pendingMilestone: null,
          pendingStreakReset: null,
          subscriptionTier: "free",
          sessionsToday: 0,
          sessionsTodayDate: null,
        }),
    }),
    { name: "rewire-user" },
  ),
);