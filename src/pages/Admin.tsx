import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { AppHeader } from "@/components/AppHeader";
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
  formatMoney,
  formatSession,
  fromLocalInputValue,
  toLocalInputValue,
} from "@/lib/format";
import { useMutation, useQuery } from "convex/react";
import { Loader2, ShieldCheck, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

        <Tabs defaultValue="courses" className="mt-8">
          <TabsList className="gap-1 rounded-none border border-border bg-muted">
            <TabsTrigger value="courses">courses</TabsTrigger>
            <TabsTrigger value="sessions">sessions</TabsTrigger>
            <TabsTrigger value="bookings">bookings</TabsTrigger>
            <TabsTrigger value="comments">comments</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="mt-6">
            <CoursesTab />
          </TabsContent>
          <TabsContent value="sessions" className="mt-6">
            <SessionsTab />
          </TabsContent>
          <TabsContent value="bookings" className="mt-6">
            <BookingsTab />
          </TabsContent>
          <TabsContent value="comments" className="mt-6">
            <CommentsTab />
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
  const [submitting, setSubmitting] = useState(false);

  const [editing, setEditing] = useState<CourseDoc | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDuration, setEditDuration] = useState("");
  const [saving, setSaving] = useState(false);

  const openEdit = (course: CourseDoc) => {
    setEditing(course);
    setEditTitle(course.title);
    setEditCategory(course.category);
    setEditDescription(course.description);
    setEditPrice((course.priceCents / 100).toFixed(2));
    setEditDuration(String(course.durationMinutes));
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
      });
      setTitle("");
      setDescription("");
      setPrice("");
      setDuration("30");
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
          <span className="w-44 text-right">actions</span>
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
            <span className="min-w-0 truncate text-sm font-medium">
              <Link
                to={`/courses/${course.slug}`}
                className="underline-offset-4 hover:underline"
              >
                {course.title}
              </Link>
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
            <span className="flex w-44 justify-end gap-1.5">
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
      });
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

  const handleStatus = async (
    bookingId: Id<"bookings">,
    status: "confirmed" | "cancelled",
  ) => {
    try {
      await setBookingStatus({ bookingId, status });
      toast.success(status === "confirmed" ? "Booking confirmed." : "Booking cancelled.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update booking.");
    }
  };

  return (
    <div className="border border-border bg-card">
      <div className="grid grid-cols-[1fr_1fr_1fr_5rem_4rem_auto] items-center gap-3 border-b border-border bg-muted px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground">
        <span>course</span>
        <span>student</span>
        <span className="hidden sm:block">session</span>
        <span className="text-right">amount</span>
        <span className="text-right">status</span>
        <span className="w-40 text-right">actions</span>
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
            <BookingStatusLabel
              status={booking.status}
              paymentStatus={booking.paymentStatus}
            />
          </span>
          <span className="flex w-40 justify-end gap-1.5">
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
