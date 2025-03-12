import { orderRankField } from "@sanity/orderable-document-list";
import { defineType, defineField } from "sanity";

export default defineType({
	name: "contact",
	title: "Contact",
	type: "document",
	fields: [
		defineField({
			name: "implementationTiming",
			title: "導入希望時期",
			type: "string",
			options: {
				list: [
					{ title: "すぐにでも", value: "immediately" },
					{ title: "1ヶ月以内", value: "withinOneMonth" },
					{ title: "3ヶ月以内", value: "withinThreeMonths" },
					{ title: "半年以内", value: "withinSixMonths" },
					{ title: "情報収集段階", value: "informationGathering" },
				],
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "inquiryContent",
			title: "お問い合わせ内容",
			type: "text",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "interestedService",
			title: "興味を持っているサービス",
			type: "string",
			options: {
				list: [
					{ title: "コンテンツサイト開発", value: "develop" },
					{ title: "コンテンツマーケティング", value: "marketing" },
					{ title: "コンテンツ運用支援", value: "consulting" },
				],
			},
		}),
		defineField({
			name: "companyName",
			title: "会社名",
			type: "string",
		}),
		defineField({
			name: "companyUrl",
			title: "会社URL",
			type: "url",
		}),
		defineField({
			name: "name",
			title: "氏名",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "mail",
			title: "メールアドレス",
			type: "string",
			validation: (Rule) => Rule.email().required(),
		}),
		defineField({
			name: "phone",
			title: "電話番号",
			type: "string",
		}),
		defineField({
			name: "department",
			title: "部署",
			type: "string",
		}),
		defineField({
			name: "position",
			title: "役職",
			type: "string",
		}),
		defineField({
			name: "privacyAgreement",
			title: "個人情報の取り扱い",
			type: "boolean",
			description: "個人情報の取り扱いに同意する場合はチェックしてください。",
			validation: (Rule) =>
				Rule.custom((value) => (value === true ? true : "必須項目です。")),
		}),
		orderRankField({ type: "contact" }),
	],
});
