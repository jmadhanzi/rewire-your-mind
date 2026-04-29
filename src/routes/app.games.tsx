import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Lock, Zap, Brain, Target, Cpu, Leaf, MessageSquare, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/user";
import { isFreeGame, isPro, FREE_DAILY_SESSION_LIMIT } from "@/lib/freemium";
import { ProGateSheet } from "@/components/rewire/ProGateSheet";
import { MotionScreen } from "@/components/rewire/MotionScreen";
import { motion, AnimatePresence } from "framer-motion";
import { GamesSkeleton } from "@/components/rewire/skeletons/GamesSkeleton";
import { useAuth } from "@/hooks/use-auth";
import { todayKey } from "@/lib/streak";

export const Route = createFileRoute("/app/games")({
  component: Page,
});

type Category = "All" | "Focus" | "Memory" | "Speed" | "Logic" | "Calm";
type Difficulty = "Easy" | "Medium" | "Hard";

type Game = {
  id: string;
  icon: React.ReactNode;
  name: string;
  category: Exclude<Category, "All">;
  desc: string;
  minutes: number;
  difficulty: Difficulty;
  color: string;
  gradient: string;
  featured?: boolean;
};

const GAMES: Game[] = [
  {
    id: "memory-matrix",
    icon: <Brain className="h-6 w-6" />,
    name: "Memory Matrix",
    category: "Memory",
    desc: "Flip & match symbol pairs. Sharpens working memory.",
    minutes: 3,
    difficulty: "Medium",
    color: "#00D9A3",
    gradient: "from-[#00D9A3]/20 to-[#00B5A3]/10",
    featured: true,
  },
  {
    id: "focus-flow",
    icon: <Target className="h-6 w-6" />,
    name: "Focus Flow",
    category: "Focus",
    desc: "Track the moving target without losing concentration.",
    minutes: 2,
    difficulty: "Easy",
    color: "#7858FF",
    gradient: "from-[#7858FF]/20 to-[#5b3eff]/10",
  },
  {
    id: "speed-tap",
    icon: <Zap className="h-6 w-6" />,
    name: "Speed Tap",
    category: "Speed",
    desc: "React faster than your reflexes think possible.",
    minutes: 1,
    difficulty: "Hard",
    color: "#F5C518",
    gradient: "from-[#F5C518]/20 to-[#e8a800]/10",
  },
  {
    id: "logic-maze",
    icon: <Cpu className="h-6 w-6" />,
    name: "Logic Maze",
    category: "Logic",
    desc: "Navigate hidden paths through pure reasoning.",
    minutes: 4,
    difficulty: "Hard",
    color: "#FF6B6B",
    gradient: "from-[#FF6B6B]/20 to-[#e05555]/10",
  },
  {
    id: "calm-count",
    icon: <Leaf className="h-6 w-6" />,
    name: "Calm Count",
    category: "Calm",
    desc: "Mindful number awareness with breathing cues.",
    minutes: 5,
    difficulty: "Easy",
    color: "#A78BFA",
    gradient: "from-[#A78BFA]/20 to-[#8b6bf5]/10",
  },
  {
    id: "word-storm",
    icon: <MessageSquare className="h-6 w-6" />,
    name: "Word Storm",
    category: "Logic",
    desc: "Find hidden connections between concepts.",
    minutes: 3,
    difficulty: "Medium",
    color: "#F5C518",
    gradient: "from-[#F5C518]/15 to-[#FF9500]/10",
  },
];

const CATEGORIES: { id: Category; emoji: string }[] = [
  { id: "All", emoji: "✦" },
  { id: "Focus", emoji: "🎯" },
  { id: "Memory", emoji: "🧠" },
  { id: "Speed", emoji: "⚡" },
  { id: "Logic", emoji: "🔧" },
  { id: "Calm", emoji: "🌿" },
];

const DIFF_COLORS: Record<Difficulty, string> = {
  Easy: "#00D9A3",
  Medium: "#F5C518",
  Hard: "#FF6B6B",
};

