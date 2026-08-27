import { Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SITE } from "@/lib/constants";

export function VisitCard({
  hours,
  mapsUrl,
  facebook,
}: {
  hours: string;
  mapsUrl: string;
  facebook: string;
}) {
  return (
    <Card className="lg:sticky lg:top-28">
      <CardHeader>
        <p className="text-[0.7rem] font-semibold tracking-[0.18em] text-primary uppercase">
          Plan a visit
        </p>
        <CardTitle className="font-heading text-2xl font-medium">{SITE.storeName}</CardTitle>
        <CardDescription>Come shop or donate items in person. There is no online cart.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <Separator />
        <div className="flex gap-3">
          <MapPin className="mt-0.5 size-4 text-primary" />
          <p className="text-sm leading-relaxed">
            {SITE.addressLine1}
            <br />
            {SITE.cityLine}
          </p>
        </div>
        <div className="flex gap-3">
          <Clock className="mt-0.5 size-4 text-primary" />
          <p className="text-sm leading-relaxed">{hours}</p>
        </div>
        <div className="flex gap-3">
          <Phone className="mt-0.5 size-4 text-primary" />
          <div className="flex flex-col gap-1 text-sm">
            <a href={SITE.phoneHref} className="hover:text-primary">
              {SITE.phone}
            </a>
            <a href={SITE.emailHref} className="hover:text-primary">
              {SITE.email}
            </a>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-2">
        <Button asChild>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
            Get directions
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
