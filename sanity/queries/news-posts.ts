import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const newsPostsQuery = groq`
  _type == "news-posts" => {
    _type,
    _key,
    padding,
    colorVariant,
  }
`;
