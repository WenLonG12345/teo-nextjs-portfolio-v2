"use client";

/* Hallmark · macrostructure: Split Studio · tone: plain-spoken / austere · anchor hue: project primary (amber)
 * pre-emit critique: P5 H4 E4 S5 R5 V4
 * hero: H2 split diptych 7/5 · right pane: deck of 3 real screenshots, front cycles to back every 4s
 * (transform/opacity only, pauses on hover, off under reduced-motion) · proof strip: T4 stats + colour logo row
 * theme: project palette preserved (shadcn HSL tokens, Hanken Grotesk)
 */

import { MessageCircle, Phone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CLIENT_LIST, PROJECT_LIST, SITE_CONFIG } from "@/constants";

// back to front; the front one is the platform the headline is about
const STACK = ["TCGKL", "Hercules Factory Management System", "Regal Global"]
	.map((name) => PROJECT_LIST["project.freelance"].find((p) => p.name === name))
	.filter((p) => p !== undefined);
// slot 0 = back, slot 2 = front; x/y are % of the card's own size
const SLOTS = [
	{ x: "0%", y: "0%", rotate: -4, scale: 0.92, opacity: 0.7, zIndex: 0 },
	{ x: "16%", y: "40%", rotate: -2, scale: 0.96, opacity: 0.9, zIndex: 1 },
	{ x: "32%", y: "80%", rotate: 0, scale: 1, opacity: 1, zIndex: 2 },
];
const CYCLE_MS = 4000;

const ScreenshotStack = () => {
	const reduceMotion = useReducedMotion();
	const [paused, setPaused] = useState(false);
	// order[slot] = index into STACK
	const [order, setOrder] = useState([0, 1, 2]);

	useEffect(() => {
		if (reduceMotion || paused) return;
		const id = setInterval(
			() => setOrder(([back, mid, front]) => [front, back, mid]),
			CYCLE_MS,
		);
		return () => clearInterval(id);
	}, [reduceMotion, paused]);

	return (
		<div
			className="relative aspect-4/3"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
		>
			{STACK.map((project, i) => {
				const slot = order.indexOf(i);
				return (
					<motion.figure
						key={project.name}
						initial={false}
						animate={SLOTS[slot]}
						transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
						onClick={() => setOrder((o) => [...o.filter((j) => j !== i), i])}
						className="absolute top-0 left-0 w-[74%] overflow-hidden rounded-lg border border-border bg-muted aspect-video shadow-2xl shadow-black/15 cursor-pointer origin-bottom-left"
					>
						<Image
							src={project.imageUrl}
							alt={project.name}
							fill
							sizes="(max-width: 1024px) 74vw, 32vw"
							className="object-cover object-top"
							priority={i === STACK.length - 1}
						/>
					</motion.figure>
				);
			})}
		</div>
	);
};
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

				{/* ── Right: three real screenshots, back to front ───────── */}
				<div className="min-w-0">
					<ScreenshotStack />
					<p className="mt-4 text-xs text-muted-foreground">
						{t("home.trusted_by")} · {STACK.map((p) => p.name).join(" · ")}
					</p>
				</div>
			</div>

			{/* ── Proof strip: numbers, sectors, monochrome logos ──────── */}
			<div className="grid grid-cols-2 gap-6 py-6 border-t border-b border-border lg:grid-cols-[auto_auto_auto_1fr] lg:items-center lg:gap-12">
				<div>
					{/* count only the written-up SME work — same filter as the home case grid */}
					<p className="text-2xl font-bold tabular-nums">
						{
							PROJECT_LIST["project.freelance"].filter(
								(p) => p.problem && p.outcome,
							).length
						}
					</p>
					<p className="text-xs text-muted-foreground">
						{t("home.fact_projects")}
					</p>
				</div>
				<div>
					<p className="text-2xl font-bold tabular-nums">7+</p>
					<p className="text-xs text-muted-foreground">
						{t("home.fact_years")}
					</p>
				</div>
				<p className="col-span-2 text-sm text-muted-foreground lg:col-span-1">
					{t("home.sectors")}
				</p>
				<ul className="flex flex-wrap items-center col-span-2 gap-x-8 gap-y-4 lg:col-span-1 lg:justify-end">
					{CLIENT_LIST.map((client) => {
						const mark = (
							<Image
								src={client.logo}
								alt={client.name}
								width={112}
								height={40}
								className="object-contain w-auto h-7"
							/>
						);
						return (
							<li key={client.name}>
								{client.url ? (
									<a
										href={client.url}
										target="_blank"
										rel="noopener noreferrer"
										title={client.name}
										className="block rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
									>
										{mark}
									</a>
								) : (
									<span title={client.name}>{mark}</span>
								)}
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
};

export default HeroSection;
