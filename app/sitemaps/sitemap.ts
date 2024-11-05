import { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

export default async function sitemap(): Promise<MetadataRoute.Sitemap[]> {
  const query = groq`
    *[_type == 'page'] | order(slug.current) {
      'url': $baseUrl + select(slug.current == 'home' => '', '/' + slug.current),
      'lastModified': _updatedAt,
      'changeFrequency': 'daily',
      'priority': select(
        slug.current == 'home' => 1,
        0.5
      )
    }
  `;

  const { data } = await sanityFetch({
    query,
    params: {
      baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
    },
  });

  return data.map((page: MetadataRoute.Sitemap) => ({
    ...page,
  }));
}
