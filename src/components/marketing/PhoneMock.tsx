import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  rotate?: number;
  scale?: number;
  glow?: string;
  className?: string;
};

export function PhoneMock({
  children,
  rotate = 0,
  scale = 1,
  glow = "rgba(120,88,255,0.45)",
  className = "",
}: Props) {
  return (
    <div
      className={`relative ${className}`}
      style={{ transform: `rotate(${rotate}deg) scale(${scale})` }}
    >
      <div
        className="absolute -inset-6 rounded-[60px] blur-3xl"
        style={{ background: glow, opacity: 0.6 }}
        aria-hidden
      />
      <div className="relative w-[240px] overflow-hidden rounded-[40px] border border-white/[0.09] bg-[#0D1226] p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
        <div className="absolute left-1/2 top-2 z-10 h-[18px] w-[80px] -translate-x-1/2 rounded-full bg-black" />
        <div className="h-[460px] overflow-hidden rounded-[28px] bg-[#07091A]">
          {children}
        </div>
      </div>
    </div>
  );
}
