import { useUserStore } from "@/store/user";

type Props = {
  greeting?: string;
  title?: string;
};

export function AppHeader({
  greeting = "Good morning 👋",
  title = "Ready to rewire?",
}: Props) {
  const streak = useUserStore((s) => s.streak);
  return (
    <div className="flex items-start justify-between gap-3 px-6 pt-12">
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-white/55">{greeting}</p>
        <h1
          className="mt-1 text-[24px] font-black leading-tight"
          style={{ letterSpacing: "-0.8px" }}
        >
          {title}
        </h1>
      </div>
      <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#F5C518]/40 bg-[#F5C518]/15 px-3 py-1.5 text-[12px] font-bold text-[#F5C518] shadow-[0_0_18px_rgba(245,197,24,0.18)]">
        <span
          className="inline-block text-[14px] leading-none"
          style={{ animation: "streakPulse 2s ease-in-out infinite" }}
        >
          🔥
        </span>
        <span className="leading-none">{streak}</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#F5C518]/80">
          day streak
        </span>
      </span>
    </div>
  );
}