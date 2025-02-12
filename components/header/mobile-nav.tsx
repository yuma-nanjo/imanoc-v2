"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavItem } from "@/types";
import Logo from "@/components/logo";
import { useState } from "react";
import { type getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import LocaleSwitcher from "./locale-switcher";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANGUAGE_LABELS } from "./index";
import { AlignRight } from "lucide-react";

export default function MobileNav({
  navItems,
  dictionary,
  lang,
}: {
  navItems: NavItem[];
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  lang: Locale;
}) {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open Menu"
          variant="ghost"
          className="w-10 p-5 focus-visible:ring-1 focus-visible:ring-offset-1"
        >
          <AlignRight className="dark:text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="mx-auto">
            <Logo />
          </div>
          <div className="sr-only">
            <SheetTitle>Main Navigation</SheetTitle>
            <SheetDescription>Navigate to the website pages</SheetDescription>
          </div>
        </SheetHeader>
        <div className="pt-10 pb-20">
          <div className="container">
            <ul className="list-none text-center space-y-3">
              <>
                {navItems.map((navItem) => (
                  <li key={navItem.label}>
                    <Link
                      onClick={() => setOpen(false)}
                      href={navItem.href}
                      target={navItem.target ? "_blank" : undefined}
                      rel={navItem.target ? "noopener noreferrer" : undefined}
                      className="hover:text-decoration-none hover:opacity-50 text-lg"
                    >
                      {navItem.label}
                    </Link>
                  </li>
                ))}
              </>
              <li>
                <Collapsible open={langOpen} onOpenChange={setLangOpen}>
                  <CollapsibleTrigger className="p-0" asChild>
                    <Button
                      className="font-normal hover:opacity-50 hover:bg-transparent"
                      variant="ghost"
                    >
                      <div className="text-lg">
                        {LANGUAGE_LABELS[lang](dictionary)}
                      </div>
                      <ChevronRight
                        className={cn(
                          "h-6 w-6 transition-transform duration-300",
                          langOpen ? "rotate-90" : ""
                        )}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                    <div className="py-2 px-4">
                      <LocaleSwitcher className="h-10 hover:text-decoration-none hover:opacity-50 text-lg" />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </li>
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
