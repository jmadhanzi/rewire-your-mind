import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, children, ...props }: Props) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-[22px] border border-white/[0.07] bg-[#131A2E] p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}