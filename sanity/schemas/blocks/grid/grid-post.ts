import { defineField, defineType } from "sanity";
import { LayoutGrid } from "lucide-react";

export default defineType({
	name: "grid-post",
	type: "object",
	icon: LayoutGrid,
	fields: [
		defineField({
			name: "post",
			type: "reference",
			title: "Column Post",
			description: "Select a column post to link to.",
			to: [{ type: "post" }],
			options: {
				filter: ({ document }) => ({
					filter: "language == $lang",
					params: { lang: document.language },
				}),
			},
		}),
	],
	preview: {
		select: {
			title: "post.title",
			media: "image",
		},
		prepare({ title, media }) {
			return {
				title: "Grid Card",
				subtitle: title || "No title",
				media,
			};
		},
	},
});
