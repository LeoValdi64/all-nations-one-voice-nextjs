import { getAdminPassword, isAdmin } from "@/lib/auth";
import { persistHint } from "@/lib/storage";
import { LoginForm } from "@/components/admin/login-form";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { getClassesWithCounts } from "@/lib/site-queries";
import { getGallery, getRegistrations, getSiteContent } from "@/lib/storage";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = await isAdmin();
  if (!admin) {
    return <LoginForm configured={Boolean(getAdminPassword())} />;
  }

  const [content, photos, classes, registrations] = await Promise.all([
    getSiteContent(),
    getGallery(),
    getClassesWithCounts(),
    getRegistrations(),
  ]);

  return (
    <AdminDashboard
      content={content}
      photos={photos}
      classes={classes}
      registrations={registrations}
      persist={persistHint()}
    />
  );
}
