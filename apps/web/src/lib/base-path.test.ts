import { describe, expect, it, vi } from "vitest";

async function load(base: string) {
  vi.resetModules();
  vi.stubEnv("BASE_URL", base);
  const mod = await import("./base-path");
  vi.unstubAllEnvs();
  return mod;
}

describe("Thiqa base path (client)", () => {
  it("is a no-op at the root", async () => {
    const { BASE_PATH, withBasePath, stripBasePath } = await load("/");
    expect(BASE_PATH).toBe("");
    expect(withBasePath("/api/x")).toBe("/api/x");
    expect(stripBasePath("/novnc/x")).toBe("/novnc/x");
  });

  it("prefixes root paths once, and leaves absolute URLs alone", async () => {
    const { BASE_PATH, withBasePath, stripBasePath } = await load("/teammates/");
    expect(BASE_PATH).toBe("/teammates");
    expect(withBasePath("/api/x")).toBe("/teammates/api/x");
    expect(withBasePath("/teammates/api/x")).toBe("/teammates/api/x");
    expect(withBasePath("https://idp.example/x")).toBe("https://idp.example/x");
    expect(withBasePath("//cdn.example/x")).toBe("//cdn.example/x");
    expect(stripBasePath("/teammates/novnc/x")).toBe("/novnc/x");
    expect(stripBasePath("/teammates")).toBe("/");
    expect(stripBasePath("/teammatesx")).toBe("/teammatesx");
  });
});
