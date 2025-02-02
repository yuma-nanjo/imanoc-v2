import { groq } from "next-sanity";

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug) && language == $language] | order(_createdAt desc){
    title,
    slug,
    excerpt,
    image{
      asset->{
        _id,
        url,
        mimeType,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
}`;

export const POSTS_SLUGS_QUERY = groq`*[_type == "post" && defined(slug) && language == $language]{slug}`;
