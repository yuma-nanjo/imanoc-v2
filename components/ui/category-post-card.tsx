import type { Locale } from "@/i18n-config";
import { cn } from "@/lib/utils";
import type { CATEGORY_POSTS_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

type CategoryPostCard = NonNullable<CATEGORY_POSTS_QUERYResult[number]>;

interface CategoryPostCardProps extends Omit<CategoryPostCard, "slug"> {
	className?: string;
	lang: Locale;
}

export default function CategoryPostCard({
	className,
	title,
	excerpt,
	image,
	categories,
	lang,
}: CategoryPostCardProps) {
	return (
		<div
			className={cn(
				"flex w-full flex-col justify-between overflow-hidden transition ease-in-out group border rounded-xl p-1.5 md:p-2 lg:p-4 hover:border-primary relative",
				className,
			)}
		>
			<div className="flex flex-col">
				{image?.asset?._id && (
					<div className="mb-3 relative h-[6rem] sm:h-[8rem] md:h-[10rem] rounded-lg overflow-hidden">
						<Image
							src={urlFor(image).url()}
							alt={image.alt || ""}
							placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
							blurDataURL={image?.asset?.metadata?.lqip || ""}
							fill
							style={{
								objectFit: "cover",
							}}
							sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
							quality={100}
						/>
					</div>
				)}
				{title && (
					<div className="flex justify-between items-center mb-2">
						<h3 className="font-semibold text-sm sm:text-base leading-[1.2]">
							{title}
						</h3>
					</div>
				)}
				{excerpt && (
					<p className="text-xs sm:text-sm line-clamp-3">{excerpt}</p>
				)}
				{categories?.map((cat) => (
					<span
						className="absolute top-2 right-2 rounded-full px-2 py-1 bg-accent text-white text-xs font-mono shadow-sm font-semibold"
						key={cat._id}
					>
						# {cat.internationalizedTitle?.find((t) => t._key === lang)?.value}
					</span>
				))}
			</div>
		</div>
	);
}
