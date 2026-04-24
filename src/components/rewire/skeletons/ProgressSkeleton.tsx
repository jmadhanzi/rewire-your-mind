import { Skeleton } from "@/components/rewire/Skeleton";
import { Card } from "@/components/rewire/Card";

export function ProgressSkeleton() {
  return (
    <div className="px-6 pt-12 pb-6">
      <Skeleton className="h-7 w-32" />
      {/* Summary stats */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="flex flex-col items-center py-4 space-y-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-3 w-14" />
          </Card>
        ))}
      </div>
      {/* This week */}
      <Card className="mt-4">
        <Skeleton className="h-4 w-24" />
        <div className="mt-4 flex h-[80px] items-end justify-between gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton
              key={i}
              className="flex-1 rounded-t-md"
              // varied bar heights for shape
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-3 flex-1" />
          ))}
        </div>
      </Card>
      {/* Cognitive improvement */}
      <Card className="mt-4">
        <Skeleton className="h-4 w-44" />
        <div className="mt-4 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-1.5 w-full rounded-full" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}