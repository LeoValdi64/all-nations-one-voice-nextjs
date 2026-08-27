import type { Metadata } from "next";
import Image from "next/image";
import OngLayout from "@/components/layout/ong-layout";
import { Container, Eyebrow } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { PhotoFrame } from "@/components/media/photo-frame";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Separator } from "@/components/ui/separator";
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

export default async function AboutPage() {
  const content = await getPublicContent();

  return (
    <OngLayout>
      <PageIntro eyebrow="Our story" title="About us">
        {content.about.body}
      </PageIntro>

      <section className="pb-20 sm:pb-28">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="flex flex-col gap-6 lg:col-span-6">
            <Eyebrow>Federal Way, 2025</Eyebrow>
            <h2 className="display-title-md">Local work, a shared address.</h2>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              All Nations One Voice began in 2025 in Federal Way. The work is local: sit with
              someone who needs a computer to look for a job, offer practical support, and keep
              FOUND IT! Thrift Store open at the same address.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              We do not currently run GED or English classes. When a class is scheduled, it will
              appear on the Classes page so people can register.
            </p>
          </Reveal>
          <RevealItem className="lg:col-span-6" delay={0.08}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[5/4]">
              <Image
                src="/images/about.jpg"
                alt="All Nations One Voice"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
          </RevealItem>
        </Container>
      </section>

      <section className="border-y bg-card py-20 sm:py-28">
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

      <section className="py-20 sm:py-28">
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
    </OngLayout>
  );
}
