"use client";
import { navItemList } from "@/constants";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full py-10 bg-[#202020] text-[#f7f7f7] ">
      <div className="max-w-[1024px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-2 text-sm">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center mb-3">
            <Image
              width={40}
              height={40}
              src={"/logo.png"}
              className="transition-all hover:scale-110"
              alt="logo"
            />
            <h2 className="ml-3 text-lg font-bold leading-5">WannaDev</h2>
          </div>
          <div className="mx-auto lg:block">
            {navItemList.map((route) => (
              <Link
                key={route?.href}
                href={route?.href}
                className="mr-2 text-base hover:text-primary"
              >
                {route?.label}
              </Link>
            ))}
          </div>
        </div>

        <p>© {new Date().getFullYear()} WannaDev. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
