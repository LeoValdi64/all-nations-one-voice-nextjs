export function formatClassWhen(startsAt: string, endsAt?: string) {
  const start = new Date(startsAt);
  if (Number.isNaN(start.getTime())) return startsAt;
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Los_Angeles",
  };
  const startLabel = new Intl.DateTimeFormat("en-US", options).format(start);
  if (!endsAt) return startLabel;
  const end = new Date(endsAt);
  if (Number.isNaN(end.getTime())) return startLabel;
  const sameDay = start.toDateString() === end.toDateString();
  if (sameDay) {
    const endTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Los_Angeles",
    }).format(end);
    return `${startLabel} – ${endTime}`;
  }
  return `${startLabel} – ${new Intl.DateTimeFormat("en-US", options).format(end)}`;
}

export function toDateTimeLocal(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
}

export function fromDateTimeLocal(value: string) {
  if (!value) return new Date().toISOString();
  return new Date(value).toISOString();
}
