import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/rewire/PageShell";
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/careers")({ component: Careers });

const JOBS = [
  { dept: "Engineering", title: "Senior React Native Engineer", location: "Remote (US/EU)", type: "Full-time", tags: ["React Native", "TypeScript", "Supabase"], desc: "Help us build the world's best ADHD brain-training experience on iOS and Android." },
  { dept: "Engineering", title: "ML Engineer — Cognitive Modeling", location: "San Francisco, CA", type: "Full-time", tags: ["Python", "PyTorch", "Neuroscience"], desc: "Build AI models that adapt training programs to each user's unique cognitive profile." },
  { dept: "Product", title: "Senior Product Manager", location: "Remote", type: "Full-time", tags: ["B2C", "Mobile", "Growth"], desc: "Own the core training experience and drive engagement metrics across 2M+ users." },
  { dept: "Design", title: "Product Designer — Growth", location: "Remote", type: "Full-time", tags: ["Figma", "Motion", "A/B Testing"], desc: "Design experiences that turn trial users into long-term subscribers." },
  { dept: "Science", title: "Cognitive Neuroscientist (Research)", location: "Remote / San Francisco", type: "Full-time", tags: ["Research", "ADHD", "Clinical Trials"], desc: "Lead our ongoing research partnerships and validate the efficacy of our interventions." },
  { dept: "Marketing", title: "Head of Influencer Marketing", location: "Remote", type: "Full-time", tags: ["ADHD Community", "TikTok", "YouTube"], desc: "Build and scale our creator program across ADHD and wellness verticals." },
];

const PERKS = [
  { icon: "💰", title: "Competitive salary + equity", body: "Top-of-market comp with meaningful equity in a high-growth startup." },
  { icon: "🏥", title: "Full health coverage", body: "100% employer-paid medical, dental, and vision for you and your family." },
  { icon: "🧠", title: "ADHD-friendly culture", body: "Async-first, no-meeting Wednesdays, flexible hours, and genuine psychological safety." },
  { icon: "🌍", title: "Remote-first", body: "Work from anywhere. We have hubs in SF, London, and Singapore but fully support remote." },
  { icon: "📚", title: "$3,000 learning budget", body: "For courses, books, conferences, or therapy. Your growth is our priority." },
  { icon: "🏖️", title: "Unlimited PTO", body: "Minimum 20 days strongly encouraged. We mean it — burnout is not a badge of honor." },
];

function Careers() {
  const navigate = useNavigate();
  const depts = [...new Set(JOBS.map((j) => j.dept))];

  return (
    <PageShell title="Build the future of brain health." subtitle="We're a team of 35 scientists, engineers, and designers obsessed with helping ADHD minds thrive." badge="We're hiring">
      {/* Culture */}
      <div className="rounded-[22px] border border-[#00D9A3]/20 bg-[#00D9A3]/[0.06] p-6">
        <h2 className="text-[18px] font-black">Why Rewire?</h2>
        <p className="mt-2 text-[14px] leading-relaxed text-white/60">
          We're building at the intersection of neuroscience, AI, and mental wellness — one of the most meaningful spaces in tech. Our users tell us we changed their lives. That's not something you get to say at most startups.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Mission-driven", "ADHD-friendly WFH", "No BS culture", "Real impact", "Fast-growing"].map((t) => (
            <span key={t} className="rounded-full border border-[#00D9A3]/25 bg-[#00D9A3]/10 px-3 py-1 text-[12px] font-semibold text-[#00D9A3]">{t}</span>
          ))}
        </div>
      </div>

      {/* Perks */}
      <h2 className="mt-10 text-[22px] font-black" style={{ letterSpacing: "-0.5px" }}>Benefits & perks</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {PERKS.map((p) => (
          <div key={p.title} className="rounded-[18px] border border-white/[0.06] bg-[#0D1226] p-4">
            <div className="text-[24px]">{p.icon}</div>
            <h3 className="mt-2 text-[14px] font-bold">{p.title}</h3>
            <p className="mt-1 text-[12px] leading-relaxed text-white/45">{p.body}</p>
          </div>
        ))}
      </div>

      {/* Open roles */}
      <h2 className="mt-10 text-[22px] font-black" style={{ letterSpacing: "-0.5px" }}>Open roles</h2>
      {depts.map((dept) => (
        <div key={dept} className="mt-6">
          <h3 className="mb-3 text-[12px] font-black uppercase tracking-[0.2em] text-[#A78BFA]">{dept}</h3>
          <div className="space-y-3">
            {JOBS.filter((j) => j.dept === dept).map((job) => (
              <div key={job.title} className="group rounded-[18px] border border-white/[0.06] bg-[#0D1226] p-5 transition-all hover:border-[#7858FF]/30 hover:bg-[#131A2E]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-[16px] font-black leading-tight">{job.title}</h4>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-white/50">{job.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="flex items-center gap-1 text-[11px] text-white/35"><MapPin className="h-3 w-3" /> {job.location}</span>
                      <span className="flex items-center gap-1 text-[11px] text-white/35"><Clock className="h-3 w-3" /> {job.type}</span>
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {job.tags.map((t) => <span key={t} className="rounded-full bg-[#7858FF]/15 px-2 py-0.5 text-[10px] font-semibold text-[#A78BFA]">{t}</span>)}
                    </div>
                  </div>
                  <button className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-[#7858FF]/25 bg-[#7858FF]/10 text-[#A78BFA] group-hover:bg-[#7858FF] group-hover:text-white transition-all">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* General */}
      <div className="mt-8 rounded-[18px] border border-white/[0.07] bg-[#0D1226] p-5 text-center">
        <Briefcase className="mx-auto h-8 w-8 text-white/20" />
        <h3 className="mt-3 text-[16px] font-bold">Don't see your role?</h3>
        <p className="mt-1.5 text-[13px] text-white/45">We hire exceptional people for roles that don't exist yet. Send us your story.</p>
        <a href="mailto:careers@rewire.app" className="mt-4 inline-block rounded-2xl border border-white/[0.1] px-5 py-2.5 text-[13px] font-bold text-white/60 hover:bg-white/[0.05] transition-colors">
          careers@rewire.app
        </a>
      </div>
    </PageShell>
  );
}
