import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton({ className, children, ...props }: Props) {
  return (
    <button
      {...props}
      className={cn(
        "w-full rounded-2xl bg-[#7858FF] py-4 text-base font-semibold text-white",
        "shadow-[0_4px_24px_rgba(120,88,255,0.45)] transition-all",
        "hover:bg-[#8a6dff] active:scale-[0.99] disabled:opacity-50",
        className,
      )}
    >
      {children}
    </button>
  );
}