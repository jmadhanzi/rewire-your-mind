import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { ProgressBar } from "@/components/rewire/ProgressBar";
import { RestartOnboardingButton } from "@/components/rewire/RestartOnboardingButton";
import { OnboardingSettingsButton } from "@/components/rewire/OnboardingSettingsButton";

export const Route = createFileRoute("/onboarding/processing")({
  component: Page,
});

const STEPS = [
  "Analyzing your answers…",
  "Matching 2,847 similar profiles…",
  "Building your custom program…",
  "Finalizing your brain profile…",
];

const TOTAL_MS = 6000;
const STEP_INTERVAL = 1500;
const RING_R = 52;
const RING_C = 2 * Math.PI * RING_R;

function Page() {
  const navigate = useNavigate();
  const [pct, setPct] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(100, Math.round(((now - start) / TOTAL_MS) * 100));
      setPct(p);
      if (p < 100) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    STEPS.forEach((_, i) => {
      timeoutsRef.current.push(
        setTimeout(() => setActiveStep(i + 1), STEP_INTERVAL * (i + 1)),
      );
    });

    timeoutsRef.current.push(
      setTimeout(() => navigate({ to: "/onboarding/profile" }), TOTAL_MS),
    );

    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [navigate]);

  const dashOffset = RING_C - (RING_C * pct) / 100;

  return (
    <main className="min-h-screen bg-[#07091A] text-white animate-[fadeUp_350ms_ease]">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 pb-10 pt-12">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <ProgressBar current={7} />
          </div>
          <OnboardingSettingsButton />
          <RestartOnboardingButton />
        </div>

        <div className="mt-12 flex flex-col items-center">
          <div className="relative h-[120px] w-[120px]">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle
                cx="60"
                cy="60"
                r={RING_R}
                fill="none"
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r={RING_R}
                fill="none"
                stroke="#7858FF"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={RING_C}
                strokeDashoffset={dashOffset}
                style={{
                  transition: "stroke-dashoffset 100ms linear",
                  filter: "drop-shadow(0 0 12px rgba(120,88,255,0.55))",
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-[28px] font-black"
                style={{ letterSpacing: "-1px" }}
              >
                {pct}%
              </span>
            </div>
          </div>

          <h2
            className="mt-8 text-[26px] font-black leading-tight"
            style={{ letterSpacing: "-0.8px" }}
          >
            Building your program
          </h2>
          <p className="mt-2 text-[14px] text-white/60">
            Crunching the numbers — this only takes a moment
          </p>
        </div>

        <div className="mt-10 space-y-2.5">
          {STEPS.map((step, i) => {
            const done = i < activeStep;
            const current = i === activeStep;
            if (!done && !current) return null;
            return (
              <div
                key={step}
                className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#131A2E] p-3.5 animate-[fadeUp_350ms_ease]"
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    done
                      ? "bg-[#00D9A3]"
                      : "border-2 border-[#7858FF] border-t-transparent animate-spin"
                  }`}
                >
                  {done && <Check className="h-3.5 w-3.5 text-[#07091A]" strokeWidth={3} />}
                </span>
                <span
                  className={`text-[14px] ${done ? "text-white/80" : "text-white"}`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}