import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Star, Check, X, Menu, ArrowRight, ChevronDown,
  Brain, Zap, Users, Sparkles, Trophy, BarChart3, DollarSign,
  Flame, Target, Shield, Clock, TrendingUp, Heart, Infinity,
  Instagram, Twitter, Youtube,
} from "lucide-react";
import { Logo } from "@/components/rewire/Logo";
import { MiniMemory } from "@/components/marketing/MiniMemory";
import { PhoneMock } from "@/components/marketing/PhoneMock";
import brainHero from "@/assets/brain-hero.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rewire — Brain Training Built for ADHD Minds" },
      { name: "description", content: "5-minute daily sessions designed for ADHD. Join 2M+ users. Free to start." },
      { property: "og:title", content: "Rewire — Brain Training Built for ADHD Minds" },
      { property: "og:description", content: "5-minute daily sessions designed for ADHD. Join 2M+ users. Free to start." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LandingPage,
});

/* ── Shared CTA ── */
function CtaButton({ onClick, children, className = "" }: { onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#7858FF] to-[#5b3eff] px-8 py-4 text-[16px] font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] ${className}`}
      style={{ boxShadow: "0 8px 40px rgba(108,71,255,0.55), 0 2px 8px rgba(0,0,0,0.3)" }}
    >
      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/15 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="relative">{children}</span>
    </button>
  );
}

