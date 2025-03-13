import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const categoryPostsQuery = groq`
  _type == "category-posts" => {
    _type,
    _key,
    padding,
    colorVariant,
  }
`;
