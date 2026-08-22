// Convex generated API stub – replaces output of `npx convex dev`
// Uses Proxy so any `api.<module>.<function>` access works at runtime.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fnStub: any = function () { return undefined; };
fnStub.__args = {};

export const api = new Proxy({} as any, {
  get(_target: any, _prop: string | symbol) {
    return new Proxy({} as any, {
      get() {
        return fnStub;
      },
    });
  },
});

export type Api = typeof api;
