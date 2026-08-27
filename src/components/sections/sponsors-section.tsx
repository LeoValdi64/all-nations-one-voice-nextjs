import Image from "next/image";
import { Container } from "@/components/layout/container";

const sponsors = [
  {
    id: 1,
    name: "Leonides Abarca",
    url: "https://www.facebook.com/leo.m.artist",
    image: "/images/spons1.webp",
  },
  {
    id: 2,
    name: "G Street Motors",
    url: "https://www.yelp.com/biz/g-street-motors-tacoma",
    image: "/images/spons2.webp",
  },
  {
    id: 3,
    name: "Maritzas Beauty College",
    url: "https://www.maritzasbeautycollege.net",
    image: "/images/spons3.webp",
  },
  {
    id: 4,
    name: "YoelPhotoStudio",
    url: "https://yoelphotostudio.com",
    image: "/images/spons4.webp",
  },
  {
    id: 5,
    name: "LeoValdi",
    url: "https://leovaldi.com",
    image: "/images/spons5.webp",
  },
  {
    id: 6,
    name: "Paco Diaz en la Red",
    url: "https://www.facebook.com/PacoDiazenlaRed/",
    image: "/images/spons6.webp",
  },
  {
    id: 7,
    name: "Kiki Corona",
    url: "#",
    image: "/images/spons6.jpeg",
  },
  {
    id: 8,
    name: "Nalini Jeffords",
    url: "#",
    image: "/images/spons7.jpeg",
  },
  {
    id: 9,
    name: "Nebula Daycare",
    url: "#",
    image: "/images/spons8.jpeg",
  },
];

export function SponsorsSection() {
  return (
    <section className="border-t bg-background">
      <Container className="flex flex-col gap-8 py-14">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
            Community partners
          </p>
          <p className="max-w-lg text-sm text-muted-foreground">
            Neighbors and businesses who help this work stay open.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.url}
              target={sponsor.url === "#" ? undefined : "_blank"}
              rel={sponsor.url === "#" ? undefined : "noopener noreferrer"}
              className="opacity-70 grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={sponsor.image}
                alt={sponsor.name}
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
