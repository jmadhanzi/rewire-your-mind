import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/rewire/PageShell";

export const Route = createFileRoute("/cookies")({ component: Cookies });

const COOKIE_TYPES = [
  { name: "Strictly necessary", required: true, desc: "Essential for authentication, session management, and security. Cannot be disabled.", examples: ["supabase-auth-token", "sb-refresh-token"] },
  { name: "Analytics", required: false, desc: "Help us understand how users interact with the app in aggregate. No individual profiling.", examples: ["_rewire_session", "_rewire_referrer"] },
  { name: "Preferences", required: false, desc: "Remember your settings such as theme preference and onboarding state.", examples: ["rewire-user", "rewire-settings", "rewire-onboarding"] },
];

function Cookies() {
  return (
    <PageShell title="Cookie Policy" subtitle="Last updated: April 22, 2025." badge="Legal">
      <div className="space-y-6 text-[14px] leading-relaxed text-white/60">
        <p>Rewire uses cookies and similar technologies to keep you signed in, remember your preferences, and understand how the app is used. This policy explains what we use and why.</p>

        <h2 className="text-[18px] font-black text-white">What are cookies?</h2>
        <p>Cookies are small text files stored on your device. We also use localStorage (browser storage) to store non-sensitive preferences like your onboarding data and app settings locally on your device.</p>
      </div>

      <div className="mt-8 space-y-4">
        {COOKIE_TYPES.map((c) => (
          <div key={c.name} className="rounded-[18px] border border-white/[0.06] bg-[#0D1226] p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[15px] font-black">{c.name}</h3>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${c.required ? "bg-[#00D9A3]/15 text-[#00D9A3]" : "bg-white/[0.06] text-white/40"}`}>
                {c.required ? "Required" : "Optional"}
              </span>
            </div>
            <p className="mt-2 text-[13px] text-white/50">{c.desc}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {c.examples.map((e) => (
                <code key={e} className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-[11px] text-white/50">{e}</code>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-4 text-[14px] leading-relaxed text-white/55">
        <h2 className="text-[18px] font-black text-white">Third-party cookies</h2>
        <p>We do not allow third-party advertising or tracking cookies on Rewire. Our analytics provider (Posthog) uses privacy-first analytics with IP anonymisation enabled and no cross-site tracking.</p>

        <h2 className="text-[18px] font-black text-white">Your choices</h2>
        <p>You can control and delete cookies through your browser settings. Note that disabling strictly necessary cookies will prevent you from signing in. Optional cookies can be disabled in <strong className="text-white">Settings → Privacy</strong> within the app.</p>

        <h2 className="text-[18px] font-black text-white">Contact</h2>
        <p>Cookie questions: <a href="mailto:privacy@rewire.app" className="text-[#A78BFA] hover:underline">privacy@rewire.app</a></p>
      </div>
    </PageShell>
  );
}
