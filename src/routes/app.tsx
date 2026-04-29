import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { Home, Gamepad2, Sparkles, BarChart3, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useUserStore } from "@/store/user";
import { StreakCelebration } from "@/components/rewire/StreakCelebration";
import { StreakSaverModal } from "@/components/rewire/StreakSaverModal";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

const TABS = [
  { to: "/app/home", label: "Home", icon: Home },
  { to: "/app/games", label: "Games", icon: Gamepad2 },
  { to: "/app/coach", label: "Coach", icon: Sparkles },
  { to: "/app/progress", label: "Progress", icon: BarChart3 },
  { to: "/app/me", label: "Me", icon: User },
] as const;

function AppLayout() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const syncFromSupabase = useUserStore((s) => s.syncFromSupabase);
  const evaluateStreakForUser = useUserStore((s) => s.evaluateStreakForUser);
  const useStreakSaver = useUserStore((s) => s.useStreakSaver);
  const dismissStreakReset = useUserStore((s) => s.dismissStreakReset);
  const clearMilestone = useUserStore((s) => s.clearMilestone);
  const pendingMilestone = useUserStore((s) => s.pendingMilestone);
  const pendingStreakReset = useUserStore((s) => s.pendingStreakReset);
  const streakSaversRemaining = useUserStore((s) => s.streakSaversRemaining);

  useEffect(() => {
    if (user) {
      syncFromSupabase(user.id)
        .then(() => evaluateStreakForUser(user.id))
        .catch(() => {});
    }
  }, [user, syncFromSupabase, evaluateStreakForUser]);

  return (
    <div className="flex h-screen flex-col bg-[#07091A] text-white">
      <div className="flex-1 overflow-y-auto pb-[80px]">
        <div className="mx-auto max-w-md">
          <Outlet />
        </div>
      </div>

      {/* Premium bottom nav */}
      <nav
        className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* Glass blur background */}
        <div className="absolute inset-0 border-t border-white/[0.06] bg-[#07091A]/90 backdrop-blur-2xl" />

        <div className="relative grid grid-cols-5 px-2 py-1.5">
          {TABS.map((tab) => {
            const active = pathname === tab.to || pathname.startsWith(tab.to + "/");
            const Icon = tab.icon;
            return (
              <Link
                key={tab.to}
                to={tab.to}
                className="group flex flex-col items-center gap-1 px-1 py-2"
              >
                {/* Icon container */}
                <div
                  className={cn(
                    "relative flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-200",
                    active
                      ? "bg-[#7858FF]/20 shadow-[0_0_16px_rgba(120,88,255,0.3)]"
                      : "group-active:bg-white/[0.06]",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-[19px] w-[19px] transition-all duration-200",
                      active ? "text-[#7858FF]" : "text-white/40",
                    )}
                    strokeWidth={active ? 2.5 : 1.8}
                  />
                  {/* Active dot */}
                  {active && (
                    <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#7858FF] shadow-[0_0_6px_rgba(120,88,255,0.8)]" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-[9px] font-semibold uppercase tracking-widest transition-colors duration-200",
                    active ? "text-[#7858FF]" : "text-white/25",
                  )}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {pendingStreakReset && (
        <StreakSaverModal
          streak={pendingStreakReset.previousStreak}
          saversRemaining={streakSaversRemaining}
          onUseSaver={() => user && useStreakSaver(user.id)}
          onLetGo={() => user && dismissStreakReset(user.id)}
        />
      )}
      {pendingMilestone !== null && (
        <StreakCelebration streak={pendingMilestone} onDismiss={clearMilestone} />
      )}
    </div>
  );
}
