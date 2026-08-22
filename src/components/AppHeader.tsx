"use client";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "convex/react";
import {
  Bell,
  Leaf,
  LogOut,
  Menu,
  ChevronDown,
  X,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-xl bg-agri-green shadow-md">
        <Leaf className="size-5 text-white" />
      </span>
      <span className="text-base font-bold tracking-tight">
        AgriSkills
        <span className="ml-1.5 font-normal text-muted-foreground">Academy</span>
      </span>
    </Link>
  );
}

function MobileNav({
  open,
  onClose,
  isAuthenticated,
  isAdmin,
}: {
  open: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 h-full w-72 overflow-y-auto glass-card rounded-l-2xl shadow-2xl md:hidden animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
          <Brand />
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-accent transition-colors">
            <X className="size-5" />
          </button>
        </div>
        <nav className="flex flex-col p-3 gap-0.5">
          <MobileLink href="/courses" onClick={onClose}>Catalog</MobileLink>
          <MobileLink href="/instructors" onClick={onClose}>Instructors</MobileLink>
          <MobileLink href="/bundles" onClick={onClose}>Bundles</MobileLink>
          <MobileLink href="/market" onClick={onClose}>Market Prices</MobileLink>
          {isAuthenticated && (
            <>
              <div className="my-2.5 h-px bg-border/40" />
              <div className="my-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Learning</div>
              <MobileLink href="/dashboard" onClick={onClose}>Dashboard</MobileLink>
              <MobileLink href="/study" onClick={onClose}>Study Plan</MobileLink>
              <MobileLink href="/learning-paths" onClick={onClose}>Learning Paths</MobileLink>
              <MobileLink href="/flashcards" onClick={onClose}>Flashcards</MobileLink>
              <MobileLink href="/knowledge-base" onClick={onClose}>Knowledge Base</MobileLink>
              <div className="my-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Farm Tools</div>
              <MobileLink href="/farm-hub" onClick={onClose}>Farm Hub</MobileLink>
              <MobileLink href="/farm-tools" onClick={onClose}>Farm Tools</MobileLink>
              <MobileLink href="/crop-doctor" onClick={onClose}>Crop Doctor</MobileLink>
              <MobileLink href="/farm-simulator" onClick={onClose}>Farm Simulator</MobileLink>
              <div className="my-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Community</div>
              <MobileLink href="/leaderboard" onClick={onClose}>Leaderboard</MobileLink>
              <MobileLink href="/study-groups" onClick={onClose}>Study Groups</MobileLink>
              <MobileLink href="/mentorship" onClick={onClose}>Mentorship</MobileLink>
              <div className="my-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Account</div>
              <MobileLink href="/certificates" onClick={onClose}>Certificates</MobileLink>
              <MobileLink href="/settings" onClick={onClose}>Settings</MobileLink>
              {isAdmin && <MobileLink href="/admin" onClick={onClose}>Admin</MobileLink>}
            </>
          )}
        </nav>
      </div>
    </>
  );
}

function MobileLink({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link href={to}
      onClick={onClick}
      className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
    >
      {children}
    </Link>
  );
}

