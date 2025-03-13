import Custom404 from "@/components/404";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { getDictionary } from "@/get-dictionary";
import { type Locale, i18n } from "@/i18n-config";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Page not found",
};

export default async function NotFoundPage({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}) {
	// Use default language for the not-found page
	const dictionary = await getDictionary(i18n.defaultLocale);

	return (
		<>
			<Header lang={i18n.defaultLocale} dictionary={dictionary} />
			<Custom404 />
			<Footer lang={i18n.defaultLocale} dictionary={dictionary} />
		</>
	);
}
