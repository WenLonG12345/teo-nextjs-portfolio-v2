"use client";
import { SITE_CONFIG } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

function Footer() {
  return (
    <footer className="w-full py-10 bg-secondary ">
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
            <h2 className="ml-3 text-lg font-bold leading-5">
              {SITE_CONFIG.footer.name}
            </h2>
          </div>
          <div className="flex flex-row gap-2 mx-auto">
            {SITE_CONFIG.footer.accounts.map((acc) => (
              <Link
                key={acc?.name}
                href={acc?.url}
              >
                <Button variant='outline' size="icon" className="border-none">{acc?.icon}</Button>
              </Link>
            ))}
          </div>
        </div>

        <p>{SITE_CONFIG.footer.copyright}</p>
      </div>
    </footer>
  );
}

export default Footer;
