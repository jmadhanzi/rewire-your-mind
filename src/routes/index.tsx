import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Star,
  Check,
  X,
  Menu,
  ArrowRight,
  ChevronDown,
  Twitter,
  Instagram,
  Music,
  Flame,
  Brain,
  Zap,
  Users,
  Sparkles,
  Trophy,
  BarChart3,
  DollarSign,
  Smartphone,
} from "lucide-react";
import { Logo } from "@/components/rewire/Logo";
import { MiniMemory } from "@/components/marketing/MiniMemory";
import { PhoneMock } from "@/components/marketing/PhoneMock";
import brainHero from "@/assets/brain-hero.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rewire — Brain Training Built for ADHD Minds" },
      {
        name: "description",
        content:
          "5-minute daily sessions designed for ADHD. Join 2M+ users. Free to start.",
      },
      {
        property: "og:title",
        content: "Rewire — Brain Training Built for ADHD Minds",
      },
      {
        property: "og:description",
        content:
          "5-minute daily sessions designed for ADHD. Join 2M+ users. Free to start.",
      },
      { property: "og:type", content: "website" },
      {
        name: "twitter:title",
        content: "Rewire — Brain Training Built for ADHD Minds",
      },
      {
        name: "twitter:description",
        content:
          "5-minute daily sessions designed for ADHD. Join 2M+ users. Free to start.",
      },
    ],
  }),
  component: LandingPage,
});

/* ─────────────────────────── HEADER ─────────────────────────── */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goCta = () => navigate({ to: "/welcome" });

  const links = [
    { id: "how", label: "How it works" },
    { id: "pricing", label: "Pricing" },
    { id: "reviews", label: "Reviews" },
  ];

  const handleNav = (id: string) => {
    setOpen(false);
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 backdrop-blur-md transition-colors ${
        scrolled
          ? "border-b border-white/10 bg-[#07091A]/80"
          : "bg-[#07091A]/60"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-5">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2"
          aria-label="Rewire home"
        >
          <Logo size={36} />
          <span
            className="text-[18px] font-black"
            style={{ letterSpacing: "-0.5px" }}
          >
            Rewire
          </span>
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              className="text-[14px] text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={goCta}
            className="rounded-full bg-[#7858FF] px-4 py-2 text-[13px] font-bold text-white shadow-[0_4px_18px_rgba(120,88,255,0.55)] transition-transform hover:scale-[1.03]"
          >
            Start free →
          </button>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/10 bg-[#07091A]/95 md:hidden"
          >
            <div className="space-y-1 px-5 py-3">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => handleNav(l.id)}
                  className="block w-full rounded-xl px-3 py-3 text-left text-[14px] text-white/80 hover:bg-white/5"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  goCta();
                }}
                className="mt-2 w-full rounded-full bg-[#7858FF] px-4 py-3 text-[14px] font-bold text-white"
              >
                Start free →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─────────────────────────── HERO ─────────────────────────── */

