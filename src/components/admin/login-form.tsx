"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SITE } from "@/lib/constants";

export function LoginForm({ configured }: { configured: boolean }) {
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: form.get("password") }),
    });
    setPending(false);
    if (!response.ok) {
      toast.error("That password is not correct.");
      return;
    }
    window.location.reload();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{SITE.name} admin</CardTitle>
          <CardDescription>
            Edit website copy, store photos, classes, and registrations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {configured ? (
            <form onSubmit={onSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="password" name="password" type="password" required autoFocus />
                </Field>
                <Button type="submit" disabled={pending}>
                  {pending ? "Signing in…" : "Sign in"}
                </Button>
              </FieldGroup>
            </form>
          ) : (
            <p className="text-sm text-muted-foreground">
              Set the ADMIN_PASSWORD environment variable on Vercel before this login can work.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
