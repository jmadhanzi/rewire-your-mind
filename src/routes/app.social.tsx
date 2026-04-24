import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/rewire/Card";
import { GhostButton } from "@/components/rewire/GhostButton";
import { PrimaryButton } from "@/components/rewire/PrimaryButton";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/user";
import { isPro } from "@/lib/freemium";
import { ProGateSheet } from "@/components/rewire/ProGateSheet";
import { MotionScreen } from "@/components/rewire/MotionScreen";
import { SocialSkeleton } from "@/components/rewire/skeletons/SocialSkeleton";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/app/social")({
  component: Page,
});

type Friend = {
  rank: string;
  name: string;
  initials: string;
  streak: number;
  pts: number;
  isYou?: boolean;
};

const FRIENDS: Friend[] = [
  { rank: "👑", name: "Alex M.", initials: "AM", streak: 21, pts: 2840 },
  { rank: "🥈", name: "Sarah K.", initials: "SK", streak: 14, pts: 2210 },
  { rank: "3", name: "You", initials: "YOU", streak: 7, pts: 1640, isYou: true },
  { rank: "4", name: "James R.", initials: "JR", streak: 5, pts: 1480 },
  { rank: "5", name: "Priya S.", initials: "PS", streak: 3, pts: 1190 },
];

function Page() {
  const navigate = useNavigate();
  const subscriptionTier = useUserStore((s) => s.subscriptionTier);
  const pro = isPro(subscriptionTier);
  const [gateOpen, setGateOpen] = useState(false);
  const hydrated = useUserStore((s) => s.hydrated);
  const { user, loading: authLoading } = useAuth();

  if (authLoading || (user && !hydrated)) {
    return (
      <MotionScreen>
        <SocialSkeleton />
      </MotionScreen>
    );
  }

  const handleChallenge = () => {
    if (!pro) {
      setGateOpen(true);
      return;
    }
    navigate({ to: "/app/games" });
  };
  return (
    <MotionScreen className="px-6 pt-12 pb-6">
      <h1 className="text-[23px] font-black leading-tight" style={{ letterSpacing: "-0.6px" }}>
        Friends
      </h1>

      {/* Active challenge */}
      <div className="mt-5 rounded-[22px] border border-[#7858FF]/40 bg-[#7858FF]/15 p-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#A78BFA]">
          ⚔ Active challenge
        </p>
        <h2 className="mt-1.5 text-[18px] font-extrabold leading-tight">7-day Focus Sprint</h2>
        <p className="mt-0.5 text-[12px] text-white/60">vs Alex M. · 4 days left</p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-[14px] border border-white/[0.07] bg-[#0D1226]/60 p-3 text-center">
            <div className="text-[24px] font-black text-white" style={{ letterSpacing: "-0.5px" }}>
              68
            </div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-white/50">
              Your score
            </div>
          </div>
          <div className="rounded-[14px] border border-[#F5C518]/30 bg-[#0D1226]/60 p-3 text-center">
            <div
              className="text-[24px] font-black text-[#F5C518]"
              style={{ letterSpacing: "-0.5px" }}
            >
              84
            </div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-[#F5C518]/80">
              Alex's score
            </div>
          </div>
        </div>

        <PrimaryButton
          className="mt-4 py-3 text-[14px]"
          onClick={handleChallenge}
        >
          Train now to catch up →
        </PrimaryButton>
      </div>

      {/* Leaderboard */}
      <Card className="mt-4">
        <h2 className="text-[14px] font-bold">Weekly leaderboard</h2>
        <div className="mt-3 space-y-2">
          {FRIENDS.map((f, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-3 rounded-[14px] border px-3 py-2.5",
                f.isYou
                  ? "border-[#7858FF]/30 bg-[#7858FF]/15"
                  : "border-transparent bg-white/[0.02]",
              )}
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center text-[13px] font-bold text-white/60">
                {f.rank}
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[11px] font-bold text-white/80">
                {f.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className={cn(
                    "truncate text-[13px] font-bold",
                    f.isYou ? "text-[#A78BFA]" : "text-white",
                  )}
                >
                  {f.isYou ? "You" : f.name}
                </div>
                <div className="text-[11px] text-white/40">{f.streak}-day streak</div>
              </div>
              <div className="text-[13px] font-bold text-white/80">
                {f.pts.toLocaleString()} <span className="text-[10px] text-white/40">pts</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <GhostButton className="mt-4">+ Invite friends (earn 7 free days)</GhostButton>

      <ProGateSheet
        open={gateOpen}
        title="Challenges are Pro"
        message="Start head-to-head challenges with friends with Rewire Pro. You can still view the leaderboard on free."
        onClose={() => setGateOpen(false)}
      />
    </MotionScreen>
  );
}
