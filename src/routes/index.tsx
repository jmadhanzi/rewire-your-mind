import { createFileRoute } from "@tanstack/react-router";
import { Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "../components/rewire/Logo";
import { PrimaryButton } from "../components/rewire/PrimaryButton";
import { GhostButton } from "../components/rewire/GhostButton";
import { Card } from "../components/rewire/Card";
import { Tag } from "../components/rewire/Tag";
import { Star, Quote } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07091A] text-white">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#7858FF]/30 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-[-80px] h-[320px] w-[320px] rounded-full bg-[#00D9A3]/20 blur-[120px]" />

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col px-6 pb-10 pt-14">
        <div className="flex flex-col items-center text-center">
          <Logo size={88} />
          <h1
            className="mt-8 text-[64px] font-black leading-none text-white"
            style={{ letterSpacing: "-1.5px" }}
          >
            Rewire
          </h1>
          <p className="mt-4 max-w-xs text-[15px] leading-snug text-white/62">
            Brain training built for{" "}
            <span className="text-white">ADHD minds</span>
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            <Tag variant="violet">2M+ Users</Tag>
            <Tag variant="gold">
              <Star className="h-3 w-3 fill-current" /> 4.8 Rating
            </Tag>
            <Tag variant="teal">ADHD Built For</Tag>
          </div>
        </div>

        <Card className="mt-8 bg-gradient-to-b from-[#131A2E] to-[#0D1226]">
          <Quote className="h-5 w-5 text-[#7858FF]" />
          <p className="mt-3 text-[14px] leading-relaxed text-white/80">
            “First app that actually gets how my brain works. I finished a
            full chapter without checking my phone — for the first time in
            years.”
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#7858FF] to-[#00D9A3] text-sm font-bold">
              J
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold text-white">
                Jordan M.
              </div>
              <div className="text-[11px] uppercase tracking-widest text-white/35">
                Diagnosed at 28
              </div>
            </div>
            <div className="flex gap-0.5 text-[#F5C518]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
            </div>
          </div>
        </Card>

        <div className="mt-auto pt-10">
          <PrimaryButton onClick={() => navigate({ to: "/onboarding/goals" })}>
            Start your free journey →
          </PrimaryButton>
          <div className="h-3" />
          <GhostButton>I already have an account</GhostButton>
          <p className="mt-5 text-center text-[12px] text-white/35">
            7-day free trial · No credit card needed
          </p>
          <p className="mt-3 text-center text-[11px] uppercase tracking-widest text-white/20">
            <Link to="/app/home" className="hover:text-white/40">
              Skip to app preview
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
