import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY, PAGES_SLUGS_QUERY } from "@/sanity/queries/page";
import {
  POST_QUERY,
  POSTS_QUERY,
  POSTS_SLUGS_QUERY,
} from "@/sanity/queries/post";
import {
  PAGE_QUERYResult,
  PAGES_SLUGS_QUERYResult,
  POST_QUERYResult,
  POSTS_QUERYResult,
  POSTS_SLUGS_QUERYResult,
} from "@/sanity.types";

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

export const fetchSanityPosts = async ({
  language,
}: {
  language: string;
}): Promise<POSTS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: POSTS_QUERY,
    params: { language },
  });

  return data;
};

export const fetchSanityPostsStaticParams = async ({
  language,
}: {
  language: string;
}): Promise<POSTS_SLUGS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: POSTS_SLUGS_QUERY,
    params: { language },
    perspective: "published",
    stega: false,
  });

  return data;
};

export const fetchSanityPostBySlug = async ({
  slug,
  language,
}: {
  slug: string;
  language: string;
}): Promise<POST_QUERYResult> => {
  const { data } = await sanityFetch({
    query: POST_QUERY,
    params: { slug, language },
  });

  return data;
};
