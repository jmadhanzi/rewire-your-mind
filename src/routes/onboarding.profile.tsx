import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProgressBar } from "@/components/rewire/ProgressBar";
import { PrimaryButton } from "@/components/rewire/PrimaryButton";
import { GhostButton } from "@/components/rewire/GhostButton";

export const Route = createFileRoute("/onboarding/profile")({
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-[#07091A] text-white">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 pb-10 pt-12">
        <ProgressBar current={8} />
        <h1 className="mt-10 text-[34px] font-black leading-tight" style={{ letterSpacing: "-1px" }}>
          Meet your Brain Profile
        </h1>
        <p className="mt-3 text-[14px] text-white/62">
          Step 8 of 8 — placeholder content. The full UI for this step lands in the next iteration.
        </p>
        <div className="mt-auto space-y-3 pt-10">
          <PrimaryButton onClick={() => navigate({ to: "/paywall" })}>Continue →</PrimaryButton>
          <GhostButton onClick={() => history.back()}>Back</GhostButton>
        </div>
      </div>
    </main>
  );
}
