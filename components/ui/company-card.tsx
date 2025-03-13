import { cn } from "@/lib/utils";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ChevronRight } from "lucide-react";
import type { COMPANIES_QUERYResult } from "@/sanity.types";

type CompanyCard = NonNullable<COMPANIES_QUERYResult[number]>;

interface CompanyCardProps extends Omit<CompanyCard, "slug"> {
	className?: string;
}

export default function CompanyCard({
	className,
	title,
	excerpt,
	image,
}: CompanyCardProps) {
	return (
		<div
			className={cn(
				"flex w-full flex-col justify-between overflow-hidden transition ease-in-out group border rounded-3xl p-4 hover:border-primary",
				className,
			)}
		>
			<div className="flex flex-col">
				{image?.asset?._id && (
					<div className="mb-4 relative h-[8rem] sm:h-[10rem] rounded-2xl overflow-hidden">
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
					<div className="flex justify-between items-center mb-4">
						<h3 className="font-bold text-[1.5rem] leading-[1.2]">{title}</h3>
					</div>
				)}
				{excerpt && <p>{excerpt}</p>}
			</div>
			<div className="mt-3 xl:mt-6 w-10 h-10 border rounded-full flex items-center justify-center group-hover:border-primary">
				<ChevronRight
					className="text-border group-hover:text-primary"
					size={24}
				/>
			</div>
		</div>
	);
}
