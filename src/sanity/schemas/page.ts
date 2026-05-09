import { defineType, defineField } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: async (slug, context) => {
          const { document, getClient } = context;
          const client = getClient({ apiVersion: "2024-01-01" });
          const id = document?._id.replace(/^drafts\./, "");
          const params = {
            slug,
            language: document?.language ?? "",
            id,
          };
          const query = `!defined(*[_type == "page" && slug.current == $slug && language == $language && !(_id in [$id, "drafts." + $id])][0]._id)`;
          return await client.fetch(query, params);
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        { type: "hero" },
        { type: "socialProof" },
        { type: "mealOptions" },
      ],
    }),
    defineField({
      name: "seo",
      title: "Page SEO",
      type: "seo",
      description: "SEO settings for this specific page. Overrides global defaults.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      language: "language",
    },
    prepare({ title, language }) {
      return {
        title,
        subtitle: language ? language.toUpperCase() : "",
      };
    },
  },
});
