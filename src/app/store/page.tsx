import type { Metadata } from "next";
import { Clock, MapPin, Phone, Store } from "lucide-react";
import OngLayout from "@/components/layout/ong-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE } from "@/lib/constants";
import { getPublicContent, getPublicGallery } from "@/lib/site-queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FOUND IT! Thrift Store | All Nations One Voice",
  description:
    "Visit FOUND IT! Thrift Store in Federal Way. Shop and donate clothing and household goods. Same address as All Nations One Voice.",
};

export default async function StorePage() {
  const [content, photos] = await Promise.all([getPublicContent(), getPublicGallery()]);

  return (
    <OngLayout>
      <section className="px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            All Nations One Voice
          </p>
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-6xl">
            {SITE.storeName}
          </h1>
          <p className="text-lg text-muted-foreground">
            A community thrift store in Federal Way. Come shop, donate items, and see the space.
            This page is here so people know the store exists — it is not an online cart.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={content.links.maps || SITE.mapsShare} target="_blank" rel="noopener noreferrer">
                <MapPin data-icon="inline-start" />
                Get directions
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={content.links.facebook || SITE.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Store />
              <CardTitle>Visit</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              {SITE.addressLine1}
              <br />
              {SITE.cityLine}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Clock />
              <CardTitle>Store hours</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">{content.storeHours}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Phone />
              <CardTitle>Call</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 text-muted-foreground">
              <a href={SITE.phoneHref} className="hover:text-primary">
                {SITE.phone}
              </a>
              <a href={SITE.emailHref} className="hover:text-primary">
                {SITE.email}
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-xl ring-1 ring-foreground/10">
          <iframe
            title="FOUND IT! Thrift Store map"
            src={SITE.mapsEmbed}
            className="h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight">Inside the store</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Photos from the FOUND IT! Facebook page. Inventory changes as items come in and sell.
          </p>
          {photos.length === 0 ? (
            <p className="mt-10 text-muted-foreground">Photos will appear here once they are added.</p>
          ) : (
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo) => (
                <figure key={photo.id} className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
                  <img
                    src={photo.src}
                    alt={photo.caption || "FOUND IT! Thrift Store"}
                    className="aspect-square w-full object-cover"
                  />
                  {photo.caption ? (
                    <figcaption className="px-3 py-2 text-sm text-muted-foreground">
                      {photo.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
    </OngLayout>
  );
}
