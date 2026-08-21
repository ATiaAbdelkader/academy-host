import { api } from "@/convex/_generated/api";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { Bell, BellOff, CheckCheck } from "lucide-react";
import { Link } from "react-router";

const KIND_LABELS: Record<string, string> = {
  booking_confirmed: "booking confirmed",
  seat_offered: "seat offered",
  refunded: "refund",
};

export default function Notifications() {
  const data = useQuery(api.inapp.myNotifications);
  const markRead = useMutation(api.inapp.markRead);
  const markAllRead = useMutation(api.inapp.markAllRead);

  const handleMarkAllRead = async () => {
    if (!data) return;
    await markAllRead();
  };

  const notifications = data?.notifications;
  const unread = data?.unread ?? 0;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader path="~/notifications" />

      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs text-term-green">
              [ok] notifications — {unread} unread
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight">
              Notifications
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Booking confirmations, waitlist seat offers, and refunds — all in
              one place.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs"
            disabled={!notifications || notifications.length === 0 || unread === 0}
            onClick={() => void handleMarkAllRead()}
          >
            <CheckCheck className="size-3.5" />
            mark all read
          </Button>
        </div>

        <div className="mt-8 border border-border bg-card">
          {notifications === undefined && (
            <div className="space-y-2 p-4">
              <div className="h-4 animate-pulse bg-muted" />
              <div className="h-4 animate-pulse bg-muted" />
            </div>
          )}

          {notifications !== undefined && notifications.length === 0 && (
            <div className="px-4 py-12 text-center text-xs text-muted-foreground">
              <BellOff className="mx-auto size-6" />
              <p className="mt-3">
                <span className="text-term-green">[ok]</span> no notifications
                yet — activity will appear here as you train.
              </p>
            </div>
          )}

          {notifications?.map((notification) => (
            <div
              key={notification._id}
              className={`flex items-start gap-3 border-b border-border px-4 py-3.5 last:border-b-0 ${
                notification.readAt ? "opacity-60" : ""
              }`}
            >
              <span className="mt-0.5 shrink-0">
                {notification.readAt ? (
                  <Bell className="size-4 text-muted-foreground" />
                ) : (
                  <Bell className="size-4 text-term-green" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <span className="border border-border bg-muted px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-muted-foreground">
                    {KIND_LABELS[notification.kind] ?? notification.kind}
                  </span>
                  {!notification.readAt && (
                    <span className="size-1.5 rounded-full bg-term-green-bright" />
                  )}
                </div>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {notification.body}
                </p>
                <p className="mt-1.5 text-[10px] text-muted-foreground/70">
                  {new Date(notification.createdAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {notification.link && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="h-7 shrink-0 text-[11px]"
                  onClick={() => void markRead({ id: notification._id })}
                >
                  <Link to={notification.link}>open</Link>
                </Button>
              )}
            </div>
          ))}
        </div>

        {notifications !== undefined && notifications.length > 0 && (
          <p className="mt-4 text-xs text-muted-foreground">
            <span className="text-term-green">[ok]</span>{" "}
            {notifications.length} notifications · read items are dimmed
          </p>
        )}
      </div>
    </main>
  );
}
