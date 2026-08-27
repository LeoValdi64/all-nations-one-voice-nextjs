import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MapEmbed({
  title = "Map to All Nations One Voice",
  className,
}: {
  title?: string;
  className?: string;
}) {
  return (
    <iframe
      title={title}
      src={SITE.mapsEmbed}
      allowFullScreen
      className={cn("h-72 w-full border-0 sm:h-[380px]", className)}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
