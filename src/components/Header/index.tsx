import { navLinks } from "@/constants";
import Image from "next/image";
import React from "react";
import { Disclosure } from "@headlessui/react";
import ThemeSwitch from "../ThemeSwitch";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoClose, IoMenu } from "react-icons/io5";

const Header = () => {
  return (
    <header className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between py-8 mx-auto lg:justify-between">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link
                  href="/"
                  className="flex items-center space-x-2"
                >
                  <Image
                    src="/logo.png"
                    alt="WannaDev"
                    width={60}
                    height={60}
                  />
                  <span className="text-xl font-medium text-primary_dark dark:text-primary_light">WannaDev</span>
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden"
                >
                  {open ? <IoClose size={20}/> : <IoMenu  size={20}/>}
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {navLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Link
                      href="/"
                      className="w-full px-6 py-2 mt-3 text-center text-white rounded-md bg-primary lg:ml-5"
                    >
                      Get Started
                    </Link>
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 gap-2 pt-6 list-none lg:pt-0 lg:flex">
            {navLinks.map((menu) => (
              <li className="mr-3 nav__item" key={menu.name}>
                <Link
                  href={menu.href}
                  className="no-underline rounded-md hover:text-primary_light"
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden mr-3 space-x-4 lg:flex">
          <Link
            href="/"
            className="px-6 py-2 text-white rounded-md bg-primary md:ml-5"
          >
            Get Started
          </Link>

          <ThemeSwitch />
        </div>
      </nav>
    </header>
  );
};

export default Header;
