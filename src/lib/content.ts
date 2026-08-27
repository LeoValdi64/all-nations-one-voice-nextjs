import { DEFAULT_OFFICE_HOURS, DEFAULT_STORE_HOURS, SITE, mapsUrl } from "@/lib/constants";

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: "monitor" | "heart-handshake" | "store" | "users" | "hand-heart";
};

export type SiteContent = {
  announcement: string;
  hero: {
    title: string;
    subtitle: string;
    body: string;
  };
  mission: {
    title: string;
    body: string;
  };
  about: {
    title: string;
    body: string;
    bullets: string[];
  };
  values: {
    title: string;
    body: string;
  }[];
  services: ServiceItem[];
  officeHours: string;
  storeHours: string;
  links: {
    facebook: string;
    instagram: string;
    maps: string;
    donation: string;
  };
};

export const defaultSiteContent: SiteContent = {
  announcement: "",
  hero: {
    title: "All Nations One Voice",
    subtitle: "a nonprofit organization",
    body: "We walk with neighbors in Federal Way who need a hand — help looking for work, everyday support, and a community thrift store that keeps essentials within reach.",
  },
  mission: {
    title: "Our Mission",
    body: "All Nations One Voice exists to help people in our community find dignity and a next step. We offer computer access and job-search support, practical help for neighbors in need, and FOUND IT! Thrift Store at the same address.",
  },
  about: {
    title: "Who We Are",
    body: "We are a Federal Way nonprofit founded in 2025. Our work is local and practical: sit with someone who is looking for a job, connect people to support, and run FOUND IT! Thrift Store so neighbors can shop, donate, and find what they need.",
    bullets: [
      "Founded in 2025 to serve our Federal Way community",
      "Computer access and one-on-one help looking for work",
      "Support services for neighbors, seniors, and people with disabilities",
      "FOUND IT! Thrift Store — shop and donate at the same location",
    ],
  },
  values: [
    {
      title: "Empowerment",
      body: "We offer tools and time — a computer, a listening ear, a next step — so people can move forward on their own terms.",
    },
    {
      title: "Accessibility",
      body: "Support should be easy to find. We keep our doors, our store, and our contact information clear and local.",
    },
    {
      title: "Dignity",
      body: "Every neighbor has worth. We help in ways that respect people, not programs that do not match what we actually do.",
    },
  ],
  services: [
    {
      id: "job-search",
      title: "Job Search Help",
      description:
        "Use our computers and get one-on-one help writing applications, searching openings, and taking the next step toward work.",
      icon: "monitor",
    },
    {
      id: "support",
      title: "Support Services",
      description:
        "Practical help for neighbors, seniors, and people with disabilities who need a hand with everyday needs.",
      icon: "heart-handshake",
    },
    {
      id: "thrift-store",
      title: "FOUND IT! Thrift Store",
      description:
        "Shop affordable clothing and household goods, or donate items, at our Federal Way store.",
      icon: "store",
    },
  ],
  officeHours: DEFAULT_OFFICE_HOURS,
  storeHours: DEFAULT_STORE_HOURS,
  links: {
    facebook: SITE.facebook,
    instagram: SITE.instagram,
    maps: SITE.mapsShare,
    donation: SITE.donationUrl,
  },
};

export function mergeSiteContent(partial?: Partial<SiteContent> | null): SiteContent {
  if (!partial) return defaultSiteContent;
  return {
    ...defaultSiteContent,
    ...partial,
    hero: { ...defaultSiteContent.hero, ...partial.hero },
    mission: { ...defaultSiteContent.mission, ...partial.mission },
    about: {
      ...defaultSiteContent.about,
      ...partial.about,
      bullets: partial.about?.bullets ?? defaultSiteContent.about.bullets,
    },
    values: partial.values ?? defaultSiteContent.values,
    services: partial.services ?? defaultSiteContent.services,
    links: {
      ...defaultSiteContent.links,
      ...partial.links,
      maps: mapsUrl(partial.links?.maps ?? defaultSiteContent.links.maps),
    },
  };
}
