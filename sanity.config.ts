"use client";

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";
import { resolve } from "@/sanity/presentation/resolve";
import { structure } from "./sanity/structure";
import { documentInternationalization } from "@sanity/document-internationalization";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
import { assist } from "@sanity/assist";
import { codeInput } from "@sanity/code-input";

export default defineConfig({
  basePath: "/studio",
  title: "Schema UI",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve,
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    documentInternationalization({
      // Required configuration
      supportedLanguages: [
        { id: "en", title: "English" },
        { id: "es", title: "Spanish" },
        { id: "fr", title: "French" },
      ],
      schemaTypes: ["page", "post", "testimonial", "faq"],
    }),
    // only if you want to translate fields, for example:
    // category names for filters
    internationalizedArray({
      languages: [
        { id: "en", title: "English" },
        { id: "es", title: "Spanish" },
        { id: "fr", title: "French" },
      ],
      defaultLanguages: ["en"],
      fieldTypes: ["string"],
      buttonLocations: ["field"],
    }),
    assist({
      translate: {
        document: {
          // The name of the field that holds the current language
          // in the form of a language code e.g. 'en', 'fr', 'nb_NO'.
          // Required
          languageField: "language",
          // Optional extra filter for document types.
          // If not set, translation is enabled for all documents
          // that has a field with the name defined above.
          documentTypes: ["page", "post", "testimonial", "faq"],
        },
        field: {
          // Translate fields for the following document types
          documentTypes: ["category"],
          languages: [
            { id: "en", title: "English" },
            { id: "es", title: "Spanish" },
            { id: "fr", title: "French" },
          ],
        },
      },
    }),
    codeInput(),
  ],
});
