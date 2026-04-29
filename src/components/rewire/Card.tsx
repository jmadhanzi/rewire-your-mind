import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  glow?: "violet" | "teal" | "gold" | "none";
};

const glowStyles = {
  violet: "shadow-[0_0_30px_rgba(120,88,255,0.12)] border-[#7858FF]/20",
  teal: "shadow-[0_0_30px_rgba(0,217,163,0.1)] border-[#00D9A3]/20",
  gold: "shadow-[0_0_30px_rgba(245,197,24,0.1)] border-[#F5C518]/20",
  none: "border-white/[0.07]",
};

export function Card({ className, children, glow = "none", ...props }: Props) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-[22px] border bg-[#0D1226]/80 p-4 backdrop-blur-sm",
        glowStyles[glow],
        className,
      )}
    >
      {children}
    </div>
  );
}
