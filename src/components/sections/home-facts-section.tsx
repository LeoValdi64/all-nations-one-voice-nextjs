import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SITE } from "@/lib/constants";
import { ORG } from "@/lib/organization";

const facts = [
  { label: "Founded", value: String(ORG.foundedYear) },
  { label: "Service area", value: ORG.serviceArea },
  { label: "Current programs", value: "Three" },
  { label: "One address", value: SITE.cityLine },
];

export function HomeFactsSection() {
  return (
    <section className="border-y bg-card">
      <Container className="py-8 sm:py-10">
        <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1">
              <p className="text-[0.7rem] font-semibold tracking-[0.18em] text-primary uppercase">
                {fact.label}
              </p>
              <p className="font-heading text-xl font-medium tracking-tight sm:text-2xl">
                {fact.value}
              </p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
