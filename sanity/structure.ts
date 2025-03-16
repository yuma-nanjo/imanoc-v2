import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { Files, BookA, User, ListCollapse, Quote } from "lucide-react";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const structure = (S: any, context: any) =>
	S.list()
		.title("Content")
		.items([
			orderableDocumentListDeskItem({
				type: "page",
				title: "Pages",
				icon: Files,
				S,
				context,
			}),
			S.listItem()
				.title("Posts")
				.schemaType("post")
				.child(
					S.documentTypeList("post")
						.title("Post")
						.defaultOrdering([{ field: "_createdAt", direction: "desc" }]), // Default ordering
				),
			S.listItem()
				.title("Services")
				.schemaType("service")
				.child(
					S.documentTypeList("service")
						.title("Service")
						.defaultOrdering([{ field: "_createdAt", direction: "desc" }]), // Default ordering
				),
			S.listItem()
				.title("Companies")
				.schemaType("company")
				.child(
					S.documentTypeList("company")
						.title("Company")
						.defaultOrdering([{ field: "_createdAt", direction: "desc" }]), // Default ordering
				),
			orderableDocumentListDeskItem({
				type: "category",
				title: "Category",
				icon: BookA,
				S,
				context,
			}),
			orderableDocumentListDeskItem({
				type: "tag",
				title: "Tag",
				icon: BookA,
				S,
				context,
			}),
			orderableDocumentListDeskItem({
				type: "author",
				title: "Authors",
				icon: User,
				S,
				context,
			}),
			orderableDocumentListDeskItem({
				type: "faq",
				title: "FAQs",
				icon: ListCollapse,
				S,
				context,
			}),
			orderableDocumentListDeskItem({
				type: "testimonial",
				title: "Testimonials",
				icon: Quote,
				S,
				context,
			}),
		]);
