import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { ProgressBar } from "@/components/rewire/ProgressBar";
import { RestartOnboardingButton } from "@/components/rewire/RestartOnboardingButton";
import { OnboardingSettingsButton } from "@/components/rewire/OnboardingSettingsButton";
import { PrimaryButton } from "@/components/rewire/PrimaryButton";
import { useOnboardingStore } from "@/store/onboarding";

export const Route = createFileRoute("/onboarding/profile")({
  component: Page,
});

const TYPES: Record<string, { name: string; tagline: string }> = {
  adhd: { name: "The Adaptive Spark", tagline: "Bursts of brilliance, wired for novelty" },
  anxiety: { name: "The Deep Thinker", tagline: "Analytical mind, learning to settle" },
  burnout: { name: "The Recharger", tagline: "Rebuilding clarity, one rep at a time" },
  sharper: { name: "The Optimizer", tagline: "Sharp mind seeking the next edge" },
};

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type Domain = { key: string; label: string; value: number; color: string };

function Page() {
  const navigate = useNavigate();
  const { identity, setBrainProfile } = useOnboardingStore();

  const type = TYPES[identity] ?? TYPES.sharper;
  const isLowFocus = identity === "adhd" || identity === "anxiety";

  const domains: Domain[] = useMemo(() => {
    return [
      {
        key: "focus",
        label: "Focus",
        value: isLowFocus ? rand(34, 42) : rand(55, 65),
        color: "#7858FF",
      },
      { key: "memory", label: "Memory", value: rand(65, 75), color: "#00D9A3" },
      { key: "speed", label: "Speed", value: rand(55, 62), color: "#F5C518" },
      { key: "logic", label: "Logic", value: rand(70, 78), color: "#FF6B6B" },
      {
        key: "calm",
        label: "Calm",
        value: isLowFocus ? rand(30, 42) : rand(55, 60),
        color: "#A78BFA",
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity]);

  const [filled, setFilled] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setBrainProfile({
      focus: domains[0].value,
      memory: domains[1].value,
      speed: domains[2].value,
      impulse: domains[3].value,
      archetype: type.name,
    });

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    domains.forEach((d, i) => {
      timeouts.push(
        setTimeout(() => setFilled((f) => ({ ...f, [d.key]: true })), 400 + i * 150),
      );
    });
    return () => timeouts.forEach((t) => clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domains]);

  // #1 opportunity = lowest score
  const opportunity = [...domains].sort((a, b) => a.value - b.value)[0];

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
            <ProgressBar current={8} />
          </div>
          <OnboardingSettingsButton />
          <RestartOnboardingButton />
        </div>

        <span className="mt-8 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#F5C518]/40 bg-[#F5C518]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#F5C518] shadow-[0_0_18px_rgba(245,197,24,0.22)]">
          <Sparkles className="h-3 w-3" /> Your brain profile is ready
        </span>

        <h2
          className="mt-3 text-[30px] font-black leading-tight"
          style={{ letterSpacing: "-1px" }}
        >
          {type.name}
        </h2>
        <p className="mt-2 text-[14px] text-white/60">
          Your brain has a unique pattern. Here's where we'll focus first.
        </p>

        <div className="mt-6 rounded-[22px] border border-white/[0.07] bg-[#131A2E] p-5">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
            Cognitive domains
          </div>
          <div className="mt-4 space-y-4">
            {domains.map((d) => (
              <div key={d.key}>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-white/85">{d.label}</span>
                  <span className="text-[13px] font-bold" style={{ color: d.color }}>
                    {d.value}%
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: filled[d.key] ? `${d.value}%` : "0%",
                      backgroundColor: d.color,
                      boxShadow: `0 0 12px ${d.color}66`,
                      transition: "width 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-[22px] border border-[#7858FF]/40 bg-[#7858FF]/12 p-4 shadow-[0_0_24px_rgba(120,88,255,0.18)]">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A78BFA]">
            Your #1 opportunity
          </div>
          <p className="mt-1.5 text-[13px] leading-relaxed text-white/80">
            <span className="font-bold text-white">{opportunity.label}</span> is your lowest
            score. <span className="font-bold text-white">65%</span> of your training will
            target this first.
          </p>
        </div>

        <div className="mt-auto pt-6">
          <button
            onClick={() => navigate({ to: "/paywall" })}
            className="w-full rounded-2xl bg-[#00D9A3] py-4 text-base font-bold text-[#07091A] shadow-[0_4px_24px_rgba(0,217,163,0.45)] transition-all hover:bg-[#1ee5b4] active:scale-[0.99]"
          >
            Show me my program →
          </button>
        </div>
      </div>
    </main>
  );
}