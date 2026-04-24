import { PrimaryButton } from "./PrimaryButton";
import { GhostButton } from "./GhostButton";

type Props = {
  streak: number;
  saversRemaining: number;
  onUseSaver: () => void;
  onLetGo: () => void;
};

export function StreakSaverModal({ streak, saversRemaining, onUseSaver, onLetGo }: Props) {
  const canSave = saversRemaining > 0;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 backdrop-blur-sm sm:items-center px-0 sm:px-6">
      <div
        className="w-full max-w-md rounded-t-[28px] border border-white/[0.07] bg-[#0D1226] p-6 sm:rounded-[28px]"
        style={{ animation: "fadeUp 350ms ease-out" }}
      >
        <div className="text-center">
          <div className="text-[56px] leading-none" style={{ animation: "flamePulse 2s ease-in-out infinite" }}>
            🔥
          </div>
          <h2
            className="mt-3 text-[22px] font-black leading-tight"
            style={{ letterSpacing: "-0.5px" }}
          >
            Save your streak?
          </h2>
          <p className="mt-2 text-[13px] text-white/60">
            You're about to lose your <span className="font-bold text-[#F5C518]">{streak}-day</span> streak
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <PrimaryButton onClick={onUseSaver} disabled={!canSave}>
            {canSave
              ? `Use a Streak Saver (${saversRemaining} remaining)`
              : "No streak savers left"}
          </PrimaryButton>
          <GhostButton onClick={onLetGo}>Let it go</GhostButton>
        </div>

        {!canSave && (
          <p className="mt-3 text-center text-[11px] text-white/40">
            Free users get 2 streak savers per month. Upgrade for unlimited.
          </p>
        )}
      </div>
    </div>
  );
}