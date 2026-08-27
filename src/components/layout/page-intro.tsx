import { Container, Eyebrow } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function PageIntro({
  eyebrow,
  title,
  children,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  align?: "center" | "left";
}) {
  return (
    <section className="pt-16 pb-10 sm:pt-24 sm:pb-14">
      <Container>
        <Reveal
          className={cn(
            "flex max-w-3xl flex-col gap-5",
            align === "center" ? "mx-auto items-center text-center" : "items-start",
          )}
        >
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="font-heading text-5xl leading-[0.95] font-medium tracking-tight sm:text-7xl">
            {title}
          </h1>
          {children ? (
            <div className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{children}</div>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
