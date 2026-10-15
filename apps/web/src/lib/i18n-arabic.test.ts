import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { i18n } from "@lingui/core";
import { brandMessages, PRODUCT_NAME } from "@rakazo/ui-tokens";
import { describe, expect, it } from "vitest";
import ar from "../../scripts/translations-ar.json";
import { applyUiDirection } from "./apply-ui-direction";
import {
  isUiLocale,
  normalizeUiLocale,
  resolveUiLocale,
  UI_LOCALE_LABELS,
  UI_LOCALES,
} from "./ui-locale";

// Thiqa: the Arabic-first locale. Kept in its own file so upstream's i18n tests merge untouched.

const catalog = (locale: string) =>
  readFileSync(fileURLToPath(new URL(`../locales/${locale}/messages.po`, import.meta.url)), "utf8");

/** msgid → msgstr for a Lingui `.po` (single-line entries, as `lingui extract` writes them). */
function entries(po: string): Map<string, string> {
  const map = new Map<string, string>();
  let id: string | null = null;
  for (const line of po.split("\n")) {
    if (line.startsWith("msgid ")) id = JSON.parse(line.slice(6)) as string;
    else if (line.startsWith("msgstr ") && id) {
      map.set(id, JSON.parse(line.slice(7)) as string);
      id = null;
    }
  }
  return map;
}

const placeholders = (s: string) =>
  [...s.matchAll(/\{([A-Za-z0-9_]+)(?=[},])/g)].map((m) => m[1]).sort();
const tags = (s: string) => [...s.matchAll(/<\/?\d+\/?>/g)].map((m) => m[0]).sort();

describe("Arabic catalogue", () => {
  const source = entries(catalog("en"));
  const arabic = entries(catalog("ar"));

  it("translates every source message", () => {
    expect(source.size).toBeGreaterThan(1000);
    const missing = [...source.keys()].filter((id) => !arabic.get(id)?.trim());
    expect(missing).toEqual([]);
  });

  it("keeps every placeholder, rich-text tag and the upstream product word the brand layer renames", () => {
    for (const [id, text] of arabic) {
      expect(placeholders(text), id).toEqual(placeholders(id));
      expect(tags(text), id).toEqual(tags(id));
      if (id.includes("Rakazo")) expect(text, id).toContain("Rakazo");
    }
  });

  it("the seed file and the catalogue agree", () => {
    for (const [id, text] of Object.entries(ar as Record<string, string>))
      expect(arabic.get(id), id).toBe(text);
  });

  it("formats plurals with all six Arabic categories", () => {
    i18n.load("ar", ar as Record<string, string>);
    i18n.activate("ar");
    const id = "{0, plural, one {# model} other {# models}}";
    const models = (n: number) => i18n._({ id, message: id, values: { 0: n } });
    expect(models(0)).toBe("لا توجد نماذج");
    expect(models(1)).toBe("نموذج واحد");
    expect(models(2)).toBe("نموذجان");
    expect(models(3)).toBe("3 نماذج");
    expect(models(11)).toBe("11 نموذجًا");
    expect(models(100)).toBe("100 نموذج");
    expect(i18n._({ id: "Settings", message: "Settings" })).toBe("الإعدادات");
  });

  it("the brand layer names the product in Arabic text too", () => {
    const id = [...arabic.keys()].find((key) => key.includes("Rakazo"))!;
    const branded = brandMessages({ [id]: arabic.get(id)! });
    expect(branded[id]).toContain(PRODUCT_NAME);
    expect(branded[id]).not.toContain("Rakazo");
  });
});

describe("Arabic UI locale", () => {
  it("is a supported locale, labelled in Arabic, and Arabic browser tags resolve to it", () => {
    expect(UI_LOCALES).toContain("ar");
    expect(isUiLocale("ar")).toBe(true);
    expect(UI_LOCALE_LABELS.ar).toBe("العربية");
    for (const tag of ["ar", "ar-SA", "ar-AE", "ar_KW", "AR-qa"])
      expect(normalizeUiLocale(tag)).toBe("ar");
  });

  it("a new visitor starts in Arabic when the build defaults to it, whatever the browser says; a saved choice wins", () => {
    expect(resolveUiLocale({ stored: null, envDefault: "ar", navigatorLanguage: "en-US" })).toBe(
      "ar",
    );
    expect(resolveUiLocale({ stored: "en", envDefault: "ar", navigatorLanguage: "ar-SA" })).toBe(
      "en",
    );
  });

  it("the hosted image builds with Arabic as the default", () => {
    const dockerfile = readFileSync(
      fileURLToPath(new URL("../../../../infra/compose/Dockerfile", import.meta.url)),
      "utf8",
    );
    expect(dockerfile).toMatch(/^ARG VITE_DEFAULT_UI_LOCALE="ar"$/m);
    expect(dockerfile.indexOf("VITE_DEFAULT_UI_LOCALE")).toBeLessThan(
      dockerfile.indexOf("pnpm --filter @rakazo/web build"),
    );
  });

  it("turns the document right-to-left", () => {
    globalThis.document = { documentElement: { dir: "", lang: "" } } as Document;
    expect(applyUiDirection("ar")).toBe("rtl");
    expect(document.documentElement.dir).toBe("rtl");
    expect(document.documentElement.lang).toBe("ar");
  });
});
