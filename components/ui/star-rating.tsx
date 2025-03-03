import { cn } from "@/lib/utils";
import { Star, StarHalf } from "lucide-react";

export function StarRating({
	size = "sm",
	rating,
}: {
	size?: "sm" | "lg";
	rating: number;
}) {
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 !== 0;

	return (
		<div className="flex gap-1">
			{[...Array(5)].map((_, i) => {
				if (i < fullStars) {
					return (
						<Star
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={i}
							className={cn(
								"w-4 h-4 fill-yellow-400 text-yellow-400",
								size === "lg" && "w-8 h-8",
							)}
						/>
					);
				}
				if (i === fullStars && hasHalfStar) {
					return (
						<StarHalf
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={i}
							className={cn(
								"w-4 h-4 fill-yellow-400 text-yellow-400",
								size === "lg" && "w-8 h-8",
							)}
						/>
					);
				}
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				return <Star key={i} className="w-4 h-4 text-gray-300" />;
			})}
		</div>
	);
}
