import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ProgressBar } from "@/components/rewire/ProgressBar";
import { RestartOnboardingButton } from "@/components/rewire/RestartOnboardingButton";
import { PrimaryButton } from "@/components/rewire/PrimaryButton";
import { useOnboardingStore } from "@/store/onboarding";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding/challenges")({
  component: Page,
});

const CHALLENGES = [
  "Mind wanders constantly",
  "Hard to start tasks",
  "Forget things easily",
  "Mentally foggy",
  "Get overwhelmed easily",
  "Procrastinate a lot",
  "Anxiety about tasks",
  "Can't stick to routines",
];

function Page() {
  const navigate = useNavigate();
  const { challenges, setChallenges } = useOnboardingStore();
  const [selected, setSelected] = useState<string[]>(challenges);

  const toggle = (c: string) =>
    setSelected((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]));

  const onContinue = () => {
    setChallenges(selected);
    navigate({ to: "/onboarding/identity" });
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
            <ProgressBar current={3} />
          </div>
          <RestartOnboardingButton />
          <div className="hidden">
          </div>
        </div>
        <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#A78BFA]">
          Step 3 of 8
        </p>
        <h2 className="mt-2 text-[26px] font-black leading-tight" style={{ letterSpacing: "-0.8px" }}>
          What's been holding your brain back?
        </h2>
        <p className="mt-2 text-[14px] text-white/60">
          Tap all that feel true — no judgment here
        </p>
        <div className="mt-7 flex flex-wrap gap-2.5">
          {CHALLENGES.map((c) => {
            const active = selected.includes(c);
            return (
              <button
                key={c}
                onClick={() => toggle(c)}
                className={cn(
                  "rounded-full border px-4 py-2.5 text-[13px] transition-all active:scale-[0.97]",
                  active
                    ? "border-[#7858FF] bg-[#7858FF]/20 font-semibold text-[#A78BFA]"
                    : "border-white/[0.07] bg-[#131A2E] text-white/70 hover:bg-[#1A2340]",
                )}
              >
                {c}
              </button>
            );
          })}
        </div>
        <div className="mt-auto pt-8">
          <PrimaryButton disabled={selected.length === 0} onClick={onContinue}>
            Continue →
          </PrimaryButton>
        </div>
      </div>
    </main>
  );
}
