import type { IncomingMessage } from "node:http";
import type { Plugin, PreviewServer, ViteDevServer } from "vite";

/** Thiqa: `RAKAZO_BASE_PATH=/teammates` → "/teammates"; unset or "/" → "". */
export function resolveBasePath(raw: string | undefined): string {
  const trimmed = (raw ?? "").trim().replace(/\/+$/, "");
  if (trimmed === "") return "";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

// Paths the server proxies or answers itself, rather than the SPA's own routes.
const SERVER_PATHS = ["/api", "/rpc", "/novnc", "/.well-known"];

/**
 * Strips the base path from server-bound requests (`/teammates/api/x` → `/api/x`) before any
 * other middleware sees them, so the existing `/api`, `/rpc` and screen proxies work unchanged.
 * Assets and SPA routes keep the prefix, which Vite's own `base` handling serves.
 */
export function basePathPlugin(base: string): Plugin {
  const strip = (req: IncomingMessage) => {
    if (!base || !req.url?.startsWith(`${base}/`)) return;
    const rest = req.url.slice(base.length);
    const pathname = rest.split("?", 1)[0] ?? "";
    if (SERVER_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) req.url = rest;
  };
  const attach = (server: ViteDevServer | PreviewServer) => {
    if (!base) return;
    server.middlewares.use((req, _res, next) => {
      strip(req);
      next();
    });
    server.httpServer?.prependListener("upgrade", strip);
  };
  return {
    name: "thiqa-base-path",
    // Registered directly (not returned), so these run before Vite's proxy and static handlers.
    configureServer: attach,
    configurePreviewServer: attach,
  };
}
