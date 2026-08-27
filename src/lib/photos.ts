import type { GalleryPhoto } from "@/lib/gallery";

const GRAPHIC_IDS = new Set([
  "fbid-122151136184883611",
  "fbid-122151137846883611",
  "fbid-122151435896883611",
]);

const PREFERRED_HERO_IDS = [
  "fbid-122152091984883611",
  "fbid-122152092014883611",
  "fbid-122151137870883611",
  "fbid-122152092026883611",
];

export function isGraphicPhoto(photo: GalleryPhoto) {
  const src = photo.src.toLowerCase();
  if (src.includes("logo")) return true;
  if (GRAPHIC_IDS.has(photo.id)) return true;
  return false;
}

export function cinematicPhotos(photos: GalleryPhoto[]) {
  return photos.filter((photo) => !isGraphicPhoto(photo));
}

export function pickHeroPhoto(photos: GalleryPhoto[]) {
  const cinematic = cinematicPhotos(photos);
  for (const id of PREFERRED_HERO_IDS) {
    const match = cinematic.find((photo) => photo.id === id);
    if (match) return match;
  }
  return cinematic[0] ?? photos[0] ?? null;
}

export function pickTeaserPhotos(photos: GalleryPhoto[], count = 4) {
  const hero = pickHeroPhoto(photos);
  const cinematic = cinematicPhotos(photos);
  const rest = cinematic.filter((photo) => photo.id !== hero?.id);
  const selected = rest.slice(0, count);
  if (selected.length < count && hero) selected.unshift(hero);
  return selected.slice(0, count);
}
