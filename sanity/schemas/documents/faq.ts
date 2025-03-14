import { defineField, defineType } from "sanity";
import { ListCollapse } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
	name: "faq",
	title: "FAQ",
	type: "document",
	icon: ListCollapse,
	fields: [
		defineField({
			name: "language",
			type: "string",
			readOnly: true,
			hidden: false,
			initialValue: "ja",
			options: {
				list: [
					{ title: "Japanese", value: "ja" },
					{ title: "English", value: "en" },
					{ title: "Chinese (Simplified)", value: "zh" },
					{ title: "Chinese (Traditional)", value: "zht" },
				],
			},
		}),
		defineField({
			name: "title",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "body",
			type: "block-content",
		}),
		orderRankField({ type: "faq" }),
	],

	preview: {
		select: {
			title: "title",
			subtitle: "language",
		},
		prepare({ title, subtitle }) {
			return {
				title,
				subtitle,
			};
		},
	},
});
