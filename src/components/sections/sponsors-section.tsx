import React from "react";

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

const firstRow = sponsors.slice(0, 4);
const secondRow = sponsors.slice(4);

export function SponsorsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Our Sponsors
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Organizations and institutions that support our global mission.
          </p>
        </div>

        <div className="mt-16 flex flex-col items-center space-y-16">
          <div className="flex flex-wrap justify-center gap-16 w-full">
            {firstRow.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className="max-h-40 max-w-full object-contain"
                />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-16 w-full">
            {secondRow.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className="max-h-40 max-w-full object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
