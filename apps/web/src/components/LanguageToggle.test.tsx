// @vitest-environment jsdom

import type { ReactNode } from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({ locale: "en", setUiLocale: vi.fn() }));

vi.mock("@lingui/react/macro", () => ({
  useLingui: () => ({
    i18n: { locale: h.locale },
    t: (strings: TemplateStringsArray) => strings.join(""),
  }),
  Trans: ({ children }: { children: ReactNode }) => children,
}));
vi.mock("@rakazo/ui-web", () => ({
  Button: ({ children, ...props }: React.ComponentProps<"button">) => (
    <button type="button" {...props}>
      {children}
    </button>
  ),
}));
vi.mock("../lib/i18n", () => ({ setUiLocale: h.setUiLocale, getActiveUiLocale: () => "en" }));

import { LanguageToggle } from "./LanguageToggle";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

beforeEach(() => {
  h.setUiLocale.mockReset().mockResolvedValue("ar");
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

const button = () => container.querySelector<HTMLButtonElement>('[data-testid="language-toggle"]')!;

it("offers Arabic, written in Arabic, while the app is in English, and switches to it", async () => {
  h.locale = "en";
  act(() => root.render(<LanguageToggle />));
  expect(button().textContent).toBe("العربية");
  expect(button().getAttribute("aria-label")).toBe("Language");
  expect(button().querySelector("span")?.getAttribute("dir")).toBe("rtl");
  await act(async () => button().click());
  expect(h.setUiLocale).toHaveBeenCalledWith("ar");
});

it("offers English while the app is in Arabic", async () => {
  h.locale = "ar";
  act(() => root.render(<LanguageToggle />));
  expect(button().textContent).toBe("English");
  expect(button().querySelector("span")?.getAttribute("lang")).toBe("en");
  await act(async () => button().click());
  expect(h.setUiLocale).toHaveBeenCalledWith("en");
});

it("from any other language it offers Arabic", () => {
  h.locale = "de";
  act(() => root.render(<LanguageToggle />));
  expect(button().textContent).toBe("العربية");
});
