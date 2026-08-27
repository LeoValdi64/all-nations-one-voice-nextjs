"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { isClassOpen, seatsLeft, type ClassWithCounts } from "@/lib/classes";
import { formatClassWhen } from "@/lib/format";
import { cn } from "@/lib/utils";

export function RegisterDialog({ item }: { item: ClassWithCounts }) {
  const [pending, setPending] = useState(false);
  const openClass = isClassOpen(item);
  const left = seatsLeft(item);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch(`/api/classes/${item.id}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: form.get("firstName"),
        lastName: form.get("lastName"),
        email: form.get("email"),
        phone: form.get("phone"),
        notes: form.get("notes"),
      }),
    });
    const payload = (await response.json().catch(() => null)) as { error?: string; message?: string } | null;
    setPending(false);
    if (!response.ok) {
      toast.error(payload?.error || "Could not register.");
      return;
    }
    toast.success(payload?.message || "You are registered.");
    event.currentTarget.reset();
    const details = event.currentTarget.closest("details");
    if (details) details.open = false;
  }

  if (!openClass) {
    return (
      <Button disabled className="h-11">
        Registration closed
      </Button>
    );
  }

  return (
    <details className="w-full">
      <summary
        className={cn(
          buttonVariants({ size: "lg" }),
          "h-11 w-full cursor-pointer list-none sm:w-auto [&::-webkit-details-marker]:hidden",
        )}
      >
        Register
      </summary>
      <form
        action={`/api/classes/${item.id}/register`}
        method="post"
        onSubmit={onSubmit}
        className="mt-4 flex flex-col gap-4 rounded-xl border bg-card p-4"
      >
        <p className="text-sm text-muted-foreground">
          {formatClassWhen(item.startsAt, item.endsAt)}.{" "}
          {left == null ? "Open seats." : `${left} seat${left === 1 ? "" : "s"} left.`}
        </p>
        <FieldGroup>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor={`first-${item.id}`}>First name</FieldLabel>
              <Input id={`first-${item.id}`} name="firstName" required />
            </Field>
            <Field>
              <FieldLabel htmlFor={`last-${item.id}`}>Last name</FieldLabel>
              <Input id={`last-${item.id}`} name="lastName" required />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor={`email-${item.id}`}>Email</FieldLabel>
            <Input id={`email-${item.id}`} name="email" type="email" required />
          </Field>
          <Field>
            <FieldLabel htmlFor={`phone-${item.id}`}>Phone</FieldLabel>
            <Input id={`phone-${item.id}`} name="phone" type="tel" required />
          </Field>
          <Field>
            <FieldLabel htmlFor={`notes-${item.id}`}>Notes</FieldLabel>
            <Textarea id={`notes-${item.id}`} name="notes" rows={3} />
          </Field>
        </FieldGroup>
        <Button type="submit" className="h-11" disabled={pending}>
          {pending ? "Submitting…" : "Submit registration"}
        </Button>
      </form>
    </details>
  );
}
