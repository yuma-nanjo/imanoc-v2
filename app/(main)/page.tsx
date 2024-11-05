import Blocks from "@/components/blocks";
import { urlFor } from "@/sanity/lib/image";
import { fetchSanityPageBySlug } from "./actions";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export const dynamic = "force-static";

export async function generateMetadata() {
  const page = await fetchSanityPageBySlug({ slug: "index" });

  if (!page)
    throw new Error(
      "Missing 'page' document with slug 'index' in Sanity Studio"
    );

  return {
    title: page?.meta_title || page?.title,
    description: page?.meta_description,
    openGraph: {
      images: [
        {
          url: page?.ogImage
            ? urlFor(page?.ogImage).auto("format").fit("max").quality(100).url()
            : `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
          width: page?.ogImage?.asset?.metadata?.dimensions?.width || 1200,
          height: page?.ogImage?.asset?.metadata?.dimensions?.height || 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    robots: !isProduction
      ? "noindex, nofollow"
      : page?.noindex
        ? "noindex"
        : "index, follow",
    alternates: {
      canonical: "/",
    },
  };
}

export default async function IndexPage() {
  const page = await fetchSanityPageBySlug({ slug: "index" });

  if (!page)
    throw new Error(
      "Missing 'page' document with slug 'index' in Sanity Studio"
    );

  return <Blocks blocks={page?.blocks} />;
}
