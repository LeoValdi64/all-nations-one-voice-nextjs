import { isClassOpen } from "@/lib/classes";
import { getClasses, getRegistrations, saveRegistrations } from "@/lib/storage";

type RouteContext = { params: Promise<{ id: string }> };

function clean(value: unknown) {
  return String(value ?? "").trim();
}

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const firstName = clean(body?.firstName);
  const lastName = clean(body?.lastName);
  const email = clean(body?.email).toLowerCase();
  const phone = clean(body?.phone);
  const notes = clean(body?.notes);

  if (!firstName || !lastName || !email || !phone) {
    return Response.json(
      { error: "First name, last name, email, and phone are required." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const classes = await getClasses();
  const item = classes.find((entry) => entry.id === id);
  if (!item) {
    return Response.json({ error: "That class was not found." }, { status: 404 });
  }

  const registrations = await getRegistrations();
  const registeredCount = registrations.filter((entry) => entry.classId === id).length;
  if (!isClassOpen({ ...item, registeredCount })) {
    return Response.json(
      { error: "This class is not open for registration." },
      { status: 409 },
    );
  }

  const duplicate = registrations.some(
    (entry) => entry.classId === id && entry.email.toLowerCase() === email,
  );
  if (duplicate) {
    return Response.json(
      { error: "That email is already registered for this class." },
      { status: 409 },
    );
  }

  const registration = {
    id: crypto.randomUUID(),
    classId: id,
    firstName,
    lastName,
    email,
    phone,
    notes,
    createdAt: new Date().toISOString(),
    contacted: false,
  };
  await saveRegistrations([...registrations, registration]);
  return Response.json({
    ok: true,
    message: "You are registered. We will contact you at the email or phone you shared.",
  });
}
