import { useNavigate } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";
import { useOnboardingStore } from "@/store/onboarding";

export function RestartOnboardingButton() {
  const navigate = useNavigate();
  const reset = useOnboardingStore((s) => s.reset);

  const onClick = () => {
    if (
      typeof window !== "undefined" &&
      !window.confirm("Restart onboarding? Your answers so far will be cleared.")
    ) {
      return;
    }
    reset();
    navigate({ to: "/onboarding/goals" });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/60 transition hover:bg-white/[0.1] hover:text-white"
      aria-label="Restart onboarding"
    >
      <RotateCcw className="h-3 w-3" />
      Restart
    </button>
  );
}