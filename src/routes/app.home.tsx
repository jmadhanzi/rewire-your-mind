import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Flame, Brain, Zap, Target, TrendingUp, Play, Calendar } from "lucide-react";
import { AppHeader } from "@/components/rewire/AppHeader";
import { useUserStore } from "@/store/user";
import { useOnboardingStore } from "@/store/onboarding";
import { FREE_DAILY_SESSION_LIMIT, isPro } from "@/lib/freemium";
import { MotionScreen } from "@/components/rewire/MotionScreen";
import { HomeSkeleton } from "@/components/rewire/skeletons/HomeSkeleton";
import { useAuth } from "@/hooks/use-auth";
import { todayKey } from "@/lib/streak";
import { motion } from "framer-motion";

export const Route = createFileRoute("/app/home")({
  component: Page,
});

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning ☀️";
  if (h < 17) return "Good afternoon 👋";
  return "Good evening 🌙";
}

function RadarChart({ scores }: { scores: Record<string, number> }) {
  const keys = ["focus", "memory", "speed", "logic", "calm"];
  const labels = ["Focus", "Memory", "Speed", "Logic", "Calm"];
  const cx = 80, cy = 80, r = 56;
  const angles = keys.map((_, i) => (i * 2 * Math.PI) / keys.length - Math.PI / 2);
  const colors = ["#7858FF", "#00D9A3", "#F5C518", "#FF6B6B", "#A78BFA"];

  const points = angles.map((angle, i) => {
    const val = Math.max(0, Math.min(100, scores[keys[i]] || 0)) / 100;
    return {
      x: cx + r * val * Math.cos(angle),
      y: cy + r * val * Math.sin(angle),
      lx: cx + (r + 18) * Math.cos(angle),
      ly: cy + (r + 18) * Math.sin(angle),
      color: colors[i],
      label: labels[i],
      val: scores[keys[i]] || 0,
    };
  });

  const polygon = points.map((p) => `${p.x},${p.y}`).join(" ");

  // Background rings
  const rings = [0.25, 0.5, 0.75, 1].map((scale) => {
    const ringPts = angles
      .map((angle) => `${cx + r * scale * Math.cos(angle)},${cy + r * scale * Math.sin(angle)}`)
      .join(" ");
    return ringPts;
  });

  return (
    <svg viewBox="0 0 160 160" className="h-full w-full">
      {/* Grid rings */}
      {rings.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}
      {/* Grid spokes */}
      {angles.map((angle, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={cx + r * Math.cos(angle)}
          y2={cy + r * Math.sin(angle)}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}
      {/* Score polygon */}
      <polygon
        points={polygon}
        fill="rgba(120,88,255,0.15)"
        stroke="#7858FF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Score dots */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill={p.color} />
      ))}
      {/* Labels */}
      {points.map((p, i) => (
        <text
          key={i}
          x={p.lx}
          y={p.ly}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="7.5"
          fontWeight="700"
          fill="rgba(255,255,255,0.5)"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          {p.label}
        </text>
      ))}
    </svg>
  );
}

