import { cn } from "@/lib/utils";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TagLine from "@/components/ui/tag-line";
import { createElement } from "react";
import { stegaClean } from "next-sanity";
import type { PAGE_QUERYResult } from "@/sanity.types";

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];
type SplitRow = Extract<Block, { _type: "split-row" }>;
type SplitContent = Extract<
	NonNullable<SplitRow["splitColumns"]>[number],
	{ _type: "split-content" }
>;

interface SplitContentProps extends SplitContent {
	noGap?: boolean;
}

export default function SplitContent({
	sticky,
	padding,
	noGap,
	tagLine,
	title,
	body,
	link,
}: SplitContentProps) {
	return (
		<div
			className={cn(
				!sticky ? "flex flex-col justify-center" : undefined,
				padding?.top ? "pt-16 xl:pt-20" : undefined,
				padding?.bottom ? "pb-16 xl:pb-20" : undefined,
			)}
		>
			<div
				className={cn(
					"flex flex-col items-start",
					sticky ? "lg:sticky lg:top-56" : undefined,
					noGap ? "px-10" : undefined,
				)}
			>
				{tagLine && (
					<TagLine
						className="font-mono text-sm text-foreground/60"
						title={tagLine}
						element="h2"
					/>
				)}
				{title &&
					createElement(
						tagLine ? "h3" : "h2",
						{
							className: cn("my-2 sm:my-4 font-semibold leading-[1.2]"),
						},
						title,
					)}
				{body && (
					<div className="text-sm">
						<PortableTextRenderer value={body} />
					</div>
				)}
				{link?.href && (
					<div className="flex flex-col ml-auto">
						<Button
							className="mt-4"
							variant={stegaClean(link?.buttonVariant)}
							size="sm"
							asChild
						>
							<Link
								href={link.href}
								target={link.target ? "_blank" : undefined}
							>
								{link.title}
							</Link>
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
