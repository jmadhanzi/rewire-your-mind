import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Logo } from "./Logo";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
};

export function PageShell({ children, title, subtitle, badge }: Props) {
  return (
    <div className="min-h-screen bg-[#07091A] text-white">
      {/* Nav */}
      <div className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#07091A]/90 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-3xl items-center gap-4 px-5">
          <Link to="/" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-white/60 hover:bg-white/[0.1] hover:text-white transition-all">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2">
            <Logo size={26} />
            <span className="text-[15px] font-black" style={{ letterSpacing: "-0.4px" }}>Rewire</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/[0.05] bg-[#0D1226] px-5 py-14">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[#7858FF]/10 blur-[100px]" />
        <div className="relative mx-auto max-w-3xl text-center">
          {badge && (
            <span className="mb-4 inline-block rounded-full border border-[#7858FF]/30 bg-[#7858FF]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#A78BFA]">
              {badge}
            </span>
          )}
          <h1 className="text-[38px] font-black leading-tight" style={{ letterSpacing: "-1.2px" }}>
            {title}
          </h1>
          {subtitle && <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-white/50">{subtitle}</p>}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-5 py-12">
        {children}
      </div>

      {/* Footer */}
      <div className="border-t border-white/[0.05] px-5 py-8 text-center">
        <p className="text-[13px] text-white/30">© 2025 Rewire Inc. · <Link to="/" className="hover:text-white/60 transition-colors">Back to home</Link></p>
      </div>
    </div>
  );
}
