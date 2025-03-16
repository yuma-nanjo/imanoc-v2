import { i18n } from "@/i18n-config";
import { sanityFetch } from "@/sanity/lib/live";
import type { MetadataRoute } from "next";
import { groq } from "next-sanity";

async function getPagesSitemap(): Promise<MetadataRoute.Sitemap[]> {
	const pagesQuery = groq`
    *[_type == 'page'] | order(slug.current) {
      slug,
      _updatedAt
    }
  `;

	const { data } = await sanityFetch({
		query: pagesQuery,
		params: {
			baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
		},
	});

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return data.flatMap((page: any) =>
		i18n.locales.map((locale) => ({
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}${page.slug.current === "index" ? "" : `/${page.slug.current}`}`,
			lastModified: page._updatedAt,
			changeFrequency: "daily" as const,
			priority: page.slug.current === "index" ? 1 : 0.5,
		})),
	);
}

async function getPostsSitemap(): Promise<MetadataRoute.Sitemap[]> {
	const postsQuery = groq`
    *[_type == 'post'] | order(_updatedAt desc) {
      slug,
      _updatedAt
    }
  `;

	const { data } = await sanityFetch({
		query: postsQuery,
		params: {
			baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
		},
	});

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return data.flatMap((post: any) =>
		i18n.locales.map((locale) => ({
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/column/${post.slug.current}`,
			lastModified: post._updatedAt,
			changeFrequency: "weekly" as const,
			priority: 0.7,
		})),
	);
}

async function getCompaniesSitemap(): Promise<MetadataRoute.Sitemap[]> {
	const companiesQuery = groq`
    *[_type == 'company'] | order(_updatedAt desc) {
      slug,
      _updatedAt
    }
  `;

	const { data } = await sanityFetch({
		query: companiesQuery,
		params: {
			baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
		},
	});

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return data.flatMap((company: any) =>
		i18n.locales.map((locale) => ({
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/company/${company.slug.current}`,
			lastModified: company._updatedAt,
			changeFrequency: "weekly" as const,
			priority: 0.7,
		})),
	);
}

async function getServicesSitemap(): Promise<MetadataRoute.Sitemap[]> {
	const servicesQuery = groq`
    *[_type == 'service'] | order(_updatedAt desc) {
      slug,
      _updatedAt
    }
  `;

	const { data } = await sanityFetch({
		query: servicesQuery,
		params: {
			baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
		},
	});

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return data.flatMap((service: any) =>
		i18n.locales.map((locale) => ({
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/service/${service.slug.current}`,
			lastModified: service._updatedAt,
			changeFrequency: "weekly" as const,
			priority: 0.7,
		})),
	);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap[]> {
	const [pages, posts, companies, services] = await Promise.all([
		getPagesSitemap(),
		getPostsSitemap(),
		getCompaniesSitemap(),
		getServicesSitemap(),
	]);

	return [...pages, ...posts, ...companies, ...services];
}

export const revalidate = 86400; // 24 hours
