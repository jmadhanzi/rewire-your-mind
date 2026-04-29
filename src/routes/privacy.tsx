import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/rewire/PageShell";

export const Route = createFileRoute("/privacy")({ component: Privacy });

const SECTIONS = [
  {
    title: "1. What data we collect",
    body: `We collect information you provide directly to us when you create an account, including your email address, display name, and optional demographic information. When you use Rewire, we collect game session data (scores, accuracy, duration, cognitive domain) to calculate your brain scores and track progress. We also collect device identifiers, app usage analytics, and crash reports to improve performance.

We do NOT collect: sensitive medical records, location data beyond coarse timezone data used for streak calculation, or any data from your device's camera, microphone, or contacts.`,
  },
  {
    title: "2. How we use your data",
    body: `Your data is used exclusively to: (a) deliver and personalise your brain training experience; (b) calculate and display your brain scores and progress; (c) maintain streak tracking and milestones; (d) provide AI coaching personalised to your cognitive profile; (e) send transactional emails (account confirmation, password reset); and (f) analyse aggregate, anonymised patterns to improve our training programs.

We do not use your individual data to train machine learning models without your explicit opt-in consent, which you can manage in settings.`,
  },
  {
    title: "3. Data sharing",
    body: `We do not sell your personal data to any third party. We share data only with:

• **Supabase** (database and authentication provider) — your data is encrypted at rest and in transit
• **OpenAI** (AI coaching responses) — only your brain score summary and coaching conversation content is sent; no email, name, or account identifiers
• **Analytics providers** — anonymised, aggregated data only; no individual identification
• **Law enforcement** — only when required by valid legal process, and we will notify you unless prohibited by law`,
  },
  {
    title: "4. Data retention",
    body: `Active accounts: We retain your data for as long as your account is active. Session history is stored for up to 12 months in full detail; older sessions are retained in aggregate summary form only.

Deleted accounts: When you delete your account, we permanently delete all personal data within 30 days. Anonymised, aggregated data may be retained for research purposes indefinitely.`,
  },
  {
    title: "5. Your rights (GDPR / CCPA)",
    body: `Depending on your jurisdiction, you have the right to: access a copy of your personal data; correct inaccurate data; delete your account and all associated data; restrict or object to certain processing; data portability (receive your data in a machine-readable format); and withdraw consent at any time.

To exercise any of these rights, email privacy@rewire.app. We will respond within 30 days. EU/UK users may also lodge a complaint with their local supervisory authority.`,
  },
  {
    title: "6. Security",
    body: `We use industry-standard security measures including 256-bit AES encryption at rest, TLS 1.3 in transit, and row-level security policies in our database. Access to production systems is restricted to senior engineers with MFA enforced. We conduct regular security audits and penetration tests.

In the event of a data breach affecting your personal data, we will notify you within 72 hours of becoming aware of it.`,
  },
  {
    title: "7. Cookies",
    body: `Rewire uses essential cookies for authentication session management and a small number of analytics cookies to understand aggregate usage patterns. We do not use advertising or tracking cookies. You can manage cookie preferences in your browser settings at any time. See our Cookie Policy for full details.`,
  },
  {
    title: "8. Children's privacy",
    body: `Rewire is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe we have collected information from a child under 13, contact us at privacy@rewire.app and we will delete that information immediately.`,
  },
  {
    title: "9. Changes to this policy",
    body: `We will notify you of material changes to this Privacy Policy via email and an in-app notification at least 14 days before changes take effect. Continued use of Rewire after that date constitutes acceptance of the updated policy.`,
  },
  {
    title: "10. Contact",
    body: `For privacy questions or concerns:\n\nRewire Inc.\nAttn: Privacy Officer\n535 Mission Street, San Francisco, CA 94105\nprivacy@rewire.app`,
  },
];

function Privacy() {
  return (
    <PageShell title="Privacy Policy" subtitle="Last updated: April 22, 2025. Effective date: April 22, 2025." badge="Legal">
      <div className="rounded-[18px] border border-[#00D9A3]/20 bg-[#00D9A3]/[0.06] p-5 mb-8">
        <h2 className="text-[16px] font-black text-[#00D9A3]">The short version</h2>
        <ul className="mt-3 space-y-1.5 text-[13px] text-white/65">
          <li>✓ We never sell your personal data</li>
          <li>✓ We never use your brain data to train AI without your consent</li>
          <li>✓ You can delete all your data at any time</li>
          <li>✓ We store only what's needed to run the app</li>
          <li>✓ We respond to privacy requests within 30 days</li>
        </ul>
      </div>

      <div className="space-y-8">
        {SECTIONS.map((s) => (
          <div key={s.title}>
            <h2 className="text-[17px] font-black text-white">{s.title}</h2>
            <div className="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-white/55">{s.body}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-[18px] border border-white/[0.06] bg-[#0D1226] p-5 text-center">
        <p className="text-[13px] text-white/45">Questions about this policy?</p>
        <a href="mailto:privacy@rewire.app" className="mt-2 inline-block text-[14px] font-bold text-[#A78BFA] hover:underline">privacy@rewire.app</a>
      </div>
    </PageShell>
  );
}
