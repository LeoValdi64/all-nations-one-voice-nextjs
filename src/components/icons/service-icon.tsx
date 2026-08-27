import { HeartHandshake, Monitor, Store, Users, Heart } from "lucide-react";
import type { ServiceItem } from "@/lib/content";

const icons = {
  monitor: Monitor,
  "heart-handshake": HeartHandshake,
  store: Store,
  users: Users,
  "hand-heart": Heart,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: ServiceItem["icon"];
  className?: string;
}) {
  const Icon = icons[name] ?? HeartHandshake;
  return <Icon className={className} />;
}
