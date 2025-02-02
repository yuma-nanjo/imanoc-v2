import {
  defineLocations,
  defineDocuments,
  PresentationPluginOptions,
} from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    // Add more locations for other post types
    post: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
        language: "language",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled",
            href: `/${doc?.language}/blog/${doc?.slug}`,
          },
          { title: "Blog", href: `/${doc?.language}/blog` },
        ],
      }),
    }),
  },
  mainDocuments: defineDocuments([
    {
      route: "/en",
      filter: `_type == 'page' && slug.current == 'index' && language == 'en'`,
    },
    {
      route: "/es",
      filter: `_type == 'page' && slug.current == 'index' && language == 'es'`,
    },
    {
      route: "/:lang/:slug",
      filter: `_type == 'page' && slug.current == $slug && language == $lang`,
    },
    {
      route: "/:lang/blog/:slug",
      filter: `_type == 'post' && slug.current == $slug && language == $lang`,
    },
  ]),
};
