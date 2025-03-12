import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
	name: "all-companies",
	type: "object",
	title: "All Companies",
	description: "A list of all companies",
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
				title: "All Companies",
			};
		},
	},
});
