// @vitest-environment jsdom
import type { ReactNode } from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { authClient } from "../lib/auth";
import type { AuthCapabilities } from "../lib/auth-capabilities";
import { fetchAuthCapabilities } from "../lib/auth-capabilities";
import { AuthPage } from "./Auth";

// Thiqa fork: closed registration and OIDC-only sign-in. Kept apart from Auth.test.tsx so
// upstream changes to that file merge cleanly.
vi.mock("@lingui/react/macro", () => ({
  useLingui: () => ({
    t: (strings: TemplateStringsArray, ...values: unknown[]) =>
      strings.reduce((text, part, index) => text + part + (values[index] ?? ""), ""),
  }),
  Trans: ({ children }: { children: ReactNode }) => children,
}));
vi.mock("@rakazo/ui-web", () => ({
  Button: ({
    children,
    variant,
    size,
    ...props
  }: React.ComponentProps<"button"> & { variant?: string; size?: string }) => (
    <button data-variant={variant ?? "default"} data-size={size} {...props}>
      {children}
    </button>
  ),
  Input: (props: React.ComponentProps<"input">) => <input {...props} />,
  Label: ({ children, htmlFor, ...props }: React.ComponentProps<"label">) => (
    <label htmlFor={htmlFor} {...props}>
      {children}
    </label>
  ),
}));
vi.mock("../lib/auth-capabilities", () => ({ fetchAuthCapabilities: vi.fn() }));
vi.mock("../lib/auth", () => ({ authClient: { signIn: { social: vi.fn(async () => ({})) } } }));
vi.mock("../lib/rpc", () => ({ clearSpaceSelection: vi.fn() }));

const passwordOnly: AuthCapabilities = {
  passwordAuth: true,
  sso: null,
  passwordReset: false,
  resetUrl: null,
};
let host: HTMLDivElement;
let root: ReturnType<typeof createRoot>;
beforeEach(() => {
  vi.clearAllMocks();
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
});
afterEach(async () => {
  await act(async () => root.unmount());
  host.remove();
});
async function visit(path: "/sign-up" | "/sign-in") {
  await act(async () =>
    root.render(
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/sign-up" element={<AuthPage mode="up" />} />
          <Route path="/sign-in" element={<p>sign-in page</p>} />
        </Routes>
      </MemoryRouter>,
    ),
  );
}

it("sends /sign-up to /sign-in when registration is closed", async () => {
  vi.mocked(fetchAuthCapabilities).mockResolvedValue({ ...passwordOnly, signups: false });
  await visit("/sign-up");
  expect(host.textContent).toBe("sign-in page");
});

it.each([true, undefined])("keeps /sign-up when signups is %s", async (signups) => {
  vi.mocked(fetchAuthCapabilities).mockResolvedValue({ ...passwordOnly, signups });
  await visit("/sign-up");
  expect(host.textContent).toContain("Create account");
});

it("drops the sign-up link from sign-in when registration is closed", async () => {
  vi.mocked(fetchAuthCapabilities).mockResolvedValue({ ...passwordOnly, signups: false });
  await act(async () =>
    root.render(
      <MemoryRouter>
        <AuthPage mode="in" />
      </MemoryRouter>,
    ),
  );
  expect(host.textContent).toContain("Continue with email");
  expect(host.textContent).not.toContain("Don’t have an account?");
});

it("offers only the OIDC button when password sign-in is off", async () => {
  vi.mocked(fetchAuthCapabilities).mockResolvedValue({
    passwordAuth: false,
    sso: { name: "Thiqa AI", availability: "available" },
    passwordReset: false,
    resetUrl: null,
    signups: false,
  });
  await act(async () =>
    root.render(
      <MemoryRouter>
        <AuthPage mode="in" />
      </MemoryRouter>,
    ),
  );
  // The only way in is OIDC; the language toggle is the page's one other control.
  const buttons = [...host.querySelectorAll("button")];
  expect(buttons.filter((b) => b.dataset.testid !== "language-toggle")).toHaveLength(1);
  expect(host.querySelector('[data-testid="language-toggle"]')).not.toBeNull();
  expect(host.textContent).toContain("Continue with Thiqa AI");
  expect(host.querySelector("input")).toBeNull();
});

const oidcOnly: AuthCapabilities = {
  passwordAuth: false,
  sso: { name: "Thiqa AI", availability: "available" },
  passwordReset: false,
  resetUrl: null,
};
async function signIn(path = "/sign-in") {
  await act(async () =>
    root.render(
      <MemoryRouter initialEntries={[path]}>
        <AuthPage mode="in" />
      </MemoryRouter>,
    ),
  );
}

it("starts OIDC at once when it is the only way in", async () => {
  vi.mocked(fetchAuthCapabilities).mockResolvedValue(oidcOnly);
  await signIn();
  expect(authClient.signIn.social).toHaveBeenCalledTimes(1);
  expect(authClient.signIn.social).toHaveBeenCalledWith(
    expect.objectContaining({
      provider: "oidc",
      callbackURL: "/app",
      errorCallbackURL: "/sign-in",
    }),
  );
});

it("does not start OIDC again after the provider returned an error", async () => {
  vi.mocked(fetchAuthCapabilities).mockResolvedValue(oidcOnly);
  await signIn("/sign-in?error=access_denied");
  expect(authClient.signIn.social).not.toHaveBeenCalled();
});

it.each(["checking", "unavailable"] as const)(
  "waits for a click while OIDC is %s",
  async (availability) => {
    vi.mocked(fetchAuthCapabilities).mockResolvedValue({
      ...oidcOnly,
      sso: { name: "Thiqa AI", availability },
    });
    await signIn();
    expect(authClient.signIn.social).not.toHaveBeenCalled();
  },
);

it("waits for a click when passwords are also allowed", async () => {
  vi.mocked(fetchAuthCapabilities).mockResolvedValue({ ...oidcOnly, passwordAuth: true });
  await signIn();
  expect(authClient.signIn.social).not.toHaveBeenCalled();
});
