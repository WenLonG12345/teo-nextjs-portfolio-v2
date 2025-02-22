"use client";
import { ChevronsDown, Github, Menu } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Image from "next/image";
import { ToggleTheme } from "./toogle-theme";
import { NAV_ITEM_LIST } from "@/constants";
import ToggleLanguage from "./toggle-language";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/utils/cn";

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  return (
    <header className="shadow-md bg-opacity-15 w-[90%] md:w-[70%] lg:w-[70%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
      <Link
        href="/"
        className="flex-row items-center hidden gap-2 text-lg font-bold lg:flex"
      >
        <Image src="/logo.png" width={50} height={50} alt="logo" />
      </Link>
      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.png" width={50} height={50} alt="logo" />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {NAV_ITEM_LIST.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>

            {/* <SheetFooter className="flex-col items-start justify-start sm:flex-col">
              <Separator className="mb-2" />

              <ToggleTheme />
            </SheetFooter> */}
          </SheetContent>
        </Sheet>
        <Link
          href="/"
          className="flex flex-row items-center gap-2 ml-2 text-lg font-bold"
        >
          <Image src="/logo.png" width={50} height={50} alt="logo" />
        </Link>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="hidden mx-auto lg:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            {NAV_ITEM_LIST.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link
                  href={href}
                  className={cn(
                    "px-4 text-base hover:text-primary",
                    pathname === href && "text-primary"
                  )}
                >
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex flex-row items-center gap-1">
        <ToggleTheme />
        <ToggleLanguage />
      </div>
    </header>
  );
};
