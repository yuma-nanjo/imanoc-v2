import Blocks from "@/components/blocks";
import { urlFor } from "@/sanity/lib/image";
import { fetchSanityPageBySlug } from "../actions";
import { notFound } from "next/navigation";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export const dynamic = "force-static";

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
  }

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
      canonical: `/${params.slug}`,
    },
  };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
  }

  return <Blocks blocks={page?.blocks} />;
}
