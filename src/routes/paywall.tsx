import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Sparkles, AlertTriangle, Star, Shield, Zap, Brain, Users, Trophy, Infinity } from "lucide-react";
import { PrimaryButton } from "@/components/rewire/PrimaryButton";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { SignupModal } from "@/components/rewire/SignupModal";
import { useOnboardingStore } from "@/store/onboarding";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

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
  monthlyEquiv?: string;
  savings?: string;
}[] = [
  {
    id: "annual",
    label: "Annual",
    price: "$4.16",
    period: "/mo",
    sub: "Billed $49.99/year",
    badge: "BEST VALUE",
    ctaPeriod: "$49.99/year",
    monthlyEquiv: "$4.16/mo",
    savings: "Save 86% vs weekly",
  },
  {
    id: "monthly",
    label: "Monthly",
    price: "$9.99",
    period: "/mo",
    sub: "~$120/year",
    ctaPeriod: "$9.99/month",
    savings: "Save 43% vs weekly",
  },
  {
    id: "weekly",
    label: "Weekly",
    price: "$6.99",
    period: "/wk",
    sub: "~$363/year",
    ctaPeriod: "$6.99/week",
  },
];

const FEATURES = [
  { icon: <Infinity className="h-4 w-4" />, label: "Unlimited sessions", detail: "No daily limits ever" },
  { icon: <Brain className="h-4 w-4" />, label: "All 50+ games", detail: "New games added monthly" },
  { icon: <Sparkles className="h-4 w-4" />, label: "AI coaching", detail: "Personalized guidance" },
  { icon: <Users className="h-4 w-4" />, label: "Friend challenges", detail: "Weekly leaderboards" },
  { icon: <Trophy className="h-4 w-4" />, label: "Streak savers", detail: "Unlimited protection" },
  { icon: <Zap className="h-4 w-4" />, label: "No ads — ever", detail: "Pure, distraction-free" },
  { icon: <Shield className="h-4 w-4" />, label: "Offline mode", detail: "Train anywhere" },
  { icon: <Star className="h-4 w-4" />, label: "Weekly brain reports", detail: "Track every domain" },
];

const TESTIMONIAL = {
  text: "I upgraded after 3 days. The AI coaching alone is worth it — it noticed I was struggling with focus in the mornings and adjusted my whole program.",
  name: "Alex M.",
  role: "Software Engineer · 63-day streak",
  avatar: "A",
};

