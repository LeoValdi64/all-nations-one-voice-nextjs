import Link from "next/link";
import { Container, Eyebrow } from "@/components/layout/container";
import { PhotoFrame } from "@/components/media/photo-frame";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

const moments = [
  {
    src: "/images/store/anv-2026-18-storefront.jpg",
    alt: "Neighbors outside FOUND IT! Thrift Store",
    caption: "The doors on Pacific Hwy S",
  },
  {
    src: "/images/store/anv-2026-17-toy-drive.jpg",
    alt: "Holiday toy giveaway",
    caption: "Toys for families",
  },
  {
    src: "/images/store/anv-2026-20-giveaway.jpg",
    alt: "Handing out toys from a truck",
    caption: "A giving day in the lot",
  },
  {
    src: "/images/store/anv-2026-01-truck-team.jpg",
    alt: "Team moving donations",
    caption: "Moving donations in",
  },
];

export function HomeImpactSection() {
  return (
    <section className="border-y bg-card py-16 sm:py-28">
      <Container className="flex flex-col gap-10">
        <Reveal className="grid items-end gap-6 lg:grid-cols-12">
          <div className="flex max-w-2xl flex-col gap-4 lg:col-span-8">
            <Eyebrow>In the neighborhood</Eyebrow>
            <h2 className="display-title-md">The work looks like this.</h2>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Toy giveaways, donation runs, and families at the front door. These are the days a
              grant form cannot show — and the reason most people stay on this page.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Button asChild size="lg" variant="outline" className="h-12">
              <Link href="/about">See our story</Link>
            </Button>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {moments.map((photo, index) => (
            <RevealItem key={photo.src} delay={index * 0.05} className="flex flex-col gap-3">
              <PhotoFrame
                src={photo.src}
                alt={photo.alt}
                sizes="(max-width: 640px) 100vw, 50vw"
                className="aspect-[4/5] rounded-2xl sm:aspect-[5/4]"
              />
              <p className="text-sm text-muted-foreground">{photo.caption}</p>
            </RevealItem>
          ))}
        </div>
      </Container>
    </section>
  );
}
