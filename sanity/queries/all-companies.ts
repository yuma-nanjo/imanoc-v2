import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const allCompaniesQuery = groq`
  _type == "all-companies" => {
    _type,
    _key,
    padding,
    colorVariant,
  }
`;
