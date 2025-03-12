import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const allServicesQuery = groq`
  _type == "all-services" => {
    _type,
    _key,
    padding,
    colorVariant,
  }
`;
