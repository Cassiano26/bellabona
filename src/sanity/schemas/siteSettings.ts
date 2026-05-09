import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "seo",
      description: "Default SEO settings applied to all pages unless overridden.",
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "google", title: "Google", type: "url" }),
        defineField({ name: "twitter", title: "Twitter", type: "url" }),
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
        defineField({ name: "appStore", title: "App Store", type: "url" }),
        defineField({ name: "googlePlay", title: "Google Play", type: "url" }),
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
