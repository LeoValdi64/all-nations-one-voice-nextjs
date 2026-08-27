"use client";

import { useState } from "react";
import { toast } from "sonner";
import { SiteMark } from "@/components/brand/site-mark";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SITE } from "@/lib/constants";

export function LoginForm({ configured, failed = false }: { configured: boolean; failed?: boolean }) {
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
    window.location.assign("/admin");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="gap-4">
          <SiteMark href="/" compact />
          <div className="flex flex-col gap-1.5">
            <CardTitle className="font-heading text-2xl">
              <h1 className="font-heading text-2xl font-medium leading-tight">{SITE.name} admin</h1>
            </CardTitle>
            <CardDescription>
              Edit website copy, store photos, classes, and registrations.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {configured ? (
            <form action="/api/auth/login" method="post" onSubmit={onSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="password" name="password" type="password" required autoFocus />
                </Field>
                {failed ? (
                  <p className="text-sm text-destructive">That password is not correct.</p>
                ) : null}
                <Button type="submit" size="lg" disabled={pending}>
                  {pending ? "Signing in…" : "Sign in"}
                </Button>
              </FieldGroup>
            </form>
          ) : (
            <p className="text-sm text-muted-foreground">
              Admin login is not configured yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
