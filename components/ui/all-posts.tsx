import PostCard from "@/components/ui/post-card";
import SectionContainer from "@/components/ui/section-container";
import type { Locale } from "@/i18n-config";
import type { PAGE_QUERYResult } from "@/sanity.types";
import { fetchSanityPosts } from "@/sanity/lib/fetch";
import { stegaClean } from "next-sanity";
import Link from "next/link";

type AllPosts = Extract<
	NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
	{ _type: "all-posts" }
>;

interface AllPostsProps extends AllPosts {
	lang?: Locale;
}

export default async function AllPosts({
	lang,
	padding,
	colorVariant,
}: AllPostsProps) {
	const color = stegaClean(colorVariant);
	const posts = await fetchSanityPosts({ language: lang || "ja" });

	return (
		<SectionContainer color={color} padding={padding}>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
				{posts.map((post) => (
					<Link
						key={post?.slug?.current}
						className="flex w-full rounded-3xl ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						href={`/${lang}/column/${post?.slug?.current}`}
					>
						<PostCard
							title={post?.title ?? ""}
							excerpt={post?.excerpt ?? ""}
							image={post?.image ?? null}
						/>
					</Link>
				))}
			</div>
		</SectionContainer>
	);
}
