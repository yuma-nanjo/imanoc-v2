import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatDate = (date: string): string => {
	const dateObj = new Date(date);
	const year = dateObj.getFullYear();
	const month = String(dateObj.getMonth() + 1).padStart(2, "0");
	const day = String(dateObj.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
};

// Define the types for block content and children
type Block = {
	_type: string;
	children?: Array<{ text: string }>;
};

type BlockContent = Block[] | null;

// Helper function to extract plain text from block content
export const extractPlainText = (blocks: BlockContent): string | null => {
	if (!blocks || !Array.isArray(blocks)) return null;

	return blocks
		.map((block) => {
			if (block._type === "block" && Array.isArray(block.children)) {
				return block.children.map((child) => child.text).join("");
			}
			return "";
		})
		.join(" ");
};
