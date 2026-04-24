import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/rewire/Card";

export const Route = createFileRoute("/app/social")({
  component: Page,
});

function Page() {
  return (
    <div className="px-6 pt-12">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-white/35">Friends</p>
      <h1 className="mt-2 text-[32px] font-black leading-tight" style={{ letterSpacing: "-1px" }}>
        Train together, stay accountable
      </h1>
      <Card className="mt-6">
        <p className="text-[14px] text-white/70">
          This screen is scaffolded. Real content arrives in the next iteration.
        </p>
      </Card>
    </div>
  );
}
