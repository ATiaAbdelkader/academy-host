/**
 * Convex API reference — lightweight anyApi proxy.
 *
 * Stand-in for the output of `npx convex dev`.
 *
 * This uses the same Proxy pattern as `anyApi` from `convex/server`, but is
 * self-contained so it works in both server and **browser** bundles.
 * (`convex/server` has no browser export, so Turbopack breaks the Proxy.)
 *
 * When you run `npx convex dev`, Convex will overwrite this file with a
 * fully-typed version. Until then, this keeps the app functional.
 */
const functionNameSymbol = Symbol.for("functionName");

function makeAnyApi(path?: string[]): any {
  return new Proxy({}, {
    get(_target: object, prop: string | symbol): any {
      if (prop === functionNameSymbol) {
        return path ? path.join(":") : undefined;
      }
      if (typeof prop === "string") {
        return makeAnyApi(path ? [...path, prop] : [prop]);
      }
      return undefined;
    },
  });
}

export const api = makeAnyApi();
export type Api = typeof api;
