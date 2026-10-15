/**
 * Thiqa Teammates' marketing site, over upstream Rakazo's.
 *
 * This fork merges elie222/rakazo weekly, so the Thiqa pages live under `src/thiqa/` and upstream
 * files only gain an import. Teammates is the second door into Thiqa AI: same engine, same account,
 * same subscription, so every call to action goes to the Thiqa app, not to a sign-up of its own.
 */
export type ThiqaLocale = "ar" | "en";

/** The Thiqa AI app. Its own domain replaces this host when it has one. */
export const THIQA_APP_URL = "https://web-production-0df79.up.railway.app";

export const THIQA_LOCALE_PATH: Record<ThiqaLocale, string> = { ar: "/", en: "/en/" };

export function thiqaSignUpUrl(locale: ThiqaLocale): string {
  return `${THIQA_APP_URL}/${locale}/sign-up`;
}

/** Signed out, the app sends this through sign-in and back. */
export function thiqaPlansUrl(locale: ThiqaLocale): string {
  return `${THIQA_APP_URL}/${locale}/settings/billing`;
}

export const UPSTREAM_REPO_URL = "https://github.com/elie222/rakazo";
export const FORK_REPO_URL = "https://github.com/AbdulmalekAlshugaa/thiqa-teammates";

/**
 * Display prices from Thiqa AI's plan catalogue (foundry-sales `src/modules/billing/plans.ts`),
 * monthly, in MYR. What a customer pays is whatever the Stripe price says; keep these in step.
 */
export const THIQA_PLANS = [
  { id: "starter", monthly: 149, employees: 1 },
  { id: "growth", monthly: 399, employees: 3 },
  { id: "business", monthly: 999, employees: 10 },
] as const;

export const THIQA_TRIAL_DAYS = 14;
