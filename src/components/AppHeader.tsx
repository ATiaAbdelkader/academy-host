import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { LogOut } from "lucide-react";
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
