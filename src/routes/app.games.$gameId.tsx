import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app/games/$gameId")({
  component: Page,
});

function Page() {
  const { gameId } = Route.useParams();
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-12 text-center">
      <div className="text-[48px]">🚧</div>
      <h1 className="mt-3 text-[22px] font-black" style={{ letterSpacing: "-0.5px" }}>
        Coming soon
      </h1>
      <p className="mt-2 text-[13px] text-white/50">
        {gameId.replace(/-/g, " ")} is being built.
      </p>
      <Link
        to="/app/games"
        className="mt-6 rounded-full border border-white/[0.07] bg-[#131A2E] px-5 py-2.5 text-[12px] font-semibold text-white/70"
      >
        ← Back to games
      </Link>
    </div>
  );
}