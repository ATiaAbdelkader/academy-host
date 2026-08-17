/**
 * Offline lesson reading. Students can save a course to the browser so its
 * lessons (text, lists, notes, quiz questions) remain readable without a
 * connection — useful out in the field. Videos and live quiz submissions still
 * need the network; the UI says so.
 */

export type OfflineCourse = {
  slug: string;
  savedAt: number;
  course: Record<string, unknown>;
};

const STORAGE_KEY = "agriskills:offline-courses";

function readAll(): OfflineCourse[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as OfflineCourse[];
  } catch {
    return [];
  }
}

function writeAll(items: OfflineCourse[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage full or unavailable — offline saving silently no-ops.
  }
}

/** Save (or refresh) a course for offline reading. */
export function saveCourseForOffline(
  slug: string,
  course: Record<string, unknown>,
): void {
  const items = readAll().filter((item) => item.slug !== slug);
  items.unshift({ slug, savedAt: Date.now(), course });
  writeAll(items);
}

/** Remove a saved course. */
export function removeOfflineCourse(slug: string): void {
  writeAll(readAll().filter((item) => item.slug !== slug));
}

/** All saved courses, most recently saved first. */
export function listOfflineCourses(): OfflineCourse[] {
  return readAll();
}

/** The saved course for a slug, or null. */
export function getOfflineCourse(slug: string): Record<string, unknown> | null {
  return readAll().find((item) => item.slug === slug)?.course ?? null;
}

/** Whether a course is currently saved for offline reading. */
export function isSavedOffline(slug: string): boolean {
  return readAll().some((item) => item.slug === slug);
}