function Page() {
  const navigate = useNavigate();
  const { currentDay, programProgress, totalSessions, focusImprovement, brainScores, streak } =
    useUserStore();
  const goals = useOnboardingStore((s) => s.goals);
  const subscriptionTier = useUserStore((s) => s.subscriptionTier);
  const sessionsToday = useUserStore((s) => {
    const today = todayKey();
    return s.sessionsTodayDate === today ? s.sessionsToday : 0;
  });
  const hydrated = useUserStore((s) => s.hydrated);
  const { user, loading: authLoading } = useAuth();
  const pro = isPro(subscriptionTier);

  if (authLoading || (user && !hydrated)) {
    return <MotionScreen><HomeSkeleton /></MotionScreen>;
  }

  const totalDays = 21;
  const progressPct = Math.round((currentDay / totalDays) * 100);

  const focusArea =
    goals[0] === "focus" ? "Focus & Attention"
      : goals[0] === "memory" ? "Memory"
      : goals[0] === "calm" ? "Calm & Anxiety"
      : "Focus & Attention";

  const hasScores = Object.values(brainScores).some((v) => v > 0);
  const avgScore = hasScores
    ? Math.round(Object.values(brainScores).reduce((a, b) => a + b, 0) / 5)
    : 0;

  return (
    <MotionScreen>
      <AppHeader greeting={getGreeting()} title="Ready to rewire?" />

      <div className="space-y-4 px-5 pt-5 pb-8">
        {/* Free plan indicator */}
        {!pro && (
          <motion.button
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate({ to: "/paywall" })}
            className="flex w-full items-center justify-between rounded-2xl border border-[#7858FF]/20 bg-[#7858FF]/[0.08] px-4 py-2.5"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
              Free plan
            </span>
            <span className="text-[12px] font-bold text-white/70">
              {sessionsToday}/{FREE_DAILY_SESSION_LIMIT} sessions ·{" "}
              <span className="text-[#A78BFA]">Upgrade →</span>
            </span>
          </motion.button>
        )}

        {/* Hero CTA — Start session */}
        <motion.button
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          onClick={() => navigate({ to: "/app/games" })}
          whileTap={{ scale: 0.98 }}
          className="group relative w-full overflow-hidden rounded-[24px] p-5 text-left"
          style={{
            background: "linear-gradient(135deg, #6C47FF 0%, #7858FF 40%, #00B5A3 100%)",
            boxShadow: "0 12px 40px rgba(108,71,255,0.5), 0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          {/* Decorative orbs */}
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-6 left-10 h-24 w-24 rounded-full bg-[#00D9A3]/20 blur-xl" />

          {/* Shine */}
          <div className="pointer-events-none absolute inset-0 rounded-[24px]"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)" }} />

          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white/90">
                  Day {currentDay} of {totalDays}
                </span>
                {streak > 0 && (
                  <span className="flex items-center gap-1 rounded-full bg-[#F5C518]/20 px-2 py-0.5 text-[10px] font-bold text-[#F5C518]">
                    <Flame className="h-3 w-3" /> {streak}
                  </span>
                )}
              </div>
              <h2 className="mt-2.5 text-[22px] font-black leading-tight text-white" style={{ letterSpacing: "-0.6px" }}>
                Start today's<br />brain workout
              </h2>
              <p className="mt-1 text-[12px] text-white/70">3 games · ~7 min · {focusArea}</p>
            </div>
            <div className="ml-3 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] transition-transform group-hover:scale-105 group-active:scale-95">
              <Play className="ml-0.5 h-6 w-6 text-white" fill="white" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-white/60">Program progress</span>
              <span className="text-[10px] font-bold text-white/80">{progressPct}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
              <motion.div
                className="h-full rounded-full bg-white/80"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>
        </motion.button>

        {/* Stats + Radar row */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="col-span-1 flex flex-col gap-3"
          >
            <StatCard icon={<TrendingUp className="h-4 w-4" />} value={`+${focusImprovement}%`} label="Focus gain" color="#00D9A3" />
            <StatCard icon={<Target className="h-4 w-4" />} value={String(totalSessions)} label="Sessions" color="#7858FF" />
            <StatCard icon={<Brain className="h-4 w-4" />} value={avgScore > 0 ? String(avgScore) : "—"} label="Brain avg" color="#A78BFA" />
          </motion.div>

          {/* Radar chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="col-span-2 flex items-center justify-center rounded-[22px] border border-white/[0.07] bg-[#0D1226]/80 p-2"
          >
            {hasScores ? (
              <RadarChart scores={brainScores} />
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <Brain className="h-8 w-8 text-white/20" />
                <p className="mt-2 text-[11px] text-white/30">Play games to<br />build your profile</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Quick brain scores */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-[22px] border border-white/[0.07] bg-[#0D1226]/80 p-4"
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-white/40">Brain scores</h3>
            <button
              onClick={() => navigate({ to: "/app/progress" })}
              className="text-[11px] font-bold text-[#7858FF]"
            >
              View all →
            </button>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[
              { key: "focus", label: "Focus", color: "#7858FF", icon: <Target className="h-3 w-3" /> },
              { key: "memory", label: "Mem", color: "#00D9A3", icon: <Brain className="h-3 w-3" /> },
              { key: "speed", label: "Speed", color: "#F5C518", icon: <Zap className="h-3 w-3" /> },
              { key: "logic", label: "Logic", color: "#FF6B6B", icon: <TrendingUp className="h-3 w-3" /> },
              { key: "calm", label: "Calm", color: "#A78BFA", icon: <span className="text-[10px]">🧘</span> },
            ].map((item) => {
              const val = brainScores[item.key as keyof typeof brainScores] || 0;
              return (
                <div key={item.key} className="flex flex-col items-center gap-1.5">
                  <div className="relative h-14 w-full overflow-hidden rounded-xl bg-white/[0.04]">
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 rounded-xl"
                      initial={{ height: 0 }}
                      animate={{ height: val > 0 ? `${Math.min(val, 100)}%` : "0%" }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                      style={{ backgroundColor: `${item.color}40` }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                      <span style={{ color: item.color }}>{item.icon}</span>
                      <span className="text-[12px] font-black tabular-nums" style={{ color: item.color }}>
                        {val > 0 ? val : "—"}
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-white/35">{item.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Streak & calendar mini */}
        {streak > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex items-center gap-3 rounded-[22px] border border-[#F5C518]/20 bg-[#F5C518]/[0.06] p-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5C518]/15 text-[28px]">
              🔥
            </div>
            <div className="flex-1">
              <div className="text-[18px] font-black text-[#F5C518]" style={{ letterSpacing: "-0.5px" }}>
                {streak}-day streak
              </div>
              <div className="text-[12px] text-white/50">Keep going — don't break the chain</div>
            </div>
            <Calendar className="h-5 w-5 text-white/20" />
          </motion.div>
        )}
      </div>
    </MotionScreen>
  );
}

function StatCard({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) {
  return (
    <div className="flex flex-col items-start rounded-[18px] border border-white/[0.06] bg-[#0D1226]/80 p-3">
      <span className="flex h-7 w-7 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}20`, color }}>
        {icon}
      </span>
      <div className="mt-2 text-[17px] font-black leading-none tabular-nums" style={{ color, letterSpacing: "-0.4px" }}>
        {value}
      </div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-white/35">{label}</div>
    </div>
  );
}
