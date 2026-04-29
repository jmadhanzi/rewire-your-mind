import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/rewire/PageShell";
import { Download, Mail } from "lucide-react";

export const Route = createFileRoute("/press")({ component: Press });

const MENTIONS = [
  { outlet: "TechCrunch", headline: "\"Rewire is the brain training app that finally gets ADHD\"", date: "March 2025" },
  { outlet: "Product Hunt", headline: "#1 Product of the Day — ADHD Brain Training Rewired", date: "January 2025" },
  { outlet: "Wired", headline: "\"The neuroscience-backed app fixing how we treat cognitive training\"", date: "February 2025" },
  { outlet: "Forbes", headline: "\"30 Under 30: The startup democratising mental fitness for neurodiverse users\"", date: "April 2025" },
  { outlet: "ADHD Weekly", headline: "\"The app our readers have been waiting for — and it's actually free to start\"", date: "March 2025" },
  { outlet: "Lifehacker", headline: "\"I tried 6 brain training apps. Only Rewire made me actually come back\"", date: "February 2025" },
];

const STATS = [
  { value: "2M+", label: "Monthly active users" },
  { value: "4.8★", label: "Average rating across stores" },
  { value: "50K+", label: "Verified reviews" },
  { value: "73%", label: "Users improve in 21 days" },
  { value: "$49.99", label: "Annual Pro pricing" },
  { value: "2022", label: "Founded in San Francisco" },
];

function Press() {
  return (
    <PageShell title="Press & Media" subtitle="Media kit, press coverage, brand assets, and contact for journalists." badge="Press">
      {/* Press contact */}
      <div className="rounded-[22px] border border-[#7858FF]/25 bg-[#7858FF]/[0.08] p-6">
        <h2 className="text-[18px] font-black">Media inquiries</h2>
        <p className="mt-2 text-[14px] text-white/55">For interviews, editorial coverage, or fact-checking, contact our comms team directly. We typically respond within 4 hours.</p>
        <a href="mailto:press@rewire.app" className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-[#7858FF] px-5 py-2.5 text-[14px] font-bold text-white shadow-[0_4px_20px_rgba(120,88,255,0.4)] hover:bg-[#8a6dff] transition-colors">
          <Mail className="h-4 w-4" /> press@rewire.app
        </a>
      </div>

      {/* Key stats */}
      <h2 className="mt-10 text-[20px] font-black" style={{ letterSpacing: "-0.5px" }}>Key facts & figures</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-[18px] border border-white/[0.06] bg-[#0D1226] p-4 text-center">
            <div className="text-[24px] font-black gradient-text" style={{ letterSpacing: "-0.8px" }}>{s.value}</div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/35">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Coverage */}
      <h2 className="mt-10 text-[20px] font-black" style={{ letterSpacing: "-0.5px" }}>Press coverage</h2>
      <div className="mt-4 space-y-3">
        {MENTIONS.map((m) => (
          <div key={m.headline} className="rounded-[18px] border border-white/[0.06] bg-[#0D1226] p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[12px] font-black uppercase tracking-wider text-[#A78BFA]">{m.outlet}</div>
                <div className="mt-1 text-[14px] font-bold leading-snug text-white/80">{m.headline}</div>
              </div>
              <div className="shrink-0 text-[11px] text-white/30">{m.date}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Assets */}
      <h2 className="mt-10 text-[20px] font-black" style={{ letterSpacing: "-0.5px" }}>Brand assets</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          { title: "Logo pack", desc: "SVG + PNG in light, dark, and gradient variants", size: "2.4 MB" },
          { title: "Screenshots", desc: "App screens in 6.7\" iPhone format, Retina resolution", size: "18 MB" },
          { title: "Brand guidelines", desc: "Colors, typography, tone of voice, and usage rules", size: "4.1 MB" },
        ].map((a) => (
          <button key={a.title} className="group rounded-[18px] border border-white/[0.06] bg-[#0D1226] p-4 text-left transition-all hover:border-[#7858FF]/25 hover:bg-[#131A2E]">
            <Download className="h-5 w-5 text-white/30 group-hover:text-[#A78BFA] transition-colors" />
            <div className="mt-2 text-[14px] font-bold">{a.title}</div>
            <div className="mt-1 text-[12px] text-white/40">{a.desc}</div>
            <div className="mt-2 text-[11px] font-semibold text-[#A78BFA]">{a.size}</div>
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-[12px] text-white/30">
        All assets are available for editorial use. Please attribute "© Rewire Inc." and link to rewire.app
      </p>
    </PageShell>
  );
}
