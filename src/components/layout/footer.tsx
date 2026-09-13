"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type React from "react";
import {
	FaGithub,
	FaLinkedin,
	FaMedium,
	FaStackOverflow,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { NAV_ITEM_LIST, SITE_CONFIG } from "@/constants";
import { Link } from "@/i18n/routing";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
	Github: <FaGithub size={18} />,
	Linkedin: <FaLinkedin size={18} />,
	StackOverflow: <FaStackOverflow size={18} />,
	Medium: <FaMedium size={18} />,
	Gmail: <SiGmail size={18} />,
};

// Ft1 mast-headed: one band — wordmark + tagline, nav beside, socials + copyright below.
function Footer() {
	const t = useTranslations();

	return (
		// bottom padding clears the fixed WhatsApp / back-to-top buttons on small screens
		<footer className="w-full border-t border-border mt-8">
			<div className="container py-10 pb-28 sm:pb-10">
				<div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
					<div className="max-w-sm">
						<Link href="/" className="inline-block" aria-label="twlworks">
							<Image
								src="/logo-light.svg"
								width={50}
								height={38}
								alt="twlworks"
								className="dark:hidden"
							/>
							<Image
								src="/logo-dark.svg"
								width={50}
								height={38}
								alt="twlworks"
								className="hidden dark:block"
							/>
						</Link>
						<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
							{t("footer.tagline")}
						</p>
					</div>

					<nav
						aria-label={t("footer.quick_links")}
						className="flex flex-wrap gap-x-5 gap-y-2"
					>
						{NAV_ITEM_LIST.map(({ href, label }) => (
							<Link
								key={href}
								href={href}
								className="text-sm whitespace-nowrap text-muted-foreground hover:text-foreground transition-colors"
							>
								{t(label)}
							</Link>
						))}
					</nav>
				</div>

				<div className="flex flex-col gap-4 pt-6 mt-8 border-t border-border sm:flex-row sm:items-center sm:justify-between">
					<ul
						className="flex items-center gap-1"
						aria-label={t("footer.connect")}
					>
						{SITE_CONFIG.footer.accounts.map((acc) => (
							<li key={acc.name}>
								<a
									href={acc.url}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={acc.name}
									className="flex items-center justify-center rounded-md size-9 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
								>
									{SOCIAL_ICONS[acc.name]}
								</a>
							</li>
						))}
					</ul>
					<p className="text-xs text-muted-foreground">
						{SITE_CONFIG.footer.copyright}
					</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
