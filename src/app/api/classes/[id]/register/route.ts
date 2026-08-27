import { redirect } from "next/navigation";
import { isClassOpen } from "@/lib/classes";
import { getClasses, getRegistrations, saveRegistrations } from "@/lib/storage";

type RouteContext = { params: Promise<{ id: string }> };

function clean(value: unknown) {
  return String(value ?? "").trim();
}

async function readFields(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return (await request.json().catch(() => null)) as Record<string, unknown> | null;
  }
  const form = await request.formData().catch(() => null);
  if (!form) return null;
  return {
    firstName: form.get("firstName"),
    lastName: form.get("lastName"),
    email: form.get("email"),
    phone: form.get("phone"),
    notes: form.get("notes"),
  };
}

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const wantsRedirect =
    (request.headers.get("content-type") || "").includes("application/x-www-form-urlencoded") ||
    (request.headers.get("content-type") || "").includes("multipart/form-data") ||
    (request.headers.get("accept") || "").includes("text/html");
  const body = await readFields(request);
  const firstName = clean(body?.firstName);
  const lastName = clean(body?.lastName);
  const email = clean(body?.email).toLowerCase();
  const phone = clean(body?.phone);
  const notes = clean(body?.notes);

  const fail = (error: string, status: number) => {
    if (wantsRedirect) redirect("/classes?error=1");
    return Response.json({ error }, { status });
  };

  if (!firstName || !lastName || !email || !phone) {
    return fail("First name, last name, email, and phone are required.", 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return fail("Enter a valid email address.", 400);
  }

  const classes = await getClasses();
  const item = classes.find((entry) => entry.id === id);
  if (!item) {
    return fail("That class was not found.", 404);
  }

  const registrations = await getRegistrations();
  const registeredCount = registrations.filter((entry) => entry.classId === id).length;
  if (!isClassOpen({ ...item, registeredCount })) {
    return fail("This class is not open for registration.", 409);
  }

  const duplicate = registrations.some(
    (entry) => entry.classId === id && entry.email.toLowerCase() === email,
  );
  if (duplicate) {
    return fail("That email is already registered for this class.", 409);
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
  if (wantsRedirect) redirect("/classes?registered=1");
  return Response.json({
    ok: true,
    message: "You are registered. We will contact you at the email or phone you shared.",
  });
}
