import { defineField, defineType } from "sanity";
import { Files } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";
import { isUniqueOtherThanLanguage } from "@/lib/is-unique-lang";

export default defineType({
	name: "page",
	type: "document",
	title: "Page",
	icon: Files,
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
			name: "language",
			type: "string",
			readOnly: true,
			group: "settings",
			hidden: false,
			initialValue: "en",
			options: {
				list: [
					{ title: "Japanese", value: "ja" },
					{ title: "English", value: "en" },
					{ title: "Chinese (Simplified)", value: "zh" },
					{ title: "Chinese (Traditional)", value: "zht" },
				],
			},
		}),
		defineField({ name: "title", type: "string", group: "content" }),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			group: "settings",
			options: {
				source: "title",
				maxLength: 96,
				isUnique: isUniqueOtherThanLanguage,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "blocks",
			type: "array",
			group: "content",
			of: [
				{ type: "hero-1" },
				{ type: "hero-2" },
				{ type: "section-header" },
				{ type: "split-row" },
				{ type: "grid-row" },
				{ type: "carousel-1" },
				{ type: "carousel-2" },
				{ type: "timeline-row" },
				{ type: "cta-1" },
				{ type: "logo-cloud-1" },
				{ type: "faqs" },
				{ type: "form-newsletter" },
				{ type: "form-contact" },
				{ type: "all-posts" },
				{ type: "all-services" },
				{ type: "all-companies" },
			],
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
		orderRankField({ type: "page" }),
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
