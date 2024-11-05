import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { stegaClean } from "next-sanity";

export default function HeroWithImage({
  tagLine,
  title,
  description,
  image,
  showButtons,
  links,
}: Partial<{
  tagLine: string;
  title: string;
  description: string;
  image: Sanity.Image;
  showButtons: boolean;
  links: {
    title: string;
    href: string;
    target?: boolean;
    buttonVariant:
      | "default"
      | "secondary"
      | "link"
      | "destructive"
      | "outline"
      | "ghost"
      | null
      | undefined;
  }[];
}>) {
  return (
    <div className="container dark:bg-background py-20 lg:pt-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col justify-center">
          {tagLine && (
            <h1 className="leading-[0] font-sans">
              <span className="text-base font-semibold">{tagLine}</span>
            </h1>
          )}
          {title && <h2 className="mt-6 font-bold leading-[1.1]">{title}</h2>}
          {description && <p className="text-lg mt-6">{description}</p>}
          {showButtons && (
            <div className="mt-10 flex flex-wrap gap-4">
              {links &&
                links.length > 0 &&
                links.map((link) => (
                  <Button
                    key={link.title}
                    variant={stegaClean(link?.buttonVariant)}
                    asChild
                  >
                    <Link
                      href={link.href as string}
                      target={link.target ? "_blank" : undefined}
                      rel={link.target ? "noopener" : undefined}
                    >
                      {link.title}
                    </Link>
                  </Button>
                ))}
            </div>
          )}
        </div>
        {image && image.asset?._id && (
          <Image
            className="rounded-xl"
            src={urlFor(image.asset).url()}
            alt={image.alt || ""}
            width={image.asset?.metadata?.dimensions?.width || 800}
            height={image.asset?.metadata?.dimensions?.height || 800}
            placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
            blurDataURL={image?.asset?.metadata?.lqip || ""}
          />
        )}
      </div>
    </div>
  );
}
