import { cn } from "@/lib/utils";
import type { POST_QUERYResult } from "@/sanity.types";
import Link from "next/link";

// Define the type for the Headings
export type Headings = NonNullable<POST_QUERYResult>["headings"];

// Define the type for each node in the tree structure
type TreeNode = {
	text: string;
	// slug: string;
	children?: TreeNode[];
};

export function nestHeadings(blocks: Headings): TreeNode[] {
	const treeNodes: TreeNode[] = [];
	const stack: { node: TreeNode; level: number }[] = [];

	for (const block of blocks ?? []) {
		if (!block.style || !block.children) continue;

		const level = Number.parseInt(block.style.replace("h", ""), 10);

		const text =
			block.children.map((child) => child.text || "").join(" ") || "Untitled";

		const treeNode: TreeNode = {
			// slug: slugify(text),
			text,
			children: [],
		};

		while (stack.length > 0) {
			const topStack = stack[stack.length - 1];

			if (topStack && topStack.level < level) break;

			stack.pop();
		}

		if (stack.length > 0) {
			const parentNode = stack[stack.length - 1]?.node;
			if (parentNode && !parentNode.children) {
				parentNode.children = [];
			}
			parentNode?.children?.push(treeNode);
		} else {
			treeNodes.push(treeNode);
		}

		stack.push({ node: treeNode, level });
	}

	return treeNodes;
}

export function RenderToc({
	elements,
	level = 1,
	onLinkClick,
}: {
	elements: TreeNode[];
	level?: number;
	onLinkClick?: () => void;
}) {
	return (
		<ul
			className={cn("list-none space-y-2 text-sm font-semibold pl-0! my-0!", {
				"ml-4 space-y-1 font-normal": level > 1,
				"space-y-3.5 pl-4": level === 1,
			})}
		>
			{elements.map((el) => (
				<li
					key={el.text}
					className={cn("pl-0", {
						"[&:first-child]:mt-2": level > 1,
					})}
				>
					<Link
						href={`#${el.text}`}
						className="no-underline hover:underline hover:underline-offset-4"
						onClick={onLinkClick}
					>
						{el.text}
					</Link>
					{el.children && (
						<RenderToc
							onLinkClick={onLinkClick}
							elements={el.children}
							level={level + 1}
						/>
					)}
				</li>
			))}
		</ul>
	);
}

export function Toc({
	headings,
	onLinkClick,
}: { headings: Headings; onLinkClick?: () => void }) {
	return (
		<section className="flex flex-col border rounded-2xl p-4">
			<nav className="flex gap-4">
				<RenderToc
					elements={nestHeadings(headings)}
					onLinkClick={onLinkClick}
				/>
			</nav>
		</section>
	);
}
