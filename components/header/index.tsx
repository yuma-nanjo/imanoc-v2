import DesktopNav from "@/components/header/desktop-nav";
import MobileNav from "@/components/header/mobile-nav";
import Logo from "@/components/logo";
import { ModeToggle } from "@/components/menu-toggle";
import type { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";
import { getNavItems } from "@/lib/nav-items";
import Link from "next/link";
import ContactButton from "./contact-button";
export const LANGUAGE_LABELS = {
	ja: (dictionary: Awaited<ReturnType<typeof getDictionary>>) =>
		dictionary.global.ja,
	en: (dictionary: Awaited<ReturnType<typeof getDictionary>>) =>
		dictionary.global.en,
	zh: (dictionary: Awaited<ReturnType<typeof getDictionary>>) =>
		dictionary.global.zh,
	zht: (dictionary: Awaited<ReturnType<typeof getDictionary>>) =>
		dictionary.global.zht,
} as const;

export default async function Header({
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
				<Link
					href="/"
					aria-label="Home page"
					className="flex gap-2 justify-center items-center"
				>
					<Logo />
					<h1 className="text-base font-mono">imanoc</h1>
				</Link>
				<div className="hidden xl:flex gap-7 items-center justify-between">
					<DesktopNav navItems={navItems} dictionary={dictionary} lang={lang} />
					<ContactButton />
					<ModeToggle />
				</div>
				<div className="flex items-center xl:hidden">
					<ContactButton />
					<ModeToggle />
					<MobileNav navItems={navItems} dictionary={dictionary} lang={lang} />
				</div>
			</div>
		</header>
	);
}
