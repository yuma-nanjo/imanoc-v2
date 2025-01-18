import Blocks from "@/components/blocks";
import {
  fetchSanityPageBySlug,
  fetchSanityPagesStaticParams,
} from "../actions";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/metadata";

export const generateStaticParams = async () => {
  const slugs = await fetchSanityPagesStaticParams();
  return slugs.map((slug) => ({ slug }));
};

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
  }

  return generatePageMetadata({ page, slug: params.slug });
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
  }

  return <Blocks blocks={page?.blocks} />;
}
