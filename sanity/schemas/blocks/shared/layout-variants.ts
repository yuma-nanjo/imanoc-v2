import { defineType } from "sanity";

export const STACK_ALIGN = [
  { title: "Left", value: "left" },
  { title: "Center", value: "center" },
];

export const SECTION_WIDTH = [
  { title: "Default", value: "default" },
  { title: "Narrow", value: "narrow" },
];

export const LAYOUT_VARIANTS = [
  { title: "Stacked", value: "stacked" },
  { title: "Stacked with Button", value: "stacked-with-button" },
  { title: "Grid", value: "grid" },
];

export const COLS_VARIANTS = [
  { title: "2 Columns", value: "grid-cols-2" },
  { title: "3 Columns", value: "grid-cols-3" },
  { title: "4 Columns", value: "grid-cols-4" },
];

export const layoutVariant = defineType({
  name: "layout-variant",
  title: "Layout Variant",
  type: "string",
  options: {
    list: LAYOUT_VARIANTS.map(({ title, value }) => ({ title, value })),
    layout: "radio",
  },
  initialValue: "stacked",
});
