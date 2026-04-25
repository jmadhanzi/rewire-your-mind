import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { ProgressBar } from "@/components/rewire/ProgressBar";
import { RestartOnboardingButton } from "@/components/rewire/RestartOnboardingButton";
import { PrimaryButton } from "@/components/rewire/PrimaryButton";
import { useOnboardingStore } from "@/store/onboarding";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding/game")({
  component: Page,
});

type Phase = "intro" | "showing" | "input" | "result";

const TILES = [
  { id: 0, color: "#7858FF" },
  { id: 1, color: "#00D9A3" },
  { id: 2, color: "#F5C518" },
  { id: 3, color: "#FF6B6B" },
];

const TOTAL_ROUNDS = 3;
const START_LEN = 3;
const SHOW_MS = 550;
const GAP_MS = 300;

function randomSeq(len: number): number[] {
  return Array.from({ length: len }, () => Math.floor(Math.random() * 4));
}

function Page() {
  const navigate = useNavigate();
  const setBaselineScore = useOnboardingStore((s) => s.setBaselineScore);

  const [phase, setPhase] = useState<Phase>("intro");
  const [round, setRound] = useState(1);
  const [sequence, setSequence] = useState<number[]>([]);
  const [userIdx, setUserIdx] = useState(0);
  const [litTile, setLitTile] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [score, setScore] = useState(0);

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  useEffect(() => () => clearTimeouts(), [clearTimeouts]);

  const playSequence = useCallback(
    (seq: number[]) => {
      clearTimeouts();
      setLitTile(null);
      seq.forEach((tile, i) => {
        const onAt = i * (SHOW_MS + GAP_MS) + 400;
        const offAt = onAt + SHOW_MS;
        timeoutsRef.current.push(setTimeout(() => setLitTile(tile), onAt));
        timeoutsRef.current.push(setTimeout(() => setLitTile(null), offAt));
      });
      const endAt = seq.length * (SHOW_MS + GAP_MS) + 400;
      timeoutsRef.current.push(
        setTimeout(() => {
          setPhase("input");
          setUserIdx(0);
        }, endAt),
      );
    },
    [clearTimeouts],
  );

  const startGame = () => {
    const seq = randomSeq(START_LEN);
    setSequence(seq);
    setRound(1);
    setCorrectCount(0);
    setUserIdx(0);
    setPhase("showing");
    playSequence(seq);
  };

  const finishGame = (finalCorrect: number) => {
    const finalScore = finalCorrect * 12;
    setScore(finalScore);
    setBaselineScore(finalScore);
    setPhase("result");
  };

  const handleTap = (id: number) => {
    if (phase !== "input" || litTile !== null) return;

    // brief flash on tap
    setLitTile(id);
    timeoutsRef.current.push(setTimeout(() => setLitTile(null), 180));

    const expected = sequence[userIdx];
    if (id !== expected) {
      finishGame(correctCount);
      return;
    }

    const newCorrect = correctCount + 1;
    setCorrectCount(newCorrect);
    const nextIdx = userIdx + 1;

    if (nextIdx >= sequence.length) {
      // round complete
      if (round >= TOTAL_ROUNDS) {
        timeoutsRef.current.push(setTimeout(() => finishGame(newCorrect), 400));
      } else {
        const nextSeq = [...sequence, Math.floor(Math.random() * 4)];
        timeoutsRef.current.push(
          setTimeout(() => {
            setRound(round + 1);
            setSequence(nextSeq);
            setUserIdx(0);
            setPhase("showing");
            playSequence(nextSeq);
          }, 700),
        );
      }
    } else {
      setUserIdx(nextIdx);
    }
  };

  const title =
    phase === "intro"
      ? "Quick baseline game"
      : phase === "result"
        ? "Baseline captured!"
        : `Round ${round} of ${TOTAL_ROUNDS}`;

  const subtitle =
    phase === "intro"
      ? "Watch the sequence, then tap it back. We'll measure where your memory starts today."
      : phase === "showing"
        ? "Watch carefully…"
        : phase === "input"
          ? "Now tap the sequence"
          : "Here's where your brain starts today";

  return (
    <main className="min-h-screen bg-[#07091A] text-white animate-[fadeUp_350ms_ease]">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 pb-10 pt-12">
        <div className="flex items-center gap-3">
          <button
            onClick={() => history.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-white/70 transition hover:bg-white/[0.1]"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex-1">
            <ProgressBar current={6} />
          </div>
          <RestartOnboardingButton />
        </div>
        <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#A78BFA]">
          Step 6 of 8
        </p>
        <h2 className="mt-2 text-[26px] font-black leading-tight" style={{ letterSpacing: "-0.8px" }}>
          {title}
        </h2>
        <p className="mt-2 text-[14px] text-white/60">{subtitle}</p>

        {phase === "intro" && (
          <div className="mt-10 flex flex-1 flex-col items-center justify-center text-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-[28px] bg-[#7858FF]/15 text-[64px] shadow-[0_8px_40px_rgba(120,88,255,0.35)]">
              🧠
            </div>
            <p className="mt-6 max-w-xs text-[14px] text-white/60">
              3 quick rounds. Each round adds one more tile to remember. Just do your best — there's no failing.
            </p>
          </div>
        )}

        {(phase === "showing" || phase === "input") && (
          <div className="mt-8 flex flex-1 flex-col">
            <div className="grid grid-cols-2 gap-3">
              {TILES.map((t) => {
                const lit = litTile === t.id;
                return (
                  <button
                    key={t.id}
                    disabled={phase !== "input"}
                    onClick={() => handleTap(t.id)}
                    className={cn(
                      "h-[120px] rounded-[22px] border-2 transition-all duration-150",
                      lit ? "scale-[1.04]" : "scale-100",
                    )}
                    style={{
                      backgroundColor: lit ? t.color : `${t.color}20`,
                      borderColor: lit ? t.color : `${t.color}40`,
                      boxShadow: lit ? `0 8px 30px ${t.color}66` : "none",
                    }}
                    aria-label={`Tile ${t.id + 1}`}
                  />
                );
              })}
            </div>

            {phase === "input" && (
              <div className="mt-6 flex items-center justify-center gap-2">
                {sequence.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-2.5 w-2.5 rounded-full transition-all",
                      i < userIdx ? "bg-[#00D9A3]" : "bg-white/15",
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {phase === "result" && (
          <div className="mt-10 flex flex-1 flex-col items-center justify-center text-center">
            <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/40">
              Your baseline
            </div>
            <div
              className="mt-3 text-[88px] font-black leading-none text-[#7858FF]"
              style={{ letterSpacing: "-3px" }}
            >
              {score}
            </div>
            <span className="mt-4 inline-flex items-center gap-1 rounded-full border border-[#00D9A3]/40 bg-[#00D9A3]/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#00D9A3] shadow-[0_0_18px_rgba(0,217,163,0.22)]">
              ⭐ Top 18% for your profile!
            </span>
            <p className="mt-5 max-w-xs text-[13px] text-white/55">
              Nice work. We'll use this to calibrate every workout — so you grow from exactly where you are.
            </p>
          </div>
        )}

        <div className="mt-auto pt-8">
          {phase === "intro" && (
            <PrimaryButton onClick={startGame}>Start the test →</PrimaryButton>
          )}
          {phase === "result" && (
            <PrimaryButton onClick={() => navigate({ to: "/onboarding/processing" })}>
              Build my program →
            </PrimaryButton>
          )}
        </div>
      </div>
    </main>
  );
}