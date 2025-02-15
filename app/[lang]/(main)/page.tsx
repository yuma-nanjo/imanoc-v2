import Blocks from "@/components/blocks";
import { fetchSanityPageBySlug } from "@/sanity/lib/fetch";
import { generatePageMetadata } from "@/sanity/lib/metadata";
import MissingSanityPage from "@/components/ui/missing-sanity-page";
import { Locale } from "@/i18n-config";

export async function generateMetadata(props: {
  params: Promise<{ slug: string; lang: Locale }>;
}) {
  const { lang } = await props.params;
  const page = await fetchSanityPageBySlug({ slug: "index", language: lang });

  return generatePageMetadata({ page, slug: "index", lang });
}

export default async function IndexPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const page = await fetchSanityPageBySlug({ slug: "index", language: lang });

  if (!page) {
    return MissingSanityPage({
      document: "page",
      slug: "index",
      lang,
    });
  }

  return <Blocks blocks={page?.blocks || []} lang={lang} />;
}
