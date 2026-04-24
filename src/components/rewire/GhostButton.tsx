import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function GhostButton({ className, children, ...props }: Props) {
  return (
    <button
      {...props}
      className={cn(
        "w-full rounded-2xl border border-white/20 bg-transparent py-4 text-base font-medium text-white/60",
        "transition-all hover:bg-white/5 hover:text-white/80 active:scale-[0.99]",
        className,
      )}
    >
      {children}
    </button>
  );
}