// SomePostsClient.tsx
"use client";

import PostCard from "@/components/ui/post-card";
import type { POSTS_QUERYResult } from "@/sanity.types";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../button";
import type { Locale } from "@/i18n-config";

type SomePostsClient = {
	posts: POSTS_QUERYResult;
};

interface SomePostsClientProps extends SomePostsClient {
	lang?: Locale;
}

export default function SomePostsClient({ posts, lang }: SomePostsClientProps) {
	// 初期表示は6件
	const [visibleCount, setVisibleCount] = useState(4);
	const showMore = () => setVisibleCount((prev) => prev + 4);

	return (
		<>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
				{posts.slice(0, visibleCount).map((post) => (
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
			{/* 表示件数が全件未満の場合のみボタン表示 */}
			{visibleCount < posts.length && (
				<div className="mt-6 flex justify-center">
					<Button variant="outline" onClick={showMore}>
						もっと見る
					</Button>
				</div>
			)}
		</>
	);
}
