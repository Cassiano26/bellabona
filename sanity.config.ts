import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { documentInternationalization } from "@sanity/document-internationalization";
import { schemaTypes } from "./src/sanity/schemas";
import type { StructureBuilder } from "sanity/structure";

const i18nLanguages = [
  { id: "en", title: "English" },
  { id: "de", title: "Deutsch" },
];

const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
      S.divider(),
      S.documentTypeListItem("page").title("Page"),
    ]);

export default defineConfig({
  name: "bellabona",
  title: "Bellabona",
  basePath: "/studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  plugins: [
    structureTool({ structure }),
    visionTool(),
    documentInternationalization({
      supportedLanguages: i18nLanguages,
      schemaTypes: ["page"],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
