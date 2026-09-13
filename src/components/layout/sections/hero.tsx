"use client";

/* Hallmark · macrostructure: Split Studio · tone: plain-spoken / austere · anchor hue: project primary (amber)
 * pre-emit critique: P5 H4 E4 S5 R5 V4
 * hero: H2 split diptych 7/5 · heads: S2 hanging, no eyebrows · CTA: solid primary + C3 text link
 * enrichment: none (real client logos only) · reveal: hero halves cross-fade, nothing else
 * theme: project palette preserved (shadcn HSL tokens, Hanken Grotesk)
 */

import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CLIENT_LIST, PROJECT_LIST, SITE_CONFIG } from "@/constants";
import { Link } from "@/i18n/routing";

const HeroSection = () => {
	const t = useTranslations();

	return (
		<section className="container">
			<div className="grid grid-cols-1 gap-12 py-16 md:py-24 lg:grid-cols-[7fr_5fr] lg:gap-20 lg:items-center">
				{/* ── Left: the offer ─────────────────────────────── */}
				<div className="min-w-0">
					<div className="flex flex-wrap items-center gap-2 mb-6">
						<Badge
							variant="outline"
							className="uppercase tracking-widest border-primary/25 bg-primary/10 text-primary"
						>
							twlworks
						</Badge>
						<Badge
							variant="outline"
							className="font-medium border-border bg-muted/60 text-muted-foreground"
						>
							{t("home.wordmark_tagline")}
						</Badge>
					</div>
					<h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-balance md:text-5xl xl:text-6xl wrap-anywhere">
						{t("home.hero_2")}
					</h1>
					<p className="max-w-xl mt-6 text-lg leading-relaxed text-muted-foreground">
						{t("home.hero_3")}
					</p>

					<div className="flex flex-wrap items-center gap-3 mt-8">
						<Button size="lg" className="text-base font-semibold" asChild>
							<a
								href={SITE_CONFIG.contact.booking}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Phone size={16} />
								{t("home.book_call")}
							</a>
						</Button>
						<Button variant="outline" size="lg" asChild>
							<a
								href={SITE_CONFIG.contact.whatsapp}
								target="_blank"
								rel="noopener noreferrer"
							>
								<MessageCircle size={16} />
								{t("home.whatsapp")}
							</a>
						</Button>
					</div>

					<Badge
						variant="outline"
						className="gap-2 mt-6 font-medium border-green-500/25 bg-green-500/10 text-green-700 dark:text-green-400"
					>
						<span className="rounded-full size-1.5 bg-green-500" aria-hidden />
						{t("home.available")}
					</Badge>
				</div>

				{/* ── Right: proof ────────────────────────────────── */}
				<div className="min-w-0">
					<div className="flex items-center gap-4">
						<div className="relative overflow-hidden rounded-full size-12 shrink-0 bg-muted">
							<Image
								src="/images/profile_picture.png"
								fill
								sizes="48px"
								alt="Teo Wen Long, founder of twlworks"
								className="object-cover object-top"
								priority
							/>
						</div>
						<div className="min-w-0">
							<p className="text-sm font-semibold">Teo Wen Long</p>
							<p className="text-xs text-muted-foreground">
								{t("home.founder_role")}
							</p>
						</div>
					</div>
					<p className="mt-4 text-sm leading-relaxed text-muted-foreground">
						{t("home.direct")}
					</p>

					<p className="mt-8 text-xs font-semibold tracking-wide uppercase text-muted-foreground">
						{t("home.trusted_by")}
					</p>
					<ul className="grid grid-cols-4 gap-3 mt-3">
						{CLIENT_LIST.map((client) => {
							// logos are dark ink on transparent, so the plate stays light in both themes
							const plate = (
								<span className="relative block w-full overflow-hidden rounded-md aspect-4/3 bg-white">
									<Image
										src={client.logo}
										alt={client.name}
										fill
										sizes="120px"
										className="object-contain p-2"
									/>
								</span>
							);
							return (
								<li key={client.name} className="min-w-0">
									{client.url ? (
										<a
											href={client.url}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={client.name}
											title={client.name}
											className="block rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
										>
											{plate}
										</a>
									) : (
										<span title={client.name}>{plate}</span>
									)}
								</li>
							);
						})}
					</ul>

					<dl className="grid grid-cols-2 gap-6 pt-5 mt-6 border-t border-border">
						<div>
							{/* count only the written-up SME work — same filter as the home case list */}
							<dd className="text-2xl font-bold tabular-nums">
								{
									PROJECT_LIST["project.freelance"].filter(
										(p) => p.problem && p.outcome,
									).length
								}
							</dd>
							<dt className="text-xs text-muted-foreground">
								{t("home.fact_projects")}
							</dt>
						</div>
						<div>
							<dd className="text-2xl font-bold tabular-nums">7+</dd>
							<dt className="text-xs text-muted-foreground">
								{t("home.fact_years")}
							</dt>
						</div>
					</dl>
					<p className="mt-3 text-xs text-muted-foreground">
						{t("home.sectors")}
					</p>

					<Button variant="outline" className="mt-6" asChild>
						<Link href="/work">
							{t("project.view_all")}
							<ArrowRight size={14} />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
