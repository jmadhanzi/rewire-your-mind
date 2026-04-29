import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogOut, Crown, Brain, Zap, Target, Smile, Gauge, ChevronRight, RotateCcw } from "lucide-react";
import { Card } from "@/components/rewire/Card";
import { useAuth } from "@/hooks/use-auth";
import { useUserStore } from "@/store/user";
import { useOnboardingStore } from "@/store/onboarding";
import { isPro } from "@/lib/freemium";
import { MotionScreen } from "@/components/rewire/MotionScreen";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/me")({
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const subscriptionTier = useUserStore((s) => s.subscriptionTier);
  const streak = useUserStore((s) => s.streak);
  const totalSessions = useUserStore((s) => s.totalSessions);
  const brainScores = useUserStore((s) => s.brainScores);
  const streakSaversRemaining = useUserStore((s) => s.streakSaversRemaining);
  const resetUser = useUserStore((s) => s.reset);
  const resetOnboarding = useOnboardingStore((s) => s.reset);
  const pro = isPro(subscriptionTier);
  const [signingOut, setSigningOut] = useState(false);

  const displayName =
    user?.user_metadata?.display_name ||
    user?.email?.split("@")[0] ||
    "Trainer";

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    resetUser();
    resetOnboarding();
    navigate({ to: "/" });
  };

  const brainItems = [
    { label: "Focus", score: brainScores.focus, color: "#7858FF", icon: <Target className="h-3.5 w-3.5" /> },
    { label: "Memory", score: brainScores.memory, color: "#00D9A3", icon: <Brain className="h-3.5 w-3.5" /> },
    { label: "Speed", score: brainScores.speed, color: "#F5C518", icon: <Zap className="h-3.5 w-3.5" /> },
    { label: "Logic", score: brainScores.logic, color: "#FF6B6B", icon: <Gauge className="h-3.5 w-3.5" /> },
    { label: "Calm", score: brainScores.calm, color: "#A78BFA", icon: <Smile className="h-3.5 w-3.5" /> },
  ];

  return (
    <MotionScreen className="px-6 pt-12 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/35">
            Profile
          </p>
          <h1
            className="mt-1 text-[28px] font-black leading-tight"
            style={{ letterSpacing: "-0.8px" }}
          >
            {displayName}
          </h1>
          {user?.email && (
            <p className="mt-0.5 text-[13px] text-white/45">{user.email}</p>
          )}
        </div>
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full text-[28px]",
            pro
              ? "bg-gradient-to-br from-[#7858FF]/30 to-[#00D9A3]/20 shadow-[0_0_24px_rgba(120,88,255,0.4)]"
              : "bg-white/[0.06]",
          )}
        >
          {pro ? "👑" : "🧠"}
        </div>
      </div>

      {/* Subscription badge */}
      <div className="mt-4">
        {pro ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#7858FF]/40 bg-[#7858FF]/15 px-3 py-1.5 text-[12px] font-bold text-[#A78BFA]">
            <Crown className="h-3.5 w-3.5" /> Pro member
          </span>
        ) : (
          <button
            onClick={() => navigate({ to: "/paywall" })}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-[#131A2E] px-3 py-1.5 text-[12px] font-bold text-white/60 transition-colors hover:border-[#7858FF]/40 hover:text-[#A78BFA]"
          >
            Free plan <span className="ml-1 text-[#7858FF]">→ Upgrade</span>
          </button>
        )}
      </div>

      {/* Stats row */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          { icon: "🔥", value: streak, label: "Streak" },
          { icon: "⚡", value: totalSessions, label: "Sessions" },
          { icon: "🛡️", value: streakSaversRemaining, label: "Savers" },
        ].map((s) => (
          <Card key={s.label} className="flex flex-col items-center py-3.5">
            <span className="text-[20px] leading-none">{s.icon}</span>
            <span
              className="mt-1.5 text-[20px] font-black leading-none tabular-nums"
              style={{ letterSpacing: "-0.5px" }}
            >
              {s.value}
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-white/40">
              {s.label}
            </span>
          </Card>
        ))}
      </div>

      {/* Brain scores */}
      <Card className="mt-4">
        <h2 className="text-[13px] font-bold">Brain profile</h2>
        <div className="mt-3 space-y-2.5">
          {brainItems.map((b) => (
            <div key={b.label} className="flex items-center gap-3">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                style={{ backgroundColor: `${b.color}26`, color: b.color }}
              >
                {b.icon}
              </span>
              <div className="flex-1">
                <div className="mb-1 flex items-center justify-between text-[11px]">
                  <span className="text-white/60">{b.label}</span>
                  <span className="font-bold tabular-nums" style={{ color: b.color }}>
                    {b.score > 0 ? b.score : "—"}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: b.score > 0 ? `${Math.min(b.score, 100)}%` : "0%",
                      backgroundColor: b.color,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
          {brainItems.every((b) => b.score === 0) && (
            <p className="py-1 text-center text-[12px] text-white/40">
              Play games to build your brain profile.
            </p>
          )}
        </div>
      </Card>

      {/* Settings */}
      <Card className="mt-4 overflow-hidden p-0">
        {!pro && (
          <button
            onClick={() => navigate({ to: "/paywall" })}
            className="flex w-full items-center gap-3 border-b border-white/[0.05] px-4 py-3.5 text-left transition-colors hover:bg-white/[0.03]"
          >
            <Crown className="h-4 w-4 text-[#A78BFA]" />
            <span className="flex-1 text-[13px] font-semibold text-[#A78BFA]">Upgrade to Pro</span>
            <ChevronRight className="h-4 w-4 text-white/30" />
          </button>
        )}
        <button
          onClick={() => navigate({ to: "/onboarding/goals" })}
          className="flex w-full items-center gap-3 border-b border-white/[0.05] px-4 py-3.5 text-left transition-colors hover:bg-white/[0.03]"
        >
          <RotateCcw className="h-4 w-4 text-white/50" />
          <span className="flex-1 text-[13px] font-semibold text-white/70">Redo onboarding</span>
          <ChevronRight className="h-4 w-4 text-white/30" />
        </button>
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[#FF6B6B]/[0.06] disabled:opacity-50"
        >
          <LogOut className="h-4 w-4 text-[#FF6B6B]" />
          <span className="flex-1 text-[13px] font-semibold text-[#FF6B6B]">
            {signingOut ? "Signing out…" : "Sign out"}
          </span>
        </button>
      </Card>

      {!user && (
        <button
          onClick={() => navigate({ to: "/login" })}
          className="mt-4 w-full rounded-[18px] border border-[#7858FF]/30 bg-[#7858FF]/10 py-3.5 text-[13px] font-bold text-[#A78BFA] transition-colors hover:bg-[#7858FF]/20"
        >
          Sign in to save your progress →
        </button>
      )}

      <p className="mt-6 text-center text-[11px] text-white/25">
        Rewire v1.0 · Built for ADHD minds
      </p>
    </MotionScreen>
  );
}
