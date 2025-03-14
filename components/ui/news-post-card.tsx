import { cn } from "@/lib/utils";
import type { NEWS_POSTS_QUERYResult } from "@/sanity.types";
import PostDate from "./post/date";

type NewsPostCard = NonNullable<NEWS_POSTS_QUERYResult[number]>;

interface NewsPostCardProps extends Omit<NewsPostCard, "slug"> {
	className?: string;
}

export default function NewsPostCard({
	className,
	title,
	_createdAt,
}: NewsPostCardProps) {
	return (
		<div className={cn("flex w-full items-center py-4", className)}>
			<div className="flex items-center text-xs sm:text-sm text-foreground/80 mr-4">
				<PostDate date={_createdAt as string} />
			</div>
			{title && (
				<h3 className="font-semibold text-sm sm:text-base leading-[1.2]">
					{title}
				</h3>
			)}
		</div>
	);
}
