import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useUserStore } from "@/store/user";
import { FREE_DAILY_SESSION_LIMIT, isFreeGame, isPro, timeUntilMidnight } from "@/lib/freemium";
import { PrimaryButton } from "@/components/rewire/PrimaryButton";
import { GhostButton } from "@/components/rewire/GhostButton";
import { useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/app/games/$gameId")({
  component: Page,
});

function Page() {
  const { gameId } = Route.useParams();
  const navigate = useNavigate();
  const subscriptionTier = useUserStore((s) => s.subscriptionTier);
  const getSessionsToday = useUserStore((s) => s.getSessionsToday);
  const pro = isPro(subscriptionTier);
  const sessionsToday = getSessionsToday();

  // Redirect Memory Matrix to its real implementation
  if (gameId === "memory-matrix") {
    return <Navigate to="/app/games/memory-matrix" />;
  }

  // Locked Pro game
  if (!pro && !isFreeGame(gameId)) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7858FF]/20 shadow-[0_0_28px_rgba(120,88,255,0.55)]">
          <Lock className="h-7 w-7 text-[#A78BFA]" />
        </div>
        <h1 className="mt-4 text-[22px] font-black" style={{ letterSpacing: "-0.5px" }}>
          Pro game
        </h1>
        <p className="mt-2 max-w-[260px] text-[13px] text-white/60">
          Unlock all 6 games and unlimited daily sessions with Rewire Pro.
        </p>
        <div className="mt-6 w-full max-w-xs space-y-3">
          <PrimaryButton onClick={() => navigate({ to: "/paywall" })}>
            Upgrade to Pro →
          </PrimaryButton>
          <GhostButton onClick={() => navigate({ to: "/app/games" })}>Back to games</GhostButton>
        </div>
      </div>
    );
  }

  // Daily limit reached
  if (!pro && sessionsToday >= FREE_DAILY_SESSION_LIMIT) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-12 text-center">
        <div className="text-[48px]">🌙</div>
        <h1 className="mt-3 text-[22px] font-black" style={{ letterSpacing: "-0.5px" }}>
          Daily limit reached
        </h1>
        <p className="mt-2 max-w-[280px] text-[13px] text-white/60">
          You've completed your {FREE_DAILY_SESSION_LIMIT} free sessions today. Resets in{" "}
          <span className="font-bold text-white">{timeUntilMidnight()}</span>.
        </p>
        <div className="mt-6 w-full max-w-xs space-y-3">
          <PrimaryButton onClick={() => navigate({ to: "/paywall" })}>
            Upgrade for unlimited →
          </PrimaryButton>
          <GhostButton onClick={() => navigate({ to: "/app/home" })}>
            Come back tomorrow
          </GhostButton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-12 text-center">
      <div className="text-[48px]">🚧</div>
      <h1 className="mt-3 text-[22px] font-black" style={{ letterSpacing: "-0.5px" }}>
        Coming soon
      </h1>
      <p className="mt-2 text-[13px] text-white/50">
        {gameId.replace(/-/g, " ")} is being built.
      </p>
      <Link
        to="/app/games"
        className="mt-6 rounded-full border border-white/[0.07] bg-[#131A2E] px-5 py-2.5 text-[12px] font-semibold text-white/70"
      >
        ← Back to games
      </Link>
    </div>
  );
}