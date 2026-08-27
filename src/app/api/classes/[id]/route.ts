import { isAdmin } from "@/lib/auth";
import type { ClassItem, ClassStatus } from "@/lib/classes";
import { getClasses, saveClasses } from "@/lib/storage";

const STATUSES: ClassStatus[] = ["draft", "published", "cancelled"];

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: RouteContext) {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  const body = (await request.json().catch(() => null)) as Partial<ClassItem> | null;
  if (!body) {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (body.status && !STATUSES.includes(body.status)) {
    return Response.json({ error: "Invalid status." }, { status: 400 });
  }
  const classes = await getClasses();
  const index = classes.findIndex((item) => item.id === id);
  if (index === -1) {
    return Response.json({ error: "Class not found." }, { status: 404 });
  }
  const next = {
    ...classes[index],
    ...body,
    id,
    title: (body.title ?? classes[index].title).trim(),
    description: (body.description ?? classes[index].description).trim(),
  };
  classes[index] = next;
  await saveClasses(classes);
  return Response.json({ class: next, classes });
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  const classes = await getClasses();
  const next = classes.filter((item) => item.id !== id);
  if (next.length === classes.length) {
    return Response.json({ error: "Class not found." }, { status: 404 });
  }
  await saveClasses(next);
  return Response.json({ classes: next });
}
