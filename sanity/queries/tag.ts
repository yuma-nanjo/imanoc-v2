import { groq } from "next-sanity";
export const TAG_QUERY = groq`
  *[_type == "tag"] | order(orderRankField asc){
    _id,
    title,
    internationalizedTitle
  }
`;
