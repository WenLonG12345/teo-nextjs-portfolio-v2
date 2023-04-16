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
    <header className="w-full shadow">
      <nav className="container relative flex items-center justify-between py-4 mx-auto md:justify-between">
        <Disclosure>
          {({ open }) => (
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between w-full md:w-auto">
                <Link href="/" className="flex items-center space-x-2">
                  <Image
                    src="/logo.png"
                    alt="WannaDev"
                    width={60}
                    height={60}
                  />
                  <span className="text-xl font-medium text-primary_dark dark:text-primary_light">
                    WannaDev
                  </span>
                </Link>

                <div className="flex gap-2 md:hidden">
                  <ThemeSwitch iconColor="#6b7280" />
                  <Disclosure.Button
                    aria-label="Toggle Menu"
                    className="px-2 py-1 ml-auto text-gray-500"
                  >
                    {open ? <IoClose size={24} /> : <IoMenu size={24} />}
                  </Disclosure.Button>
                </div>
              </div>

              <Disclosure.Panel className="flex flex-col w-full my-5 md:hidden">
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
                    className="w-full px-6 py-2 mt-3 text-center text-white rounded-md bg-primary md:ml-5"
                  >
                    Start
                  </Link>
                </>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        <div className="hidden text-center md:flex md:items-center">
          <ul className="items-center justify-end flex-1 gap-2 pt-6 list-none md:pt-0 md:flex">
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

        <div className="hidden mr-3 space-x-4 md:flex">
          <Link
            href="/"
            className="px-6 py-2 text-white rounded-md bg-primary md:ml-5"
          >
            Start
          </Link>

          <ThemeSwitch />
        </div>
      </nav>
    </header>
  );
};

export default Header;
