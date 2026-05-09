import { defineType, defineField } from "sanity";

export const mealOptions = defineType({
  name: "mealOptions",
  title: "Meal Options",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Button Link",
      type: "string",
    }),
    defineField({
      name: "meals",
      title: "Meals",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "tag", title: "Tag / Category", type: "string" }),
            defineField({ name: "name", title: "Meal Name", type: "string" }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "rating", title: "Rating %", type: "number" }),
            defineField({ name: "reviews", title: "Reviews Count", type: "number" }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Meal Options", subtitle: "Meal Options Section" };
    },
  },
});
