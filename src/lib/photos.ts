import type { GalleryPhoto } from "@/lib/gallery";

const GRAPHIC_IDS = new Set([
  "fbid-122093597474883611",
  "fbid-122142262898883611",
  "fbid-122151136184883611",
  "fbid-122151137846883611",
  "fbid-122151435896883611",
  "fbid-122151436184883611",
  "fbid-122151437606883611",
  "fbid-122151495386883611",
  "fbid-122151495818883611",
  "fbid-122152785494883611",
]);

const PREFERRED_HERO_IDS = [
  "anv-2026-06-aisle",
  "anv-2026-05-red-gown",
  "fbid-122152091984883611",
  "fbid-122152092014883611",
  "fbid-122151137870883611",
  "fbid-122152092026883611",
];

const PREFERRED_HOME_HERO_IDS = [
  "anv-2026-18-storefront",
  "anv-2026-19-families",
  "anv-2026-06-aisle",
  "anv-2026-05-red-gown",
];

const HOME_TEASER_EXCLUDE = new Set([
  "anv-2026-18-storefront",
  "anv-2026-19-families",
  "anv-2026-17-toy-drive",
  "anv-2026-20-giveaway",
  "anv-2026-01-truck-team",
]);

export function isGraphicPhoto(photo: GalleryPhoto) {
  const src = photo.src.toLowerCase();
  if (src.includes("logo")) return true;
  if (GRAPHIC_IDS.has(photo.id)) return true;
  return false;
}

export function cinematicPhotos(photos: GalleryPhoto[]) {
  return photos.filter((photo) => !isGraphicPhoto(photo));
}

export function pickHeroPhoto(photos: GalleryPhoto[], preferredIds = PREFERRED_HERO_IDS) {
  const cinematic = cinematicPhotos(photos);
  for (const id of preferredIds) {
    const match = cinematic.find((photo) => photo.id === id);
    if (match) return match;
  }
  return cinematic[0] ?? photos[0] ?? null;
}

export function pickHomeHeroPhoto(photos: GalleryPhoto[]) {
  return pickHeroPhoto(photos, PREFERRED_HOME_HERO_IDS);
}

export function pickTeaserPhotos(photos: GalleryPhoto[], count = 6) {
  const hero = pickHomeHeroPhoto(photos);
  const cinematic = cinematicPhotos(photos);
  const rest = cinematic.filter(
    (photo) => photo.id !== hero?.id && !HOME_TEASER_EXCLUDE.has(photo.id),
  );
  const selected = rest.slice(0, count);
  if (selected.length < count && hero) selected.unshift(hero);
  return selected.slice(0, count);
}
