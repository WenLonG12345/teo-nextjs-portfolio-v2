"use client";
import { SITE_CONFIG } from "@/constants";
import { Link } from "@/i18n/routing";
import { Button } from "../ui/button";

function Footer() {
  return (
    <footer className="w-full py-10 bg-secondary ">
      <div className="max-w-[1024px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-2 text-sm">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex flex-row gap-2 mx-auto">
            {SITE_CONFIG.footer.accounts.map((acc) => (
              <Link key={acc?.name} href={acc?.url} aria-label={acc.name}>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-none"
                  aria-label={acc.name}
                >
                  {acc?.icon}
                </Button>
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
