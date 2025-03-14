import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
	name: "news-posts",
	type: "object",
	title: "News Posts",
	description: "A list of news posts",
	icon: Newspaper,
	fields: [
		defineField({
			name: "padding",
			type: "section-padding",
		}),
		defineField({
			name: "colorVariant",
			type: "color-variant",
			title: "Color Variant",
			description: "Select a background color variant",
		}),
	],
	preview: {
		prepare() {
			return {
				title: "News Posts",
			};
		},
	},
});
