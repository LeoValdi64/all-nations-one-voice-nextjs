import { isAdmin } from "@/lib/auth";
import type { Registration } from "@/lib/classes";
import { getRegistrations, saveRegistrations } from "@/lib/storage";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  const body = (await request.json().catch(() => null)) as Partial<Registration> | null;
  const registrations = await getRegistrations();
  const index = registrations.findIndex((entry) => entry.id === id);
  if (index === -1) {
    return Response.json({ error: "Registration not found." }, { status: 404 });
  }
  registrations[index] = { ...registrations[index], ...body, id };
  await saveRegistrations(registrations);
  return Response.json({ registration: registrations[index] });
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  const registrations = await getRegistrations();
  const next = registrations.filter((entry) => entry.id !== id);
  if (next.length === registrations.length) {
    return Response.json({ error: "Registration not found." }, { status: 404 });
  }
  await saveRegistrations(next);
  return Response.json({ ok: true });
}
