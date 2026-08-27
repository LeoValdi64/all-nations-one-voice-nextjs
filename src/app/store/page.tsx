import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/layout/container";
import OngLayout from "@/components/layout/ong-layout";
import { PhotoFrame } from "@/components/media/photo-frame";
import { Reveal } from "@/components/motion/reveal";
import { StoreGallery } from "@/components/store/store-gallery";
import { VisitCard } from "@/components/store/visit-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapEmbed } from "@/components/media/map-embed";
import { SITE } from "@/lib/constants";
import { cinematicPhotos, pickHeroPhoto } from "@/lib/photos";
import { getPublicContent, getPublicGallery } from "@/lib/site-queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FOUND IT! Thrift Store",
  description:
    "Visit FOUND IT! Thrift Store in Federal Way. Shop and donate clothing and household goods. Same address as All Nations One Voice.",
};

export default async function StorePage() {
  const [content, photos] = await Promise.all([getPublicContent(), getPublicGallery()]);
  const featured = pickHeroPhoto(photos);
  const rest = featured
    ? cinematicPhotos(photos).filter((photo) => photo.id !== featured.id)
    : photos;

  return (
    <OngLayout>
      {featured ? (
        <div className="sm:px-8 sm:pt-6">
          <PhotoFrame
            src={featured.src}
            alt={featured.caption || SITE.storeName}
            sizes="100vw"
            preload
            className="aspect-[4/5] rounded-none sm:aspect-[21/9] sm:rounded-2xl"
          />
        </div>
      ) : null}

      <section className="pt-10 pb-6 sm:pt-16">
        <Container>
          <Reveal className="flex max-w-3xl flex-col gap-4 sm:gap-5">
            <Eyebrow>All Nations One Voice</Eyebrow>
            <h1 className="display-title">{SITE.storeName}</h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A community thrift store in Federal Way. Come shop, donate items, and see the space.
              This page is here so people know the store exists — it is not an online cart.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20.5rem] lg:gap-10">
          <VisitCard
            className="lg:col-start-2 lg:row-start-1"
            hours={content.storeHours}
            mapsUrl={content.links.maps || SITE.mapsShare}
            facebook={content.links.facebook || SITE.facebook}
          />

          <div className="flex flex-col gap-12 lg:col-start-1 lg:row-start-1">
            <StoreGallery photos={rest} />

            <Card className="overflow-hidden py-0">
              <CardHeader className="pt-6">
                <CardTitle className="font-heading text-2xl font-medium">Find the store</CardTitle>
                <CardDescription>{SITE.fullAddress}</CardDescription>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <MapEmbed title="FOUND IT! Thrift Store map" />
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </OngLayout>
  );
}