function Hero() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const lineAnim = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: "easeOut" as const },
        };

  return (
    <section className="relative overflow-hidden px-5 pt-28 pb-20 md:min-h-screen md:pt-40 md:pb-24">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#7858FF]/25 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#00D9A3]/15 blur-[140px]" />

      {/* Animated brain backdrop */}
      <div className="pointer-events-none absolute left-1/2 top-[18%] -translate-x-1/2 select-none">
        <div className="relative h-[520px] w-[520px] md:h-[680px] md:w-[680px]">
          <div
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(120,88,255,0.55)_0%,_rgba(0,217,163,0.25)_45%,_transparent_70%)] brain-glow"
            aria-hidden
          />
          <div
            className="absolute inset-[-40px] rounded-full border border-white/[0.06] aura-spin"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, rgba(120,88,255,0.18) 60deg, transparent 120deg, rgba(0,217,163,0.18) 200deg, transparent 260deg, rgba(245,197,24,0.15) 320deg, transparent 360deg)",
              maskImage:
                "radial-gradient(circle, transparent 55%, black 58%, black 70%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(circle, transparent 55%, black 58%, black 70%, transparent 75%)",
            }}
            aria-hidden
          />
          <img
            src={brainHero}
            alt=""
            aria-hidden
            className="brain-float relative z-[1] h-full w-full object-contain opacity-40 mix-blend-screen md:opacity-50"
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-[1100px]">
        <motion.div
          {...lineAnim(0)}
          className="mx-auto inline-flex items-center justify-center"
        >
          <div className="flex w-full justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#7858FF]/40 bg-[#7858FF]/15 px-4 py-2 text-[13px] text-[#A78BFA]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#7858FF] opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-[#7858FF]" />
              </span>
              Trusted by 2M+ ADHD minds worldwide
            </span>
          </div>
        </motion.div>

        <h1
          className="mx-auto mt-7 max-w-3xl text-center text-[44px] font-black leading-[1.02] sm:text-[60px] md:text-[80px]"
          style={{ letterSpacing: "-3px" }}
        >
          <motion.span {...lineAnim(0.12)} className="block text-white">
            Your ADHD brain
          </motion.span>
          <motion.span
            {...lineAnim(0.24)}
            className="block text-[#7858FF]"
          >
            isn't broken.
          </motion.span>
          <motion.span {...lineAnim(0.36)} className="block text-white">
            It's untrained.
          </motion.span>
        </h1>

        <motion.p
          {...lineAnim(0.5)}
          className="mx-auto mt-6 max-w-xl text-center text-[16px] text-white/60 md:text-[18px]"
        >
          5-minute daily sessions designed for how ADHD brains actually work.
          Build focus, calm anxiety, train memory — and actually stick to it.
        </motion.p>

        <motion.div
          {...lineAnim(0.6)}
          className="mt-10 flex flex-col items-center"
        >
          <button
            onClick={() => navigate({ to: "/welcome" })}
            className="rounded-2xl bg-[#7858FF] px-8 py-4 text-[16px] font-bold text-white shadow-[0_8px_40px_rgba(120,88,255,0.55)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Start training free →
          </button>
          <p className="mt-3 text-[12px] text-white/50">
            7-day free trial · No credit card · Cancel anytime
          </p>
        </motion.div>

        <motion.div
          {...lineAnim(0.72)}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-white/40"
        >
          <span>4.8★ rating (50K reviews)</span>
          <span className="hidden sm:inline">·</span>
          <span>ADHD-first design</span>
          <span className="hidden sm:inline">·</span>
          <span>Built by neuroscience advisors</span>
        </motion.div>

        <motion.div
          {...lineAnim(0.85)}
          className="mt-14 flex items-end justify-center gap-3 md:gap-8"
        >
          <div className="hidden md:block">
            <PhoneMock rotate={-12} scale={0.85} glow="rgba(120,88,255,0.4)">
              <PhoneHome />
            </PhoneMock>
          </div>
          <PhoneMock scale={1} glow="rgba(120,88,255,0.55)">
            <PhoneGame />
          </PhoneMock>
          <div className="hidden md:block">
            <PhoneMock rotate={12} scale={0.85} glow="rgba(0,217,163,0.4)">
              <PhoneScores />
            </PhoneMock>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Phone screen content ─── */
