import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import PostHero from "@/components/ui/post/hero";
import type { BreadcrumbLink } from "@/types";
import PortableTextRenderer from "@/components/portable-text-renderer";
import {
	fetchSanityPostBySlug,
	fetchSanityPostsStaticParams,
} from "@/sanity/lib/fetch";
import { generatePageMetadata } from "@/sanity/lib/metadata";
import type { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { Toc } from "@/components/ui/post/toc";
import { DesktopToc } from "@/components/ui/post/desktop-toc";
import { MobileToc } from "@/components/ui/post/mobile-toc";
export async function generateStaticParams(props: {
	params: Promise<{ lang: Locale }>;
}) {
	const { lang } = await props.params;
	const posts = await fetchSanityPostsStaticParams({ language: lang });

	return posts.map((post) => ({
		slug: post.slug?.current,
	}));
}

export async function generateMetadata(props: {
	params: Promise<{ slug: string; lang: Locale }>;
}) {
	const { slug, lang } = await props.params;
	const post = await fetchSanityPostBySlug({ slug, language: lang });

	if (!post) {
		notFound();
	}

	return generatePageMetadata({ page: post, slug: `/column/${slug}`, lang });
}

export default async function PostPage(props: {
	params: Promise<{ slug: string; lang: Locale }>;
}) {
	const { slug, lang } = await props.params;
	const post = await fetchSanityPostBySlug({ slug, language: lang });
	const dictionary = await getDictionary(lang);
	if (!post) {
		notFound();
	}

	const links: BreadcrumbLink[] = post
		? [
				{
					label: dictionary.menu.home,
					href: `/${lang}/`,
				},
				{
					label: dictionary.menu.column,
					href: `/${lang}/column`,
				},
				{
					label: post.title as string,
					href: "#",
				},
			]
		: [];

	return (
		<section>
			<div className="container mx-auto py-16 xl:py-20">
				<article className="max-w-none prose dark:prose-invert">
					<Breadcrumbs links={links} />
					<PostHero {...post} lang={lang} />
					<div className="flex flex-col lg:flex-row-reverse gap-4">
						<DesktopToc headings={post.headings} />
						<div className="w-full lg:w-3/4">
							{post.body && <PortableTextRenderer value={post.body} />}
						</div>
					</div>
				</article>
			</div>
			<MobileToc headings={post.headings} />
		</section>
	);
}
