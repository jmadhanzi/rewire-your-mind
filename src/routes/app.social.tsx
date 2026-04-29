import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Trophy, Swords, Users, TrendingUp, Crown, Medal } from "lucide-react";
import { Card } from "@/components/rewire/Card";
import { PrimaryButton } from "@/components/rewire/PrimaryButton";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/user";
import { isPro } from "@/lib/freemium";
import { ProGateSheet } from "@/components/rewire/ProGateSheet";
import { MotionScreen } from "@/components/rewire/MotionScreen";
import { SocialSkeleton } from "@/components/rewire/skeletons/SocialSkeleton";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";

export const Route = createFileRoute("/app/social")({
  component: Page,
});

type Friend = { rank: number | string; name: string; initials: string; streak: number; pts: number; isYou?: boolean; avatar?: string };

const FRIENDS: Friend[] = [
  { rank: 1, name: "Alex M.", initials: "AM", streak: 21, pts: 2840 },
  { rank: 2, name: "Sarah K.", initials: "SK", streak: 14, pts: 2210 },
  { rank: 3, name: "You", initials: "YOU", streak: 7, pts: 1640, isYou: true },
  { rank: 4, name: "James R.", initials: "JR", streak: 5, pts: 1480 },
  { rank: 5, name: "Priya S.", initials: "PS", streak: 3, pts: 1190 },
];

const RANK_ICONS: Record<number, React.ReactNode> = {
  1: <Crown className="h-4 w-4 text-[#F5C518]" />,
  2: <Medal className="h-4 w-4 text-[#C0C0C0]" />,
  3: <Medal className="h-4 w-4 text-[#CD7F32]" />,
};

function Page() {
  const navigate = useNavigate();
  const subscriptionTier = useUserStore((s) => s.subscriptionTier);
  const pro = isPro(subscriptionTier);
  const [gateOpen, setGateOpen] = useState(false);
  const hydrated = useUserStore((s) => s.hydrated);
  const { user, loading: authLoading } = useAuth();

  if (authLoading || (user && !hydrated)) {
    return <MotionScreen><SocialSkeleton /></MotionScreen>;
  }

  const handleChallenge = () => {
    if (!pro) { setGateOpen(true); return; }
    navigate({ to: "/app/games" });
  };

  return (
    <MotionScreen className="px-5 pt-12 pb-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-[26px] font-black leading-tight" style={{ letterSpacing: "-0.7px" }}>Friends</h1>
          <p className="mt-0.5 text-[12px] text-white/40">Compete. Collaborate. Win.</p>
        </div>
        <button
          onClick={() => navigate({ to: "/app/games" })}
          className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-[11px] font-bold text-white/60 hover:bg-white/[0.08] transition-colors"
        >
          + Add friends
        </button>
      </div>

      {/* Active challenge card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
        className="mt-5 overflow-hidden rounded-[22px] border border-[#7858FF]/30 bg-gradient-to-br from-[#7858FF]/12 to-transparent"
      >
        <div className="p-4">
          <div className="flex items-center gap-2">
            <Swords className="h-4 w-4 text-[#A78BFA]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#A78BFA]">Active challenge</span>
            <span className="ml-auto rounded-full bg-[#F5C518]/15 px-2 py-0.5 text-[10px] font-bold text-[#F5C518]">4 days left</span>
          </div>
          <h2 className="mt-2 text-[20px] font-extrabold leading-tight" style={{ letterSpacing: "-0.5px" }}>7-day Focus Sprint</h2>
          <p className="mt-0.5 text-[12px] text-white/50">vs Alex M.</p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-[16px] border border-white/[0.07] bg-[#07091A]/60 p-3 text-center">
              <div className="text-[28px] font-black text-white" style={{ letterSpacing: "-1px" }}>68</div>
              <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/40">Your score</div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div className="h-full w-[68%] rounded-full bg-[#7858FF]" />
              </div>
            </div>
            <div className="rounded-[16px] border border-[#F5C518]/25 bg-[#07091A]/60 p-3 text-center">
              <div className="text-[28px] font-black text-[#F5C518]" style={{ letterSpacing: "-1px" }}>84</div>
              <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#F5C518]/60">Alex's score</div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div className="h-full w-[84%] rounded-full bg-[#F5C518]" />
              </div>
            </div>
          </div>

          <PrimaryButton className="mt-4 py-3 text-[14px]" onClick={handleChallenge}>
            Train now to catch up →
          </PrimaryButton>
        </div>
      </motion.div>

      {/* Leaderboard */}
      <Card className="mt-4">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="h-4 w-4 text-[#F5C518]" />
          <h2 className="text-[14px] font-bold">Weekly leaderboard</h2>
        </div>
        <div className="space-y-2">
          {FRIENDS.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={cn(
                "flex items-center gap-3 rounded-[16px] border px-3 py-3",
                f.isYou
                  ? "border-[#7858FF]/25 bg-[#7858FF]/10"
                  : "border-transparent bg-white/[0.025] hover:bg-white/[0.04]",
              )}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                {RANK_ICONS[f.rank as number] ?? (
                  <span className="text-[13px] font-black text-white/30">{f.rank}</span>
                )}
              </div>
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-black"
                style={{
                  background: f.isYou
                    ? "linear-gradient(135deg, #7858FF40, #00D9A330)"
                    : "rgba(255,255,255,0.07)",
                  color: f.isYou ? "#A78BFA" : "rgba(255,255,255,0.7)",
                }}
              >
                {f.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className={cn("truncate text-[13px] font-bold", f.isYou && "text-[#A78BFA]")}>
                  {f.isYou ? "You" : f.name}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-white/35">
                  <span>🔥</span>
                  <span>{f.streak}-day streak</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[14px] font-black tabular-nums text-white/90">{f.pts.toLocaleString()}</div>
                <div className="text-[10px] text-white/30">pts</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { icon: <Users className="h-4 w-4" />, value: "5", label: "Friends", color: "#7858FF" },
          { icon: <Swords className="h-4 w-4" />, value: "3", label: "Challenges", color: "#F5C518" },
          { icon: <TrendingUp className="h-4 w-4" />, value: "#3", label: "Rank", color: "#00D9A3" },
        ].map((s) => (
          <Card key={s.label} className="flex flex-col items-center py-3.5">
            <span style={{ color: s.color }}>{s.icon}</span>
            <span className="mt-2 text-[20px] font-black leading-none" style={{ color: s.color }}>{s.value}</span>
            <span className="mt-1 text-[10px] uppercase tracking-widest text-white/35">{s.label}</span>
          </Card>
        ))}
      </div>

      <button
        onClick={() => !pro ? setGateOpen(true) : undefined}
        className="mt-4 w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] py-3.5 text-[13px] font-bold text-white/50 hover:bg-white/[0.06] transition-colors"
      >
        + Invite friends and earn 7 free Pro days
      </button>

      <ProGateSheet
        open={gateOpen}
        title="Challenges are Pro 🏆"
        message="Start head-to-head challenges with friends, create squads of 4, and climb weekly leaderboards with Rewire Pro."
        onClose={() => setGateOpen(false)}
      />
    </MotionScreen>
  );
}
