import type { Locale } from "@/i18n-config";
import type { POST_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { Mail } from "lucide-react";
import Image from "next/image";
import PostDate from "./date";

type NewsHero = NonNullable<POST_QUERYResult>;

interface NewsHeroProps extends NewsHero {
	lang?: Locale;
}

export default function NewsHero({
	title,
	slug,
	_createdAt,
	lang,
}: NewsHeroProps) {
	return (
		<>
			{title && <h1 className="mb-4 md:mb-6 text-3xl lg:text-5xl">{title}</h1>}
			<div className="flex items-center justify-between gap-2 text-sm md:text-base">
				<div className="flex flex-col md:flex-row md:items-center gap-2">
					<PostDate date={_createdAt as string} />
				</div>
			</div>
			<hr className="my-4 md:my-6 border-primary/30" />
		</>
	);
}
