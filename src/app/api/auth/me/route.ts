import { isAdmin } from "@/lib/auth";
import { persistHint } from "@/lib/storage";

export async function GET() {
  const admin = await isAdmin();
  return Response.json({
    admin,
    persist: persistHint(),
  });
}
