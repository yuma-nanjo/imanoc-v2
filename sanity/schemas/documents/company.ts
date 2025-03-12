import { defineField, defineType } from "sanity";
import { FileText } from "lucide-react";

export default defineType({
	name: "company",
	title: "Company",
	type: "document",
	icon: FileText,
	groups: [
		{
			name: "content",
			title: "Content",
		},
		{
			name: "seo",
			title: "SEO",
		},
		{
			name: "settings",
			title: "Settings",
		},
	],
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			group: "content",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			group: "settings",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "excerpt",
			title: "Excerpt",
			type: "text",
			group: "content",
		}),
		defineField({
			name: "image",
			title: "Image",
			type: "image",
			group: "settings",
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: "alt",
					type: "string",
					title: "Alternative Text",
				},
			],
		}),
		defineField({
			name: "body",
			title: "Body",
			type: "block-content",
			group: "content",
		}),
		defineField({
			name: "meta_title",
			title: "Meta Title",
			type: "string",
			group: "seo",
		}),
		defineField({
			name: "meta_description",
			title: "Meta Description",
			type: "text",
			group: "seo",
		}),
		defineField({
			name: "noindex",
			title: "No Index",
			type: "boolean",
			initialValue: false,
			group: "seo",
		}),
		defineField({
			name: "ogImage",
			title: "Open Graph Image - [1200x630]",
			type: "image",
			group: "seo",
		}),
	],

	preview: {
		select: {
			title: "title",
			media: "image",
		},
	},
});
