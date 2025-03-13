import Header from "@/components/header";
import Footer from "@/components/footer";
import { DisableDraftMode } from "@/components/disable-draft-mode";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { SanityLive } from "@/sanity/lib/live";
import { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";
import { fetchSanityCompanies, fetchSanityServices } from "@/sanity/lib/fetch";

export default async function MainLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ lang: Locale }>;
}) {
	const { lang } = await params;
	const dictionary = await getDictionary(lang);
	const [services, companies] = await Promise.all([
		fetchSanityServices({ language: lang }),
		fetchSanityCompanies({ language: lang }),
	]);
	return (
		<>
			<Header
				lang={lang}
				dictionary={dictionary}
				services={services}
				companies={companies}
			/>
			<main>{children}</main>
			<SanityLive />
			{(await draftMode()).isEnabled && (
				<>
					<DisableDraftMode />
					<VisualEditing />
				</>
			)}
			<Footer lang={lang} dictionary={dictionary} />
		</>
	);
}
