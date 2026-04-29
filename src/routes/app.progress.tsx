import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/rewire/Card";
import { useMemo } from "react";
import { useUserStore } from "@/store/user";
import { todayKey } from "@/lib/streak";
import { motion } from "framer-motion";
import { MotionScreen } from "@/components/rewire/MotionScreen";
import { useCountUp } from "@/hooks/use-count-up";
import { ProgressSkeleton } from "@/components/rewire/skeletons/ProgressSkeleton";
import { useAuth } from "@/hooks/use-auth";
import { TrendingUp, Target, Flame, Zap, Clock } from "lucide-react";

export const Route = createFileRoute("/app/progress")({
  component: Page,
});

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

function Page() {
  const sessionHistory = useUserStore((s) => s.sessionHistory);
  const streak = useUserStore((s) => s.streak);
  const totalSessions = useUserStore((s) => s.totalSessions);
  const brainScores = useUserStore((s) => s.brainScores);
  const hydrated = useUserStore((s) => s.hydrated);
  const { user, loading: authLoading } = useAuth();

  const domains = [
    { name: "Focus", score: brainScores.focus, color: "#7858FF", bg: "rgba(120,88,255,0.15)" },
    { name: "Memory", score: brainScores.memory, color: "#00D9A3", bg: "rgba(0,217,163,0.12)" },
    { name: "Speed", score: brainScores.speed, color: "#F5C518", bg: "rgba(245,197,24,0.12)" },
    { name: "Logic", score: brainScores.logic, color: "#FF6B6B", bg: "rgba(255,107,107,0.12)" },
    { name: "Calm", score: brainScores.calm, color: "#A78BFA", bg: "rgba(167,139,250,0.12)" },
  ];

  const { week, days, accuracy, avgScore, totalTime } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const buckets: { score: number; count: number; label: string; key: string }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      buckets.push({ score: 0, count: 0, label: DAY_LABELS[d.getDay()], key: todayKey(d) });
    }
    let accSum = 0, accN = 0, timeSum = 0;
    for (const s of sessionHistory) {
      const k = todayKey(new Date(s.at));
      const b = buckets.find((x) => x.key === k);
      if (b) { b.score = Math.max(b.score, s.score); b.count += 1; }
      accSum += s.accuracy;
      accN += 1;
      timeSum += s.durationSec || 0;
    }
    const max = Math.max(1, ...buckets.map((b) => b.score));
    const hasScores = Object.values(brainScores).some((v) => v > 0);
    return {
      week: buckets.map((b) => Math.round((b.score / max) * 100)),
      days: buckets.map((b) => b.label),
      accuracy: accN === 0 ? 0 : Math.round(accSum / accN),
      avgScore: hasScores ? Math.round(Object.values(brainScores).reduce((a, b) => a + b, 0) / 5) : 0,
      totalTime: Math.round(timeSum / 60),
    };
  }, [sessionHistory, brainScores]);

  const streakDisplay = useCountUp(streak);
  const accuracyDisplay = useCountUp(accuracy);
  const sessionsDisplay = useCountUp(totalSessions);
  const scoreDisplay = useCountUp(avgScore);

  if (authLoading || (user && !hydrated)) {
    return <MotionScreen><ProgressSkeleton /></MotionScreen>;
  }

  return (
    <MotionScreen className="px-5 pt-12 pb-8">
      <h1 className="text-[26px] font-black leading-tight" style={{ letterSpacing: "-0.7px" }}>Progress</h1>
      <p className="mt-0.5 text-[12px] text-white/40">Your cognitive training overview</p>

      {/* Stats grid */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {[
          { icon: <Flame className="h-4 w-4" />, value: streakDisplay, suffix: " days", label: "Streak", color: "#F5C518", bg: "rgba(245,197,24,0.12)" },
          { icon: <Target className="h-4 w-4" />, value: accuracyDisplay, suffix: "%", label: "Accuracy", color: "#00D9A3", bg: "rgba(0,217,163,0.12)" },
          { icon: <Zap className="h-4 w-4" />, value: sessionsDisplay, suffix: "", label: "Total sessions", color: "#7858FF", bg: "rgba(120,88,255,0.12)" },
          { icon: <TrendingUp className="h-4 w-4" />, value: scoreDisplay, suffix: "", label: "Brain avg score", color: "#A78BFA", bg: "rgba(167,139,250,0.12)" },
        ].map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[20px] border border-white/[0.06] p-4"
            style={{ background: s.bg }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ backgroundColor: `${s.color}20`, color: s.color }}>
              {s.icon}
            </span>
            <div className="mt-3 text-[26px] font-black tabular-nums leading-none" style={{ color: s.color, letterSpacing: "-0.8px" }}>
              {s.value}{s.suffix}
            </div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Weekly chart */}
      <Card className="mt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[14px] font-bold">This week</h2>
          <span className="text-[11px] text-white/30">Best score each day</span>
        </div>
        <div className="mt-4 flex h-[88px] items-end justify-between gap-1.5">
          {week.map((v, i) => {
            const isToday = i === week.length - 1;
            const hasData = v > 4;
            return (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <motion.div
                  className="w-full rounded-t-lg"
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(v * 0.8, 4)}px` }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
                  style={{
                    backgroundColor: isToday ? "#7858FF" : hasData ? "rgba(120,88,255,0.4)" : "rgba(255,255,255,0.06)",
                    boxShadow: isToday ? "0 0 12px rgba(120,88,255,0.5)" : undefined,
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex justify-between gap-1.5">
          {days.map((d, i) => (
            <span key={i} className={`flex-1 text-center text-[10px] font-semibold ${i === days.length - 1 ? "text-[#7858FF]" : "text-white/30"}`}>
              {d}
            </span>
          ))}
        </div>
      </Card>

      {/* Brain scores */}
      <Card className="mt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[14px] font-bold">Brain scores</h2>
          {avgScore > 0 && (
            <div className="flex items-center gap-1 rounded-full border border-[#7858FF]/25 bg-[#7858FF]/10 px-2.5 py-1">
              <span className="text-[11px] font-black text-[#A78BFA]">{avgScore}</span>
              <span className="text-[9px] text-white/35">avg</span>
            </div>
          )}
        </div>
        <div className="mt-4 space-y-4">
          {domains.map((d, i) => (
            <div key={d.name}>
              <div className="flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="font-semibold text-white/70">{d.name}</span>
                </div>
                <span className="font-black tabular-nums" style={{ color: d.score > 0 ? d.color : "rgba(255,255,255,0.2)" }}>
                  {d.score > 0 ? d.score : "—"}
                </span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: d.score > 0 ? `${Math.min(d.score, 100)}%` : "0%" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
                  style={{ backgroundColor: d.color, boxShadow: d.score > 0 ? `0 0 8px ${d.color}60` : undefined }}
                />
              </div>
            </div>
          ))}
          {domains.every((d) => d.score === 0) && (
            <p className="py-4 text-center text-[13px] text-white/30">
              Complete your first session to build your brain profile ✨
            </p>
          )}
        </div>
      </Card>

      {/* Recent sessions */}
      {sessionHistory.length > 0 && (
        <Card className="mt-4">
          <h2 className="text-[14px] font-bold">Recent sessions</h2>
          <div className="mt-3 space-y-2">
            {sessionHistory.slice(0, 5).map((s, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#7858FF]/15 text-[14px]">
                  🎮
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-bold capitalize">{s.gameId.replace(/-/g, " ")}</div>
                  <div className="text-[10px] text-white/40">{s.skill} · {new Date(s.at).toLocaleDateString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-black text-[#7858FF]">{s.score}</div>
                  <div className="text-[10px] text-white/35">{s.accuracy}%</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </MotionScreen>
  );
}
