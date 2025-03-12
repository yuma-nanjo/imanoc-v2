import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { PAGE_QUERYResult } from "@/sanity.types";

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];
type SplitRow = Extract<Block, { _type: "split-row" }>;
type SplitImage = Extract<
	NonNullable<SplitRow["splitColumns"]>[number],
	{ _type: "split-image" }
>;

export default function SplitImage({ image }: SplitImage) {
	return image?.asset?._id ? (
		<div className="relative h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-full rounded-lg overflow-hidden">
			<Image
				src={urlFor(image).url()}
				alt={image.alt || ""}
				placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
				blurDataURL={image?.asset?.metadata?.lqip || ""}
				fill
				className="object-cover"
				sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
				quality={100}
			/>
		</div>
	) : null;
}
