import { groq } from "next-sanity";

export const SERVICE_QUERY = groq`*[_type == "service" && slug.current == $slug][0]{
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
    }
}`;

export const SERVICES_QUERY = groq`*[_type == "service" && defined(slug)] | order(_createdAt desc){
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

export const SERVICES_SLUGS_QUERY = groq`*[_type == "service" && defined(slug)]{slug}`;
