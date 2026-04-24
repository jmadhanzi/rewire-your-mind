import { PrimaryButton } from "./PrimaryButton";
import { MILESTONE_MESSAGES } from "@/lib/streak";

type Props = {
  streak: number;
  onDismiss: () => void;
};

export function StreakCelebration({ streak, onDismiss }: Props) {
  const message =
    MILESTONE_MESSAGES[streak] ?? `${streak} days strong — keep the momentum going.`;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-6">
      <div
        className="w-full max-w-sm rounded-[28px] border border-[#F5C518]/40 bg-[#0D1226] p-8 text-center"
        style={{ animation: "fadeUp 350ms ease-out" }}
      >
        <div
          className="mx-auto text-[88px] leading-none"
          style={{ animation: "streakBounce 1.2s ease-in-out infinite, flamePulse 2s ease-in-out infinite" }}
        >
          🔥
        </div>
        <h2
          className="mt-4 text-[28px] font-black leading-tight text-[#F5C518]"
          style={{ letterSpacing: "-0.6px" }}
        >
          {streak} Day Streak!
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-white/70">{message}</p>
        <div className="mt-6">
          <PrimaryButton onClick={onDismiss}>Keep going →</PrimaryButton>
        </div>
      </div>
    </div>
  );
}