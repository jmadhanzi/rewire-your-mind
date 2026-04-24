import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/games")({
  component: Page,
});

type Category = "All" | "Focus" | "Memory" | "Speed" | "Logic" | "Calm";
type Difficulty = "Easy" | "Medium" | "Hard";

type Game = {
  id: string;
  icon: string;
  name: string;
  category: Exclude<Category, "All">;
  desc: string;
  minutes: number;
  difficulty: Difficulty;
  color: string;
};

const GAMES: Game[] = [
  { id: "memory-matrix", icon: "🧩", name: "Memory Matrix", category: "Memory", desc: "Recall the pattern sequence", minutes: 3, difficulty: "Medium", color: "#00D9A3" },
  { id: "focus-flow", icon: "🌊", name: "Focus Flow", category: "Focus", desc: "Track the moving target", minutes: 2, difficulty: "Easy", color: "#7858FF" },
  { id: "speed-tap", icon: "⚡", name: "Speed Tap", category: "Speed", desc: "React faster than your brain", minutes: 1, difficulty: "Hard", color: "#F5C518" },
  { id: "logic-maze", icon: "🔧", name: "Logic Maze", category: "Logic", desc: "Find the hidden path", minutes: 4, difficulty: "Hard", color: "#FF6B6B" },
  { id: "calm-count", icon: "🌿", name: "Calm Count", category: "Calm", desc: "Mindful number awareness", minutes: 5, difficulty: "Easy", color: "#A78BFA" },
  { id: "word-storm", icon: "💬", name: "Word Storm", category: "Logic", desc: "Find hidden connections", minutes: 3, difficulty: "Medium", color: "#F5C518" },
];

const CATEGORIES: Category[] = ["All", "Focus", "Memory", "Speed", "Logic", "Calm"];

function Page() {
  const navigate = useNavigate();
  const [active, setActive] = useState<Category>("All");

  const filtered = useMemo(
    () => (active === "All" ? GAMES : GAMES.filter((g) => g.category === active)),
    [active],
  );

  return (
    <div className="px-6 pt-12 pb-6">
      <h1 className="text-[23px] font-black leading-tight" style={{ letterSpacing: "-0.6px" }}>
        Games
      </h1>

      {/* Featured */}
      <div className="mt-5 flex items-center gap-3 rounded-[20px] border border-[#00D9A3]/40 bg-[#00D9A3]/15 p-3">
        <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[16px] bg-[#00D9A3]/20 text-[28px]">
          🧩
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#00D9A3]">
            Recommended for you
          </p>
          <h2 className="mt-0.5 text-[16px] font-extrabold leading-tight">Memory Matrix</h2>
          <p className="mt-0.5 truncate text-[12px] text-white/60">
            Targets your #1 weak area · 3 min
          </p>
        </div>
        <button
          onClick={() => navigate({ to: "/app/games/$gameId", params: { gameId: "memory-matrix" } })}
          className="shrink-0 rounded-[13px] bg-[#00D9A3] px-4 py-2.5 text-[13px] font-bold text-[#041A10] transition-transform active:scale-[0.97]"
        >
          Play
        </button>
      </div>

      {/* Pills */}
      <div className="-mx-6 mt-6 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2">
          {CATEGORIES.map((c) => {
            const isActive = active === c;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-[12px] font-semibold transition-colors",
                  isActive
                    ? "border-[#7858FF] bg-[#7858FF] text-white"
                    : "border-white/[0.07] bg-[#131A2E] text-white/60",
                )}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {filtered.map((g) => (
          <button
            key={g.id}
            onClick={() => navigate({ to: "/app/games/$gameId", params: { gameId: g.id } })}
            className="flex flex-col rounded-[18px] border border-white/[0.07] bg-[#131A2E] p-3 text-left transition-transform active:scale-[0.98]"
          >
            <div
              className="flex h-[44px] w-[44px] items-center justify-center rounded-[13px] text-[22px]"
              style={{ backgroundColor: `${g.color}33` }}
            >
              {g.icon}
            </div>
            <h3 className="mt-3 text-[13px] font-bold leading-tight">{g.name}</h3>
            <p className="mt-1 text-[11px] leading-snug text-white/40">{g.desc}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] font-medium text-white/50">{g.minutes} min</span>
              <span
                className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: `${g.color}33`, color: g.color }}
              >
                {g.difficulty}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
