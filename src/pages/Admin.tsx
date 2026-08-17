import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { AppHeader } from "@/components/AppHeader";
import { AttendanceByCourse } from "@/components/AttendanceByCourse";
import { ContentEditor } from "@/components/ContentEditor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { useCatalog } from "@/hooks/use-catalog";
import {
  formatDate,
  formatMoney,
  formatSession,
  fromLocalInputValue,
  toLocalInputValue,
} from "@/lib/format";
import { useAction, useMutation, useQuery } from "convex/react";
import {
  CalendarDays,
  CheckCircle2,
  Download,
  Loader2,
  ShieldCheck,
  Star,
  Trash2,
} from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

type CourseDoc = Doc<"courses">;

function SectionHeader({
  prompt,
  title,
  subtitle,
}: {
  prompt: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <p className="text-xs text-term-green">{prompt}</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">{title}</h1>
      {subtitle && (
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}

export default function Admin() {
  const { user } = useAuth();
  const role = user?.role;
  const claimFirstAdmin = useMutation(api.users.claimFirstAdmin);
  const claimed = useRef(false);
  const [claimResult, setClaimResult] = useState<boolean | null>(null);

  useEffect(() => {
    if (user && !user.role && !claimed.current) {
      claimed.current = true;
      void claimFirstAdmin().then(setClaimResult);
    }
  }, [user, claimFirstAdmin]);

  if (user && role !== "admin" && user.role === undefined && claimResult === null) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <AppHeader path="~/admin" />
        <div className="mx-auto flex min-h-[60vh] w-full max-w-5xl flex-col items-center justify-center px-4 text-center">
          <Loader2 className="size-6 animate-spin text-term-green" />
          <p className="mt-3 text-sm text-muted-foreground">
            checking administrator access…
          </p>
        </div>
      </main>
    );
  }

  if (user && role !== "admin") {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <AppHeader path="~/admin" />
        <div className="mx-auto flex min-h-[60vh] w-full max-w-5xl flex-col items-center justify-center px-4 text-center">
          <ShieldCheck className="size-8 text-term-amber" />
          <p className="mt-4 text-sm">
            <span className="text-term-amber">[warn]</span> administrator
            access denied
          </p>
          <p className="mt-2 max-w-sm text-xs text-muted-foreground">
            {claimResult === false
              ? "An administrator account already exists on this deployment. Ask the account owner to grant you access."
              : "This account does not have administrator privileges."}
          </p>
          <Button asChild variant="outline" size="sm" className="mt-5 text-xs">
            <Link to="/dashboard">back to my sessions</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path="~/admin" />
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <SectionHeader
          prompt="[ok] admin console — full control"
          title="Academy Console"
          subtitle="Manage the catalog, session schedule, bookings, and community comments from one place."
        />

        <Tabs defaultValue="metrics" className="mt-8">
          <TabsList className="gap-1 rounded-none border border-border bg-muted">
            <TabsTrigger value="metrics">metrics</TabsTrigger>
            <TabsTrigger value="courses">courses</TabsTrigger>
            <TabsTrigger value="sessions">sessions</TabsTrigger>
            <TabsTrigger value="roster">roster</TabsTrigger>
            <TabsTrigger value="bookings">bookings</TabsTrigger>
            <TabsTrigger value="comments">comments</TabsTrigger>
            <TabsTrigger value="reviews">reviews</TabsTrigger>
            <TabsTrigger value="coupons">coupons</TabsTrigger>
            <TabsTrigger value="users">users</TabsTrigger>
          </TabsList>

          <TabsContent value="metrics" className="mt-6">
            <MetricsTab />
          </TabsContent>
          <TabsContent value="courses" className="mt-6">
            <CoursesTab />
          </TabsContent>
          <TabsContent value="sessions" className="mt-6">
            <SessionsTab />
          </TabsContent>
          <TabsContent value="roster" className="mt-6">
            <RosterTab />
          </TabsContent>
          <TabsContent value="bookings" className="mt-6">
            <BookingsTab />
          </TabsContent>
          <TabsContent value="comments" className="mt-6">
            <CommentsTab />
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <ReviewsTab />
          </TabsContent>
          <TabsContent value="coupons" className="mt-6">
            <CouponsTab />
          </TabsContent>
          <TabsContent value="users" className="mt-6">
            <UsersTab />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Courses
// ---------------------------------------------------------------------------

function CoursesTab() {
  const courses = useCatalog();
  const createCourse = useMutation(api.courses.create);
  const updateCourse = useMutation(api.courses.update);
  const removeCourse = useMutation(api.courses.remove);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Foundations");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("30");
  const [instructor, setInstructor] = useState("");
  const [instructorTitle, setInstructorTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [contentCourse, setContentCourse] = useState<CourseDoc | null>(null);
  const [editing, setEditing] = useState<CourseDoc | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDuration, setEditDuration] = useState("");
  const [editInstructor, setEditInstructor] = useState("");
  const [editInstructorTitle, setEditInstructorTitle] = useState("");
  const [saving, setSaving] = useState(false);

  const openEdit = (course: CourseDoc) => {
    setEditing(course);
    setEditTitle(course.title);
    setEditCategory(course.category);
    setEditDescription(course.description);
    setEditPrice((course.priceCents / 100).toFixed(2));
    setEditDuration(String(course.durationMinutes));
    setEditInstructor(course.instructor ?? "");
    setEditInstructorTitle(course.instructorTitle ?? "");
  };

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) return;
    setSubmitting(true);
    try {
      await createCourse({
        title: title.trim(),
        category: category.trim() || "Foundations",
        description: description.trim(),
        priceCents: Math.round(parseFloat(price || "0") * 100),
        durationMinutes: Math.max(1, parseInt(duration || "30", 10)),
        instructor: instructor.trim() || undefined,
        instructorTitle: instructorTitle.trim() || undefined,
      });
      setTitle("");
      setDescription("");
      setPrice("");
      setDuration("30");
      setInstructor("");
      setInstructorTitle("");
      toast.success("Course created as a draft.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not create course.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await updateCourse({
        id: editing._id,
        title: editTitle.trim() || undefined,
        category: editCategory.trim() || undefined,
        description: editDescription.trim() || undefined,
        priceCents: Number.isFinite(parseFloat(editPrice))
          ? Math.round(parseFloat(editPrice) * 100)
          : undefined,
        durationMinutes: parseInt(editDuration, 10) > 0
          ? parseInt(editDuration, 10)
          : undefined,
        instructor: editInstructor.trim() || undefined,
        instructorTitle: editInstructorTitle.trim() || undefined,
      });
      setEditing(null);
      toast.success("Course updated.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update course.");
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (course: CourseDoc) => {
    try {
      await updateCourse({ id: course._id, published: !course.published });
      toast.success(course.published ? "Course unpublished." : "Course published.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update course.");
    }
  };

  const handleDelete = async (course: CourseDoc) => {
    if (!window.confirm(`Delete "${course.title}" and its sessions?`)) return;
    try {
      await removeCourse({ id: course._id });
      toast.success("Course removed.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not remove course.");
    }
  };

  return (
    <div>
      {/* create form */}
      <form
        onSubmit={handleCreate}
        className="border border-border bg-card"
      >
        <div className="border-b border-border bg-muted px-4 py-2.5">
          <span className="text-xs font-semibold">create course</span>
        </div>
        <div className="grid gap-4 p-4 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="new-title">title</Label>
            <Input
              id="new-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Fertigation Planning Basics"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="new-category">category</Label>
            <Input
              id="new-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Foundations"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="new-price">price (usd)</Label>
              <Input
                id="new-price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="49.00"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new-duration">duration (min)</Label>
              <Input
                id="new-duration"
                type="number"
                min="1"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="new-description">description</Label>
            <Textarea
              id="new-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What will students learn in this course?"
              rows={2}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="new-instructor">instructor</Label>
            <Input
              id="new-instructor"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              placeholder="e.g. Mara Ellison"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="new-instructor-title">instructor role</Label>
            <Input
              id="new-instructor-title"
              value={instructorTitle}
              onChange={(e) => setInstructorTitle(e.target.value)}
              placeholder="e.g. Academy Lead"
            />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="sm" disabled={submitting}>
              {submitting ? <Loader2 className="size-3.5 animate-spin" /> : null}
              create course
            </Button>
          </div>
        </div>
      </form>

      {/* course list */}
      <div className="mt-6 border border-border bg-card">
        <div className="grid grid-cols-[2rem_1fr_7rem_5rem_5rem_auto] items-center gap-3 border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
          <span>#</span>
          <span>title</span>
          <span className="hidden sm:block">category</span>
          <span className="text-right">price</span>
          <span className="text-right">status</span>
          <span className="w-56 text-right">actions</span>
        </div>
        {courses === undefined && (
          <div className="space-y-2 p-4">
            <div className="h-4 animate-pulse bg-muted" />
            <div className="h-4 animate-pulse bg-muted" />
            <div className="h-4 animate-pulse bg-muted" />
          </div>
        )}
        {courses?.map((course) => (
          <div
            key={course._id}
            className="grid grid-cols-[2rem_1fr_7rem_5rem_5rem_auto] items-center gap-3 border-b border-border px-4 py-2.5 last:border-b-0 hover:bg-accent/30"
          >
            <span className="text-[11px] text-term-green">{course.order}</span>
            <span className="min-w-0">
              <Link
                to={`/courses/${course.slug}`}
                className="block truncate text-sm font-medium underline-offset-4 hover:underline"
              >
                {course.title}
              </Link>
              <span className="block text-[11px] text-muted-foreground">
                {(course.modules?.length ?? 1)}{" "}
                {(course.modules?.length ?? 1) === 1 ? "module" : "modules"}
              </span>
            </span>
            <span className="hidden truncate text-xs text-muted-foreground sm:block">
              {course.category}
            </span>
            <span className="text-right text-xs text-muted-foreground">
              {formatMoney(course.priceCents)}
            </span>
            <span className="text-right">
              <span
                className={`border px-1.5 py-0.5 text-[10px] font-medium ${
                  course.published
                    ? "border-term-green/40 bg-term-green/10 text-term-green"
                    : "border-term-amber/40 bg-term-amber/10 text-term-amber"
                }`}
              >
                {course.published ? "OPEN" : "DRAFT"}
              </span>
            </span>
            <span className="flex w-56 justify-end gap-1.5">
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 text-[11px]"
                onClick={() => handleTogglePublish(course)}
              >
                {course.published ? "unpublish" : "publish"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 text-[11px]"
                onClick={() => openEdit(course)}
              >
                edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 text-[11px]"
                onClick={() => setContentCourse(course)}
              >
                content
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 text-[11px] text-destructive hover:text-destructive"
                onClick={() => handleDelete(course)}
              >
                <Trash2 className="size-3" />
              </Button>
            </span>
          </div>
        ))}
      </div>

      {/* edit dialog */}
      <Dialog open={editing !== null} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit course</DialogTitle>
            <DialogDescription>
              Changes go live immediately for published courses.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="edit-title">title</Label>
              <Input
                id="edit-title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="edit-category">category</Label>
                <Input
                  id="edit-category"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-price">price (usd)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-duration">duration (min)</Label>
                <Input
                  id="edit-duration"
                  type="number"
                  min="1"
                  value={editDuration}
                  onChange={(e) => setEditDuration(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-description">description</Label>
              <Textarea
                id="edit-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="edit-instructor">instructor</Label>
                <Input
                  id="edit-instructor"
                  value={editInstructor}
                  onChange={(e) => setEditInstructor(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-instructor-title">instructor role</Label>
                <Input
                  id="edit-instructor-title"
                  value={editInstructorTitle}
                  onChange={(e) => setEditInstructorTitle(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setEditing(null)}>
              cancel
            </Button>
            <Button size="sm" onClick={handleSaveEdit} disabled={saving}>
              {saving ? <Loader2 className="size-3.5 animate-spin" /> : null}
              save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ContentEditor
        key={contentCourse?._id ?? "none"}
        course={contentCourse}
        open={contentCourse !== null}
        onOpenChange={(open) => {
          if (!open) setContentCourse(null);
        }}
      />
    </div>
  );
}// ---------------------------------------------------------------------------
// Roster — attendance & waitlist per session
// ---------------------------------------------------------------------------

function RosterTab() {
  const rosters = useQuery(api.admin.sessionRosters);
  const markAttended = useMutation(api.bookings.markAttended);
  const [expanded, setExpanded] = useState<Id<"sessions"> | null>(null);
  const [busy, setBusy] = useState<Id<"bookings"> | null>(null);

  const handleAttended = async (bookingId: Id<"bookings">, attended: boolean) => {
    setBusy(bookingId);
    try {
      await markAttended({ bookingId, attended });
      toast.success(attended ? "Marked as attended." : "Attendance cleared.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update attendance.");
    } finally {
      setBusy(null);
    }
  };

  const sorted = [...(rosters ?? [])].sort((a, b) => b.startsAt - a.startsAt);
  const upcoming = sorted.filter((r) => r.startsAt >= Date.now());
  const past = sorted.filter((r) => r.startsAt < Date.now());

  return (
    <div className="space-y-6">
      <div className="border border-border bg-card">
        <div className="border-b border-border bg-muted px-4 py-2.5">
          <span className="text-xs font-semibold">
            upcoming sessions — attendance & waitlist
          </span>
        </div>
        {rosters === undefined && (
          <div className="space-y-2 p-4">
            <div className="h-4 animate-pulse bg-muted" />
            <div className="h-4 animate-pulse bg-muted" />
          </div>
        )}
        {upcoming.length === 0 && rosters !== undefined && (
          <div className="px-4 py-6 text-center text-xs text-muted-foreground">
            <p>
              <span className="text-term-green">[ok]</span> no upcoming sessions
              scheduled.
            </p>
          </div>
        )}
        {upcoming.map((roster) => (
          <RosterRow
            key={roster.sessionId}
            roster={roster}
            expanded={expanded === roster.sessionId}
            onToggle={() =>
              setExpanded(expanded === roster.sessionId ? null : roster.sessionId)
            }
            busy={busy}
            onAttended={handleAttended}
          />
        ))}
      </div>

      <div className="border border-border bg-card">
        <div className="border-b border-border bg-muted px-4 py-2.5">
          <span className="text-xs font-semibold">past sessions</span>
        </div>
        {past.length === 0 && rosters !== undefined && (
          <div className="px-4 py-6 text-center text-xs text-muted-foreground">
            <p>
              <span className="text-term-green">[ok]</span> no past sessions yet.
            </p>
          </div>
        )}
        {past.map((roster) => (
          <RosterRow
            key={roster.sessionId}
            roster={roster}
            expanded={expanded === roster.sessionId}
            onToggle={() =>
              setExpanded(expanded === roster.sessionId ? null : roster.sessionId)
            }
            busy={busy}
            onAttended={handleAttended}
          />
        ))}
      </div>
    </div>
  );
}

function RosterRow({
  roster,
  expanded,
  onToggle,
  busy,
  onAttended,
}: {
  roster: {
    sessionId: Id<"sessions">;
    courseTitle: string;
    startsAt: number;
    durationMinutes: number;
    capacity: number;
    venue: string | null;
    roster: Array<{
      bookingId: Id<"bookings">;
      name: string;
      email: string | null;
      status: string;
      paymentStatus: string;
      attendedAt: number | null;
    }>;
    waitlist: Array<{
      waitlistId: Id<"waitlist">;
      name: string;
      email: string | null;
      joinedAt: number;
    }>;
  };
  expanded: boolean;
  onToggle: () => void;
  busy: Id<"bookings"> | null;
  onAttended: (bookingId: Id<"bookings">, attended: boolean) => void;
}) {
  const attendedCount = roster.roster.filter((b) => b.attendedAt).length;
  const past = roster.startsAt < Date.now();
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors hover:bg-accent/30"
      >
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium">
            {roster.courseTitle}
          </span>
          <span className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarDays className="size-3" />
              {formatSession(roster.startsAt)}
            </span>
            <span>{roster.durationMinutes}m</span>
            {roster.venue && <span>@{roster.venue}</span>}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2 text-[11px]">
          <span className="border border-term-green/40 bg-term-green/10 px-1.5 py-0.5 font-medium text-term-green">
            {attendedCount}/{roster.roster.length} attended
          </span>
          {roster.waitlist.length > 0 && (
            <span className="border border-term-amber/40 bg-term-amber/10 px-1.5 py-0.5 font-medium text-term-amber">
              {roster.waitlist.length} waiting
            </span>
          )}
          <span className="text-muted-foreground">
            {expanded ? "[-]" : "[+]"}
          </span>
        </span>
      </button>

      {expanded && (
        <div className="border-t border-border bg-muted/30 px-4 py-3">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            attendees ({roster.roster.length}/{roster.capacity})
          </p>
          {roster.roster.length === 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              <span className="text-term-green">[ok]</span> nobody booked yet.
            </p>
          )}
          <div className="mt-2 space-y-1.5">
            {roster.roster.map((entry) => (
              <div
                key={entry.bookingId}
                className="flex flex-wrap items-center justify-between gap-2 border border-border bg-card px-3 py-2"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm">{entry.name}</span>
                  <span className="block truncate text-[11px] text-muted-foreground">
                    {entry.email ?? "no email"} · {entry.status}
                    {entry.paymentStatus === "paid" ? " · paid" : ""}
                  </span>
                </span>
                {past && (
                  <Button
                    variant={
                      entry.attendedAt ? "default" : "outline"
                    }
                    size="sm"
                    className="h-7 gap-1 px-2 text-[11px]"
                    disabled={busy === entry.bookingId}
                    onClick={() =>
                      onAttended(entry.bookingId, !entry.attendedAt)
                    }
                  >
                    {busy === entry.bookingId ? (
                      <Loader2 className="size-3 animate-spin" />
                    ) : (
                      <CheckCircle2 className="size-3" />
                    )}
                    {entry.attendedAt ? "unmark" : "attended"}
                  </Button>
                )}
              </div>
            ))}
          </div>

          <p className="mt-4 text-[11px] uppercase tracking-wider text-muted-foreground">
            waitlist ({roster.waitlist.length})
          </p>
          {roster.waitlist.length === 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              <span className="text-term-green">[ok]</span> no waitlisted
              students. Freed seats go straight back to the catalog.
            </p>
          )}
          <div className="mt-2 space-y-1.5">
            {roster.waitlist.map((entry, index) => (
              <div
                key={entry.waitlistId}
                className="flex items-center justify-between gap-2 border border-border bg-card px-3 py-2"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm">
                    #{index + 1} {entry.name}
                  </span>
                  <span className="block truncate text-[11px] text-muted-foreground">
                    {entry.email ?? "no email"} · joined{" "}
                    {formatDate(entry.joinedAt)}
                  </span>
                </span>
                <span className="border border-term-amber/40 bg-term-amber/10 px-1.5 py-0.5 text-[10px] font-medium text-term-amber">
                  QUEUE
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">
            <span className="text-term-green">[ok]</span> when a student
            cancels, the longest-waiting student is offered the freed seat
            automatically.
          </p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sessions
// ---------------------------------------------------------------------------

function SessionsTab() {
  const courses = useCatalog();
  const sessions = useQuery(api.bookings.adminListSessions);
  const createSession = useMutation(api.bookings.createSession);
  const removeSession = useMutation(api.bookings.removeSession);

  const [courseId, setCourseId] = useState("");
  const [startsAt, setStartsAt] = useState(() => {
    const d = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    d.setHours(9, 0, 0, 0);
    return toLocalInputValue(d.getTime());
  });
  const [duration, setDuration] = useState("30");
  const [capacity, setCapacity] = useState("12");
  const [venue, setVenue] = useState("");
  const [joinUrl, setJoinUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!courseId) {
      toast.error("Choose a course first.");
      return;
    }
    setSubmitting(true);
    try {
      await createSession({
        courseId: courseId as Id<"courses">,
        startsAt: fromLocalInputValue(startsAt),
        durationMinutes: Math.max(1, parseInt(duration, 10)),
        capacity: Math.max(1, parseInt(capacity, 10)),
        venue: venue.trim() || undefined,
        joinUrl: joinUrl.trim() || undefined,
      });
      setVenue("");
      setJoinUrl("");
      toast.success("Session scheduled.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not create session.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (sessionId: Id<"sessions">) => {
    if (!window.confirm("Delete this session? Bookings will be orphaned.")) return;
    try {
      await removeSession({ id: sessionId });
      toast.success("Session removed.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not remove session.");
    }
  };

  return (
    <div>
      <form onSubmit={handleCreate} className="border border-border bg-card">
        <div className="border-b border-border bg-muted px-4 py-2.5">
          <span className="text-xs font-semibold">schedule session</span>
        </div>
        <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1.5">
            <Label htmlFor="session-course">course</Label>
            <Select value={courseId} onValueChange={setCourseId}>
              <SelectTrigger id="session-course" className="w-full">
                <SelectValue placeholder="select course" />
              </SelectTrigger>
              <SelectContent>
                {(courses ?? [])
                  .filter((c) => c.published)
                  .map((c) => (
                    <SelectItem key={c._id} value={c._id}>
                      {c.title}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="session-start">starts at</Label>
            <Input
              id="session-start"
              type="datetime-local"
              value={startsAt}
              onChange={(e) => setStartsAt(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="session-duration">duration (min)</Label>
            <Input
              id="session-duration"
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="session-capacity">capacity</Label>
            <Input
              id="session-capacity"
              type="number"
              min="1"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="session-venue">venue (optional)</Label>
            <Input
              id="session-venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="e.g. Shed 4, Training Yard"
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="session-join">join link (optional)</Label>
            <Input
              id="session-join"
              value={joinUrl}
              onChange={(e) => setJoinUrl(e.target.value)}
              placeholder="https://meet.example.com/…"
            />
          </div>
          <div className="sm:col-span-2 lg:col-span-4">
            <Button type="submit" size="sm" disabled={submitting}>
              {submitting ? <Loader2 className="size-3.5 animate-spin" /> : null}
              schedule session
            </Button>
          </div>
        </div>
      </form>

      <div className="mt-6 border border-border bg-card">
        <div className="grid grid-cols-[1fr_11rem_5rem_5rem_4rem_auto] items-center gap-3 border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
          <span>course</span>
          <span>starts at</span>
          <span className="text-right">dur</span>
          <span className="text-right">cap</span>
          <span className="text-right">booked</span>
          <span className="w-12 text-right">action</span>
        </div>
        {sessions === undefined && (
          <div className="space-y-2 p-4">
            <div className="h-4 animate-pulse bg-muted" />
            <div className="h-4 animate-pulse bg-muted" />
          </div>
        )}
        {sessions?.map((session) => (
          <div
            key={session._id}
            className="grid grid-cols-[1fr_11rem_5rem_5rem_4rem_auto] items-center gap-3 border-b border-border px-4 py-2.5 last:border-b-0 hover:bg-accent/30"
          >
            <span className="min-w-0 truncate text-sm">{session.courseTitle}</span>
            <span className="text-xs text-muted-foreground">
              {formatSession(session.startsAt)}
            </span>
            <span className="text-right text-xs text-muted-foreground">
              {session.durationMinutes}m
            </span>
            <span className="text-right text-xs text-muted-foreground">
              {session.capacity}
            </span>
            <span
              className={`text-right text-xs ${
                session.bookedCount >= session.capacity
                  ? "text-term-amber"
                  : "text-term-green"
              }`}
            >
              {session.bookedCount}
            </span>
            <span className="flex w-12 justify-end">
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 text-[11px] text-destructive hover:text-destructive"
                onClick={() => handleDelete(session._id)}
              >
                <Trash2 className="size-3" />
              </Button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Bookings
// ---------------------------------------------------------------------------

function BookingsTab() {
  const bookings = useQuery(api.bookings.adminListBookings);
  const setBookingStatus = useMutation(api.bookings.setBookingStatus);
  const sendConfirmation = useAction(api.notifications.sendBookingConfirmation);

  const handleStatus = async (
    bookingId: Id<"bookings">,
    status: "confirmed" | "cancelled",
  ) => {
    try {
      await setBookingStatus({ bookingId, status });
      if (status === "confirmed") {
        // Idempotent: skips bookings that were already emailed.
        const email = await sendConfirmation({
          bookingId,
          origin: window.location.origin,
        });
        toast.success(
          email.ok
            ? "Booking confirmed — confirmation email sent."
            : "Booking confirmed.",
        );
      } else {
        toast.success("Booking cancelled.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not update booking.",
      );
    }
  };

  const refundBooking = useAction(api.bookings.refundBooking);
  const sendRefundNotice = useAction(api.notifications.sendRefundNotice);
  const markAttended = useMutation(api.bookings.markAttended);
  const [refundingId, setRefundingId] = useState<Id<"bookings"> | null>(null);

  const handleRefund = async (bookingId: Id<"bookings">) => {
    if (
      !window.confirm(
        "Refund this booking through Stripe? The student will be credited automatically.",
      )
    )
      return;
    setRefundingId(bookingId);
    try {
      const result = await refundBooking({ bookingId });
      if (!result.ok) {
        toast.error(
          result.error === "STRIPE_KEY_MISSING"
            ? "Add STRIPE_SECRET_KEY in the project Keys to enable refunds."
            : result.error,
        );
      } else {
        toast.success("Refund issued — the student has been credited.");
        // Notify the student by email (idempotent).
        void sendRefundNotice({
          bookingId,
          origin: window.location.origin,
        }).catch(() => {});
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not issue the refund.",
      );
    } finally {
      setRefundingId(null);
    }
  };

  const handleAttended = async (
    bookingId: Id<"bookings">,
    attended: boolean,
  ) => {
    try {
      await markAttended({ bookingId, attended });
      toast.success(attended ? "Marked as attended." : "Attendance cleared.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not update attendance.",
      );
    }
  };

  const exportCsv = () => {
    if (!bookings) return;
    const esc = (value: string) =>
      `"${String(value).replace(/"/g, '""')}"`;
    const header = [
      "booking",
      "course",
      "email",
      "session_utc",
      "amount_cents",
      "status",
      "payment",
      "refunded",
      "attended",
    ];
    const rows = bookings.map((b) => [
      b._id,
      b.courseTitle,
      b.email ?? "",
      b.sessionStartsAt ? new Date(b.sessionStartsAt).toISOString() : "",
      String(b.amountCents),
      b.status,
      b.paymentStatus,
      b.refundedAt ? "yes" : "no",
      b.attendedAt ? "yes" : "no",
    ]);
    const csv = [header, ...rows].map((r) => r.map(esc).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bookings-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
        <span className="text-xs text-muted-foreground">
          {bookings === undefined
            ? "loading bookings…"
            : `${bookings.length} bookings`}
        </span>
        <Button
          variant="outline"
          size="sm"
          className="h-7 gap-1 text-[11px]"
          onClick={exportCsv}
          disabled={!bookings || bookings.length === 0}
        >
          <Download className="size-3" />
          export csv
        </Button>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr_5rem_4rem_auto] items-center gap-3 border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
        <span>course</span>
        <span>student</span>
        <span className="hidden sm:block">session</span>
        <span className="text-right">amount</span>
        <span className="text-right">status</span>
        <span className="w-72 text-right">actions</span>
      </div>
      {bookings === undefined && (
        <div className="space-y-2 p-4">
          <div className="h-4 animate-pulse bg-muted" />
          <div className="h-4 animate-pulse bg-muted" />
        </div>
      )}
      {bookings !== undefined && bookings.length === 0 && (
        <div className="px-4 py-10 text-center text-sm text-muted-foreground">
          <p>
            <span className="text-term-green">[ok]</span> no bookings yet.
          </p>
        </div>
      )}
      {bookings?.map((booking) => (
        <div
          key={booking._id}
          className="grid grid-cols-[1fr_1fr_1fr_5rem_4rem_auto] items-center gap-3 border-b border-border px-4 py-2.5 last:border-b-0 hover:bg-accent/30"
        >
          <span className="min-w-0 truncate text-sm">{booking.courseTitle}</span>
          <span className="truncate text-xs text-muted-foreground">
            {booking.email ?? "—"}
          </span>
          <span className="hidden truncate text-xs text-muted-foreground sm:block">
            {booking.sessionStartsAt ? formatSession(booking.sessionStartsAt) : "—"}
          </span>
          <span className="text-right text-xs">{formatMoney(booking.amountCents)}</span>
          <span className="text-right">
            {booking.refundedAt ? (
              <span className="border border-term-amber/40 bg-term-amber/10 px-1.5 py-0.5 text-[10px] font-medium text-term-amber">
                REFUNDED
              </span>
            ) : (
              <BookingStatusLabel
                status={booking.status}
                paymentStatus={booking.paymentStatus}
              />
            )}
          </span>
          <span className="flex w-72 justify-end gap-1.5">
            {booking.status === "confirmed" && (
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 text-[11px]"
                disabled={refundingId === booking._id}
                onClick={() =>
                  handleAttended(booking._id, !booking.attendedAt)
                }
              >
                {booking.attendedAt ? "unmark" : "attended"}
              </Button>
            )}
            {booking.paymentStatus === "paid" && !booking.refundedAt && (
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 text-[11px]"
                disabled={refundingId === booking._id}
                onClick={() => handleRefund(booking._id)}
              >
                {refundingId === booking._id ? "refunding…" : "refund"}
              </Button>
            )}
            {booking.status !== "confirmed" && (
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 text-[11px]"
                onClick={() => handleStatus(booking._id, "confirmed")}
              >
                confirm
              </Button>
            )}
            {booking.status !== "cancelled" && (
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 text-[11px] text-destructive hover:text-destructive"
                onClick={() => handleStatus(booking._id, "cancelled")}
              >
                cancel
              </Button>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

function BookingStatusLabel({
  status,
  paymentStatus,
}: {
  status: string;
  paymentStatus: string;
}) {
  if (status === "confirmed") {
    return (
      <span
        className={`border px-1.5 py-0.5 text-[10px] font-medium ${
          paymentStatus === "paid"
            ? "border-term-green/40 bg-term-green/10 text-term-green"
            : "border-term-green/40 bg-term-green/10 text-term-green"
        }`}
      >
        {paymentStatus === "paid" ? "PAID" : "CONFIRMED"}
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span className="border border-term-amber/40 bg-term-amber/10 px-1.5 py-0.5 text-[10px] font-medium text-term-amber">
        PENDING
      </span>
    );
  }
  return (
    <span className="border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
      CANCELLED
    </span>
  );
}

// ---------------------------------------------------------------------------
// Comments
// ---------------------------------------------------------------------------

function CommentsTab() {
  const comments = useQuery(api.comments.adminList);
  const setVisibility = useMutation(api.comments.setVisibility);
  const removeComment = useMutation(api.comments.remove);

  const handleVisibility = async (id: Id<"comments">, visible: boolean) => {
    try {
      await setVisibility({ id, visible });
      toast.success(visible ? "Comment restored." : "Comment hidden.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update comment.");
    }
  };

  const handleDelete = async (id: Id<"comments">) => {
    if (!window.confirm("Permanently delete this comment?")) return;
    try {
      await removeComment({ id });
      toast.success("Comment deleted.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete comment.");
    }
  };

  return (
    <div className="border border-border bg-card">
      <div className="grid grid-cols-[10rem_1fr_auto] items-center gap-3 border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
        <span>course</span>
        <span>comment</span>
        <span className="w-36 text-right">actions</span>
      </div>
      {comments === undefined && (
        <div className="space-y-2 p-4">
          <div className="h-4 animate-pulse bg-muted" />
          <div className="h-4 animate-pulse bg-muted" />
        </div>
      )}
      {comments !== undefined && comments.length === 0 && (
        <div className="px-4 py-10 text-center text-sm text-muted-foreground">
          <p>
            <span className="text-term-green">[ok]</span> no comments yet.
          </p>
        </div>
      )}
      {comments?.map((comment) => (
        <div
          key={comment._id}
          className="grid grid-cols-[10rem_1fr_auto] items-center gap-3 border-b border-border px-4 py-2.5 last:border-b-0 hover:bg-accent/30"
        >
          <span className="truncate text-xs text-muted-foreground">
            {comment.courseTitle}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm">
              {comment.authorName}: {comment.text}
            </span>
            <span className="block text-[11px] text-muted-foreground">
              {new Date(comment.createdAt).toLocaleString()}
              {!comment.visible && (
                <span className="ml-2 border border-term-amber/40 bg-term-amber/10 px-1 text-[10px] font-medium text-term-amber">
                  HIDDEN
                </span>
              )}
            </span>
          </span>
          <span className="flex w-36 justify-end gap-1.5">
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2 text-[11px]"
              onClick={() => handleVisibility(comment._id, !comment.visible)}
            >
              {comment.visible ? "hide" : "show"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2 text-[11px] text-destructive hover:text-destructive"
              onClick={() => handleDelete(comment._id)}
            >
              <Trash2 className="size-3" />
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

function UsersTab() {
  const { user: me } = useAuth();
  const users = useQuery(api.users.adminListUsers);
  const setRole = useMutation(api.users.setRole);
  const [busyId, setBusyId] = useState<Id<"users"> | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<Id<"users"> | null>(
    null,
  );
  const history = useQuery(
    api.admin.studentHistory,
    selectedUserId ? { userId: selectedUserId } : "skip",
  );

  const handleRole = async (
    userId: Id<"users">,
    role: "admin" | "member" | "user",
  ) => {
    setBusyId(userId);
    try {
      await setRole({ userId, role });
      toast.success("Account role updated.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not update role.",
      );
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="border border-border bg-card">
      <div className="grid grid-cols-[minmax(0,1fr)_9rem_8rem_5rem] items-center gap-3 border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
        <span>account</span>
        <span>joined</span>
        <span>role</span>
        <span className="text-right">bookings</span>
      </div>
      {users === undefined && (
        <div className="space-y-2 p-4">
          <div className="h-4 animate-pulse bg-muted" />
          <div className="h-4 animate-pulse bg-muted" />
        </div>
      )}
      {users !== undefined && users.length === 0 && (
        <div className="px-4 py-10 text-center text-sm text-muted-foreground">
          <p>
            <span className="text-term-green">[ok]</span> no accounts yet.
          </p>
        </div>
      )}
      {users?.map((user) => {
        const isMe = me?._id === user._id;
        const currentRole = user.role ?? "user";
        const selected = selectedUserId === user._id;
        return (
          <Fragment key={user._id}>
          <div
            onClick={() =>
              setSelectedUserId((prev) => (prev === user._id ? null : user._id))
            }
            className={`grid cursor-pointer grid-cols-[minmax(0,1fr)_9rem_8rem_5rem] items-center gap-3 border-b border-border px-4 py-2.5 last:border-b-0 hover:bg-accent/40 ${
              selected ? "bg-accent/30" : ""
            }`}
          >
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">
                {user.name ?? "unnamed account"}
                {isMe && (
                  <span className="ml-2 text-[10px] font-medium text-term-green">
                    (you)
                  </span>
                )}
              </span>
              <span className="block truncate text-[11px] text-muted-foreground">
                {user.email ?? "no email on account"}
              </span>
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDate(user._creationTime)}
            </span>
            <span onClick={(e) => e.stopPropagation()}>
              <Select
                value={currentRole}
                disabled={isMe || busyId === user._id}
                onValueChange={(value) =>
                  void handleRole(
                    user._id,
                    value as "admin" | "member" | "user",
                  )
                }
              >
                <SelectTrigger className="h-8 w-full text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">admin</SelectItem>
                  <SelectItem value="member">member</SelectItem>
                  <SelectItem value="user">user</SelectItem>
                </SelectContent>
              </Select>
            </span>
            <span className="text-right text-xs text-muted-foreground">
              {user.activeBookings}
              {selectedUserId === user._id && (
                <span className="ml-1 text-term-green">▲</span>
              )}
            </span>
          </div>
          {selected && (
            <div className="border-b border-border bg-muted/40 px-4 py-4">
              {history === undefined && (
                <div className="h-16 animate-pulse bg-muted" />
              )}
              {history === null && (
                <p className="text-xs text-muted-foreground">
                  <span className="text-term-amber">[warn]</span> account not
                  found.
                </p>
              )}
              {history && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs">
                      <span className="text-term-green">[ok]</span> training
                      record — {history.user.name ?? "unnamed"}
                      {history.user.email ? ` · ${history.user.email}` : ""}
                    </p>
                    <span className="text-[11px] text-muted-foreground">
                      {history.bookings.length} bookings ·{" "}
                      {history.progress.length} progress ·{" "}
                      {history.reviews.length} reviews ·{" "}
                      {history.waitlists.length} waitlists
                    </span>
                  </div>

                  <div className="space-y-3">
                    {history.bookings.length > 0 && (
                      <div className="border border-border bg-card">
                        <div className="border-b border-border bg-muted px-3 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                          bookings
                        </div>
                        {history.bookings.map((booking) => (
                          <div
                            key={booking._id}
                            className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2 text-xs last:border-b-0"
                          >
                            <Link
                              to={`/courses/${booking.courseSlug}`}
                              className="truncate font-medium underline-offset-4 hover:underline"
                            >
                              {booking.courseTitle}
                            </Link>
                            <span className="flex items-center gap-3 text-[11px] text-muted-foreground">
                              <span>
                                {booking.sessionStartsAt
                                  ? formatSession(booking.sessionStartsAt)
                                  : "session removed"}
                              </span>
                              <span>{formatMoney(booking.amountCents)}</span>
                              <BookingStatusLabel
                                status={booking.status}
                                paymentStatus={booking.paymentStatus}
                              />
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {history.progress.length > 0 && (
                      <div className="border border-border bg-card">
                        <div className="border-b border-border bg-muted px-3 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                          progress
                        </div>
                        {history.progress.map((entry) => (
                          <div
                            key={entry._id}
                            className="flex items-center justify-between gap-2 border-b border-border px-3 py-2 text-xs last:border-b-0"
                          >
                            <Link
                              to={`/courses/${entry.courseSlug}`}
                              className="truncate font-medium underline-offset-4 hover:underline"
                            >
                              {entry.courseTitle}
                            </Link>
                            <span
                              className={`border px-1.5 py-0.5 text-[10px] font-medium ${
                                entry.status === "completed"
                                  ? "border-term-green/40 bg-term-green/10 text-term-green"
                                  : "border-term-amber/40 bg-term-amber/10 text-term-amber"
                              }`}
                            >
                              {entry.status === "completed"
                                ? "COMPLETED"
                                : "IN PROGRESS"}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {history.reviews.length > 0 && (
                      <div className="border border-border bg-card">
                        <div className="border-b border-border bg-muted px-3 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                          reviews
                        </div>
                        {history.reviews.map((review) => (
                          <div
                            key={review._id}
                            className="flex items-center justify-between gap-2 border-b border-border px-3 py-2 text-xs last:border-b-0"
                          >
                            <span className="truncate">
                              {review.courseTitle}
                            </span>
                            <span className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((value) => (
                                <Star
                                  key={value}
                                  className={`size-3 ${
                                    value <= review.rating
                                      ? "fill-term-amber text-term-amber"
                                      : "text-muted-foreground/40"
                                  }`}
                                />
                              ))}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {history.waitlists.length > 0 && (
                      <div className="border border-border bg-card">
                        <div className="border-b border-border bg-muted px-3 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                          waitlists
                        </div>
                        {history.waitlists.map((entry) => (
                          <div
                            key={entry._id}
                            className="flex items-center justify-between gap-2 border-b border-border px-3 py-2 text-xs last:border-b-0"
                          >
                            <span className="truncate">{entry.courseTitle}</span>
                            <span className="text-[11px] text-muted-foreground">
                              {entry.sessionStartsAt
                                ? formatSession(entry.sessionStartsAt)
                                : "session removed"}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          </Fragment>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Metrics
// ---------------------------------------------------------------------------

function MetricsTab() {
  const stats = useQuery(api.bookings.adminStats);
  const quizStats = useQuery(api.quizzes.adminQuizStats);

  return (
    <div className="space-y-6">
      <AttendanceByCourse stats={stats} />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="border border-border bg-card px-4 py-4">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            paid revenue
          </p>
          <p className="mt-2 text-2xl font-bold text-term-green">
            {formatMoney(stats?.paidRevenueCents ?? 0)}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            settled through checkout
          </p>
        </div>
        <div className="border border-border bg-card px-4 py-4">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            on-site value
          </p>
          <p className="mt-2 text-2xl font-bold text-term-green">
            {formatMoney(stats?.onSiteValueCents ?? 0)}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            waived / settled in person
          </p>
        </div>
        <div className="border border-border bg-card px-4 py-4">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            confirmed
          </p>
          <p className="mt-2 text-2xl font-bold">{stats?.confirmed ?? "…"}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            active seats booked
          </p>
        </div>
        <div className="border border-border bg-card px-4 py-4">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            pending
          </p>
          <p className="mt-2 text-2xl font-bold text-term-amber">
            {stats?.pending ?? "…"}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            awaiting payment
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="border border-border bg-card px-4 py-4">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            attended
          </p>
          <p className="mt-2 text-2xl font-bold text-term-green">
            {stats?.attended ?? "…"}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            of {stats?.confirmed ?? "…"} confirmed seats
          </p>
        </div>
        <div className="border border-border bg-card px-4 py-4">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            refunded
          </p>
          <p className="mt-2 text-2xl font-bold text-term-amber">
            {stats?.refundedCount ?? "…"}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {formatMoney(stats?.refundedValueCents ?? 0)} returned
          </p>
        </div>
        <div className="border border-border bg-card px-4 py-4">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            coupon savings
          </p>
          <p className="mt-2 text-2xl font-bold text-term-green">
            {formatMoney(stats?.couponSavingsCents ?? 0)}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            given to students
          </p>
        </div>
        <div className="border border-border bg-card px-4 py-4">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            engagement
          </p>
          <p className="mt-2 text-2xl font-bold">
            {stats && stats.confirmed > 0
              ? Math.round(((stats.attended ?? 0) / stats.confirmed) * 100)
              : 0}
            %
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            attendance rate
          </p>
        </div>
      </div>

      <div className="border border-border bg-card">
        <div className="border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
          revenue by course
        </div>
        <div className="grid grid-cols-[1fr_6rem_6rem] items-center gap-3 border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
          <span>course</span>
          <span className="text-right">bookings</span>
          <span className="text-right">revenue</span>
        </div>
        {stats === undefined && (
          <div className="space-y-2 p-4">
            <div className="h-4 animate-pulse bg-muted" />
            <div className="h-4 animate-pulse bg-muted" />
          </div>
        )}
        {stats !== undefined && stats.revenueByCourse.length === 0 && (
          <div className="px-4 py-8 text-center text-xs text-muted-foreground">
            <p>
              <span className="text-term-green">[ok]</span> no paid bookings yet
              — revenue appears here as checkout payments settle.
            </p>
          </div>
        )}
        {stats?.revenueByCourse.map((row) => (
          <div
            key={row.title}
            className="grid grid-cols-[1fr_6rem_6rem] items-center gap-3 border-b border-border px-4 py-2.5 last:border-b-0"
          >
            <span className="min-w-0 truncate text-sm">{row.title}</span>
            <span className="text-right text-xs text-muted-foreground">
              {row.count}
            </span>
            <span className="text-right text-xs font-semibold">
              {formatMoney(row.revenueCents)}
            </span>
          </div>
        ))}
      </div>

      {/* ── Quiz performance ──────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="border border-border bg-card px-4 py-4">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            quiz attempts
          </p>
          <p className="mt-2 text-2xl font-bold">
            {quizStats?.totalAttempts ?? "…"}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            graded submissions
          </p>
        </div>
        <div className="border border-border bg-card px-4 py-4">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            students quizzing
          </p>
          <p className="mt-2 text-2xl font-bold">
            {quizStats?.uniqueStudents ?? "…"}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            unique participants
          </p>
        </div>
        <div className="border border-border bg-card px-4 py-4">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            pass rate
          </p>
          <p
            className={`mt-2 text-2xl font-bold ${
              (quizStats?.passRate ?? 0) >= 70
                ? "text-term-green"
                : "text-term-amber"
            }`}
          >
            {quizStats?.passRate ?? "…"}%
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            of attempts passed
          </p>
        </div>
        <div className="border border-border bg-card px-4 py-4">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            average score
          </p>
          <p className="mt-2 text-2xl font-bold text-term-green">
            {quizStats?.avgScore ?? "…"}%
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            across all attempts
          </p>
        </div>
      </div>

      <div className="border border-border bg-card">
        <div className="border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
          quiz performance by course
        </div>
        <div className="grid grid-cols-[1fr_5rem_5rem_5rem_5rem] items-center gap-3 border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
          <span>course</span>
          <span className="text-right">attempts</span>
          <span className="text-right">students</span>
          <span className="text-right">pass rate</span>
          <span className="text-right">avg score</span>
        </div>
        {quizStats === undefined && (
          <div className="space-y-2 p-4">
            <div className="h-4 animate-pulse bg-muted" />
            <div className="h-4 animate-pulse bg-muted" />
          </div>
        )}
        {quizStats !== undefined && quizStats.byCourse.length === 0 && (
          <div className="px-4 py-8 text-center text-xs text-muted-foreground">
            <p>
              <span className="text-term-green">[ok]</span> no quiz attempts yet
              — scores appear here as students submit quizzes.
            </p>
          </div>
        )}
        {quizStats?.byCourse.map((row) => (
          <div
            key={row.courseId}
            className="grid grid-cols-[1fr_5rem_5rem_5rem_5rem] items-center gap-3 border-b border-border px-4 py-2.5 last:border-b-0"
          >
            <span className="min-w-0 truncate text-sm">{row.title}</span>
            <span className="text-right text-xs text-muted-foreground">
              {row.attempts}
            </span>
            <span className="text-right text-xs text-muted-foreground">
              {row.students}
            </span>
            <span
              className={`text-right text-xs font-semibold ${
                row.passRate >= 70 ? "text-term-green" : "text-term-amber"
              }`}
            >
              {row.passRate}%
            </span>
            <span className="text-right text-xs font-semibold">
              {row.avgScore}%
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        <span className="text-term-green">[ok]</span> {stats?.bookingsTotal ?? "…"}{" "}
        bookings total · {stats?.cancelled ?? "…"} cancelled ·{" "}
        {stats?.reviewsCount ?? "…"} reviews · {stats?.couponsCount ?? "…"}{" "}
        coupons · {quizStats?.totalAttempts ?? "…"} quiz attempts — synced
        live
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

function ReviewsTab() {
  const reviews = useQuery(api.reviews.adminList);
  const removeReview = useMutation(api.reviews.remove);

  const handleDelete = async (id: Id<"reviews">) => {
    if (!window.confirm("Permanently delete this review?")) return;
    try {
      await removeReview({ id });
      toast.success("Review deleted.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not delete review.",
      );
    }
  };

  return (
    <div className="border border-border bg-card">
      <div className="grid grid-cols-[10rem_8rem_1fr_auto] items-center gap-3 border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
        <span>course</span>
        <span>student</span>
        <span>review</span>
        <span className="w-12 text-right">action</span>
      </div>
      {reviews === undefined && (
        <div className="space-y-2 p-4">
          <div className="h-4 animate-pulse bg-muted" />
          <div className="h-4 animate-pulse bg-muted" />
        </div>
      )}
      {reviews !== undefined && reviews.length === 0 && (
        <div className="px-4 py-10 text-center text-sm text-muted-foreground">
          <p>
            <span className="text-term-green">[ok]</span> no reviews yet.
          </p>
        </div>
      )}
      {reviews?.map((review) => (
        <div
          key={review._id}
          className="grid grid-cols-[10rem_8rem_1fr_auto] items-center gap-3 border-b border-border px-4 py-2.5 last:border-b-0 hover:bg-accent/30"
        >
          <span className="truncate text-xs text-muted-foreground">
            {review.courseTitle}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {review.authorName}
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <Star
                  key={value}
                  className={`size-3 ${
                    value <= review.rating
                      ? "fill-term-amber text-term-amber"
                      : "text-muted-foreground/40"
                  }`}
                />
              ))}
              <span className="ml-1 text-[10px] text-muted-foreground">
                {review.rating}/5
              </span>
            </span>
            {review.comment && (
              <span className="mt-0.5 block truncate text-xs text-foreground/80">
                {review.comment}
              </span>
            )}
          </span>
          <span className="flex w-12 justify-end">
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2 text-[11px] text-destructive hover:text-destructive"
              onClick={() => handleDelete(review._id)}
            >
              <Trash2 className="size-3" />
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Coupons
// ---------------------------------------------------------------------------

function CouponsTab() {
  const coupons = useQuery(api.coupons.adminList);
  const createCoupon = useMutation(api.coupons.create);
  const setActive = useMutation(api.coupons.setActive);
  const removeCoupon = useMutation(api.coupons.remove);

  const [code, setCode] = useState("");
  const [percent, setPercent] = useState("15");
  const [maxUses, setMaxUses] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (code.trim().length < 3) {
      toast.error("Code must be at least 3 characters.");
      return;
    }
    setSubmitting(true);
    try {
      await createCoupon({
        code: code.trim().toUpperCase(),
        percentOff: parseInt(percent, 10) || 15,
        maxUses:
          maxUses.trim() !== "" ? parseInt(maxUses, 10) || undefined : undefined,
      });
      setCode("");
      setPercent("15");
      setMaxUses("");
      toast.success("Coupon created and active.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not create coupon.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id: Id<"coupons">, active: boolean) => {
    try {
      await setActive({ id, active });
      toast.success(active ? "Coupon activated." : "Coupon paused.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not update coupon.",
      );
    }
  };

  const handleDelete = async (id: Id<"coupons">) => {
    if (!window.confirm("Delete this coupon? Bookings keep their discount."))
      return;
    try {
      await removeCoupon({ id });
      toast.success("Coupon deleted.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not delete coupon.",
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleCreate} className="border border-border bg-card">
        <div className="border-b border-border bg-muted px-4 py-2.5">
          <span className="text-xs font-semibold">create coupon</span>
        </div>
        <div className="flex flex-wrap items-end gap-3 p-4">
          <div className="space-y-1.5">
            <Label htmlFor="coupon-code">code</Label>
            <Input
              id="coupon-code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="HARVEST15"
              className="w-44 font-mono uppercase"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="coupon-percent">percent off</Label>
            <Input
              id="coupon-percent"
              type="number"
              min="1"
              max="99"
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
              className="w-28"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="coupon-uses">max uses (blank = unlimited)</Label>
            <Input
              id="coupon-uses"
              type="number"
              min="1"
              value={maxUses}
              onChange={(e) => setMaxUses(e.target.value)}
              className="w-28"
              placeholder="unlimited"
            />
          </div>
          <Button type="submit" size="sm" disabled={submitting}>
            {submitting ? <Loader2 className="size-3.5 animate-spin" /> : null}
            create coupon
          </Button>
        </div>
      </form>

      <div className="mt-6 border border-border bg-card">
        <div className="grid grid-cols-[1fr_5rem_8rem_5rem_5rem_auto] items-center gap-3 border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
          <span>code</span>
          <span className="text-right">discount</span>
          <span>created</span>
          <span className="text-right">usage</span>
          <span className="text-right">status</span>
          <span className="w-24 text-right">actions</span>
        </div>
        {coupons === undefined && (
          <div className="space-y-2 p-4">
            <div className="h-4 animate-pulse bg-muted" />
            <div className="h-4 animate-pulse bg-muted" />
          </div>
        )}
        {coupons !== undefined && coupons.length === 0 && (
          <div className="px-4 py-10 text-center text-sm text-muted-foreground">
            <p>
              <span className="text-term-green">[ok]</span> no coupons yet —
              create one above and share the code with students.
            </p>
          </div>
        )}
        {coupons?.map((coupon) => (
          <div
            key={coupon._id}
            className="grid grid-cols-[1fr_5rem_8rem_5rem_5rem_auto] items-center gap-3 border-b border-border px-4 py-2.5 last:border-b-0 hover:bg-accent/30"
          >
            <span className="font-mono text-sm font-semibold">
              {coupon.code}
            </span>
            <span className="text-right text-xs text-term-green">
              {coupon.percentOff}%
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(coupon.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span
              className={`text-right text-xs ${
                coupon.maxUses !== undefined &&
                (coupon.usedCount ?? 0) >= coupon.maxUses
                  ? "text-term-amber"
                  : "text-muted-foreground"
              }`}
            >
              {coupon.usedCount ?? 0}
              {coupon.maxUses !== undefined ? ` / ${coupon.maxUses}` : ""}
            </span>
            <span className="text-right">
              <span
                className={`border px-1.5 py-0.5 text-[10px] font-medium ${
                  coupon.active
                    ? "border-term-green/40 bg-term-green/10 text-term-green"
                    : "border-term-amber/40 bg-term-amber/10 text-term-amber"
                }`}
              >
                {coupon.active ? "ACTIVE" : "PAUSED"}
              </span>
            </span>
            <span className="flex w-24 justify-end gap-1.5">
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 text-[11px]"
                onClick={() => handleToggle(coupon._id, !coupon.active)}
              >
                {coupon.active ? "pause" : "activate"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 text-[11px] text-destructive hover:text-destructive"
                onClick={() => handleDelete(coupon._id)}
              >
                <Trash2 className="size-3" />
              </Button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
