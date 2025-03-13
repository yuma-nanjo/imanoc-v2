import Header from "@/components/header";
import Footer from "@/components/footer";
import Custom404 from "@/components/404";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

import type { Metadata } from "next";
import { fetchSanityCompanies, fetchSanityServices } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
	title: "Page not found",
};

export default async function NotFoundPage({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}) {
	// Use default language for the not-found page
	const { lang } = await params;
	const dictionary = await getDictionary(i18n.defaultLocale);
	const [services, companies] = await Promise.all([
		fetchSanityServices({ language: lang }),
		fetchSanityCompanies({ language: lang }),
	]);

	return (
		<>
			<Header
				services={services}
				companies={companies}
				lang={i18n.defaultLocale}
				dictionary={dictionary}
			/>
			<Custom404 />
			<Footer lang={i18n.defaultLocale} dictionary={dictionary} />
		</>
	);
}
