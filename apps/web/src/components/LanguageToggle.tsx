import { useLingui } from "@lingui/react/macro";
import { Button } from "@rakazo/ui-web";
import { Languages } from "lucide-react";
import { useState } from "react";
import { getActiveUiLocale, setUiLocale } from "../lib/i18n";
import { UI_LOCALE_LABELS, type UiLocale } from "../lib/ui-locale";

/**
 * Thiqa: Arabic and English one click apart, outside Account settings. The button names the other
 * language in that language's own script, so it reads correctly whichever one is showing.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const { i18n, t } = useLingui();
  const [pending, setPending] = useState(false);
  const current = i18n?.locale ?? getActiveUiLocale();
  const next: UiLocale = current === "ar" ? "en" : "ar";

  return (
    <Button
      variant="ghost"
      size="sm"
      className={className}
      data-testid="language-toggle"
      aria-label={t`Language`}
      disabled={pending}
      onClick={() => {
        setPending(true);
        void setUiLocale(next).finally(() => setPending(false));
      }}
    >
      <Languages className="text-muted-foreground" strokeWidth={1.75} />
      <span lang={next} dir={next === "ar" ? "rtl" : "ltr"}>
        {UI_LOCALE_LABELS[next]}
      </span>
    </Button>
  );
}
