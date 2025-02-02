import { Locale } from "@/i18n-config";
import { type getDictionary } from "@/get-dictionary";
import { NavItem } from "@/types";

export function getNavItems(
  lang: Locale,
  dictionary: Awaited<ReturnType<typeof getDictionary>>
): NavItem[] {
  return [
    {
      label: dictionary.menu.home,
      href: `/${lang}/`,
      target: false,
    },
    {
      label: dictionary.menu.blog,
      href: `/${lang}/blog`,
      target: false,
    },
    {
      label: dictionary.menu.about,
      href: `/${lang}/about`,
      target: false,
    },
  ];
}
