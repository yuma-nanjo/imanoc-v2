import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
	name: "category-posts",
	type: "object",
	title: "Category Posts",
	description: "A list of category posts",
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
				title: "Category Posts",
			};
		},
	},
});
