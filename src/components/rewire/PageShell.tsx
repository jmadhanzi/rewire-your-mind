import type { ReactNode } from "react";
import { Logo } from "./Logo";
import { ArrowLeft } from "lucide-react";

type Props = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
};

export function PageShell({ children, title, subtitle, badge }: Props) {
  return (
    <div className="min-h-screen bg-[#07091A] text-white">
      {/* Sticky nav */}
      <div className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#07091A]/90 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-3xl items-center gap-4 px-5">
          <a
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-white/60 hover:bg-white/[0.1] hover:text-white transition-all"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-4 w-4" />
          </a>
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Logo size={26} />
            <span className="text-[15px] font-black" style={{ letterSpacing: "-0.4px" }}>Rewire</span>
          </a>
          <div className="ml-auto flex items-center gap-3">
            <a href="/login" className="text-[13px] font-semibold text-white/40 hover:text-white/70 transition-colors">
              Sign in
            </a>
            <a
              href="/welcome"
              className="rounded-full bg-[#7858FF] px-4 py-1.5 text-[12px] font-bold text-white hover:bg-[#8a6dff] transition-colors"
            >
              Start free
            </a>
          </div>
        </div>
      </div>

      {/* Page header */}
      <div className="relative overflow-hidden border-b border-white/[0.05] bg-[#0D1226] px-5 py-14">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[#7858FF]/10 blur-[100px]" />
        <div className="relative mx-auto max-w-3xl text-center">
          {badge && (
            <span className="mb-4 inline-block rounded-full border border-[#7858FF]/30 bg-[#7858FF]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#A78BFA]">
              {badge}
            </span>
          )}
          <h1
            className="text-[38px] font-black leading-tight"
            style={{ letterSpacing: "-1.2px" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-white/50">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-5 py-12">{children}</div>

      {/* Mini footer */}
      <div className="border-t border-white/[0.05] px-5 py-8">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 text-[12px] text-white/30">
          <span>© 2025 Rewire Inc.</span>
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Privacy",  href: "/privacy" },
              { label: "Terms",    href: "/terms" },
              { label: "Contact",  href: "/contact" },
              { label: "Home",     href: "/" },
            ].map((l) => (
              <a key={l.label} href={l.href} className="hover:text-white/60 transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
