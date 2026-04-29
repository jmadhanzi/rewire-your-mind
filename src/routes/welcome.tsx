import { createFileRoute } from "@tanstack/react-router";
import { Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "../components/rewire/Logo";
import { PrimaryButton } from "../components/rewire/PrimaryButton";
import { GhostButton } from "../components/rewire/GhostButton";
import { Star, Shield, Zap, Brain } from "lucide-react";
import { useOnboardingStore } from "@/store/onboarding";
import { motion } from "framer-motion";

export const Route = createFileRoute("/welcome")({
  component: Index,
});

const SOCIAL_PROOF = [
  { icon: "⭐", text: "4.8 rating" },
  { icon: "👥", text: "2M+ users" },
  { icon: "🧠", text: "ADHD-built" },
  { icon: "🆓", text: "Free to start" },
];

const REVIEWS = [
  { name: "Jordan M.", handle: "@jordanm", text: "First app that actually gets how my ADHD brain works. Focus is up 41%.", streak: 21, avatar: "J" },
  { name: "Priya S.", handle: "@priyas", text: "I've tried everything. This is the only one that stuck. 47 days and counting!", streak: 47, avatar: "P" },
  { name: "Alex K.", handle: "@alexk", text: "Beat my anxiety score by 28 points. My therapist is genuinely impressed.", streak: 14, avatar: "A" },
];

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.08 } } },
  item: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } },
};

function Index() {
  const navigate = useNavigate();
  const resetOnboarding = useOnboardingStore((s) => s.reset);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07091A] text-white">
      {/* Background orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#7858FF]/20 blur-[120px] orb-1" />
        <div className="absolute bottom-20 right-[-100px] h-[350px] w-[350px] rounded-full bg-[#00D9A3]/15 blur-[100px] orb-2" />
        <div className="absolute top-[40%] left-[-80px] h-[280px] w-[280px] rounded-full bg-[#A78BFA]/10 blur-[90px] orb-3" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col px-6 pb-10 pt-12">
        {/* Logo + brand */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#7858FF]/30 blur-2xl scale-150 opacity-60" />
            <Logo size={72} />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-[52px] font-black leading-none tracking-tight"
            style={{ letterSpacing: "-2px" }}
          >
            <span className="gradient-text">Rewire</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 max-w-[280px] text-[16px] leading-snug text-white/65"
          >
            Brain training built for{" "}
            <span className="font-bold text-white">ADHD minds</span>.
            5 minutes a day.
          </motion.p>
        </motion.div>

        {/* Social proof pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          {SOCIAL_PROOF.map((p) => (
            <span
              key={p.text}
              className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.05] px-3 py-1.5 text-[12px] font-semibold text-white/70"
            >
              <span>{p.icon}</span> {p.text}
            </span>
          ))}
        </motion.div>

        {/* Review card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-6 rounded-[22px] border border-white/[0.08] bg-[#0D1226]/80 p-5 backdrop-blur-sm"
        >
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-[#F5C518] text-[#F5C518]" />
            ))}
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-white/80">
            "First app that actually gets how my brain works. I finished a
            full chapter without checking my phone — for the first time in years."
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#7858FF] to-[#00D9A3] text-[13px] font-black">
              J
            </div>
            <div>
              <div className="text-[13px] font-bold">Jordan M.</div>
              <div className="text-[11px] text-white/40">Diagnosed ADHD · 🔥 21-day streak</div>
            </div>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-5 grid grid-cols-3 gap-3"
        >
          {[
            { icon: <Brain className="h-4 w-4" />, label: "Neuroscience-backed" },
            { icon: <Shield className="h-4 w-4" />, label: "Private & secure" },
            { icon: <Zap className="h-4 w-4" />, label: "5-min sessions" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 text-center">
              <span className="text-[#A78BFA]">{item.icon}</span>
              <span className="text-[10px] font-semibold leading-tight text-white/50">{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-auto pt-8 space-y-3"
        >
          <PrimaryButton
            onClick={() => {
              resetOnboarding();
              navigate({ to: "/onboarding/goals" });
            }}
          >
            Start your free journey →
          </PrimaryButton>
          <GhostButton onClick={() => navigate({ to: "/login" })}>
            I already have an account
          </GhostButton>
          <p className="text-center text-[12px] text-white/30">
            7-day free trial · No credit card needed
          </p>
          <p className="text-center text-[10px] uppercase tracking-widest text-white/15">
            <Link to="/app/home" className="hover:text-white/30 transition-colors">
              Skip to app preview
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
