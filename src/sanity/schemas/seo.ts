import { defineType, defineField } from "sanity";

export const seoFields = [
  defineField({
    name: "metaTitle",
    title: "Meta Title",
    type: "string",
  }),
  defineField({
    name: "metaDescription",
    title: "Meta Description",
    type: "text",
    rows: 3,
  }),
  defineField({
    name: "ogImage",
    title: "Open Graph Image",
    type: "image",
  }),
  defineField({
    name: "noIndex",
    title: "No Index",
    type: "boolean",
    initialValue: false,
  }),
];

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: seoFields,
});
