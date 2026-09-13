"use client";

/* Hallmark · macrostructure: Bento Grid · tone: utilitarian · anchor hue: project primary (amber)
 * pre-emit critique: P4 H5 E4 S5 R5 V4
 * genre: editorial · nav/footer: shared layout (unchanged) · enrichment: none (real photo, tile-cropped)
 * reveal: none on tiles; Career / Education keep their existing entrance
 * theme: project palette preserved (shadcn HSL tokens, Hanken Grotesk)
 */

import { ArrowUpRight, Download, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
	CAREER_LIST,
	PROJECT_LIST,
	SITE_CONFIG,
	SKILL_LIST,
} from "@/constants";
import { Link } from "@/i18n/routing";
import CareerTabs from "./tabs/CareerTabs";
import EducationTabs from "./tabs/EducationTabs";

const [NOW] = CAREER_LIST;
const PROJECT_COUNT = Object.values(PROJECT_LIST).flat().length;
const YEARS = new Date().getFullYear() - 2019;
const PROFILES = SITE_CONFIG.footer.accounts.filter((a) =>
	a.url.startsWith("https://"),
);

const tile =
	"min-w-0 rounded-2xl border border-border bg-card p-6 flex flex-col";
const label =
	"text-xs font-medium tracking-wide uppercase text-muted-foreground";

const AboutClient = () => {
	const t = useTranslations();

	return (
		<div className="container py-16 md:py-24">
			{/* ── Bento ────────────────────────────────────────────── */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(11rem,auto)]">
				{/* Identity · 2×2 */}
				<div className={`${tile} sm:col-span-2 lg:row-span-2 gap-6`}>
					<div className="flex items-start gap-5">
						<div className="relative w-20 h-20 overflow-hidden border shrink-0 rounded-xl border-border bg-muted sm:w-24 sm:h-24">
							<Image
								src="/images/profile_picture.png"
								alt="Teo Wen Long"
								fill
								sizes="96px"
								className="object-cover"
								priority
							/>
						</div>
						<div className="min-w-0">
							<h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl wrap-anywhere">
								Teo Wen Long
							</h1>
							<p className="mt-1 text-base font-medium text-primary">
								{NOW.role}
							</p>
							<p className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
								<MapPin size={14} aria-hidden="true" />
								{t("about.location")}
							</p>
						</div>
					</div>

					<p className="text-base leading-relaxed text-muted-foreground max-w-[58ch]">
						{t("about.summary")}
					</p>

					<div className="flex flex-wrap gap-3 mt-auto">
						<Button asChild className="gap-2">
							<Link href={SITE_CONFIG.resume.url} target="_blank">
								<Download size={16} aria-hidden="true" />
								{t("about.resume")}
							</Link>
						</Button>
						<Button asChild variant="outline" className="gap-2">
							<Link href={SITE_CONFIG.contact.booking} target="_blank">
								<Phone size={16} aria-hidden="true" />
								{t("about.book_cta")}
							</Link>
						</Button>
					</div>
				</div>

				{/* Now · 1×1 */}
				<div className={`${tile} gap-4`}>
					<span className={label}>{t("about.now")}</span>
					<div className="flex items-center gap-3 mt-auto">
						<div className="relative w-10 h-10 overflow-hidden border rounded-lg shrink-0 border-border bg-muted">
							<Image
								src={NOW.logo}
								alt={NOW.alt}
								fill
								sizes="40px"
								className="object-cover"
							/>
						</div>
						<div className="min-w-0">
							<Link
								href={NOW.url}
								target="_blank"
								className="inline-flex items-center gap-1 font-semibold leading-tight hover:text-primary group"
							>
								{NOW.title}
								<ArrowUpRight
									size={12}
									aria-hidden="true"
									className="opacity-0 transition-opacity group-hover:opacity-100"
								/>
							</Link>
							<p className="text-xs text-muted-foreground">{NOW.period}</p>
						</div>
					</div>
				</div>

				{/* Numbers · 1×1 — derived from data, not typed */}
				<div className={`${tile} gap-4`}>
					<span className={label}>{t("about.record")}</span>
					<dl className="grid grid-cols-2 gap-4 mt-auto">
						<div>
							<dd className="text-4xl font-bold leading-none tracking-tight tabular-nums">
								{YEARS}
							</dd>
							<dt className="mt-1 text-xs text-muted-foreground">
								{t("about.years")}
							</dt>
						</div>
						<div>
							<dd className="text-4xl font-bold leading-none tracking-tight tabular-nums">
								{PROJECT_COUNT}
							</dd>
							<dt className="mt-1 text-xs text-muted-foreground">
								{t("about.projects")}
							</dt>
						</div>
					</dl>
				</div>

				{/* twlworks · 1×1 */}
				<div className={`${tile} gap-3`}>
					<span className={label}>{t("about.also")}</span>
					<p className="text-sm leading-relaxed text-muted-foreground">
						{t("about.also_body")}
					</p>
					<Link
						href="/services"
						className="inline-flex items-center gap-1 mt-auto text-sm font-medium text-primary hover:underline underline-offset-4"
					>
						{t("about.also_cta")}
						<ArrowUpRight size={14} aria-hidden="true" />
					</Link>
				</div>

				{/* Elsewhere · 1×1 */}
				<div className={`${tile} gap-3`}>
					<span className={label}>{t("about.elsewhere")}</span>
					<ul className="flex flex-col gap-1.5 mt-auto">
						{PROFILES.map((p) => (
							<li key={p.url}>
								<Link
									href={p.url}
									target="_blank"
									rel="me noopener"
									className="inline-flex items-center gap-1 text-sm font-medium hover:text-primary group"
								>
									{p.name}
									<ArrowUpRight
										size={12}
										aria-hidden="true"
										className="opacity-0 transition-opacity group-hover:opacity-100"
									/>
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* Skills · full row */}
				<div className={`${tile} sm:col-span-2 lg:col-span-4 gap-4`}>
					<span className={label}>{t("about.stack")}</span>
					<ul className="flex flex-wrap gap-2">
						{SKILL_LIST.map((skill) => (
							<li
								key={skill.name}
								className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-2 py-1 text-xs font-medium"
							>
								<Image
									src={skill.icon}
									width={14}
									height={14}
									alt=""
									aria-hidden="true"
								/>
								{skill.name}
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* ── The record ───────────────────────────────────────── */}
			<div className="mt-24">
				<CareerTabs />
			</div>
			<div className="mt-24">
				<EducationTabs />
			</div>
		</div>
	);
};

export default AboutClient;
