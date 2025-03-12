import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import CompanyHero from "@/components/ui/company/hero";
import type { BreadcrumbLink } from "@/types";
import PortableTextRenderer from "@/components/portable-text-renderer";
import {
	fetchSanityCompanyBySlug,
	fetchSanityCompaniesStaticParams,
} from "@/sanity/lib/fetch";
import { generatePageMetadata } from "@/sanity/lib/metadata";
import type { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
export async function generateStaticParams(props: {
	params: Promise<{ lang: Locale }>;
}) {
	const { lang } = await props.params;
	const companys = await fetchSanityCompaniesStaticParams({ language: lang });

	return companys.map((company) => ({
		slug: company.slug?.current,
	}));
}

export async function generateMetadata(props: {
	params: Promise<{ slug: string; lang: Locale }>;
}) {
	const { slug, lang } = await props.params;
	const company = await fetchSanityCompanyBySlug({ slug, language: lang });

	if (!company) {
		notFound();
	}

	return generatePageMetadata({
		page: company,
		slug: `/company/${slug}`,
		lang,
	});
}

export default async function CompanyPage(props: {
	params: Promise<{ slug: string; lang: Locale }>;
}) {
	const { slug, lang } = await props.params;
	const company = await fetchSanityCompanyBySlug({ slug, language: lang });
	const dictionary = await getDictionary(lang);
	if (!company) {
		notFound();
	}

	const links: BreadcrumbLink[] = company
		? [
				{
					label: dictionary.menu.home,
					href: `/${lang}/`,
				},
				{
					label: dictionary.menu.column,
					href: `/${lang}/company`,
				},
				{
					label: company.title as string,
					href: "#",
				},
			]
		: [];

	return (
		<section>
			<div className="container py-16 xl:py-20">
				<article className="max-w-3xl mx-auto">
					<Breadcrumbs links={links} />
					<CompanyHero {...company} lang={lang} />
					{company.body && <PortableTextRenderer value={company.body} />}
				</article>
			</div>
		</section>
	);
}
