"use client";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "convex/react";
import { CheckCircle2, Loader2, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type User = NonNullable<ReturnType<typeof useAuth>["user"]>;

/** Display-name editor, keyed by user id in the parent so it always
 *  initializes from the freshest user record without an effect. */
function NameForm({ user }: { user: User }) {
  const updateProfile = useMutation(api.users.updateProfile);
  const [name, setName] = useState(user.name ?? "");
  const [saving, setSaving] = useState(false);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      await updateProfile({ name });
      toast.success("Profile updated.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not update profile.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-3 border-t border-border pt-4">
      <div className="space-y-1.5">
        <Label htmlFor="settings-name">display name</Label>
        <Input
          id="settings-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Dana Whitfield"
          maxLength={60}
        />
        <p className="text-[11px] text-muted-foreground">
          Used on certificates, comments, and reviews. Leave blank to fall back
          to your email prefix.
        </p>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 text-[11px] text-term-green">
          <CheckCircle2 className="size-3" />
          changes apply everywhere immediately
        </p>
        <Button
          type="submit"
          size="sm"
          className="gap-1.5 text-xs"
          disabled={saving}
        >
          {saving ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Save className="size-3.5" />
          )}
          save profile
        </Button>
      </div>
    </form>
  );
}

export default function Settings() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path="~/settings" />

      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
        <p className="text-xs text-term-green">
          [ok] account — profile settings
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage the name shown across the academy — on certificates, comments,
          and reviews.
        </p>

        <div className="mt-8 border border-border bg-card">
          <div className="border-b border-border bg-muted px-4 py-2.5">
            <span className="text-xs font-semibold">profile</span>
          </div>
          <div className="space-y-5 px-4 py-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[11px] text-muted-foreground">
                  email
                </Label>
                <p className="truncate text-sm">{user?.email ?? "—"}</p>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-muted-foreground">role</Label>
                <p className="text-sm">
                  {user?.role ?? "user"}
                  {user?.role === "admin" && (
                    <span className="ml-2 border border-term-green/40 bg-term-green/10 px-1 text-[10px] font-medium text-term-green">
                      ADMIN
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-[11px] text-muted-foreground">joined</Label>
              <p className="text-sm">
                {user
                  ? new Date(user._creationTime).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "—"}
              </p>
            </div>

            {user ? <NameForm key={user._id} user={user} /> : null}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          <Button asChild variant="outline" size="sm" className="text-xs">
            <Link href="/dashboard">my sessions</Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="text-xs">
            <Link href="/courses">browse catalog</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
