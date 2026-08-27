import { isClassOpen, type ClassWithCounts } from "@/lib/classes";
import { getClasses, getGallery, getRegistrations, getSiteContent } from "@/lib/storage";
import { visiblePhotos } from "@/lib/gallery";

export async function getPublicContent() {
  return getSiteContent();
}

export async function getPublicGallery() {
  return visiblePhotos(await getGallery());
}

export async function getClassesWithCounts(): Promise<ClassWithCounts[]> {
  const [classes, registrations] = await Promise.all([getClasses(), getRegistrations()]);
  return classes
    .map((item) => ({
      ...item,
      registeredCount: registrations.filter((registration) => registration.classId === item.id)
        .length,
    }))
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt) || a.order - b.order);
}

export async function getPublishedClasses() {
  return (await getClassesWithCounts()).filter((item) => item.status === "published");
}

export async function getUpcomingPublishedClasses(limit = 3) {
  const now = Date.now();
  return (await getPublishedClasses())
    .filter((item) => {
      const end = Date.parse(item.endsAt || item.startsAt);
      return Number.isNaN(end) || end >= now;
    })
    .slice(0, limit);
}

export { isClassOpen };
