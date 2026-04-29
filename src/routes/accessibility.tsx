import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/rewire/PageShell";
import { CheckCircle, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/accessibility")({ component: Accessibility });

const FEATURES = [
  "WCAG 2.1 AA compliance target across all core screens",
  "All interactive elements have descriptive aria-labels",
  "Keyboard navigation supported throughout the web app",
  "Respects system prefers-reduced-motion setting",
  "Minimum 4.5:1 colour contrast ratio on all text",
  "Tap targets meet minimum 44×44pt on mobile",
  "Screen reader tested with VoiceOver (iOS) and TalkBack (Android)",
  "No time-limited interactions without pause controls",
  "Error messages are descriptive and not colour-only",
  "Focus indicators visible for keyboard navigation",
];

const KNOWN_ISSUES = [
  "Memory Matrix game — flip card animation may cause discomfort for some vestibular conditions; we're adding a 'static card' mode in v2.5",
  "AI Coach — streaming text may be difficult to track with some screen readers; full-text mode option coming Q3 2025",
  "Radar chart on home screen — currently SVG-only; text fallback in progress",
];

function Accessibility() {
  return (
    <PageShell title="Accessibility" subtitle="We believe accessible design is good design. Here's our commitment and current status." badge="Accessibility">
      <div className="space-y-6 text-[14px] leading-relaxed text-white/60">
        <p>
          ADHD is a disability. We know that better than anyone. Which means we take accessibility seriously — not as a checkbox, but as a core product value. A brain training app that isn't accessible to the people who need it most would be a failure.
        </p>
        <p>
          We aim for <strong className="text-white">WCAG 2.1 Level AA</strong> compliance across all platforms and screens. We're not perfect yet, but we're committed to continuous improvement.
        </p>
      </div>

      <h2 className="mt-8 text-[20px] font-black" style={{ letterSpacing: "-0.5px" }}>What we support</h2>
      <div className="mt-4 space-y-2">
        {FEATURES.map((f) => (
          <div key={f} className="flex items-start gap-3 rounded-[14px] border border-white/[0.05] bg-[#0D1226] px-4 py-3">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#00D9A3]" />
            <span className="text-[13px] text-white/65">{f}</span>
          </div>
        ))}
      </div>

      <h2 className="mt-8 text-[20px] font-black" style={{ letterSpacing: "-0.5px" }}>Known issues</h2>
      <div className="mt-4 space-y-2">
        {KNOWN_ISSUES.map((i) => (
          <div key={i} className="flex items-start gap-3 rounded-[14px] border border-[#F5C518]/15 bg-[#F5C518]/[0.05] px-4 py-3">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#F5C518]" />
            <span className="text-[13px] text-white/60">{i}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-[18px] border border-[#7858FF]/20 bg-[#7858FF]/[0.07] p-5">
        <h3 className="text-[16px] font-black">Found an accessibility issue?</h3>
        <p className="mt-2 text-[13px] text-white/50">We take accessibility reports seriously. Email us a description, what you expected, and what actually happened.</p>
        <a href="mailto:accessibility@rewire.app" className="mt-3 inline-block text-[14px] font-bold text-[#A78BFA] hover:underline">accessibility@rewire.app</a>
      </div>
    </PageShell>
  );
}
