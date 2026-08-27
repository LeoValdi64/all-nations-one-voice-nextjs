import Image from "next/image";
import { cn } from "@/lib/utils";

export function PhotoFrame({
  src,
  alt,
  className,
  imageClassName,
  sizes,
  preload = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes: string;
  preload?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        className={cn(
          "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]",
          imageClassName,
        )}
      />
    </div>
  );
}
