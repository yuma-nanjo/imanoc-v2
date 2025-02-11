import { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { i18n } from "@/i18n-config";

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

  return data.flatMap((page: any) =>
    i18n.locales.map((locale) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}${page.slug.current === "index" ? "" : "/" + page.slug.current}`,
      lastModified: page._updatedAt,
      changeFrequency: "daily" as const,
      priority: page.slug.current === "index" ? 1 : 0.5,
    }))
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

  return data.flatMap((post: any) =>
    i18n.locales.map((locale) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog/${post.slug.current}`,
      lastModified: post._updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap[]> {
  const [pages, posts] = await Promise.all([
    getPagesSitemap(),
    getPostsSitemap(),
  ]);

  return [...pages, ...posts];
}

export const revalidate = 86400; // 24 hours
