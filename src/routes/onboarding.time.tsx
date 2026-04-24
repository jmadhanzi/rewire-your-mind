import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { ProgressBar } from "@/components/rewire/ProgressBar";
import { PrimaryButton } from "@/components/rewire/PrimaryButton";
import { useOnboardingStore } from "@/store/onboarding";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding/time")({
  component: Page,
});

const OPTIONS = [
  {
    id: "5",
    icon: "⚡",
    label: "5 minutes",
    sub: "Quick hit",
    desc: "Short burst, real impact",
    badge: "Most popular",
    badgeColor: "#00D9A3",
  },
  {
    id: "10",
    icon: "🎯",
    label: "10 minutes",
    sub: "Focused",
    desc: "The sweet spot for gains",
    badge: "Recommended",
    badgeColor: "#7858FF",
  },
  {
    id: "15",
    icon: "🔥",
    label: "15+ minutes",
    sub: "Deep work",
    desc: "Maximum improvement speed",
    badge: null as string | null,
    badgeColor: "",
  },
];

function Page() {
  const navigate = useNavigate();
  const { timeCommitment, setTimeCommitment } = useOnboardingStore();
  const [selected, setSelected] = useState<string>(timeCommitment);

  const onContinue = () => {
    setTimeCommitment(selected);
    navigate({ to: "/onboarding/game" });
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
            <ProgressBar current={5} />
          </div>
        </div>
        <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#A78BFA]">
          Step 5 of 8
        </p>
        <h2 className="mt-2 text-[26px] font-black leading-tight" style={{ letterSpacing: "-0.8px" }}>
          How long can you train each day?
        </h2>
        <p className="mt-2 text-[14px] text-white/60">
          Even 5 minutes daily creates real, measurable change
        </p>
        <div className="mt-7 space-y-3">
          {OPTIONS.map((opt) => {
            const active = selected === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className={cn(
                  "relative flex w-full items-center gap-4 rounded-[20px] border p-4 text-left transition-all active:scale-[0.99]",
                  active
                    ? "border-[#7858FF] bg-[#7858FF]/20"
                    : "border-white/[0.07] bg-[#131A2E] hover:bg-[#1A2340]",
                )}
              >
                <div
                  className={cn(
                    "flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] text-[28px]",
                    active ? "bg-[#7858FF]/30" : "bg-white/[0.05]",
                  )}
                >
                  {opt.icon}
                </div>
                <div className="flex-1 pr-20">
                  <div className="text-[16px] font-bold leading-tight">{opt.label}</div>
                  <div className="mt-0.5 text-[13px] font-semibold text-[#A78BFA]">{opt.sub}</div>
                  <div className="mt-1 text-[12px] text-white/45">{opt.desc}</div>
                </div>
                {opt.badge && (
                  <span
                    className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      color: opt.badgeColor,
                      backgroundColor: `${opt.badgeColor}1F`,
                      border: `1px solid ${opt.badgeColor}55`,
                    }}
                  >
                    {opt.badge}
                  </span>
                )}
                {active && (
                  <span className="absolute bottom-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#7858FF]">
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="mt-auto pt-8">
          <PrimaryButton disabled={!selected} onClick={onContinue}>
            Set my schedule →
          </PrimaryButton>
        </div>
      </div>
    </main>
  );
}