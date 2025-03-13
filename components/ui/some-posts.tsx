import PostCard from "@/components/ui/post-card";
import SectionContainer from "@/components/ui/section-container";
import type { Locale } from "@/i18n-config";
import type { PAGE_QUERYResult } from "@/sanity.types";
import { fetchSanityPosts } from "@/sanity/lib/fetch";
import { stegaClean } from "next-sanity";
import Link from "next/link";
import SomePostsClient from "./post/some-posts-client";

type SomePosts = Extract<
	NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
	{ _type: "some-posts" }
>;

interface SomePostsProps extends SomePosts {
	lang?: Locale;
}

export default async function SomePosts({
	lang,
	padding,
	colorVariant,
}: SomePostsProps) {
	const color = stegaClean(colorVariant);
	const posts = await fetchSanityPosts({ language: lang || "ja" });

	return (
		<SectionContainer color={color} padding={padding}>
			<SomePostsClient posts={posts} lang={lang} />
			{/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
			</div> */}
		</SectionContainer>
	);
}
