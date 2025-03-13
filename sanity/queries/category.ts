import { groq } from "next-sanity";
export const CATEGORY_QUERY = groq`
  *[_type == "category"] | order(orderRankField asc){
    _id,
    title
  }
`;
