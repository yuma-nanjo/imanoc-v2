import { groq } from "next-sanity";

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug && language == $language][0]{
    title,
    slug,
    image{
      ...,
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
    body[]{
      ...,
      _type == "image" => {
        ...,
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
        }
      }
    },
    author->{
      name,
      image {
        ...,
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
      }
    },
    _createdAt,
    _updatedAt,
    meta_title,
    meta_description,
    noindex,
    ogImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
    },
    "headings": body[style in ["h1", "h2", "h3", "h4", "h5", "h6"]]
}`;

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

export const CATEGORY_POSTS_QUERY = groq`*[_type == "post" && defined(slug) && language == $language && !("news" in categories[]->title)] | order(_createdAt desc){
  title,
  slug,
  excerpt,
  categories[]->{_id, title},
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

export const NEWS_POSTS_QUERY = groq`*[_type == "post" && defined(slug) && language == $language && ("News" in categories[]->title)] | order(_createdAt desc){
  title,
  slug,
  _createdAt
}`;

export const POSTS_SLUGS_QUERY = groq`*[_type == "post" && defined(slug) && language == $language]{slug}`;
