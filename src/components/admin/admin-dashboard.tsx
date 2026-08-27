"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { defaultClassDraft, type ClassItem, type ClassStatus, type ClassWithCounts, type Registration } from "@/lib/classes";
import type { SiteContent } from "@/lib/content";
import type { GalleryPhoto } from "@/lib/gallery";
import { fromDateTimeLocal, toDateTimeLocal, formatClassWhen } from "@/lib/format";
import { SITE } from "@/lib/constants";

type Persist = "blob" | "database" | "local" | "readonly";

const ADMIN_TABS = [
  { id: "content", label: "Content" },
  { id: "services", label: "Services" },
  { id: "hours", label: "Hours" },
  { id: "gallery", label: "Store photos" },
  { id: "classes", label: "Classes" },
  { id: "registrations", label: "Registrations" },
] as const;

type AdminTab = (typeof ADMIN_TABS)[number]["id"];

export function AdminDashboard({
  content: initialContent,
  photos: initialPhotos,
  classes: initialClasses,
  registrations: initialRegistrations,
  persist,
}: {
  content: SiteContent;
  photos: GalleryPhoto[];
  classes: ClassWithCounts[];
  registrations: Registration[];
  persist: Persist;
}) {
  const [content, setContent] = useState(initialContent);
  const [photos, setPhotos] = useState(initialPhotos);
  const [classes, setClasses] = useState(initialClasses);
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState<ClassItem>(defaultClassDraft());
  const [tab, setTab] = useState<AdminTab>("content");

  const classTitle = useMemo(
    () => new Map(classes.map((item) => [item.id, item.title])),
    [classes],
  );

  async function saveContent() {
    setSaving(true);
    const response = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      toast.error(payload?.error || "Could not save content.");
      return;
    }
    toast.success("Content saved.");
  }

  async function savePhotos(next: GalleryPhoto[]) {
    setPhotos(next);
    const response = await fetch("/api/gallery", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photos: next }),
    });
    if (!response.ok) {
      toast.error("Could not update photos.");
      return;
    }
    toast.success("Gallery updated.");
  }

  async function uploadPhoto(file: File) {
    const form = new FormData();
    form.set("file", file);
    const response = await fetch("/api/gallery/upload", { method: "POST", body: form });
    const payload = (await response.json().catch(() => null)) as
      | { error?: string; photos?: GalleryPhoto[] }
      | null;
    if (!response.ok) {
      toast.error(payload?.error || "Upload failed.");
      return;
    }
    if (payload?.photos) setPhotos(payload.photos);
    toast.success("Photo uploaded.");
  }

  async function saveClass(item: ClassItem, method: "POST" | "PUT") {
    const url = method === "POST" ? "/api/classes" : `/api/classes/${item.id}`;
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    if (!response.ok) {
      toast.error(payload?.error || "Could not save class.");
      return;
    }
    toast.success(method === "POST" ? "Class created." : "Class updated.");
    const refresh = await fetch("/api/classes");
    const data = (await refresh.json()) as { classes: ClassWithCounts[] };
    setClasses(data.classes);
    if (method === "POST") setDraft(defaultClassDraft());
  }

  async function removeClass(id: string) {
    const response = await fetch(`/api/classes/${id}`, { method: "DELETE" });
    if (!response.ok) {
      toast.error("Could not delete class.");
      return;
    }
    setClasses((current) => current.filter((item) => item.id !== id));
    toast.success("Class deleted.");
  }

  async function patchRegistration(id: string, contacted: boolean) {
    const response = await fetch(`/api/registrations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contacted }),
    });
    if (!response.ok) {
      toast.error("Could not update registration.");
      return;
    }
    setRegistrations((current) =>
      current.map((entry) => (entry.id === id ? { ...entry, contacted } : entry)),
    );
  }

  async function removeRegistration(id: string) {
    const response = await fetch(`/api/registrations/${id}`, { method: "DELETE" });
    if (!response.ok) {
      toast.error("Could not remove registration.");
      return;
    }
    setRegistrations((current) => current.filter((entry) => entry.id !== id));
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b bg-card/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Image src="/images/logo1.webp" alt="" width={44} height={44} className="size-11 rounded-2xl object-cover" />
            <div className="min-w-0">
              <p className="font-heading text-lg leading-tight font-medium">{SITE.name}</p>
              <p className="text-sm text-muted-foreground">
                Admin ·{" "}
                {persist === "blob"
                  ? "Vercel Blob"
                  : persist === "database"
                    ? "saved to database"
                    : persist === "local"
                      ? "local files"
                      : "read-only seed"}
              </p>
            </div>
          </div>
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
            <Badge variant="outline">{persist}</Badge>
            <Button asChild variant="outline" className="h-11 flex-1 sm:flex-none">
              <Link href="/">View site</Link>
            </Button>
            <Button variant="ghost" className="h-11 flex-1 sm:flex-none" onClick={logout}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        {persist === "readonly" ? (
          <Alert className="mb-6">
            <AlertDescription>
              This deployment cannot save uploads or edits until DATABASE_URL or BLOB_READ_WRITE_TOKEN is set.
            </AlertDescription>
          </Alert>
        ) : null}

        <div>
          <div
            role="tablist"
            aria-label="Admin sections"
            className="mb-6 flex h-auto min-h-11 w-full flex-wrap justify-start gap-1 border-b"
          >
            {ADMIN_TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={tab === item.id}
                data-state={tab === item.id ? "active" : "inactive"}
                onClick={() => setTab(item.id)}
                className={cn(
                  "relative h-11 min-h-11 flex-none px-3 text-sm font-medium transition-colors",
                  tab === item.id
                    ? "text-foreground after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:bg-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {tab === "content" ? (
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Homepage copy</CardTitle>
                <CardDescription>These fields appear on the public website.</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="announcement">Announcement banner</FieldLabel>
                    <Input
                      id="announcement"
                      value={content.announcement}
                      onChange={(event) => setContent({ ...content, announcement: event.target.value })}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="hero-title">Hero title</FieldLabel>
                    <Input
                      id="hero-title"
                      value={content.hero.title}
                      onChange={(event) =>
                        setContent({ ...content, hero: { ...content.hero, title: event.target.value } })
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="hero-sub">Hero subtitle</FieldLabel>
                    <Input
                      id="hero-sub"
                      value={content.hero.subtitle}
                      onChange={(event) =>
                        setContent({ ...content, hero: { ...content.hero, subtitle: event.target.value } })
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="hero-body">Hero body</FieldLabel>
                    <Textarea
                      id="hero-body"
                      rows={4}
                      value={content.hero.body}
                      onChange={(event) =>
                        setContent({ ...content, hero: { ...content.hero, body: event.target.value } })
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="mission-title">Mission title</FieldLabel>
                    <Input
                      id="mission-title"
                      value={content.mission.title}
                      onChange={(event) =>
                        setContent({
                          ...content,
                          mission: { ...content.mission, title: event.target.value },
                        })
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="mission-body">Mission body</FieldLabel>
                    <Textarea
                      id="mission-body"
                      rows={5}
                      value={content.mission.body}
                      onChange={(event) =>
                        setContent({
                          ...content,
                          mission: { ...content.mission, body: event.target.value },
                        })
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="about-body">About body</FieldLabel>
                    <Textarea
                      id="about-body"
                      rows={5}
                      value={content.about.body}
                      onChange={(event) =>
                        setContent({ ...content, about: { ...content.about, body: event.target.value } })
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="about-bullets">About bullets (one per line)</FieldLabel>
                    <Textarea
                      id="about-bullets"
                      rows={5}
                      value={content.about.bullets.join("\n")}
                      onChange={(event) =>
                        setContent({
                          ...content,
                          about: {
                            ...content.about,
                            bullets: event.target.value.split("\n").filter(Boolean),
                          },
                        })
                      }
                    />
                  </Field>
                  <Button onClick={saveContent} disabled={saving}>
                    {saving ? "Saving…" : "Save content"}
                  </Button>
                </FieldGroup>
              </CardContent>
            </Card>
          </div>
          ) : null}

          {tab === "services" ? (
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Services</CardTitle>
                <CardDescription>Add, edit, or remove the service cards on the home page.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                {content.services.map((service, index) => (
                  <div key={service.id} className="flex flex-col gap-3 rounded-xl border p-4">
                    <FieldGroup>
                      <Field>
                        <FieldLabel>Title</FieldLabel>
                        <Input
                          value={service.title}
                          onChange={(event) => {
                            const services = [...content.services];
                            services[index] = { ...service, title: event.target.value };
                            setContent({ ...content, services });
                          }}
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Description</FieldLabel>
                        <Textarea
                          rows={3}
                          value={service.description}
                          onChange={(event) => {
                            const services = [...content.services];
                            services[index] = { ...service, description: event.target.value };
                            setContent({ ...content, services });
                          }}
                        />
                      </Field>
                    </FieldGroup>
                    <Button
                      variant="destructive"
                      onClick={() =>
                        setContent({
                          ...content,
                          services: content.services.filter((item) => item.id !== service.id),
                        })
                      }
                    >
                      Remove service
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() =>
                    setContent({
                      ...content,
                      services: [
                        ...content.services,
                        {
                          id: crypto.randomUUID(),
                          title: "New service",
                          description: "",
                          icon: "users",
                        },
                      ],
                    })
                  }
                >
                  Add service
                </Button>
                <Button onClick={saveContent} disabled={saving}>
                  {saving ? "Saving…" : "Save services"}
                </Button>
              </CardContent>
            </Card>
          </div>
          ) : null}

          {tab === "hours" ? (
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Hours and links</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="office-hours">Office hours</FieldLabel>
                    <Input
                      id="office-hours"
                      value={content.officeHours}
                      onChange={(event) => setContent({ ...content, officeHours: event.target.value })}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="store-hours">Store hours</FieldLabel>
                    <Input
                      id="store-hours"
                      value={content.storeHours}
                      onChange={(event) => setContent({ ...content, storeHours: event.target.value })}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="facebook">Facebook URL</FieldLabel>
                    <Input
                      id="facebook"
                      value={content.links.facebook}
                      onChange={(event) =>
                        setContent({
                          ...content,
                          links: { ...content.links, facebook: event.target.value },
                        })
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="maps">Maps URL</FieldLabel>
                    <Input
                      id="maps"
                      value={content.links.maps}
                      onChange={(event) =>
                        setContent({ ...content, links: { ...content.links, maps: event.target.value } })
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="donation">Donation URL</FieldLabel>
                    <Input
                      id="donation"
                      value={content.links.donation}
                      onChange={(event) =>
                        setContent({
                          ...content,
                          links: { ...content.links, donation: event.target.value },
                        })
                      }
                    />
                  </Field>
                  <Button onClick={saveContent} disabled={saving}>
                    {saving ? "Saving…" : "Save hours"}
                  </Button>
                </FieldGroup>
              </CardContent>
            </Card>
          </div>
          ) : null}

          {tab === "gallery" ? (
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Store photos</CardTitle>
                <CardDescription>Hide, caption, reorder, or upload photos for /store.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <Field>
                  <FieldLabel htmlFor="upload">Upload photo</FieldLabel>
                  <Input
                    id="upload"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) void uploadPhoto(file);
                      event.target.value = "";
                    }}
                  />
                </Field>
                <div className="grid gap-4 md:grid-cols-2">
                  {photos
                    .slice()
                    .sort((a, b) => a.order - b.order)
                    .map((photo) => (
                      <div key={photo.id} className="flex flex-col gap-3 rounded-xl border p-3">
                        <Image src={photo.src} alt="" width={640} height={160} className="h-40 w-full rounded-lg object-cover" />
                        <Input
                          value={photo.caption}
                          placeholder="Caption"
                          onChange={(event) =>
                            setPhotos((current) =>
                              current.map((item) =>
                                item.id === photo.id ? { ...item, caption: event.target.value } : item,
                              ),
                            )
                          }
                        />
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={photo.visible}
                            onCheckedChange={(checked) =>
                              setPhotos((current) =>
                                current.map((item) =>
                                  item.id === photo.id ? { ...item, visible: Boolean(checked) } : item,
                                ),
                              )
                            }
                          />
                          <span className="text-sm">Visible</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() =>
                              setPhotos((current) =>
                                current.map((item) =>
                                  item.id === photo.id ? { ...item, order: item.order - 1 } : item,
                                ),
                              )
                            }
                          >
                            Up
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() =>
                              setPhotos((current) =>
                                current.map((item) =>
                                  item.id === photo.id ? { ...item, order: item.order + 1 } : item,
                                ),
                              )
                            }
                          >
                            Down
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
                <Button onClick={() => void savePhotos(photos)}>Save gallery</Button>
              </CardContent>
            </Card>
          </div>
          ) : null}

          {tab === "classes" ? (
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>New class</CardTitle>
                <CardDescription>Drafts stay hidden until you publish them.</CardDescription>
              </CardHeader>
              <CardContent>
                <ClassFields value={draft} onChange={setDraft} />
                <Button className="mt-4" onClick={() => void saveClass(draft, "POST")}>
                  Create class
                </Button>
              </CardContent>
            </Card>

            {classes.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle>{item.title || "Untitled"}</CardTitle>
                    <Badge variant="secondary">{item.status}</Badge>
                    <Badge variant="outline">{item.registeredCount} registered</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <ClassFields
                    value={item}
                    onChange={(next) =>
                      setClasses((current) => current.map((entry) => (entry.id === item.id ? { ...entry, ...next } : entry)))
                    }
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => void saveClass(item, "PUT")}>Save class</Button>
                    <Button variant="destructive" onClick={() => void removeClass(item.id)}>
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          ) : null}

          {tab === "registrations" ? (
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Registrations</CardTitle>
                <CardDescription>People who signed up from the public Classes page.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="h-11 w-full sm:w-fit"
                  onClick={() => {
                    window.location.href = "/api/registrations/export";
                  }}
                >
                  Export CSV
                </Button>
                {registrations.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No registrations yet.</p>
                ) : null}
                <div className="flex flex-col gap-3 md:hidden">
                  {registrations.map((entry) => (
                    <div key={entry.id} className="flex flex-col gap-3 rounded-xl border bg-background p-4">
                      <div className="flex flex-col gap-1">
                        <p className="font-heading text-lg font-medium">
                          {entry.firstName} {entry.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {classTitle.get(entry.classId) ?? "Removed class"}
                        </p>
                      </div>
                      <a href={`mailto:${entry.email}`} className="text-sm break-all">
                        {entry.email}
                      </a>
                      <a href={`tel:${entry.phone}`} className="text-sm">
                        {entry.phone}
                      </a>
                      <p className="text-sm text-muted-foreground">{formatClassWhen(entry.createdAt)}</p>
                      <label className="flex min-h-11 items-center gap-2 text-sm">
                        <Checkbox
                          checked={entry.contacted}
                          onCheckedChange={(checked) => void patchRegistration(entry.id, Boolean(checked))}
                        />
                        Contacted
                      </label>
                      <Button variant="ghost" className="h-11" onClick={() => void removeRegistration(entry.id)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="hidden overflow-x-auto md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>When</TableHead>
                      <TableHead>Contacted</TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrations.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>{classTitle.get(entry.classId) ?? "Removed class"}</TableCell>
                        <TableCell>
                          {entry.firstName} {entry.lastName}
                        </TableCell>
                        <TableCell>{entry.email}</TableCell>
                        <TableCell>{entry.phone}</TableCell>
                        <TableCell>{formatClassWhen(entry.createdAt)}</TableCell>
                        <TableCell>
                          <Checkbox
                            checked={entry.contacted}
                            onCheckedChange={(checked) => void patchRegistration(entry.id, Boolean(checked))}
                          />
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" onClick={() => void removeRegistration(entry.id)}>
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              </CardContent>
            </Card>
          </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

function ClassFields({
  value,
  onChange,
}: {
  value: ClassItem;
  onChange: (value: ClassItem) => void;
}) {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel>Title</FieldLabel>
        <Input value={value.title} onChange={(event) => onChange({ ...value, title: event.target.value })} />
      </Field>
      <Field>
        <FieldLabel>Description</FieldLabel>
        <Textarea
          rows={3}
          value={value.description}
          onChange={(event) => onChange({ ...value, description: event.target.value })}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel>Starts</FieldLabel>
          <Input
            type="datetime-local"
            value={toDateTimeLocal(value.startsAt)}
            onChange={(event) => onChange({ ...value, startsAt: fromDateTimeLocal(event.target.value) })}
          />
        </Field>
        <Field>
          <FieldLabel>Ends</FieldLabel>
          <Input
            type="datetime-local"
            value={toDateTimeLocal(value.endsAt)}
            onChange={(event) => onChange({ ...value, endsAt: fromDateTimeLocal(event.target.value) })}
          />
        </Field>
      </div>
      <Field>
        <FieldLabel>Location</FieldLabel>
        <Input value={value.location} onChange={(event) => onChange({ ...value, location: event.target.value })} />
      </Field>
      <Field>
        <FieldLabel>Capacity (empty = unlimited)</FieldLabel>
        <Input
          type="number"
          min={1}
          value={value.capacity ?? ""}
          onChange={(event) =>
            onChange({
              ...value,
              capacity: event.target.value ? Number(event.target.value) : null,
            })
          }
        />
      </Field>
      <Field>
        <FieldLabel>Status</FieldLabel>
        <Select
          value={value.status}
          onValueChange={(status) => onChange({ ...value, status: status as ClassStatus })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </FieldGroup>
  );
}
