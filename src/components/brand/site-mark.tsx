import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteMark({
  href = "/",
  compact = false,
  invert = false,
  className,
}: {
  href?: string;
  compact?: boolean;
  invert?: boolean;
  className?: string;
}) {
  const mark = (
    <span className={cn("flex items-center gap-3", className)}>
      <Image
        src="/images/logo1.webp"
        alt=""
        width={80}
        height={80}
        className={cn("rounded-2xl object-cover", compact ? "size-11" : "size-14")}
      />
      <span className="flex min-w-0 flex-col">
        <span
          className={cn(
            "font-heading leading-none tracking-tight",
            compact ? "text-[1.05rem]" : "text-lg",
            invert ? "text-background" : "text-foreground",
          )}
        >
          All Nations
        </span>
        <span
          className={cn(
            "font-heading leading-none tracking-tight",
            compact ? "text-[1.05rem]" : "text-lg",
            invert ? "text-background" : "text-foreground",
          )}
        >
          One Voice
        </span>
      </span>
      <span className="sr-only">{SITE.name}</span>
    </span>
  );

  if (!href) return mark;

  return (
    <Link href={href} className="rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
      {mark}
    </Link>
  );
}
