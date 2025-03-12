import type { SERVICE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { Mail } from "lucide-react";
import Image from "next/image";
import ServiceDate from "./date";

type ServiceHeroProps = NonNullable<SERVICE_QUERYResult>;

export default function ServiceHero({
	title,
	image,
	slug,
	_createdAt,
}: ServiceHeroProps) {
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
					<ServiceDate date={_createdAt as string} />
				</div>
				<div className="flex flex-col md:flex-row gap-2">
					<div>この記事をシェアする</div>
					<div className="flex gap-2">
						<a
							className="hover:opacity-70"
							href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_SITE_URL}/news/${slug?.current}`}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Share on Facebook"
							title="Share on Facebook"
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Face book</title>
								<path
									d="M22 12.3038C22 6.74719 17.5229 2.24268 12 2.24268C6.47715 2.24268 2 6.74719 2 12.3038C2 17.3255 5.65684 21.4879 10.4375 22.2427V15.2121H7.89844V12.3038H10.4375V10.0872C10.4375 7.56564 11.9305 6.1728 14.2146 6.1728C15.3088 6.1728 16.4531 6.36931 16.4531 6.36931V8.84529H15.1922C13.95 8.84529 13.5625 9.6209 13.5625 10.4166V12.3038H16.3359L15.8926 15.2121H13.5625V22.2427C18.3432 21.4879 22 17.3257 22 12.3038Z"
									className="fill-black dark:fill-white"
								/>
							</svg>
						</a>
						<a
							className="hover:opacity-70"
							href={`mailto:?subject=${title}&body=${title}%0A%0A${process.env.NEXT_PUBLIC_SITE_URL}/news/${slug?.current}`}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Share via email"
							title="Share via email"
						>
							<Mail size={24} />
						</a>
					</div>
				</div>
			</div>
			<hr className="my-4 md:my-6 border-primary/30" />
		</>
	);
}
