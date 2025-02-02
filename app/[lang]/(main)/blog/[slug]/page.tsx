import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import PostHero from "@/components/ui/post/hero";
import { BreadcrumbLink } from "@/types";
import PortableTextRenderer from "@/components/portable-text-renderer";
import {
  fetchSanityPostBySlug,
  fetchSanityPostsStaticParams,
} from "../actions";
import { generatePageMetadata } from "@/lib/metadata";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
export async function generateStaticParams(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;
  const posts = await fetchSanityPostsStaticParams({ language: lang });

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string; lang: Locale }>;
}) {
  const { slug, lang } = await props.params;
  const post = await fetchSanityPostBySlug({ slug, language: lang });

  if (!post) {
    notFound();
  }

  return generatePageMetadata({ page: post, slug: `/blog/${slug}`, lang });
}

export default async function PostPage(props: {
  params: Promise<{ slug: string; lang: Locale }>;
}) {
  const { slug, lang } = await props.params;
  const post = await fetchSanityPostBySlug({ slug, language: lang });
  const dictionary = await getDictionary(lang);
  if (!post) {
    notFound();
  }

  const links: BreadcrumbLink[] = post
    ? [
        {
          label: dictionary.menu.home,
          href: `/${lang}/`,
        },
        {
          label: dictionary.menu.blog,
          href: `/${lang}/blog`,
        },
        {
          label: post.title as string,
          href: "#",
        },
      ]
    : [];

  return (
    <section>
      <div className="container py-16 xl:py-20">
        <article className="max-w-3xl mx-auto">
          <Breadcrumbs links={links} />
          <PostHero {...post} lang={lang} />
          {post.body && <PortableTextRenderer value={post.body} />}
        </article>
      </div>
    </section>
  );
}
