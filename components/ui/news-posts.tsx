import SectionContainer from "@/components/ui/section-container";
import type { Locale } from "@/i18n-config";
import type { PAGE_QUERYResult } from "@/sanity.types";
import { fetchSanityNewsPosts } from "@/sanity/lib/fetch";
import { stegaClean } from "next-sanity";
import Link from "next/link";
import NewsPostCard from "./news-post-card";

type NewsPosts = Extract<
	NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
	{ _type: "news-posts" }
>;

interface NewsPostsProps extends NewsPosts {
	lang?: Locale;
}

export default async function NewsPosts({
	lang,
	padding,
	colorVariant,
}: NewsPostsProps) {
	const color = stegaClean(colorVariant);
	const posts = await fetchSanityNewsPosts({
		language: lang || "ja",
	});

	return (
		<SectionContainer color={color} padding={padding}>
			<ul className="list-news js-inview animation-slide-up is-inview">
				{posts.map((post) => (
					<li
						key={post?.slug?.current}
						className="border-accent/30 border-t last:border-b"
					>
						<Link href={`/${lang}/news/${post?.slug?.current}`}>
							<NewsPostCard
								title={post?.title ?? ""}
								_createdAt={post?._createdAt}
							/>
						</Link>
					</li>
				))}
			</ul>
		</SectionContainer>
	);
}
