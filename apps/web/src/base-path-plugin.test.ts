import type { IncomingMessage } from "node:http";
import { describe, expect, it } from "vitest";
import { basePathPlugin, resolveBasePath } from "./base-path-plugin.js";

type Middleware = (req: IncomingMessage, res: unknown, next: () => void) => void;

function serverFor(base: string) {
  const middlewares: Middleware[] = [];
  const upgrades: ((req: IncomingMessage) => void)[] = [];
  const server = {
    middlewares: { use: (fn: Middleware) => middlewares.push(fn) },
    httpServer: {
      prependListener: (_event: string, fn: (req: IncomingMessage) => void) => upgrades.push(fn),
    },
  };
  const hook = basePathPlugin(base).configurePreviewServer as (s: unknown) => void;
  hook(server);
  const run = (url: string) => {
    const req = { url } as IncomingMessage;
    for (const fn of middlewares) fn(req, {}, () => undefined);
    return req.url;
  };
  const upgrade = (url: string) => {
    const req = { url } as IncomingMessage;
    for (const fn of upgrades) fn(req);
    return req.url;
  };
  return { run, upgrade, count: middlewares.length };
}

describe("Thiqa base path (web server)", () => {
  it("normalises the configured path", () => {
    expect(resolveBasePath(undefined)).toBe("");
    expect(resolveBasePath("/")).toBe("");
    expect(resolveBasePath("teammates")).toBe("/teammates");
  });

  it("strips the prefix from server-bound paths only", () => {
    const { run, upgrade } = serverFor("/teammates");
    expect(run("/teammates/api/auth/session?x=1")).toBe("/api/auth/session?x=1");
    expect(run("/teammates/rpc/me")).toBe("/rpc/me");
    expect(run("/teammates/novnc/session/view/1.abc/")).toBe("/novnc/session/view/1.abc/");
    expect(upgrade("/teammates/novnc/session/view/1.abc/websockify")).toBe(
      "/novnc/session/view/1.abc/websockify",
    );
    // SPA routes and assets keep the prefix for Vite's own base handling.
    expect(run("/teammates/app")).toBe("/teammates/app");
    expect(run("/teammates/assets/index.js")).toBe("/teammates/assets/index.js");
    expect(run("/teammates/apiary")).toBe("/teammates/apiary");
    expect(run("/api/x")).toBe("/api/x");
  });

  it("does nothing at the root", () => {
    expect(serverFor("").count).toBe(0);
  });
});
