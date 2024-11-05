import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SectionContainer, {
  ISectionContainer,
  ISectionPadding,
} from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";
import Link from "next/link";

export default function SectionHeader({
  padding,
  colorVariant,
  layoutVariant,
  sectionWidth = "default",
  stackAlign = "left",
  link,
  tagLine,
  title,
  description,
}: Partial<{
  padding: ISectionPadding;
  colorVariant: ISectionContainer["color"];
  layoutVariant: "stacked" | "stacked-with-button" | "grid";
  stackAlign: "left" | "center";
  sectionWidth: "default" | "narrow";
  tagLine: string;
  title: string;
  description: string;
  link: {
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
  };
}>) {
  const isStacked = stegaClean(layoutVariant) === "stacked";
  const isStackedWithButton =
    stegaClean(layoutVariant) === "stacked-with-button";
  const isGrid = stegaClean(layoutVariant) === "grid";

  const isNarrow = stegaClean(sectionWidth) === "narrow";

  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      <div
        className={cn(
          isStacked && stegaClean(stackAlign) === "center"
            ? "max-w-[48rem] text-center mx-auto"
            : undefined,
          isStackedWithButton
            ? "grid grid-cols-1 lg:grid-cols-[8fr_4fr] gap-4 xl:gap-6"
            : undefined,
          isGrid ? "grid grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-6" : undefined,
          isStacked && isNarrow ? "max-w-[48rem] mx-auto" : undefined
        )}
      >
        <div
          className={cn(color === "primary" ? "text-background" : undefined)}
        >
          {tagLine && (
            <h1 className="leading-[0] mb-4">
              <span className="text-base font-semibold">{tagLine}</span>
            </h1>
          )}
          <h2
            className={cn(
              isStacked || isStackedWithButton ? "mb-4" : undefined
            )}
          >
            {title}
          </h2>
          {isStackedWithButton && <p>{description}</p>}
        </div>
        {!isStackedWithButton && <p>{description}</p>}
        {isStackedWithButton && link?.href && (
          <div className="flex justify-center mt-10 xl:justify-end">
            <Button variant={stegaClean(link?.buttonVariant)} asChild>
              <Link
                href={link.href}
                target={link.target ? "_blank" : undefined}
              >
                {link.title}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
