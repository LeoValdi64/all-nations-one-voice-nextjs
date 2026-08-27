import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/layout/container";
import OngLayout from "@/components/layout/ong-layout";
import { Reveal } from "@/components/motion/reveal";
import { StoreGallery } from "@/components/store/store-gallery";
import { VisitCard } from "@/components/store/visit-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE } from "@/lib/constants";
import { cinematicPhotos, pickHeroPhoto } from "@/lib/photos";
import { getPublicContent, getPublicGallery } from "@/lib/site-queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FOUND IT! Thrift Store | All Nations One Voice",
  description:
    "Visit FOUND IT! Thrift Store in Federal Way. Shop and donate clothing and household goods. Same address as All Nations One Voice.",
};

export default async function StorePage() {
  const [content, photos] = await Promise.all([getPublicContent(), getPublicGallery()]);
  const featured = pickHeroPhoto(photos);
  const gallery = featured
    ? [featured, ...cinematicPhotos(photos).filter((photo) => photo.id !== featured.id)]
    : photos;

  return (
    <OngLayout>
      <section className="pt-16 pb-6 sm:pt-24">
        <Container>
          <Reveal className="flex max-w-3xl flex-col gap-5">
            <Eyebrow>All Nations One Voice</Eyebrow>
            <h1 className="font-heading text-5xl leading-[0.95] font-medium tracking-tight sm:text-7xl">
              {SITE.storeName}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              A community thrift store in Federal Way. Come shop, donate items, and see the space.
              This page is here so people know the store exists — it is not an online cart.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_20.5rem]">
          <div className="flex flex-col gap-12">
            <StoreGallery photos={gallery} />

            <Card className="overflow-hidden py-0">
              <CardHeader className="pt-6">
                <CardTitle className="font-heading text-2xl font-medium">Find the store</CardTitle>
                <CardDescription>{SITE.fullAddress}</CardDescription>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <iframe
                  title="FOUND IT! Thrift Store map"
                  src={SITE.mapsEmbed}
                  className="h-[380px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </CardContent>
            </Card>
          </div>

          <VisitCard
            hours={content.storeHours}
            mapsUrl={content.links.maps || SITE.mapsShare}
            facebook={content.links.facebook || SITE.facebook}
          />
        </Container>
      </section>
    </OngLayout>
  );
}
