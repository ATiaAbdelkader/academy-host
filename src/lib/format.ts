/** "$49.00" — or "free" for zero-priced courses. */
export function formatMoney(cents: number): string {
  if (cents === 0) {
    return "free";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

const dateTimeFmt = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});

const timeFmt = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

/** "Thu, Aug 20, 2026" */
export function formatDate(epochMs: number): string {
  return dateTimeFmt.format(epochMs);
}

/** "9:00 AM" */
export function formatTime(epochMs: number): string {
  return timeFmt.format(epochMs);
}

/** "Thu, Aug 20 · 9:00 AM" */
export function formatSession(epochMs: number): string {
  return `${formatDate(epochMs)} · ${formatTime(epochMs)}`;
}

/** "Aug 20, 2026, 9:00 AM" for datetime-local inputs */
export function toLocalInputValue(epochMs: number): string {
  const d = new Date(epochMs);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
}

/** Parse a datetime-local input value into epoch ms. */
export function fromLocalInputValue(value: string): number {
  return new Date(value).getTime();
}
