import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = Omit<HTMLMotionProps<"button">, "ref"> & {
  variant?: "violet" | "teal" | "gold";
};

export function PrimaryButton({ className, children, disabled, variant = "violet", ...props }: Props) {
  const gradients = {
    violet: "from-[#7858FF] via-[#6C47FF] to-[#5b3eff]",
    teal: "from-[#00D9A3] via-[#00c494] to-[#00a87e]",
    gold: "from-[#F5C518] via-[#e8b800] to-[#cc9f00]",
  };
  const shadows = {
    violet: "0 6px 28px rgba(120,88,255,0.5), 0 2px 8px rgba(0,0,0,0.3)",
    teal: "0 6px 28px rgba(0,217,163,0.45), 0 2px 8px rgba(0,0,0,0.3)",
    gold: "0 6px 28px rgba(245,197,24,0.45), 0 2px 8px rgba(0,0,0,0.3)",
  };
  const textColor = variant === "gold" ? "text-[#07091A]" : "text-white";

  return (
    <motion.button
      {...props}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      whileHover={disabled ? undefined : { scale: 1.015 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-gradient-to-br py-4 text-[15px] font-bold tracking-tight",
        gradients[variant],
        textColor,
        "disabled:opacity-50 disabled:pointer-events-none",
        className,
      )}
      style={{ boxShadow: disabled ? undefined : shadows[variant] }}
    >
      {/* Shine overlay */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%)",
        }}
      />
      <span className="relative">{children as React.ReactNode}</span>
    </motion.button>
  );
}
