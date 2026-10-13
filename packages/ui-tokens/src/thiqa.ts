/**
 * Thiqa Teammates brand layer over upstream Rakazo.
 *
 * This fork merges elie222/rakazo weekly, so the brand lives here, in one file, and upstream files
 * only gain a line or two that read from it. Colours come from Thiqa AI's design tokens (oklch,
 * converted to opaque hex because every surface, mobile included, parses hex). Rakazo's slot
 * meanings are kept: `accent` is a neutral hover fill, not Thiqa's clay, and `link` doubles as the
 * working-state colour.
 */
import type { ColorTokens } from "./index.js";

export const PRODUCT_NAME = "Thiqa Teammates";

const UPSTREAM_PRODUCT_NAME = "Rakazo";

/** Light: Thiqa's "Dawn" palette (cream ground, warm charcoal, terracotta primary). */
export const thiqaLightTokens = {
  background: "#F8F5F1", // oklch(0.972 0.007 85)
  foreground: "#1E1A16", // oklch(0.22 0.01 60)
  card: "#FDFCF9", // oklch(0.99 0.004 85)
  cardForeground: "#1E1A16",
  popover: "#FDFCF9",
  popoverForeground: "#1E1A16",
  primary: "#B34F2A", // oklch(0.55 0.14 40)
  primaryForeground: "#FCFAF6", // oklch(0.985 0.006 85)
  secondary: "#EFEBE4", // oklch(0.94 0.01 80)
  secondaryForeground: "#1E1A16",
  chatUser: "#E6E0D9", // oklch(0.91 0.012 75)
  chatUserForeground: "#1E1A16",
  muted: "#EFEBE4",
  mutedForeground: "#69625D", // oklch(0.5 0.012 60)
  accent: "#E9E4DD", // oklch(0.92 0.011 78)
  accentForeground: "#1E1A16",
  destructive: "#DF0000", // oklch(0.555 0.245 27.325)
  border: "#DFDAD2", // oklch(0.89 0.012 75)
  input: "#DFDAD2",
  ring: "#B34F2A",
  sidebar: "#F4F1EC", // oklch(0.96 0.008 85)
  sidebarForeground: "#1E1A16",
  sidebarBorder: "#DFDAD2",
  sidebarAccent: "#FDFCF9",
  sidebarAccentForeground: "#1E1A16",
  link: "#9E6033", // oklch(0.55 0.1 55), Thiqa's clay
  statusWorking: "#9E6033",
  success: "#00792F", // oklch(0.5 0.15 150)
  scrollbar: "#C9C3BC",
  scrollbarHover: "#A9A49C",
} as const satisfies Partial<ColorTokens>;

/** Dark: Thiqa's "Night" palette (warm near-black, lighter terracotta, peach). */
export const thiqaDarkTokens = {
  background: "#181513", // oklch(0.2 0.006 60)
  foreground: "#F1EEE9", // oklch(0.95 0.008 80)
  card: "#23201D", // oklch(0.245 0.007 60)
  cardForeground: "#F1EEE9",
  popover: "#23201D",
  popoverForeground: "#F1EEE9",
  primary: "#DF7752", // oklch(0.68 0.14 40)
  primaryForeground: "#100C0A", // oklch(0.16 0.008 60)
  secondary: "#2E2A27", // oklch(0.29 0.008 60)
  secondaryForeground: "#F1EEE9",
  chatUser: "#36322F", // oklch(0.32 0.008 60)
  chatUserForeground: "#F1EEE9",
  muted: "#2E2A27",
  mutedForeground: "#AFAAA4", // oklch(0.74 0.01 70)
  accent: "#292623", // oklch(0.27 0.008 60)
  accentForeground: "#F1EEE9",
  destructive: "#FF8382", // oklch(0.76 0.16 22)
  destructiveForeground: "#100C0A",
  border: "#2D2A29", // 9% white over the ground
  input: "#383634", // 14% white over the ground
  ring: "#DF7752",
  sidebar: "#23201D",
  sidebarForeground: "#F1EEE9",
  sidebarBorder: "#2D2A29",
  sidebarAccent: "#2E2A27",
  sidebarAccentForeground: "#F1EEE9",
  link: "#F2AD73", // oklch(0.8 0.11 60), Thiqa's peach
  statusWorking: "#F2AD73",
  success: "#4BCB71", // oklch(0.75 0.17 150)
  scrollbar: "#36322F",
  scrollbarHover: "#4B4743",
} as const satisfies Partial<ColorTokens>;

type CatalogValue = string | readonly unknown[] | unknown;

function rename(value: CatalogValue): CatalogValue {
  if (typeof value === "string") return value.replaceAll(UPSTREAM_PRODUCT_NAME, PRODUCT_NAME);
  if (Array.isArray(value)) return value.map(rename);
  return value;
}

/**
 * Renames the product in a compiled Lingui catalogue, in every locale, at load time, so the
 * upstream `.po` files stay untouched and keep merging cleanly. Compiled values are strings or
 * nested arrays of tokens; anything else passes through unchanged.
 */
export function brandMessages<T extends Record<string, unknown>>(messages: T): T {
  return Object.fromEntries(
    Object.entries(messages).map(([id, value]) => [id, rename(value)]),
  ) as T;
}
