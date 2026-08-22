// Convex generated server stubs - replaces output of `npx convex dev`
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import {
  queryGeneric,
  mutationGeneric,
  internalQueryGeneric,
  internalMutationGeneric,
  httpActionGeneric,
  actionGeneric,
  httpRouter,
  defineSchema,
  defineTable,
} from 'convex/server';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const query: typeof queryGeneric = queryGeneric as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mutation: typeof mutationGeneric = mutationGeneric as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const internalQuery: typeof internalQueryGeneric = internalQueryGeneric as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const internalMutation: typeof internalMutationGeneric = internalMutationGeneric as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const action: typeof actionGeneric = actionGeneric as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const httpAction: typeof httpActionGeneric = httpActionGeneric as any;
export { httpRouter, defineSchema, defineTable };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataModel = Record<string, any>;

// Context types normally inferred from DataModel by convex codegen
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryCtx = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MutationCtx = any;
