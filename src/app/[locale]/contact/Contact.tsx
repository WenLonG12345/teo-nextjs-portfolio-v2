"use client";

import { Mail, MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import type React from "react";
import {
	FaGithub,
	FaLinkedin,
	FaMedium,
	FaStackOverflow,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/constants";
import { cn } from "@/utils/cn";

const SOCIAL_ICONS: Record<
	string,
	{ icon: React.ReactNode; colorClass: string }
> = {
	Github: { icon: <FaGithub size={15} />, colorClass: "text-foreground" },
	Linkedin: { icon: <FaLinkedin size={15} />, colorClass: "text-[#0e76a8]" },
	StackOverflow: {
		icon: <FaStackOverflow size={15} />,
		colorClass: "text-[#f48024]",
	},
	Medium: { icon: <FaMedium size={15} />, colorClass: "text-foreground" },
	Gmail: { icon: <SiGmail size={15} />, colorClass: "text-[#ea4335]" },
};

const ContactClient = () => {
	const t = useTranslations();

	// priority is the order; the first card is the one to take
	const channels = [
		{
			key: "whatsapp",
			href: SITE_CONFIG.contact.whatsapp,
			icon: <MessageCircle size={20} />,
			primary: true,
		},
		{
			key: "call",
			href: SITE_CONFIG.contact.booking,
			icon: <Phone size={20} />,
			primary: false,
		},
		{
			key: "email",
			href: `mailto:${SITE_CONFIG.contact.email}?subject=${encodeURIComponent(
				t("contact.email_subject"),
			)}`,
			icon: <Mail size={20} />,
			primary: false,
		},
	] as const;

	return (
		<div className="container py-16">
			<div className="max-w-2xl">
				<h1 className="text-3xl font-bold tracking-tight md:text-4xl wrap-anywhere">
					{t("contact.title")}
				</h1>
				<p className="mt-4 text-lg leading-relaxed text-muted-foreground">
					{t("contact.lede")}
				</p>
			</div>

			<ol className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-3">
				{channels.map((c, i) => (
					<li
						key={c.key}
						className={cn(
							"flex flex-col p-6 border rounded-2xl bg-card",
							c.primary ? "border-primary/50 shadow-lg" : "border-border",
						)}
					>
						<div className="flex items-center justify-between">
							<span
								className={cn(
									"flex items-center justify-center size-10 rounded-xl",
									c.primary
										? "bg-primary text-primary-foreground"
										: "bg-primary/10 text-primary",
								)}
							>
								{c.icon}
							</span>
							{c.primary ? (
								<Badge>{t("contact.channels.whatsapp.short")}</Badge>
							) : (
								<span className="text-xs font-semibold tabular-nums text-muted-foreground">
									{String(i + 1).padStart(2, "0")}
								</span>
							)}
						</div>
						<h2 className="mt-5 text-xl font-semibold">
							{t(`contact.channels.${c.key}.title`)}
						</h2>
						{!c.primary && (
							<p className="mt-0.5 text-sm text-muted-foreground">
								{t(`contact.channels.${c.key}.short`)}
							</p>
						)}
						<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
							{t(`contact.channels.${c.key}.description`)}
						</p>
						<Button
							variant={c.primary ? "default" : "outline"}
							className="mt-6 font-semibold"
							asChild
						>
							<a
								href={c.href}
								target={c.key === "email" ? undefined : "_blank"}
								rel="noopener noreferrer"
							>
								{t(`contact.channels.${c.key}.cta`)}
							</a>
						</Button>
					</li>
				))}
			</ol>

			{/* Social links */}
			<div className="mt-12">
				<p className="mb-3 text-xs font-medium tracking-wider uppercase text-muted-foreground">
					{t("footer.connect")}
				</p>
				<div className="flex flex-wrap gap-2">
					{SITE_CONFIG.footer.accounts.map((acc) => {
						const social = SOCIAL_ICONS[acc.name];
						if (!social) return null;
						return (
							<Button
								key={acc.name}
								variant="outline"
								size="sm"
								className={`gap-2 h-9 px-3 rounded-xl hover:border-primary/40 ${social.colorClass}`}
								asChild
							>
								<a
									href={acc.url}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={acc.name}
								>
									{social.icon}
									<span className="text-xs font-medium text-foreground">
										{acc.name}
									</span>
								</a>
							</Button>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ContactClient;
