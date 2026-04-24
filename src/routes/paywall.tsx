import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PrimaryButton } from "@/components/rewire/PrimaryButton";
import { GhostButton } from "@/components/rewire/GhostButton";
import { Card } from "@/components/rewire/Card";
import { Tag } from "@/components/rewire/Tag";
import { Check } from "lucide-react";

export const Route = createFileRoute("/paywall")({
  component: Paywall,
});

function Paywall() {
  const navigate = useNavigate();
  const features = [
    "Unlimited adaptive games",
    "Personalized brain profile",
    "Daily focus streaks & rewards",
    "Progress insights & coaching",
  ];
  return (
    <main className="min-h-screen bg-[#07091A] text-white">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 pb-10 pt-14">
        <Tag variant="teal">7-day free trial</Tag>
        <h1 className="mt-5 text-[40px] font-black leading-[1.05]" style={{ letterSpacing: "-1.2px" }}>
          Unlock your full brain potential
        </h1>
        <p className="mt-3 text-[14px] text-white/62">
          Then $9.99 / month. Cancel anytime, no questions asked.
        </p>

        <Card className="mt-6 space-y-3">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00D9A3]/15 text-[#00D9A3]">
                <Check className="h-4 w-4" />
              </div>
              <span className="text-[14px] text-white/85">{f}</span>
            </div>
          ))}
        </Card>

        <div className="mt-auto space-y-3 pt-10">
          <PrimaryButton onClick={() => navigate({ to: "/app/home" })}>
            Start 7-day free trial
          </PrimaryButton>
          <GhostButton onClick={() => navigate({ to: "/app/home" })}>Maybe later</GhostButton>
        </div>
      </div>
    </main>
  );
}
