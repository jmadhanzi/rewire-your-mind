import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = Omit<HTMLMotionProps<"button">, "ref">;

export function PrimaryButton({ className, children, disabled, ...props }: Props) {
  return (
    <motion.button
      {...props}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      whileHover={
        disabled
          ? undefined
          : {
              scale: 1.02,
              boxShadow: "0 8px 36px rgba(120,88,255,0.65)",
            }
      }
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "w-full rounded-2xl bg-[#7858FF] py-4 text-base font-semibold text-white",
        "shadow-[0_4px_24px_rgba(120,88,255,0.45)]",
        "hover:bg-[#8a6dff] disabled:opacity-50 disabled:pointer-events-none",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}