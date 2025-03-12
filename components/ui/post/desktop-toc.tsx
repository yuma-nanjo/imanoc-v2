// DesktopToc.tsx
import { type Headings, Toc } from "./toc";

export function DesktopToc({
	headings,
}: {
	headings: Headings;
}) {
	return (
		<div className="hidden lg:block lg:w-1/4 lg:sticky lg:top-16 lg:self-start lg:overflow-y-auto lg:max-h-[90vh] min-w-[280px]">
			<Toc headings={headings} />
		</div>
	);
}
