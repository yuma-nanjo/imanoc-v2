"use server";
import { POST_QUERY } from "@/sanity/queries/post";
import { POSTS_QUERY, POSTS_SLUGS_QUERY } from "@/sanity/queries/posts";
import { sanityFetch } from "@/sanity/lib/live";
import {
  POST_QUERYResult,
  POSTS_SLUGS_QUERYResult,
  POSTS_QUERYResult,
} from "@/sanity.types";

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
