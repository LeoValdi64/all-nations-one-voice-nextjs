import type { Metadata } from "next";
import OngLayout from "@/components/layout/ong-layout";
import { AboutUsSection } from "@/components/sections/about-us-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MissionSection } from "@/components/sections/mission-section";
import { StoreTeaserSection } from "@/components/sections/store-teaser-section";
import { UpcomingClassesSection } from "@/components/sections/upcoming-classes-section";
import { pickHeroPhoto, pickTeaserPhotos } from "@/lib/photos";
import { getPublicContent, getPublicGallery, getUpcomingPublishedClasses } from "@/lib/site-queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  description:
    "Job-search help, support services, and FOUND IT! Thrift Store in Federal Way, Washington.",
};

export default async function HomePage() {
  const [content, classes, photos] = await Promise.all([
    getPublicContent(),
    getUpcomingPublishedClasses(3),
    getPublicGallery(),
  ]);

  return (
    <OngLayout>
      <HeroSection content={content} photo={pickHeroPhoto(photos)} />
      <MissionSection content={content} />
      <StoreTeaserSection photos={pickTeaserPhotos(photos)} />
      <AboutUsSection content={content} />
      <UpcomingClassesSection classes={classes} />
    </OngLayout>
  );
}
