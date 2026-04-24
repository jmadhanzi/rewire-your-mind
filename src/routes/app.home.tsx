import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Target, Brain, Zap } from "lucide-react";
import { AppHeader } from "@/components/rewire/AppHeader";
import { useUserStore } from "@/store/user";
import { useOnboardingStore } from "@/store/onboarding";
import { FREE_DAILY_SESSION_LIMIT, isPro } from "@/lib/freemium";
import { MotionScreen } from "@/components/rewire/MotionScreen";

export const Route = createFileRoute("/app/home")({
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const { currentDay, programProgress, totalSessions, focusImprovement, brainScores } =
    useUserStore();
  const goals = useOnboardingStore((s) => s.goals);
  const subscriptionTier = useUserStore((s) => s.subscriptionTier);
  const getSessionsToday = useUserStore((s) => s.getSessionsToday);
  const pro = isPro(subscriptionTier);
  const sessionsToday = getSessionsToday();

  const totalDays = 21;
  const focusArea =
    goals[0] === "focus"
      ? "Focus & Attention"
      : goals[0] === "memory"
        ? "Memory"
        : goals[0] === "calm"
          ? "Calm & Anxiety"
          : "Focus & Attention";

  return (
    <MotionScreen>
      <AppHeader greeting="Good morning 👋" title="Ready to rewire?" />

      <div className="px-6 pt-7 space-y-4">
        {!pro && (
          <div className="flex items-center justify-between rounded-full border border-white/[0.07] bg-[#131A2E] px-3.5 py-2">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-white/40">
              Free plan
            </span>
            <span className="text-[12px] font-bold tabular-nums text-white/80">
              {sessionsToday}/{FREE_DAILY_SESSION_LIMIT} sessions today
            </span>
          </div>
        )}
        {/* Today's focus card */}
        <div className="rounded-[22px] border border-white/[0.07] bg-[#131A2E] p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7858FF]/20">
                <Target className="h-3.5 w-3.5 text-[#A78BFA]" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                Today's focus
              </span>
            </div>
            <span className="text-[11px] font-semibold text-[#A78BFA]">Day {currentDay}</span>
          </div>
          <h2
            className="mt-3 text-[22px] font-black leading-tight"
            style={{ letterSpacing: "-0.6px" }}
          >
            {focusArea}
          </h2>
          <p className="mt-1.5 text-[13px] text-white/55">
            3 short games tuned to your brain profile. ~7 minutes total.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <Stat icon={<Brain className="h-3.5 w-3.5" />} value={`${brainScores.focus}`} label="Focus" color="#7858FF" />
            <Stat icon={<Zap className="h-3.5 w-3.5" />} value={`${brainScores.speed}`} label="Speed" color="#F5C518" />
            <Stat icon={<Brain className="h-3.5 w-3.5" />} value={`${brainScores.memory}`} label="Memory" color="#00D9A3" />
          </div>
        </div>

        {/* Program progress */}
        <div className="rounded-[22px] border border-white/[0.07] bg-[#131A2E] p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
              Program progress
            </span>
            <span className="text-[12px] font-bold text-[#00D9A3]">
              Day {currentDay} of {totalDays}
            </span>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#7858FF] to-[#00D9A3] shadow-[0_0_12px_rgba(0,217,163,0.55)]"
              style={{ width: `${(currentDay / totalDays) * 100}%` }}
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <BigStat value={programProgress} label="Program score" color="#7858FF" />
            <BigStat value={`+${focusImprovement}%`} label="Focus gain" color="#00D9A3" />
            <BigStat value={totalSessions} label="Sessions" color="#A78BFA" />
          </div>
        </div>

        {/* Next session CTA */}
        <button
          onClick={() => navigate({ to: "/app/games" })}
          className="group relative w-full overflow-hidden rounded-[22px] bg-gradient-to-br from-[#7858FF] to-[#5b3eff] p-5 text-left shadow-[0_8px_32px_rgba(120,88,255,0.45)] transition-all active:scale-[0.99]"
        >
          <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                Next session
              </div>
              <div
                className="mt-1 text-[20px] font-black leading-tight"
                style={{ letterSpacing: "-0.6px" }}
              >
                Start your daily workout
              </div>
              <div className="mt-1 text-[12px] text-white/75">
                3 games · ~7 min · keeps your streak alive
              </div>
            </div>
            <span className="ml-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 transition-transform group-active:translate-x-0.5">
              <ArrowRight className="h-5 w-5 text-white" />
            </span>
          </div>
        </button>
      </div>
    </MotionScreen>
  );
}

function Stat({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="flex flex-1 items-center gap-2 rounded-xl bg-white/[0.03] px-2.5 py-2">
      <span
        className="flex h-6 w-6 items-center justify-center rounded-md"
        style={{ backgroundColor: `${color}26`, color }}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-[13px] font-bold leading-none">{value}</div>
        <div className="mt-0.5 text-[10px] uppercase tracking-wider text-white/40">{label}</div>
      </div>
    </div>
  );
}

function BigStat({
  value,
  label,
  color,
}: {
  value: string | number;
  label: string;
  color: string;
}) {
  return (
    <div className="rounded-xl bg-white/[0.03] p-3">
      <div
        className="text-[20px] font-black leading-none"
        style={{ color, letterSpacing: "-0.5px" }}
      >
        {value}
      </div>
      <div className="mt-1.5 text-[10px] uppercase tracking-wider text-white/40">{label}</div>
    </div>
  );
}