function PhoneHome() {
  return (
    <div className="flex h-full flex-col p-4">
      <div className="text-[10px] uppercase tracking-widest text-white/40">
        Good morning
      </div>
      <div
        className="mt-1 text-[20px] font-black"
        style={{ letterSpacing: "-0.5px" }}
      >
        Alex
      </div>
      <div className="mt-4 rounded-2xl bg-gradient-to-br from-[#7858FF]/25 to-[#00D9A3]/15 p-3.5">
        <div className="flex items-center gap-2 text-[#F5C518]">
          <Flame className="h-4 w-4" />
          <span className="text-[12px] font-bold">21-day streak</span>
        </div>
        <div
          className="mt-1.5 text-[26px] font-black"
          style={{ letterSpacing: "-0.5px" }}
        >
          🔥 21
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-white/10 bg-[#131A2E] p-3.5">
        <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">
          Today's mission
        </div>
        <div className="mt-2 text-[13px] font-bold">5-min focus boost</div>
        <div className="mt-1 text-[10px] text-white/50">3 games · ~5 min</div>
        <div className="mt-3 rounded-full bg-[#7858FF] py-2 text-center text-[11px] font-bold">
          Start →
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {["Focus", "Memory", "Calm"].map((d) => (
          <div
            key={d}
            className="rounded-xl border border-white/10 bg-[#131A2E] p-2 text-center"
          >
            <div className="text-[14px]">🧠</div>
            <div className="text-[9px] text-white/50">{d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
function PhoneGame() {
  return (
    <div className="flex h-full flex-col items-center p-4">
      <div className="text-[10px] uppercase tracking-widest text-white/40">
        Memory Matrix
      </div>
      <div
        className="mt-1 text-[15px] font-black"
        style={{ letterSpacing: "-0.4px" }}
      >
        Round 3 of 5
      </div>
      <div className="mt-4 grid grid-cols-4 gap-1.5">
        {Array.from({ length: 16 }).map((_, i) => {
          const lit = [2, 5, 7, 10, 13].includes(i);
          return (
            <div
              key={i}
              className={`aspect-square rounded-lg ${
                lit
                  ? "bg-[#7858FF] shadow-[0_0_18px_rgba(120,88,255,0.7)]"
                  : "bg-white/[0.05]"
              }`}
            />
          );
        })}
      </div>
      <div className="mt-5 flex gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1.5 w-6 rounded-full ${
              i <= 3 ? "bg-[#7858FF]" : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <div className="mt-4 text-[10px] text-white/50">Memorize the pattern</div>
      <div className="mt-auto rounded-full border border-[#00D9A3]/40 bg-[#00D9A3]/15 px-3 py-1 text-[10px] text-[#00D9A3]">
        +12 Memory pts
      </div>
    </div>
  );
}
function PhoneScores() {
  const scores = [
    { label: "Focus", val: 78, color: "#7858FF" },
    { label: "Memory", val: 84, color: "#00D9A3" },
    { label: "Speed", val: 71, color: "#F5C518" },
    { label: "Logic", val: 66, color: "#A78BFA" },
    { label: "Calm", val: 81, color: "#FF6B6B" },
  ];
  return (
    <div className="flex h-full flex-col p-4">
      <div className="text-[10px] uppercase tracking-widest text-white/40">
        Brain profile
      </div>
      <div
        className="mt-1 text-[18px] font-black"
        style={{ letterSpacing: "-0.5px" }}
      >
        Your scores
      </div>
      <div className="mt-3 flex justify-center">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#7858FF]/30 to-[#00D9A3]/20">
          <div className="text-[22px] font-black text-white">76</div>
        </div>
      </div>
      <div className="mt-4 space-y-2.5">
        {scores.map((s) => (
          <div key={s.label}>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-white/70">{s.label}</span>
              <span className="font-bold">{s.val}</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full"
                style={{ width: `${s.val}%`, background: s.color }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-[10px] text-[#00D9A3]">↑ +12% this week</div>
    </div>
  );
}

/* ─────────────────────────── PROBLEM ─────────────────────────── */

function ProblemSection() {
  const pains = [
    {
      title: "Paywalled after 2 minutes",
      body:
        "Most apps lock everything immediately. You never get to feel the benefit.",
    },
    {
      title: "Boring repetitive tasks",
      body:
        "Your ADHD brain needs novelty. Same exercise 40 times is torture, not training.",
    },
    {
      title: "No social layer",
      body:
        "Streaks die in isolation. No friend to challenge, no squad to stay accountable.",
    },
    {
      title: "One-size-fits-all",
      body:
        "Your focus isn't broken the same way as someone with anxiety. Generic programs fail both.",
    },
  ];
  const solutions = [
    "Generous free tier — get hooked before you pay",
    "50+ games with rotating variety for novelty-seeking brains",
    "Squad challenges, friend streaks, weekly leaderboards",
    "Personalized program from your first 60 seconds",
  ];
  return (
    <section className="px-5 py-14 md:py-20">
      <div className="mx-auto grid max-w-[1100px] gap-10 md:grid-cols-2 md:gap-12">
        <div>
          <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#A78BFA]">
            Sound familiar?
          </div>
          <h2
            className="mt-3 text-[32px] font-black leading-tight md:text-[44px]"
            style={{ letterSpacing: "-1.2px" }}
          >
            Other brain apps weren't built for you.
          </h2>
          <p className="mt-3 text-[15px] text-white/60">
            They assume you can sit still for 20 minutes, never miss a day, and
            aren't frustrated by paywalls after 5 minutes. That's not ADHD.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {pains.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl bg-[#0D1226] p-4"
              >
                <div className="flex items-start gap-2">
                  <span className="text-[#FF6B6B]">❌</span>
                  <div>
                    <div className="text-[13px] font-bold text-white">
                      {p.title}
                    </div>
                    <div className="mt-1 text-[12px] text-white/55">
                      {p.body}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-[#00D9A3]/20 bg-[#131A2E] p-6 shadow-[0_20px_60px_-20px_rgba(0,217,163,0.25)]">
          <div className="text-[14px] font-black uppercase tracking-widest text-[#00D9A3]">
            Rewire is different.
          </div>
          <h3
            className="mt-2 text-[24px] font-black leading-tight"
            style={{ letterSpacing: "-0.6px" }}
          >
            Built around your brain — not against it.
          </h3>
          <div className="mt-5 space-y-3">
            {solutions.map((s) => (
              <div key={s} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00D9A3]/20">
                  <Check className="h-3.5 w-3.5 text-[#00D9A3]" strokeWidth={3} />
                </span>
                <span className="text-[14px] text-white/85">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── SOCIAL PROOF ─────────────────────────── */

function SocialProof() {
  // Start with a stable SSR-safe value, then randomize after mount to avoid hydration mismatch
  const [count, setCount] = useState(1000);
  useEffect(() => {
    setCount(800 + Math.floor(Math.random() * 401));
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      setCount((c) => c + 1 + Math.floor(Math.random() * 3));
      const next = 4000 + Math.random() * 5000;
      window.setTimeout(tick, next);
    };
    const t = window.setTimeout(tick, 4000 + Math.random() * 5000);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  const reviews = [
    {
      title: "ADHD brain food 🧠",
      body:
        "Finally an app that gets how my brain works. My focus scores are up 41% in 3 weeks and I actually look forward to my 5-minute morning session.",
      name: "Alex M., Software Engineer",
      streak: "21-day streak",
    },
    {
      title: "Mom of 2, business owner, ADHD — this is my reset button",
      body:
        "Between work and kids I'm constantly overstimulated. This gives me 5 minutes to reset. The variety means my brain never gets bored.",
      name: "Michelle D., Entrepreneur",
      streak: "47-day streak",
    },
    {
      title: "Beat my friend's streak, now we're obsessed",
      body:
        "My friend challenged me on week 1. We've been competing for 2 months. My reaction time genuinely improved — my boss noticed I'm sharper in meetings.",
      name: "James R., Product Manager",
      streak: "63-day streak",
    },
  ];
  const logos = ["TechCrunch", "Product Hunt", "ADHD Weekly", "Wired", "Lifehacker"];

  return (
    <section id="reviews" className="bg-[#0D1226] px-5 py-14 md:py-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <div
            className="text-[64px] font-black leading-none text-[#F5C518]"
            style={{ letterSpacing: "-2px" }}
          >
            4.8
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-[#F5C518] text-[#F5C518]"
              />
            ))}
          </div>
          <div className="text-[14px] text-white/55">from 50,000+ reviews</div>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#FF6B6B]/30 bg-[#FF6B6B]/10 px-4 py-1.5 text-[12px] font-bold text-[#FF6B6B]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#FF6B6B] opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-[#FF6B6B]" />
            </span>
            LIVE · {count.toLocaleString()} people training right now
          </div>
        </div>

        <div className="mt-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {reviews.map((r) => (
            <div
              key={r.title}
              className="w-[85%] shrink-0 snap-start rounded-2xl border border-white/[0.07] bg-[#131A2E] p-5 md:w-auto"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-[#F5C518] text-[#F5C518]"
                  />
                ))}
              </div>
              <div className="mt-2 text-[15px] font-black">{r.title}</div>
              <p className="mt-2 text-[13px] leading-relaxed text-white/70">
                {r.body}
              </p>
              <div className="mt-4 flex items-center justify-between text-[11px] text-white/50">
                <span>{r.name}</span>
                <span className="text-[#F5C518]">🔥 {r.streak}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/35">
            As featured in
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {logos.map((l) => (
              <span
                key={l}
                className="text-[15px] font-black tracking-tight text-white/40 md:text-[18px]"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── HOW IT WORKS ─────────────────────────── */

function HowItWorks() {
  const steps = [
    {
      icon: "🧩",
      title: "Take your brain quiz",
      body:
        "60 seconds. 4 questions. We identify your exact cognitive profile and build a personalized program on the spot.",
    },
    {
      icon: "⚡",
      title: "Play your daily 5-minute session",
      body:
        "Your program serves 3 targeted games each day. Short enough to actually do. Varied enough that your ADHD brain stays engaged.",
    },
    {
      icon: "📈",
      title: "Watch real scores improve",
      body:
        "Every session updates your brain scores. Focus, Memory, Speed, Logic, and Calm tracked week by week — with data to prove it.",
    },
  ];
  return (
    <section id="how" className="px-5 py-14 md:py-20">
      <div className="mx-auto max-w-[1100px] text-center">
        <h2
          className="text-[32px] font-black leading-tight md:text-[44px]"
          style={{ letterSpacing: "-1.2px" }}
        >
          Results in minutes. Transformation in weeks.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[15px] text-white/60">
          No 30-minute sessions. No willpower required. Just 5 minutes that
          compound.
        </p>
        <div className="relative mt-12 grid gap-6 md:grid-cols-3 md:gap-4">
          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              {i < steps.length - 1 && (
                <div
                  className="absolute left-1/2 top-12 hidden h-[2px] w-full -translate-x-1/2 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.18)_0_8px,transparent_8px_16px)] md:block"
                  aria-hidden
                />
              )}
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#131A2E] text-[28px] shadow-[0_8px_30px_rgba(120,88,255,0.18)]">
                {s.icon}
              </div>
              <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A78BFA]">
                Step {i + 1}
              </div>
              <div
                className="mt-1 text-[18px] font-black"
                style={{ letterSpacing: "-0.4px" }}
              >
                {s.title}
              </div>
              <p className="mx-auto mt-2 max-w-xs text-[13px] text-white/60">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── FEATURES ─────────────────────────── */

function Features() {
  const items = [
    {
      icon: <Brain className="h-5 w-5" />,
      title: "ADHD-First Program",
      body: "Built around dopamine, novelty, and short wins.",
      badge: { label: "Only on Rewire", color: "violet" as const },
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Squad Challenges",
      body: "Challenge friends, weekly leaderboards, squads of 4.",
      badge: { label: "Only on Rewire", color: "violet" as const },
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "AI Coaching",
      body: "Weekly reports, personalized tips from session patterns.",
      badge: { label: "Pro feature", color: "teal" as const },
    },
    {
      icon: <Trophy className="h-5 w-5" />,
      title: "50+ Games Rotating",
      body: "New games unlock as you progress. Novelty every day.",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Real Brain Scores",
      body: "5 domains tracked: Focus, Memory, Speed, Logic, Calm.",
    },
    {
      icon: <Flame className="h-5 w-5" />,
      title: "Streak Saver",
      body: "Missed a day? Keep your streak alive. Because life happens.",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "5-Minute Sessions",
      body:
        "Designed for busy people who can't sit still for 30 minutes.",
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: "84% Cheaper Than Competitors",
      body: "Full Pro from $4.16/month. Impulse charges $363/year.",
      badge: { label: "Best value", color: "gold" as const },
    },
  ];
  const badgeClass: Record<string, string> = {
    violet: "bg-[#7858FF]/20 text-[#A78BFA] border-[#7858FF]/30",
    teal: "bg-[#00D9A3]/15 text-[#00D9A3] border-[#00D9A3]/30",
    gold: "bg-[#F5C518]/15 text-[#F5C518] border-[#F5C518]/30",
  };
  return (
    <section className="px-5 py-14 md:py-20">
      <div className="mx-auto max-w-[1100px]">
        <h2
          className="text-center text-[32px] font-black leading-tight md:text-[44px]"
          style={{ letterSpacing: "-1.2px" }}
        >
          Everything your ADHD brain needs.{" "}
          <span className="text-white/40">Nothing it doesn't.</span>
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="relative flex flex-col rounded-[22px] border border-white/[0.06] bg-[#131A2E] p-5 transition-colors hover:border-[#7858FF]/30"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7858FF]/15 text-[#A78BFA]">
                {item.icon}
              </div>
              <div className="mt-4 text-[15px] font-black">{item.title}</div>
              <p className="mt-1 text-[12.5px] text-white/55">{item.body}</p>
              {item.badge && (
                <span
                  className={`mt-3 inline-flex w-fit items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeClass[item.badge.color]}`}
                >
                  {item.badge.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── INTERACTIVE DEMO ─────────────────────────── */

function DemoSection() {
  const navigate = useNavigate();
  return (
    <section className="px-5 py-14 md:py-20">
      <div className="mx-auto max-w-[1100px] text-center">
        <h2
          className="text-[32px] font-black leading-tight md:text-[44px]"
          style={{ letterSpacing: "-1.2px" }}
        >
          Try a game right now. <span className="text-[#7858FF]">No signup.</span>
        </h2>
        <p className="mt-3 text-[15px] text-white/60">
          This is what 5 minutes feels like.
        </p>
        <div className="mx-auto mt-10 max-w-[420px] rounded-[32px] border border-white/[0.08] bg-[#0D1226] p-5 shadow-[0_30px_80px_-20px_rgba(120,88,255,0.35)]">
          <MiniMemory />
        </div>
        <div className="mt-8">
          <button
            onClick={() => navigate({ to: "/welcome" })}
            className="rounded-2xl bg-[#7858FF] px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_8px_30px_rgba(120,88,255,0.5)] transition-transform hover:scale-[1.03]"
          >
            Start my full program →
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── PRICING ─────────────────────────── */

function Pricing() {
  const navigate = useNavigate();
  const goPro = () => {
    try {
      localStorage.setItem("trialIntent", "pro");
    } catch {
      /* ignore */
    }
    navigate({ to: "/welcome" });
  };
  const goFree = () => navigate({ to: "/welcome" });

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      period: "/forever",
      features: [
        "4 games",
        "8 sessions/day",
        "Basic tracking",
        "1 challenge/week",
      ],
      cta: { label: "Download free", onClick: goFree, variant: "ghost" as const },
    },
    {
      id: "pro",
      name: "Pro",
      price: "$4.16",
      period: "/month",
      strike: "$9.99/month",
      sub: "Billed $49.99/year",
      featured: true,
      saveBadge: "Save 58%",
      features: [
        "Everything in Free",
        "Unlimited sessions",
        "All 50+ games",
        "AI coaching",
        "Social features",
        "Streak savers",
        "No ads",
      ],
      cta: {
        label: "Start 7-day free trial →",
        onClick: goPro,
        variant: "violet" as const,
      },
    },
    {
      id: "family",
      name: "Family",
      price: "$19.99",
      period: "/month",
      features: [
        "6 profiles",
        "Parent dashboard",
        "Kid-safe mode",
        "Everything in Pro",
      ],
      cta: { label: "Start family trial", onClick: goPro, variant: "ghost" as const },
    },
  ];

  return (
    <section id="pricing" className="px-5 py-14 md:py-20">
      <div className="mx-auto max-w-[1100px]">
        <h2
          className="text-center text-[32px] font-black leading-tight md:text-[44px]"
          style={{ letterSpacing: "-1.2px" }}
        >
          Start free. Upgrade when you're ready.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-[15px] text-white/60">
          No credit card for trial. Cancel with one tap. No dark patterns —
          ever.
        </p>
        <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-[#F5C518]/30 bg-[#F5C518]/8 px-4 py-3 text-center text-[13px] text-white/85">
          Competitors charge <s className="text-white/50">$363/year</s> →{" "}
          <span className="font-black text-[#F5C518]">
            Rewire Pro is $49.99/year
          </span>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`relative flex flex-col rounded-[24px] p-6 ${
                p.featured
                  ? "border-2 border-[#7858FF] bg-[#131A2E] shadow-[0_20px_60px_-20px_rgba(120,88,255,0.6)]"
                  : "border border-white/[0.07] bg-[#131A2E]"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#7858FF] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-[0_4px_18px_rgba(120,88,255,0.55)]">
                  Most popular
                </span>
              )}
              <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/50">
                {p.name}
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span
                  className="text-[40px] font-black leading-none"
                  style={{ letterSpacing: "-1.2px" }}
                >
                  {p.price}
                </span>
                <span className="text-[14px] text-white/55">{p.period}</span>
              </div>
              {p.strike && (
                <div className="mt-1 flex items-center gap-2">
                  <s className="text-[12px] text-white/40">{p.strike}</s>
                  {p.saveBadge && (
                    <span className="rounded-full bg-[#00D9A3]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#00D9A3]">
                      {p.saveBadge}
                    </span>
                  )}
                </div>
              )}
              {p.sub && (
                <div className="mt-1 text-[12px] text-white/50">{p.sub}</div>
              )}
              <ul className="mt-5 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px] text-white/80">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#00D9A3]"
                      strokeWidth={3}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={p.cta.onClick}
                className={`mt-6 rounded-2xl px-5 py-3 text-[14px] font-bold transition-transform hover:scale-[1.02] ${
                  p.cta.variant === "violet"
                    ? "bg-[#7858FF] text-white shadow-[0_8px_30px_rgba(120,88,255,0.5)]"
                    : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {p.cta.label}
              </button>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-[12px] text-white/40">
          7-day free trial · 30-day money-back guarantee · 256-bit encryption
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────── FAQ ─────────────────────────── */

function Faq() {
  const items = [
    {
      q: "Is this actually designed for ADHD or just marketing?",
      a: "It's real. Every game, session length, and reward mechanic was designed specifically for dopamine-deficient attention systems. Our ADHD users see 2x the engagement of neurotypical users.",
    },
    {
      q: "How is this different from Lumosity or Elevate?",
      a: "Those apps are generic. Rewire is built specifically for ADHD, anxiety, and burnout — with social features, a genuine free tier, and sessions short enough an ADHD brain will actually complete them. Also 84% cheaper.",
    },
    {
      q: "What if I miss days? Will my streak reset?",
      a: "We give every user Streak Savers. Life happens. Pro users get unlimited. And even without a streak, your brain scores and progress never reset.",
    },
    {
      q: "Can my kids use this?",
      a: "Yes — Family plan includes kid-safe mode and a parent dashboard to track progress.",
    },
    {
      q: "What if I don't like it?",
      a: "7-day free trial, no credit card. If you upgrade and change your mind within 30 days, we refund every penny — no questions, one email.",
    },
    {
      q: "Does the science actually work?",
      a: "Cognitive training has strong peer-reviewed evidence for improving working memory and attention. Short daily practice consistently beats long infrequent sessions — which is why 5 minutes works.",
    },
  ];
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section className="px-5 py-14 md:py-20">
      <div className="mx-auto max-w-[800px]">
        <h2
          className="text-center text-[32px] font-black leading-tight md:text-[44px]"
          style={{ letterSpacing: "-1.2px" }}
        >
          Questions? Answered.
        </h2>
        <div className="mt-10 space-y-2">
          {items.map((item, i) => {
            const open = openIdx === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#131A2E]"
              >
                <button
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={open}
                >
                  <span className="text-[14px] font-bold text-white md:text-[15px]">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-white/50 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-[13.5px] leading-relaxed text-white/65">
                        {item.a}
                      </div>
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

/* ─────────────────────────── FINAL CTA ─────────────────────────── */

function FinalCta() {
  const navigate = useNavigate();
  return (
    <section className="bg-[#0D1226] px-5 py-16 md:py-24">
      <div className="mx-auto max-w-[800px] text-center">
        <h2
          className="text-[34px] font-black leading-tight md:text-[52px]"
          style={{ letterSpacing: "-1.5px" }}
        >
          Your ADHD brain is waiting to be{" "}
          <span className="text-[#7858FF]">trained.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] text-white/60 md:text-[17px]">
          Join 2 million people who stopped making excuses and started making
          progress. 5 minutes. Starting now.
        </p>
        <div className="mt-8">
          <button
            onClick={() => navigate({ to: "/welcome" })}
            className="rounded-2xl bg-[#7858FF] px-9 py-4 text-[16px] font-bold text-white shadow-[0_8px_40px_rgba(120,88,255,0.6)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Start training free →
          </button>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {["📱 iOS", "🤖 Android", "💻 Web"].map((p) => (
            <span
              key={p}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] text-white/75"
            >
              {p}
            </span>
          ))}
        </div>
        <p className="mt-5 text-[12px] text-white/40">
          Free to download · 7-day trial of Pro · No credit card
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────── FOOTER ─────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#07091A] px-5 py-12">
      <div className="mx-auto grid max-w-[1100px] gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <Logo size={32} />
            <span
              className="text-[16px] font-black"
              style={{ letterSpacing: "-0.4px" }}
            >
              Rewire
            </span>
          </div>
          <p className="mt-3 max-w-xs text-[13px] text-white/50">
            Brain training built for ADHD minds. 5 minutes a day. Real results.
          </p>
          <div className="mt-4 flex gap-2">
            {[Twitter, Music, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/40">
            Product
          </div>
          <ul className="mt-3 space-y-2 text-[13px] text-white/65">
            {["How it works", "Pricing", "Reviews", "Blog", "Careers"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-white">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/40">
            Legal
          </div>
          <ul className="mt-3 space-y-2 text-[13px] text-white/65">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact"].map(
              (l) => (
                <li key={l}>
                  <a href="#" className="hover:text-white">
                    {l}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-[1100px] border-t border-white/[0.06] pt-6 text-center text-[12px] text-white/35">
        © 2025 Rewire Inc. All rights reserved.
      </div>
    </footer>
  );
}

/* ─────────────────────────── FLOATING CTA ─────────────────────────── */

function FloatingCta() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const pricingRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    pricingRef.current = document.getElementById("pricing") as HTMLElement | null;
    const onScroll = () => {
      const scrolledFar = window.scrollY > 600;
      let pricingVisible = false;
      if (pricingRef.current) {
        const r = pricingRef.current.getBoundingClientRect();
        pricingVisible = r.top < window.innerHeight * 0.8 && r.bottom > 0;
      }
      setShow(scrolledFar && !pricingVisible);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.22 }}
          onClick={() => navigate({ to: "/welcome" })}
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#7858FF] px-5 py-3.5 text-[14px] font-bold text-white shadow-[0_12px_40px_rgba(120,88,255,0.6)] hover:scale-[1.04]"
        >
          <Smartphone className="h-4 w-4" />
          Start free
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */

function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#07091A] text-white">
      {/* GA4 placeholder — replace with real ID when ready */}
      {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXX" /> */}
      {/* Meta Pixel placeholder — paste pixel snippet when ready */}
      <Header />
      <Hero />
      <ProblemSection />
      <SocialProof />
      <HowItWorks />
      <Features />
      <DemoSection />
      <Pricing />
      <Faq />
      <FinalCta />
      <Footer />
      <FloatingCta />
    </main>
  );
}
