import type { Locale } from "@/i18n-config";
import type { POST_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { Mail, Share } from "lucide-react";
import Image from "next/image";
import PostDate from "./date";
import FacebookLogo from "@/components/brand/facebook";
import LinkedinLogo from "@/components/brand/linkedin";

type PostHero = NonNullable<POST_QUERYResult>;

interface PostHeroProps extends PostHero {
	lang?: Locale;
}

export default function PostHero({
	title,
	author,
	image,
	slug,
	_createdAt,
	lang,
}: PostHeroProps) {
	return (
		<>
			{title && <h1 className="mb-4 md:mb-6 text-3xl lg:text-5xl">{title}</h1>}
			{image?.asset?._id && (
				<div className="my-4 md:my-6 rounded-2xl overflow-hidden">
					<Image
						src={urlFor(image).quality(100).url()}
						alt={image.alt || ""}
						placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
						blurDataURL={image.asset?.metadata?.lqip || undefined}
						width={image.asset?.metadata?.dimensions?.width || 1200}
						height={image?.asset?.metadata?.dimensions?.height || 630}
						quality={100}
					/>
				</div>
			)}
			<div className="flex items-center justify-between gap-2 text-sm md:text-base">
				<div className="flex flex-col md:flex-row md:items-center gap-2">
					<div className="flex items-center gap-2">
						{author?.image?.asset?._id && (
							<div className="relative w-6 h-6 md:w-10 md:h-10">
								<Image
									src={urlFor(author.image).url()}
									alt={author.image.alt ? author.image.alt : ""}
									fill
									style={{
										objectFit: "cover",
									}}
									placeholder={
										author.image.asset?.metadata?.lqip ? "blur" : undefined
									}
									blurDataURL={author.image.asset?.metadata?.lqip || undefined}
									sizes="40px"
									className="w-10 h-10 rounded-full mr-2 my-0!"
								/>
							</div>
						)}
						{author?.name && <div>{author.name}</div>}
						<div className="hidden md:block">•</div>
					</div>
					<PostDate date={_createdAt as string} />
				</div>
				<div className="flex items-center gap-4 p-2 border rounded-md">
					<div className="flex items-center gap-1">
						<Share className="text-foreground/80 w-4 h-4" />
						<span>Share</span>
					</div>
					<div className="flex gap-2">
						<a
							className="hover:opacity-70"
							href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/column/${slug?.current}`}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Share on Facebook"
							title="Share on Facebook"
						>
							<FacebookLogo />
						</a>
						<a
							className="hover:opacity-70"
							href={`https://www.linkedin.com/shareArticle?mini=true&url=${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/column/${slug?.current}&title=${title}`}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Share on LinkedIn"
							title="Share on LinkedIn"
						>
							<LinkedinLogo />
						</a>
					</div>
				</div>
			</div>
			<hr className="my-4 md:my-6 border-primary/30" />
		</>
	);
}
