import type { Metadata } from "next";
import OngLayout from "@/components/layout/ong-layout";
import { HeroSection } from "@/components/sections/hero-section";
import { MissionSection } from "@/components/sections/mission-section";
import { AboutUsSection } from "@/components/sections/about-us-section";
import { UpcomingClassesSection } from "@/components/sections/upcoming-classes-section";
import { getPublicContent, getUpcomingPublishedClasses } from "@/lib/site-queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Nations One Voice | Federal Way nonprofit",
  description:
    "Job-search help, support services, and FOUND IT! Thrift Store in Federal Way, Washington.",
};

export default async function HomePage() {
  const [content, classes] = await Promise.all([
    getPublicContent(),
    getUpcomingPublishedClasses(3),
  ]);

  return (
    <OngLayout>
      <HeroSection content={content} />
      <MissionSection content={content} />
      <AboutUsSection content={content} />
      <UpcomingClassesSection classes={classes} />
    </OngLayout>
  );
}
