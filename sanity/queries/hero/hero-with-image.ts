import { groq } from "next-sanity";

export const heroWithImageQuery = groq`
  _type == "hero-with-image" => {
    _type,
    tagLine,
    title,
    description,
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
    showButtons,
    links,
  },
`;
