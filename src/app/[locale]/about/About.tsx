"use client";

/* Hallmark · macrostructure: Letter · tone: plain-spoken / austere · anchor hue: project primary
 * pre-emit critique: P5 H4 E4 S5 R5 V4
 * enrichment: none (typography only) · reveal: none (Letter)
 * theme: project palette preserved (shadcn HSL tokens, Bricolage display + Manrope body)
 */

import { useTranslations } from "next-intl";
import { BiPhoneCall } from "react-icons/bi";
import { CgAlbum } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/constants";
import { Link } from "@/i18n/routing";
import CareerTabs from "./tabs/CareerTabs";
import EducationTabs from "./tabs/EducationTabs";

type Principle = { title: string; body: string };

const AboutClient = () => {
	const t = useTranslations();
	const letter = t.raw("about.letter") as string[];
	const principles = t.raw("about.principles") as Principle[];

	return (
		<div className="container py-16 md:py-24">
			{/* ── The letter ───────────────────────────────────────── */}
			<div className="max-w-[60ch] mx-auto">
				<h1 className="text-3xl font-bold md:text-4xl font-display">
					{t("about.greeting")}
				</h1>

				<div className="mt-8 space-y-6">
					{letter.map((paragraph) => (
						<p
							key={paragraph.slice(0, 24)}
							className="text-base leading-loose text-muted-foreground"
						>
							{paragraph}
						</p>
					))}
				</div>

				<p
					className="my-14 text-center select-none text-muted-foreground/40 tracking-[0.6em]"
					aria-hidden="true"
				>
					* * *
				</p>

				{/* ── How I work ─────────────────────────────────────── */}
				<h2 className="text-xl font-semibold font-display">
					{t("about.principles_title")}
				</h2>

				<dl className="mt-6">
					{principles.map((principle) => (
						<div
							key={principle.title}
							className="grid gap-1 py-5 border-t border-border sm:grid-cols-[10rem_1fr] sm:gap-6"
						>
							<dt className="text-sm font-semibold leading-relaxed">
								{principle.title}
							</dt>
							<dd className="text-sm leading-relaxed text-muted-foreground">
								{principle.body}
							</dd>
						</div>
					))}
				</dl>
			</div>

			{/* ── The record ───────────────────────────────────────── */}
			<div className="mt-24">
				<CareerTabs />
			</div>
			<div className="mt-24">
				<EducationTabs />
			</div>

			{/* ── Sign-off ─────────────────────────────────────────── */}
			<div className="max-w-[60ch] mx-auto mt-24 pt-8 border-t border-border">
				<p className="text-sm text-muted-foreground">{t("about.ps")}</p>

				<div className="flex flex-wrap gap-3 mt-4">
					<Link
						href={SITE_CONFIG.resume.url}
						target="_blank"
						aria-label={t("about.resume")}
					>
						<Button variant="outline" className="gap-2">
							<CgAlbum size={16} />
							{t("about.resume")}
						</Button>
					</Link>

					<Link
						href={SITE_CONFIG.contact.booking}
						target="_blank"
						aria-label={t("about.book_cta")}
					>
						<Button className="gap-2">
							<BiPhoneCall size={16} />
							{t("about.book_cta")}
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default AboutClient;
