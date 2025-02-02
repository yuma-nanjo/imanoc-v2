"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n-config";

const LANGUAGE_MAP: Record<Locale, { label: string }> = {
  en: { label: "English" },
  es: { label: "Español" },
  fr: { label: "Français" },
};

export default function LocaleSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();

  const getCurrentLocale = (): Locale => {
    if (!pathname) return i18n.defaultLocale;
    const segments = pathname.split("/");
    return i18n.locales.includes(segments[1] as Locale)
      ? (segments[1] as Locale)
      : i18n.defaultLocale;
  };

  const currentLocale = getCurrentLocale();

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="flex flex-col w-full">
      {i18n.locales
        .filter((locale) => locale !== currentLocale)
        .map((locale) => (
          <Link
            key={locale}
            href={redirectedPathname(locale)}
            className={className}
          >
            {LANGUAGE_MAP[locale].label}
          </Link>
        ))}
    </div>
  );
}
