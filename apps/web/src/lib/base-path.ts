/**
 * Thiqa: the path this web app is served under (e.g. `/teammates` when it lives inside another
 * app's origin), or "" at the root. Vite bakes it from `RAKAZO_BASE_PATH` at build time as
 * `import.meta.env.BASE_URL`; tests and root builds see "/".
 */
export const BASE_PATH = normalize(import.meta.env.BASE_URL ?? "/");

function normalize(base: string): string {
  const trimmed = base.replace(/\/+$/, "");
  return trimmed === "" || trimmed === "." ? "" : trimmed;
}

/** `/api/x` → `/teammates/api/x`. Leaves absolute URLs and already-prefixed paths alone. */
export function withBasePath(path: string): string {
  if (!BASE_PATH || !path.startsWith("/") || path.startsWith("//")) return path;
  if (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`)) return path;
  return `${BASE_PATH}${path}`;
}

/** `/teammates/novnc/x` → `/novnc/x`, for checks written against root paths. */
export function stripBasePath(pathname: string): string {
  if (!BASE_PATH) return pathname;
  if (pathname === BASE_PATH) return "/";
  return pathname.startsWith(`${BASE_PATH}/`) ? pathname.slice(BASE_PATH.length) : pathname;
}
