import { defineField, defineType } from "sanity";
import { MessageSquare } from "lucide-react";
import { STACK_ALIGN } from "../shared/layout-variants";

export default defineType({
	name: "form-contact",
	type: "object",
	title: "Form: Contact",
	description: "お問い合わせフォーム。各種お問い合わせ内容を入力いただけます。",
	icon: MessageSquare,
	fields: [
		defineField({
			name: "padding",
			type: "section-padding",
		}),
		defineField({
			name: "colorVariant",
			type: "color-variant",
			title: "Color Variant",
			description: "背景のカラーバリエーションを選択してください。",
		}),
		defineField({
			name: "stackAlign",
			type: "string",
			title: "Stack Layout Alignment",
			options: {
				list: STACK_ALIGN.map(({ title, value }) => ({ title, value })),
				layout: "radio",
			},
			initialValue: "left",
		}),
		defineField({
			name: "consentText",
			type: "block-content",
		}),
		defineField({
			name: "buttonText",
			type: "string",
			initialValue: "お問い合わせを送信",
		}),
		defineField({
			name: "successMessage",
			type: "text",
			initialValue: "お問い合わせを送信しました。ありがとうございます。",
		}),
	],
	preview: {
		prepare() {
			return {
				title: "Contact Form",
			};
		},
	},
});
