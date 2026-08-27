import { isAdmin } from "@/lib/auth";
import { getClasses, getRegistrations } from "@/lib/storage";

function csvCell(value: string) {
  if (/[",\n]/.test(value)) return `"${value.replaceAll('"', '""')}"`;
  return value;
}

export async function GET() {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const [registrations, classes] = await Promise.all([getRegistrations(), getClasses()]);
  const classTitle = new Map(classes.map((item) => [item.id, item.title]));
  const header = [
    "class",
    "firstName",
    "lastName",
    "email",
    "phone",
    "notes",
    "createdAt",
    "contacted",
  ];
  const rows = registrations
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((entry) =>
      [
        classTitle.get(entry.classId) ?? entry.classId,
        entry.firstName,
        entry.lastName,
        entry.email,
        entry.phone,
        entry.notes,
        entry.createdAt,
        entry.contacted ? "yes" : "no",
      ]
        .map(csvCell)
        .join(","),
    );
  const csv = [header.join(","), ...rows].join("\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="class-registrations.csv"',
    },
  });
}
