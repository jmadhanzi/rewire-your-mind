import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/rewire/PageShell";
import { Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({ component: Blog });

const POSTS = [
  {
    category: "Science", title: "Why 5 Minutes of Brain Training Beats 30 Minutes: The Neuroscience Explained",
    excerpt: "Short, frequent cognitive sessions outperform longer ones for ADHD brains. Here's why — and what it means for how you train.",
    date: "Apr 18, 2025", readTime: "7 min", gradient: "from-[#7858FF]/20 to-transparent", tag: "#neuroscience",
  },
  {
    category: "ADHD", title: "The Real Reason Your Streak Keeps Dying (It's Not Willpower)",
    excerpt: "Streak failure isn't a character flaw. It's a design flaw. We analyzed 2M+ user sessions to find out what actually kills consistency.",
    date: "Apr 12, 2025", readTime: "5 min", gradient: "from-[#00D9A3]/15 to-transparent", tag: "#adhd",
  },
  {
    category: "Research", title: "Our 90-Day Study: ADHD Users Improved Focus Scores by an Average of 31%",
    excerpt: "We partnered with Oxford's cognitive research lab to run a controlled trial. The results surprised even our scientists.",
    date: "Apr 5, 2025", readTime: "12 min", gradient: "from-[#F5C518]/15 to-transparent", tag: "#research",
  },
  {
    category: "Tips", title: "The Perfect Morning Routine for an ADHD Brain (Built From 50,000 User Sessions)",
    excerpt: "We analyzed what our highest-retention users do in their first 2 minutes of the day. Here's the pattern.",
    date: "Mar 28, 2025", readTime: "6 min", gradient: "from-[#A78BFA]/15 to-transparent", tag: "#tips",
  },
  {
    category: "Product", title: "Introducing AI Coach: Personalized Cognitive Guidance That Adapts to You",
    excerpt: "We've been quietly building this for 8 months. Today it's live for all Pro users. Here's everything it can do.",
    date: "Mar 15, 2025", readTime: "4 min", gradient: "from-[#FF6B6B]/15 to-transparent", tag: "#product",
  },
  {
    category: "Community", title: "\"I Finally Finished a Book\": 12 Rewire Stories That Made Our Team Cry",
    excerpt: "We asked our community to share their most meaningful wins. The responses were overwhelming. Here are 12 of them.",
    date: "Mar 8, 2025", readTime: "8 min", gradient: "from-[#00D9A3]/15 to-transparent", tag: "#community",
  },
];

const CATEGORIES = ["All", "Science", "ADHD", "Research", "Tips", "Product", "Community"];

function Blog() {
  const navigate = useNavigate();
  const featured = POSTS[0];

  return (
    <PageShell title="The Rewire Blog" subtitle="Neuroscience, ADHD insights, product updates, and community stories." badge="Blog">
      {/* Featured */}
      <div className={`rounded-[22px] border border-white/[0.08] bg-gradient-to-br ${featured.gradient} p-6`}>
        <div className="flex items-center gap-2 mb-3">
          <span className="rounded-full bg-[#7858FF]/20 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#A78BFA]">Featured</span>
          <span className="text-[11px] text-white/30">{featured.category}</span>
        </div>
        <h2 className="text-[22px] font-black leading-tight" style={{ letterSpacing: "-0.6px" }}>{featured.title}</h2>
        <p className="mt-2 text-[14px] leading-relaxed text-white/55">{featured.excerpt}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[12px] text-white/35">
            <span>{featured.date}</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {featured.readTime}</span>
          </div>
          <button className="flex items-center gap-1.5 text-[13px] font-bold text-[#A78BFA] hover:text-[#C4B5FD] transition-colors">
            Read article <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Category pills */}
      <div className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button key={c} className={`rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition-colors ${c === "All" ? "border-[#7858FF] bg-[#7858FF] text-white" : "border-white/[0.08] bg-[#0D1226] text-white/50 hover:text-white/80"}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Post grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {POSTS.slice(1).map((p) => (
          <button key={p.title} className="group rounded-[18px] border border-white/[0.06] bg-[#0D1226] p-5 text-left transition-all hover:border-[#7858FF]/25 hover:bg-[#131A2E]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#A78BFA]">{p.category}</span>
            </div>
            <h3 className="text-[14px] font-black leading-snug group-hover:text-[#A78BFA] transition-colors">{p.title}</h3>
            <p className="mt-1.5 text-[12px] leading-relaxed text-white/45 line-clamp-2">{p.excerpt}</p>
            <div className="mt-3 flex items-center gap-3 text-[11px] text-white/30">
              <span>{p.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {p.readTime}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Newsletter */}
      <div className="mt-10 rounded-[22px] border border-[#7858FF]/20 bg-[#7858FF]/[0.07] p-6 text-center">
        <h3 className="text-[20px] font-black" style={{ letterSpacing: "-0.5px" }}>Get the weekly ADHD digest</h3>
        <p className="mt-2 text-[13px] text-white/45">Neuroscience insights, training tips, and community stories every Friday.</p>
        <div className="mt-4 flex gap-2">
          <input type="email" placeholder="your@email.com" className="flex-1 rounded-2xl border border-white/[0.08] bg-[#131A2E] px-4 py-3 text-[14px] text-white placeholder:text-white/25 focus:border-[#7858FF]/50 focus:outline-none transition-all" />
          <button className="shrink-0 rounded-2xl bg-[#7858FF] px-5 py-3 text-[14px] font-bold text-white hover:bg-[#8a6dff] transition-colors">Subscribe</button>
        </div>
        <p className="mt-2 text-[11px] text-white/25">No spam. Unsubscribe in one click.</p>
      </div>
    </PageShell>
  );
}
