import { useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useState } from "react";

type Props = {
  onDismiss?: () => void;
};

export function AdBanner({ onDismiss }: Props) {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <div className="mt-4 flex items-center gap-3 rounded-[16px] border border-white/[0.07] bg-gradient-to-br from-[#1a2340] to-[#131A2E] p-3">
      <span className="rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white/40">
        Ad
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12px] font-semibold text-white/80">
          Tired of ads? Go Pro for an ad-free experience.
        </p>
        <button
          onClick={() => navigate({ to: "/paywall" })}
          className="mt-0.5 text-[11px] font-bold text-[#A78BFA]"
        >
          Upgrade →
        </button>
      </div>
      <button
        onClick={() => {
          setHidden(true);
          onDismiss?.();
        }}
        aria-label="Dismiss"
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-white/50"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}