/* ── HEADER ── */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const goto = (id: string) => {
    setOpen(false);
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
    });
  };

  const links = [
    { id: "how", label: "How it works" },
    { id: "features", label: "Features" },
    { id: "reviews", label: "Reviews" },
    { id: "pricing", label: "Pricing" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-white/[0.08] bg-[#07091A]/90 backdrop-blur-2xl" : "bg-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-[1140px] items-center justify-between px-5">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5">
          <Logo size={32} />
          <span className="text-[18px] font-black" style={{ letterSpacing: "-0.5px" }}>Rewire</span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <button key={l.id} onClick={() => goto(l.id)} className="text-[13px] font-medium text-white/60 hover:text-white transition-colors">
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="/login" className="text-[13px] font-semibold text-white/60 hover:text-white transition-colors">
            Sign in
          </a>
          <a
            href="/welcome"
            className="rounded-full bg-[#7858FF] px-5 py-2 text-[13px] font-bold text-white shadow-[0_4px_20px_rgba(120,88,255,0.5)] hover:scale-[1.03] transition-transform"
          >
            Start free →
          </a>
        </div>

        <button onClick={() => setOpen((v) => !v)} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] md:hidden" aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden border-t border-white/[0.07] bg-[#07091A]/97 backdrop-blur-2xl md:hidden">
            <div className="space-y-1 px-5 py-4">
              {links.map((l) => (
                <button key={l.id} onClick={() => goto(l.id)} className="block w-full rounded-xl px-3 py-3 text-left text-[14px] font-medium text-white/70 hover:bg-white/[0.05]">
                  {l.label}
                </button>
              ))}
              <div className="pt-2 space-y-2">
                <a href="/login" className="block w-full rounded-2xl border border-white/[0.1] py-3 text-center text-[14px] font-semibold text-white/70 hover:bg-white/[0.05] transition-colors">
                  Sign in
                </a>
                <a href="/welcome" className="block w-full rounded-2xl bg-[#7858FF] py-3.5 text-center text-[14px] font-bold text-white hover:bg-[#8a6dff] transition-colors">
                  Start free →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ── HERO ── */
function Hero() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  const stagger = (i: number) => reduce ? {} : {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" as const },
  };

  const [count, setCount] = useState(2000000);
  useEffect(() => {
    const t = setTimeout(() => setCount(2000000 + Math.floor(Math.random() * 50000)), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden px-5 pt-24 pb-16 md:min-h-screen md:pt-36 md:pb-20">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#7858FF]/18 blur-[160px] orb-1" />
        <div className="absolute bottom-0 right-[-10%] h-[500px] w-[500px] rounded-full bg-[#00D9A3]/12 blur-[140px] orb-2" />
        <div className="absolute top-1/3 left-[-10%] h-[400px] w-[400px] rounded-full bg-[#A78BFA]/8 blur-[120px] orb-3" />
      </div>

      {/* Brain backdrop */}
      <div className="pointer-events-none absolute left-1/2 top-[15%] -translate-x-1/2 select-none">
        <div className="relative h-[560px] w-[560px] md:h-[720px] md:w-[720px]">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(120,88,255,0.45)_0%,_rgba(0,217,163,0.2)_45%,_transparent_70%)] brain-glow" aria-hidden />
          <div className="absolute inset-[-40px] rounded-full border border-white/[0.05] aura-spin" style={{
            background: "conic-gradient(from 0deg, transparent 0deg, rgba(120,88,255,0.15) 60deg, transparent 120deg, rgba(0,217,163,0.15) 200deg, transparent 260deg, rgba(245,197,24,0.12) 320deg, transparent 360deg)",
            maskImage: "radial-gradient(circle, transparent 55%, black 58%, black 70%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(circle, transparent 55%, black 58%, black 70%, transparent 75%)",
          }} aria-hidden />
          <img src={brainHero} alt="" aria-hidden className="brain-float relative z-[1] h-full w-full object-contain opacity-35 mix-blend-screen md:opacity-45" />
        </div>
      </div>

      <div className="relative mx-auto max-w-[1140px]">
        {/* Trust pill */}
        <motion.div {...stagger(0)} className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7858FF]/35 bg-[#7858FF]/10 px-4 py-2 text-[13px] font-semibold text-[#A78BFA]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#7858FF] opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-[#7858FF]" />
            </span>
            Trusted by {(count / 1000000).toFixed(1)}M+ ADHD minds worldwide
          </div>
        </motion.div>

        {/* Headline */}
        <h1 className="mx-auto mt-8 max-w-4xl text-center text-[46px] font-black leading-[1.0] sm:text-[62px] md:text-[84px]" style={{ letterSpacing: "-3.5px" }}>
          <motion.span {...stagger(1)} className="block text-white">Your ADHD brain</motion.span>
          <motion.span {...stagger(2)} className="block gradient-text">isn't broken.</motion.span>
          <motion.span {...stagger(3)} className="block text-white">It's untrained.</motion.span>
        </h1>

        <motion.p {...stagger(4)} className="mx-auto mt-6 max-w-2xl text-center text-[16px] leading-relaxed text-white/55 md:text-[19px]">
          5-minute daily sessions designed for how ADHD brains actually work.
          Build focus, calm anxiety, train memory — and{" "}
          <span className="font-semibold text-white/80">actually stick to it</span>.
        </motion.p>

        {/* Stats row */}
        <motion.div {...stagger(5)} className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {[
            { icon: "⭐", stat: "4.8", label: "App Store rating" },
            { icon: "🔥", stat: "50K+", label: "reviews" },
            { icon: "🧠", stat: "84%", label: "cheaper than rivals" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2 text-[14px]">
              <span>{s.icon}</span>
              <span className="font-black text-white">{s.stat}</span>
              <span className="text-white/40">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div {...stagger(6)} className="mt-10 flex flex-col items-center gap-3">
          <CtaButton onClick={() => navigate({ to: "/welcome" })}>
            Start training free →
          </CtaButton>
          <p className="text-[12px] text-white/40">7-day free trial · No credit card · Cancel anytime</p>
        </motion.div>

        {/* Phone mockups */}
        <motion.div {...stagger(7)} className="mt-16 flex items-end justify-center gap-4 md:gap-10">
          <div className="hidden md:block">
            <PhoneMock rotate={-14} scale={0.82} glow="rgba(120,88,255,0.4)">
              <PhoneHome />
            </PhoneMock>
          </div>
          <PhoneMock scale={1} glow="rgba(120,88,255,0.6)">
            <PhoneGame />
          </PhoneMock>
          <div className="hidden md:block">
            <PhoneMock rotate={14} scale={0.82} glow="rgba(0,217,163,0.4)">
              <PhoneScores />
            </PhoneMock>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Phone screens ── */
function PhoneHome() {
  return (
    <div className="flex h-full flex-col p-4">
      <div className="text-[10px] uppercase tracking-widest text-white/40">Good morning</div>
      <div className="mt-0.5 text-[20px] font-black" style={{ letterSpacing: "-0.5px" }}>Alex 👋</div>
      <div className="mt-3 rounded-2xl bg-gradient-to-br from-[#7858FF]/25 to-[#00D9A3]/15 p-3.5">
        <div className="flex items-center gap-1.5 text-[#F5C518]">
          <Flame className="h-3.5 w-3.5" />
          <span className="text-[12px] font-bold">21-day streak</span>
        </div>
        <div className="mt-1.5 text-[28px] font-black" style={{ letterSpacing: "-0.5px" }}>🔥 21</div>
      </div>
      <div className="mt-3 rounded-2xl border border-white/10 bg-[#131A2E] p-3">
        <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Today's mission</div>
        <div className="mt-1.5 text-[13px] font-bold">5-min focus boost</div>
        <div className="mt-1 text-[10px] text-white/40">3 games · ~5 min</div>
        <div className="mt-2.5 rounded-full bg-[#7858FF] py-1.5 text-center text-[11px] font-bold">Start →</div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {[
          { l: "Focus", c: "#7858FF" }, { l: "Memory", c: "#00D9A3" }, { l: "Calm", c: "#A78BFA" },
        ].map((d) => (
          <div key={d.l} className="rounded-xl border border-white/10 bg-[#131A2E] p-2 text-center">
            <div className="text-[12px]">🧠</div>
            <div className="mt-0.5 text-[9px] font-semibold" style={{ color: d.c }}>{d.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneGame() {
  return (
    <div className="flex h-full flex-col items-center p-4">
      <div className="text-[10px] uppercase tracking-widest text-white/40">Memory Matrix</div>
      <div className="mt-0.5 text-[15px] font-black" style={{ letterSpacing: "-0.4px" }}>Round 3 of 5</div>
      <div className="mt-4 grid grid-cols-4 gap-1.5">
        {Array.from({ length: 16 }).map((_, i) => {
          const lit = [2, 5, 7, 10, 13].includes(i);
          return (
            <div key={i} className={`aspect-square rounded-lg ${lit ? "bg-[#7858FF] shadow-[0_0_16px_rgba(120,88,255,0.7)]" : "bg-white/[0.05]"}`} />
          );
        })}
      </div>
      <div className="mt-4 flex gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`h-1.5 w-6 rounded-full ${i <= 3 ? "bg-[#7858FF]" : "bg-white/10"}`} />
        ))}
      </div>
      <div className="mt-3 text-[10px] text-white/40">Memorize the pattern</div>
      <div className="mt-auto rounded-full border border-[#00D9A3]/40 bg-[#00D9A3]/15 px-3 py-1 text-[10px] font-bold text-[#00D9A3]">
        +12 Memory pts
      </div>
    </div>
  );
}

function PhoneScores() {
  const scores = [
    { l: "Focus", v: 78, c: "#7858FF" }, { l: "Memory", v: 84, c: "#00D9A3" },
    { l: "Speed", v: 71, c: "#F5C518" }, { l: "Logic", v: 66, c: "#A78BFA" },
    { l: "Calm", v: 81, c: "#FF6B6B" },
  ];
  return (
    <div className="flex h-full flex-col p-4">
      <div className="text-[10px] uppercase tracking-widest text-white/40">Brain profile</div>
      <div className="mt-0.5 text-[18px] font-black" style={{ letterSpacing: "-0.5px" }}>Your scores</div>
      <div className="mt-3 flex justify-center">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#7858FF]/30 to-[#00D9A3]/20">
          <div className="text-[22px] font-black text-white">76</div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {scores.map((s) => (
          <div key={s.l}>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-white/60">{s.l}</span>
              <span className="font-bold">{s.v}</span>
            </div>
            <div className="mt-0.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full rounded-full" style={{ width: `${s.v}%`, background: s.c }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-[10px] font-bold text-[#00D9A3]">↑ +12% this week</div>
    </div>
  );
}

/* ── TICKER ── */
function Ticker() {
  const items = [
    "🔥 Focus +41%", "⚡ Memory Matrix", "🏆 21-day streak", "🧠 ADHD Built",
    "✨ AI Coaching", "👑 2M+ Users", "🎯 5-min sessions", "📈 Real results",
    "🔥 Focus +41%", "⚡ Memory Matrix", "🏆 21-day streak", "🧠 ADHD Built",
    "✨ AI Coaching", "👑 2M+ Users", "🎯 5-min sessions", "📈 Real results",
  ];
  return (
    <div className="border-y border-white/[0.06] bg-[#0D1226]/60 py-3 ticker-wrap overflow-hidden">
      <div className="ticker-inner gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="mr-8 inline-block text-[13px] font-semibold text-white/45">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── PROBLEM SECTION ── */
function Problem() {
  const navigate = useNavigate();
  const pains = [
    { title: "Paywalled after 2 minutes", body: "Most apps lock everything before you feel any benefit." },
    { title: "Boring repetitive tasks", body: "ADHD needs novelty. Same exercise 40× is torture, not training." },
    { title: "One-size-fits-all", body: "Your focus isn't broken the same way as anxiety. Generic fails both." },
    { title: "No social accountability", body: "Streaks die in isolation. You need a friend to stay accountable." },
  ];
  const wins = [
    "Generous free tier — get hooked before you pay",
    "50+ rotating games for novelty-seeking brains",
    "Personalized program from your first 60 seconds",
    "Squad challenges, friend streaks, weekly leaderboards",
  ];
  return (
    <section className="px-5 py-16 md:py-24">
      <div className="mx-auto grid max-w-[1140px] gap-12 md:grid-cols-2 md:items-center">
        <div>
          <div className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#A78BFA]">Sound familiar?</div>
          <h2 className="mt-3 text-[32px] font-black leading-tight md:text-[44px]" style={{ letterSpacing: "-1.2px" }}>
            Other brain apps weren't built for you.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/55">
            They assume you can sit still for 20 minutes, never miss a day, and aren't frustrated by paywalls after 5 minutes. That's not ADHD.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {pains.map((p) => (
              <div key={p.title} className="rounded-2xl border border-[#FF6B6B]/15 bg-[#FF6B6B]/[0.05] p-4">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-[#FF6B6B]">✕</span>
                  <div>
                    <div className="text-[13px] font-bold">{p.title}</div>
                    <div className="mt-1 text-[12px] leading-snug text-white/50">{p.body}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] border border-[#00D9A3]/20 bg-[#0D1226] p-6 shadow-[0_20px_80px_-20px_rgba(0,217,163,0.2)]">
          <div className="text-[12px] font-black uppercase tracking-[0.25em] text-[#00D9A3]">Rewire is different.</div>
          <h3 className="mt-2 text-[24px] font-black leading-tight" style={{ letterSpacing: "-0.6px" }}>
            Built around your brain — not against it.
          </h3>
          <div className="mt-5 space-y-3">
            {wins.map((w) => (
              <div key={w} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00D9A3]/20">
                  <Check className="h-3.5 w-3.5 text-[#00D9A3]" strokeWidth={3} />
                </span>
                <span className="text-[14px] leading-snug text-white/80">{w}</span>
              </div>
            ))}
          </div>
          <button onClick={() => navigate({ to: "/welcome" })} className="mt-6 w-full rounded-2xl bg-[#00D9A3] py-3.5 text-[14px] font-bold text-[#07091A] hover:bg-[#00c494] transition-colors">
            Start training free →
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── SOCIAL PROOF ── */
function SocialProof() {
  const [count, setCount] = useState(1847);
  useEffect(() => {
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      setCount((c) => c + 1 + Math.floor(Math.random() * 3));
      window.setTimeout(tick, 5000 + Math.random() * 6000);
    };
    const t = window.setTimeout(tick, 5000);
    return () => { cancelled = true; window.clearTimeout(t); };
  }, []);

  const reviews = [
    { title: "ADHD brain food 🧠", body: "Focus scores up 41% in 3 weeks. I actually look forward to my 5-minute morning session.", name: "Alex M., Software Engineer", streak: "21 days", avatar: "A", rating: 5 },
    { title: "My reset button between meetings", body: "Between work and kids I'm constantly overstimulated. This gives me 5 minutes to reset. My brain actually feels sharper.", name: "Michelle D., Entrepreneur", streak: "47 days", avatar: "M", rating: 5 },
    { title: "My boss noticed I'm sharper", body: "My friend challenged me week 1. Two months later my reaction time genuinely improved — my boss noticed.", name: "James R., Product Manager", streak: "63 days", avatar: "J", rating: 5 },
    { title: "Finally something that sticks", body: "I've tried Elevate, Lumosity, Headspace. Nothing clicked. This is different. The short format is everything.", name: "Sara L., Designer", streak: "34 days", avatar: "S", rating: 5 },
    { title: "Reduced my screen-checking by 60%", body: "The focus training is measurable. I noticed after 2 weeks that I wasn't compulsively checking my phone.", name: "Daniel P., Developer", streak: "19 days", avatar: "D", rating: 5 },
    { title: "Worth every penny", body: "At $4/month I was skeptical. Now I tell everyone. The AI coach alone is worth 10x that.", name: "Rachel T., Teacher", streak: "52 days", avatar: "R", rating: 5 },
  ];

  return (
    <section id="reviews" className="bg-[#0D1226] px-5 py-16 md:py-24">
      <div className="mx-auto max-w-[1140px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="text-[72px] font-black leading-none text-[#F5C518]" style={{ letterSpacing: "-3px" }}>4.8</div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-[#F5C518] text-[#F5C518]" />)}
          </div>
          <div className="text-[14px] text-white/45">from 50,000+ verified reviews</div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF6B6B]/25 bg-[#FF6B6B]/10 px-4 py-2 text-[12px] font-bold text-[#FF6B6B]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#FF6B6B] opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-[#FF6B6B]" />
            </span>
            LIVE · {count.toLocaleString()} people training right now
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.title} className="rounded-[22px] border border-white/[0.06] bg-[#131A2E] p-5 transition-all hover:border-white/[0.12] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
              <div className="flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-[#F5C518] text-[#F5C518]" />)}
              </div>
              <div className="mt-2 text-[15px] font-black leading-tight">{r.title}</div>
              <p className="mt-2 text-[13px] leading-relaxed text-white/60">{r.body}</p>
              <div className="mt-4 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#7858FF]/50 to-[#00D9A3]/30 text-[13px] font-black">{r.avatar}</div>
                <div>
                  <div className="text-[12px] font-semibold text-white/80">{r.name}</div>
                  <div className="text-[11px] text-[#F5C518]">🔥 {r.streak} streak</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/25">As featured in</div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {["TechCrunch", "Product Hunt", "ADHD Weekly", "Wired", "Lifehacker", "Forbes"].map((l) => (
              <span key={l} className="text-[16px] font-black tracking-tight text-white/30 md:text-[20px]">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── HOW IT WORKS ── */
function HowItWorks() {
  const steps = [
    { icon: "🧩", step: "1", title: "Take the 60-second brain quiz", body: "4 questions. We identify your cognitive profile and build a personalized program instantly." },
    { icon: "⚡", step: "2", title: "Play your 5-minute daily session", body: "3 targeted games each day. Short enough to actually do. Varied enough your ADHD brain stays hooked." },
    { icon: "📈", step: "3", title: "Watch real scores improve", body: "Every session updates your brain scores across 5 domains. Track your transformation week by week." },
  ];
  return (
    <section id="how" className="px-5 py-16 md:py-24">
      <div className="mx-auto max-w-[1140px] text-center">
        <div className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#A78BFA]">The method</div>
        <h2 className="mt-3 text-[34px] font-black leading-tight md:text-[48px]" style={{ letterSpacing: "-1.5px" }}>
          Results in minutes.<br />
          <span className="gradient-text">Transformation in weeks.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] text-white/50">
          No 30-minute sessions. No willpower required. Just 5 minutes that compound.
        </p>
        <div className="relative mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          {/* Connector line */}
          <div className="absolute left-1/6 top-8 hidden h-[2px] w-2/3 -translate-y-1/2 bg-[repeating-linear-gradient(90deg,rgba(120,88,255,0.3)_0_8px,transparent_8px_16px)] md:block" aria-hidden />
          {steps.map((s) => (
            <div key={s.step} className="relative">
              <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#7858FF]/15 blur-xl" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#131A2E] text-[30px]">
                  {s.icon}
                </div>
                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#7858FF] text-[10px] font-black text-white">
                  {s.step}
                </span>
              </div>
              <h3 className="mt-5 text-[18px] font-black" style={{ letterSpacing: "-0.4px" }}>{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-[13px] leading-relaxed text-white/50">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FEATURES ── */
function Features() {
  const navigate = useNavigate();
  const items = [
    { icon: <Brain className="h-5 w-5" />, title: "ADHD-First Design", body: "Built around dopamine, novelty, and short wins — not willpower.", badge: "Only on Rewire", badgeColor: "violet" as const },
    { icon: <Users className="h-5 w-5" />, title: "Squad Challenges", body: "Challenge friends, weekly leaderboards, squads of 4.", badge: "Only on Rewire", badgeColor: "violet" as const },
    { icon: <Sparkles className="h-5 w-5" />, title: "AI Coaching", body: "Personalized tips from your session patterns. Adapts weekly.", badge: "Pro feature", badgeColor: "teal" as const },
    { icon: <Trophy className="h-5 w-5" />, title: "50+ Games Rotating", body: "New games unlock as you progress. Novelty every single day.", badge: undefined, badgeColor: "violet" as const },
    { icon: <BarChart3 className="h-5 w-5" />, title: "5 Brain Domains", body: "Focus, Memory, Speed, Logic, Calm — all tracked in real time.", badge: undefined, badgeColor: "violet" as const },
    { icon: <Flame className="h-5 w-5" />, title: "Streak Savers", body: "Missed a day? Keep your streak alive. Life happens.", badge: undefined, badgeColor: "violet" as const },
    { icon: <Clock className="h-5 w-5" />, title: "5-Minute Sessions", body: "Designed for busy people who can't sit still for 30 minutes.", badge: undefined, badgeColor: "violet" as const },
    { icon: <DollarSign className="h-5 w-5" />, title: "84% Cheaper", body: "Full Pro from $4.16/mo. Competitors charge $363/year.", badge: "Best value", badgeColor: "gold" as const },
  ];
  const badgeStyles = {
    violet: "border-[#7858FF]/30 bg-[#7858FF]/15 text-[#A78BFA]",
    teal: "border-[#00D9A3]/30 bg-[#00D9A3]/15 text-[#00D9A3]",
    gold: "border-[#F5C518]/30 bg-[#F5C518]/15 text-[#F5C518]",
  };
  return (
    <section id="features" className="px-5 py-16 md:py-24">
      <div className="mx-auto max-w-[1140px]">
        <div className="text-center">
          <div className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#A78BFA]">Features</div>
          <h2 className="mt-3 text-[34px] font-black leading-tight md:text-[48px]" style={{ letterSpacing: "-1.5px" }}>
            Everything your ADHD brain needs.{" "}
            <span className="text-white/30">Nothing it doesn't.</span>
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="group relative flex flex-col rounded-[22px] border border-white/[0.06] bg-[#0D1226] p-5 transition-all hover:border-[#7858FF]/25 hover:bg-[#131A2E] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7858FF]/15 text-[#A78BFA] transition-colors group-hover:bg-[#7858FF]/20">
                {item.icon}
              </div>
              <div className="mt-4 text-[15px] font-black">{item.title}</div>
              <p className="mt-1 text-[13px] leading-snug text-white/50">{item.body}</p>
              {item.badge && (
                <span className={`mt-3 inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeStyles[item.badgeColor]}`}>
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── DEMO ── */
function Demo() {
  const navigate = useNavigate();
  return (
    <section className="bg-[#0D1226] px-5 py-16 md:py-24">
      <div className="mx-auto max-w-[1140px] text-center">
        <div className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#A78BFA]">Try it now</div>
        <h2 className="mt-3 text-[34px] font-black leading-tight md:text-[48px]" style={{ letterSpacing: "-1.5px" }}>
          Play a game right now.{" "}
          <span className="gradient-text">No signup.</span>
        </h2>
        <p className="mt-3 text-[15px] text-white/50">This is what 3 minutes feels like.</p>
        <div className="mx-auto mt-10 max-w-[420px] rounded-[32px] border border-white/[0.08] bg-[#07091A] p-5 shadow-[0_30px_100px_-20px_rgba(120,88,255,0.4)]">
          <MiniMemory />
        </div>
        <div className="mt-8">
          <CtaButton onClick={() => navigate({ to: "/welcome" })}>
            Start my full program →
          </CtaButton>
        </div>
      </div>
    </section>
  );
}

/* ── PRICING ── */
function Pricing() {
  const navigate = useNavigate();
  const goPro = () => {
    try { localStorage.setItem("trialIntent", "pro"); } catch { /* ignore */ }
    navigate({ to: "/welcome" });
  };

  const plans = [
    {
      id: "free", name: "Free", price: "$0", period: "/forever",
      features: ["4 free games", "8 sessions/day", "Basic brain tracking", "Community leaderboard"],
      cta: { label: "Download free", onClick: () => navigate({ to: "/welcome" }), style: "ghost" },
    },
    {
      id: "pro", name: "Pro", price: "$4.16", period: "/mo",
      featured: true, strike: "$9.99/mo", sub: "Billed $49.99/year", badge: "SAVE 58%",
      features: ["Everything in Free", "Unlimited sessions", "All 50+ games", "AI adaptive coaching", "Friend challenges & squads", "Unlimited streak savers", "Offline mode", "No ads — ever"],
      cta: { label: "Start 7-day free trial →", onClick: goPro, style: "violet" },
    },
    {
      id: "family", name: "Family", price: "$19.99", period: "/mo",
      features: ["6 member profiles", "Parent dashboard", "Kid-safe mode", "Everything in Pro"],
      cta: { label: "Start family trial", onClick: goPro, style: "ghost" },
    },
  ];

  return (
    <section id="pricing" className="px-5 py-16 md:py-24">
      <div className="mx-auto max-w-[1140px]">
        <div className="text-center">
          <div className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#A78BFA]">Pricing</div>
          <h2 className="mt-3 text-[34px] font-black leading-tight md:text-[48px]" style={{ letterSpacing: "-1.5px" }}>
            Start free. Upgrade when ready.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-white/50">No credit card for trial. Cancel with one tap. No dark patterns.</p>
          <div className="mt-5 inline-block rounded-2xl border border-[#F5C518]/25 bg-[#F5C518]/[0.07] px-5 py-2.5 text-[14px]">
            Competitors charge <span className="text-white/40 line-through">$363/year</span>{" → "}
            <span className="font-black text-[#F5C518]">Rewire Pro is $49.99/year</span>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3 md:items-start">
          {plans.map((p: any) => (
            <div key={p.id} className={`relative flex flex-col rounded-[26px] p-6 ${p.featured ? "border-2 border-[#7858FF] bg-[#0D1226] shadow-[0_20px_80px_-20px_rgba(120,88,255,0.55)]" : "border border-white/[0.07] bg-[#0D1226]"}`}>
              {p.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#7858FF] px-4 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-[0_4px_20px_rgba(120,88,255,0.55)]">
                  Most popular
                </span>
              )}
              <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/40">{p.name}</div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-[42px] font-black leading-none" style={{ letterSpacing: "-1.5px" }}>{p.price}</span>
                <span className="text-[14px] text-white/45">{p.period}</span>
              </div>
              {p.strike && (
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[12px] text-white/35 line-through">{p.strike}</span>
                  {p.badge && <span className="rounded-full bg-[#00D9A3]/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#00D9A3]">{p.badge}</span>}
                </div>
              )}
              {p.sub && <div className="mt-0.5 text-[12px] text-white/40">{p.sub}</div>}
              <ul className="mt-5 space-y-2.5">
                {p.features.map((f: string) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13px] text-white/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00D9A3]" strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={p.cta.onClick} className={`mt-6 w-full rounded-2xl px-5 py-3.5 text-[14px] font-bold transition-all hover:scale-[1.02] ${p.cta.style === "violet" ? "bg-gradient-to-r from-[#7858FF] to-[#6C47FF] text-white shadow-[0_8px_30px_rgba(120,88,255,0.5)]" : "border border-white/15 bg-white/5 text-white/70 hover:bg-white/10"}`}>
                {p.cta.label}
              </button>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-[12px] text-white/30">
          7-day free trial · 30-day money-back guarantee · 256-bit encryption · Cancel anytime
        </p>
      </div>
    </section>
  );
}

/* ── FAQ ── */
function Faq() {
  const items = [
    { q: "Is this actually designed for ADHD or just marketing?", a: "It's real. Every game, session length, and reward mechanic was designed specifically for dopamine-deficient attention systems. Our ADHD users see 2x the engagement of neurotypical users." },
    { q: "How is this different from Lumosity or Elevate?", a: "Those are generic. Rewire is ADHD-first — with social features, a genuine free tier, and sessions short enough an ADHD brain will actually complete them. Also 84% cheaper." },
    { q: "What if I miss days? Will my streak reset?", a: "We give every user Streak Savers. Life happens. Pro users get unlimited. And your brain scores and progress never reset — only streaks." },
    { q: "Will I actually see results?", a: "Most users see measurable improvement in focus scores within 2 weeks of consistent daily sessions. 21 days is the full first program cycle. Cognitive training has strong peer-reviewed evidence." },
    { q: "Can my kids use this?", a: "Yes — our Family plan includes kid-safe mode and a parent dashboard to track progress across 6 profiles." },
    { q: "What if I don't like it?", a: "7-day free trial, no credit card. If you upgrade and change your mind within 30 days, we refund every penny — no questions, one email." },
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-5 py-16 md:py-24">
      <div className="mx-auto max-w-[800px]">
        <div className="text-center">
          <div className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#A78BFA]">FAQ</div>
          <h2 className="mt-3 text-[34px] font-black leading-tight md:text-[44px]" style={{ letterSpacing: "-1.2px" }}>Questions? Answered.</h2>
        </div>
        <div className="mt-10 space-y-2">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={`overflow-hidden rounded-2xl border transition-colors ${isOpen ? "border-[#7858FF]/30 bg-[#131A2E]" : "border-white/[0.06] bg-[#0D1226]"}`}>
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left" aria-expanded={isOpen}>
                  <span className="text-[14px] font-bold md:text-[15px]">{item.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-white/40 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                      <div className="px-5 pb-5 text-[13.5px] leading-relaxed text-white/55">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── FINAL CTA ── */
function FinalCta() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-[#0D1226] px-5 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7858FF]/15 blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-[800px] text-center">
        <div className="mb-4 text-[48px]">🧠</div>
        <h2 className="text-[36px] font-black leading-tight md:text-[56px]" style={{ letterSpacing: "-2px" }}>
          Your ADHD brain is waiting to be{" "}
          <span className="gradient-text">trained.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[15px] text-white/50 md:text-[17px]">
          Join 2 million people who stopped making excuses and started making progress. 5 minutes. Starting now.
        </p>
        <div className="mt-8 flex justify-center">
          <CtaButton onClick={() => navigate({ to: "/welcome" })} className="px-10 py-5 text-[17px]">
            Start training free →
          </CtaButton>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {["📱 iOS", "🤖 Android", "💻 Web"].map((p) => (
            <span key={p} className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-[13px] text-white/60">{p}</span>
          ))}
        </div>
        <p className="mt-5 text-[12px] text-white/30">Free to download · 7-day Pro trial · No credit card</p>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
/* Footer link data — plain hrefs, no router dependency */
const FOOTER_COLS: {
  title: string;
  links: { label: string; href: string }[];
}[] = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#how" },
      { label: "Features",     href: "/#features" },
      { label: "Reviews",      href: "/#reviews" },
      { label: "Pricing",      href: "/#pricing" },
      { label: "Blog",         href: "/blog" },
      { label: "Changelog",    href: "/changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us",   href: "/about" },
      { label: "Careers",    href: "/careers" },
      { label: "Press kit",  href: "/press" },
      { label: "Contact",    href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy",    href: "/privacy" },
      { label: "Terms of Service",  href: "/terms" },
      { label: "Cookie Policy",     href: "/cookies" },
      { label: "Accessibility",     href: "/accessibility" },
    ],
  },
];

function Footer() {
  return (
    <footer className="border-t border-white/[0.05] bg-[#07091A] px-5 py-14">
      <div className="mx-auto grid max-w-[1140px] gap-10 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <Logo size={30} />
            <span className="text-[17px] font-black" style={{ letterSpacing: "-0.4px" }}>Rewire</span>
          </div>
          <p className="mt-3 max-w-xs text-[13px] text-white/40">
            Brain training for ADHD minds. 5 minutes a day. Real results.
          </p>
          <div className="mt-4 flex gap-2">
            {[Twitter, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.05] text-white/40 hover:bg-white/[0.1] hover:text-white/80 transition-all"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {FOOTER_COLS.map((col) => (
          <div key={col.title}>
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">
              {col.title}
            </div>
            <ul className="mt-3 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[13px] text-white/50 hover:text-white/80 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-[1140px] border-t border-white/[0.05] pt-6 text-center text-[12px] text-white/25">
        © 2025 Rewire Inc. All rights reserved. · Built for 🧠 minds worldwide.
      </div>
    </footer>
  );
}

/* ── FLOATING CTA ── */
function FloatingCta() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => {
      const el = document.getElementById("pricing");
      const scrolled = window.scrollY > 800;
      let pricingVisible = false;
      if (el) { const r = el.getBoundingClientRect(); pricingVisible = r.top < window.innerHeight * 0.8 && r.bottom > 0; }
      setShow(scrolled && !pricingVisible);
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          onClick={() => navigate({ to: "/welcome" })}
          className="fixed bottom-6 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7858FF] to-[#6C47FF] px-5 py-3.5 text-[14px] font-bold text-white shadow-[0_12px_40px_rgba(120,88,255,0.6)] hover:scale-[1.04] transition-transform"
        >
          🧠 Start free <ArrowRight className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ── PAGE ── */
function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#07091A] text-white">
      <Header />
      <Hero />
      <Ticker />
      <Problem />
      <SocialProof />
      <HowItWorks />
      <Features />
      <Demo />
      <Pricing />
      <Faq />
      <FinalCta />
      <Footer />
      <FloatingCta />
    </main>
  );
}
