import { isAdmin } from "@/lib/auth";
import { getRegistrations } from "@/lib/storage";

export async function GET() {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const registrations = await getRegistrations();
  return Response.json({
    registrations: registrations.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  });
}
