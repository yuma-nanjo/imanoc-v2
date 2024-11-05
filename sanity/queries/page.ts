import { groq } from "next-sanity";
import { heroWithImageQuery } from "./hero/hero-with-image";
import { sectionHeaderQuery } from "./section-header";

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    blocks[]{
      ${heroWithImageQuery}
      ${sectionHeaderQuery}
    },
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
  }
`;
