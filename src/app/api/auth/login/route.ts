import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, cookieOptions, passwordMatches, sessionToken } from "@/lib/auth";

async function readPassword(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = (await request.json().catch(() => null)) as { password?: string } | null;
    return body?.password?.trim() ?? "";
  }
  const form = await request.formData().catch(() => null);
  return String(form?.get("password") ?? "").trim();
}

export async function POST(request: Request) {
  const password = await readPassword(request);
  const wantsRedirect =
    (request.headers.get("content-type") || "").includes("application/x-www-form-urlencoded") ||
    (request.headers.get("content-type") || "").includes("multipart/form-data") ||
    (request.headers.get("accept") || "").includes("text/html");

  if (!passwordMatches(password)) {
    if (wantsRedirect) redirect("/admin?error=1");
    return Response.json({ error: "Invalid password." }, { status: 401 });
  }

  const token = sessionToken();
  const store = await cookies();
  store.set(ADMIN_COOKIE, token, cookieOptions());

  if (wantsRedirect) redirect("/admin");
  return Response.json({ ok: true });
}
