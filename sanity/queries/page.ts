import { groq } from "next-sanity";
import { allCompaniesQuery } from "./all-companies";
import { allPostsQuery } from "./all-posts";
import { allServicesQuery } from "./all-services";
import { carousel1Query } from "./carousel/carousel-1";
import { carousel2Query } from "./carousel/carousel-2";
import { cta1Query } from "./cta/cta-1";
import { faqsQuery } from "./faqs";
import { formContactQuery } from "./forms/contactform";
import { formNewsletterQuery } from "./forms/newsletter";
import { gridRowQuery } from "./grid/grid-row";
import { hero1Query } from "./hero/hero-1";
import { hero2Query } from "./hero/hero-2";
import { logoCloud1Query } from "./logo-cloud/logo-cloud-1";
import { sectionHeaderQuery } from "./section-header";
import { splitRowQuery } from "./split/split-row";
import { timelineQuery } from "./timeline";
import { somePostsQuery } from "./some-posts";

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug && language == $language][0]{
    blocks[]{
      ${hero1Query},
      ${hero2Query},
      ${sectionHeaderQuery},
      ${splitRowQuery},
      ${gridRowQuery},
      ${carousel1Query},
      ${carousel2Query},
      ${timelineQuery},
      ${cta1Query},
      ${logoCloud1Query},
      ${faqsQuery},
      ${formNewsletterQuery},
      ${formContactQuery},
      ${allPostsQuery},
      ${somePostsQuery},
      ${allServicesQuery},
      ${allCompaniesQuery},
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

export const PAGES_SLUGS_QUERY = groq`*[_type == "page" && defined(slug) && language == $language]{slug}`;
