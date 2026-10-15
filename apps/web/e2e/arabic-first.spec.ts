import { expect, test } from "@playwright/test";
import { captureScreenshot, completeOnboarding, signup } from "./helpers";

// Thiqa: Arabic is one click away on the sign-up page and in the sidebar, and the app turns
// right-to-left. CI builds with English as the default (the hosted image defaults to Arabic).

test("the sign-up page switches to Arabic and right-to-left, and back", async ({
  page,
}, testInfo) => {
  await page.goto("/sign-up");
  const toggle = page.getByTestId("language-toggle");
  await expect(toggle).toHaveText("العربية");

  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.getByRole("heading", { name: "أنشئ حسابك في Thiqa Teammates" })).toBeVisible();
  await expect(page.getByRole("button", { name: "إنشاء حساب" })).toBeVisible();
  await captureScreenshot(page, testInfo, "arabic-sign-up");

  await expect(toggle).toHaveText("English");
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.getByRole("heading", { name: "Create your Thiqa Teammates" })).toBeVisible();
});

test("the sidebar switches the app to Arabic, right-to-left, and the choice persists", async ({
  page,
}, testInfo) => {
  const stamp = Date.now();
  await signup(page, `arabic-first-${stamp}@rakazo.test`, "password12", "Arabic QA");
  await completeOnboarding(page, testInfo);

  const toggle = page.getByTestId("language-toggle");
  await expect(toggle).toHaveText("العربية");
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByText("التكاملات", { exact: true })).toBeVisible();
  await captureScreenshot(page, testInfo, "arabic-shell");

  await page.getByTestId("user-menu-trigger").click();
  await page.getByRole("button", { name: "الإعدادات", exact: true }).click();
  const settings = page.getByTestId("user-settings");
  await expect(settings.getByRole("heading", { name: "عام", exact: true })).toBeVisible();
  await expect(settings.getByRole("heading", { name: "اللغة", exact: true })).toBeVisible();
  await expect(settings.getByTestId("ui-locale-select")).toHaveText("العربية");
  await captureScreenshot(page, testInfo, "arabic-settings");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByTestId("language-toggle")).toHaveText("English");
});
