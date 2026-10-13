import { describe, expect, it } from "vitest";
import { botColors, tokens } from "./theme.js";

describe("mobile theme tokens", () => {
  it("exposes the shared product palette used by custom surfaces", () => {
    expect(tokens.background).toBe("#181513");
    expect(tokens.foreground).toBe("#F1EEE9");
    expect(tokens.primary).toBe("#DF7752");
  });

  it("re-exports botColors for identity accents", () => {
    expect(botColors.length).toBeGreaterThan(0);
    expect(botColors[0]).toBe("#3EC5A8");
  });
});
