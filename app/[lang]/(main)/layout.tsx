import { DisableDraftMode } from "@/components/disable-draft-mode";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";
import { SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";

export default async function MainLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ lang: Locale }>;
}) {
	const { lang } = await params;
	const dictionary = await getDictionary(lang);
	return (
		<>
			<Header lang={lang} dictionary={dictionary} />
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
