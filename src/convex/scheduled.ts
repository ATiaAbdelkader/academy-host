import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();

// Every 30 minutes: send 24-hour and 1-hour session reminders. Each session
// and booking is only emailed once thanks to the marker fields.
crons.interval(
  "session-reminders",
  { minutes: 30 },
  api.notifications.sendSessionReminders,
);

export default crons;
