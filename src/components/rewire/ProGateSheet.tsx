import { useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";
import { GhostButton } from "./GhostButton";

type Props = {
  open: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
};

export function ProGateSheet({
  open,
  title = "This is a Pro feature",
  message = "Unlock unlimited sessions, all 6 games, AI coaching, and ad-free training.",
  onClose,
}: Props) {
  const navigate = useNavigate();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 backdrop-blur-sm sm:items-center">
      <div
        className="w-full max-w-md rounded-t-[28px] border border-white/[0.07] bg-[#0D1226] p-6 sm:rounded-[28px]"
        style={{ animation: "fadeUp 350ms ease-out" }}
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#7858FF]/20 shadow-[0_0_32px_rgba(120,88,255,0.55)]">
          <Lock className="h-7 w-7 text-[#A78BFA]" />
        </div>
        <h2
          className="mt-5 text-center text-[22px] font-black leading-tight"
          style={{ letterSpacing: "-0.5px" }}
        >
          {title}
        </h2>
        <p className="mt-2 text-center text-[13px] leading-relaxed text-white/60">{message}</p>

        <div className="mt-6 space-y-3">
          <PrimaryButton
            onClick={() => {
              onClose();
              navigate({ to: "/paywall" });
            }}
          >
            Upgrade to Pro →
          </PrimaryButton>
          <GhostButton onClick={onClose}>Maybe later</GhostButton>
        </div>
      </div>
    </div>
  );
}