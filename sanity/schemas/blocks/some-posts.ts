import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
	name: "some-posts",
	type: "object",
	title: "Some Posts",
	description: "A list of some posts",
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
				title: "Some Posts",
			};
		},
	},
});
