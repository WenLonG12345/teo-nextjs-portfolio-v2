"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { BiPhoneCall } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuChevronDown } from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CLIENT_LIST, PROJECT_LIST, SITE_CONFIG } from "@/constants";
import { Link } from "@/i18n/routing";
import { cn } from "@/utils/cn";
import { MotionDiv, MotionSection } from "@/utils/motion-div";

const TILE =
	"group block p-1.5 rounded-lg border border-border/70 bg-card min-w-0";

const HeroSection = () => {
	const t = useTranslations();
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 80);
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<section className="container w-full">
			<div className="relative grid items-center grid-cols-1 gap-10 py-16 mx-auto lg:grid-cols-[1.15fr_1fr] lg:gap-16 md:py-28 lg:max-w-(--breakpoint-xl)">
				<div className="absolute top-2 lg:-top-20 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-60 bg-primary/40 rounded-full blur-3xl -z-10" />

				{/* ── Left: the offer ───────────────────────────────── */}
				<div className="order-1">
					<MotionSection
						animationProps={{
							initial: { opacity: 0, y: 16 },
							animate: { opacity: 1, y: 0 },
							transition: { delay: 0.05, duration: 0.5 },
							className: "flex flex-wrap items-center gap-2",
						}}
					>
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
					</MotionSection>

					<MotionSection
						animationProps={{
							initial: { opacity: 0, y: 24 },
							animate: { opacity: 1, y: 0 },
							transition: { delay: 0.15, duration: 0.55 },
							className: "mt-6",
						}}
					>
						<h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-balance md:text-5xl xl:text-6xl">
							{t("home.hero_2")}
						</h1>
						<p className="max-w-xl mt-6 text-lg leading-relaxed text-muted-foreground">
							{t("home.hero_3")}
						</p>
					</MotionSection>

					<MotionSection
						animationProps={{
							initial: { opacity: 0, y: 24 },
							animate: { opacity: 1, y: 0 },
							transition: { delay: 0.25, duration: 0.55 },
							className: "flex flex-wrap items-center gap-3 mt-8",
						}}
					>
						<Link
							href={SITE_CONFIG.contact.booking}
							target="_blank"
							aria-label={t("home.book_call")}
						>
							<Button
								size="lg"
								className="text-base font-semibold cursor-pointer group/arrow"
							>
								<BiPhoneCall size={18} className="mr-2" />
								{t("home.book_call")}
								<FaArrowRightLong className="ml-2 transition-transform size-4 group-hover/arrow:translate-x-1" />
							</Button>
						</Link>

						<Link
							href={SITE_CONFIG.contact.whatsapp}
							target="_blank"
							aria-label={t("home.whatsapp")}
						>
							<Button
								size="lg"
								variant="outline"
								className="text-base font-semibold cursor-pointer"
							>
								<FaWhatsapp size={18} className="mr-2" />
								{t("home.whatsapp")}
							</Button>
						</Link>
					</MotionSection>

					<MotionSection
						animationProps={{
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							transition: { delay: 0.4, duration: 0.5 },
							className: "mt-5",
						}}
					>
						<Badge
							variant="outline"
							className="gap-2 font-medium border-green-500/25 bg-green-500/10 text-green-700 dark:text-green-400"
						>
							<span className="rounded-full size-1.5 bg-green-500 animate-pulse motion-reduce:animate-none" />
							{t("home.available")}
						</Badge>
					</MotionSection>
				</div>

				{/* ── Right: who you're hiring, and for whom ────────── */}
				<MotionSection
					animationProps={{
						initial: { opacity: 0, y: 24 },
						animate: { opacity: 1, y: 0 },
						transition: { delay: 0.35, duration: 0.6 },
						className: "order-2 w-full",
					}}
				>
					<div className="overflow-hidden border rounded-2xl border-border bg-card shadow-xs">
						{/* Signature */}
						<div className="flex items-center gap-4 p-5">
							<div className="relative w-14 h-14 overflow-hidden border rounded-full shrink-0 border-border bg-muted">
								<Image
									src="/images/profile_picture.png"
									fill
									sizes="56px"
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

						<p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
							{t("home.direct")}
						</p>

						{/* Proof */}
						<div className="px-5 py-4 border-t border-border bg-muted/30">
							<p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
								{t("home.trusted_by")}
							</p>

							<ul className="grid grid-cols-4 gap-2 mt-4">
								{CLIENT_LIST.map((client) => {
									// every logo is a wordmark, so a name caption would just repeat it
									const tile = (
										// logos are dark-ink/transparent, so the plate stays light in both themes
										<span className="relative block w-full overflow-hidden rounded-md aspect-4/3 bg-white ring-1 ring-black/5">
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
												<Link
													href={client.url}
													target="_blank"
													aria-label={client.name}
													title={client.name}
													className={cn(
														TILE,
														"cursor-pointer transition-[transform,border-color,box-shadow] duration-200 ease-out",
														"hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-sm active:translate-y-0",
														"motion-reduce:hover:translate-y-0",
														"focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
													)}
												>
													{tile}
												</Link>
											) : (
												<span className={TILE} title={client.name}>
													{tile}
												</span>
											)}
										</li>
									);
								})}
							</ul>
						</div>

						{/* Numbers */}
						<dl className="grid grid-cols-2 border-t divide-x border-border divide-border">
							<div className="px-5 py-3">
								<dd className="text-lg font-bold tabular-nums text-primary">
									{PROJECT_LIST["project.freelance"].length}
								</dd>
								<dt className="text-xs leading-tight text-muted-foreground">
									{t("home.fact_projects")}
								</dt>
							</div>
							<div className="px-5 py-3">
								<dd className="text-lg font-bold tabular-nums text-primary">
									7+
								</dd>
								<dt className="text-xs leading-tight text-muted-foreground">
									{t("home.fact_years")}
								</dt>
							</div>
						</dl>

						<p className="px-5 py-3 text-xs border-t border-border text-muted-foreground">
							{t("home.sectors")}
						</p>
					</div>
				</MotionSection>
			</div>

			{/* Scroll indicator */}
			<MotionDiv
				animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? 10 : 0 }}
				initial={{ opacity: 0 }}
				transition={{
					opacity: { delay: 1.2, duration: 0.6 },
					y: { duration: 0.3 },
				}}
				className="flex justify-center pb-10 pointer-events-none"
				aria-hidden="true"
			>
				<div className="flex flex-col items-center gap-2">
					<span className="text-xs tracking-[0.2em] uppercase font-medium text-muted-foreground/60">
						Scroll
					</span>
					<div className="w-6 h-10 rounded-full border-2 border-muted-foreground/40 flex justify-center pt-1.5">
						<MotionDiv
							animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
							transition={{
								repeat: Infinity,
								duration: 1.5,
								ease: "easeInOut",
							}}
							className="w-1 h-2 rounded-full bg-muted-foreground/60"
						/>
					</div>
					<MotionDiv
						animate={{ y: [0, 4, 0], opacity: [0.4, 1, 0.4] }}
						transition={{
							repeat: Infinity,
							duration: 1.5,
							ease: "easeInOut",
							delay: 0.15,
						}}
					>
						<LuChevronDown size={14} className="text-muted-foreground/40" />
					</MotionDiv>
				</div>
			</MotionDiv>
		</section>
	);
};

export default HeroSection;
