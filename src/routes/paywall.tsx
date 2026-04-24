import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Sparkles, AlertTriangle } from "lucide-react";
import { PrimaryButton } from "@/components/rewire/PrimaryButton";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { SignupModal } from "@/components/rewire/SignupModal";
import { useOnboardingStore } from "@/store/onboarding";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/paywall")({
  component: Paywall,
});

type PlanId = "weekly" | "monthly" | "annual";

const PLANS: {
  id: PlanId;
  label: string;
  price: string;
  period: string;
  sub: string;
  badge?: string;
  ctaPeriod: string;
}[] = [
  {
    id: "weekly",
    label: "Weekly",
    price: "$6.99",
    period: "/week",
    sub: "~$363 per year",
    ctaPeriod: "$6.99/week",
  },
  {
    id: "monthly",
    label: "Monthly",
    price: "$9.99",
    period: "/month",
    sub: "~$120 per year",
    ctaPeriod: "$9.99/month",
  },
  {
    id: "annual",
    label: "Annual",
    price: "$4.16",
    period: "/month",
    sub: "$49.99 billed once yearly",
    badge: "BEST VALUE · SAVE 86%",
    ctaPeriod: "$49.99/year",
  },
];

const FEATURES = [
  "Unlimited games & sessions",
  "AI adaptive coaching",
  "ADHD focus program",
  "Friend challenges & squads",
  "Weekly brain reports",
  "Offline mode",
  "No ads ever",
];

function Paywall() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("annual");
  const { user } = useAuth();
  const [signupOpen, setSignupOpen] = useState(false);
  const onboarding = useOnboardingStore();
  const [trialIntent, setTrialIntent] = useState(false);

  // Pre-select annual when arriving from the marketing landing's Pro CTA
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.localStorage.getItem("trialIntent") === "pro") {
        setSelectedPlan("annual");
        setTrialIntent(true);
        window.localStorage.removeItem("trialIntent");
      }
    } catch {
      /* ignore */
    }
  }, []);

  const current = PLANS.find((p) => p.id === selectedPlan)!;

  const persistOnboardingFor = async (userId: string) => {
    await supabase
      .from("profiles")
      .update({
        identity_type: onboarding.identity || null,
        goals: onboarding.goals,
        time_commitment: onboarding.timeCommitment || null,
        baseline_score: onboarding.baselineScore,
        onboarding_complete: true,
      })
      .eq("id", userId);

    const bp = onboarding.brainProfile;
    if (bp && (bp.focus || bp.memory || bp.speed || bp.archetype)) {
      await supabase.from("brain_scores").insert({
        user_id: userId,
        focus: bp.focus ?? 0,
        memory: bp.memory ?? 0,
        speed: bp.speed ?? 0,
        logic: 0,
        calm: 0,
      });
    }
  };

  const handleStart = async () => {
    if (!user) {
      setSignupOpen(true);
      return;
    }
    await persistOnboardingFor(user.id);
    navigate({ to: "/app/home" });
  };

  const handleSignupSuccess = async () => {
    setSignupOpen(false);
    // Wait for session to populate, then persist onboarding
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      await persistOnboardingFor(data.user.id);
    }
    navigate({ to: "/app/home" });
  };

  return (
    <main className="min-h-screen bg-[#07091A] text-white animate-[fadeUp_350ms_ease]">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 pb-10 pt-12">
        {/* Header */}
        <div className="text-center">
          <div className="text-[36px] leading-none">🎉</div>
          <h2
            className="mt-3 text-[24px] font-black leading-tight"
            style={{ letterSpacing: "-0.8px" }}
          >
            Your 21-day program is ready
          </h2>
          <p className="mt-2 text-[14px] text-white/60">
            Start your free 7-day trial. Cancel anytime, zero risk.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#00D9A3]/40 bg-[#00D9A3]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#00D9A3] shadow-[0_0_18px_rgba(0,217,163,0.22)]">
            <Sparkles className="h-3 w-3" /> 847 people started today
          </span>
          {trialIntent && (
            <div className="mt-4 rounded-2xl border border-[#7858FF]/40 bg-[#7858FF]/10 px-4 py-3 text-[13px] text-[#A78BFA] shadow-[0_0_24px_rgba(120,88,255,0.25)]">
              ✨ Your trial starts now — annual selected for best value
            </div>
          )}
        </div>

        {/* Plans */}
        <div className="mt-7 space-y-2.5">
          {PLANS.map((p) => {
            const active = selectedPlan === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPlan(p.id)}
                className={cn(
                  "relative flex w-full items-center gap-3 rounded-[18px] border-2 p-4 text-left transition-all duration-200 active:scale-[0.99]",
                  active
                    ? "border-[#7858FF] bg-[#7858FF]/15 shadow-[0_4px_24px_rgba(120,88,255,0.28)]"
                    : "border-white/[0.07] bg-[#131A2E] hover:bg-[#1A2340]",
                )}
              >
                {p.badge && (
                  <span className="absolute -top-2.5 right-3 rounded-full bg-[#7858FF] px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white shadow-[0_4px_12px_rgba(120,88,255,0.5)]">
                    {p.badge}
                  </span>
                )}
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                    active ? "border-[#7858FF] bg-[#7858FF]" : "border-white/25 bg-transparent",
                  )}
                >
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                <div className="flex-1">
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-[22px] font-black leading-none"
                      style={{ letterSpacing: "-0.5px" }}
                    >
                      {p.price}
                    </span>
                    <span className="text-[13px] font-semibold text-white/60">{p.period}</span>
                  </div>
                  <div className="mt-1 text-[12px] text-white/45">{p.sub}</div>
                </div>
                <span
                  className={cn(
                    "text-[11px] font-bold uppercase tracking-widest",
                    active ? "text-[#A78BFA]" : "text-white/35",
                  )}
                >
                  {p.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Weekly warning */}
        {selectedPlan === "weekly" && (
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-[#F5C518]/30 bg-[#F5C518]/8 p-3 animate-[fadeUp_300ms_ease]">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#F5C518]" />
            <p className="text-[12px] leading-snug text-white/75">
              Most people on weekly cancel quickly — annual gives you time to see real results.
            </p>
          </div>
        )}

        {/* Features */}
        <div className="mt-5 rounded-[22px] border border-white/[0.07] bg-[#131A2E] p-4">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
            Everything included
          </div>
          <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2.5">
            {FEATURES.map((f) => (
              <div key={f} className="flex items-start gap-2">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#00D9A3]/20">
                  <Check className="h-2.5 w-2.5 text-[#00D9A3]" strokeWidth={3.5} />
                </span>
                <span className="text-[12px] leading-snug text-white/80">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 pt-2">
          <PrimaryButton onClick={handleStart}>
            Start 7-day free trial →
          </PrimaryButton>
          <p className="mt-3 text-center text-[12px] text-white/50">
            Then {current.ctaPeriod}. Cancel anytime.
          </p>
          <div className="mt-3 flex items-center justify-center gap-3 text-[11px] font-medium text-white/40">
            <span>🔒 Secure</span>
            <span className="text-white/20">·</span>
            <span>↩ 30-day guarantee</span>
            <span className="text-white/20">·</span>
            <span>✦ 7 days free</span>
          </div>
        </div>
      </div>
      <SignupModal
        open={signupOpen}
        onClose={() => setSignupOpen(false)}
        onSuccess={handleSignupSuccess}
        title="Create your account to start"
        subtitle="We'll save your program and start your 7-day free trial"
      />
    </main>
  );
}