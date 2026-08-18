import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "convex/react";
import { Bell, LogOut } from "lucide-react";
import { Link } from "react-router";

export function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="inline-block size-3.5 bg-term-green" />
      <span className="text-sm font-semibold tracking-tight">
        AgriSkills
        <span className="ml-1 font-normal text-muted-foreground">Academy</span>
      </span>
      <span className="hidden text-xs text-muted-foreground sm:inline">
        v1.0
      </span>
    </Link>
  );
}

/**
 * Shared top bar for the app shell. Shows the brand, a path label, primary
 * navigation, and the current sign-in state.
 */
export function AppHeader({ path }: { path?: string }) {
  const { user, isAuthenticated, signOut } = useAuth();
  const notifications = useQuery(
    api.inapp.myNotifications,
    isAuthenticated ? {} : "skip",
  );
  const unread = notifications?.unread ?? 0;

  const handleSignOut = async () => {
    await signOut();
    // The RequireAuth wrapper will bounce signed-out users to /auth on any
    // protected page; landing is always public.
    window.location.href = "/";
  };

  const isAdmin = user?.role === "admin";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-4">
          <Brand />
          {path && (
            <span className="hidden truncate text-xs text-muted-foreground md:inline">
              {path}
            </span>
          )}
        </div>

        <nav className="hidden items-center gap-5 text-xs text-muted-foreground md:flex">
          <Link
            to="/courses"
            className="transition-colors hover:text-foreground"
          >
            ./catalog
          </Link>
          <Link
            to="/instructors"
            className="transition-colors hover:text-foreground"
          >
            ./instructors
          </Link>
          <Link
            to="/bundles"
            className="transition-colors hover:text-foreground"
          >
            ./bundles
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="transition-colors hover:text-foreground"
            >
              ./my-sessions
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/study"
              className="transition-colors hover:text-foreground"
            >
              ./study-plan
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/analytics"
              className="transition-colors hover:text-foreground"
            >
              ./analytics
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/exports"
              className="transition-colors hover:text-foreground"
            >
              ./exports
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/flashcards"
              className="transition-colors hover:text-foreground"
            >
              ./flashcards
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/learning-paths"
              className="transition-colors hover:text-foreground"
            >
              ./paths
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/certificates"
              className="transition-colors hover:text-foreground"
            >
              ./certificates
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/settings"
              className="transition-colors hover:text-foreground"
            >
              ./settings
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin"
              className="transition-colors hover:text-foreground"
            >
              ./admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <span className="hidden max-w-44 truncate text-xs text-muted-foreground lg:inline">
                {user?.email ?? user?.name ?? "student"}
              </span>
              <Link
                to="/notifications"
                className="relative flex size-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-term-green/50 hover:text-foreground"
                aria-label="notifications"
              >
                <Bell className="size-3.5" />
                {unread > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center border border-background bg-term-green text-[9px] font-bold text-background">
                    {unread > 9 ? "9+" : unread}
                  </span>
                )}
              </Link>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2 text-xs"
                onClick={handleSignOut}
              >
                <LogOut className="size-3.5" />
                sign_out
              </Button>
            </>
          ) : (
            <Button asChild variant="outline" size="sm" className="text-xs">
              <Link to="/auth">
                <span className="text-term-green">$</span> sign_in
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
