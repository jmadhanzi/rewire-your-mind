import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useUserStore } from "@/store/user";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

const TABS = [
  { to: "/app/home", label: "Home", icon: "⚡" },
  { to: "/app/games", label: "Games", icon: "🎮" },
  { to: "/app/progress", label: "Progress", icon: "📊" },
  { to: "/app/social", label: "Friends", icon: "👥" },
  { to: "/app/me", label: "Me", icon: "👤" },
] as const;

function AppLayout() {
  const { pathname } = useLocation();
  const [pressed, setPressed] = useState<string | null>(null);
  const { user } = useAuth();
  const syncFromSupabase = useUserStore((s) => s.syncFromSupabase);

  useEffect(() => {
    if (user) {
      syncFromSupabase(user.id).catch(() => {});
    }
  }, [user, syncFromSupabase]);

  // clear press state after animation
  useEffect(() => {
    if (!pressed) return;
    const t = setTimeout(() => setPressed(null), 100);
    return () => clearTimeout(t);
  }, [pressed]);

  return (
    <div className="flex h-screen flex-col bg-[#07091A] text-white">
      <div className="flex-1 overflow-y-auto pb-[88px]">
        <div className="mx-auto max-w-md">
          <Outlet />
        </div>
      </div>
      <nav
        className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t border-white/[0.07] bg-[#0D1226]/95 backdrop-blur"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="grid grid-cols-5 px-2 py-2">
          {TABS.map((tab) => {
            const active = pathname === tab.to;
            const isPressed = pressed === tab.to;
            return (
              <Link
                key={tab.to}
                to={tab.to}
                onClick={() => setPressed(tab.to)}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 transition-transform",
                  isPressed ? "scale-[0.94]" : "scale-100",
                )}
                style={{ transitionDuration: "100ms" }}
              >
                <span className="text-[20px] leading-none">{tab.icon}</span>
                <span
                  className={cn(
                    "text-[9px] uppercase tracking-widest",
                    active ? "font-bold text-[#7858FF]" : "font-normal text-white/30",
                  )}
                >
                  {tab.label}
                </span>
                <span
                  className={cn(
                    "h-1 w-1 rounded-full transition-all",
                    active ? "bg-[#7858FF] shadow-[0_0_8px_#7858FF]" : "bg-transparent",
                  )}
                />
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}