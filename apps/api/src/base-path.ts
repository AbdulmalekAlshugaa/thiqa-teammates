/**
 * Thiqa: serving the app under a path of another origin (e.g. `/teammates`).
 *
 * The web server strips the prefix before proxying, so this API keeps answering `/api/...` and
 * `/rpc/...`. Better Auth is the exception: it matches requests against the path of its own base
 * URL, which must carry the prefix so the URLs it hands out (OIDC callbacks, links) do too. So
 * auth requests get the prefix back before Better Auth sees them.
 */
export function resolveBasePath(raw: string | undefined = process.env.RAKAZO_BASE_PATH): string {
  const trimmed = (raw ?? "").trim().replace(/\/+$/, "");
  if (trimmed === "") return "";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

/** `/api/auth/x` → `/teammates/api/auth/x` when a base path is set; unchanged otherwise. */
export function withAuthBasePath(request: Request, base: string = resolveBasePath()): Request {
  if (!base) return request;
  const url = new URL(request.url);
  if (url.pathname.startsWith(`${base}/`)) return request;
  url.pathname = `${base}${url.pathname}`;
  return new Request(url, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    signal: request.signal,
    redirect: request.redirect,
    // A streamed body needs half duplex in Node's fetch.
    ...(request.body ? { duplex: "half" } : {}),
  } as RequestInit);
}

/**
 * Better Auth's cookie prefix. Under a base path the app shares an origin, and with it a cookie
 * jar, with another Better Auth app; the default prefix would make the two sign each other out.
 */
export function authCookiePrefix(
  source: NodeJS.ProcessEnv = process.env,
  base: string = resolveBasePath(source.RAKAZO_BASE_PATH),
): string | undefined {
  const explicit = source.AUTH_COOKIE_PREFIX?.trim();
  if (explicit) return explicit;
  return base ? `rakazo${base.replace(/[^a-z0-9]+/gi, "-")}`.replace(/-+$/, "") : undefined;
}
