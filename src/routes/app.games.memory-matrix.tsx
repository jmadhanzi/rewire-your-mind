import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { PrimaryButton } from "@/components/rewire/PrimaryButton";
import { GhostButton } from "@/components/rewire/GhostButton";
import { useUserStore } from "@/store/user";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/app/games/memory-matrix")({
  component: Page,
});

const SYMBOLS = ["🧩", "🌊", "⚡", "🔧", "🌿", "💬"] as const;
const TOTAL_PAIRS = SYMBOLS.length;

type Card = { id: number; symbol: string; matched: boolean };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(): Card[] {
  const pairs = SYMBOLS.flatMap((s) => [s, s]);
  return shuffle(pairs).map((symbol, id) => ({ id, symbol, matched: false }));
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function Page() {
  const navigate = useNavigate();
  const addSession = useUserStore((s) => s.addSession);
  const { user } = useAuth();

  const [cards, setCards] = useState<Card[]>(() => buildDeck());
  const [revealed, setRevealed] = useState<number[]>([]);
  const [previewing, setPreviewing] = useState(true);
  const [score, setScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [matches, setMatches] = useState(0);
  const [complete, setComplete] = useState(false);
  const [savedKey, setSavedKey] = useState<number | null>(null);

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addTimeout = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  };

  // Initial preview flash
  useEffect(() => {
    addTimeout(() => setPreviewing(false), 1500);
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Timer (starts after preview, stops on complete)
  useEffect(() => {
    if (previewing || complete) return;
    intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [previewing, complete]);

  // Animate score
  useEffect(() => {
    if (displayScore === score) return;
    const step = score > displayScore ? 1 : -1;
    const id = setInterval(() => {
      setDisplayScore((d) => {
        if (d === score) {
          clearInterval(id);
          return d;
        }
        const next = d + step * Math.max(1, Math.floor(Math.abs(score - d) / 6));
        if ((step > 0 && next >= score) || (step < 0 && next <= score)) {
          clearInterval(id);
          return score;
        }
        return next;
      });
    }, 25);
    return () => clearInterval(id);
  }, [score, displayScore]);

  // Detect completion
  useEffect(() => {
    if (matches === TOTAL_PAIRS && !complete) {
      setComplete(true);
    }
  }, [matches, complete]);

  // Save session once on completion
  useEffect(() => {
    if (!complete || savedKey !== null) return;
    const accuracy = attempts === 0 ? 100 : Math.round((TOTAL_PAIRS / attempts) * 100);
    const key = Date.now();
    setSavedKey(key);
    addSession({
      gameId: "memory-matrix",
      score,
      accuracy,
      durationSec: seconds,
      skill: "Memory",
      at: key,
    });
    if (user) {
      supabase
        .from("game_sessions")
        .insert({
          user_id: user.id,
          game_id: "memory-matrix",
          score,
          accuracy,
          duration_seconds: seconds,
          cognitive_domain: "Memory",
        })
        .then(({ error }) => {
          if (error) console.error("save session", error);
        });
    }
  }, [complete, savedKey, attempts, score, seconds, addSession, user]);

  const handleTap = (idx: number) => {
    if (previewing || complete) return;
    if (revealed.includes(idx)) return;
    if (cards[idx].matched) return;
    if (revealed.length === 2) return;

    const next = [...revealed, idx];
    setRevealed(next);

    if (next.length === 2) {
      const [a, b] = next;
      setAttempts((n) => n + 1);
      if (cards[a].symbol === cards[b].symbol) {
        addTimeout(() => {
          setCards((cs) =>
            cs.map((c, i) => (i === a || i === b ? { ...c, matched: true } : c)),
          );
          setMatches((m) => m + 1);
          setScore((s) => s + 50);
          setRevealed([]);
          toast.success("Match!", { duration: 1200 });
        }, 350);
      } else {
        addTimeout(() => {
          setRevealed([]);
          setScore((s) => Math.max(0, s - 5));
        }, 800);
      }
    }
  };

  const reset = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCards(buildDeck());
    setRevealed([]);
    setPreviewing(true);
    setScore(0);
    setDisplayScore(0);
    setSeconds(0);
    setAttempts(0);
    setMatches(0);
    setComplete(false);
    setSavedKey(null);
    addTimeout(() => setPreviewing(false), 1500);
  };

  const accuracy = useMemo(
    () => (attempts === 0 ? 100 : Math.round((TOTAL_PAIRS / Math.max(attempts, TOTAL_PAIRS)) * 100)),
    [attempts],
  );

  return (
    <div className="relative min-h-screen px-5 pt-12 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <Link
          to="/app/games"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.07] bg-[#131A2E] text-white/70"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-[16px] font-extrabold">Memory Matrix</h1>
        <div className="rounded-full border border-[#7858FF]/40 bg-[#7858FF]/15 px-3 py-1.5 text-[12px] font-bold text-[#A78BFA] tabular-nums">
          {displayScore}
        </div>
      </div>

      {/* Info bar */}
      <div className="mt-5 flex items-center justify-between text-[12px]">
        <span className="text-white/60">Find all matching pairs</span>
        <span className="rounded-full bg-white/[0.05] px-2.5 py-1 font-semibold tabular-nums text-white/80">
          ⏱ {formatTime(seconds)}
        </span>
      </div>

      {/* Grid */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        {cards.map((c, i) => {
          const isRevealed = previewing || revealed.includes(i) || c.matched;
          return (
            <button
              key={c.id}
              onClick={() => handleTap(i)}
              disabled={previewing || c.matched || revealed.length === 2}
              className="relative aspect-[3/4] [perspective:800px]"
              aria-label={isRevealed ? c.symbol : "Hidden card"}
            >
              <div
                className={cn(
                  "relative h-full w-full transition-transform duration-300 [transform-style:preserve-3d]",
                  isRevealed && "[transform:rotateY(180deg)]",
                  c.matched && "scale-[1.05]",
                )}
              >
                {/* Back (hidden) */}
                <div className="absolute inset-0 flex items-center justify-center rounded-[18px] border border-[#7858FF]/30 bg-[#131A2E] text-[22px] font-bold text-[#7858FF]/50 [backface-visibility:hidden]">
                  ?
                </div>
                {/* Front (revealed) */}
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center rounded-[18px] text-[34px] [transform:rotateY(180deg)] [backface-visibility:hidden]",
                    c.matched
                      ? "border border-[#00D9A3] bg-[#00D9A3]/20"
                      : "border border-white/40 bg-white",
                  )}
                >
                  {c.symbol}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom counters */}
      <div className="mt-6 flex items-center justify-between rounded-[18px] border border-white/[0.07] bg-[#131A2E] px-4 py-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
            Score
          </div>
          <div className="text-[18px] font-black tabular-nums">{displayScore}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
            Pairs
          </div>
          <div className="text-[18px] font-black tabular-nums">
            {matches}/{TOTAL_PAIRS}
          </div>
        </div>
      </div>

      {/* Complete overlay */}
      {complete && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center">
          <div
            className="w-full max-w-md rounded-t-[28px] border border-white/[0.07] bg-[#0D1226] p-6 sm:rounded-[28px]"
            style={{ animation: "fadeUp 350ms ease-out" }}
          >
            <h2
              className="text-center text-[24px] font-black leading-tight"
              style={{ letterSpacing: "-0.6px" }}
            >
              Session complete! 🎉
            </h2>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-[14px] border border-white/[0.07] bg-[#131A2E] p-3 text-center">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
                  Score
                </div>
                <div className="mt-1 text-[20px] font-black text-[#7858FF] tabular-nums">
                  {score}
                </div>
              </div>
              <div className="rounded-[14px] border border-white/[0.07] bg-[#131A2E] p-3 text-center">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
                  Accuracy
                </div>
                <div className="mt-1 text-[20px] font-black text-[#00D9A3] tabular-nums">
                  {accuracy}%
                </div>
              </div>
              <div className="rounded-[14px] border border-white/[0.07] bg-[#131A2E] p-3 text-center">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
                  Time
                </div>
                <div className="mt-1 text-[20px] font-black text-white tabular-nums">
                  {formatTime(seconds)}
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 text-[12px]">
              <span className="text-white/60">Cognitive skill trained:</span>
              <span className="rounded-full border border-[#00D9A3]/40 bg-[#00D9A3]/15 px-2.5 py-1 font-bold uppercase tracking-widest text-[#00D9A3]">
                Memory
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <PrimaryButton onClick={() => navigate({ to: "/app/games" })}>
                Back to games →
              </PrimaryButton>
              <GhostButton onClick={reset}>Play again</GhostButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}