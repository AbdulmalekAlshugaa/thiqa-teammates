import { describe, expect, it } from "vitest";
import { authCookiePrefix, resolveBasePath, withAuthBasePath } from "./base-path.js";

describe("Thiqa base path (API)", () => {
  it("normalises the configured path", () => {
    expect(resolveBasePath(undefined)).toBe("");
    expect(resolveBasePath("")).toBe("");
    expect(resolveBasePath("/")).toBe("");
    expect(resolveBasePath("teammates/")).toBe("/teammates");
    expect(resolveBasePath("/teammates")).toBe("/teammates");
  });

  it("gives auth requests their prefix back, body included, and leaves root deployments alone", async () => {
    const original = new Request("http://api.test/api/auth/sign-in/social?x=1", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ provider: "oidc" }),
    });
    const prefixed = withAuthBasePath(original, "/teammates");
    expect(new URL(prefixed.url).pathname).toBe("/teammates/api/auth/sign-in/social");
    expect(new URL(prefixed.url).search).toBe("?x=1");
    expect(prefixed.method).toBe("POST");
    expect(await prefixed.json()).toEqual({ provider: "oidc" });

    const root = new Request("http://api.test/api/auth/session");
    expect(withAuthBasePath(root, "")).toBe(root);
    const already = new Request("http://api.test/teammates/api/auth/session");
    expect(withAuthBasePath(already, "/teammates")).toBe(already);
  });

  it("gives a shared-origin deployment its own cookie prefix", () => {
    expect(authCookiePrefix({}, "")).toBeUndefined();
    expect(authCookiePrefix({}, "/teammates")).toBe("rakazo-teammates");
    expect(authCookiePrefix({ AUTH_COOKIE_PREFIX: "thiqa" }, "/teammates")).toBe("thiqa");
    expect(authCookiePrefix({ AUTH_COOKIE_PREFIX: "thiqa" }, "")).toBe("thiqa");
  });
});
