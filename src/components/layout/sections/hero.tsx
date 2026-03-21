"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { BiPhoneCall } from "react-icons/bi";
import { CgAlbum } from "react-icons/cg";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuChevronDown } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/constants";
import { Link } from "@/i18n/routing";
import { MotionDiv, MotionSection } from "@/utils/motion-div";

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
			<div className="relative grid items-center grid-cols-1 gap-12 py-16 mx-auto md:px-20 lg:grid-cols-2 md:py-40 lg:max-w-screen-xl">
				<div className="absolute top-2 lg:-top-20 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-60 bg-primary/50 rounded-full blur-3xl -z-10" />

				{/* Text column */}
				<div className="order-2 space-y-6 text-center lg:text-left lg:order-1">
					<MotionSection
						animationProps={{
							initial: { opacity: 0, y: 20 },
							animate: { opacity: 1, y: 0 },
							transition: { delay: 0.1, duration: 0.5 },
						}}
					>
						<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium border border-green-200 dark:border-green-800">
							<span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
							{t("home.available")}
						</div>
					</MotionSection>

					<MotionSection
						animationProps={{
							initial: { opacity: 0, y: 50 },
							animate: { opacity: 1, y: 0 },
							transition: {
								delay: 0.3,
								type: "spring",
								stiffness: 100,
								damping: 10,
							},
						}}
					>
						<h1 className="max-w-screen-lg text-4xl font-bold md:text-6xl">
							{t("home.hero_1")}{" "}
							<span className="text-transparent px-2 bg-gradient-to-r from-[#6089CF] to-primary bg-clip-text">
								Teo
							</span>
						</h1>
					</MotionSection>

					<MotionSection
						animationProps={{
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							transition: { delay: 0.5, duration: 0.8 },
						}}
					>
						<p className="max-w-screen-sm text-xl text-muted-foreground">
							{t("home.hero_2")}
						</p>
						<p className="max-w-screen-sm mt-2 text-xl text-muted-foreground">
							{t("home.hero_3")}
						</p>

						<div className="flex flex-row justify-center gap-3 mt-6 lg:justify-start">
							<Link
								href={SITE_CONFIG.resume.url}
								target="_blank"
								aria-label="resume"
							>
								<Button
									className="w-full h-full text-lg font-semibold sm:w-auto group/arrow"
									aria-label="resume"
								>
									<i className="mr-2">
										<CgAlbum />
									</i>
									{t(`${SITE_CONFIG.resume.name}`)}
									<FaArrowRightLong className="ml-2 transition-transform size-5 group-hover/arrow:translate-x-1" />
								</Button>
							</Link>

							<Link href={SITE_CONFIG.contact.url} aria-label="contact me">
								<Button
									variant="secondary"
									className="w-full h-full text-lg font-semibold sm:w-auto"
									aria-label="contact me"
								>
									<i className="mr-2">
										<BiPhoneCall />
									</i>
									{t(`${SITE_CONFIG.contact.name}`)}
								</Button>
							</Link>
						</div>
					</MotionSection>
				</div>

				{/* Profile image column */}
				<MotionSection
					animationProps={{
						initial: { opacity: 0, scale: 0.85 },
						animate: { opacity: 1, scale: 1 },
						transition: { delay: 0.4, duration: 0.6, ease: "easeOut" },
						className: "flex justify-center lg:justify-end order-1 lg:order-2",
					}}
				>
					<div className="relative">
						<div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-[#6089CF]/30 blur-2xl scale-110" />
						<div className="relative hidden w-56 h-56 overflow-hidden border-4 rounded-full shadow-2xl md:block lg:w-80 lg:h-80 border-primary/20 bg-muted">
							<Image
								src="/images/profile_picture.png"
								fill
								alt="Teo - Frontend Engineer"
								className="object-cover"
								priority
							/>
						</div>
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
					{/* Mouse-shaped container */}
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
