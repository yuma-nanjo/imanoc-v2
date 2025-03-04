import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { stegaClean } from "next-sanity";
import PortableTextRenderer from "@/components/portable-text-renderer";
import type { PAGE_QUERYResult } from "@/sanity.types";
import Shapes from "@/components/threejs/Shapes";

type Hero1Props = Extract<
	NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
	{ _type: "hero-1" }
>;

export default function Hero1({
	tagLine,
	title,
	body,
	image,
	links,
}: Hero1Props) {
	return (
		<div className="container dark:bg-background py-10 lg:pt-20">
			<div className="grid grid-cols-1 lg:grid-cols-[6fr_4fr] gap-4">
				<div className="flex flex-col justify-center">
					{tagLine && (
						<h1 className="leading-[0] font-sans animate-fade-up [animation-delay:100ms] opacity-0">
							<span className="text-base font-semibold">{tagLine}</span>
						</h1>
					)}
					{title && (
						<h2 className="mt-6 font-bold leading-[1.1] text-xl sm:text-2xl md:text-3xl lg:text-4xl animate-fade-up [animation-delay:200ms] opacity-0">
							{title}
						</h2>
					)}
					{body && (
						<div className="text-xs sm:text-sm md:text-base mt-6 animate-fade-up [animation-delay:300ms] opacity-0 text-muted-foreground">
							<PortableTextRenderer value={body} />
						</div>
					)}
					{links && links.length > 0 && (
						<div className="mt-10 flex flex-wrap gap-4 animate-fade-up [animation-delay:400ms] opacity-0">
							{links.map((link) => (
								<Button
									key={link.title}
									variant={stegaClean(link?.buttonVariant)}
									asChild
								>
									<Link
										href={link.href as string}
										target={link.target ? "_blank" : undefined}
										rel={link.target ? "noopener" : undefined}
									>
										{link.title}
									</Link>
								</Button>
							))}
						</div>
					)}
				</div>
				<div className="flex flex-col justify-center">
					{image?.asset?._id ? (
						<Image
							className="rounded-xl animate-fade-up [animation-delay:500ms] opacity-0"
							src={urlFor(image).url()}
							alt={image.alt || ""}
							width={image.asset?.metadata?.dimensions?.width || 800}
							height={image.asset?.metadata?.dimensions?.height || 800}
							placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
							blurDataURL={image?.asset?.metadata?.lqip || ""}
							quality={100}
						/>
					) : (
						<div className="min-h-80 lg:aspect-square">
							{/* <Shapes /> */}
							Shapes
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
