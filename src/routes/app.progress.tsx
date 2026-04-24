import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/rewire/Card";
import { useMemo } from "react";
import { useUserStore } from "@/store/user";
import { todayKey } from "@/lib/streak";

export const Route = createFileRoute("/app/progress")({
  component: Page,
});

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

type Domain = {
  name: string;
  before: number;
  after: number;
  color: string;
};

const DOMAINS: Domain[] = [
  { name: "Focus", before: 42, after: 67, color: "#7858FF" },
  { name: "Memory", before: 68, after: 78, color: "#00D9A3" },
  { name: "Speed", before: 55, after: 71, color: "#F5C518" },
  { name: "Logic", before: 71, after: 81, color: "#FF6B6B" },
  { name: "Calm", before: 38, after: 54, color: "#A78BFA" },
];

function Page() {
  const sessionHistory = useUserStore((s) => s.sessionHistory);
  const streak = useUserStore((s) => s.streak);
  const totalSessions = useUserStore((s) => s.totalSessions);

  // Build last-7-day buckets from session history (local time)
  const { week, days, accuracy, sessionsCount } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const buckets: { score: number; count: number; label: string; key: string }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      buckets.push({
        score: 0,
        count: 0,
        label: DAY_LABELS[d.getDay()],
        key: todayKey(d),
      });
    }
    let accSum = 0;
    let accN = 0;
    for (const s of sessionHistory) {
      const k = todayKey(new Date(s.at));
      const b = buckets.find((x) => x.key === k);
      if (b) {
        b.score = Math.max(b.score, s.score);
        b.count += 1;
      }
      accSum += s.accuracy;
      accN += 1;
    }
    const max = Math.max(1, ...buckets.map((b) => b.score));
    return {
      week: buckets.map((b) => Math.round((b.score / max) * 100)),
      days: buckets.map((b) => b.label),
      accuracy: accN === 0 ? 0 : Math.round(accSum / accN),
      sessionsCount: totalSessions,
    };
  }, [sessionHistory, totalSessions]);

  return (
    <div className="px-6 pt-12 pb-6">
      <h1 className="text-[23px] font-black leading-tight" style={{ letterSpacing: "-0.6px" }}>
        Progress
      </h1>

      {/* Summary stats */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          { icon: "🔥", value: `${streak}`, label: "Streak" },
          { icon: "🎯", value: `${accuracy}%`, label: "Accuracy" },
          { icon: "⚡", value: `${sessionsCount}`, label: "Sessions" },
        ].map((s) => (
          <Card key={s.label} className="flex flex-col items-center py-4">
            <span className="text-[22px] leading-none">{s.icon}</span>
            <span
              className="mt-2 text-[22px] font-black leading-none"
              style={{ letterSpacing: "-0.5px" }}
            >
              {s.value}
            </span>
            <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/40">
              {s.label}
            </span>
          </Card>
        ))}
      </div>

      {/* This week */}
      <Card className="mt-4">
        <h2 className="text-[14px] font-bold">This week</h2>
        <div className="mt-4 flex h-[80px] items-end justify-between gap-2">
          {week.map((v, i) => {
            const isToday = i === week.length - 1;
            return (
              <div
                key={i}
                className="flex-1 rounded-t-md transition-all"
                style={{
                  height: `${Math.max(v * 0.65, 4)}px`,
                  backgroundColor: isToday ? "#7858FF" : "rgba(120,88,255,0.4)",
                }}
              />
            );
          })}
        </div>
        <div className="mt-2 flex justify-between gap-2">
          {days.map((d, i) => (
            <span
              key={i}
              className={`flex-1 text-center text-[10px] font-semibold ${
                i === days.length - 1 ? "text-[#7858FF]" : "text-white/40"
              }`}
            >
              {d}
            </span>
          ))}
        </div>
      </Card>

      {/* Cognitive improvement */}
      <Card className="mt-4">
        <h2 className="text-[14px] font-bold">Cognitive improvement</h2>
        <div className="mt-4 space-y-4">
          {DOMAINS.map((d) => {
            const delta = d.after - d.before;
            return (
              <div key={d.name}>
                <div className="flex items-baseline gap-1.5 text-[12px]">
                  <span className="font-semibold text-white/80">{d.name}:</span>
                  <span className="text-white/30">{d.before}%</span>
                  <span className="text-white/30">→</span>
                  <span className="font-bold" style={{ color: d.color }}>
                    {d.after}%
                  </span>
                  <span className="ml-auto text-[11px] font-bold text-[#00D9A3]">
                    +{delta}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${d.after}%`, backgroundColor: d.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
