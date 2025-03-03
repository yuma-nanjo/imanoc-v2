import type { Locale } from "@/i18n-config";
import type { getDictionary } from "@/get-dictionary";
import type { NavItem } from "@/types";

export function getNavItems(
	lang: Locale,
	dictionary: Awaited<ReturnType<typeof getDictionary>>,
): NavItem[] {
	return [
		{
			label: dictionary.menu.home,
			href: `/${lang}/`,
			target: false,
		},
		{
			label: dictionary.menu.about,
			href: `/${lang}/about`,
			target: false,
		},
		{
			label: dictionary.menu.service,
			href: `/${lang}/service`,
			target: false,
		},
		{
			label: dictionary.menu.column,
			href: `/${lang}/column`,
			target: false,
		},
		{
			label: dictionary.menu.news,
			href: `/${lang}/news`,
			target: false,
		},
	];
}
