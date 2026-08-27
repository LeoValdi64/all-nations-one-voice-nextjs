import type { Metadata } from "next";
import Link from "next/link";
import OngLayout from "@/components/layout/ong-layout";
import { Container, Eyebrow } from "@/components/layout/container";
import { PhotoFrame } from "@/components/media/photo-frame";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SITE } from "@/lib/constants";
import { getPublicContent } from "@/lib/site-queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About us",
  description:
    "All Nations One Voice is a Federal Way nonprofit offering job-search help, support services, and FOUND IT! Thrift Store.",
};

const team = [
  { name: "Bersabed Ponce", role: "President", image: "/images/img2.webp" },
  { name: "Claudia Santana", role: "Vice President / Treasurer", image: "/images/img6.jpeg" },
  { name: "Carlos Santana", role: "Secretary", image: "/images/img5.jpeg" },
  { name: "Julian Santana", role: "Board Member", image: "" },
];

const mosaic = [
  { src: "/images/store/anv-2026-06-aisle.jpg", alt: "Aisle inside FOUND IT! Thrift Store" },
  { src: "/images/store/anv-2026-05-red-gown.jpg", alt: "Holiday clothing display" },
  { src: "/images/store/anv-2026-07-home.jpg", alt: "Home goods at the store" },
  { src: "/images/store/anv-2026-13-pillows.jpg", alt: "Furniture and pillows" },
  { src: "/images/store/anv-2026-08-books.jpg", alt: "Books and decor" },
  { src: "/images/store/anv-2026-11-kids-coats.jpg", alt: "Kids coats" },
];

const community = [
  {
    src: "/images/store/anv-2026-18-storefront.jpg",
    alt: "Neighbors in front of FOUND IT! Thrift Store",
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
    caption: "Giving day in the lot",
  },
  {
    src: "/images/store/anv-2026-01-truck-team.jpg",
    alt: "Team moving donations",
    caption: "Moving donations in",
  },
];

export default async function AboutPage() {
  const content = await getPublicContent();
  const instagram = content.links.instagram || SITE.instagram;

  return (
    <OngLayout>
      <section className="relative isolate min-h-[32rem] overflow-hidden bg-ink h-[min(78svh,38rem)]">
        <PhotoFrame
          src="/images/store/anv-2026-18-storefront.jpg"
          alt="Neighbors outside FOUND IT! Thrift Store"
          sizes="100vw"
          preload
          className="absolute inset-0 rounded-none"
          imageClassName="object-[50%_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <Container className="relative flex h-full flex-col justify-end pb-10 sm:pb-14">
          <Reveal className="flex max-w-3xl flex-col items-start gap-4">
            <Eyebrow className="text-primary">Our story</Eyebrow>
            <h1 className="display-title text-background">About us</h1>
            <p className="max-w-xl text-base leading-relaxed text-background/82 sm:text-lg">
              {content.about.body}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="flex flex-col gap-5 lg:col-span-5">
            <Eyebrow>Federal Way, 2025</Eyebrow>
            <h2 className="display-title-md">A store, a desk, and neighbors we know.</h2>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              All Nations One Voice started here in 2025. The work is local: sit with someone who
              needs a computer to look for a job, offer practical support, and keep FOUND IT! Thrift
              Store open at the same address.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              The photos here are the real floor, the real racks, and the days we put toys in
              families&apos; hands. That is the foundation people meet when they walk in.
            </p>
            <ul className="flex flex-col gap-3 pt-2">
              {content.about.bullets.map((bullet) => (
                <li key={bullet} className="text-sm leading-relaxed text-foreground/85">
                  {bullet}
                </li>
              ))}
            </ul>
          </Reveal>
          <RevealItem className="grid grid-cols-2 gap-3 lg:col-span-7" delay={0.08}>
            <PhotoFrame
              src="/images/store/anv-2026-06-aisle.jpg"
              alt="Inside FOUND IT! Thrift Store"
              sizes="(max-width: 1024px) 50vw, 30vw"
              className="aspect-[3/4] rounded-2xl"
            />
            <PhotoFrame
              src="/images/store/anv-2026-19-families.jpg"
              alt="Families at the store doors"
              sizes="(max-width: 1024px) 50vw, 30vw"
              className="mt-8 aspect-[3/4] rounded-2xl sm:mt-14"
            />
          </RevealItem>
        </Container>
      </section>

      <section className="border-y bg-card py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <Reveal className="flex max-w-2xl flex-col gap-4">
            <Eyebrow>FOUND IT!</Eyebrow>
            <h2 className="display-title-md">The store is how most people find us.</h2>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Clothing, home goods, kids items, and holiday tables — one room on Pacific Hwy S that
              keeps everyday things within reach.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {mosaic.map((photo, index) => (
              <RevealItem key={photo.src} delay={index * 0.04}>
                <PhotoFrame
                  src={photo.src}
                  alt={photo.alt}
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="aspect-[4/5] rounded-2xl"
                />
              </RevealItem>
            ))}
          </div>
          <div>
            <Button asChild size="lg" className="h-12">
              <Link href="/store">See the full store gallery</Link>
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <Reveal className="max-w-2xl">
            <Eyebrow>In the neighborhood</Eyebrow>
            <h2 className="display-title-md mt-4">Days that look like the mission.</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Toy giveaways, donation runs, and families at the front door. This is the part of the
              work a form cannot show.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {community.map((photo, index) => (
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

      <section className="border-y bg-card py-16 sm:py-24">
        <Container className="flex flex-col gap-12">
          <Reveal className="max-w-xl">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="display-title-md mt-4">Our values</h2>
          </Reveal>
          <div className="flex flex-col">
            {content.values.map((value, index) => (
              <RevealItem key={value.title} delay={index * 0.06}>
                <div className="grid gap-4 py-8 md:grid-cols-12 md:items-start">
                  <p className="font-heading text-2xl text-primary md:col-span-2">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-heading text-2xl font-medium md:col-span-3">{value.title}</h3>
                  <p className="leading-relaxed text-muted-foreground md:col-span-7">{value.body}</p>
                </div>
                {index < content.values.length - 1 ? <Separator /> : null}
              </RevealItem>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="flex flex-col gap-12">
          <Reveal className="max-w-xl">
            <Eyebrow>The people</Eyebrow>
            <h2 className="display-title-md mt-4">Our team</h2>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person, index) => (
              <RevealItem key={person.name} delay={index * 0.06} className="flex flex-col gap-4">
                {person.image ? (
                  <PhotoFrame
                    src={person.image}
                    alt={person.name}
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="aspect-[4/5] rounded-2xl"
                  />
                ) : (
                  <div className="flex aspect-[4/5] flex-col items-center justify-center rounded-2xl bg-secondary text-center ring-1 ring-foreground/8">
                    <span className="font-heading text-5xl tracking-tight text-primary">
                      {person.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </span>
                    <span className="mt-3 px-4 text-sm text-muted-foreground">Board member</span>
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <p className="font-heading text-xl font-medium">{person.name}</p>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                </div>
              </RevealItem>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t bg-cream pb-20 sm:pb-28">
        <Container className="flex flex-col items-start gap-5 pt-16 sm:pt-20">
          <Eyebrow>Follow the store</Eyebrow>
          <h2 className="display-title-md max-w-xl">New finds go up on Instagram first.</h2>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
            FOUND IT! posts the floor, the racks, and event days at @found.it.thrift.store.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12">
              <a href={instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12">
              <Link href="/store">Visit the store page</Link>
            </Button>
          </div>
        </Container>
      </section>
    </OngLayout>
  );
}
