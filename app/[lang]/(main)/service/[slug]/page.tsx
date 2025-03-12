import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import ServiceHero from "@/components/ui/service/hero";
import type { BreadcrumbLink } from "@/types";
import PortableTextRenderer from "@/components/portable-text-renderer";
import {
	fetchSanityServiceBySlug,
	fetchSanityServicesStaticParams,
} from "@/sanity/lib/fetch";
import { generatePageMetadata } from "@/sanity/lib/metadata";
import type { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
export async function generateStaticParams(props: {
	params: Promise<{ lang: Locale }>;
}) {
	const { lang } = await props.params;
	const services = await fetchSanityServicesStaticParams({ language: lang });

	return services.map((service) => ({
		slug: service.slug?.current,
	}));
}

export async function generateMetadata(props: {
	params: Promise<{ slug: string; lang: Locale }>;
}) {
	const { slug, lang } = await props.params;
	const service = await fetchSanityServiceBySlug({ slug, language: lang });

	if (!service) {
		notFound();
	}

	return generatePageMetadata({ page: service, slug: `/column/${slug}`, lang });
}

export default async function ServicePage(props: {
	params: Promise<{ slug: string; lang: Locale }>;
}) {
	const { slug, lang } = await props.params;
	const service = await fetchSanityServiceBySlug({ slug, language: lang });
	const dictionary = await getDictionary(lang);
	if (!service) {
		notFound();
	}

	const links: BreadcrumbLink[] = service
		? [
				{
					label: dictionary.menu.home,
					href: `/${lang}/`,
				},
				{
					label: dictionary.menu.column,
					href: `/${lang}/service`,
				},
				{
					label: service.title as string,
					href: "#",
				},
			]
		: [];

	return (
		<section>
			<div className="container py-16 xl:py-20">
				<article className="max-w-3xl mx-auto">
					<Breadcrumbs links={links} />
					<ServiceHero {...service} lang={lang} />
					{service.body && <PortableTextRenderer value={service.body} />}
				</article>
			</div>
		</section>
	);
}
