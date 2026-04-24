import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ArrowLeft } from "lucide-react";
import { ProgressBar } from "@/components/rewire/ProgressBar";
import { PrimaryButton } from "@/components/rewire/PrimaryButton";
import { useOnboardingStore } from "@/store/onboarding";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding/goals")({
  component: Page,
});

const GOALS = [
  { id: "focus", icon: "🎯", label: "Focus & Attention", desc: "Stay on task longer" },
  { id: "memory", icon: "🧠", label: "Memory", desc: "Recall more, forget less" },
  { id: "speed", icon: "⚡", label: "Processing Speed", desc: "Think & react faster" },
  { id: "problem", icon: "🔧", label: "Problem Solving", desc: "Sharper reasoning" },
  { id: "calm", icon: "🌊", label: "Calm & Anxiety", desc: "Regulate your mind" },
  { id: "executive", icon: "🗂", label: "Executive Function", desc: "Plan & get things done" },
];

function Page() {
  const navigate = useNavigate();
  const { goals, setGoals } = useOnboardingStore();
  const [selected, setSelected] = useState<string[]>(goals);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const onContinue = () => {
    setGoals(selected);
    navigate({ to: "/onboarding/challenges" });
  };

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
            <ProgressBar current={2} />
          </div>
        </div>
        <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#A78BFA]">
          Step 2 of 8
        </p>
        <h2 className="mt-2 text-[26px] font-black leading-tight" style={{ letterSpacing: "-0.8px" }}>
          What do you want to improve?
        </h2>
        <p className="mt-2 text-[14px] text-white/60">
          Pick everything that matters — we build around all of it
        </p>
        <div className="mt-7 grid grid-cols-2 gap-3">
          {GOALS.map((g) => {
            const active = selected.includes(g.id);
            return (
              <button
                key={g.id}
                onClick={() => toggle(g.id)}
                className={cn(
                  "relative rounded-[18px] border p-4 text-left transition-all active:scale-[0.98]",
                  active
                    ? "border-[#7858FF] bg-[#7858FF]/20"
                    : "border-white/[0.07] bg-[#131A2E] hover:bg-[#1A2340]",
                )}
              >
                {active && (
                  <span className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#7858FF]">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                )}
                <div className="text-[26px]">{g.icon}</div>
                <div className="mt-2 text-[14px] font-bold leading-tight">{g.label}</div>
                <div className="mt-1 text-[12px] text-white/50">{g.desc}</div>
              </button>
            );
          })}
        </div>
        <div className="mt-auto pt-8">
          <PrimaryButton disabled={selected.length === 0} onClick={onContinue}>
            {selected.length === 0
              ? "Continue"
              : `Continue (${selected.length} selected) →`}
          </PrimaryButton>
        </div>
      </div>
    </main>
  );
}
