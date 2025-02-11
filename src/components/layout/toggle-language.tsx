"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import Image from "next/image";

export const LANGUAGE_OPTIONS = [
  {
    key: "en",
    shortTitle: "EN",
    longTitle: "English",
    image: "/images/locales/en.png",
  },
  {
    key: "zh",
    shortTitle: "CH",
    longTitle: "简体中文",
    image: "/images/locales/cn.png",
  },
];

const ToggleLanguage = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();

  function onLanguageChange(nextLocale: string) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  const selectedLang = LANGUAGE_OPTIONS.find((lang) => lang.key === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className=""
        >
          <Image
            src={selectedLang?.image || ""}
            alt={selectedLang?.longTitle || ""}
            width={24}
            height={24}
            className="mr-2 rounded-full"
          />
          {selectedLang?.shortTitle}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={locale} onValueChange={onLanguageChange}>
          {LANGUAGE_OPTIONS.map((lang) => (
            <DropdownMenuRadioItem
              key={lang.key}
              value={lang.key}
              className="flex flex-row items-center gap-2"
            >
              <Image
                src={lang.image}
                alt={lang.longTitle}
                width={24}
                height={24}
                className="rounded-full"
              />
              {lang.longTitle}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ToggleLanguage;
