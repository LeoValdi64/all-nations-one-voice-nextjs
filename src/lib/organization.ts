import { SITE } from "@/lib/constants";

export const ORG = {
  legalName: SITE.name,
  storeName: SITE.storeName,
  foundedYear: 2025,
  serviceArea: "Federal Way, Washington",
  legalUpdated: "August 27, 2026",
  siteUrl: "https://allnationsonevoice.org",
  funderEmailHref: `${SITE.emailHref}?subject=${encodeURIComponent("Support, grant, or partnership inquiry")}`,
  programsCurrent: [
    {
      id: "job-search",
      title: "Job-search help",
      href: "/contact",
      cta: "Ask for help",
      image: "/images/store/anv-2026-08-books.jpg",
      imageAlt: "Books and a quiet table at FOUND IT! Thrift Store",
      summary:
        "Computer access and one-on-one help writing applications, searching openings, and taking the next step toward work.",
    },
    {
      id: "support",
      title: "Support services",
      href: "/contact",
      cta: "Get support",
      image: "/images/store/anv-2026-19-families.jpg",
      imageAlt: "Families at the store doors",
      summary:
        "Practical help for neighbors, seniors, and people with disabilities who need a hand with everyday needs.",
    },
    {
      id: "thrift-store",
      title: "FOUND IT! Thrift Store",
      href: "/store",
      cta: "Visit the store",
      image: "/images/store/anv-2026-06-aisle.jpg",
      imageAlt: "Aisle inside FOUND IT! Thrift Store",
      summary:
        "Shop affordable clothing and household goods, or donate items, at the same Federal Way address as our office.",
    },
  ],
  programsNotOffered: [
    "GED classes",
    "English as a Second Language classes",
    "Education Access programs",
  ],
  whoWeServe: [
    "Neighbors looking for work who need a computer and one-on-one help",
    "Seniors and people with disabilities who need practical everyday support",
    "Families and neighbors who shop or donate at FOUND IT! Thrift Store",
  ],
  howGiftsAreUsed: [
    "Keep the thrift store open so clothing and household goods stay within reach",
    "Computers and staff time for job-search help",
    "Practical support for neighbors who come to the desk",
    "Community days such as toy giveaways when goods and volunteers are available",
  ],
  nondiscrimination:
    "All Nations One Voice welcomes people of every race, color, national origin, ancestry, language, religion, sex, gender, gender identity, sexual orientation, age, disability, veteran status, immigration status, and family status. We do not turn someone away from the store, the support desk, or a published class because of who they are.",
} as const;
