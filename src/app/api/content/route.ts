import { isAdmin } from "@/lib/auth";
import { mergeSiteContent, type SiteContent } from "@/lib/content";
import { getSiteContent, persistHint, saveSiteContent } from "@/lib/storage";

export async function GET() {
  return Response.json({ content: await getSiteContent(), persist: persistHint() });
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as Partial<SiteContent> | null;
  if (!body) {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const content = mergeSiteContent(body);
  await saveSiteContent(content);
  return Response.json({ content });
}
