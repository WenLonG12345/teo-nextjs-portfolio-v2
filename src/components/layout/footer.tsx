"use client";

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
import { Button } from "../ui/button";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
	Github: <FaGithub size={24} className="text-black dark:text-white" />,
	Linkedin: <FaLinkedin size={24} color="#0e76a8" />,
	StackOverflow: <FaStackOverflow size={24} color="#f48024" />,
	Medium: <FaMedium size={24} className="text-black dark:text-white" />,
	Gmail: <SiGmail size={24} color="red" />,
};

function Footer() {
	const t = useTranslations();

	return (
		<footer className="w-full border-t border-border mt-8">
			<div className="container max-w-screen-xl mx-auto py-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
					{/* Brand */}
					<div>
						<div className="text-xl font-bold mb-2">
							{SITE_CONFIG.footer.name}
						</div>
						<p className="text-sm text-muted-foreground leading-relaxed">
							Frontend Engineer from Malaysia. Building beautiful web &amp;
							mobile experiences.
						</p>
					</div>

					{/* Quick links */}
					<div>
						<div className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">
							{t("footer.quick_links")}
						</div>
						<div className="flex flex-col gap-2">
							{NAV_ITEM_LIST.map(({ href, label }) => (
								<Link
									key={href}
									href={href}
									className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 w-fit"
								>
									{t(label)}
								</Link>
							))}
						</div>
					</div>

					{/* Social */}
					<div>
						<div className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">
							{t("footer.connect")}
						</div>
						<div className="flex flex-row flex-wrap gap-1">
							{SITE_CONFIG.footer.accounts.map((acc) => (
								<Link key={acc?.name} href={acc?.url} aria-label={acc.name}>
									<Button
										variant="ghost"
										size="icon"
										className="hover:text-primary"
										aria-label={acc.name}
									>
										{SOCIAL_ICONS[acc.name]}
									</Button>
								</Link>
							))}
						</div>
					</div>
				</div>

				<div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
					{SITE_CONFIG.footer.copyright}
				</div>
			</div>
		</footer>
	);
}

export default Footer;
