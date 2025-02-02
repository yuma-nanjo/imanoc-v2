import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: false,
      initialValue: "en",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Spanish", value: "es" },
          { title: "French", value: "fr" },
        ],
      },
    }),
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
      name: "body",
      type: "block-content",
    }),
    defineField({
      name: "rating",
      type: "number",
      validation: (rule) => rule.min(1).max(5),
    }),
    orderRankField({ type: "testimonial" }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "language",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle,
        media,
      };
    },
  },
});
