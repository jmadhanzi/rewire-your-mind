import { Skeleton } from "@/components/rewire/Skeleton";

export function HomeSkeleton() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 px-6 pt-12">
        <div className="min-w-0 space-y-2">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-7 w-44" />
        </div>
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
      <div className="px-6 pt-7 space-y-4">
        <Skeleton className="h-9 w-full rounded-full" />
        {/* Today's focus card */}
        <div className="rounded-[22px] border border-white/[0.07] bg-[#131A2E] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-7 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-10 flex-1 rounded-xl" />
            <Skeleton className="h-10 flex-1 rounded-xl" />
            <Skeleton className="h-10 flex-1 rounded-xl" />
          </div>
        </div>
        {/* Program progress */}
        <div className="rounded-[22px] border border-white/[0.07] bg-[#131A2E] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-2.5 w-full rounded-full" />
          <div className="grid grid-cols-3 gap-3 pt-2">
            <Skeleton className="h-16 rounded-xl" />
            <Skeleton className="h-16 rounded-xl" />
            <Skeleton className="h-16 rounded-xl" />
          </div>
        </div>
        <Skeleton className="h-[100px] w-full rounded-[22px]" />
      </div>
    </div>
  );
}