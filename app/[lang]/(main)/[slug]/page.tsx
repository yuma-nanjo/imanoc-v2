import Blocks from "@/components/blocks";
import {
  fetchSanityPageBySlug,
  fetchSanityPagesStaticParams,
} from "@/sanity/lib/fetch";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/sanity/lib/metadata";
import { Locale } from "@/i18n-config";

export async function generateStaticParams(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;
  const pages = await fetchSanityPagesStaticParams({ language: lang });
  return pages.map((page) => ({ slug: page.slug?.current }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string; lang: Locale }>;
}) {
  const { slug, lang } = await props.params;

  const page = await fetchSanityPageBySlug({
    slug,
    language: lang,
  });

  if (!page) {
    notFound();
  }

  return generatePageMetadata({ page, slug, lang });
}

export default async function Page(props: {
  params: Promise<{ slug: string; lang: Locale }>;
}) {
  const { slug, lang } = await props.params;
  const page = await fetchSanityPageBySlug({ slug, language: lang });

  if (!page) {
    notFound();
  }

  return <Blocks blocks={page?.blocks || []} lang={lang} />;
}
