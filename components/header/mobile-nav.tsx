"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import type { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";
import { AlignRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { LANGUAGE_LABELS } from "./index";
import LocaleSwitcher from "./locale-switcher";

export default function MobileNav({
	navItems,
	dictionary,
	lang,
}: {
	navItems: NavItem[];
	dictionary: Awaited<ReturnType<typeof getDictionary>>;
	lang: Locale;
}) {
	const [open, setOpen] = useState(false);
	const [langOpen, setLangOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					aria-label="Open Menu"
					variant="ghost"
					className="w-10 p-5 focus-visible:ring-1 focus-visible:ring-offset-1"
				>
					<AlignRight className="dark:text-white" />
				</Button>
			</SheetTrigger>
			<SheetContent className="overflow-auto bg-background/90">
				<SheetHeader>
					<div className="mx-auto">
						<Logo />
					</div>
					<SheetTitle className="sr-only">Main Navigation</SheetTitle>
				</SheetHeader>

				<div className="pt-10 pb-20 container">
					<ul className="list-none text-left space-y-3">
						{navItems.map((navItem, index) => (
							<li key={`${navItem.label}-${index}`}>
								{navItem.label === dictionary.menu.service ? (
									<div className="space-y-2 text-left">
										<Link
											href={navItem.href}
											target={navItem.target ? "_blank" : undefined}
											rel={navItem.target ? "noopener noreferrer" : undefined}
											className="block transition-colors text-lg hover:opacity-50 mb-2"
											onClick={() => setOpen(false)}
										>
											{navItem.label}
										</Link>
										{/* {services.map((service) => (
											<Link
												key={service.title}
												href={`/${lang}/service/${service?.slug?.current}`}
												className="block text-base ml-4 hover:opacity-50"
												onClick={() => setOpen(false)}
											>
												{service.title}
											</Link>
										))} */}
									</div>
								) : navItem.label === dictionary.menu.company ? (
									<div className="space-y-2 text-left">
										<Link
											href={navItem.href}
											target={navItem.target ? "_blank" : undefined}
											rel={navItem.target ? "noopener noreferrer" : undefined}
											className="block transition-colors text-lg hover:opacity-50 mb-2"
											onClick={() => setOpen(false)}
										>
											{navItem.label}
										</Link>
										{/* {companies.map((company) => (
											<Link
												key={company.title}
												href={`/${lang}/company/${company?.slug?.current}`}
												className="block text-base ml-4 hover:opacity-50"
												onClick={() => setOpen(false)}
											>
												{company.title}
											</Link>
										))} */}
									</div>
								) : (
									<Link
										onClick={() => setOpen(false)}
										href={navItem.href}
										target={navItem.target ? "_blank" : undefined}
										rel={navItem.target ? "noopener noreferrer" : undefined}
										className="hover:opacity-50 text-lg"
									>
										{navItem.label}
									</Link>
								)}
							</li>
						))}
						<li className="mt-10">
							<Collapsible
								open={langOpen}
								onOpenChange={setLangOpen}
								className="border rounded-md inline-block"
							>
								<CollapsibleTrigger asChild>
									<Button
										variant="ghost"
										className="font-normal hover:opacity-50 hover:text-foreground hover:bg-transparent"
									>
										{LANGUAGE_LABELS[lang](dictionary)}
										<ChevronRight
											className={cn(
												"h-6 w-6 transition-transform text-foreground duration-300",
												langOpen ? "rotate-90" : "",
											)}
										/>
									</Button>
								</CollapsibleTrigger>
								<CollapsibleContent className="py-2 px-4">
									<LocaleSwitcher className="h-10 flex items-center justify-center hover:opacity-50 text-sm" />
								</CollapsibleContent>
							</Collapsible>
						</li>
						<li>
							<Link href="/contact" onClick={() => setOpen(false)}>
								<Button>お問い合わせ</Button>
							</Link>
						</li>
					</ul>
				</div>
			</SheetContent>
		</Sheet>
	);
}
