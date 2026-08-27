"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { isClassOpen, seatsLeft, type ClassWithCounts } from "@/lib/classes";
import { formatClassWhen } from "@/lib/format";

export function RegisterDialog({ item }: { item: ClassWithCounts }) {
  const [open, setOpen] = useState(false);
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
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={!openClass}>{openClass ? "Register" : "Registration closed"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register for {item.title}</DialogTitle>
          <DialogDescription>
            {formatClassWhen(item.startsAt, item.endsAt)}.{" "}
            {left == null ? "Open seats." : `${left} seat${left === 1 ? "" : "s"} left.`}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? "Submitting…" : "Submit registration"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
