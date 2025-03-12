import {
	defineLocations,
	defineDocuments,
	type PresentationPluginOptions,
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
						href: `/${doc?.language}/column/${doc?.slug}`,
					},
					{ title: "Column", href: `/${doc?.language}/column` },
				],
			}),
		}),
	},
	mainDocuments: defineDocuments([
		{
			route: "/ja",
			filter: `_type == 'page' && slug.current == 'index' && language == 'ja'`,
		},
		{
			route: "/en",
			filter: `_type == 'page' && slug.current == 'index' && language == 'en'`,
		},
		{
			route: "/zh",
			filter: `_type == 'page' && slug.current == 'index' && language == 'zh'`,
		},
		{
			route: "/zht",
			filter: `_type == 'page' && slug.current == 'index' && language == 'zht'`,
		},
		{
			route: "/:lang/:slug",
			filter: `_type == 'page' && slug.current == $slug && language == $lang`,
		},
		{
			route: "/:lang/column/:slug",
			filter: `_type == 'post' && slug.current == $slug && language == $lang`,
		},
	]),
};
