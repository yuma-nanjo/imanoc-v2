"use client";

import Link from "next/link";
import { NavItem } from "@/types";
import { type getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import LocaleSwitcher from "./locale-switcher";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANGUAGE_LABELS } from "./index";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DesktopNav({
  navItems,
  dictionary,
  lang,
}: {
  navItems: NavItem[];
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  lang: Locale;
}) {
  const [langOpen, setLangOpen] = useState(false);

  return (
    <div className="hidden xl:flex items-center gap-7 text-primary">
      {navItems.map((navItem) => (
        <Link
          key={navItem.label}
          href={navItem.href}
          target={navItem.target ? "_blank" : undefined}
          rel={navItem.target ? "noopener noreferrer" : undefined}
          className="transition-colors hover:text-foreground/80 text-foreground/60 text-sm"
        >
          {navItem.label}
        </Link>
      ))}
      <div className="relative">
        <Collapsible open={langOpen} onOpenChange={setLangOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 h-8 px-3 text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {LANGUAGE_LABELS[lang](dictionary)}
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  langOpen ? "rotate-180" : ""
                )}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="absolute right-0 top-full z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
            <LocaleSwitcher className="w-full px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-sm outline-none" />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
