import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const somePostsQuery = groq`
  _type == "some-posts" => {
    _type,
    _key,
    padding,
    colorVariant,
  }
`;
