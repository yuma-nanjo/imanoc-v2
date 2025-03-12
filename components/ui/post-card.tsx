import { cn } from "@/lib/utils";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ChevronRight } from "lucide-react";
import type { POSTS_QUERYResult } from "@/sanity.types";

type PostCard = NonNullable<POSTS_QUERYResult[number]>;

interface PostCardProps extends Omit<PostCard, "slug"> {
	className?: string;
}

export default function PostCard({
	className,
	title,
	excerpt,
	image,
}: PostCardProps) {
	return (
		<div
			className={cn(
				"flex w-full flex-col justify-between overflow-hidden transition ease-in-out group border rounded-xl p-1.5 md:p-2 lg:p-4 hover:border-primary",
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
			</div>
		</div>
	);
}
