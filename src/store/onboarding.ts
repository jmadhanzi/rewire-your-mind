import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BrainProfile = {
  focus?: number;
  memory?: number;
  impulse?: number;
  speed?: number;
  archetype?: string;
};

type State = {
  goals: string[];
  challenges: string[];
  identity: string;
  timeCommitment: string;
  baselineScore: number | null;
  brainProfile: BrainProfile;
  setGoals: (v: string[]) => void;
  setChallenges: (v: string[]) => void;
  setIdentity: (v: string) => void;
  setTimeCommitment: (v: string) => void;
  setBaselineScore: (v: number) => void;
  setBrainProfile: (v: BrainProfile) => void;
  reset: () => void;
};

export const useOnboardingStore = create<State>()(
  persist(
    (set) => ({
      goals: [],
      challenges: [],
      identity: "",
      timeCommitment: "",
      baselineScore: null,
      brainProfile: {},
      setGoals: (goals) => set({ goals }),
      setChallenges: (challenges) => set({ challenges }),
      setIdentity: (identity) => set({ identity }),
      setTimeCommitment: (timeCommitment) => set({ timeCommitment }),
      setBaselineScore: (baselineScore) => set({ baselineScore }),
      setBrainProfile: (brainProfile) => set({ brainProfile }),
      reset: () =>
        set({
          goals: [],
          challenges: [],
          identity: "",
          timeCommitment: "",
          baselineScore: null,
          brainProfile: {},
        }),
    }),
    { name: "rewire-onboarding" },
  ),
);
