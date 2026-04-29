import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/rewire/PageShell";
import { Brain, Zap, Heart, Users, Globe, Shield } from "lucide-react";

export const Route = createFileRoute("/about")({ component: About });

const TEAM = [
  { name: "Jordan Madhanzi", role: "CEO & Co-founder", avatar: "JM", bio: "Former neuroscience researcher at Stanford. Diagnosed ADHD at 27. Built Rewire to be the app they wish existed.", bg: "from-[#7858FF] to-[#00D9A3]" },
  { name: "Dr. Priya Sharma", role: "Head of Science", avatar: "PS", bio: "PhD in Cognitive Neuroscience (Oxford). 12 years researching ADHD interventions. Designed our brain-training curriculum.", bg: "from-[#00D9A3] to-[#F5C518]" },
  { name: "Alex Chen", role: "CTO & Co-founder", avatar: "AC", bio: "Ex-Google Brain engineer. Built ML systems serving 500M+ users. Obsessed with making AI feel human.", bg: "from-[#F5C518] to-[#FF6B6B]" },
  { name: "Sarah Williams", role: "Head of Product", avatar: "SW", bio: "Previously at Headspace and Duolingo. Specialises in habit formation for neurodiverse users.", bg: "from-[#A78BFA] to-[#7858FF]" },
  { name: "Marcus Johnson", role: "Lead Designer", avatar: "MJ", bio: "ADHD advocate and designer who believes accessibility and beauty aren't mutually exclusive.", bg: "from-[#FF6B6B] to-[#A78BFA]" },
  { name: "Emma Okafor", role: "Head of Community", avatar: "EO", bio: "Built the community from 0 to 2M users. ADHD parent, runner, and passionate about mental wellness.", bg: "from-[#00D9A3] to-[#7858FF]" },
];

const VALUES = [
  { icon: <Brain className="h-5 w-5" />, title: "Brain-first design", body: "Every feature is built around how ADHD brains actually work — not how neurotypical designers imagine they do." },
  { icon: <Zap className="h-5 w-5" />, title: "Short wins compound", body: "5 minutes a day consistently beats 30 minutes occasionally. We design for the reality of ADHD, not the fantasy." },
  { icon: <Heart className="h-5 w-5" />, title: "No shame, no judgment", body: "Missing a day doesn't make you a failure. Streak Savers exist because life is complicated and we respect that." },
  { icon: <Shield className="h-5 w-5" />, title: "Privacy first", body: "Your brain data is yours. We never sell it, never share it, never use it to train models without explicit consent." },
  { icon: <Users className="h-5 w-5" />, title: "Community over competition", body: "We're building a global community of people who lift each other up — not a leaderboard of shame." },
  { icon: <Globe className="h-5 w-5" />, title: "Accessible by default", body: "ADHD doesn't discriminate by income. Our free tier is genuinely generous and always will be." },
];

function About() {
  const navigate = useNavigate();
  return (
    <PageShell title="We built the app we wished existed." subtitle="Rewire started because the tools for ADHD minds were broken. We fixed that." badge="About us">
      {/* Mission */}
      <section className="space-y-4 text-[15px] leading-relaxed text-white/65">
        <p>
          In 2022, three people with ADHD sat in a coffee shop in San Francisco and listed every brain-training app they'd tried. Between them: 11 apps, thousands of dollars, zero lasting results.
        </p>
        <p>
          Not because they lacked willpower. But because <span className="font-bold text-white">the apps weren't built for how ADHD brains work</span> — the novelty-seeking, the difficulty with sustained attention, the shame spiral when you miss a day, the need for immediate dopamine feedback.
        </p>
        <p>
          Rewire was built to fix that. We partnered with neuroscience researchers, ADHD coaches, and tens of thousands of community members to build something that actually works — not just in clinical trials, but in real life.
        </p>
      </section>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { value: "2M+", label: "Active users" },
          { value: "4.8★", label: "App Store rating" },
          { value: "50+", label: "Games & exercises" },
          { value: "73%", label: "Improve in 21 days" },
        ].map((s) => (
          <div key={s.label} className="rounded-[18px] border border-white/[0.07] bg-[#0D1226] p-4 text-center">
            <div className="text-[26px] font-black gradient-text" style={{ letterSpacing: "-0.8px" }}>{s.value}</div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/35">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Values */}
      <h2 className="mt-12 text-[24px] font-black" style={{ letterSpacing: "-0.6px" }}>Our values</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {VALUES.map((v) => (
          <div key={v.title} className="rounded-[18px] border border-white/[0.06] bg-[#0D1226] p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7858FF]/15 text-[#A78BFA]">{v.icon}</div>
            <h3 className="mt-3 text-[15px] font-black">{v.title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white/50">{v.body}</p>
          </div>
        ))}
      </div>

      {/* Team */}
      <h2 className="mt-12 text-[24px] font-black" style={{ letterSpacing: "-0.6px" }}>The team</h2>
      <p className="mt-2 text-[14px] text-white/45">35 people spread across 3 continents — all with a personal connection to ADHD.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {TEAM.map((m) => (
          <div key={m.name} className="flex gap-4 rounded-[18px] border border-white/[0.06] bg-[#0D1226] p-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${m.bg} text-[14px] font-black text-white`}>{m.avatar}</div>
            <div>
              <div className="text-[14px] font-black">{m.name}</div>
              <div className="text-[11px] font-semibold text-[#A78BFA]">{m.role}</div>
              <p className="mt-1.5 text-[12px] leading-relaxed text-white/45">{m.bio}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-[22px] border border-[#7858FF]/25 bg-[#7858FF]/[0.08] p-7 text-center">
        <h3 className="text-[22px] font-black" style={{ letterSpacing: "-0.6px" }}>Ready to rewire your brain?</h3>
        <p className="mt-2 text-[14px] text-white/50">Join 2 million people who've already started.</p>
        <button onClick={() => navigate({ to: "/welcome" })} className="mt-5 rounded-2xl bg-[#7858FF] px-8 py-3.5 text-[15px] font-bold text-white shadow-[0_6px_24px_rgba(120,88,255,0.45)] hover:bg-[#8a6dff] transition-colors">
          Start free →
        </button>
      </div>
    </PageShell>
  );
}
