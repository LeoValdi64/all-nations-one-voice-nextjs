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
    <section className="bg-muted/40 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight">Our sponsors</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Neighbors and businesses who help this work stay open.
          </p>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-10">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.url}
              target={sponsor.url === "#" ? undefined : "_blank"}
              rel={sponsor.url === "#" ? undefined : "noopener noreferrer"}
              className="transition-transform hover:scale-105"
            >
              <img
                src={sponsor.image}
                alt={sponsor.name}
                className="max-h-28 w-auto object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
