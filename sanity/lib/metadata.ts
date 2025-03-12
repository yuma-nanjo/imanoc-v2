import { urlFor } from "@/sanity/lib/image";
import type { Locale } from "@/i18n-config";
import type {
	COMPANY_QUERYResult,
	PAGE_QUERYResult,
	POST_QUERYResult,
	SERVICE_QUERYResult,
} from "@/sanity.types";
const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export function generatePageMetadata({
	page,
	slug,
	lang,
}: {
	page:
		| PAGE_QUERYResult
		| POST_QUERYResult
		| SERVICE_QUERYResult
		| COMPANY_QUERYResult;
	slug: string;
	lang: Locale;
}) {
	return {
		title: page?.meta_title,
		description: page?.meta_description,
		openGraph: {
			images: [
				{
					url: page?.ogImage
						? urlFor(page?.ogImage).quality(100).url()
						: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
					width: page?.ogImage?.asset?.metadata?.dimensions?.width || 1200,
					height: page?.ogImage?.asset?.metadata?.dimensions?.height || 630,
				},
			],
			locale: "ja_JP",
			type: "website",
		},
		robots: !isProduction
			? "noindex, nofollow"
			: page?.noindex
				? "noindex"
				: "index, follow",
		alternates: {
			canonical: `/${lang}/${slug === "index" ? "" : slug}`,
		},
	};
}
