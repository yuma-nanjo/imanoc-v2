import { Badge } from "@/components/ui/badge";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

export default async function MissingSanityPage({
  document,
  slug,
  lang,
}: {
  document: string;
  slug: string;
  lang: Locale;
}) {
  const dictionary = await getDictionary(lang);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container">
        <h1 className="text-center text-2xl">
          {dictionary.global.missing}
          <Badge variant="outline" className="text-lg">
            {document}
          </Badge>{" "}
          {dictionary.global["document-with-slug"]}{" "}
          <Badge variant="outline" className="text-lg">
            {slug}
          </Badge>{" "}
          {dictionary.global["in-sanity-studio"]}
        </h1>
      </div>
    </div>
  );
}
