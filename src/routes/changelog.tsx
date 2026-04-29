import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/rewire/PageShell";

export const Route = createFileRoute("/changelog")({ component: Changelog });

const RELEASES = [
  {
    version: "v2.4.0", date: "April 22, 2025", badge: "Latest", badgeColor: "#00D9A3",
    changes: [
      { type: "new", text: "AI Coach — personalized coaching powered by GPT-4o, available for all Pro users" },
      { type: "new", text: "Squad Challenges — create groups of up to 4 and compete on weekly leaderboards" },
      { type: "new", text: "Word Storm game — find hidden conceptual connections, trains lateral thinking" },
      { type: "improved", text: "Memory Matrix now tracks accuracy across sessions and updates brain score in real time" },
      { type: "improved", text: "Onboarding is 40% faster with a new streamlined brain quiz" },
      { type: "fixed", text: "Streak Saver modal no longer appears if you already trained today" },
    ],
  },
  {
    version: "v2.3.0", date: "March 28, 2025", badge: undefined, badgeColor: "#7858FF",
    changes: [
      { type: "new", text: "Calm Count game — mindful counting with breathing cues, targets anxiety and calm domain" },
      { type: "new", text: "Weekly brain report — PDF export of your 5-domain progress available every Monday" },
      { type: "improved", text: "Bottom navigation redesigned with icon-based tabs and haptic feedback" },
      { type: "improved", text: "Progress page now shows session-by-session history with accuracy per game" },
      { type: "fixed", text: "Fixed a race condition where sessions were counted twice for streak calculation" },
      { type: "fixed", text: "Login page no longer shows error flash on first load" },
    ],
  },
  {
    version: "v2.2.0", date: "March 5, 2025", badge: undefined, badgeColor: "#7858FF",
    changes: [
      { type: "new", text: "Friend Challenges — 1v1 weekly challenges via invite link" },
      { type: "new", text: "Streak Savers — free users get 2/month, Pro gets unlimited" },
      { type: "new", text: "Speed Tap game — reflexes and processing speed training" },
      { type: "improved", text: "Session completion screen now shows cognitive domain breakdown" },
      { type: "improved", text: "App load time reduced by 60% with better bundle splitting" },
    ],
  },
  {
    version: "v2.1.0", date: "February 14, 2025", badge: undefined, badgeColor: "#7858FF",
    changes: [
      { type: "new", text: "Logic Maze game — deductive reasoning and problem-solving" },
      { type: "new", text: "Focus Flow game — sustained attention tracking" },
      { type: "new", text: "Milestone celebrations — animated streak celebrations at 3, 7, 14, 21, 30, 60, 100 days" },
      { type: "improved", text: "Brain radar chart on home screen" },
      { type: "fixed", text: "Ad banner now correctly dismissed across sessions" },
    ],
  },
  {
    version: "v2.0.0", date: "January 20, 2025", badge: "Major release", badgeColor: "#F5C518",
    changes: [
      { type: "new", text: "Complete redesign — premium dark UI with glassmorphism and fluid animations" },
      { type: "new", text: "Memory Matrix — first flagship game with flip-card mechanic" },
      { type: "new", text: "Personalized 21-day brain training program" },
      { type: "new", text: "Supabase backend — real-time sync across devices" },
      { type: "new", text: "Free tier: 8 sessions/day, 4 games. Pro: unlimited everything" },
    ],
  },
];

const TYPE_STYLES: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: "New", color: "#00D9A3", bg: "rgba(0,217,163,0.12)" },
  improved: { label: "Improved", color: "#7858FF", bg: "rgba(120,88,255,0.12)" },
  fixed: { label: "Fixed", color: "#F5C518", bg: "rgba(245,197,24,0.12)" },
};

function Changelog() {
  return (
    <PageShell title="What's new in Rewire" subtitle="Every feature, fix, and improvement — documented." badge="Changelog">
      <div className="space-y-8">
        {RELEASES.map((r) => (
          <div key={r.version} className="relative border-l-2 border-white/[0.08] pl-6">
            {/* Timeline dot */}
            <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: r.badgeColor }} />

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[18px] font-black" style={{ letterSpacing: "-0.5px" }}>{r.version}</span>
              {r.badge && (
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider" style={{ backgroundColor: `${r.badgeColor}25`, color: r.badgeColor }}>
                  {r.badge}
                </span>
              )}
              <span className="text-[12px] text-white/30">{r.date}</span>
            </div>

            <div className="space-y-2">
              {r.changes.map((c, i) => {
                const s = TYPE_STYLES[c.type];
                return (
                  <div key={i} className="flex items-start gap-3 rounded-[14px] border border-white/[0.05] bg-[#0D1226] px-4 py-3">
                    <span className="mt-0.5 shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider" style={{ backgroundColor: s.bg, color: s.color }}>
                      {s.label}
                    </span>
                    <p className="text-[13px] leading-snug text-white/65">{c.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
