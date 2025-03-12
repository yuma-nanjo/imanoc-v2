"use client";

import type { POST_QUERYResult } from "@/sanity.types";
import { TableOfContents, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../button";
import { type Headings, Toc } from "./toc"; // 既存のTocコンポーネント

export function MobileToc({
	headings,
}: {
	headings: Headings;
}) {
	const [open, setOpen] = useState(false);

	const handleLinkClick = () => {
		setOpen(false);
	};

	return (
		<>
			{/* 右下に固定されたトグルボタン */}
			<Button
				onClick={() => setOpen((prev) => !prev)}
				className="fixed bottom-4 right-4 z-50 p-2 size-12 border border-foreground bg-muted rounded-full shadow-lg lg:hidden"
			>
				{open ? (
					<X className="size-6 text-muted-foreground" />
				) : (
					<TableOfContents className="size-6 text-muted-foreground" />
				)}
			</Button>

			{/* トグル状態でTOCを表示 */}
			<div
				className={`fixed bottom-10 rounded-2xl right-4 max-h-[70vh] min-w-80 max-w-[80%] bg-muted text-muted-foreground shadow-lg z-40 transform transition-transform duration-300 lg:hidden ${
					open ? "translate-x-0" : "translate-x-[102%]"
				} overflow-y-auto`}
			>
				<div className="p-4">
					<Toc headings={headings} onLinkClick={handleLinkClick} />
				</div>
			</div>
		</>
	);
}
