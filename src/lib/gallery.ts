export type GalleryPhoto = {
  id: string;
  src: string;
  caption: string;
  visible: boolean;
  order: number;
  source?: string;
  fbid?: string;
};

export function sortPhotos(photos: GalleryPhoto[]) {
  return [...photos].sort((a, b) => a.order - b.order);
}

export function visiblePhotos(photos: GalleryPhoto[]) {
  return sortPhotos(photos).filter((photo) => photo.visible);
}
