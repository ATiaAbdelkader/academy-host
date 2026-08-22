import { api } from "@/convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth, useQuery } from "@/lib/convex-react-safe";

export function useAuth() {
  // During SSR/prerendering, ConvexAuthProvider is not in the tree,
  // so useConvexAuth() returns undefined.
  const authResult = useConvexAuth();
  const isAuthLoading = authResult?.isLoading ?? true;
  const isAuthenticated = authResult?.isAuthenticated ?? false;

  const user = useQuery(api.users.currentUser);

  // useAuthActions also returns undefined without ConvexAuthProvider.
  let signIn: ReturnType<typeof useAuthActions>["signIn"];
  let signOut: ReturnType<typeof useAuthActions>["signOut"];
  const actions = useAuthActions();
  if (actions) {
    signIn = actions.signIn;
    signOut = actions.signOut;
  } else {
    signIn = () => Promise.resolve({ signingIn: true } as any);
    signOut = () => Promise.resolve({ signingIn: false } as any);
  }

  const isLoading = isAuthLoading || user === undefined;

  return {
    isLoading,
    isAuthenticated,
    user,
    signIn,
    signOut,
  };
}
