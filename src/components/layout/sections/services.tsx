"use client";

import { useTranslations } from "next-intl";
import { BiPhoneCall } from "react-icons/bi";
import { LuArrowRight, LuCheck } from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SERVICE_LIST, SITE_CONFIG } from "@/constants";
import { Link } from "@/i18n/routing";
import { cn } from "@/utils/cn";
import { MotionDiv, MotionSection } from "@/utils/motion-div";

const ServicesSection = ({ showPricing = true }: { showPricing?: boolean }) => {
	const t = useTranslations();

	return (
		<section id="services" className="container py-16">
			<MotionSection
				animationProps={{
					initial: { opacity: 0, y: 30 },
					whileInView: { opacity: 1, y: 0 },
					viewport: { once: true },
					transition: { duration: 0.5 },
					className: "mb-10 text-center",
				}}
			>
				<div className="inline-flex items-center gap-2 mb-3">
					<div className="w-8 h-px bg-primary/40" />
					<span className="text-sm font-medium tracking-widest uppercase text-primary">
						{t("services.badge")}
					</span>
					<div className="w-8 h-px bg-primary/40" />
				</div>
				<h2 className="text-3xl font-bold md:text-4xl">
					{t("services.title")}
				</h2>
				<p className="max-w-2xl mx-auto mt-4 leading-relaxed text-muted-foreground">
					{t("services.description")}
				</p>
			</MotionSection>

			<div className="grid grid-cols-1 gap-5 mx-auto sm:grid-cols-2 lg:grid-cols-4 lg:max-w-(--breakpoint-xl)">
				{SERVICE_LIST.map((service, i) => (
					<MotionDiv
						key={service.key}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.35, delay: i * 0.06 }}
						className="h-full"
					>
						<div
							className={cn(
								"h-full flex flex-col rounded-2xl border bg-card p-6 transition-colors duration-300",
								service.featured
									? "border-primary/50 shadow-lg"
									: "border-border hover:border-primary/40",
							)}
						>
							{service.featured && (
								<Badge className="self-start mb-3">
									{t("services.popular")}
								</Badge>
							)}

							<h3 className="text-lg font-semibold">
								{t(`services.items.${service.key}.title`)}
							</h3>
							{showPricing && (
								<p className="mt-2 text-xl font-bold text-primary">
									<span className="mr-1 text-xs font-medium tracking-wide uppercase text-muted-foreground">
										{t("services.from")}
									</span>
									{service.price}
								</p>
							)}
							<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
								{t(`services.items.${service.key}.description`)}
							</p>

							<ul className="flex-1 mt-5 space-y-2.5">
								{(
									t.raw(`services.items.${service.key}.points`) as string[]
								).map((point) => (
									<li key={point} className="flex items-start gap-2 text-sm">
										<LuCheck
											size={15}
											className="mt-0.5 shrink-0 text-primary"
										/>
										<span className="text-muted-foreground">{point}</span>
									</li>
								))}
							</ul>
						</div>
					</MotionDiv>
				))}
			</div>

			<div className="flex flex-col items-center gap-3 mt-10">
				{showPricing ? (
					<>
						<Link
							href={SITE_CONFIG.contact.booking}
							target="_blank"
							aria-label={t("services.cta")}
						>
							<Button className="gap-2 text-base font-semibold h-11">
								<BiPhoneCall size={18} />
								{t("services.cta")}
							</Button>
						</Link>
						<p className="max-w-md text-xs text-center text-muted-foreground">
							{t("services.note")}
						</p>
					</>
				) : (
					<Link href="/services" aria-label={t("services.view_pricing")}>
						<Button
							variant="outline"
							className="gap-2 text-base font-semibold h-11"
						>
							{t("services.view_pricing")}
							<LuArrowRight size={18} />
						</Button>
					</Link>
				)}
			</div>
		</section>
	);
};

export default ServicesSection;
