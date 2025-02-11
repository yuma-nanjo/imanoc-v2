"use server";
import { PAGE_QUERY, PAGES_SLUGS_QUERY } from "@/sanity/queries/page";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERYResult, PAGES_SLUGS_QUERYResult } from "@/sanity.types";

export const fetchSanityPageBySlug = async ({
  slug,
  language,
}: {
  slug: string;
  language: string;
}): Promise<PAGE_QUERYResult> => {
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug, language },
  });

  return data;
};

export const fetchSanityPagesStaticParams = async ({
  language,
}: {
  language: string;
}): Promise<PAGES_SLUGS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: PAGES_SLUGS_QUERY,
    params: { language },
    perspective: "published",
    stega: false,
  });

  return data;
};
