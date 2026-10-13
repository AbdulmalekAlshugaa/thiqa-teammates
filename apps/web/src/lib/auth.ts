import { organizationClient } from "better-auth/client/plugins";
import { createAuthClient, type ReactAuthClient } from "better-auth/react";
import { BASE_PATH, withBasePath } from "./base-path";

export const authClient: ReactAuthClient<{
  plugins: [ReturnType<typeof organizationClient>];
}> = createAuthClient({
  // Thiqa: under a base path the auth API is not at the origin's /api/auth.
  ...(BASE_PATH && typeof window !== "undefined"
    ? { baseURL: `${window.location.origin}${withBasePath("/api/auth")}` }
    : {}),
  plugins: [organizationClient()],
});
