import { isAdmin } from "@/lib/auth";
import { defaultClassDraft, type ClassItem, type ClassStatus } from "@/lib/classes";
import { getClasses, saveClasses } from "@/lib/storage";
import { getClassesWithCounts, getPublishedClasses } from "@/lib/site-queries";

const STATUSES: ClassStatus[] = ["draft", "published", "cancelled"];

export async function GET() {
  const admin = await isAdmin();
  const classes = admin ? await getClassesWithCounts() : await getPublishedClasses();
  return Response.json({ classes });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as Partial<ClassItem> | null;
  if (!body?.title?.trim()) {
    return Response.json({ error: "Title is required." }, { status: 400 });
  }
  if (body.status && !STATUSES.includes(body.status)) {
    return Response.json({ error: "Invalid status." }, { status: 400 });
  }
  const existing = await getClasses();
  const created = defaultClassDraft({
    ...body,
    title: body.title.trim(),
    description: body.description?.trim() ?? "",
    location: body.location?.trim() || defaultClassDraft().location,
    capacity: body.capacity ?? null,
    order: body.order ?? existing.length,
  });
  const classes = [...existing, created];
  await saveClasses(classes);
  return Response.json({ class: created, classes });
}
