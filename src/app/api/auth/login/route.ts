import { cookies } from "next/headers";
import { ADMIN_COOKIE, cookieOptions, passwordMatches, sessionToken } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { password?: string } | null;
  const password = body?.password?.trim() ?? "";
  if (!passwordMatches(password)) {
    return Response.json({ error: "Invalid password." }, { status: 401 });
  }
  const token = sessionToken();
  const store = await cookies();
  store.set(ADMIN_COOKIE, token, cookieOptions());
  return Response.json({ ok: true });
}
