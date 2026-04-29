import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/rewire/PageShell";

export const Route = createFileRoute("/terms")({ component: Terms });

const SECTIONS = [
  { title: "1. Acceptance of terms", body: "By accessing or using Rewire (the \"Service\"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service. We may update these terms at any time; continued use constitutes acceptance." },
  { title: "2. Eligibility", body: "You must be at least 13 years old to use Rewire. By using the Service, you represent that you meet this requirement. Users under 18 require parental consent. Our Family plan includes additional parental controls." },
  { title: "3. Account", body: "You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. Notify us immediately at support@rewire.app if you suspect unauthorised access. One account per person; sharing accounts is not permitted." },
  { title: "4. Subscription & billing", body: "Pro subscriptions auto-renew unless cancelled before the renewal date. Annual plans are billed in full at renewal. Weekly and monthly plans are billed at each period. You may cancel at any time from account settings; cancellation takes effect at the end of the current paid period. No partial refunds are issued for unused periods except as required by law or within our 30-day money-back guarantee." },
  { title: "5. Free trial", body: "New subscribers receive a 7-day free trial of Pro. You will not be charged during the trial. If you cancel before the trial ends, you will not be charged. After the trial, your selected plan billing begins automatically." },
  { title: "6. Refund policy", body: "We offer a 30-day money-back guarantee for all new Pro subscriptions. To request a refund, email support@rewire.app within 30 days of your first charge. Refunds are processed within 5-10 business days. Refunds are not available for renewals of existing subscriptions beyond the 7-day window after renewal." },
  { title: "7. Acceptable use", body: "You agree not to: (a) reverse-engineer, decompile, or disassemble any part of the Service; (b) circumvent subscription restrictions or share account credentials; (c) use the Service for commercial purposes without written permission; (d) attempt to gain unauthorised access to any system; (e) submit false, misleading, or offensive content; (f) use the Service in any manner that violates applicable law." },
  { title: "8. Intellectual property", body: "All content in Rewire — including games, algorithms, brain score methodology, text, graphics, and design — is owned by or licensed to Rewire Inc. and protected by intellectual property laws. You are granted a limited, non-exclusive, non-transferable licence to use the Service for personal, non-commercial purposes only." },
  { title: "9. Medical disclaimer", body: "Rewire is not a medical device and is not intended to diagnose, treat, cure, or prevent any condition including ADHD. Brain training games are designed for general cognitive engagement and do not constitute medical advice or therapy. Consult a qualified healthcare professional for medical concerns." },
  { title: "10. Limitation of liability", body: "To the maximum extent permitted by law, Rewire Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. Our total liability to you shall not exceed the amount you paid us in the 12 months preceding the claim." },
  { title: "11. Governing law", body: "These terms are governed by the laws of the State of California, USA, without regard to conflict of law principles. Any dispute shall be resolved by binding arbitration in San Francisco, CA, except that either party may seek injunctive relief in any court of competent jurisdiction." },
  { title: "12. Contact", body: "For questions about these terms: legal@rewire.app\nRewire Inc., 535 Mission Street, San Francisco, CA 94105" },
];

function Terms() {
  return (
    <PageShell title="Terms of Service" subtitle="Last updated: April 22, 2025. Please read these terms carefully." badge="Legal">
      <div className="rounded-[18px] border border-[#F5C518]/20 bg-[#F5C518]/[0.06] p-5 mb-8">
        <h2 className="text-[14px] font-black text-[#F5C518]">Key points</h2>
        <ul className="mt-3 space-y-1.5 text-[13px] text-white/65">
          <li>• 7-day free trial — no charge until trial ends</li>
          <li>• 30-day money-back guarantee on all new Pro subscriptions</li>
          <li>• Cancel anytime from account settings</li>
          <li>• Rewire is a wellness tool, not a medical device</li>
          <li>• Disputes resolved by binding arbitration in California</li>
        </ul>
      </div>

      <div className="space-y-8">
        {SECTIONS.map((s) => (
          <div key={s.title}>
            <h2 className="text-[17px] font-black text-white">{s.title}</h2>
            <p className="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-white/55">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-[18px] border border-white/[0.06] bg-[#0D1226] p-5 text-center">
        <p className="text-[13px] text-white/45">Legal questions?</p>
        <a href="mailto:legal@rewire.app" className="mt-2 inline-block text-[14px] font-bold text-[#A78BFA] hover:underline">legal@rewire.app</a>
      </div>
    </PageShell>
  );
}