function Paywall() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("annual");
  const { user } = useAuth();
  const [signupOpen, setSignupOpen] = useState(false);
  const onboarding = useOnboardingStore();
  const [trialIntent, setTrialIntent] = useState(false);
  const [spots, setSpots] = useState(847);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.localStorage.getItem("trialIntent") === "pro") {
        setSelectedPlan("annual");
        setTrialIntent(true);
        window.localStorage.removeItem("trialIntent");
      }
    } catch { /* ignore */ }

    // Simulate live counter
    const tick = () => {
      setSpots((s) => s + Math.floor(Math.random() * 3));
    };
    const interval = setInterval(tick, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = PLANS.find((p) => p.id === selectedPlan)!;

  const persistOnboardingFor = async (userId: string) => {
    await supabase.from("profiles").update({
      identity_type: onboarding.identity || null,
      goals: onboarding.goals,
      time_commitment: onboarding.timeCommitment || null,
      baseline_score: onboarding.baselineScore,
      onboarding_complete: true,
    }).eq("id", userId);

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
    if (!user) { setSignupOpen(true); return; }
    await persistOnboardingFor(user.id);
    navigate({ to: "/app/home" });
  };

  const handleSignupSuccess = async () => {
    setSignupOpen(false);
    const { data } = await supabase.auth.getUser();
    if (data.user) await persistOnboardingFor(data.user.id);
    navigate({ to: "/app/home" });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07091A] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#7858FF]/15 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#00D9A3]/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col px-5 pb-10 pt-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="text-[44px] leading-none">🎉</div>
          <h1 className="mt-3 text-[26px] font-black leading-tight" style={{ letterSpacing: "-0.8px" }}>
            Your program is ready
          </h1>
          <p className="mt-2 text-[14px] text-white/55">
            7-day free trial. Cancel anytime. Zero risk.
          </p>

          {/* Live counter */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#00D9A3]/30 bg-[#00D9A3]/10 px-4 py-2 text-[12px] font-bold text-[#00D9A3]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#00D9A3] opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-[#00D9A3]" />
            </span>
            {spots.toLocaleString()} people started their trial today
          </div>

          {trialIntent && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 rounded-2xl border border-[#7858FF]/30 bg-[#7858FF]/10 px-4 py-3 text-[13px] text-[#A78BFA]"
            >
              ✨ Annual plan selected for best value
            </motion.div>
          )}
        </motion.div>

        {/* Competitor comparison banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mt-5 rounded-2xl border border-[#F5C518]/25 bg-[#F5C518]/[0.07] px-4 py-3 text-center"
        >
          <span className="text-[13px] text-white/75">
            Competitors charge{" "}
            <span className="font-bold text-white/50 line-through">$363/year</span>
            {" → "}
            <span className="font-black text-[#F5C518]">Rewire is $49.99/year</span>
          </span>
        </motion.div>

        {/* Plan selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mt-5 space-y-2.5"
        >
          {PLANS.map((p) => {
            const active = selectedPlan === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPlan(p.id)}
                className={cn(
                  "relative flex w-full items-center gap-3 rounded-[20px] border-2 p-4 text-left transition-all duration-200",
                  active
                    ? "border-[#7858FF] bg-[#7858FF]/12 shadow-[0_6px_30px_rgba(120,88,255,0.25)]"
                    : "border-white/[0.07] bg-[#131A2E]/80 hover:bg-[#131A2E]",
                )}
              >
                {p.badge && (
                  <span className="absolute -top-2.5 right-4 rounded-full bg-gradient-to-r from-[#7858FF] to-[#6C47FF] px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white shadow-[0_4px_14px_rgba(120,88,255,0.5)]">
                    {p.badge}
                  </span>
                )}

                {/* Radio */}
                <span className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                  active ? "border-[#7858FF] bg-[#7858FF]" : "border-white/20",
                )}>
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>

                <div className="flex-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[24px] font-black leading-none" style={{ letterSpacing: "-0.6px" }}>
                      {p.price}
                    </span>
                    <span className="text-[13px] text-white/50">{p.period}</span>
                  </div>
                  <div className="mt-0.5 text-[12px] text-white/40">{p.sub}</div>
                  {p.savings && (
                    <div className="mt-1 text-[11px] font-bold text-[#00D9A3]">{p.savings}</div>
                  )}
                </div>

                <span className={cn(
                  "text-[12px] font-bold uppercase tracking-wider",
                  active ? "text-[#A78BFA]" : "text-white/30",
                )}>
                  {p.label}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Weekly warning */}
        <AnimatePresence>
          {selectedPlan === "weekly" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 flex items-start gap-2.5 rounded-2xl border border-[#F5C518]/25 bg-[#F5C518]/[0.07] p-3.5">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#F5C518]" />
                <p className="text-[12px] leading-snug text-white/70">
                  Most weekly subscribers cancel before seeing results. Annual gives you time to transform.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="mt-5 rounded-[22px] border border-white/[0.07] bg-[#0D1226]/80 p-4"
        >
          <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">
            Everything in Pro
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {FEATURES.map((f) => (
              <div key={f.label} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#7858FF]/15 text-[#A78BFA]">
                  {f.icon}
                </span>
                <div>
                  <div className="text-[12px] font-bold text-white/85">{f.label}</div>
                  <div className="text-[10px] text-white/35">{f.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22 }}
          className="mt-4 rounded-[22px] border border-white/[0.06] bg-[#0D1226]/60 p-4"
        >
          <div className="flex gap-0.5 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-[#F5C518] text-[#F5C518]" />
            ))}
          </div>
          <p className="text-[13px] leading-relaxed text-white/70 italic">"{TESTIMONIAL.text}"</p>
          <div className="mt-3 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#7858FF] to-[#00D9A3] text-[12px] font-black">
              {TESTIMONIAL.avatar}
            </div>
            <div>
              <div className="text-[12px] font-bold">{TESTIMONIAL.name}</div>
              <div className="text-[10px] text-white/40">{TESTIMONIAL.role}</div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          className="mt-6 space-y-3"
        >
          <PrimaryButton onClick={handleStart}>
            Start 7-day free trial →
          </PrimaryButton>
          <p className="text-center text-[12px] text-white/45">
            Then {current.ctaPeriod}. Cancel anytime before trial ends.
          </p>
          <div className="flex items-center justify-center gap-4 text-[11px] text-white/30">
            <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> 256-bit secure</span>
            <span className="flex items-center gap-1">↩ 30-day refund</span>
            <span className="flex items-center gap-1">✦ 7 days free</span>
          </div>
        </motion.div>
      </div>

      <SignupModal
        open={signupOpen}
        onClose={() => setSignupOpen(false)}
        onSuccess={handleSignupSuccess}
        title="Create your account"
        subtitle="Start your 7-day free trial — no credit card needed"
      />
    </main>
  );
}
