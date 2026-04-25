import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  skipRestartConfirm: boolean;
  setSkipRestartConfirm: (v: boolean) => void;
};

export const useSettingsStore = create<State>()(
  persist(
    (set) => ({
      skipRestartConfirm: false,
      setSkipRestartConfirm: (skipRestartConfirm) => set({ skipRestartConfirm }),
    }),
    { name: "rewire-settings" },
  ),
);