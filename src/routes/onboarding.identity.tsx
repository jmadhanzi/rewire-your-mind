import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { ProgressBar } from "@/components/rewire/ProgressBar";
import { PrimaryButton } from "@/components/rewire/PrimaryButton";
import { useOnboardingStore } from "@/store/onboarding";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding/identity")({
  component: Page,
});

const IDENTITIES = [
  {
    id: "adhd",
    icon: "⚡",
    title: "I have ADHD",
    desc: "Diagnosed or strongly suspected",
    accent: "#7858FF",
  },
  {
    id: "anxiety",
    icon: "💭",
    title: "Anxiety & overthinking",
    desc: "Mind races, hard to quiet down",
    accent: "#FF6B6B",
  },
  {
    id: "burnout",
    icon: "🪫",
    title: "Burnout & brain fog",
    desc: "Mentally drained, can't think clearly",
    accent: "#F5C518",
  },
  {
    id: "sharper",
    icon: "🚀",
    title: "Just want to be sharper",
    desc: "Already functioning, want an edge",
    accent: "#00D9A3",
  },
];

function Page() {
  const navigate = useNavigate();
  const { identity, setIdentity } = useOnboardingStore();
  const [selected, setSelected] = useState<string>(identity);

  const onContinue = () => {
    setIdentity(selected);
    navigate({ to: "/onboarding/time" });
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
            <ProgressBar current={4} />
          </div>
        </div>
        <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#A78BFA]">
          Step 4 of 8
        </p>
        <h2 className="mt-2 text-[26px] font-black leading-tight" style={{ letterSpacing: "-0.8px" }}>
          Which feels most like you?
        </h2>
        <p className="mt-2 text-[14px] text-white/60">
          This shapes every part of your program
        </p>
        <div className="mt-7 space-y-3">
          {IDENTITIES.map((opt) => {
            const active = selected === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className={cn(
                  "relative flex w-full items-center gap-4 rounded-[20px] border p-4 text-left transition-all active:scale-[0.99]",
                  !active && "border-white/[0.07] bg-[#131A2E] hover:bg-[#1A2340]",
                )}
                style={
                  active
                    ? {
                        borderColor: opt.accent,
                        backgroundColor: `${opt.accent}1F`,
                      }
                    : undefined
                }
              >
                <div
                  className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[14px] text-[24px]"
                  style={{ backgroundColor: `${opt.accent}26` }}
                >
                  {opt.icon}
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-semibold leading-tight">{opt.title}</div>
                  <div className="mt-1 text-[13px] text-white/40">{opt.desc}</div>
                </div>
                {active && (
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: opt.accent }}
                  >
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="mt-auto pt-8">
          <PrimaryButton disabled={!selected} onClick={onContinue}>
            This is me →
          </PrimaryButton>
        </div>
      </div>
    </main>
  );
}
