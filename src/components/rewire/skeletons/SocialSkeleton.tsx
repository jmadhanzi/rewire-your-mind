import { Skeleton } from "@/components/rewire/Skeleton";
import { Card } from "@/components/rewire/Card";

export function SocialSkeleton() {
  return (
    <div className="px-6 pt-12 pb-6">
      <Skeleton className="h-7 w-28" />
      {/* Active challenge */}
      <div className="mt-5 rounded-[22px] border border-white/[0.07] bg-[#131A2E] p-4 space-y-3">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-3 w-32" />
        <div className="grid grid-cols-2 gap-3 pt-1">
          <Skeleton className="h-[72px] rounded-[14px]" />
          <Skeleton className="h-[72px] rounded-[14px]" />
        </div>
        <Skeleton className="h-12 w-full rounded-full" />
      </div>
      {/* Leaderboard */}
      <Card className="mt-4">
        <Skeleton className="h-4 w-40" />
        <div className="mt-3 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-[14px] bg-white/[0.02] px-3 py-2.5"
            >
              <Skeleton className="h-7 w-7 rounded-full" />
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2.5 w-16" />
              </div>
              <Skeleton className="h-4 w-14" />
            </div>
          ))}
        </div>
      </Card>
      <Skeleton className="mt-4 h-12 w-full rounded-full" />
    </div>
  );
}