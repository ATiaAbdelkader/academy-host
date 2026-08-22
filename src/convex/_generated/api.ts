import { anyApi } from "convex/server";

/**
 * This file is a stand-in for the output of `npx convex dev`.
 *
 * `anyApi` is a lazy Proxy: accessing `api.courses.list` returns a valid
 * Convex function reference whose `Symbol(for("functionName"))` evaluates
 * to `"courses:list"` at runtime, which is exactly what `useQuery` /
 * `useMutation` expect.
 *
 * When you run `npx convex dev` for the first time, Convex will overwrite
 * this file with a fully-typed version. Until then, this keeps the app
 * functional.
 */
export const api = anyApi;
export type Api = typeof api;
