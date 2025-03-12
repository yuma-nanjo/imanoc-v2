import Logo from "@/components/logo";
import type { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";
import { getNavItems } from "@/lib/nav-items";
import Link from "next/link";

export default function Footer({
	lang,
	dictionary,
}: {
	lang: Locale;
	dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
	const getCurrentYear = () => {
		return new Date().getFullYear();
	};

	const navItems = getNavItems(lang, dictionary);

	return (
		<footer>
			<div className="dark:bg-background pb-5 xl:pb-5 dark:text-gray-300">
				<Link
					className="flex items-center justify-center"
					href="/"
					aria-label="Home page"
				>
					<Logo />
				</Link>
				<div className="mt-8 flex flex-wrap items-center justify-center gap-7 text-primary">
					{navItems.map((navItem) => (
						<Link
							key={navItem.label}
							href={navItem.href}
							target={navItem.target ? "_blank" : undefined}
							rel={navItem.target ? "noopener noreferrer" : undefined}
							className="transition-colors hover:text-foreground/80 text-foreground/60 text-sm"
						>
							{navItem.label}
						</Link>
					))}
				</div>
				<div className="mt-8 flex flex-col lg:flex-row gap-6 justify-center text-center lg:mt-5 text-xs border-t pt-8">
					<p className="text-foreground/60">
						&copy; {getCurrentYear()} imanoc,Inc.
					</p>
				</div>
			</div>
		</footer>
	);
}
