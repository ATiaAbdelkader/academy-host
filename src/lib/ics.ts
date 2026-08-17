/**
 * Tiny .ics (iCalendar) generator — no dependencies. Used to export bookings
 * and study-plan tasks to any calendar app (Google Calendar, Outlook, Apple
 * Calendar) via a downloaded .ics file.
 */

export type IcsEvent = {
  uid: string;
  title: string;
  description?: string;
  location?: string;
  start: number; // epoch ms
  end: number; // epoch ms
  allDay?: boolean; // date-only event (no time)
};

function pad(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

/** iCalendar date-time: YYYYMMDDTHHMMSSZ (UTC). */
function formatDateTime(ts: number): string {
  const d = new Date(ts);
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  );
}

/** iCalendar date-only: YYYYMMDD (UTC). */
function formatDate(ts: number): string {
  const d = new Date(ts);
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
}

/** Escape text per RFC 5545: backslash, comma, semicolon, newlines. */
function escapeText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/\r?\n/g, "\\n");
}

/** Fold lines longer than 75 octets (RFC 5545 requirement). */
function fold(line: string): string {
  if (line.length <= 75) return line;
  const chunks: string[] = [];
  let rest = line;
  while (rest.length > 0) {
    chunks.push(rest.slice(0, 75));
    rest = rest.slice(75);
  }
  return chunks.join("\r\n ");
}

export function buildIcs(events: IcsEvent[]): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AgriSkills Academy//Study Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];
  for (const event of events) {
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${escapeText(event.uid)}`);
    lines.push(`DTSTAMP:${formatDateTime(Date.now())}`);
    lines.push(
      event.allDay
        ? `DTSTART;VALUE=DATE:${formatDate(event.start)}`
        : `DTSTART:${formatDateTime(event.start)}`,
    );
    lines.push(
      event.allDay
        ? `DTEND;VALUE=DATE:${formatDate(event.end)}`
        : `DTEND:${formatDateTime(event.end)}`,
    );
    lines.push(`SUMMARY:${escapeText(event.title)}`);
    if (event.description) {
      lines.push(`DESCRIPTION:${escapeText(event.description)}`);
    }
    if (event.location) {
      lines.push(`LOCATION:${escapeText(event.location)}`);
    }
    lines.push("END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  return lines.map(fold).join("\r\n");
}

/** Trigger a browser download of the given events as a .ics file. */
export function downloadIcs(events: IcsEvent[], filename: string): void {
  const blob = new Blob([buildIcs(events)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename.endsWith(".ics") ? filename : `${filename}.ics`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
