import type { Metadata } from "next";
import OngLayout from "@/components/layout/ong-layout";
import { HeroSection } from "@/components/sections/hero-section";
import { MissionSection } from "@/components/sections/mission-section";
import { AboutUsSection } from "@/components/sections/about-us-section";
import { InitiativesSection } from "@/components/sections/initiatives-section";

export const metadata: Metadata = {
  title: "All Nation One Voice | Uniting cultures, building peace",
  description:
    "All Nation One Voice is a global organization dedicated to promoting unity and understanding between nations and cultures to build a more peaceful and inclusive world.",
  keywords:
    "NGO, peace, global unity, international cooperation, cultures, diversity, inclusion, intercultural dialogue",
};

export default function HomePage() {
  return (
    <OngLayout>
      <HeroSection />
      <MissionSection />
      <AboutUsSection />
      <InitiativesSection />
    </OngLayout>
  );
}