function MoreDropdown({ isAuthenticated, isAdmin }: { isAuthenticated: boolean; isAdmin: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
          open
            ? "bg-accent text-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-foreground"
        }`}
      >
        More <ChevronDown className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-60 rounded-2xl glass-card p-2 shadow-xl shadow-black/[0.08] border border-border/30 animate-in fade-in slide-in-from-top-2 duration-200">
          <DropdownLink to="/market">Market Prices</DropdownLink>
          <DropdownLink to="/verify-credential">Verify Certificate</DropdownLink>
          {isAuthenticated && (
            <>
              <div className="my-1.5 h-px bg-border/40" />
              <div className="my-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Learning</div>
              <DropdownLink to="/study">Study Plan</DropdownLink>
              <DropdownLink to="/learning-paths">Learning Paths</DropdownLink>
              <DropdownLink to="/flashcards">Flashcards</DropdownLink>
              <DropdownLink to="/knowledge-base">Knowledge Base</DropdownLink>
              <DropdownLink to="/field-journal">Field Journal</DropdownLink>
              <DropdownLink to="/learn">Micro Learning</DropdownLink>
              <div className="my-1.5 h-px bg-border/40" />
              <div className="my-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Farm</div>
              <DropdownLink to="/farm-hub">Farm Hub</DropdownLink>
              <DropdownLink to="/farm-tools">Farm Tools</DropdownLink>
              <DropdownLink to="/crop-doctor">Crop Doctor</DropdownLink>
              <DropdownLink to="/farm-simulator">Farm Simulator</DropdownLink>
              <DropdownLink to="/advisory">Advisory</DropdownLink>
              <div className="my-1.5 h-px bg-border/40" />
              <div className="my-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Community</div>
              <DropdownLink to="/leaderboard">Leaderboard</DropdownLink>
              <DropdownLink to="/study-groups">Study Groups</DropdownLink>
              <DropdownLink to="/mentorship">Mentorship</DropdownLink>
              <DropdownLink to="/challenges">Challenges</DropdownLink>
              <DropdownLink to="/peer-reviews">Peer Reviews</DropdownLink>
              <DropdownLink to="/showcase">Showcase</DropdownLink>
              <DropdownLink to="/seasonal">Seasonal</DropdownLink>
              <div className="my-1.5 h-px bg-border/40" />
              <div className="my-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Progress</div>
              <DropdownLink to="/analytics">Analytics</DropdownLink>
              <DropdownLink to="/certificates">Certificates</DropdownLink>
              <DropdownLink to="/transcript">Skills Transcript</DropdownLink>
              <DropdownLink to="/skills">Competencies</DropdownLink>
              <DropdownLink to="/portfolio">Portfolio</DropdownLink>
              <DropdownLink to="/exports">Exports</DropdownLink>
              <DropdownLink to="/compare">Compare</DropdownLink>
              {isAdmin && (
                <>
                  <div className="my-1.5 h-px bg-border/40" />
                  <div className="my-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Admin</div>
                  <DropdownLink to="/admin">Admin Panel</DropdownLink>
                  <DropdownLink to="/revenue">Revenue</DropdownLink>
                  <DropdownLink to="/instructor-analytics">Instructor Analytics</DropdownLink>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function DropdownLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link href={to}
      className="block rounded-xl px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
    >
      {children}
    </Link>
  );
}

/**
 * Shared top bar for the app shell.
 */
export function AppHeader({ path }: { path?: string }) {
  const { user, isAuthenticated, signOut } = useAuth();
  const notifications = useQuery(
    api.inapp.myNotifications,
    isAuthenticated ? {} : "skip",
  );
  const unread = (notifications as any)?.unread ?? 0;
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAdmin = user?.role === "admin";

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/30 glass-header">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex min-w-0 items-center gap-5">
            <Brand />
            {path && (
              <span className="hidden truncate text-sm text-muted-foreground/60 lg:inline">
                / {path}
              </span>
            )}
          </div>

          <nav className="hidden items-center gap-0.5 md:flex">
            <Link href="/courses"
              className="rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
            >
              Catalog
            </Link>
            <Link href="/instructors"
              className="rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
            >
              Instructors
            </Link>
            <Link href="/bundles"
              className="rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
            >
              Bundles
            </Link>
            {isAuthenticated && (
              <Link href="/dashboard"
                className="rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
              >
                Dashboard
              </Link>
            )}
            <MoreDropdown isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
          </nav>

          <div className="flex items-center gap-2.5">
            {isAuthenticated ? (
              <>
                <Link href="/notifications"
                  className="relative flex size-9 items-center justify-center rounded-xl border border-border/40 text-muted-foreground transition-all hover:border-agri-green/40 hover:bg-accent hover:text-foreground"
                  aria-label="notifications"
                >
                  <Bell className="size-4" />
                  {unread > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-agri-green text-[10px] font-bold text-white shadow-sm">
                      {unread > 9 ? "9+" : unread}
                    </span>
                  )}
                </Link>
                <ThemeToggle />
                <span className="hidden max-w-36 truncate text-sm text-muted-foreground lg:inline">
                  {user?.email ?? user?.name ?? "Student"}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2 text-sm rounded-xl"
                  onClick={handleSignOut}
                >
                  <LogOut className="size-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <ThemeToggle />
                <Button asChild variant="ghost" size="sm" className="text-sm font-medium rounded-xl">
                  <Link href="/auth">Sign In</Link>
                </Button>
                <Button asChild size="sm" className="text-sm font-medium shadow-md rounded-xl">
                  <Link href="/courses">Get Started</Link>
                </Button>
              </>
            )}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex size-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-accent md:hidden transition-colors"
              aria-label="menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
      />
    </>
  );
}
