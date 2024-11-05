const generateSitemapLink = (url: string) =>
  `<sitemap><loc>${url}</loc></sitemap>`;

export async function GET() {
  const sitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${generateSitemapLink(
          `${process.env.NEXT_PUBLIC_SITE_URL}/sitemaps/sitemap.xml`
        )}
    </sitemapindex>`;

  return new Response(sitemapIndexXML, {
    headers: { "Content-Type": "text/xml" },
  });
}
