/**
 * Gamification point values shared between the Convex backend
 * (src/convex/gamification.ts) and the client UI (src/pages/Gamification.tsx).
 * Keep in sync with the backend definition.
 */
export const POINTS = {
  quizPass: 10,
  courseCompleted: 50,
  attended: 20,
  booking: 5,
  review: 5,
  planCompleted: 30,
} as const;
