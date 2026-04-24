import { Skeleton } from "@/components/rewire/Skeleton";

export function GamesSkeleton() {
  return (
    <div className="px-6 pt-12 pb-6">
      <Skeleton className="h-7 w-28" />
      <Skeleton className="mt-2 h-3 w-32" />
      {/* Featured */}
      <div className="mt-5 flex items-center gap-3 rounded-[20px] border border-white/[0.07] bg-[#131A2E] p-3">
        <Skeleton className="h-[58px] w-[58px] rounded-[16px]" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-40" />
        </div>
        <Skeleton className="h-10 w-16 rounded-[13px]" />
      </div>
      {/* Pills */}
      <div className="mt-6 flex gap-2 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-16 shrink-0 rounded-full" />
        ))}
      </div>
      {/* Grid */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col rounded-[18px] border border-white/[0.07] bg-[#131A2E] p-3 space-y-2"
          >
            <Skeleton className="h-[44px] w-[44px] rounded-[13px]" />
            <Skeleton className="mt-2 h-4 w-24" />
            <Skeleton className="h-3 w-full" />
            <div className="mt-2 flex items-center justify-between">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-4 w-12 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}