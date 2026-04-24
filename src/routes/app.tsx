import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Home, Gamepad2, TrendingUp, Users, User } from "lucide-react";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

const tabs = [
  { to: "/app/home", label: "Home", icon: Home },
  { to: "/app/games", label: "Games", icon: Gamepad2 },
  { to: "/app/progress", label: "Progress", icon: TrendingUp },
  { to: "/app/social", label: "Friends", icon: Users },
  { to: "/app/me", label: "Me", icon: User },
] as const;

function AppLayout() {
  return (
    <div className="min-h-screen bg-[#07091A] text-white">
      <div className="mx-auto max-w-md pb-24">
        <Outlet />
      </div>
      <nav className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t border-white/[0.07] bg-[#0D1226]/95 backdrop-blur">
        <div className="grid grid-cols-5">
          {tabs.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center gap-1 py-3 text-[10px] uppercase tracking-widest text-white/35"
              activeProps={{ className: "flex flex-col items-center gap-1 py-3 text-[10px] uppercase tracking-widest text-[#7858FF]" }}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
