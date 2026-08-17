/**
 * Badge catalog shared between the Convex backend (badge computation) and the
 * dashboard UI (rendering). Keep in sync with the ids computed in
 * src/convex/gamification.ts.
 */
export const BADGE_DEFS: Record<string, { label: string; blurb: string }> = {
  first_pass: { label: "First Pass", blurb: "Passed your first module quiz." },
  quiz_master: { label: "Quiz Master", blurb: "Passed 10 module quizzes." },
  quiz_legend: { label: "Quiz Legend", blurb: "Passed 25 module quizzes." },
  first_course: { label: "First Course", blurb: "Completed your first course." },
  scholar: { label: "Scholar", blurb: "Completed 3 courses." },
  graduate: { label: "Graduate", blurb: "Completed 6 courses." },
  streak_3: { label: "On a Roll", blurb: "Studied 3 days in a row." },
  streak_7: { label: "Week Warrior", blurb: "Studied 7 days in a row." },
  streak_14: { label: "Iron Discipline", blurb: "Studied 14 days in a row." },
  attendee: { label: "Attendee", blurb: "Attended your first live session." },
  regular: { label: "Regular", blurb: "Attended 5 live sessions." },
  first_booking: { label: "Booked", blurb: "Reserved your first session." },
  reviewer: { label: "Reviewer", blurb: "Left your first course review." },
};
