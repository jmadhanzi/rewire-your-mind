type Props = { current: number; total?: number };

export function ProgressBar({ current, total = 8 }: Props) {
  const pct = Math.min(100, Math.max(0, (current / total) * 100));
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#7858FF] to-[#00D9A3] transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[11px] font-semibold uppercase tracking-widest text-white/35">
        {current}/{total}
      </span>
    </div>
  );
}
