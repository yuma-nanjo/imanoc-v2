import Link from "next/link";
import Logo from "@/components/logo";
import MobileNav from "@/components/header/mobile-nav";
import DesktopNav from "@/components/header/desktop-nav";
import { ModeToggle } from "@/components/menu-toggle";
import { type getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { getNavItems } from "@/lib/nav-items";

export const LANGUAGE_LABELS = {
  en: (dictionary: Awaited<ReturnType<typeof getDictionary>>) =>
    dictionary.global.english,
  es: (dictionary: Awaited<ReturnType<typeof getDictionary>>) =>
    dictionary.global.spanish,
  fr: (dictionary: Awaited<ReturnType<typeof getDictionary>>) =>
    dictionary.global.french,
} as const;

export default function Header({
  lang,
  dictionary,
}: {
  lang: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const navItems = getNavItems(lang, dictionary);

  return (
    <header className="sticky top-0 w-full border-border/40 bg-background/95 z-50">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" aria-label="Home page">
          <Logo />
        </Link>
        <div className="hidden xl:flex gap-7 items-center justify-between">
          <DesktopNav navItems={navItems} dictionary={dictionary} lang={lang} />
          <ModeToggle />
        </div>
        <div className="flex items-center xl:hidden">
          <ModeToggle />
          <MobileNav navItems={navItems} dictionary={dictionary} lang={lang} />
        </div>
      </div>
    </header>
  );
}
