import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const ICONS = ["🧠", "⚡", "🌿", "🎯", "🔥", "✨"];

function makeDeck() {
  const pairs = [...ICONS, ...ICONS].map((icon, i) => ({ id: i, icon }));
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs;
}

type Props = { onComplete?: () => void };

export function MiniMemory({ onComplete }: Props) {
  const [deck, setDeck] = useState(() => makeDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [pulseFirst, setPulseFirst] = useState(false);

  const isComplete = matched.size === deck.length;

  useEffect(() => {
    if (interacted) return;
    const t = setTimeout(() => setPulseFirst(true), 8000);
    return () => clearTimeout(t);
  }, [interacted]);

  useEffect(() => {
    if (isComplete && onComplete) onComplete();
  }, [isComplete, onComplete]);

  useEffect(() => {
    if (flipped.length !== 2) return;
    const [a, b] = flipped;
    if (deck[a].icon === deck[b].icon) {
      setMatched((prev) => new Set([...prev, a, b]));
      setFlipped([]);
    } else {
      const t = setTimeout(() => setFlipped([]), 700);
      return () => clearTimeout(t);
    }
  }, [flipped, deck]);

  const handleClick = (i: number) => {
    if (isComplete) return;
    if (flipped.length === 2) return;
    if (flipped.includes(i) || matched.has(i)) return;
    setInteracted(true);
    setPulseFirst(false);
    setFlipped((prev) => {
      const next = [...prev, i];
      if (next.length === 2) setMoves((m) => m + 1);
      return next;
    });
  };

  const reset = () => {
    setDeck(makeDeck());
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setInteracted(false);
    setPulseFirst(false);
  };

  const grid = useMemo(() => deck, [deck]);

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between text-[12px]">
        <span className="font-bold uppercase tracking-widest text-white/40">
          Memory Matrix
        </span>
        <span className="text-white/60">
          Moves <span className="font-black text-white">{moves}</span> · Pairs{" "}
          <span className="font-black text-[#00D9A3]">{matched.size / 2}</span>/6
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
        {grid.map((card, i) => {
          const isShown = flipped.includes(i) || matched.has(i);
          const isMatched = matched.has(i);
          return (
            <button
              key={card.id}
              onClick={() => handleClick(i)}
              className="relative aspect-square w-full"
              aria-label={isShown ? `Card ${card.icon}` : "Hidden card"}
            >
              <motion.div
                animate={{ rotateY: isShown ? 180 : 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className={`absolute inset-0 flex items-center justify-center rounded-xl border border-white/[0.08] bg-[#131A2E] ${
                    pulseFirst && i === 0 && !isShown
                      ? "animate-pulse ring-2 ring-[#7858FF]/60"
                      : ""
                  }`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <span className="text-[18px] text-white/20">?</span>
                </div>
                <div
                  className={`absolute inset-0 flex items-center justify-center rounded-xl border text-[22px] sm:text-[26px] ${
                    isMatched
                      ? "border-[#00D9A3]/50 bg-[#00D9A3]/15"
                      : "border-[#7858FF]/40 bg-[#7858FF]/15"
                  }`}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {card.icon}
                </div>
              </motion.div>
            </button>
          );
        })}
      </div>
      {isComplete && (
        <div className="mt-4 rounded-2xl border border-[#00D9A3]/40 bg-[#00D9A3]/10 p-4 text-center">
          <div className="text-[15px] font-black text-white">
            You just trained your memory 🎉
          </div>
          <div className="mt-1 text-[12px] text-white/60">
            Imagine doing this every day.
          </div>
          <button
            onClick={reset}
            className="mt-3 text-[11px] font-bold uppercase tracking-widest text-[#A78BFA] hover:text-white"
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
