/**
 * Tiny client-side CSV helpers for admin exports. No backend needed — rows
 * are serialized, quoted, and downloaded as a .csv file in the browser.
 */

function escapeCell(value: unknown): string {
  const text = value === null || value === undefined ? "" : String(value);
  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

/** Serialize an array of objects into a CSV string (first row = headers). */
export function toCsv(rows: Array<Record<string, unknown>>): string {
  if (rows.length === 0) return "";
  const headers = Array.from(
    new Set(rows.flatMap((row) => Object.keys(row))),
  );
  const lines = [
    headers.map(escapeCell).join(","),
    ...rows.map((row) => headers.map((h) => escapeCell(row[h])).join(",")),
  ];
  return lines.join("\r\n");
}

/** Trigger a browser download of `rows` as `filename`. */
export function downloadCsv(
  filename: string,
  rows: Array<Record<string, unknown>>,
): void {
  const csv = toCsv(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
