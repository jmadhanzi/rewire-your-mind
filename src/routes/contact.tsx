import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/rewire/PageShell";
import { Mail, MessageSquare, Shield, Headphones, Building2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({ component: Contact });

const TOPICS = [
  { icon: <Headphones className="h-5 w-5" />, title: "Support", email: "support@rewire.app", desc: "Billing, account issues, or technical bugs. We respond within 24 hours." },
  { icon: <MessageSquare className="h-5 w-5" />, title: "General enquiries", email: "hello@rewire.app", desc: "Questions about the product, feedback, or just want to say hi." },
  { icon: <Shield className="h-5 w-5" />, title: "Privacy & data", email: "privacy@rewire.app", desc: "Data requests, GDPR / CCPA enquiries, or data deletion requests." },
  { icon: <Building2 className="h-5 w-5" />, title: "Partnerships & press", email: "partners@rewire.app", desc: "Brand partnerships, media inquiries, and B2B enquiries." },
];

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <PageShell title="Get in touch." subtitle="We're a real team that reads every message. Usually within a business day." badge="Contact">
      {/* Contact cards */}
      <div className="grid gap-3 sm:grid-cols-2">
        {TOPICS.map((t) => (
          <a key={t.title} href={`mailto:${t.email}`} className="group rounded-[18px] border border-white/[0.06] bg-[#0D1226] p-5 transition-all hover:border-[#7858FF]/25 hover:bg-[#131A2E]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7858FF]/12 text-[#A78BFA] group-hover:bg-[#7858FF]/20 transition-colors">{t.icon}</div>
            <h3 className="mt-3 text-[15px] font-black">{t.title}</h3>
            <p className="mt-1 text-[12px] leading-relaxed text-white/45">{t.desc}</p>
            <div className="mt-3 flex items-center gap-1.5 text-[12px] font-semibold text-[#7858FF]">
              <Mail className="h-3.5 w-3.5" /> {t.email}
            </div>
          </a>
        ))}
      </div>

      {/* Form */}
      <div className="mt-10 rounded-[22px] border border-white/[0.07] bg-[#0D1226] p-6">
        <h2 className="text-[20px] font-black" style={{ letterSpacing: "-0.5px" }}>Send us a message</h2>
        <p className="mt-1 text-[13px] text-white/40">Or email us directly at <a href="mailto:hello@rewire.app" className="text-[#A78BFA] hover:underline">hello@rewire.app</a></p>

        {sent ? (
          <div className="mt-6 rounded-[18px] border border-[#00D9A3]/25 bg-[#00D9A3]/[0.08] p-6 text-center">
            <div className="text-[40px]">✅</div>
            <h3 className="mt-3 text-[18px] font-black">Message received!</h3>
            <p className="mt-2 text-[13px] text-white/50">We'll get back to you at {form.email} within one business day.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { key: "name", label: "Name", type: "text", placeholder: "Your name" },
                { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-white/40">{f.label}</label>
                  <input type={f.type} required placeholder={f.placeholder} value={(form as any)[f.key]}
                    onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full rounded-2xl border border-white/[0.08] bg-[#131A2E] px-4 py-3 text-[14px] text-white placeholder:text-white/25 focus:border-[#7858FF]/50 focus:outline-none focus:ring-2 focus:ring-[#7858FF]/15 transition-all" />
                </div>
              ))}
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-white/40">Subject</label>
              <input type="text" required placeholder="What's this about?" value={form.subject}
                onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                className="w-full rounded-2xl border border-white/[0.08] bg-[#131A2E] px-4 py-3 text-[14px] text-white placeholder:text-white/25 focus:border-[#7858FF]/50 focus:outline-none focus:ring-2 focus:ring-[#7858FF]/15 transition-all" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-white/40">Message</label>
              <textarea required rows={5} placeholder="Tell us how we can help…" value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                className="w-full resize-none rounded-2xl border border-white/[0.08] bg-[#131A2E] px-4 py-3 text-[14px] text-white placeholder:text-white/25 focus:border-[#7858FF]/50 focus:outline-none focus:ring-2 focus:ring-[#7858FF]/15 transition-all" />
            </div>
            <button type="submit" className="w-full rounded-2xl bg-[#7858FF] py-3.5 text-[15px] font-bold text-white shadow-[0_6px_24px_rgba(120,88,255,0.4)] hover:bg-[#8a6dff] transition-colors">
              Send message →
            </button>
          </form>
        )}
      </div>

      {/* Response time */}
      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-[#0D1226] px-4 py-3">
        <span className="relative flex h-2.5 w-2.5 shrink-0"><span className="absolute inset-0 animate-ping rounded-full bg-[#00D9A3] opacity-75" /><span className="relative h-2.5 w-2.5 rounded-full bg-[#00D9A3]" /></span>
        <p className="text-[13px] text-white/50">Average response time: <span className="font-bold text-white/80">under 6 hours</span> on business days</p>
      </div>
    </PageShell>
  );
}
