import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "violet" | "teal" | "gold" | "coral" | "soft";

const styles: Record<Variant, string> = {
  violet: "border-[#7858FF]/40 text-[#A78BFA] shadow-[0_0_18px_rgba(120,88,255,0.25)]",
  teal: "border-[#00D9A3]/40 text-[#00D9A3] shadow-[0_0_18px_rgba(0,217,163,0.22)]",
  gold: "border-[#F5C518]/40 text-[#F5C518] shadow-[0_0_18px_rgba(245,197,24,0.22)]",
  coral: "border-[#FF6B6B]/40 text-[#FF6B6B] shadow-[0_0_18px_rgba(255,107,107,0.22)]",
  soft: "border-[#A78BFA]/40 text-[#A78BFA] shadow-[0_0_18px_rgba(167,139,250,0.22)]",
};

type Props = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

export function Tag({ variant = "violet", className, children }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border bg-white/[0.03] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest",
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