function Page() {
  const navigate = useNavigate();
  const [active, setActive] = useState<Category>("All");
  const subscriptionTier = useUserStore((s) => s.subscriptionTier);
  const sessionsToday = useUserStore((s) => {
    const today = todayKey();
    return s.sessionsTodayDate === today ? s.sessionsToday : 0;
  });
  const hydrated = useUserStore((s) => s.hydrated);
  const { user, loading: authLoading } = useAuth();
  const pro = isPro(subscriptionTier);
  const limitReached = !pro && sessionsToday >= FREE_DAILY_SESSION_LIMIT;
  const [gate, setGate] = useState<{ title: string; message: string } | null>(null);

  const filtered = useMemo(
    () => (active === "All" ? GAMES : GAMES.filter((g) => g.category === active)),
    [active],
  );

  if (authLoading || (user && !hydrated)) {
    return <MotionScreen><GamesSkeleton /></MotionScreen>;
  }

  const openGame = (gameId: string) => {
    if (!pro && !isFreeGame(gameId)) {
      setGate({ title: "Pro game 🔒", message: "Unlock all 6 games and unlimited daily sessions with Rewire Pro." });
      return;
    }
    if (limitReached) {
      setGate({ title: "Daily limit reached 🌙", message: `You've used your ${FREE_DAILY_SESSION_LIMIT} free sessions today. Upgrade for unlimited.` });
      return;
    }
    navigate({ to: "/app/games/$gameId", params: { gameId } });
  };

  const featured = GAMES.find((g) => g.featured)!;

  return (
    <MotionScreen className="px-5 pt-12 pb-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-[26px] font-black leading-tight" style={{ letterSpacing: "-0.7px" }}>
            Games
          </h1>
          <p className="mt-0.5 text-[12px] text-white/40">
            {pro ? "Unlimited sessions" : `${sessionsToday}/${FREE_DAILY_SESSION_LIMIT} free sessions today`}
          </p>
        </div>
        {!pro && (
          <button
            onClick={() => navigate({ to: "/paywall" })}
            className="rounded-full bg-[#7858FF]/15 px-3 py-1.5 text-[11px] font-bold text-[#A78BFA] border border-[#7858FF]/25"
          >
            Go Pro →
          </button>
        )}
      </div>

      {/* Featured game */}
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
        onClick={() => openGame(featured.id)}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "mt-5 w-full rounded-[22px] border border-[#00D9A3]/30 p-4 text-left",
          "bg-gradient-to-br from-[#00D9A3]/[0.12] to-transparent",
        )}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[18px] border border-[#00D9A3]/25 bg-[#00D9A3]/15 text-[#00D9A3]">
            <Brain className="h-8 w-8" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#00D9A3]/20 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#00D9A3]">
                ⭐ Recommended
              </span>
            </div>
            <h2 className="mt-1 text-[18px] font-extrabold leading-tight">{featured.name}</h2>
            <p className="mt-0.5 text-[12px] text-white/55">{featured.desc}</p>
            <div className="mt-1.5 flex items-center gap-3 text-[11px] text-white/40">
              <span>{featured.minutes} min</span>
              <span>·</span>
              <span style={{ color: DIFF_COLORS[featured.difficulty] }}>{featured.difficulty}</span>
            </div>
          </div>
          <div className="shrink-0 rounded-2xl bg-[#00D9A3] px-3.5 py-2.5 text-[13px] font-bold text-[#07091A]">
            Play →
          </div>
        </div>
      </motion.button>

      {/* Category pills */}
      <div className="-mx-5 mt-5 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2">
          {CATEGORIES.map((c) => {
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-[12px] font-semibold transition-all",
                  isActive
                    ? "border-[#7858FF] bg-[#7858FF] text-white shadow-[0_4px_16px_rgba(120,88,255,0.4)]"
                    : "border-white/[0.08] bg-[#131A2E] text-white/50 hover:text-white/70",
                )}
              >
                {c.emoji} {c.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Game grid */}
      <AnimatePresence mode="popLayout">
        <div className="mt-4 grid grid-cols-2 gap-3">
          {filtered.map((g, i) => {
            const locked = !pro && !isFreeGame(g.id);
            return (
              <motion.button
                key={g.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => openGame(g.id)}
                whileTap={{ scale: 0.96 }}
                className={cn(
                  "relative flex flex-col rounded-[20px] border border-white/[0.07] p-3.5 text-left",
                  `bg-gradient-to-br ${g.gradient}`,
                  locked && "opacity-70",
                )}
              >
                {locked && (
                  <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-[#7858FF]/30 bg-[#7858FF]/15">
                    <Lock className="h-3.5 w-3.5 text-[#A78BFA]" />
                  </span>
                )}
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-[14px]"
                  style={{ backgroundColor: `${g.color}25`, color: g.color }}
                >
                  {g.icon}
                </div>
                <h3 className="mt-3 text-[13px] font-bold leading-tight">{g.name}</h3>
                <p className="mt-1 text-[11px] leading-snug text-white/40">{g.desc}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] text-white/40">{g.minutes} min</span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider"
                    style={{ backgroundColor: `${locked ? "#7858FF" : DIFF_COLORS[g.difficulty]}20`, color: locked ? "#A78BFA" : DIFF_COLORS[g.difficulty] }}
                  >
                    {locked ? "Pro" : g.difficulty}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </AnimatePresence>

      <ProGateSheet open={gate !== null} title={gate?.title} message={gate?.message} onClose={() => setGate(null)} />
    </MotionScreen>
  );
}
