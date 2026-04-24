import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = Omit<HTMLMotionProps<"button">, "ref">;

export function GhostButton({ className, children, disabled, ...props }: Props) {
  return (
    <motion.button
      {...props}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "w-full rounded-2xl border border-white/20 bg-transparent py-4 text-base font-medium text-white/60",
        "hover:bg-white/5 hover:text-white/80 disabled:opacity-50 disabled:pointer-events-none",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}