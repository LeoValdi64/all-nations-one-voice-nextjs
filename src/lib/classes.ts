import { DEFAULT_CLASS_LOCATION } from "@/lib/constants";

export type ClassStatus = "draft" | "published" | "cancelled";

export type ClassItem = {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  location: string;
  capacity: number | null;
  status: ClassStatus;
  order: number;
};

export type Registration = {
  id: string;
  classId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
  createdAt: string;
  contacted: boolean;
};

export type ClassWithCounts = ClassItem & {
  registeredCount: number;
};

export const emptyClasses: ClassItem[] = [];
export const emptyRegistrations: Registration[] = [];

export function defaultClassDraft(partial?: Partial<ClassItem>): ClassItem {
  const now = new Date();
  const later = new Date(now.getTime() + 90 * 60 * 1000);
  return {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    startsAt: now.toISOString(),
    endsAt: later.toISOString(),
    location: DEFAULT_CLASS_LOCATION,
    capacity: null,
    status: "draft",
    order: 0,
    ...partial,
  };
}

export function isClassOpen(item: ClassWithCounts) {
  if (item.status !== "published") return false;
  if (item.capacity != null && item.registeredCount >= item.capacity) return false;
  return true;
}

export function seatsLeft(item: ClassWithCounts) {
  if (item.capacity == null) return null;
  return Math.max(0, item.capacity - item.registeredCount);
}
