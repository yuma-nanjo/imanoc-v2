import { defineField, defineType } from "sanity";
import { LayoutTemplate } from "lucide-react";

export default defineType({
  name: "hero-with-image",
  title: "Hero with Image",
  type: "object",
  icon: LayoutTemplate,
  fields: [
    defineField({
      name: "tagLine",
      type: "string",
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "showButtons",
      type: "boolean",
      title: "Show buttons",
    }),
    defineField({
      name: "links",
      type: "array",
      of: [{ type: "link" }],
      hidden: ({ parent }) => !parent?.showButtons,
      validation: (rule) => rule.max(2),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Hero with Image",
        subtitle: title,
      };
    },
  },
});
