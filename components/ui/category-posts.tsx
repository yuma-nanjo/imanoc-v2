import SectionContainer from "@/components/ui/section-container";
import type { Locale } from "@/i18n-config";
import type { PAGE_QUERYResult } from "@/sanity.types";
import {
	fetchSanityCategories,
	fetchSanityCategoryPosts,
} from "@/sanity/lib/fetch";
import { stegaClean } from "next-sanity";
import Link from "next/link";
import CategoryPostCard from "./category-post-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type CategoryPosts = Extract<
	NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
	{ _type: "category-posts" }
>;

interface CategoryPostsProps extends CategoryPosts {
	lang?: Locale;
}

export default async function CategoryPosts({
	lang,
	padding,
	colorVariant,
}: CategoryPostsProps) {
	const color = stegaClean(colorVariant);
	const posts = await fetchSanityCategoryPosts({
		language: lang || "ja",
	});
	const allCategories = await fetchSanityCategories();

	return (
		<SectionContainer color={color} padding={padding}>
			<Tabs defaultValue="All">
				<TabsList>
					<TabsTrigger value="All">All</TabsTrigger>
					{allCategories.map((category) => (
						<TabsTrigger key={category._id} value={category.title || ""}>
							{
								category.internationalizedTitle?.find((t) => t._key === lang)
									?.value
							}
						</TabsTrigger>
					))}
				</TabsList>

				{/* All タブ：全ての投稿をフィルタ無しで表示 */}
				<TabsContent value="All">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
						{posts.map((post) => (
							<Link
								key={post?.slug?.current}
								className="flex w-full rounded-3xl ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
								href={`/${lang}/column/${post?.slug?.current}`}
							>
								<CategoryPostCard
									title={post?.title ?? ""}
									excerpt={post?.excerpt ?? ""}
									image={post?.image ?? null}
									categories={post?.categories ?? []}
									lang={lang || "ja"}
								/>
							</Link>
						))}
					</div>
				</TabsContent>

				{/* 各カテゴリタブ：最初のカテゴリタイトルと一致する投稿のみ表示 */}
				{allCategories.map((category) => (
					<TabsContent key={category._id} value={category.title || ""}>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
							{posts
								.filter(
									(post) =>
										post?.categories &&
										post.categories[0]?.title === category.title,
								)
								.map((post) => (
									<Link
										key={post?.slug?.current}
										className="flex w-full rounded-3xl ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
										href={`/${lang}/column/${post?.slug?.current}`}
									>
										<CategoryPostCard
											title={post?.title ?? ""}
											excerpt={post?.excerpt ?? ""}
											image={post?.image ?? null}
											categories={post?.categories ?? []}
											lang={lang || "ja"}
										/>
									</Link>
								))}
						</div>
					</TabsContent>
				))}
			</Tabs>
		</SectionContainer>
	);
}
