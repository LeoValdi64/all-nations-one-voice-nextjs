import type { Metadata } from "next";
import OngLayout from "@/components/layout/ong-layout";
import { AboutUsSection } from "@/components/sections/about-us-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HomeFactsSection } from "@/components/sections/home-facts-section";
import { HomeImpactSection } from "@/components/sections/home-impact-section";
import { HomeSupportSection } from "@/components/sections/home-support-section";
import { HomeVisitSection } from "@/components/sections/home-visit-section";
import { MissionSection } from "@/components/sections/mission-section";
import { StoreTeaserSection } from "@/components/sections/store-teaser-section";
import { UpcomingClassesSection } from "@/components/sections/upcoming-classes-section";
import { pickHomeHeroPhoto, pickTeaserPhotos } from "@/lib/photos";
import { getPublicContent, getPublicGallery, getUpcomingPublishedClasses } from "@/lib/site-queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    absolute: "All Nations One Voice | Federal Way nonprofit",
  },
  description:
    "Federal Way nonprofit offering job-search help, support services, and FOUND IT! Thrift Store. Visit 34303 Pacific Hwy S Ste 120 or donate online.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [content, classes, photos] = await Promise.all([
    getPublicContent(),
    getUpcomingPublishedClasses(3),
    getPublicGallery(),
  ]);

  return (
    <OngLayout>
      <HeroSection content={content} photo={pickHomeHeroPhoto(photos)} />
      <HomeFactsSection />
      <MissionSection content={content} />
      <HomeImpactSection />
      <StoreTeaserSection content={content} photos={pickTeaserPhotos(photos)} />
      <HomeSupportSection content={content} />
      <AboutUsSection content={content} />
      <HomeVisitSection content={content} />
      <UpcomingClassesSection classes={classes} />
    </OngLayout>
  );
}
