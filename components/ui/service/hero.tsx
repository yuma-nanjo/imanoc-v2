import type { Locale } from "@/i18n-config";
import type { SERVICE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

type ServiceHero = NonNullable<SERVICE_QUERYResult>;

interface ServiceHeroProps extends ServiceHero {
	lang?: Locale;
}

export default function ServiceHero({
	title,
	image,
	slug,
	_createdAt,
	lang,
}: ServiceHeroProps) {
	return (
		<>
			{title && <h1 className="mb-4 md:mb-6 text-3xl lg:text-5xl">{title}</h1>}
			{image?.asset?._id && (
				<div className="overflow-hidden">
					<Image
						src={urlFor(image).quality(100).url()}
						alt={image.alt || ""}
						placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
						blurDataURL={image.asset?.metadata?.lqip || undefined}
						width={image.asset?.metadata?.dimensions?.width || 1200}
						height={image?.asset?.metadata?.dimensions?.height || 630}
						quality={100}
						className="rounded-2xl my-0!"
					/>
				</div>
			)}
			<hr className="border-primary/30" />
		</>
	);
}
